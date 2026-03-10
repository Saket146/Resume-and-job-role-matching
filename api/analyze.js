const multer  = require('multer');
const path    = require('path');
const { analyzeResume }      = require('../backend/nlpEngine');
const { getRecommendations } = require('../backend/courseRecommender');

const upload = multer({ storage: multer.memoryStorage() });

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const resumeText  = req.body.resumeText  || '';
    const jobDescText = req.body.jobDescText || '';

    if (!resumeText.trim())  return res.status(400).json({ error: 'Resume text is required' });
    if (!jobDescText.trim()) return res.status(400).json({ error: 'Job description is required' });

    const analysis = analyzeResume(resumeText, jobDescText);
    const courses  = getRecommendations(analysis.keywordAnalysis.missing, [], analysis.overallScore);

    res.status(200).json({
      success:         true,
      overallScore:    analysis.overallScore,
      sectionScores:   analysis.sectionScores,
      keywordAnalysis: analysis.keywordAnalysis,
      resumeSections:  analysis.resumeSections,
      recommendations: courses,
      analysisDate:    new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ error: 'Analysis failed: ' + err.message });
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> 83473c74c8de6c15a542ff97d399a18298f18e0d
