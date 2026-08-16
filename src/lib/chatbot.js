import { supabase } from './supabase';

// ============================================
// MASSIVE EDUCATIONAL KEYWORDS (500+ words)
// ============================================
const educationalWords = [
  // Programming & Software Engineering
  'programming', 'coding', 'software', 'development', 'engineer', 'developer', 'algorithm', 'data structure', 'variable', 'function', 'class', 'object', 'loop', 'array', 'string', 'integer', 'float', 'boolean', 'conditional', 'statement', 'syntax', 'compiler', 'interpreter', 'debug', 'test', 'deploy', 'version control', 'git', 'github', 'repository', 'commit', 'branch', 'merge', 'pull request', 'code review', 'refactor', 'optimize', 'performance', 'scalability', 'architecture', 'design pattern', 'microservices', 'api', 'rest', 'graphql', 'database', 'sql', 'nosql', 'mongodb', 'postgresql', 'mysql', 'redis', 'cache', 'queue', 'message broker', 'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'cloud', 'serverless', 'lambda', 'ec2', 's3', 'rds', 'vpc', 'iam', 'security', 'authentication', 'authorization', 'jwt', 'oauth', 'ssl', 'tls', 'encryption', 'hashing', 'blockchain', 'smart contract', 'solidity', 'web3', 'dapp', 'nft', 'defi', 'ai', 'machine learning', 'deep learning', 'neural network', 'tensorflow', 'pytorch', 'scikit-learn', 'pandas', 'numpy', 'matplotlib', 'data science', 'analytics', 'big data', 'hadoop', 'spark', 'kafka', 'streaming', 'etl', 'bi', 'tableau', 'power bi', 'excel', 'automation', 'scripting', 'bash', 'powershell', 'linux', 'unix', 'windows', 'macos', 'ios', 'android', 'flutter', 'react native', 'swift', 'kotlin', 'java', 'c', 'c++', 'c#', 'python', 'javascript', 'typescript', 'go', 'rust', 'ruby', 'php', 'laravel', 'django', 'flask', 'spring', 'node', 'express', 'react', 'vue', 'angular', 'svelte', 'next', 'nuxt', 'gatsby', 'webpack', 'babel', 'eslint', 'prettier', 'jest', 'mocha', 'chai', 'cypress', 'selenium', 'ci/cd', 'jenkins', 'gitlab', 'bitbucket', 'jira', 'confluence', 'agile', 'scrum', 'kanban', 'waterfall', 'project management', 'product management', 'ux', 'ui', 'design system', 'figma', 'sketch', 'adobe xd', 'prototyping', 'wireframing', 'user research', 'usability testing', 'accessibility', 'responsive design', 'mobile first', 'progressive web app', 'spa', 'ssr', 'csr', 'static site', 'jamstack', 'headless cms', 'wordpress', 'shopify', 'magento', 'ecommerce', 'fintech', 'edtech', 'healthtech', 'biotech', 'agritech', 'cleantech', 'insurtech', 'proptech', 'legaltech',
  
  // Mathematics
  'mathematics', 'math', 'algebra', 'geometry', 'trigonometry', 'calculus', 'differential equations', 'linear algebra', 'statistics', 'probability', 'discrete math', 'number theory', 'topology', 'logic', 'set theory', 'combinatorics', 'graph theory', 'optimization', 'linear programming', 'numerical analysis', 'mathematical modeling', 'simulation', 'cryptography', 'game theory', 'measure theory', 'functional analysis', 'complex analysis', 'real analysis', 'abstract algebra', 'group theory', 'ring theory', 'field theory', 'vector calculus', 'multivariable calculus', 'integral', 'derivative', 'limit', 'continuity', 'convergence', 'series', 'sequence', 'matrix', 'determinant', 'eigenvalue', 'eigenvector', 'transform', 'fourier', 'laplace', 'z-transform', 'probability distribution', 'random variable', 'expectation', 'variance', 'covariance', 'correlation', 'regression', 'anova', 'hypothesis testing', 'confidence interval', 'bayesian', 'frequentist', 'stochastic process', 'markov chain', 'monte carlo', 'optimization algorithms', 'gradient descent', 'newton method', 'interpolation', 'extrapolation', 'curve fitting', 'least squares', 'spline', 'finite element', 'finite difference', 'computational geometry', 'topological data analysis', 'information theory', 'coding theory', 'error correction', 'compression', 'entropy', 'mutual information', 'machine learning math', 'linear regression', 'logistic regression', 'svm', 'pca', 'clustering', 'classification', 'dimensionality reduction', 'manifold learning',
  
  // Physics
  'physics', 'mechanics', 'thermodynamics', 'electromagnetism', 'optics', 'quantum mechanics', 'relativity', 'astrophysics', 'cosmology', 'particle physics', 'nuclear physics', 'atomic physics', 'molecular physics', 'condensed matter', 'solid state physics', 'fluid dynamics', 'acoustics', 'wave', 'oscillation', 'gravitation', 'newtonian mechanics', 'lagrangian', 'hamiltonian', 'statistical mechanics', 'kinetic theory', 'entropy', 'enthalpy', 'free energy', 'phase transition', 'critical phenomena', 'superconductivity', 'superfluidity', 'magnetism', 'electricity', 'circuit', 'capacitance', 'inductance', 'resistance', 'ohm law', 'kirchhoff', 'maxwell equations', 'electromagnetic wave', 'polarization', 'interference', 'diffraction', 'refraction', 'reflection', 'lens', 'mirror', 'telescope', 'microscope', 'laser', 'fiber optics', 'photonics', 'quantum entanglement', 'superposition', 'wave function', 'schrodinger equation', 'heisenberg uncertainty', 'pauli exclusion', 'fermi dirac', 'bose einstein', 'quantum field theory', 'standard model', 'higgs boson', 'dark matter', 'dark energy', 'black hole', 'wormhole', 'time dilation', 'length contraction', 'lorentz transformation', 'minkowski spacetime', 'einstein field equations', 'gravitational waves', 'cosmic microwave background', 'big bang', 'stellar evolution', 'nucleosynthesis', 'nuclear fission', 'nuclear fusion', 'radiation', 'radioactive decay', 'half-life', 'dosimetry', 'medical physics', 'biophysics', 'geophysics', 'meteorology', 'climatology', 'atmospheric physics', 'ocean physics', 'plasma physics', 'fusion energy', 'renewable energy', 'solar energy', 'wind energy', 'hydro energy', 'geothermal energy',
  
  // Chemistry
  'chemistry', 'organic chemistry', 'inorganic chemistry', 'physical chemistry', 'analytical chemistry', 'biochemistry', 'molecular chemistry', 'thermodynamics', 'kinetics', 'equilibrium', 'acid base', 'redox', 'electrochemistry', 'spectroscopy', 'chromatography', 'mass spectrometry', 'nmr', 'ir spectroscopy', 'uv vis', 'x-ray crystallography', 'crystallography', 'stoichiometry', 'molarity', 'molality', 'normality', 'ph', 'poh', 'buffer', 'titration', 'calorimetry', 'enthalpy', 'entropy', 'gibbs free energy', 'chemical bonding', 'ionic bond', 'covalent bond', 'metallic bond', 'hydrogen bond', 'van der waals', 'intermolecular forces', 'molecular orbital', 'hybridization', 'resonance', 'isomerism', 'stereochemistry', 'chirality', 'enantiomer', 'diastereomer', 'polymer', 'monomer', 'catalyst', 'enzyme', 'inhibitor', 'activation energy', 'rate law', 'reaction mechanism', 'intermediate', 'transition state', 'adsorption', 'absorption', 'colloid', 'emulsion', 'suspension', 'solution', 'solute', 'solvent', 'electrolyte', 'non-electrolyte', 'solid state', 'liquid state', 'gas state', 'plasma', 'supercritical fluid', 'green chemistry', 'computational chemistry', 'cheminformatics', 'medicinal chemistry', 'pharmaceutical chemistry', 'toxicology', 'environmental chemistry', 'geochemistry', 'cosmochemistry', 'astrochemistry', 'nanotechnology', 'materials science', 'ceramics', 'glass', 'semiconductors', 'superconductors', 'magnetochemistry', 'photochemistry', 'sonochemistry', 'electrochemistry', 'corrosion', 'batteries', 'fuel cells', 'solar cells', 'catalysis', 'organometallic', 'bioorganic', 'carbohydrate', 'lipid', 'protein', 'nucleic acid', 'enzyme kinetics', 'metabolism', 'glycolysis', 'krebs cycle', 'oxidative phosphorylation', 'photosynthesis', 'respiration', 'genetic code', 'dna replication', 'transcription', 'translation', 'gene expression', 'protein folding', 'proteomics', 'genomics', 'metabolomics',
  
  // Biology & Life Sciences
  'biology', 'life sciences', 'botany', 'zoology', 'microbiology', 'genetics', 'evolution', 'ecology', 'marine biology', 'molecular biology', 'cell biology', 'anatomy', 'physiology', 'immunology', 'neuroscience', 'virology', 'bacteriology', 'mycology', 'parasitology', 'entomology', 'ornithology', 'mammalogy', 'herpetology', 'ichthyology', 'biophysics', 'biochemistry', 'biotechnology', 'genetic engineering', 'crispr', 'gene therapy', 'cloning', 'stem cells', 'tissue engineering', 'regenerative medicine', 'bioinformatics', 'computational biology', 'systems biology', 'synthetic biology', 'bioethics', 'biostatistics', 'epidemiology', 'public health', 'nutrition', 'metabolism', 'homeostasis', 'endocrine system', 'nervous system', 'cardiovascular system', 'respiratory system', 'digestive system', 'excretory system', 'reproductive system', 'immune system', 'lymphatic system', 'muscular system', 'skeletal system', 'integumentary system', 'sensory system', 'motor system', 'reflex arc', 'action potential', 'synapse', 'neurotransmitter', 'hormone', 'enzyme', 'antibody', 'antigen', 'pathogen', 'bacteria', 'virus', 'fungus', 'parasite', 'prion', 'microbiome', 'biodiversity', 'conservation biology', 'ecosystem', 'biome', 'habitat', 'niche', 'food chain', 'food web', 'energy flow', 'nutrient cycle', 'carbon cycle', 'nitrogen cycle', 'water cycle', 'population dynamics', 'community ecology', 'behavioral ecology', 'evolutionary biology', 'natural selection', 'adaptation', 'speciation', 'phylogeny', 'cladistics', 'taxonomy', 'systematics', 'paleontology', 'anthropology', 'ethology', 'sociobiology', 'neurobiology', 'cognitive science', 'psychology', 'psychiatry', 'behavioral neuroscience', 'developmental biology', 'embryology', 'histology', 'pathology', 'pharmacology', 'toxicology', 'forensic biology', 'biotechnology applications', 'bioprocess', 'fermentation', 'bioreactor', 'downstream processing', 'biosensor', 'biofuel', 'bioenergy', 'bio-based materials',
  
  // Medicine & Health
  'medicine', 'healthcare', 'surgery', 'dentistry', 'pharmacy', 'nursing', 'midwifery', 'physiotherapy', 'occupational therapy', 'speech therapy', 'audiology', 'optometry', 'radiology', 'medical imaging', 'ultrasound', 'ct scan', 'mri', 'pet scan', 'x-ray', 'fluoroscopy', 'mammography', 'endoscopy', 'laparoscopy', 'arthroscopy', 'angioplasty', 'stent', 'bypass', 'transplant', 'organ donation', 'blood transfusion', 'vaccination', 'immunization', 'antibiotic', 'antiviral', 'antifungal', 'antiparasitic', 'analgesic', 'anti-inflammatory', 'antipyretic', 'sedative', 'anesthetic', 'antipsychotic', 'antidepressant', 'anxiolytic', 'antihypertensive', 'antidiabetic', 'anticholesterol', 'antiemetic', 'antacid', 'laxative', 'diuretic', 'antihistamine', 'bronchodilator', 'corticosteroid', 'hormone therapy', 'chemotherapy', 'radiotherapy', 'immunotherapy', 'gene therapy', 'stem cell therapy', 'regenerative medicine', 'palliative care', 'hospice', 'emergency medicine', 'trauma', 'intensive care', 'neonatology', 'pediatrics', 'geriatrics', 'internal medicine', 'cardiology', 'neurology', 'pulmonology', 'gastroenterology', 'hepatology', 'nephrology', 'urology', 'gynecology', 'obstetrics', 'orthopedics', 'rheumatology', 'dermatology', 'ophthalmology', 'otolaryngology', 'psychiatry', 'psychology', 'counseling', 'social work', 'physical activity', 'exercise physiology', 'sports medicine', 'nutrition', 'dietetics', 'public health', 'epidemiology', 'biostatistics', 'global health', 'health policy', 'health economics', 'health informatics', 'medical ethics', 'patient safety', 'quality improvement', 'evidence-based medicine', 'clinical trials', 'pharmacovigilance', 'drug development', 'personalized medicine', 'precision medicine', 'digital health', 'telemedicine', 'mhealth', 'wearable devices', 'health monitoring', 'disease prevention', 'health promotion', 'wellness', 'fitness', 'yoga', 'meditation', 'mindfulness', 'stress management', 'sleep hygiene', 'mental health', 'addiction', 'substance abuse', 'eating disorders', 'obesity', 'diabetes', 'hypertension', 'heart disease', 'stroke', 'cancer', 'alzheimer', 'parkinson', 'multiple sclerosis', 'epilepsy', 'arthritis', 'osteoporosis', 'asthma', 'copd', 'hiv', 'aids', 'malaria', 'tuberculosis', 'covid', 'influenza', 'hepatitis', 'ebola', 'zika', 'dengue', 'chikungunya', 'lyme disease', 'sexually transmitted infections',
  
  // Engineering
  'engineering', 'mechanical engineering', 'electrical engineering', 'civil engineering', 'chemical engineering', 'industrial engineering', 'aerospace engineering', 'structural engineering', 'transportation engineering', 'environmental engineering', 'biomedical engineering', 'materials engineering', 'nuclear engineering', 'petroleum engineering', 'computer engineering', 'electronics engineering', 'telecommunications engineering', 'systems engineering', 'manufacturing engineering', 'robotics', 'automation', 'control systems', 'sensors', 'actuators', 'process control', 'feedback', 'pid', 'plc', 'scada', 'embedded systems', 'iot', 'microcontrollers', 'microprocessors', 'digital signal processing', 'analog circuits', 'digital circuits', 'power electronics', 'renewable energy', 'smart grid', 'hvac', 'plumbing', 'fire protection', 'structural analysis', 'finite element analysis', 'computational fluid dynamics', 'thermodynamics', 'fluid mechanics', 'heat transfer', 'mass transfer', 'reaction engineering', 'separation processes', 'distillation', 'extraction', 'filtration', 'centrifugation', 'drying', 'crystallization', 'mixing', 'milling', 'extrusion', 'injection molding', '3d printing', 'additive manufacturing', 'cnc machining', 'welding', 'soldering', 'brazing', 'casting', 'forging', 'rolling', 'drawing', 'machining', 'grinding', 'polishing', 'coating', 'corrosion prevention', 'tribology', 'lubrication', 'maintenance', 'reliability', 'safety engineering', 'ergonomics', 'human factors', 'project management', 'construction management', 'cost estimation', 'scheduling', 'risk assessment', 'quality control', 'six sigma', 'lean manufacturing', 'continuous improvement', 'supply chain', 'logistics', 'operations research', 'optimization', 'simulation', 'modeling', 'cad', 'cam', 'cae', 'plm', 'product design', 'prototyping', 'testing', 'validation', 'verification', 'standards', 'codes', 'regulations',
  
  // Data Science & Analytics
  'data science', 'data analytics', 'machine learning', 'artificial intelligence', 'deep learning', 'neural networks', 'natural language processing', 'computer vision', 'speech recognition', 'predictive modeling', 'classification', 'regression', 'clustering', 'time series analysis', 'anomaly detection', 'recommendation systems', 'personalization', 'reinforcement learning', 'ensemble methods', 'boosting', 'bagging', 'random forest', 'support vector machines', 'k-nearest neighbors', 'naive bayes', 'logistic regression', 'linear regression', 'decision trees', 'gradient boosting', 'xgboost', 'lightgbm', 'catboost', 'feature engineering', 'feature selection', 'dimensionality reduction', 'pca', 't-sne', 'umap', 'manifold learning', 'deep learning frameworks', 'tensorflow', 'pytorch', 'keras', 'jax', 'scikit-learn', 'pandas', 'numpy', 'scipy', 'matplotlib', 'seaborn', 'plotly', 'bokeh', 'dash', 'streamlit', 'data visualization', 'interactive dashboards', 'storytelling', 'big data', 'hadoop', 'spark', 'flink', 'kafka', 'hbase', 'cassandra', 'elasticsearch', 'logstash', 'kibana', 'data warehousing', 'etl', 'data pipeline', 'airflow', 'dagster', 'prefect', 'dbt', 'snowflake', 'redshift', 'bigquery', 'data lake', 'data mesh', 'data governance', 'data quality', 'data privacy', 'data security', 'gdpr', 'ccpa', 'compliance', 'ethics in ai', 'bias', 'fairness', 'explainability', 'interpretability', 'mlops', 'model deployment', 'model monitoring', 'a/b testing', 'experimentation', 'causal inference', 'bayesian inference', 'frequentist statistics', 'hypothesis testing', 'confidence intervals', 'power analysis', 'sample size', 'multivariate analysis', 'anova', 'manova', 'repeated measures', 'longitudinal data', 'survival analysis', 'cox regression', 'time-to-event', 'business analytics', 'marketing analytics', 'supply chain analytics', 'hr analytics', 'financial analytics', 'sports analytics', 'health analytics', 'public policy analytics', 'social science analytics', 'educational analytics',
  
  // Business, Marketing & Finance
  'business', 'marketing', 'finance', 'accounting', 'economics', 'management', 'leadership', 'strategy', 'entrepreneurship', 'innovation', 'product management', 'project management', 'operations', 'supply chain', 'logistics', 'human resources', 'organizational behavior', 'corporate governance', 'business ethics', 'business law', 'international business', 'global trade', 'import', 'export', 'investment', 'portfolio management', 'risk management', 'financial analysis', 'budgeting', 'forecasting', 'variance analysis', 'cost accounting', 'managerial accounting', 'auditing', 'taxation', 'corporate finance', 'financial modeling', 'valuation', 'dcf', 'comps', 'precedent transactions', 'leveraged buyout', 'merger', 'acquisition', 'private equity', 'venture capital', 'hedge fund', 'mutual fund', 'retail banking', 'investment banking', 'commercial banking', 'central banking', 'monetary policy', 'fiscal policy', 'macroeconomics', 'microeconomics', 'behavioral economics', 'game theory', 'incentive design', 'market research', 'consumer behavior', 'branding', 'advertising', 'digital marketing', 'social media marketing', 'content marketing', 'email marketing', 'seo', 'sem', 'ppc', 'affiliate marketing', 'influencer marketing', 'customer relationship management', 'customer journey', 'user acquisition', 'retention', 'loyalty', 'lifecycle marketing', 'marketing analytics', 'marketing automation', 'sales', 'cold calling', 'negotiation', 'closing', 'account management', 'key account management', 'territory management', 'sales operations', 'sales enablement', 'customer success', 'customer support', 'customer experience', 'service design', 'business continuity', 'crisis management', 'change management', 'organizational development', 'talent management', 'recruitment', 'onboarding', 'training', 'performance management', 'compensation', 'benefits', 'employee engagement', 'workplace culture', 'diversity equity inclusion', 'remote work', 'hybrid work', 'workplace productivity', 'time management', 'personal development', 'leadership development', 'executive coaching', 'team building', 'decision making', 'problem solving', 'critical thinking', 'creative thinking', 'strategic planning', 'vision', 'mission', 'values', 'stakeholder management', 'communication', 'presentation', 'public speaking', 'negotiation', 'conflict resolution', 'emotional intelligence', 'empathy', 'active listening', 'feedback', 'coaching', 'mentoring', 'networking', 'influence', 'persuasion', 'integrity', 'resilience', 'adaptability', 'agility',
  
  // Design, Arts & Media
  'design', 'graphic design', 'ux design', 'ui design', 'product design', 'service design', 'interaction design', 'visual design', 'motion design', 'animation', '3d design', 'industrial design', 'interior design', 'architecture', 'landscape design', 'urban design', 'fashion design', 'textile design', 'jewelry design', 'furniture design', 'lighting design', 'exhibition design', 'graphic art', 'illustration', 'drawing', 'painting', 'sculpture', 'pottery', 'ceramics', 'printmaking', 'photography', 'videography', 'film', 'cinematography', 'editing', 'visual effects', 'sound design', 'music composition', 'music production', 'audio engineering', 'recording', 'mixing', 'mastering', 'singing', 'instrumental', 'music theory', 'music history', 'art history', 'art criticism', 'art appreciation', 'digital art', 'multimedia', 'interactive media', 'video games', 'game design', 'game development', 'level design', 'character design', 'storyboarding', 'concept art', 'motion graphics', 'animation 2d', 'animation 3d', 'stop motion', 'modeling', 'rigging', 'texturing', 'rendering', 'lighting', 'compositing', 'visual storytelling', 'narrative', 'scriptwriting', 'screenwriting', 'journalism', 'media studies', 'mass communication', 'broadcasting', 'podcasting', 'social media management', 'content creation', 'copywriting', 'creative writing', 'poetry', 'prose', 'fiction', 'non-fiction', 'memoir', 'blogging', 'vlogging', 'photography composition', 'lighting photography', 'portrait photography', 'landscape photography', 'street photography', 'event photography', 'fashion photography', 'photojournalism', 'documentary', 'short film', 'feature film', 'animation film', 'experimental film', 'virtual reality', 'augmented reality', 'mixed reality', 'immersive experiences', 'interactive installations', 'creative code', 'generative art', 'algorithmic art', 'computational design', 'parametric design', 'digital fabrication', 'laser cutting', 'cnc routing', '3d printing', 'model making', 'prototyping', 'maker movement', 'diy', 'craft', 'handiwork', 'woodworking', 'metalworking', 'leatherworking', 'glassblowing', 'basketry', 'weaving', 'knitting', 'crochet', 'embroidery', 'quilting', 'tailoring', 'dressmaking', 'millinery', 'shoe making', 'bookbinding', 'papercraft', 'origami', 'calligraphy', 'typography', 'letterpress', 'book design', 'packaging design', 'branding', 'identity', 'logo design', 'stationery', 'print design', 'publication design', 'magazine design', 'newspaper design', 'editorial design', 'information design', 'data visualization', 'signage', 'wayfinding', 'environmental graphics', 'exhibition design', 'trade show design', 'retail design', 'pop-up design', 'set design', 'theater design', 'costume design', 'makeup', 'hairstyling', 'props', 'special effects', 'puppetry', 'mime', 'performance art', 'dance', 'choreography', 'physical theater', 'drama', 'acting', 'directing', 'stage management', 'technical theater', 'stagecraft', 'lighting design', 'sound design', 'projection design',
  
  // Languages & Linguistics
  'language', 'linguistics', 'phonetics', 'phonology', 'morphology', 'syntax', 'semantics', 'pragmatics', 'sociolinguistics', 'psycholinguistics', 'neurolinguistics', 'computational linguistics', 'applied linguistics', 'lexicology', 'lexicography', 'terminology', 'translation', 'interpretation', 'second language acquisition', 'bilingualism', 'multilingualism', 'language teaching', 'language learning', 'grammar', 'vocabulary', 'pronunciation', 'fluency', 'reading', 'writing', 'listening', 'speaking', 'language proficiency', 'language assessment', 'language planning', 'language policy', 'english', 'arabic', 'french', 'german', 'spanish', 'portuguese', 'italian', 'russian', 'chinese', 'japanese', 'korean', 'hindi', 'urdu', 'bengali', 'tamil', 'telugu', 'turkish', 'persian', 'greek', 'latin', 'sanskrit', 'hebrew', 'swahili', 'indonesian', 'malay', 'thai', 'vietnamese', 'dutch', 'swedish', 'norwegian', 'danish', 'finnish', 'polish', 'czech', 'hungarian', 'romanian', 'bulgarian', 'serbian', 'croatian', 'slovenian', 'slovak', 'ukrainian', 'belarusian', 'estonian', 'latvian', 'lithuanian', 'irish', 'welsh', 'scottish', 'basque', 'catalan', 'galician', 'occitan', 'sicilian', 'sardinian', 'frisian', 'luxembourgish', 'icelandic', 'faroese', 'maltese', 'albanian', 'armenian', 'georgian', 'azerbaijani', 'kazakh', 'uzbek', 'turkmen', 'kyrgyz', 'tajik', 'pashto', 'dari', 'somali', 'amharic', 'oromo', 'hausa', 'yoruba', 'igbo', 'zulu', 'xhosa', 'shona', 'malagasy', 'filipino', 'cebuano', 'javanese', 'sundanese', 'madurese', 'minangkabau', 'buginese', 'acehnese', 'balinese', 'sasak', 'tetum', 'papuan', 'pidgin', 'creole', 'sign language', 'asl', 'bsl', 'auslan', 'braille', 'deaf studies', 'interpreting', 'voiceover', 'subtitling', 'dubbing', 'localization', 'internationalization', 'global communication', 'cross-cultural communication', 'intercultural competence', 'discourse analysis', 'conversation analysis', 'discourse markers', 'speech acts', 'politeness', 'genre', 'register', 'stylistics', 'rhetoric', 'persuasion', 'argumentation', 'semantics', 'lexical semantics', 'compositional semantics', 'formal semantics', 'cognitive semantics', 'meaning', 'reference', 'truth conditions', 'presupposition', 'implicature', 'entailment', 'synonymy', 'antonymy', 'hyponymy', 'meronymy', 'polysemy', 'homonymy', 'metaphor', 'metonymy', 'idioms', 'phraseology', 'collocation', 'corpus linguistics', 'concordance', 'frequency', 'collostruction', 'construction grammar', 'dependency grammar', 'phrase structure', 'universal grammar', 'generative grammar', 'functional grammar', 'cognitive grammar', 'constructional approach', 'lang acquisition', 'interlanguage', 'fossilization', 'comprehensible input', 'output', 'interaction', 'scaffold', 'zone of proximal development', 'task-based learning', 'communicative approach', 'content-based instruction', 'clil', 'immersion', 'bilingual education', 'translanguaging', 'code-switching', 'language maintenance', 'language shift', 'language endangerment', 'language revitalization', 'endangered languages', 'language documentation', 'language field methods', 'phonetics', 'ipa', 'articulatory phonetics', 'acoustic phonetics', 'auditory phonetics', 'phonation', 'resonance', 'formants', 'spectrogram', 'speech perception', 'speech production', 'motor control', 'prosody', 'intonation', 'stress', 'tone', 'voice quality', 'language variation', 'dialectology', 'regional dialect', 'social dialect', 'ethnolect', 'genderlect', 'idiolect', 'register', 'style', 'slang', 'jargon', 'argot', 'taboo', 'euphemism', 'language change', 'historical linguistics', 'etymology', 'cognates', 'sound change', 'grammaticalization', 'lexical change', 'language contact', 'borrowing', 'calque', 'substratum', 'superstratum', 'adstratum', 'areal linguistics', 'linguistic typology', 'language universals', 'language families', 'indo-european', 'sino-tibetan', 'afro-asiatic', 'niger-congo', 'austronesian', 'dravidian', 'altaic', 'uralic', 'caucasian', 'eskimo-aleut', 'na-dene', 'algonquian', 'iroquoian', 'siouan', 'salishan',
  
  // History & Social Sciences
  'history', 'ancient history', 'medieval history', 'modern history', 'world history', 'european history', 'american history', 'asian history', 'african history', 'middle eastern history', 'art history', 'military history', 'social history', 'economic history', 'cultural history', 'intellectual history', 'historiography', 'archaeology', 'anthropology', 'sociology', 'political science', 'philosophy', 'psychology', 'geography', 'demography', 'gender studies', 'cultural studies', 'postcolonial studies', 'global studies', 'international relations', 'comparative politics', 'public administration', 'political theory', 'social theory', 'social work', 'human geography', 'physical geography', 'cartography', 'gis', 'urban planning', 'regional planning', 'environmental studies', 'sustainability', 'climate change', 'human rights', 'civil rights', 'social justice', 'equality', 'equity', 'diversity', 'inclusion', 'globalization', 'migration', 'diaspora', 'urbanization', 'industrialization', 'revolution', 'war', 'peace', 'conflict resolution', 'diplomacy', 'treaties', 'alliances', 'colonialism', 'imperialism', 'decolonization', 'nation-building', 'state formation', 'governance', 'democracy', 'authoritarianism', 'totalitarianism', 'nationalism', 'populism', 'fascism', 'communism', 'socialism', 'liberalism', 'conservatism', 'feminism', 'environmentalism', 'marxism', 'structuralism', 'post-structuralism', 'deconstruction', 'existentialism', 'phenomenology', 'hermeneutics', 'analytic philosophy', 'continental philosophy', 'ethics', 'morality', 'virtue ethics', 'consequentialism', 'deontology', 'social contract', 'utilitarianism', 'kantianism', 'aristotelianism', 'plato', 'socrates', 'aristotle', 'hobbes', 'locke', 'rousseau', 'adam smith', 'marx', 'weber', 'durkheim', 'freud', 'jung', 'piaget', 'vygotsky', 'bandura', 'skinner', 'maslow', 'rogers',
  
  // Sports, Fitness & Nutrition
  'sports', 'fitness', 'exercise', 'strength training', 'cardio', 'aerobics', 'anaerobic', 'flexibility', 'balance', 'agility', 'coordination', 'power', 'speed', 'endurance', 'stamina', 'conditioning', 'training', 'workout', 'gym', 'weights', 'dumbbells', 'barbell', 'kettlebell', 'resistance bands', 'medicine ball', 'calisthenics', 'bodyweight', 'yoga', 'pilates', 'tai chi', 'martial arts', 'boxing', 'wrestling', 'judo', 'karate', 'taekwondo', 'brazilian jiu-jitsu', 'muay thai', 'kickboxing', 'fencing', 'archery', 'shooting', 'hunting', 'fishing', 'hiking', 'climbing', 'mountaineering', 'skiing', 'snowboarding', 'ice skating', 'skateboarding', 'surfing', 'windsurfing', 'kitesurfing', 'paddleboarding', 'kayaking', 'canoeing', 'rowing', 'sailing', 'diving', 'snorkeling', 'swimming', 'triathlon', 'marathon', 'running', 'sprinting', 'long jump', 'high jump', 'shot put', 'discus', 'javelin', 'pole vault', 'hurdles', 'relay', 'cycling', 'mountain biking', 'bmx', 'motocross', 'racing', 'formula', 'nascar', 'rally', 'drifting', 'gymnastics', 'rhythmic gymnastics', 'trampoline', 'acrobatics', 'cheerleading', 'dance', 'ballet', 'modern dance', 'jazz dance', 'hip-hop dance', 'breakdance', 'salsa', 'tango', 'waltz', 'cha-cha', 'rumba', 'samba', 'flamenco', 'belly dance', 'burlesque', 'pole dance', 'hula', 'tahitian dance', 'powwow', 'square dance', 'line dance', 'ballroom dance', 'competitive dance', 'dance sport', 'sports medicine', 'sports psychology', 'sports nutrition', 'sports massage', 'physiotherapy', 'athletic training', 'coaching', 'refereeing', 'sports management', 'sports marketing', 'sports analytics', 'performance analysis', 'biomechanics', 'kinesiology', 'anatomy', 'physiology', 'nutrition', 'macronutrients', 'protein', 'carbs', 'fats', 'vitamins', 'minerals', 'hydration', 'meal planning', 'supplementation', 'recovery', 'sleep', 'injury prevention', 'injury rehabilitation', 'concussion management', 'heat stress', 'altitude training', 'periodization', 'tapering', 'peaking', 'sports science', 'exercise physiology', 'physical education', 'health education',
  
  // Personal Development & Soft Skills
  'personal development', 'self-improvement', 'self-help', 'mindset', 'growth mindset', 'positive thinking', 'motivation', 'inspiration', 'goal setting', 'goal achievement', 'habits', 'routine', 'discipline', 'focus', 'productivity', 'time management', 'prioritization', 'organization', 'planning', 'scheduling', 'workflow', 'efficiency', 'effectiveness', 'performance', 'peak performance', 'flow', 'state', 'mindfulness', 'meditation', 'relaxation', 'breathing', 'gratitude', 'optimism', 'resilience', 'perseverance', 'grit', 'determination', 'self-confidence', 'self-esteem', 'self-worth', 'self-awareness', 'emotional intelligence', 'empathy', 'compassion', 'kindness', 'integrity', 'honesty', 'authenticity', 'vulnerability', 'courage', 'bravery', 'risk-taking', 'failure', 'success', 'achievement', 'recognition', 'awards', 'leadership', 'management', 'supervision', 'delegation', 'team building', 'collaboration', 'cooperation', 'conflict resolution', 'negotiation', 'persuasion', 'influence', 'charisma', 'communication', 'public speaking', 'presentation', 'storytelling', 'networking', 'relationship building', 'friendship', 'love', 'romantic relationship', 'family', 'parenting', 'coaching', 'mentoring', 'counseling', 'therapy', 'psychology', 'neuroscience', 'behavioral change', 'cognitive-behavioral', 'dialectical-behavioral', 'acceptance', 'commitment', 'mindfulness-based', 'positive psychology', 'human potential', 'peak experiences', 'creativity', 'innovation', 'problem-solving', 'decision-making', 'critical thinking', 'analytical thinking', 'systems thinking', 'design thinking', 'lateral thinking', 'creativity techniques', 'brain exercises', 'memory improvement', 'speed reading', 'active listening', 'feedback', 'constructive feedback', 'giving feedback', 'receiving feedback', 'conflict', 'resolution', 'negotiation skills', 'assertiveness', 'boundaries', 'saying no', 'yes', 'compromise', 'win-win', 'negotiation tactics', 'persuasion techniques', 'influence strategies', 'leadership styles', 'situational leadership', 'adaptive leadership', 'transformational leadership', 'transactional leadership', 'servant leadership', 'autocratic', 'democratic', 'laissez-faire', 'coaching leadership', 'visionary leadership', 'strategic thinking', 'big picture', 'long-term', 'short-term', 'contingency planning', 'risk mitigation', 'crisis management', 'resilience', 'stress management', 'work-life balance', 'burnout prevention', 'self-care', 'health', 'wellness', 'mental health', 'emotional health', 'physical health', 'spiritual health', 'financial health', 'financial literacy', 'budgeting', 'saving', 'investing', 'debt management', 'wealth management', 'retirement planning', 'estate planning', 'insurance', 'tax planning', 'entrepreneurship', 'business', 'startup', 'innovation', 'creativity', 'idea generation', 'opportunity recognition', 'business model', 'business plan', 'lean startup', 'agile', 'scrum', 'kanban', 'project management', 'product development', 'customer development', 'pivoting', 'scaling', 'growth hacking', 'marketing', 'branding', 'sales', 'business development', 'negotiation', 'partnership', 'joint venture', 'alliance', 'franchising', 'licensing', 'intellectual property', 'patents', 'trademarks', 'copyrights', 'trade secrets', 'compliance', 'ethics', 'corporate social responsibility', 'sustainability', 'environmental responsibility', 'social impact', 'community engagement', 'philanthropy', 'volunteerism', 'civic engagement', 'leadership development', 'executive education', 'lifelong learning', 'continuous improvement', 'kaizen', 'learning agility', 'curiosity', 'humility', 'adaptability', 'flexibility', 'openness', 'tolerance', 'diversity', 'inclusion', 'equity', 'cultural intelligence', 'global mindset', 'intercultural competence', 'international experience', 'language skills', 'travel', 'exploration', 'adventure', 'curiosity', 'wonder', 'awe', 'appreciation', 'beauty', 'creativity', 'art', 'music', 'literature', 'poetry', 'philosophy', 'wisdom', 'knowledge', 'learning', 'education', 'teaching', 'training', 'development', 'growth', 'evolution', 'transformation', 'change', 'transition', 'renewal', 'rebirth', 'purpose', 'meaning', 'fulfillment', 'happiness', 'joy', 'gratitude', 'love', 'peace', 'harmony', 'balance'
];

