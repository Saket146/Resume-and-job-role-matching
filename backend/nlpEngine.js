/**
 * NLP Engine — Pure Node.js, zero external dependencies
 * Fixes applied:
 *  1. Sigmoid recalibrated: raw 0.46 -> 72%, 0.65 -> 86%
 *  2. Section scores displayed using same sigmoid (not raw %)
 *  3. Keyword overlap is primary signal (most reliable for section scoring)
 *  4. Section detection expanded — covers more resume formats
 *  5. Data science / ML keywords greatly expanded
 *  6. Fallback: if section header missing, still gives partial credit
 *  7. Education/certifications/projects weighted properly
 */

// ─── Porter Stemmer ───────────────────────────────────────────────
function stem(word) {
  word = word.toLowerCase();
  if (word.length <= 2) return word;
  if (word.endsWith('sses'))      word = word.slice(0, -2);
  else if (word.endsWith('ies'))  word = word.slice(0, -2);
  else if (word.endsWith('ss'))   { /* keep */ }
  else if (word.endsWith('s') && word.length > 3) word = word.slice(0, -1);
  if (word.endsWith('eed') && word.length > 4)        word = word.slice(0, -1);
  else if (word.endsWith('ing') && word.length > 5)   word = word.slice(0, -3);
  else if (word.endsWith('ed')  && word.length > 4)   word = word.slice(0, -2);
  const step2 = {
    'ational':'ate','tional':'tion','enci':'ence','anci':'ance','izer':'ize',
    'alli':'al','entli':'ent','eli':'e','ousli':'ous','ization':'ize','ation':'ate',
    'ator':'ate','alism':'al','iveness':'ive','fulness':'ful','ousness':'ous',
    'aliti':'al','iviti':'ive','biliti':'ble'
  };
  for (const [s, r] of Object.entries(step2)) {
    if (word.endsWith(s) && word.length > s.length + 1) {
      word = word.slice(0, -s.length) + r; break;
    }
  }
  if      (word.endsWith('icate')||word.endsWith('alize')||word.endsWith('iciti')) word = word.slice(0,-3);
  else if (word.endsWith('ical') ||word.endsWith('ness'))                          word = word.slice(0,-4);
  else if (word.endsWith('ful')  ||word.endsWith('ous')||
           word.endsWith('ive')  ||word.endsWith('ize'))                           word = word.slice(0,-3);
  return word;
}

// ─── Tokenizer & Stop Words ───────────────────────────────────────
const STOP_WORDS = new Set([
  'a','an','the','and','or','but','in','on','at','to','for','of','with','by','from',
  'is','are','was','were','be','been','have','has','had','do','does','did','will',
  'would','could','should','may','might','can','that','this','these','those','it',
  'its','he','she','they','we','you','i','my','your','our','their','as','if','then',
  'than','when','where','who','what','which','how','all','each','every','both','few',
  'more','most','other','some','no','not','only','so','too','very','just','also',
  'about','above','after','before','between','into','through','during','including',
  'against','among','upon','up','while','although','because','since','use','used',
  'using','work','worked','working','build','built','building','develop','developed',
  'strong','good','well','knowledge','understanding','ability','responsible','role',
  'team','company','position','candidate','required','preferred','plus','etc'
]);

function tokenize(text) {
  return text.toLowerCase().replace(/[^\w\s]/g,' ').split(/\s+/).filter(t => t.length > 1);
}

function getTokens(text) {
  return tokenize(text).filter(t => !STOP_WORDS.has(t) && t.length > 2);
}

function getStemmedTokens(text) {
  return getTokens(text).map(stem);
}

// ─── Similarity Metrics ────────────────────────────────────────────
function termFreq(tokens) {
  const tf = {};
  tokens.forEach(t => { tf[t] = (tf[t] || 0) + 1; });
  const total = tokens.length || 1;
  Object.keys(tf).forEach(k => { tf[k] /= total; });
  return tf;
}

function cosineSimilarity(text1, text2) {
  const t1 = getStemmedTokens(text1);
  const t2 = getStemmedTokens(text2);
  if (!t1.length || !t2.length) return 0;
  const f1 = termFreq(t1), f2 = termFreq(t2);
  const terms = new Set([...Object.keys(f1), ...Object.keys(f2)]);
  let dot = 0, m1 = 0, m2 = 0;
  for (const t of terms) {
    const v1 = f1[t] || 0, v2 = f2[t] || 0;
    dot += v1 * v2; m1 += v1 * v1; m2 += v2 * v2;
  }
  return (m1 && m2) ? dot / (Math.sqrt(m1) * Math.sqrt(m2)) : 0;
}

