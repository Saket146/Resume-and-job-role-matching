require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');
const http    = require('http');
const https   = require('https');

const { analyzeResume }    = require('./nlpEngine');
const { getRecommendations } = require('./courseRecommender');

const app  = express();
const PORT = process.env.PORT || 5000;

// ─── Optional Firebase ────────────────────────────────────────────
let db = null;
try {
  if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY &&
      !process.env.FIREBASE_PROJECT_ID.startsWith('your-')) {
    const admin = require('firebase-admin');
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId:   process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey:  process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
    });
    db = admin.firestore();
    console.log('✓ Firebase connected');
  } else {
    console.log('ℹ  Firebase not configured — running without database');
  }
} catch (e) {
  console.log('ℹ  Firebase skipped:', e.message);
}

// ─── Middleware ───────────────────────────────────────────────────
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve frontend
const frontendPath = path.join(__dirname, '..', 'frontend');
if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));
}

// ─── File Upload ──────────────────────────────────────────────────
const upload = multer({
  storage: multer.memoryStorage(),
  limits:  { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (['.pdf', '.txt', '.doc', '.docx'].includes(ext)) cb(null, true);
    else cb(new Error('Only PDF, TXT, DOC, DOCX files allowed'));
  }
});

// ─── Text Extraction ──────────────────────────────────────────────
async function extractText(buffer, originalname) {
  const ext = path.extname(originalname).toLowerCase();

  if (ext === '.txt') {
    return buffer.toString('utf-8');
  }

  if (ext === '.pdf') {
    // Try pdf-parse if available (installed)
    try {
      const pdfParse = require('pdf-parse');
      const data = await pdfParse(buffer);
      return data.text;
    } catch (_) {}

    // Pure-JS PDF text extraction fallback (reads raw text streams)
    const raw = buffer.toString('latin1');
    const textChunks = [];

    // Extract text from PDF streams (BT...ET blocks)
    const btEtPattern = /BT([\s\S]*?)ET/g;
    let match;
    while ((match = btEtPattern.exec(raw)) !== null) {
      const block = match[1];
      // Extract strings from Tj, TJ, ' operators
      const strPattern = /\(([^)\\]*(?:\\.[^)\\]*)*)\)\s*(?:Tj|'|")/g;
      let sm;
      while ((sm = strPattern.exec(block)) !== null) {
        const decoded = sm[1]
          .replace(/\\n/g, '\n').replace(/\\r/g, '\r').replace(/\\t/g, '\t')
          .replace(/\\\(/g, '(').replace(/\\\)/g, ')').replace(/\\\\/g, '\\');
        textChunks.push(decoded);
      }
      // TJ arrays
      const tjArrPattern = /\[((?:[^[\]]*(?:\([^)]*\))?[^[\]]*)*)\]\s*TJ/g;
      let tjm;
      while ((tjm = tjArrPattern.exec(block)) !== null) {
        const strInArr = /\(([^)\\]*(?:\\.[^)\\]*)*)\)/g;
        let sm2;
        while ((sm2 = strInArr.exec(tjm[1])) !== null) {
          textChunks.push(sm2[1]);
        }
      }
    }

    if (textChunks.length > 0) {
      return textChunks.join(' ').replace(/\s+/g, ' ').trim();
    }

    // Last resort: extract printable ASCII strings ≥4 chars
    const printable = raw.match(/[\x20-\x7E]{4,}/g) || [];
    return printable
      .filter(s => !/^\d+\s+\d+\s+obj/.test(s)) // filter PDF objects
      .filter(s => !/^\/[A-Z]/.test(s))           // filter PDF operators
      .join(' ');
  }

  if (ext === '.docx') {
    try {
      const mammoth = require('mammoth');
      const result  = await mammoth.extractRawText({ buffer });
      return result.value;
    } catch (_) {}
    // Fallback: extract XML text content
    const raw = buffer.toString('utf-8', 0, Math.min(buffer.length, 500000));
    return raw
      .replace(/<[^>]+>/g, ' ')
      .replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>')
      .replace(/[^\x20-\x7E\n]/g,' ')
      .replace(/\s+/g,' ').trim();
  }

  // Generic fallback
  return buffer.toString('utf-8').replace(/[^\x20-\x7E\n\r\t]/g,' ').replace(/\s+/g,' ').trim();
}

// ─── Routes ───────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', firebase: db ? 'connected' : 'not configured', version: '1.0.0' });
});

app.post('/api/analyze',
  upload.fields([{ name: 'resume', maxCount: 1 }, { name: 'jobDescription', maxCount: 1 }]),
  async (req, res) => {
    try {
      let resumeText = '';
      let jobDescText = '';

      if (req.files?.resume?.[0]) {
        resumeText = await extractText(req.files.resume[0].buffer, req.files.resume[0].originalname);
      } else if (req.body.resumeText) {
        resumeText = req.body.resumeText;
      } else {
        return res.status(400).json({ error: 'Resume is required' });
      }

      if (req.files?.jobDescription?.[0]) {
        jobDescText = await extractText(req.files.jobDescription[0].buffer, req.files.jobDescription[0].originalname);
      } else if (req.body.jobDescText) {
        jobDescText = req.body.jobDescText;
      } else {
        return res.status(400).json({ error: 'Job description is required' });
      }

      if (resumeText.trim().length < 30)  return res.status(400).json({ error: 'Resume too short or could not be read. Try pasting text instead.' });
      if (jobDescText.trim().length < 20) return res.status(400).json({ error: 'Job description too short.' });

      const analysis = analyzeResume(resumeText, jobDescText);
      const courses  = getRecommendations(analysis.keywordAnalysis.missing, [], analysis.overallScore);

      const response = {
        success:       true,
        overallScore:  analysis.overallScore,
        sectionScores: analysis.sectionScores,
        keywordAnalysis: analysis.keywordAnalysis,
        resumeSections:  analysis.resumeSections,
        recommendations: courses,
        analysisDate:    new Date().toISOString()
      };

      // Firebase logging (optional)
      if (db) {
        try {
          await db.collection('analyses').add({
            overallScore:        response.overallScore,
            keywordMatchPercent: response.keywordAnalysis.matchPercentage,
            analysisDate:        response.analysisDate,
            createdAt:           new Date()
          });
        } catch (e) { console.error('Firebase write error:', e.message); }
      }

      res.json(response);
    } catch (err) {
      console.error('Analysis error:', err);
      res.status(500).json({ error: 'Analysis failed: ' + err.message });
    }
  }
);

app.post('/api/validate', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ valid: false, error: 'No file' });
  try {
    const text = await extractText(req.file.buffer, req.file.originalname);
    res.json({ valid: true, wordCount: text.trim().split(/\s+/).length, preview: text.slice(0, 200) });
  } catch (e) {
    res.status(400).json({ valid: false, error: e.message });
  }
});

// Catch-all: serve frontend
app.get('/{*path}', (_req, res) => {
  const idx = path.join(frontendPath, 'index.html');
  if (fs.existsSync(idx)) res.sendFile(idx);
  else res.json({ message: 'ResumeIQ API — visit /api/health' });
});

app.listen(PORT, () => {
  console.log(`\n🚀 ResumeIQ backend running at http://localhost:${PORT}`);
  console.log(`   Open frontend/index.html in your browser\n`);
});

module.exports = app;