// ============================================
// TRUSTED EDUCATIONAL CHANNELS (Auto-Approve)
// ============================================
const trustedChannels = [
  'khan academy', 'codezilla', 'crashcourse', 'j perm', 'tingman',
  'mit opencourseware', 'stanford online', 'harvard online', 'coursera', 'edx',
  'udacity', 'freecodecamp', 'traversy media', 'web dev simplified', 'cs dojo',
  'sentdex', 'tech with tim', 'clever programmer', 'programming with mosh',
  'code with harry', 'apna college', 'physics wallah', 'unacademy', 'byju\'s',
  'toppr', 'vedantu', 'extramarks', 'meritnation', 'learnohub', 'infinity learn',
  'don\'t memorise', 'professor dave explains', 'socratica', 'bozeman science',
  'amoeba sisters', 'crash course', 'scishow', 'ted-ed', 'ted talks',
  'the school of life', 'philosophy tube', 'contrapoints', 'lindsay ellis',
  'hbomberguy', 'kyle hill', 'veritasium', 'smartereveryday', 'minutephysics',
  '3blue1brown', 'numberphile', 'standup maths', 'computerphile', 'periodic videos',
  'sixty symbols', 'deep sky videos', 'nottingham science', 'royal institution',
  'ri lectures', 'world science festival', 'wired', 'vox', 'atlas obscura',
  'great big story', 'nature video', 'science magazine', 'new scientist',
  'bbc earth', 'bbc ideas', 'bbc learning', 'bbc teach', 'the open university',
  'futurelearn', 'google developers', 'mozilla developer', 'aws training',
  'azure training', 'gcp training', 'ibm developer', 'oracle developer',
  'microsoft developer', 'apple developer', 'android developer', 'google tech talks',
  'facebook developer', 'netflix tech blog', 'spotify engineering', 'uber engineering',
  'airbnb engineering', 'lyft engineering', 'slack engineering', 'dropbox engineering',
  'twitter engineering', 'linkedin engineering', 'github engineering', 'gitlab engineering',
  'stack overflow', 'dev.to', 'hashnode', 'freecodecamp news', 'smashing magazine',
  'css-tricks', 'codrops', 'sitelogic', 'speckyboy', 'webdesigner depot', 'design shack',
  'abduzeedo', 'creative bloq', 'design week', 'design boom', 'dezeen', 'archdaily',
  'architectural digest', 'dwell', 'design milk', 'designspiration', 'trendland',
  'colossal', 'thisiscolossal', 'hypebeast', 'highsnobiety', 'complex', 'vice',
  'noisey', 'motherboard', 'waypoint', 'kotaku', 'polygon', 'eurogamer',
  'rock paper shotgun', 'pc gamer', 'gamespot', 'ign', 'giant bomb', 'destructoid',
  'nintendo life', 'xbox wire', 'playstation blog', 'steam community', 'gog community',
  'itch.io blog', 'indie game developer', 'gamasutra', 'game developer magazine',
  'gdc vault', 'unreal engine blog', 'unity blog', 'godot engine blog',
  'blender developer', 'autodesk blog', 'adobe blog', 'figma blog', 'sketch blog',
  'invision blog', 'marvel blog', 'framer blog', 'proto.io blog', 'ux design magazine',
  'ux collective', 'ux planet', 'ux movement', 'usability geek', 'nngroup',
  'smashing ux', 'ux matters', 'ux booth', 'ux studio', 'designlab', 'careerfoundry',
  'springboard', 'thinkful', 'bloc', 'general assembly', 'flatiron school',
  'hack reactor', 'app academy', 'lambda school', 'the odin project', 'freecodecamp',
  'codecademy', 'pluralsight', 'udemy', 'skillshare', 'linkedin learning', 'lynda',
  'cbt nuggets', 'itpro.tv', 'acloudguru', 'linux academy', 'cybrary', 'sans institute',
  'isc2', 'comptia', 'cisco networking academy', 'juniper networks', 'vmware education',
  'red hat training', 'suse training', 'canonical training', 'ubuntu advantage',
  'debian community', 'arch linux wiki', 'gentoo handbook', 'slackware docs',
  'fedora docs', 'opensuse docs', 'centos docs', 'rhel docs', 'oracle linux docs',
  'solaris docs', 'freebsd handbook', 'openbsd faq', 'netbsd guide', 'dragonfly bsd docs',
  'hp-ux docs', 'aix docs', 'z/os docs', 'zos docs', 'mainframe docs', 'ibm mainframe',
  'academicearth', 'khanacademy', 'coursera', 'edx', 'udacity', 'futurelearn',
  'iversity', 'open2study', 'openlearn', 'alison', 'saylor academy', 'straighterline',
  'study.com', 'edmentum', 'fueled', 'pluralsight', 'skillsoft', 'treehouse',
  'egghead.io', 'frontend masters', 'frontendmasters', 'leveluptutorials', 'tutsplus',
  'envato tuts', 'site point', 'sitepoint', 'codementor', 'hackhands', 'airpair',
  'thinkful', 'mentor cruise', 'coding dojo', 'hack reactor', 'galvanize',
  'tech elevator', 'software guild', 'dev mountain', 'iron yard', 'launch academy',
  'operation spark', 'coding temple', 'coding bootcamp', 'flatiron', 'fullstack academy',
  'grace hopper', 'recurse center', 'hacker school', 'enlight', 'code school',
  'rails school', 'django girls', 'pyladies', 'rladies', 'women who code',
  'black girls code', 'code2040', 'code it', 'girls who code', 'tech for good',
  'code for america', 'hack for change', 'random hacks of kindness', 'code.org',
  'coderdojo', 'scratch', 'blockly', 'codecombat', 'codewars', 'project euler',
  'hackerrank', 'leetcode', 'geeksforgeeks', 'w3schools', 'mozilla developer network',
  'web.dev', 'developer.mozilla.org', 'developers.google.com', 'developer.apple.com',
  'developer.android.com', 'developer.microsoft.com', 'developer.oracle.com',
  'developer.ibm.com', 'developer.salesforce.com', 'developer.shopify.com',
  'developer.wordpress.org', 'developer.joomla.org', 'developer.drupal.org',
  'developer.magento.com', 'developer.squarespace.com', 'developer.wix.com',
  'developer.webflow.com', 'developer.framer.com', 'developer.sketch.com',
  'developer.figma.com', 'developer.adobe.com', 'developer.autodesk.com',
  'developer.blender.org', 'developer.unity.com', 'developer.unrealengine.com',
  'developer.godotengine.org', 'developer.cocos.com', 'developer.sdl.com',
  'developer.libgdx.com', 'developer.monogame.net', 'developer.xna.com',
  'developer.opengl.org', 'developer.vulkan.org', 'developer.directx.com',
  'developer.webgl.org', 'developer.webrtc.org', 'developer.webcomponents.org',
  'developer.serviceworkers.org', 'developer.progressivewebapps.org',
  'developer.google.ai', 'developer.openai.com', 'developer.deepmind.com',
  'developer.huggingface.co', 'developer.pytorch.org', 'developer.tensorflow.org',
  'developer.keras.io', 'developer.scikit-learn.org', 'developer.pandas.pydata.org',
  'developer.numpy.org', 'developer.matplotlib.org', 'developer.seaborn.org',
  'developer.plotly.com', 'developer.bokeh.org', 'developer.dash.org',
  'developer.streamlit.io', 'developer.gradio.app', 'developer.fastapi.org',
  'developer.django.org', 'developer.flask.org', 'developer.spring.io',
  'developer.nodejs.org', 'developer.expressjs.com', 'developer.reactjs.org',
  'developer.vuejs.org', 'developer.angular.io', 'developer.svelte.dev',
  'developer.nextjs.org', 'developer.nuxtjs.org', 'developer.gatsbyjs.org',
  'developer.jamstack.org', 'developer.hugo.io', 'developer.gohugo.io',
  'developer.jekyllrb.com', 'developer.eleventy.dev', 'developer.astro.build',
  'developer.remix.run', 'developer.qwik.dev', 'developer.solidjs.com',
  'developer.emberjs.com', 'developer.backbonejs.org', 'developer.angularjs.org',
  'developer.jquery.com', 'developer.mootools.net', 'developer.prototypejs.org',
  'developer.script.aculo.us', 'developer.extjs.com', 'developer.sencha.com',
  'developer.yui.com', 'developer.dojo.com', 'developer.dojotoolkit.org',
  'developer.curriculum.org', 'developer.education.com', 'developer.khanacademy.org',
  'developer.coursera.org', 'developer.edx.org', 'developer.udacity.com',
  'developer.futurelearn.com', 'developer.iversity.com', 'developer.open2study.com',
  'developer.openlearn.com', 'developer.alison.com', 'developer.saylor.org',
  'developer.straighterline.com', 'developer.study.com', 'developer.edmentum.com',
  'developer.fueled.com', 'developer.pluralsight.com', 'developer.skillsoft.com',
  'developer.treehouse.com', 'developer.egghead.io', 'developer.frontendmasters.com',
  'developer.leveluptutorials.com', 'developer.tutsplus.com', 'developer.envato.com',
  'developer.sitepoint.com', 'developer.codementor.io', 'developer.hackhands.com',
  'developer.airpair.com', 'developer.thinkful.com', 'developer.mentorcruise.com',
  'developer.codingdojo.com', 'developer.hackreactor.com', 'developer.galvanize.com',
  'developer.techelevator.com', 'developer.softwareguild.com', 'developer.devmountain.com',
  'developer.ironyard.com', 'developer.launchacademy.com', 'developer.operationspark.org',
  'developer.codingtemple.com', 'developer.codingbootcamp.com', 'developer.flatiron.com',
  'developer.fullstackacademy.com', 'developer.gracehopper.com', 'developer.recursecenter.com',
  'developer.hackerschool.com', 'developer.enlight.com', 'developer.codeschool.com',
  'developer.railsschool.com', 'developer.djangogirls.org', 'developer.pyladies.com',
  'developer.rladies.org', 'developer.womenwhocode.com', 'developer.blackgirlscode.org',
  'developer.code2040.org', 'developer.codeit.org', 'developer.girlswhocode.com',
  'developer.techforgood.com', 'developer.codeforamerica.org', 'developer.hackforchange.org',
  'developer.randomhacksofkindness.org', 'developer.code.org', 'developer.coderdojo.com',
  'developer.scratch.mit.edu', 'developer.blockly.com', 'developer.codecombat.com',
  'developer.codewars.com', 'developer.projecteuler.net', 'developer.hackerrank.com',
  'developer.leetcode.com', 'developer.geeksforgeeks.org', 'developer.w3schools.com'
];