function jaccardSimilarity(text1, text2) {
  const s1 = new Set(getStemmedTokens(text1));
  const s2 = new Set(getStemmedTokens(text2));
  const inter = new Set([...s1].filter(x => s2.has(x)));
  const union = new Set([...s1, ...s2]);
  return union.size ? inter.size / union.size : 0;
}

// ─── Expanded Tech Keyword Database ──────────────────────────────
const TECH_KEYWORDS = [
  // Languages
  'python','r','java','javascript','typescript','scala','julia','matlab','sql',
  'c++','c#','golang','rust','swift','kotlin','php','ruby','bash','perl','sas',

  // Web Frameworks
  'react','angular','vue','svelte','nextjs','nodejs','express','django','flask',
  'fastapi','spring','laravel','html','css','tailwind','bootstrap','graphql','rest',

  // Data Science & ML Core
  'machine learning','deep learning','nlp','natural language processing',
  'computer vision','data analysis','data science','data engineering',
  'statistical analysis','statistical modeling','feature engineering',
  'model deployment','model training','model evaluation',

  // ML Frameworks & Libraries
  'tensorflow','pytorch','keras','scikit-learn','sklearn','xgboost','lightgbm',
  'catboost','huggingface','spacy','nltk','opencv','transformers',

  // Data Tools
  'pandas','numpy','scipy','matplotlib','seaborn','plotly','bokeh',
  'tableau','power bi','powerbi','excel','looker','metabase',

  // Statistics & Math
  'statistics','probability','linear algebra','calculus','regression',
  'classification','clustering','hypothesis testing','a/b testing',
  'bayesian','time series','forecasting','anova','chi-square',

  // ML Concepts
  'neural network','random forest','svm','gradient boosting','decision tree',
  'recommendation system','reinforcement learning','transfer learning',
  'generative ai','llm','bert','gpt','word2vec','embeddings',

  // MLOps & Deployment
  'mlops','mlflow','kubeflow','airflow','dvc','bentoml','fastapi','streamlit',

  // Big Data
  'spark','hadoop','hive','kafka','flink','databricks','snowflake',
  'redshift','bigquery','dbt','etl','data pipeline','data warehouse',

  // Databases
  'mongodb','postgresql','mysql','sqlite','redis','cassandra','firebase',
  'dynamodb','elasticsearch','oracle','sql server',

  // Cloud & DevOps
  'docker','kubernetes','aws','azure','gcp','git','linux','nginx',
  'terraform','ci/cd','devops','microservices','sagemaker','vertex ai',

  // Tools & Platforms
  'jupyter','colab','anaconda','vscode','github','gitlab',
  'jira','confluence','figma','postman','sonarqube',

  // Other Domains
  'agile','scrum','blockchain','cybersecurity','android','ios','flutter',
  'unity','embedded','iot','ar','vr'
];

