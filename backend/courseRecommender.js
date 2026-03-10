/**
 * Course Recommender — Free & Open-Source Resources
 * Fixed: full DS/ML/AI coverage, multi-word keyword matching, alias mapping
 */

const COURSE_DATABASE = {

  // ── Programming Languages ─────────────────────────────────────
  python: [
    { title: 'Python for Everybody Specialization', provider: 'Coursera - Michigan (Audit)', url: 'https://www.coursera.org/specializations/python', type: 'free-audit', duration: '8 months' },
    { title: 'Scientific Computing with Python', provider: 'freeCodeCamp', url: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/', type: 'free', duration: '40 hours' }
  ],
  r: [
    { title: 'R Programming', provider: 'Coursera - Johns Hopkins (Audit)', url: 'https://www.coursera.org/learn/r-programming', type: 'free-audit', duration: '4 weeks' },
    { title: 'R for Data Science (Free Book)', provider: 'R4DS', url: 'https://r4ds.had.co.nz/', type: 'free', duration: 'Self-paced' }
  ],
  sql: [
    { title: 'SQL Tutorial - Full Database Course', provider: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY', type: 'free', duration: '4 hours' },
    { title: 'Relational Database Certification', provider: 'freeCodeCamp', url: 'https://www.freecodecamp.org/learn/relational-database/', type: 'free', duration: '300 hours' }
  ],
  javascript: [
    { title: 'JavaScript Algorithms and Data Structures', provider: 'freeCodeCamp', url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/', type: 'free', duration: '300 hours' },
    { title: 'The Modern JavaScript Tutorial', provider: 'javascript.info', url: 'https://javascript.info/', type: 'free', duration: 'Self-paced' }
  ],
  typescript: [
    { title: 'TypeScript Full Course for Beginners', provider: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=30LWjhZzg50', type: 'free', duration: '8 hours' },
    { title: 'TypeScript Official Handbook', provider: 'TypeScript Official', url: 'https://www.typescriptlang.org/docs/', type: 'free', duration: 'Self-paced' }
  ],
  java: [
    { title: 'Java Programming and Software Engineering', provider: 'Coursera - Duke (Audit)', url: 'https://www.coursera.org/specializations/java-programming', type: 'free-audit', duration: '5 months' },
    { title: 'Java Full Course', provider: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=grEKMHGYyns', type: 'free', duration: '10 hours' }
  ],
  scala: [
    { title: 'Functional Programming in Scala', provider: 'Coursera - EPFL (Audit)', url: 'https://www.coursera.org/specializations/scala', type: 'free-audit', duration: '4 months' }
  ],
  julia: [
    { title: 'Introduction to Julia', provider: 'Julia Academy (Free)', url: 'https://juliaacademy.com/p/intro-to-julia', type: 'free', duration: 'Self-paced' }
  ],
  matlab: [
    { title: 'Introduction to MATLAB', provider: 'Coursera - Vanderbilt (Audit)', url: 'https://www.coursera.org/learn/matlab', type: 'free-audit', duration: '4 weeks' }
  ],
  'c++': [
    { title: 'C++ Tutorial for Beginners', provider: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=vLnPwxZdW4Y', type: 'free', duration: '4 hours' },
    { title: 'Introduction to C++', provider: 'MIT OpenCourseWare', url: 'https://ocw.mit.edu/courses/6-096-introduction-to-c-january-iap-2011/', type: 'free', duration: 'Self-paced' }
  ],
  golang: [
    { title: 'Go Programming Language Tutorial', provider: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=YS4e4q9oBaU', type: 'free', duration: '7 hours' }
  ],

  // ── Data Science & Analytics ──────────────────────────────────
  'data science': [
    { title: 'IBM Data Science Professional Certificate', provider: 'Coursera - IBM (Audit)', url: 'https://www.coursera.org/professional-certificates/ibm-data-science', type: 'free-audit', duration: '10 months' },
    { title: 'Data Analysis with Python', provider: 'freeCodeCamp', url: 'https://www.freecodecamp.org/learn/data-analysis-with-python/', type: 'free', duration: '300 hours' }
  ],
  'data analysis': [
    { title: 'Data Analysis with Python Certification', provider: 'freeCodeCamp', url: 'https://www.freecodecamp.org/learn/data-analysis-with-python/', type: 'free', duration: '300 hours' },
    { title: 'Google Data Analytics Certificate', provider: 'Coursera - Google (Audit)', url: 'https://www.coursera.org/professional-certificates/google-data-analytics', type: 'free-audit', duration: '6 months' }
  ],
  'data visualization': [
    { title: 'Data Visualization with Python', provider: 'Coursera - IBM (Audit)', url: 'https://www.coursera.org/learn/python-for-data-visualization', type: 'free-audit', duration: '3 weeks' },
    { title: 'Data Visualization Certification', provider: 'freeCodeCamp', url: 'https://www.freecodecamp.org/learn/data-visualization/', type: 'free', duration: '300 hours' }
  ],
  'data engineering': [
    { title: 'Data Engineering Zoomcamp', provider: 'DataTalks.Club (Free)', url: 'https://github.com/DataTalksClub/data-engineering-zoomcamp', type: 'free', duration: '9 weeks' },
    { title: 'IBM Data Engineering Certificate', provider: 'Coursera - IBM (Audit)', url: 'https://www.coursera.org/professional-certificates/ibm-data-engineer', type: 'free-audit', duration: '8 months' }
  ],
  'statistical analysis': [
    { title: 'Statistics with Python Specialization', provider: 'Coursera - Michigan (Audit)', url: 'https://www.coursera.org/specializations/statistics-with-python', type: 'free-audit', duration: '3 months' },
    { title: 'Khan Academy Statistics & Probability', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/statistics-probability', type: 'free', duration: 'Self-paced' }
  ],
  statistics: [
    { title: 'Statistics and Probability', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/statistics-probability', type: 'free', duration: 'Self-paced' },
    { title: 'Introduction to Statistics', provider: 'Stanford - Coursera (Audit)', url: 'https://www.coursera.org/learn/stanford-statistics', type: 'free-audit', duration: '5 weeks' }
  ],
  probability: [
    { title: 'Probability - The Science of Uncertainty', provider: 'edX - MIT (Audit)', url: 'https://www.edx.org/learn/probability/massachusetts-institute-of-technology-probability-the-science-of-uncertainty-and-data', type: 'free-audit', duration: '16 weeks' },
    { title: 'Khan Academy - Probability', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/statistics-probability/probability-library', type: 'free', duration: 'Self-paced' }
  ],
  'hypothesis testing': [
    { title: 'Inferential Statistics', provider: 'Coursera - Duke (Audit)', url: 'https://www.coursera.org/learn/inferential-statistics-intro', type: 'free-audit', duration: '5 weeks' },
    { title: 'Statistics with Python', provider: 'Coursera - Michigan (Audit)', url: 'https://www.coursera.org/specializations/statistics-with-python', type: 'free-audit', duration: '3 months' }
  ],
  'a/b testing': [
    { title: 'A/B Testing by Google', provider: 'Udacity (Free)', url: 'https://www.udacity.com/course/ab-testing--ud257', type: 'free', duration: '1 month' }
  ],
  'linear algebra': [
    { title: 'Linear Algebra - MIT OCW', provider: 'MIT OpenCourseWare', url: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/', type: 'free', duration: 'Self-paced' },
    { title: 'Khan Academy Linear Algebra', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/linear-algebra', type: 'free', duration: 'Self-paced' }
  ],
  'time series': [
    { title: 'Sequences, Time Series and Prediction', provider: 'Coursera - DeepLearning.AI (Audit)', url: 'https://www.coursera.org/learn/tensorflow-sequences-timeseries-and-prediction', type: 'free-audit', duration: '3 weeks' }
  ],
  forecasting: [
    { title: 'Practical Time Series Analysis', provider: 'Coursera - State University of NY (Audit)', url: 'https://www.coursera.org/learn/practical-time-series-analysis', type: 'free-audit', duration: '6 weeks' }
  ],

  // ── Machine Learning ──────────────────────────────────────────
  'machine learning': [
    { title: 'Machine Learning Specialization', provider: 'Coursera - Andrew Ng (Audit)', url: 'https://www.coursera.org/specializations/machine-learning-introduction', type: 'free-audit', duration: '3 months' },
    { title: 'Machine Learning with Python', provider: 'freeCodeCamp', url: 'https://www.freecodecamp.org/learn/machine-learning-with-python/', type: 'free', duration: '300 hours' }
  ],
  'deep learning': [
    { title: 'Deep Learning Specialization', provider: 'Coursera - DeepLearning.AI (Audit)', url: 'https://www.coursera.org/specializations/deep-learning', type: 'free-audit', duration: '5 months' },
    { title: 'Practical Deep Learning for Coders', provider: 'fast.ai (Free)', url: 'https://course.fast.ai/', type: 'free', duration: 'Self-paced' }
  ],
  'feature engineering': [
    { title: 'Feature Engineering - Kaggle', provider: 'Kaggle (Free)', url: 'https://www.kaggle.com/learn/feature-engineering', type: 'free', duration: '5 hours' }
  ],
  'model deployment': [
    { title: 'Deploying ML Models in Production', provider: 'Coursera - DeepLearning.AI (Audit)', url: 'https://www.coursera.org/learn/deploying-machine-learning-models-in-production', type: 'free-audit', duration: '4 weeks' }
  ],
  mlops: [
    { title: 'MLOps Zoomcamp', provider: 'DataTalks.Club (Free)', url: 'https://github.com/DataTalksClub/mlops-zoomcamp', type: 'free', duration: '9 weeks' },
    { title: 'Machine Learning Engineering for Production', provider: 'Coursera - DeepLearning.AI (Audit)', url: 'https://www.coursera.org/specializations/machine-learning-engineering-for-production-mlops', type: 'free-audit', duration: '4 months' }
  ],
  'regression': [
    { title: 'Regression Models', provider: 'Coursera - Johns Hopkins (Audit)', url: 'https://www.coursera.org/learn/regression-models', type: 'free-audit', duration: '4 weeks' }
  ],
  'classification': [
    { title: 'Machine Learning Classification', provider: 'Kaggle Learn (Free)', url: 'https://www.kaggle.com/learn/intro-to-machine-learning', type: 'free', duration: '3 hours' }
  ],
  'clustering': [
    { title: 'Unsupervised Learning, Recommenders, RL', provider: 'Coursera - Andrew Ng (Audit)', url: 'https://www.coursera.org/learn/unsupervised-learning-recommenders-reinforcement-learning', type: 'free-audit', duration: '1 month' }
  ],
  'xgboost': [
    { title: 'Intermediate Machine Learning (XGBoost)', provider: 'Kaggle Learn (Free)', url: 'https://www.kaggle.com/learn/intermediate-machine-learning', type: 'free', duration: '4 hours' }
  ],
  'scikit-learn': [
    { title: 'Scikit-learn Official Tutorial', provider: 'scikit-learn.org', url: 'https://scikit-learn.org/stable/tutorial/', type: 'free', duration: 'Self-paced' },
    { title: 'ML with Scikit-Learn - freeCodeCamp', provider: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=0B5eIE_1vpU', type: 'free', duration: '3 hours' }
  ],
  'sklearn': [
    { title: 'Scikit-learn Official Tutorial', provider: 'scikit-learn.org', url: 'https://scikit-learn.org/stable/tutorial/', type: 'free', duration: 'Self-paced' }
  ],
  'lightgbm': [
    { title: 'Intermediate Machine Learning', provider: 'Kaggle Learn (Free)', url: 'https://www.kaggle.com/learn/intermediate-machine-learning', type: 'free', duration: '4 hours' }
  ],
  'catboost': [
    { title: 'Intermediate Machine Learning', provider: 'Kaggle Learn (Free)', url: 'https://www.kaggle.com/learn/intermediate-machine-learning', type: 'free', duration: '4 hours' }
  ],
  'random forest': [
    { title: 'Intro to Machine Learning (Random Forests)', provider: 'Kaggle Learn (Free)', url: 'https://www.kaggle.com/learn/intro-to-machine-learning', type: 'free', duration: '3 hours' }
  ],

  // ── NLP & AI ──────────────────────────────────────────────────
  nlp: [
    { title: 'Natural Language Processing Specialization', provider: 'Coursera - DeepLearning.AI (Audit)', url: 'https://www.coursera.org/specializations/natural-language-processing', type: 'free-audit', duration: '4 months' },
    { title: 'NLP with Python - freeCodeCamp', provider: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=X2vAabgKiuM', type: 'free', duration: '1 hour' }
  ],
  'natural language processing': [
    { title: 'Natural Language Processing Specialization', provider: 'Coursera - DeepLearning.AI (Audit)', url: 'https://www.coursera.org/specializations/natural-language-processing', type: 'free-audit', duration: '4 months' }
  ],
  bert: [
    { title: 'Hugging Face NLP Course (Free)', provider: 'Hugging Face', url: 'https://huggingface.co/learn/nlp-course/', type: 'free', duration: 'Self-paced' }
  ],
  gpt: [
    { title: 'ChatGPT Prompt Engineering for Developers', provider: 'DeepLearning.AI (Free)', url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/', type: 'free', duration: '1 hour' }
  ],
  llm: [
    { title: 'LLM Zoomcamp', provider: 'DataTalks.Club (Free)', url: 'https://github.com/DataTalksClub/llm-zoomcamp', type: 'free', duration: '10 weeks' },
    { title: 'Building LLM Apps', provider: 'DeepLearning.AI Short Courses (Free)', url: 'https://www.deeplearning.ai/short-courses/', type: 'free', duration: 'Self-paced' }
  ],
  'generative ai': [
    { title: 'Generative AI for Everyone', provider: 'Coursera - DeepLearning.AI (Audit)', url: 'https://www.coursera.org/learn/generative-ai-for-everyone', type: 'free-audit', duration: '3 weeks' }
  ],
  huggingface: [
    { title: 'Hugging Face NLP Course', provider: 'Hugging Face (Free)', url: 'https://huggingface.co/learn/nlp-course/', type: 'free', duration: 'Self-paced' }
  ],
  'computer vision': [
    { title: 'Convolutional Neural Networks', provider: 'Coursera - DeepLearning.AI (Audit)', url: 'https://www.coursera.org/learn/convolutional-neural-networks', type: 'free-audit', duration: '4 weeks' },
    { title: 'Computer Vision Fundamentals - Kaggle', provider: 'Kaggle Learn (Free)', url: 'https://www.kaggle.com/learn/computer-vision', type: 'free', duration: '4 hours' }
  ],
  opencv: [
    { title: 'OpenCV Python Tutorial', provider: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=oXlwWbU8l2o', type: 'free', duration: '4 hours' }
  ],

  // ── ML Frameworks ─────────────────────────────────────────────
  tensorflow: [
    { title: 'TensorFlow Developer Certificate Prep', provider: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=tpCFfeUEGs8', type: 'free', duration: '6 hours' },
    { title: 'DeepLearning.AI TensorFlow Developer', provider: 'Coursera (Audit)', url: 'https://www.coursera.org/professional-certificates/tensorflow-in-practice', type: 'free-audit', duration: '4 months' }
  ],
  pytorch: [
    { title: 'PyTorch for Deep Learning - Full Course', provider: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=GIsg-ZUy0MY', type: 'free', duration: '25 hours' },
    { title: 'PyTorch Official Tutorials', provider: 'PyTorch', url: 'https://pytorch.org/tutorials/', type: 'free', duration: 'Self-paced' }
  ],
  keras: [
    { title: 'Introduction to Deep Learning with Keras', provider: 'Coursera - IBM (Audit)', url: 'https://www.coursera.org/learn/introduction-to-deep-learning-with-keras', type: 'free-audit', duration: '2 weeks' }
  ],

  // ── Data Tools & Libraries ────────────────────────────────────
  pandas: [
    { title: 'Pandas - Kaggle Learn', provider: 'Kaggle (Free)', url: 'https://www.kaggle.com/learn/pandas', type: 'free', duration: '4 hours' },
    { title: 'Data Analysis with Python and Pandas', provider: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=vmEHCJofslg', type: 'free', duration: '4 hours' }
  ],
  numpy: [
    { title: 'NumPy Tutorial - freeCodeCamp', provider: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=QUT1VHiLmmI', type: 'free', duration: '1 hour' }
  ],
  matplotlib: [
    { title: 'Matplotlib Crash Course', provider: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=3Xc3CA655Y4', type: 'free', duration: '1 hour' }
  ],
  seaborn: [
    { title: 'Data Visualization with Seaborn', provider: 'Kaggle Learn (Free)', url: 'https://www.kaggle.com/learn/data-visualization', type: 'free', duration: '4 hours' }
  ],
  tableau: [
    { title: 'Tableau Free Training Videos', provider: 'Tableau Official', url: 'https://www.tableau.com/learn/training', type: 'free', duration: 'Self-paced' },
    { title: 'Tableau for Beginners', provider: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=TPMlZxRRaBQ', type: 'free', duration: '4 hours' }
  ],
  'power bi': [
    { title: 'Power BI Full Course', provider: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=TmhQCQr_DCA', type: 'free', duration: '4 hours' },
    { title: 'Power BI Learning Path', provider: 'Microsoft Learn (Free)', url: 'https://learn.microsoft.com/en-us/training/powerplatform/power-bi', type: 'free', duration: 'Self-paced' }
  ],
  plotly: [
    { title: 'Plotly Dash for Python', provider: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=hSPmj7mK6ng', type: 'free', duration: '4 hours' }
  ],
  streamlit: [
    { title: 'Build 12 Data Apps with Streamlit', provider: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=JwSS70SZdyM', type: 'free', duration: '3 hours' }
  ],

  // ── Big Data ──────────────────────────────────────────────────
  spark: [
    { title: 'Apache Spark with Python - PySpark', provider: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=_C8kWso4ne4', type: 'free', duration: '2 hours' },
    { title: 'Big Data Analysis with Scala and Spark', provider: 'Coursera - EPFL (Audit)', url: 'https://www.coursera.org/learn/scala-spark-big-data', type: 'free-audit', duration: '4 weeks' }
  ],
  hadoop: [
    { title: 'Hadoop Platform and Application Framework', provider: 'Coursera - UC San Diego (Audit)', url: 'https://www.coursera.org/learn/hadoop', type: 'free-audit', duration: '4 weeks' }
  ],
  kafka: [
    { title: 'Apache Kafka Tutorials', provider: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=SqVfCyfCJqw', type: 'free', duration: '2 hours' }
  ],
  airflow: [
    { title: 'Airflow Tutorial for Beginners', provider: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=K9AnJ9_ZAXE', type: 'free', duration: '2 hours' }
  ],
  databricks: [
    { title: 'Databricks Academy Free Courses', provider: 'Databricks Academy', url: 'https://www.databricks.com/learn/training/learning-paths', type: 'free', duration: 'Self-paced' }
  ],
  snowflake: [
    { title: 'Snowflake Free Training', provider: 'Snowflake University', url: 'https://learn.snowflake.com/', type: 'free', duration: 'Self-paced' }
  ],
  dbt: [
    { title: 'dbt Fundamentals', provider: 'dbt Learn (Free)', url: 'https://courses.getdbt.com/courses/fundamentals', type: 'free', duration: '5 hours' }
  ],

  // ── Databases ─────────────────────────────────────────────────
  mongodb: [
    { title: 'MongoDB University Free Courses', provider: 'MongoDB University', url: 'https://university.mongodb.com/', type: 'free', duration: 'Self-paced' }
  ],
  postgresql: [
    { title: 'PostgreSQL Tutorial', provider: 'PostgreSQL Tutorial', url: 'https://www.postgresqltutorial.com/', type: 'free', duration: 'Self-paced' }
  ],
  mysql: [
    { title: 'MySQL Tutorial for Beginners', provider: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=7S_tz1z_5bA', type: 'free', duration: '3 hours' }
  ],
  redis: [
    { title: 'Redis University Free Courses', provider: 'Redis University', url: 'https://university.redis.com/', type: 'free', duration: 'Self-paced' }
  ],
  elasticsearch: [
    { title: 'Elasticsearch Official Docs & Getting Started', provider: 'Elastic', url: 'https://www.elastic.co/training/free', type: 'free', duration: 'Self-paced' }
  ],

  // ── Cloud & DevOps ────────────────────────────────────────────
  aws: [
    { title: 'AWS Cloud Practitioner Essentials', provider: 'AWS Skill Builder (Free)', url: 'https://explore.skillbuilder.aws/learn/course/134/', type: 'free', duration: '6 hours' },
    { title: 'AWS Tutorial for Beginners', provider: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=k1RI5locZE4', type: 'free', duration: '5 hours' }
  ],
  azure: [
    { title: 'Microsoft Azure Fundamentals (AZ-900)', provider: 'Microsoft Learn (Free)', url: 'https://learn.microsoft.com/en-us/training/paths/azure-fundamentals/', type: 'free', duration: '10 hours' }
  ],
  gcp: [
    { title: 'Google Cloud Skills Boost - Free Tier', provider: 'Google Cloud', url: 'https://www.cloudskillsboost.google/', type: 'free', duration: 'Self-paced' }
  ],
  sagemaker: [
    { title: 'AWS SageMaker Getting Started', provider: 'AWS Skill Builder (Free)', url: 'https://explore.skillbuilder.aws/learn/course/42/', type: 'free', duration: '4 hours' }
  ],
  docker: [
    { title: 'Docker Tutorial for Beginners', provider: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo', type: 'free', duration: '2 hours' },
    { title: 'Docker Official Get Started', provider: 'Docker', url: 'https://docs.docker.com/get-started/', type: 'free', duration: 'Self-paced' }
  ],
  kubernetes: [
    { title: 'Kubernetes for Beginners', provider: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=X48VuDVv0do', type: 'free', duration: '4 hours' },
    { title: 'Introduction to Kubernetes', provider: 'edX - Linux Foundation (Audit)', url: 'https://www.edx.org/learn/kubernetes/', type: 'free-audit', duration: '2 months' }
  ],
  terraform: [
    { title: 'Terraform Course for Beginners', provider: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=SLB_c_ayRMo', type: 'free', duration: '2 hours' }
  ],
  git: [
    { title: 'Git and GitHub for Beginners', provider: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=RGOj5yH7evk', type: 'free', duration: '1 hour' }
  ],
  linux: [
    { title: 'Linux Command Line Basics', provider: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=ROjZy1WbCIA', type: 'free', duration: '5 hours' }
  ],
  'ci/cd': [
    { title: 'GitHub Actions - Full Course', provider: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=R8_veQiYBjI', type: 'free', duration: '2 hours' }
  ],
  devops: [
    { title: 'DevOps Prerequisites Course', provider: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=Wvf0mBNGjXY', type: 'free', duration: '3 hours' }
  ],

  // ── Web Frameworks ────────────────────────────────────────────
  react: [
    { title: 'Front End Development Libraries (React)', provider: 'freeCodeCamp', url: 'https://www.freecodecamp.org/learn/front-end-development-libraries/', type: 'free', duration: '300 hours' }
  ],
  nextjs: [
    { title: 'Next.js Official Learn', provider: 'Next.js', url: 'https://nextjs.org/learn', type: 'free', duration: 'Self-paced' }
  ],
  nodejs: [
    { title: 'Back End Development and APIs', provider: 'freeCodeCamp', url: 'https://www.freecodecamp.org/learn/back-end-development-and-apis/', type: 'free', duration: '300 hours' }
  ],
  django: [
    { title: 'Django for Everybody', provider: 'Coursera - Michigan (Audit)', url: 'https://www.coursera.org/specializations/django', type: 'free-audit', duration: '4 months' }
  ],
  flask: [
    { title: 'Python Flask Tutorial', provider: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=Z1RJmh_OqeA', type: 'free', duration: '1.5 hours' }
  ],
  fastapi: [
    { title: 'FastAPI Full Course', provider: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=7t2alSnE2-I', type: 'free', duration: '2 hours' }
  ],

  // ── Other ─────────────────────────────────────────────────────
  agile: [
    { title: 'Agile with Atlassian Jira', provider: 'Coursera (Audit)', url: 'https://www.coursera.org/learn/agile-atlassian-jira', type: 'free-audit', duration: '4 weeks' }
  ],
  cybersecurity: [
    { title: 'Information Security Certification', provider: 'freeCodeCamp', url: 'https://www.freecodecamp.org/learn/information-security/', type: 'free', duration: '300 hours' }
  ],
  figma: [
    { title: 'Figma UI Design Tutorial', provider: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=FTFaQWZBqQ8', type: 'free', duration: '2 hours' }
  ],

  // ── Default fallback ──────────────────────────────────────────
  default: [
    { title: 'CS50: Introduction to Computer Science', provider: 'Harvard - edX (Free)', url: 'https://cs50.harvard.edu/x/', type: 'free', duration: '10 weeks' },
    { title: 'The Missing Semester of Your CS Education', provider: 'MIT (Free)', url: 'https://missing.csail.mit.edu/', type: 'free', duration: 'Self-paced' },
    { title: 'freeCodeCamp Full Curriculum', provider: 'freeCodeCamp', url: 'https://www.freecodecamp.org/learn/', type: 'free', duration: 'Self-paced' }
  ]
};

// ── Alias map: maps keyword variants → database key ──────────────
const KEYWORD_ALIASES = {
  'node':              'nodejs',
  'node.js':           'nodejs',
  'express':           'nodejs',
  'reactnative':       'react',
  'c#':                'javascript',
  'powerbi':           'power bi',
  'scikit':            'scikit-learn',
  'sklearn':           'scikit-learn',
  'xgb':               'xgboost',
  'lgbm':              'lightgbm',
  'transformers':      'huggingface',
  'spacy':             'nlp',
  'nltk':              'nlp',
  'word2vec':          'nlp',
  'embeddings':        'nlp',
  'neural network':    'deep learning',
  'reinforcement learning': 'deep learning',
  'transfer learning': 'deep learning',
  'svm':               'machine learning',
  'decision tree':     'machine learning',
  'gradient boosting': 'machine learning',
  'recommendation system': 'machine learning',
  'etl':               'data engineering',
  'data pipeline':     'data engineering',
  'data warehouse':    'data engineering',
  'bigquery':          'gcp',
  'vertex ai':         'gcp',
  'redshift':          'aws',
  'sagemaker':         'aws',
  'azure':             'azure',
  'mlflow':            'mlops',
  'kubeflow':          'mlops',
  'dvc':               'mlops',
  'bentoml':           'mlops',
  'statistical analysis':   'statistics',
  'statistical modeling':   'statistics',
  'bayesian':          'probability',
  'anova':             'hypothesis testing',
  'chi-square':        'hypothesis testing',
  'calculus':          'linear algebra',
  'seaborn':           'seaborn',
  'bokeh':             'plotly',
  'looker':            'tableau',
  'metabase':          'tableau',
  'flink':             'kafka',
  'hive':              'hadoop',
  'pyspark':           'spark',
  'anaconda':          'python',
  'jupyter':           'python',
  'colab':             'python',
  'github':            'git',
  'gitlab':            'git',
  'bash':              'linux',
  'nginx':             'linux',
  'microservices':     'docker',
  'rest':              'nodejs',
  'graphql':           'nodejs',
  'html':              'javascript',
  'css':               'javascript',
  'tailwind':          'javascript',
  'bootstrap':         'javascript'
};

function getRecommendations(missingKeywords, jobKeyPhrases, overallScore) {
  const recommendations = [];
  const addedTitles     = new Set();
  const addedKeys       = new Set();

  function addCourse(key, reason) {
    if (addedKeys.has(key)) return;
    const courses = COURSE_DATABASE[key];
    if (!courses || courses.length === 0) return;
    const course = courses[0]; // take top course per topic
    if (!addedTitles.has(course.title)) {
      recommendations.push({ ...course, reason });
      addedTitles.add(course.title);
      addedKeys.add(key);
    }
  }

  for (const keyword of missingKeywords) {
    if (recommendations.length >= 8) break;
    const kw = keyword.toLowerCase().trim();

    // 1. Direct match
    if (COURSE_DATABASE[kw]) {
      addCourse(kw, `Learn ${keyword} — required by this job`);
      continue;
    }

    // 2. Alias match
    if (KEYWORD_ALIASES[kw]) {
      addCourse(KEYWORD_ALIASES[kw], `Strengthen ${keyword} skills`);
      continue;
    }

    // 3. Partial / fuzzy match against database keys
    let matched = false;
    for (const dbKey of Object.keys(COURSE_DATABASE)) {
      if (dbKey === 'default') continue;
      if (kw.includes(dbKey) || dbKey.includes(kw)) {
        addCourse(dbKey, `Build ${keyword} knowledge`);
        matched = true;
        break;
      }
    }

    // 4. Partial match against alias keys
    if (!matched) {
      for (const [aliasKey, dbKey] of Object.entries(KEYWORD_ALIASES)) {
        if (kw.includes(aliasKey) || aliasKey.includes(kw)) {
          addCourse(dbKey, `Build ${keyword} knowledge`);
          matched = true;
          break;
        }
      }
    }
  }

  // Fill to minimum 3 with defaults if needed
  if (recommendations.length < 3) {
    for (const course of COURSE_DATABASE.default) {
      if (!addedTitles.has(course.title)) {
        recommendations.push({ ...course, reason: 'Strengthen your core foundations' });
        addedTitles.add(course.title);
      }
      if (recommendations.length >= 3) break;
    }
  }

  return recommendations.slice(0, 8);
}

module.exports = { getRecommendations };