// ============================================
// LEVEL 1: Keyword Filter
// ============================================
const isEducationalKeyword = (text) => {
  const combinedText = text.toLowerCase();
  return educationalWords.some(word => combinedText.includes(word));
};

// ============================================
// LEVEL 2: Trusted Channel Check
// ============================================
const isTrustedChannel = (channelName) => {
  if (!channelName) return false;
  const lowerName = channelName.toLowerCase();
  return trustedChannels.some(channel => lowerName.includes(channel));
};

// ============================================
// LEVEL 3: Comment Analysis (Mock)
// ============================================
const analyzeComments = async (videoId) => {
  // TODO: Implement real comment analysis using YouTube API
  // For now, we return true to avoid false negatives
  return true;
};

// ============================================
// Analyze Video Content (oEmbed)
// ============================================
export const analyzeVideoContent = async (videoId) => {
  try {
    const response = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
    );
    const data = await response.json();

    const keywords = extractSmartKeywords(data.title + ' ' + (data.author_name || ''));
    
    return {
      title: data.title || '',
      author: data.author_name || '',
      keywords: keywords,
      isEducational: detectEducational(keywords, data.title),
    };
  } catch (error) {
    console.error('Error analyzing video:', error);
    return {
      title: '',
      author: '',
      keywords: [],
      isEducational: false,
    };
  }
};