function extractTechKeywords(text) {
  const lower = text.toLowerCase().replace(/[^\w\s]/g,' ');
  const found = new Set();
  for (const kw of TECH_KEYWORDS) {
    const escaped = kw.replace(/[+#.]/g,'\\$&').replace(/ /g,'\\s+');
    try {
      if (new RegExp(`\\b${escaped}\\b`).test(lower)) found.add(kw);
    } catch(e) {
      if (lower.includes(kw)) found.add(kw);
    }
  }
  return Array.from(found);
}

// ─── Section Detection ────────────────────────────────────────────
const SECTION_PATTERNS = {
  skills: [
    'skills','technical skills','core competencies','technologies','tools','expertise',
    'tech stack','proficiencies','key skills','programming languages','languages',
    'frameworks','libraries','technical expertise','competencies','toolset',
    'software','platforms','skills & technologies','skills and technologies','technical proficiencies'
  ],
  experience: [
    'experience','work experience','employment','professional experience','career history',
    'work history','positions held','professional background','internship','internships',
    'job history','relevant experience','industry experience','professional history',
    'work','career','roles','position','employment history'
  ],
  projects: [
    'projects','personal projects','academic projects','portfolio','key projects',
    'notable projects','side projects','open source','research projects','capstone',
    'project work','selected projects','highlighted projects','ml projects',
    'data science projects','project experience','project highlights'
  ],
  education: [
    'education','academic background','qualifications','degrees','certifications',
    'training','courses','university','college','graduation','academic','coursework',
    'certificate','diploma','bachelor','master','phd','b.tech','m.tech','b.sc','m.sc',
    'online courses','mooc','continuing education','professional development',
    'certifications & training','licenses','accreditation'
  ],
  summary: [
    'summary','objective','profile','about me','professional summary','career objective',
    'overview','introduction','about','bio','personal statement','professional profile'
  ],
  achievements: [
    'achievements','accomplishments','awards','honors','recognition','publications',
    'patents','volunteer','honors and awards','leadership','extracurricular',
    'activities','interests','research','papers','conferences','certifications awarded',
    'competitions','hackathon','fellowships'
  ]
};

function extractSections(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const sections = {
    skills:'', experience:'', projects:'', education:'',
    summary:'', achievements:'', other:''
  };
  let current = 'other';

  for (const line of lines) {
    const lower = line.toLowerCase().replace(/[:\-_|•]/g,' ').trim();
    let found = false;

    if (line.length < 80) {
      for (const [sec, pats] of Object.entries(SECTION_PATTERNS)) {
        if (pats.some(p => lower === p || lower.startsWith(p + ' ') || lower.includes(p))) {
          current = sec;
          found = true;
          break;
        }
      }
    }
    if (!found) sections[current] += ' ' + line;
  }
  return sections;
}

// ─── Section Scoring: keyword overlap + text similarity ──────────
function keywordOverlapScore(sectionText, jobText) {
  const jdKws  = extractTechKeywords(jobText);
  const secKws = extractTechKeywords(sectionText);
  if (jdKws.length === 0) return 0.5; // no tech keywords in JD — neutral
  const matched = secKws.filter(k => jdKws.includes(k));
  return matched.length / jdKws.length;
}

function scoreSectionAgainstJD(resumeSection, jobText) {
  const cosine    = cosineSimilarity(resumeSection, jobText);
  const jaccard   = jaccardSimilarity(resumeSection, jobText);
  const kwOverlap = keywordOverlapScore(resumeSection, jobText);
  // Keyword overlap is primary — most reliable indicator of relevance
  return 0.30 * cosine + 0.20 * jaccard + 0.50 * kwOverlap;
}

// ─── Sigmoid Calibration ─────────────────────────────────────────
// raw 0.10 -> 34%  |  raw 0.25 -> 50%  |  raw 0.46 -> 72%
// raw 0.55 -> 79%  |  raw 0.65 -> 86%  |  raw 0.80 -> 93%
function sigmoid(x) { return 1 / (1 + Math.exp(-4.5 * (x - 0.25))); }

// ─── Weighted Regression Scorer ───────────────────────────────────
const SECTION_WEIGHTS = {
  skills:       0.32,
  experience:   0.27,
  projects:     0.23,
  education:    0.10,
  summary:      0.04,
  achievements: 0.04
};

function regressionScore(rawScores, kwMatchScore) {
  let weighted = 0, totalWeight = 0;
  for (const [sec, w] of Object.entries(SECTION_WEIGHTS)) {
    if (rawScores[sec] !== undefined) {
      weighted    += rawScores[sec] * w;
      totalWeight += w;
    }
  }
  const sectionAvg = weighted / (totalWeight || 1);
  // Blend: 65% section content analysis + 35% keyword match
  const blended = 0.65 * sectionAvg + 0.35 * kwMatchScore;
  return Math.round(Math.max(12, Math.min(98, sigmoid(blended) * 100)));
}

// ─── Main Entry Point ─────────────────────────────────────────────
function analyzeResume(resumeText, jobDescText) {
  const resumeSections = extractSections(resumeText);

  const resumeKws    = extractTechKeywords(resumeText);
  const jobKws       = extractTechKeywords(jobDescText);
  const matching     = resumeKws.filter(k => jobKws.includes(k));
  const missing      = jobKws.filter(k => !resumeKws.includes(k));
  const kwMatchScore = jobKws.length > 0 ? matching.length / jobKws.length : 0.3;

  const rawScores = {};
  const details   = {};

  for (const sec of Object.keys(SECTION_WEIGHTS)) {
    const rc = (resumeSections[sec] || '').trim();

    if (rc.length < 15) {
      // Section header not found — give partial credit using "other" content
      const fallback = (resumeSections.other || '').trim();
      const score    = fallback.length > 30
        ? scoreSectionAgainstJD(fallback, jobDescText) * 0.45
        : 0;
      rawScores[sec] = score;
      details[sec]   = { score: Math.round(sigmoid(score) * 100), found: false };
    } else {
      const score    = scoreSectionAgainstJD(rc, jobDescText);
      rawScores[sec] = score;
      details[sec]   = {
        score:     Math.round(sigmoid(score) * 100),
        found:     true,
        wordCount: rc.split(/\s+/).length
      };
    }
  }

  return {
    overallScore: regressionScore(rawScores, kwMatchScore),
    sectionScores: details,
    keywordAnalysis: {
      resumeKeywords:  resumeKws,
      jobKeywords:     jobKws,
      matching,
      missing,
      matchPercentage: Math.round(kwMatchScore * 100)
    },
    resumeSections: Object.keys(resumeSections).filter(
      s => (resumeSections[s] || '').trim().length > 20
    )
  };
}

module.exports = { analyzeResume, extractTechKeywords, extractSections };
