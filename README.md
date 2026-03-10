# ResumeIQ — AI Resume Analyzer

A full-stack web application that analyzes how well a resume matches a job description using **NLP techniques** and a **regression model**, then recommends free courses to close the gap.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML, React JS (CDN), Tailwind CSS (via CDN) |
| Backend | Node.js, Express.js |
| Database | Firebase Firestore (optional) |
| NLP | `natural` (TF-IDF, Cosine Similarity, Porter Stemmer) |
| ML Model | Weighted Logistic Regression (section-wise scoring) |
| File Parsing | `pdf-parse`, `mammoth` (DOCX) |
| Courses | freeCodeCamp, Coursera (audit), MIT OCW, edX |

---

## Project Structure

```
resume-analyzer/
├── backend/
│   ├── server.js           # Express API server
│   ├── nlpEngine.js        # NLP + Regression analysis engine
│   ├── courseRecommender.js # Course database + recommendation logic
│   ├── package.json
│   └── .env.example        # Environment variables template
└── frontend/
    └── index.html          # Complete React frontend (CDN-based)
```

---

## How It Works

### NLP Pipeline
1. **Text Extraction** — Parses PDF, DOCX, TXT files using `pdf-parse` and `mammoth`
2. **Section Detection** — Identifies Skills, Experience, Projects, Education, Summary sections via keyword matching
3. **TF-IDF Vectorization** — Weighs term importance using `natural`'s TfIdf class
4. **Cosine Similarity** — Measures directional similarity between resume and JD vectors
5. **Jaccard Similarity** — Measures keyword overlap using stemmed token sets
6. **Keyword Extraction** — Identifies tech keywords from a 60+ term database

### Regression Model
- Each section is scored independently (cosine + jaccard ensemble)
- **Section Weights**: Skills (35%) > Experience (30%) > Projects (20%) > Education (8%) > Summary (4%) > Achievements (3%)
- Final score applies a **logistic sigmoid transformation** to produce a calibrated 0–100 score

### Course Recommendations
- Maps missing keywords → curated free courses
- Sources: freeCodeCamp, Coursera (free audit), MIT OpenCourseWare, edX, YouTube

---

## Setup

### 1. Clone & Install

```bash
cd backend
npm install
```

### 2. Configure Environment (Optional)

```bash
cp .env.example .env
# Edit .env with your Firebase credentials (optional)
```

### 3. Start the Backend

```bash
npm start
# Server runs on http://localhost:5000
```

### 4. Open the Frontend

Simply open `frontend/index.html` in your browser.
> Or serve it with: `npx serve frontend/`

---

## Firebase Setup (Optional)

The app works fully **without Firebase**. To enable analytics/history logging:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a project → Enable Firestore
3. Go to Project Settings → Service Accounts → Generate New Private Key
4. Add the values to your `.env` file

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/analyze` | Analyze resume vs job description |
| POST | `/api/validate` | Validate and preview a file |
| GET | `/api/health` | Health check |

### POST /api/analyze

**Form Data:**
- `resume` (file) — or `resumeText` (string)
- `jobDescription` (file) — or `jobDescText` (string)

**Response:**
```json
{
  "overallScore": 72,
  "sectionScores": {
    "skills": { "score": 80, "found": true },
    "experience": { "score": 65, "found": true },
    "projects": { "score": 70, "found": true }
  },
  "keywordAnalysis": {
    "matching": ["react", "node", "python"],
    "missing": ["kubernetes", "docker"],
    "matchPercentage": 60
  },
  "recommendations": [
    {
      "title": "Docker Tutorial for Beginners",
      "provider": "freeCodeCamp (YouTube)",
      "url": "https://...",
      "type": "free",
      "duration": "2 hours",
      "reason": "Learn docker - required skill"
    }
  ]
}
```

---

## Validation & Free Resources Used

| Purpose | Library/Resource |
|---------|-----------------|
| NLP tokenization | `natural` (open-source) |
| Stemming | Porter Stemmer via `natural` |
| TF-IDF | `natural`'s TfIdf class |
| PDF parsing | `pdf-parse` (open-source) |
| DOCX parsing | `mammoth` (open-source) |
| File uploads | `multer` (open-source) |
| Course data | freeCodeCamp, MIT OCW, Coursera (free tier) |