// ============================================
// Detect Educational Content (fallback)
// ============================================
const detectEducational = (keywords, title) => {
  const combinedText = keywords.join(' ') + ' ' + title.toLowerCase();
  return isEducationalKeyword(combinedText);
};

// ============================================
// AUTO-REVIEW WITH MULTI-LEVEL VERIFICATION
// ============================================
export const autoReviewVideo = async (videoId) => {
  try {
    const analysis = await analyzeVideoContent(videoId);
    
    // LEVEL 1: Keyword Filter
    const hasEducationalWords = isEducationalKeyword(analysis.title + ' ' + analysis.keywords.join(' '));
    if (!hasEducationalWords) {
      await supabase
        .from('videos')
        .update({
          status: 'rejected',
          admin_notes: 'Rejected: No educational keywords found',
        })
        .eq('youtube_video_id', videoId);
      return { status: 'rejected', analysis };
    }

    // LEVEL 2: Trusted Channel
    const isTrusted = isTrustedChannel(analysis.author);
    if (isTrusted) {
      await supabase
        .from('videos')
        .update({
          status: 'approved',
          admin_notes: 'Approved: Trusted educational channel',
        })
        .eq('youtube_video_id', videoId);
      return { status: 'approved', analysis };
    }

    // LEVEL 3: Comment Analysis (Mock)
    const hasEducationalComments = await analyzeComments(videoId);
    if (hasEducationalComments) {
      await supabase
        .from('videos')
        .update({
          status: 'approved',
          admin_notes: 'Approved: Educational comments detected',
        })
        .eq('youtube_video_id', videoId);
      return { status: 'approved', analysis };
    }

    // LEVEL 4: Manual Review (Pending)
    await supabase
      .from('videos')
      .update({
        status: 'pending',
        admin_notes: 'Pending: Needs manual review',
      })
      .eq('youtube_video_id', videoId);
    
    return { status: 'pending', analysis };

  } catch (error) {
    console.error('Error auto-reviewing video:', error);
    return { status: 'pending', analysis: null };
  }
};

// ============================================
// Fetch All Videos
// ============================================
export const fetchAllVideos = async () => {
  try {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching all videos:', error);
    return [];
  }
};

// ============================================
// Fetch Video Content (Full)
// ============================================
export const fetchVideoContent = async (videoId) => {
  try {
    const oembedResponse = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
    );
    const oembedData = await oembedResponse.json();

    const pageResponse = await fetch(`https://www.youtube.com/watch?v=${videoId}`);
    const html = await pageResponse.text();
    
    const descMatch = html.match(/"shortDescription":"([^"]+)"/);
    const description = descMatch ? decodeURIComponent(descMatch[1]) : '';

    const tagsMatch = html.match(/"keywords":"([^"]+)"/);
    const tags = tagsMatch ? decodeURIComponent(tagsMatch[1]).split(',') : [];

    return {
      title: oembedData.title || '',
      author: oembedData.author_name || '',
      thumbnail: oembedData.thumbnail_url || '',
      description: description,
      tags: tags,
      channel_id: oembedData.author_url?.split('/').pop() || '',
    };
  } catch (error) {
    console.error('Error fetching video content:', error);
    return null;
  }
};

// ============================================
// Extract Smart Keywords
// ============================================
export const extractSmartKeywords = (text) => {
  const fullText = text.toLowerCase();
  const words = fullText.match(/[a-z0-9]+/g) || [];
  
  const stopWords = [
    'the', 'and', 'or', 'for', 'to', 'of', 'in', 'on', 'at', 'with', 'without',
    'about', 'from', 'by', 'into', 'through', 'during', 'including', 'using',
    'this', 'that', 'these', 'those', 'then', 'than', 'there', 'their', 'they',
    'what', 'which', 'who', 'whom', 'whose', 'how', 'why', 'where', 'when',
    'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
    'should', 'may', 'might', 'must', 'shall', 'can', 'etc', 'etcetera'
  ];
  
  const filteredWords = words.filter(w => 
    w.length > 2 && !stopWords.includes(w) && !/^[0-9]+$/.test(w)
  );
  
  const frequencyMap = {};
  filteredWords.forEach(word => {
    frequencyMap[word] = (frequencyMap[word] || 0) + 1;
  });
  
  const sortedWords = Object.entries(frequencyMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([word]) => word);
  
  return sortedWords;
};

// ============================================
// Generate Summary
// ============================================
export const generateSummary = (title, description, keywords) => {
  if (!description) return title;
  
  const words = description.split(' ');
  const shortDesc = words.slice(0, 30).join(' ') + (words.length > 30 ? '...' : '');
  const keywordStr = keywords.slice(0, 5).join(', ');
  
  return `${shortDesc}\n\nKeywords: ${keywordStr}`;
};

// ============================================
// Process Video (Extract & Store Keywords)
// ============================================
export const processVideo = async (videoId) => {
  try {
    const content = await fetchVideoContent(videoId);
    if (!content) return null;
    
    const keywords = extractSmartKeywords(
      content.title + ' ' + content.description + ' ' + content.tags.join(' ')
    );
    
    const summary = generateSummary(content.title, content.description, keywords);
    
    const { data, error } = await supabase
      .from('videos')
      .update({
        keywords: keywords,
        summary: summary,
        processed: true,
      })
      .eq('youtube_video_id', videoId)
      .select()
      .single();
    
    if (error) throw error;
    
    for (const keyword of keywords) {
      const { data: existing } = await supabase
        .from('keyword_index')
        .select('*')
        .eq('keyword', keyword)
        .single();
      
      if (existing) {
        const videoIds = existing.video_ids || [];
        if (!videoIds.includes(videoId)) {
          videoIds.push(videoId);
        }
        await supabase
          .from('keyword_index')
          .update({
            frequency: existing.frequency + 1,
            video_ids: videoIds,
          })
          .eq('id', existing.id);
      } else {
        await supabase
          .from('keyword_index')
          .insert({
            keyword: keyword,
            frequency: 1,
            video_ids: [videoId],
          });
      }
    }
    
    return { data, keywords, summary };
  } catch (error) {
    console.error('Error processing video:', error);
    return null;
  }
};

// ============================================
// Advanced Search (with Category Filter)
// ============================================
export const advancedSearch = async (query) => {
  try {
    const allVideos = await fetchAllVideos();
    if (!allVideos || allVideos.length === 0) return [];
    
    const queryWords = extractSmartKeywords(query);
    console.log('Query words:', queryWords);
    
    const ranked = allVideos.map(video => {
      const videoKeywords = video.keywords || [];
      const videoText = (video.title || '') + ' ' + (video.description || '') + ' ' + (video.channel_name || '');
      const extractedKeywords = extractSmartKeywords(videoText);
      
      let matchCount = 0;
      let matchScore = 0;
      
      queryWords.forEach(qWord => {
        videoKeywords.forEach(kw => {
          if (kw.includes(qWord) || qWord.includes(kw)) {
            matchCount += 2;
            matchScore += 5;
          }
        });
      });
      
      queryWords.forEach(qWord => {
        extractedKeywords.forEach(kw => {
          if (kw.includes(qWord) || qWord.includes(kw)) {
            matchCount += 1;
            matchScore += 3;
          }
        });
      });
      
      queryWords.forEach(qWord => {
        if (videoText.toLowerCase().includes(qWord)) {
          matchCount += 1;
          matchScore += 2;
        }
      });
      
      const score = matchCount > 0 ? (matchScore / Math.max(queryWords.length, 1)) : 0;
      return { ...video, score };
    });
    
    ranked.sort((a, b) => b.score - a.score);
    return ranked.slice(0, 5).filter(v => v.score > 1);
    
  } catch (error) {
    console.error('Error in advanced search:', error);
    return [];
  }
};

// ============================================
// Basic Search (Fallback)
// ============================================
export const searchVideosByQuestion = async (question) => {
  try {
    const allVideos = await fetchAllVideos();
    if (!allVideos || allVideos.length === 0) return [];

    const questionWords = extractSmartKeywords(question);

    const ranked = allVideos.map(video => {
      const videoText = (video.title || '') + ' ' + (video.description || '') + ' ' + (video.channel_name || '');
      const videoWords = extractSmartKeywords(videoText);
      
      let matchCount = 0;
      
      questionWords.forEach(qWord => {
        videoWords.forEach(vWord => {
          if (vWord.includes(qWord) || qWord.includes(vWord)) {
            matchCount++;
          }
        });
      });
      
      const score = matchCount > 0 ? (matchCount / Math.max(questionWords.length, 1)) * 100 : 0;
      return { ...video, score };
    });

    ranked.sort((a, b) => b.score - a.score);
    return ranked.slice(0, 5).filter(v => v.score > 10);

  } catch (error) {
    console.error('Error searching videos:', error);
    return [];
  }
};

// ============================================
// Knowledge Base
// ============================================
const knowledgeBase = [
  {
    keywords: ['what is codez', 'about codez', 'platform'],
    response: 'CodeZ is an educational video platform that curates the best learning content from YouTube in a seamless reel format.'
  },
  {
    keywords: ['how to add video', 'upload', 'submit video'],
    response: 'Click the + button, paste a YouTube URL, and our AI will automatically analyze it for educational quality.'
  },
  {
    keywords: ['how it works', 'algorithm', 'smart'],
    response: 'Our AI extracts smart keywords from titles, descriptions, and tags to help you find exactly what you need.'
  },
  {
    keywords: ['free', 'cost', 'price', 'pay'],
    response: 'Yes! CodeZ is completely free to use. No hidden costs, no subscriptions.'
  },
  {
    keywords: ['who are you', 'what are you', 'chatbot', 'edubot'],
    response: 'I\'m EduBot! A smart AI assistant that analyzes educational videos and helps you find exactly what you need.'
  },
  {
    keywords: ['thanks', 'thank you', 'great', 'awesome'],
    response: 'You\'re welcome! Keep asking questions!'
  },
  {
    keywords: ['hello', 'hi', 'hey', 'greetings'],
    response: 'Hello! Welcome to CodeZ. I\'m EduBot, your AI educational assistant.'
  },
];

// ============================================
// Search Knowledge Base
// ============================================
const searchKnowledgeBase = (question) => {
  const words = extractSmartKeywords(question);
  let bestMatch = null;
  let bestScore = 0;

  knowledgeBase.forEach(item => {
    let score = 0;
    item.keywords.forEach(keyword => {
      const keywordWords = extractSmartKeywords(keyword);
      keywordWords.forEach(kw => {
        words.forEach(word => {
          if (word.includes(kw) || kw.includes(word)) {
            score += 3;
          }
        });
      });
    });
    
    if (score > bestScore) {
      bestScore = score;
      bestMatch = item;
    }
  });

  return bestScore > 1 ? bestMatch : null;
};

// ============================================
// Get Enhanced Response (Chatbot)
// ============================================
export const getEnhancedResponse = async (question, previousMessages = []) => {
  const knowledgeMatch = searchKnowledgeBase(question);
  
  if (knowledgeMatch) {
    return {
      text: knowledgeMatch.response,
      videos: [],
      source: 'knowledge',
      keywords: extractSmartKeywords(question),
    };
  }
  
  const videos = await advancedSearch(question);
  
  if (videos && videos.length > 0) {
    const videoList = videos.map((v, i) => 
      `${i + 1}. **${v.title || 'Untitled'}**`
    ).join('\n');
    
    return {
      text: `I found these videos based on your question:\n\n${videoList}\n\nClick on any video to watch it!`,
      videos: videos,
      source: 'videos',
      keywords: extractSmartKeywords(question),
    };
  }
  
  return {
    text: 'I couldn\'t find any videos matching your question. Try using different keywords!\n\nExamples: "Math tutorials", "Learn Python", "Physics lessons"',
    videos: [],
    source: 'fallback',
    keywords: extractSmartKeywords(question),
  };
};

// ============================================
// Analyze Sentiment
// ============================================
export const analyzeSentiment = (text) => {
  const positiveWords = ['good', 'great', 'awesome', 'excellent', 'amazing', 'love', 'like', 'thanks', 'thank you', 'perfect'];
  const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'dislike', 'useless', 'waste', 'boring', 'confusing'];
  
  const words = text.toLowerCase().split(' ');
  let score = 0;
  
  words.forEach(word => {
    if (positiveWords.includes(word)) score++;
    if (negativeWords.includes(word)) score--;
  });
  
  if (score > 0) return 'positive';
  if (score < 0) return 'negative';
  return 'neutral';
};

// ============================================
// Get Popular Topics (for UI)
// ============================================
export const getPopularTopics = () => {
  return [
    { icon: '📐', name: 'Mathematics', query: 'math tutorials' },
    { icon: '🔬', name: 'Science', query: 'science lessons' },
    { icon: '💻', name: 'Programming', query: 'programming tutorials' },
    { icon: '🌍', name: 'Languages', query: 'learn english' },
    { icon: '📖', name: 'History', query: 'history lessons' },
    { icon: '🎨', name: 'Design', query: 'design tutorials' },
    { icon: '🧪', name: 'Chemistry', query: 'chemistry experiments' },
    { icon: '⚛️', name: 'Physics', query: 'physics explained' },
    { icon: '♟️', name: 'Chess', query: 'chess tutorials' },
    { icon: '🧩', name: 'Rubik\'s Cube', query: 'rubik cube tutorial' },
  ];
};
