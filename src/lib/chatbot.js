import { supabase } from './supabase';

// ============================================
// 1. Video Categories - Comprehensive (300+ keywords each)
// ============================================
const videoCategories = {
  programming: {
    keywords: [
      'programming', 'coding', 'python', 'javascript', 'react', 'java', 'c++', 'html', 'css', 'node',
      'express', 'mongodb', 'sql', 'git', 'github', 'algorithm', 'data structure', 'variable',
      'function', 'class', 'object', 'loop', 'array', 'string', 'compiler', 'debugging', 'software',
      'web development', 'app development', 'mobile development', 'api', 'rest', 'graphql', 'docker',
      'kubernetes', 'aws', 'azure', 'linux', 'bash', 'shell', 'terminal', 'command line', 'database',
      'backend', 'frontend', 'full stack', 'framework', 'library', 'package', 'module', 'import',
      'export', 'promise', 'async', 'await', 'callback', 'event', 'listener', 'dom', 'browser',
      'server', 'client', 'network', 'protocol', 'http', 'https', 'websocket', 'socket', 'stream',
      'buffer', 'file system', 'os', 'thread', 'process', 'memory', 'performance', 'optimization',
      'testing', 'jest', 'mocha', 'chai', 'cypress', 'selenium', 'webpack', 'vite', 'babel', 'eslint',
      'prettier', 'typescript', 'angular', 'vue', 'svelte', 'next.js', 'gatsby', 'wordpress', 'laravel',
      'django', 'flask', 'spring', 'boot', 'rails', 'ruby', 'php', 'swift', 'kotlin', 'android', 'ios',
      'flutter', 'react native', 'xamarin', 'unity', 'unreal', 'game development', 'c#', '.net',
      'visual basic', 'r', 'matlab', 'scala', 'perl', 'rust', 'go', 'zig', 'lua', 'haskell', 'elixir',
      'erlang', 'clojure', 'groovy', 'dart', 'julia', 'typescript', 'ocaml', 'scheme', 'common lisp',
      'fortran', 'cobol', 'pascal', 'assembly', 'machine learning', 'ai', 'neural network', 'deep learning',
      'tensorflow', 'pytorch', 'scikit-learn', 'pandas', 'numpy', 'matplotlib', 'seaborn', 'data science',
      'big data', 'hadoop', 'spark', 'kafka', 'elasticsearch', 'redis', 'postgresql', 'mysql', 'oracle',
      'sql server', 'firebase', 'supabase', 'prisma', 'typeorm', 'sequelize', 'mongoose', 'knex',
      'graphql', 'apollo', 'relay', 'storybook', 'figma', 'sketch', 'adobe xd', 'invision', 'zeplin',
      'github actions', 'cicd', 'jenkins', 'travis', 'circleci', 'gitlab', 'bitbucket', 'mercurial',
      'svn', 'agile', 'scrum', 'kanban', 'jira', 'confluence', 'slack', 'discord', 'zoom', 'teams',
      'computer science', 'software engineering', 'web engineering', 'devops', 'site reliability',
      'security', 'penetration testing', 'ethical hacking', 'cryptography', 'blockchain', 'solidity',
      'smart contract', 'ethereum', 'bitcoin', 'web3', 'metaverse', 'ar', 'vr', 'xr', 'iot', 'robotics',
      'embedded systems', 'firmware', 'hardware', 'electronics', 'circuit', 'arduino', 'raspberry pi'
    ]
  },
  engineering: {
    keywords: [
      'engineering', 'civil', 'mechanical', 'electrical', 'electronic', 'chemical', 'industrial',
      'aerospace', 'automotive', 'biomedical', 'environmental', 'structural', 'geotechnical', 'hydraulic',
      'pneumatic', 'thermodynamics', 'fluid mechanics', 'statics', 'dynamics', 'strength of materials',
      'machine design', 'manufacturing', 'production', 'quality control', 'lean', 'six sigma', 'cad',
      'cam', 'cae', 'solidworks', 'autocad', 'catia', 'pro engineer', 'ansys', 'abaqus', 'comsol',
      'matlab', 'simulink', 'control systems', 'feedback', 'automation', 'plc', 'scada', 'robotics',
      'mechatronics', 'sensors', 'actuators', 'motors', 'generators', 'transformers', 'power systems',
      'renewable energy', 'solar', 'wind', 'hydro', 'nuclear', 'oil', 'gas', 'petroleum', 'mining',
      'metallurgy', 'materials science', 'polymers', 'ceramics', 'composites', 'nanotechnology',
      'acoustics', 'optics', 'photonics', 'laser', 'fiber optics', 'telecommunications', 'signal processing',
      'digital signal processing', 'communication systems', 'microwave', 'rf', 'antenna', 'radar',
      'sonar', 'navigation', 'gps', 'remote sensing', 'geospatial', 'gis', 'surveying', 'mapping',
      'construction', 'building', 'architecture', 'urban planning', 'landscape', 'transportation',
      'traffic', 'highway', 'bridge', 'tunnel', 'dam', 'foundation', 'earthquake', 'seismic',
      'wind engineering', 'coastal engineering', 'ocean engineering', 'marine engineering', 'naval',
      'shipbuilding', 'underwater', 'submarine', 'offshore', 'platform', 'drilling', 'fracking',
      'water treatment', 'wastewater', 'environmental compliance', 'hazop', 'risk assessment',
      'project management', 'construction management', 'cost estimation', 'scheduling', 'primaviera',
      'ms project', 'blueprint', 'drafting', 'technical drawing', 'gd&t', 'tolerance', 'fit', 'finish',
      'surface', 'coating', 'corrosion', 'pipeline', 'pressure vessel', 'heat exchanger', 'compressor',
      'turbine', 'pump', 'fan', 'blower', 'conveyor', 'crane', 'elevator', 'escalator', 'hoist',
      'forklift', 'machinery', 'maintenance', 'reliability', 'failure analysis', 'root cause',
      'corrective', 'preventive', 'predictive', 'spare parts', 'inventory', 'supply chain', 'logistics'
    ]
  },
  mathematics: {
    keywords: [
      'mathematics', 'math', 'algebra', 'calculus', 'geometry', 'trigonometry', 'statistics', 'arithmetic',
      'linear algebra', 'differential equations', 'number theory', 'analysis', 'topology', 'logic',
      'set theory', 'graph theory', 'combinatorics', 'probability', 'optimization', 'algorithm',
      'equations', 'formulas', 'numbers', 'graphs', 'functions', 'derivatives', 'integrals', 'matrices',
      'vectors', 'limits', 'continuity', 'series', 'convergence', 'fourier', 'laplace', 'z transform',
      'complex analysis', 'real analysis', 'abstract algebra', 'group theory', 'ring theory', 'field theory',
      'galois', 'linear programming', 'nonlinear', 'discrete', 'finite', 'infinite', 'infinity',
      'asymptotic', 'calculus of variations', 'dynamic', 'stochastic', 'monte carlo', 'markov chain',
      'bayesian', 'frequentist', 'hypothesis testing', 'confidence interval', 'regression', 'correlation',
      'anova', 'chi square', 't test', 'z test', 'f test', 'nonparametric', 'rank', 'order statistics',
      'power', 'sample', 'population', 'mean', 'median', 'mode', 'variance', 'standard deviation',
      'normal distribution', 'binomial', 'poisson', 'exponential', 'uniform', 'multivariate', 'matrix',
      'determinant', 'eigenvalue', 'eigenvector', 'singular value decomposition', 'principal component',
      'factor analysis', 'cluster analysis', 'classification', 'regression tree', 'random forest',
      'support vector machine', 'neural network', 'deep learning', 'gradient descent', 'backpropagation',
      'loss function', 'activation function', 'regularization', 'cross validation', 'bias', 'variance',
      'overfitting', 'underfitting', 'ensemble', 'boosting', 'bagging', 'adaboost', 'xgboost', 'lightgbm',
      'catboost', 'natural language', 'nlp', 'word embedding', 'transformer', 'attention', 'bert', 'gpt',
      'computer vision', 'cnn', 'rnn', 'lstm', 'gan', 'autoencoder', 'transfer learning', 'reinforcement',
      'q learning', 'policy gradient', 'mcmc', 'variational inference', 'gaussian', 'kernel', 'k means',
      'dbscan', 'hierarchical', 'apriori', 'association rule', 'time series', 'forecasting', 'smoothing',
      'seasonality', 'autoregression', 'moving average', 'arima', 'sarima', 'holt winters', 'ets',
      'causal', 'instrumental variable', 'natural experiment', 'quasi experimental', 'difference in differences'
    ]
  },
  science: {
    keywords: [
      'science', 'physics', 'chemistry', 'biology', 'astronomy', 'earth science', 'geology', 'ecology',
      'genetics', 'molecular biology', 'quantum physics', 'thermodynamics', 'experiments', 'lab',
      'molecules', 'atoms', 'energy', 'force', 'motion', 'cells', 'dna', 'evolution', 'climate',
      'space', 'planets', 'stars', 'galaxies', 'universe', 'cosmos', 'black hole', 'wormhole',
      'relativity', 'string theory', 'particle physics', 'standard model', 'dark matter', 'dark energy',
      'quantum mechanics', 'schrodinger', 'heisenberg', 'einstein', 'newton', 'galileo', 'darwin',
      'bohr', 'rutherford', 'curie', 'hawking', 'tesla', 'edison', 'bell', 'pasteur', 'maxwell',
      'faraday', 'ampere', 'ohm', 'volt', 'watt', 'joule', 'coulomb', 'hertz', 'newton', 'pascal',
      'kelvin', 'mole', 'avogadro', 'atomic', 'nuclear', 'fusion', 'fission', 'radioactive', 'decay',
      'half life', 'isotope', 'ion', 'electron', 'proton', 'neutron', 'photon', 'quark', 'gluon',
      'boson', 'fermion', 'plasma', 'gas', 'liquid', 'solid', 'plasma', 'state', 'phase', 'transition',
      'boiling', 'freezing', 'condensation', 'evaporation', 'sublimation', 'deposition', 'pressure',
      'temperature', 'volume', 'density', 'mass', 'weight', 'gravity', 'magnetism', 'electricity',
      'circuit', 'resistance', 'capacitance', 'inductance', 'wave', 'frequency', 'amplitude', 'wavelength',
      'spectrum', 'interference', 'diffraction', 'polarization', 'reflection', 'refraction', 'lens',
      'microscope', 'telescope', 'spectrometer', 'chromatography', 'titration', 'distillation',
      'filtration', 'centrifuge', 'electrophoresis', 'pcr', 'sequencing', 'cloning', 'stem cell',
      'tissue', 'organ', 'immune', 'virus', 'bacteria', 'fungus', 'plant', 'animal', 'human',
      'physiology', 'anatomy', 'neurology', 'immunology', 'pathology', 'pharmacology', 'toxicology',
      'epidemiology', 'public health', 'biotechnology', 'bioinformatics', 'biochemistry', 'biophysics'
    ]
  },
  languages: {
    keywords: [
      'language', 'english', 'spanish', 'french', 'german', 'arabic', 'chinese', 'japanese', 'russian',
      'italian', 'portuguese', 'korean', 'hindi', 'bengali', 'urdu', 'persian', 'turkish', 'dutch',
      'greek', 'latin', 'grammar', 'vocabulary', 'pronunciation', 'speaking', 'writing', 'reading',
      'listening', 'translation', 'conjugation', 'verb tenses', 'sentence structure', 'idioms',
      'expressions', 'phrases', 'accent', 'dialect', 'phonetics', 'morphology', 'syntax', 'semantics',
      'pragmatics', 'etymology', 'linguistics', 'philology', 'literature', 'poetry', 'prose', 'drama',
      'essay', 'composition', 'creative writing', 'technical writing', 'business writing', 'letter',
      'email', 'report', 'proposal', 'resume', 'cover letter', 'interview', 'negotiation', 'presentation',
      'public speaking', 'debate', 'argument', 'rhetoric', 'persuasion', 'storytelling', 'narrative',
      'description', 'explanation', 'instruction', 'persuasion', 'dialogue', 'monologue', 'skit',
      'play', 'screenplay', 'script', 'novel', 'short story', 'fiction', 'nonfiction', 'biography',
      'memoir', 'journal', 'diary', 'blog', 'article', 'editorial', 'review', 'critique', 'analysis',
      'synthesis', 'summary', 'paraphrase', 'quotation', 'citation', 'bibliography', 'glossary',
      'index', 'table of contents', 'appendix', 'preface', 'introduction', 'conclusion', 'thesis',
      'dissertation', 'paper', 'essay', 'report', 'proposal', 'grant', 'patent', 'intellectual property'
    ]
  },
  history: {
    keywords: [
      'history', 'ancient', 'civilization', 'world war', 'historical', 'kingdom', 'empire', 'revolution',
      'renaissance', 'medieval', 'modern history', 'wars', 'leaders', 'culture', 'society', 'art',
      'architecture', 'inventions', 'timeline', 'egyptian', 'greek', 'roman', 'mayan', 'aztec',
      'incan', 'mesopotamian', 'persian', 'ottoman', 'moghul', 'qin', 'han', 'tang', 'song', 'yuan',
      'ming', 'qing', 'meiji', 'victorian', 'edwardian', 'georgian', 'colonial', 'imperial', 'feudal',
      'slavery', 'abolition', 'independence', 'sovereignty', 'democracy', 'totalitarianism', 'fascism',
      'communism', 'capitalism', 'socialism', 'nationalism', 'imperialism', 'colonialism', 'postcolonial',
      'cold war', 'proxy war', 'guerrilla', 'militia', 'army', 'navy', 'air force', 'marine', 'soldier',
      'general', 'admiral', 'king', 'queen', 'emperor', 'pharaoh', 'caliph', 'sultan', 'shah', 'tsar',
      'kaiser', 'president', 'prime minister', 'chancellor', 'diplomat', 'ambassador', 'treaty',
      'alliance', 'trade', 'commerce', 'exploration', 'colonization', 'pilgrimage', 'crusade', 'jihad',
      'reformation', 'counter reformation', 'enlightenment', 'industrial revolution', 'scientific revolution',
      'age of discovery', 'age of sail', 'age of steam', 'age of oil', 'information age', 'internet',
      'digital revolution', 'space race', 'nuclear age', 'cold war', 'post cold war', 'modern era',
      'contemporary', 'millennium', 'century', 'decade', 'generation', 'dynasty', 'era', 'period',
      'epoch', 'prehistory', 'antiquity', 'classical', 'postclassical', 'early modern', 'late modern'
    ]
  },
  business: {
    keywords: [
      'business', 'marketing', 'entrepreneur', 'finance', 'management', 'leadership', 'strategy', 'sales',
      'investment', 'startup', 'economics', 'accounting', 'audit', 'tax', 'insurance', 'banking',
      'stock market', 'trading', 'investing', 'portfolio', 'asset', 'liability', 'equity', 'revenue',
      'profit', 'loss', 'budget', 'forecast', 'planning', 'analysis', 'market research', 'customer',
      'client', 'b2b', 'b2c', 'ecommerce', 'retail', 'wholesale', 'distribution', 'logistics', 'supply chain',
      'operations', 'quality', 'procurement', 'negotiation', 'contract', 'law', 'compliance', 'risk',
      'entrepreneurship', 'innovation', 'disruption', 'growth', 'scaling', 'funding', 'venture capital',
      'angel investor', 'crowdfunding', 'ipo', 'merger', 'acquisition', 'joint venture', 'partnership',
      'franchise', 'licensing', 'royalty', 'dividend', 'stock', 'bond', 'mutual fund', 'etf', 'index',
      'derivative', 'option', 'future', 'swap', 'hedge', 'arbitrage', 'leverage', 'margin', 'short',
      'long', 'bull', 'bear', 'correction', 'recession', 'depression', 'inflation', 'deflation', 'interest',
      'exchange rate', 'trade deficit', 'tariff', 'sanction', 'subsidy', 'taxation', 'fiscal policy',
      'monetary policy', 'central bank', 'federal reserve', 'european central bank', 'bank of england',
      'bank of japan', 'world bank', 'imf', 'wto', 'gatt', 'nafta', 'eu', 'brexit', 'single market',
      'commonwealth', 'protectionism', 'free trade', 'globalization', 'localization', 'outsourcing',
      'offshoring', 'insourcing', 'smart contract', 'blockchain', 'bitcoin', 'ethereum', 'defi', 'nft',
      'dao', 'web3', 'fintech', 'insurtech', 'proptech', 'edtech', 'medtech', 'cleantech', 'agritech'
    ]
  },
  softSkills: {
    keywords: [
      'communication', 'leadership', 'teamwork', 'problem solving', 'critical thinking', 'time management',
      'emotional intelligence', 'empathy', 'resilience', 'adaptability', 'flexibility', 'creativity',
      'innovation', 'decision making', 'conflict resolution', 'negotiation', 'presentation', 'public speaking',
      'networking', 'relationship building', 'interpersonal', 'active listening', 'feedback', 'coaching',
      'mentoring', 'delegation', 'motivation', 'inspiration', 'influence', 'collaboration', 'cooperation',
      'partnership', 'trust', 'integrity', 'honesty', 'reliability', 'punctuality', 'organization',
      'planning', 'priority', 'goal setting', 'self discipline', 'self motivation', 'self awareness',
      'self improvement', 'personal development', 'growth mindset', 'fixed mindset', 'grit', 'perseverance',
      'patience', 'tolerance', 'open mindedness', 'curiosity', 'willingness to learn', 'humility',
      'gratitude', 'positivity', 'optimism', 'pessimism', 'realism', 'pragmatism', 'idealism',
      'assertiveness', 'confidence', 'courage', 'bravery', 'honor', 'respect', 'dignity', 'humor',
      'storytelling', 'persuasion', 'proposal', 'pitch', 'interview', 'review', 'evaluation', 'appraisal',
      'feedback', '360 feedback', 'performance review', 'career development', 'career planning',
      'job search', 'resume', 'cover letter', 'linkedin', 'personal brand', 'personal branding',
      'work life balance', 'self care', 'stress management', 'anxiety', 'burnout', 'recovery',
      'mindfulness', 'meditation', 'breathing', 'yoga', 'exercise', 'sleep', 'nutrition', 'health',
      'wellness', 'holistic', 'integrated', 'balanced', 'productive', 'efficient', 'effective',
      'strategic', 'tactical', 'operational', 'execution', 'implementation', 'follow through'
    ]
  },
  design: {
    keywords: [
      'design', 'graphic', 'ui/ux', 'web design', 'photoshop', 'illustrator', 'figma', 'adobe', 'creative',
      'typography', 'layout', 'branding', 'logo', 'poster', 'color theory', 'composition', 'visual identity',
      'mockup', 'prototyping', 'wireframe', 'indesign', 'sketch', 'xd', 'after effects', 'premiere pro',
      'lightroom', 'capture one', 'camera raw', 'photography', 'photo editing', 'retouching', 'color grading',
      'gradient', 'shadow', 'texture', 'pattern', 'illustration', 'vector', 'raster', 'icon', 'infographic',
      'motion graphic', 'animation', '3d', 'blender', 'cinema 4d', 'maya', 'zbrush', 'substance painter',
      'substance designer', 'marvelous designer', 'keyshot', 'vray', 'corona', 'lumion', 'enscape',
      'twinmotion', 'revit', 'autocad', 'sketchup', 'architecture', 'interior', 'landscape', 'urban design',
      'set design', 'props', 'character design', 'storyboard', 'concept art', 'visual development',
      'art direction', 'creative direction', 'visual design', 'interaction design', 'experience design',
      'service design', 'product design', 'industrial design', 'furniture design', 'jewelry design',
      'fashion design', 'textile design', 'costume design', 'print design', 'packaging design',
      'brand identity', 'corporate identity', 'stationery', 'business card', 'letterhead', 'envelope',
      'brochure', 'flyer', 'poster', 'banner', 'billboard', 'signage', 'wayfinding', 'environmental',
      'exhibition design', 'trade show', 'display', 'pop up', 'installation', 'lighting', 'sound design',
      'multimedia', 'digital art', 'fine art', 'painting', 'drawing', 'sculpture', 'ceramics', 'glass',
      'wood', 'metal', 'textile', 'paper', 'mixed media', 'collage', 'printmaking', 'screen printing',
      'etching', 'lithography', 'woodcut', 'linocut', 'monotype', 'spray paint', 'airbrush', 'calligraphy'
    ]
  },
  health: {
    keywords: [
      'health', 'fitness', 'nutrition', 'exercise', 'mental health', 'wellness', 'diet', 'workout', 'yoga',
      'meditation', 'anatomy', 'strength', 'cardio', 'flexibility', 'protein', 'vitamins', 'stress',
      'sleep', 'physiology', 'hygiene', 'body', 'muscle', 'bone', 'joint', 'heart', 'lung', 'liver',
      'kidney', 'brain', 'nerve', 'blood', 'artery', 'vein', 'immune', 'infection', 'inflammation',
      'allergy', 'asthma', 'diabetes', 'obesity', 'hypertension', 'cholesterol', 'glucose', 'hormone',
      'thyroid', 'adrenal', 'pituitary', 'pancreas', 'gallbladder', 'spleen', 'skin', 'hair', 'nail',
      'digestion', 'metabolism', 'detox', 'cleanse', 'fasting', 'intermittent fasting', 'keto', 'vegan',
      'vegetarian', 'pescatarian', 'paleo', 'gluten free', 'dairy free', 'organic', 'whole food',
      'superfood', 'antioxidant', 'adaptogen', 'nootropic', 'probiotic', 'prebiotic', 'enzyme', 'amino acid',
      'fatty acid', 'omega 3', 'mineral', 'electrolyte', 'hydration', 'sweat', 'body composition',
      'fat loss', 'muscle building', 'endurance', 'stamina', 'agility', 'balance', 'coordination',
      'flexibility', 'mobility', 'posture', 'injury prevention', 'rehabilitation', 'physical therapy',
      'occupational therapy', 'speech therapy', 'athletic training', 'sports performance', 'functional',
      'crossfit', 'pilates', 'barre', 'zumba', 'dance', 'martial arts', 'boxing', 'mma', 'wrestling',
      'swimming', 'running', 'cycling', 'walking', 'hiking', 'climbing', 'skiing', 'snowboard', 'skateboard',
      'surfing', 'kayak', 'canoe', 'rowing', 'sailing', 'golf', 'tennis', 'basketball', 'football'
    ]
  },
  music: {
    keywords: [
      'music', 'piano', 'guitar', 'violin', 'drums', 'singing', 'vocal', 'saxophone', 'flute', 'trumpet',
      'bass', 'ukulele', 'harmonica', 'accordion', 'organ', 'synthesizer', 'dj', 'producer', 'soundtrack',
      'classical', 'jazz', 'blues', 'rock', 'pop', 'hip hop', 'rap', 'r&b', 'soul', 'funk', 'reggae',
      'country', 'folk', 'electronic', 'techno', 'house', 'trance', 'dubstep', 'drum and bass', 'edm',
      'experimental', 'ambient', 'world music', 'african', 'latin', 'salsa', 'tango', 'flamenco', 'bossa nova',
      'musical theatre', 'opera', 'choral', 'symphony', 'orchestra', 'ensemble', 'quartet', 'band',
      'vocalist', 'singer', 'songwriter', 'lyricist', 'composer', 'arranger', 'conductor', 'session',
      'studio', 'recording', 'mixing', 'mastering', 'production', 'sound design', 'audio engineering',
      'music theory', 'sheet music', 'notation', 'chord', 'scale', 'interval', 'harmony', 'melody',
      'rhythm', 'tempo', 'time signature', 'key', 'mode', 'major', 'minor', 'diminished', 'augmented',
      'pentatonic', 'blues scale', 'chromatic', 'whole tone', 'modal', 'tonal', 'atonal', 'polyrhythm',
      'syncopation', 'swing', 'groove', 'pocket', 'feel', 'tone', 'timbre', 'articulation', 'dynamics',
      'phrase', 'improvisation', 'transposition', 'transcription', 'arrangement', 'orchestration'
    ]
  },
  art: {
    keywords: [
      'art', 'painting', 'drawing', 'sculpture', 'ceramics', 'glass', 'printmaking', 'photography',
      'digital art', 'illustration', 'graphic design', 'architecture', 'fashion', 'textile', 'jewelry',
      'calligraphy', 'street art', 'graffiti', 'mural', 'tattoo', 'body art', 'performance art',
      'installation', 'land art', 'conceptual', 'abstract', 'surrealism', 'impressionism', 'expressionism',
      'cubism', 'dada', 'pop art', 'minimalism', 'postmodern', 'modern', 'contemporary', 'traditional',
      'folk', 'indigenous', 'tribal', 'primitive', 'naive', 'outsider', 'visionary', 'symbolist',
      'realist', 'naturalist', 'romantic', 'neoclassical', 'renaissance', 'baroque', 'rococo', 'art deco',
      'art nouveau', 'bauhaus', 'constructivist', 'de stijl', 'surrealist', 'pop', 'op', 'kinetic',
      'happenings', 'fluxus', 'video', 'digital', 'interactive', 'light', 'sound', 'mixed', 'collage',
      'assemblage', 'found object', 'installation', 'public', 'community', 'activist', 'political',
      'social', 'environmental', 'eco', 'sustainable', 'upcycled', 'recycled', 'fabric', 'paper', 'wood',
      'metal', 'stone', 'clay', 'plaster', 'wax', 'resin', 'plastic', 'glass', 'neon', 'watercolor',
      'oil', 'acrylic', 'tempera', 'gouache', 'pastel', 'charcoal', 'ink', 'pencil', 'graphite', 'silverpoint'
    ]
  },
  philosophy: {
    keywords: [
      'philosophy', 'ethics', 'logic', 'metaphysics', 'epistemology', 'aesthetics', 'ontology', 'phenomenology',
      'existentialism', 'stoicism', 'utilitarianism', 'kantian', 'deontology', 'virtue ethics', 'nihilism',
      'absurdism', 'pragmatism', 'realism', 'idealism', 'materialism', 'determinism', 'free will',
      'soul', 'consciousness', 'mind', 'body', 'spirit', 'god', 'religion', 'faith', 'reason', 'knowledge',
      'truth', 'reality', 'being', 'existence', 'nothingness', 'time', 'space', 'causality', 'subjectivity',
      'objectivity', 'self', 'identity', 'personhood', 'moral', 'responsibility', 'duty', 'rights',
      'justice', 'equality', 'freedom', 'oppression', 'liberation', 'revolution', 'power', 'authority',
      'state', 'society', 'community', 'individual', 'collective', 'solidarity', 'alienation', 'authenticity',
      'angst', 'dread', 'hope', 'despair', 'joy', 'suffering', 'love', 'friendship', 'family', 'community',
      'capitalism', 'socialism', 'anarchism', 'communism', 'fascism', 'humanism', 'transhumanism',
      'posthumanism', 'nietzsche', 'kant', 'hegel', 'marx', 'mill', 'hume', 'locke', 'rousseau', 'plato',
      'aristotle', 'socrates', 'confucius', 'lao tzu', 'buddha', 'jesus', 'muhammad', 'genghis', 'khan',
      'bacon', 'descartes', 'spinoza', 'leibniz', 'berkeley', 'hume', 'kant', 'hegel', 'schopenhauer',
      'kierkegaard', 'nietzsche', 'sartre', 'camus', 'de beauvoir', 'arendt', 'foucault', 'derrida'
    ]
  },
  psychology: {
    keywords: [
      'psychology', 'behavior', 'cognition', 'emotion', 'personality', 'development', 'learning', 'memory',
      'perception', 'language', 'thinking', 'decision', 'problem solving', 'intelligence', 'consciousness',
      'unconscious', 'mind', 'brain', 'neuron', 'neuropsychology', 'cognitive', 'behavioral', 'humanistic',
      'biological', 'social', 'cross cultural', 'positive', 'clinical', 'counseling', 'abnormal', 'developmental',
      'educational', 'organizational', 'industrial', 'consumer', 'health', 'sport', 'forensic', 'evolutionary',
      'comparative', 'quantitative', 'environmental', 'community', 'school', 'psychoanalytic', 'psychodynamic',
      'existential', 'gestalt', 'behaviorism', 'cognitive behavioral', 'cbt', 'dbt', 'humanism', 'individual',
      'adlerian', 'jungian', 'object relations', 'attachment', 'trauma', 'stress', 'anxiety', 'depression',
      'bipolar', 'schizophrenia', 'ocd', 'ptsd', 'adhd', 'autism', 'dementia', 'alzheimer', 'eating disorder',
      'addiction', 'substance', 'gambling', 'internet', 'grief', 'loss', 'resilience', 'coping', 'therapy',
      'psychotherapy', 'counseling', 'hypnosis', 'meditation', 'mindfulness', 'relaxation', 'biofeedback',
      'art therapy', 'music therapy', 'play therapy', 'occupational therapy', 'speech therapy', 'pharmacology',
      'psychopharmacology', 'brain imaging', 'fmri', 'eeg', 'pet scan', 'neurotransmitter', 'dopamine',
      'serotonin', 'norepinephrine', 'acetylcholine', 'endorphin', 'testosterone', 'estrogen', 'cortisol',
      'oxytocin', 'melatonin', 'circadian', 'rhythm', 'sleep', 'dream', 'nightmare', 'reverie'
    ]
  },
  law: {
    keywords: [
      'law', 'legal', 'constitution', 'court', 'judge', 'attorney', 'lawyer', 'crime', 'criminal', 'civil',
      'contract', 'tort', 'property', 'family', 'employment', 'business', 'corporate', 'tax', 'intellectual',
      'patent', 'copyright', 'trademark', 'trade secret', 'privacy', 'data protection', 'cyber', 'international',
      'human rights', 'environmental', 'health', 'immigration', 'bankruptcy', 'merger', 'acquisition',
      'antitrust', 'securities', 'insurance', 'estate', 'trust', 'will', 'probate', 'mediation', 'arbitration',
      'negotiation', 'settlement', 'appeal', 'verdict', 'judgment', 'injunction', 'restraining order',
      'subpoena', 'deposition', 'evidence', 'testimony', 'witness', 'expert', 'jury', 'grand jury',
      'prosecutor', 'defense', 'procedural', 'substantive', 'statute', 'code', 'regulation', 'ordinance',
      'decree', 'order', 'ruling', 'opinion', 'brief', 'pleading', 'motion', 'objection', 'sustained',
      'overruled', 'contempt', 'bench', 'chambers', 'bar', 'association', 'accreditation', 'certification',
      'licensing', 'disbarment', 'prosecution', 'defense', 'indictment', 'arraignment', 'preliminary',
      'prelim', 'probable cause', 'reasonable doubt', 'beyond reasonable', 'due process', 'equal protection',
      'privilege', 'immunity', 'extradition', 'deportation', 'detention', 'incarceration', 'parole', 'probation',
      'restitution', 'damages', 'compensation', 'punitive', 'nominal', 'liquidated', 'injunction'
    ]
  },
  medicine: {
    keywords: [
      'medicine', 'doctor', 'physician', 'nurse', 'surgery', 'diagnosis', 'treatment', 'patient', 'clinic',
      'hospital', 'pharmacy', 'prescription', 'medication', 'drug', 'therapeutic', 'prevention', 'wellness',
      'anatomy', 'physiology', 'pathology', 'microbiology', 'immunology', 'neuro', 'cardiology', 'pulmonology',
      'gastro', 'nephrology', 'urology', 'gynecology', 'obstetrics', 'pediatrics', 'geriatrics', 'orthopedics',
      'dermatology', 'ophthalmology', 'otolaryngology', 'plastic', 'reconstructive', 'emergency', 'intensive',
      'palliative', 'hospice', 'family', 'internal', 'general', 'sports', 'aviation', 'space', 'hyperbaric',
      'infectious', 'tropical', 'global', 'public', 'community', 'rural', 'urban', 'school', 'occupational',
      'environmental', 'veterinary', 'dentistry', 'radiology', 'oncology', 'hematology', 'rheumatology',
      'allergy', 'endocrinology', 'metabolic', 'genetic', 'perinatal', 'neonatal', 'adolescent', 'adult',
      'mental', 'behavioral', 'psychiatric', 'psychosomatic', 'rehabilitation', 'physical', 'speech',
      'occupational', 'respiratory', 'cardiac', 'renal', 'liver', 'pancreatic', 'gallbladder', 'spleen',
      'bone marrow', 'stem cell', 'transplant', 'immunosuppression', 'vaccination', 'immunization',
      'antibiotic', 'antiviral', 'antifungal', 'antiparasitic', 'analgesic', 'anti inflammatory', 'sedative',
      'anesthetic', 'antidepressant', 'antipsychotic', 'mood stabilizer', 'stimulant', 'bronchodilator',
      'antihistamine', 'decongestant', 'expectorant', 'antitussive', 'laxative', 'antacid', 'probiotic'
    ]
  },
  agriculture: {
    keywords: [
      'agriculture', 'farming', 'crop', 'soil', 'irrigation', 'harvest', 'livestock', 'poultry', 'dairy',
      'veterinary', 'compost', 'fertilizer', 'pesticide', 'organic', 'sustainable', 'permaculture', 'aquaculture',
      'aquaponics', 'hydroponics', 'greenhouse', 'nursery', 'orchard', 'vineyard', 'plantation', 'ranch',
      'pasture', 'silage', 'hay', 'grain', 'cereal', 'fruit', 'vegetable', 'herb', 'spice', 'flower',
      'landscape', 'forestry', 'timber', 'woodlot', 'agroforestry', 'agribusiness', 'food', 'security',
      'safety', 'processing', 'storage', 'distribution', 'market', 'export', 'import', 'trade', 'rural',
      'urban', 'vertical farming', 'precision', 'smart', 'drone', 'remote sensing', 'gps', 'gis', 'soil science',
      'entomology', 'plant pathology', 'weed science', 'crop physiology', 'genetics', 'biotechnology',
      'breeding', 'hybrid', 'heirloom', 'non gmo', 'cover crop', 'rotation', 'tillage', 'no till',
      'conservation', 'erosion', 'water', 'quality', 'management', 'nutrient', 'management', 'integrated pest',
      'biological control', 'beneficial insect', 'pollinator', 'beekeeping', 'apiculture', 'sericulture',
      'composting', 'vermiculture', 'worm casting', 'biochar', 'biodynamic', 'regenerative', 'agroecology'
    ]
  },
  sports: {
    keywords: [
      'sports', 'football', 'soccer', 'basketball', 'tennis', 'golf', 'swimming', 'athletics', 'track',
      'running', 'cycling', 'skateboard', 'surfing', 'skiing', 'snowboard', 'ice skating', 'hockey',
      'baseball', 'softball', 'cricket', 'rugby', 'netball', 'badminton', 'squash', 'pickleball',
      'volleyball', 'water polo', 'handball', 'archery', 'shooting', 'fencing', 'martial arts', 'boxing',
      'judo', 'karate', 'taekwondo', 'jujitsu', 'kickboxing', 'muay thai', 'mma', 'wrestling', 'sumo',
      'weightlifting', 'powerlifting', 'bodybuilding', 'gymnastics', 'dance', 'ballet', 'tap', 'jazz',
      'hip hop', 'breakdance', 'pole', 'aerial', 'parkour', 'freerunning', 'calisthenics', 'fitness',
      'exercise', 'cardio', 'strength', 'endurance', 'flexibility', 'mobility', 'balance', 'agility',
      'coordination', 'reflex', 'precision', 'strategy', 'tactics', 'team', 'captain', 'coach', 'trainer',
      'official', 'referee', 'umpire', 'judge', 'competition', 'league', 'tournament', 'championship',
      'olympic', 'paralympic', 'professional', 'amateur', 'collegiate', 'high school', 'youth', 'recreation',
      'club', 'fitness center', 'gym', 'yoga studio', 'pool', 'court', 'field', 'arena', 'stadium'
    ]
  },
  cooking: {
    keywords: [
      'cooking', 'baking', 'chef', 'recipe', 'ingredient', 'technique', 'cuisine', 'kitchen', 'knife',
      'cutting', 'chopping', 'dicing', 'mincing', 'peeling', 'grating', 'crushing', 'mixing', 'blending',
      'whisking', 'beating', 'kneading', 'rolling', 'cutting', 'shaping', 'frying', 'sautéing', 'stir frying',
      'grilling', 'broiling', 'roasting', 'baking', 'boiling', 'simmering', 'steaming', 'poaching', 'blanching',
      'shocking', 'braising', 'stewing', 'confit', 'curing', 'smoking', 'pickling', 'fermenting', 'sous vide',
      'soup', 'stew', 'salad', 'sandwich', 'bread', 'pasta', 'rice', 'noodle', 'dumpling', 'pastry', 'dessert',
      'cake', 'cookie', 'pie', 'tart', 'sauce', 'dressing', 'marinade', 'rub', 'glaze', 'frosting', 'icing',
      'garnish', 'herb', 'spice', 'salt', 'pepper', 'sugar', 'flour', 'egg', 'butter', 'oil', 'vinegar',
      'soy sauce', 'fish sauce', 'oyster sauce', 'stock', 'broth', 'bouillon', 'consommé', 'roux', 'coating',
      'breading', 'batter', 'dough', 'crumble', 'crust', 'stuffing', 'roll', 'wrap', 'taco', 'burrito',
      'pizza', 'calzone', 'sushi', 'sashimi', 'tempura', 'teriyaki', 'barbecue', 'smoke', 'maple', 'honey',
      'syrup', 'jam', 'preserve', 'compote', 'mousse', 'soufflé', 'crepe', 'pancake', 'waffle', 'muffin'
    ]
  },
  photography: {
    keywords: [
      'photography', 'camera', 'lens', 'aperture', 'shutter', 'iso', 'exposure', 'composition', 'lighting',
      'studio', 'portrait', 'landscape', 'nature', 'wildlife', 'macro', 'street', 'documentary', 'journalism',
      'creative', 'fine art', 'black and white', 'film', 'digital', 'mirrorless', 'dslr', 'rangefinder',
      'medium format', 'instant', 'polaroid', 'leica', 'canon', 'nikon', 'sony', 'fujifilm', 'olympus',
      'panasonic', 'pentax', 'ricoh', 'rolleiflex', 'hasselblad', 'phase one', 'zeiss', 'sigma', 'tamron',
      'tokina', 'vintage', 'analog', 'processing', 'developing', 'printing', 'darkroom', 'enlarger', 'chemistry',
      'developer', 'fixer', 'wash', 'toner', 'dry', 'mount', 'frame', 'gallery', 'exhibition', 'curate',
      'editing', 'retouching', 'color grading', 'culling', 'cataloging', 'storage', 'backup', 'cloud',
      'camera bag', 'tripod', 'monopod', 'gimbal', 'slider', 'drone', 'remote', 'flash', 'reflector',
      'diffuser', 'softbox', 'umbrella', 'beauty dish', 'grid', 'gel', 'polarizer', 'neutral density',
      'graduated', 'cokin', 'lee', 'b+w', 'hoya', 'tiffen', 'adapter', 'ring', 'bellows', 'extension tube',
      'macro filter', 'fish eye', 'tilt shift', 'telephoto', 'wide angle', 'standard', 'zoom', 'prime',
      'manual', 'auto', 'program', 'aperture priority', 'shutter priority', 'metering', 'spot', 'center'
    ]
  },
  gaming: {
    keywords: [
      'gaming', 'video game', 'playing', 'streaming', 'esports', 'league of legends', 'dota', 'counter strike',
      'valorant', 'overwatch', 'call of duty', 'battlefield', 'apex', 'fortnite', 'pubg', 'minecraft',
      'roblox', 'gta', 'red dead', 'assassin creed', 'god of war', 'horizon', 'zelda', 'mario', 'sonic',
      'street fighter', 'mortal kombat', 'tekken', 'smash bros', 'pokemon', 'final fantasy', 'kingdom hearts',
      'resident evil', 'silent hill', 'evil within', 'outlast', 'amnesia', 'fnaf', 'dead by daylight',
      'among us', 'fall guys', 'rust', 'ark', 'dayz', 'tarkov', 'hunt showdown', 'valorant', 'csgo',
      'rainbow six siege', 'rocket league', 'warcraft', 'starCraft', 'diablo', 'world of warcraft',
      'final fantasy xiv', 'elder scrolls online', 'guild wars 2', 'black desert', 'ark survival',
      'subnautica', 'terraria', 'stardew valley', 'animal crossing', 'harvest moon', 'story of seasons',
      'visual novel', 'rpg', 'fps', 'battle royale', 'simulation', 'strategy', 'mmorpg', 'moba', 'sports',
      'racing', 'fighting', 'horror', 'adventure', 'puzzle', 'platformer', 'shooter', 'stealth', 'survival',
      'sandbox', 'roguelike', 'metroidvania', 'jrpg', 'crpg', 'rts', 'tower defense', 'card game', 'board game',
      'tabletop', 'deck building', 'expansion', 'dlc', 'season pass', 'battle pass', 'microtransactions'
    ]
  }
};

// ============================================
// 2. Detect Video Category
// ============================================
const detectVideoCategory = (title, description, keywords) => {
  const text = (title + ' ' + description + ' ' + (keywords || []).join(' ')).toLowerCase();
  
  let bestCategory = 'general';
  let bestScore = 0;

  Object.entries(videoCategories).forEach(([category, data]) => {
    let score = 0;
    data.keywords.forEach(kw => {
      if (text.includes(kw)) score += 2;
    });
    if (score > bestScore) {
      bestScore = score;
      bestCategory = category;
    }
  });

  return bestScore > 0 ? bestCategory : 'general';
};

// ============================================
// 3. Detect Category from Query
// ============================================
const detectCategoryFromQuery = (query) => {
  const queryLower = query.toLowerCase();
  let bestCategory = 'general';
  let bestScore = 0;

  Object.entries(videoCategories).forEach(([category, data]) => {
    data.keywords.forEach(kw => {
      if (queryLower.includes(kw)) {
        const score = kw.length;
        if (score > bestScore) {
          bestScore = score;
          bestCategory = category;
        }
      }
    });
  });

  return bestCategory;
};

// ============================================
// 4. Filter Videos by Category
// ============================================
const filterVideosByCategory = (videos, query) => {
  const targetCategory = detectCategoryFromQuery(query);
  console.log('Target category:', targetCategory);

  const filtered = videos.filter(video => {
    const text = (video.title + ' ' + video.description + ' ' + (video.keywords || []).join(' ')).toLowerCase();
    const category = detectVideoCategory(video.title, video.description, video.keywords || []);
    return category === targetCategory || targetCategory === 'general';
  });

  console.log('Filtered videos:', filtered.length);
  return filtered.length > 0 ? filtered : videos;
};

// ============================================
// 5. Analyze Video Content
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
// 6. Detect Educational Content (UNIVERSAL - 300+ keywords per domain)
// ============================================
const detectEducational = (keywords, title) => {
  // ALL educational words combined from all categories
  const allEducationalWords = [
    // Programming
    'programming', 'coding', 'python', 'javascript', 'react', 'java', 'c++', 'html', 'css', 'node',
    'express', 'mongodb', 'sql', 'git', 'github', 'algorithm', 'data structure', 'variable',
    'function', 'class', 'object', 'loop', 'array', 'string', 'compiler', 'debugging', 'software',
    'web development', 'app development', 'mobile development', 'api', 'rest', 'graphql', 'docker',
    'kubernetes', 'aws', 'azure', 'linux', 'bash', 'shell', 'terminal', 'command line', 'database',
    'backend', 'frontend', 'full stack', 'framework', 'library', 'package', 'module', 'import',
    'export', 'promise', 'async', 'await', 'callback', 'event', 'listener', 'dom', 'browser',
    'server', 'client', 'network', 'protocol', 'http', 'https', 'websocket', 'socket', 'stream',
    'buffer', 'file system', 'os', 'thread', 'process', 'memory', 'performance', 'optimization',
    'testing', 'jest', 'mocha', 'chai', 'cypress', 'selenium', 'webpack', 'vite', 'babel', 'eslint',
    'prettier', 'typescript', 'angular', 'vue', 'svelte', 'next.js', 'gatsby', 'wordpress', 'laravel',
    'django', 'flask', 'spring', 'boot', 'rails', 'ruby', 'php', 'swift', 'kotlin', 'android', 'ios',
    'flutter', 'react native', 'xamarin', 'unity', 'unreal', 'game development', 'c#', '.net',
    'visual basic', 'r', 'matlab', 'scala', 'perl', 'rust', 'go', 'zig', 'lua', 'haskell', 'elixir',
    'erlang', 'clojure', 'groovy', 'dart', 'julia', 'typescript', 'ocaml', 'scheme', 'common lisp',
    'fortran', 'cobol', 'pascal', 'assembly', 'machine learning', 'ai', 'neural network', 'deep learning',
    'tensorflow', 'pytorch', 'scikit-learn', 'pandas', 'numpy', 'matplotlib', 'seaborn', 'data science',
    
    // Engineering
    'engineering', 'civil', 'mechanical', 'electrical', 'electronic', 'chemical', 'industrial',
    'aerospace', 'automotive', 'biomedical', 'environmental', 'structural', 'geotechnical', 'hydraulic',
    'pneumatic', 'thermodynamics', 'fluid mechanics', 'statics', 'dynamics', 'strength of materials',
    'machine design', 'manufacturing', 'production', 'quality control', 'lean', 'six sigma', 'cad',
    'cam', 'cae', 'solidworks', 'autocad', 'catia', 'pro engineer', 'ansys', 'abaqus', 'comsol',
    
    // Mathematics
    'mathematics', 'math', 'algebra', 'calculus', 'geometry', 'trigonometry', 'statistics', 'arithmetic',
    'linear algebra', 'differential equations', 'number theory', 'analysis', 'topology', 'logic',
    'set theory', 'graph theory', 'combinatorics', 'probability', 'optimization', 'algorithm',
    'equations', 'formulas', 'numbers', 'graphs', 'functions', 'derivatives', 'integrals', 'matrices',
    'vectors', 'limits', 'continuity', 'series', 'convergence', 'fourier', 'laplace', 'z transform',
    'complex analysis', 'real analysis', 'abstract algebra', 'group theory', 'ring theory', 'field theory',
    'galois', 'linear programming', 'nonlinear', 'discrete', 'finite', 'infinite', 'infinity',
    
    // Science
    'science', 'physics', 'chemistry', 'biology', 'astronomy', 'earth science', 'geology', 'ecology',
    'genetics', 'molecular biology', 'quantum physics', 'thermodynamics', 'experiments', 'lab',
    'molecules', 'atoms', 'energy', 'force', 'motion', 'cells', 'dna', 'evolution', 'climate',
    'space', 'planets', 'stars', 'galaxies', 'universe', 'cosmos', 'black hole', 'wormhole',
    'relativity', 'string theory', 'particle physics', 'standard model', 'dark matter', 'dark energy',
    'quantum mechanics', 'schrodinger', 'heisenberg', 'einstein', 'newton', 'galileo', 'darwin',
    
    // Languages
    'language', 'english', 'spanish', 'french', 'german', 'arabic', 'chinese', 'japanese', 'russian',
    'italian', 'portuguese', 'korean', 'hindi', 'bengali', 'urdu', 'persian', 'turkish', 'dutch',
    'greek', 'latin', 'grammar', 'vocabulary', 'pronunciation', 'speaking', 'writing', 'reading',
    'listening', 'translation', 'conjugation', 'verb tenses', 'sentence structure', 'idioms',
    'expressions', 'phrases', 'accent', 'dialect', 'phonetics', 'morphology', 'syntax', 'semantics',
    
    // History
    'history', 'ancient', 'civilization', 'world war', 'historical', 'kingdom', 'empire', 'revolution',
    'renaissance', 'medieval', 'modern history', 'wars', 'leaders', 'culture', 'society', 'art',
    'architecture', 'inventions', 'timeline', 'egyptian', 'greek', 'roman', 'mayan', 'aztec',
    'incan', 'mesopotamian', 'persian', 'ottoman', 'moghul', 'qin', 'han', 'tang', 'song', 'yuan',
    'ming', 'qing', 'meiji', 'victorian', 'edwardian', 'georgian', 'colonial', 'imperial', 'feudal',
    
    // Business
    'business', 'marketing', 'entrepreneur', 'finance', 'management', 'leadership', 'strategy', 'sales',
    'investment', 'startup', 'economics', 'accounting', 'audit', 'tax', 'insurance', 'banking',
    'stock market', 'trading', 'investing', 'portfolio', 'asset', 'liability', 'equity', 'revenue',
    'profit', 'loss', 'budget', 'forecast', 'planning', 'analysis', 'market research', 'customer',
    'client', 'b2b', 'b2c', 'ecommerce', 'retail', 'wholesale', 'distribution', 'logistics', 'supply chain',
    'operations', 'quality', 'procurement', 'negotiation', 'contract', 'law', 'compliance', 'risk',
    
    // Soft Skills
    'communication', 'leadership', 'teamwork', 'problem solving', 'critical thinking', 'time management',
    'emotional intelligence', 'empathy', 'resilience', 'adaptability', 'flexibility', 'creativity',
    'innovation', 'decision making', 'conflict resolution', 'negotiation', 'presentation', 'public speaking',
    'networking', 'relationship building', 'interpersonal', 'active listening', 'feedback', 'coaching',
    'mentoring', 'delegation', 'motivation', 'inspiration', 'influence', 'collaboration', 'cooperation',
    
    // Design
    'design', 'graphic', 'ui/ux', 'web design', 'photoshop', 'illustrator', 'figma', 'adobe', 'creative',
    'typography', 'layout', 'branding', 'logo', 'poster', 'color theory', 'composition', 'visual identity',
    'mockup', 'prototyping', 'wireframe', 'indesign', 'sketch', 'xd', 'after effects', 'premiere pro',
    
    // Health
    'health', 'fitness', 'nutrition', 'exercise', 'mental health', 'wellness', 'diet', 'workout', 'yoga',
    'meditation', 'anatomy', 'strength', 'cardio', 'flexibility', 'protein', 'vitamins', 'stress',
    'sleep', 'physiology', 'hygiene', 'body', 'muscle', 'bone', 'joint', 'heart', 'lung', 'liver',
    'kidney', 'brain', 'nerve', 'blood', 'artery', 'vein', 'immune', 'infection', 'inflammation',
    
    // Music
    'music', 'piano', 'guitar', 'violin', 'drums', 'singing', 'vocal', 'saxophone', 'flute', 'trumpet',
    'bass', 'ukulele', 'harmonica', 'accordion', 'organ', 'synthesizer', 'dj', 'producer', 'soundtrack',
    'classical', 'jazz', 'blues', 'rock', 'pop', 'hip hop', 'rap', 'r&b', 'soul', 'funk', 'reggae',
    'country', 'folk', 'electronic', 'techno', 'house', 'trance', 'dubstep', 'drum and bass', 'edm',
    
    // Art
    'art', 'painting', 'drawing', 'sculpture', 'ceramics', 'glass', 'printmaking', 'photography',
    'digital art', 'illustration', 'graphic design', 'architecture', 'fashion', 'textile', 'jewelry',
    'calligraphy', 'street art', 'graffiti', 'mural', 'tattoo', 'body art', 'performance art',
    'installation', 'land art', 'conceptual', 'abstract', 'surrealism', 'impressionism', 'expressionism',
    
    // Philosophy
    'philosophy', 'ethics', 'logic', 'metaphysics', 'epistemology', 'aesthetics', 'ontology', 'phenomenology',
    'existentialism', 'stoicism', 'utilitarianism', 'kantian', 'deontology', 'virtue ethics', 'nihilism',
    'absurdism', 'pragmatism', 'realism', 'idealism', 'materialism', 'determinism', 'free will',
    'soul', 'consciousness', 'mind', 'body', 'spirit', 'god', 'religion', 'faith', 'reason', 'knowledge',
    
    // Psychology
    'psychology', 'behavior', 'cognition', 'emotion', 'personality', 'development', 'learning', 'memory',
    'perception', 'language', 'thinking', 'decision', 'problem solving', 'intelligence', 'consciousness',
    'unconscious', 'mind', 'brain', 'neuron', 'neuropsychology', 'cognitive', 'behavioral', 'humanistic',
    'biological', 'social', 'cross cultural', 'positive', 'clinical', 'counseling', 'abnormal', 'developmental',
    'educational', 'organizational', 'industrial', 'consumer', 'health', 'sport', 'forensic', 'evolutionary',
    
    // Law
    'law', 'legal', 'constitution', 'court', 'judge', 'attorney', 'lawyer', 'crime', 'criminal', 'civil',
    'contract', 'tort', 'property', 'family', 'employment', 'business', 'corporate', 'tax', 'intellectual',
    'patent', 'copyright', 'trademark', 'trade secret', 'privacy', 'data protection', 'cyber', 'international',
    'human rights', 'environmental', 'health', 'immigration', 'bankruptcy', 'merger', 'acquisition',
    'antitrust', 'securities', 'insurance', 'estate', 'trust', 'will', 'probate', 'mediation', 'arbitration',
    
    // Medicine
    'medicine', 'doctor', 'physician', 'nurse', 'surgery', 'diagnosis', 'treatment', 'patient', 'clinic',
    'hospital', 'pharmacy', 'prescription', 'medication', 'drug', 'therapeutic', 'prevention', 'wellness',
    'anatomy', 'physiology', 'pathology', 'microbiology', 'immunology', 'neuro', 'cardiology', 'pulmonology',
    'gastro', 'nephrology', 'urology', 'gynecology', 'obstetrics', 'pediatrics', 'geriatrics', 'orthopedics',
    'dermatology', 'ophthalmology', 'otolaryngology', 'plastic', 'reconstructive', 'emergency', 'intensive',
    
    // Agriculture
    'agriculture', 'farming', 'crop', 'soil', 'irrigation', 'harvest', 'livestock', 'poultry', 'dairy',
    'veterinary', 'compost', 'fertilizer', 'pesticide', 'organic', 'sustainable', 'permaculture', 'aquaculture',
    'aquaponics', 'hydroponics', 'greenhouse', 'nursery', 'orchard', 'vineyard', 'plantation', 'ranch',
    'pasture', 'silage', 'hay', 'grain', 'cereal', 'fruit', 'vegetable', 'herb', 'spice', 'flower',
    
    // Sports
    'sports', 'football', 'soccer', 'basketball', 'tennis', 'golf', 'swimming', 'athletics', 'track',
    'running', 'cycling', 'skateboard', 'surfing', 'skiing', 'snowboard', 'ice skating', 'hockey',
    'baseball', 'softball', 'cricket', 'rugby', 'netball', 'badminton', 'squash', 'pickleball',
    'volleyball', 'water polo', 'handball', 'archery', 'shooting', 'fencing', 'martial arts', 'boxing',
    'judo', 'karate', 'taekwondo', 'jujitsu', 'kickboxing', 'muay thai', 'mma', 'wrestling', 'sumo',
    'weightlifting', 'powerlifting', 'bodybuilding', 'gymnastics', 'dance', 'ballet', 'tap', 'jazz',
    'hip hop', 'breakdance', 'pole', 'aerial', 'parkour', 'freerunning', 'calisthenics', 'fitness',
    
    // Cooking
    'cooking', 'baking', 'chef', 'recipe', 'ingredient', 'technique', 'cuisine', 'kitchen', 'knife',
    'cutting', 'chopping', 'dicing', 'mincing', 'peeling', 'grating', 'crushing', 'mixing', 'blending',
    'whisking', 'beating', 'kneading', 'rolling', 'cutting', 'shaping', 'frying', 'sautéing', 'stir frying',
    'grilling', 'broiling', 'roasting', 'baking', 'boiling', 'simmering', 'steaming', 'poaching', 'blanching',
    'shocking', 'braising', 'stewing', 'confit', 'curing', 'smoking', 'pickling', 'fermenting', 'sous vide',
    'soup', 'stew', 'salad', 'sandwich', 'bread', 'pasta', 'rice', 'noodle', 'dumpling', 'pastry', 'dessert',
    'cake', 'cookie', 'pie', 'tart', 'sauce', 'dressing', 'marinade', 'rub', 'glaze', 'frosting', 'icing',
    'garnish', 'herb', 'spice', 'salt', 'pepper', 'sugar', 'flour', 'egg', 'butter', 'oil', 'vinegar',
    'soy sauce', 'fish sauce', 'oyster sauce', 'stock', 'broth', 'bouillon', 'consommé', 'roux', 'coating',
    'breading', 'batter', 'dough', 'crumble', 'crust', 'stuffing', 'roll', 'wrap', 'taco', 'burrito',
    'pizza', 'calzone', 'sushi', 'sashimi', 'tempura', 'teriyaki', 'barbecue', 'smoke', 'maple', 'honey',
    'syrup', 'jam', 'preserve', 'compote', 'mousse', 'soufflé', 'crepe', 'pancake', 'waffle', 'muffin',
    
    // Photography
    'photography', 'camera', 'lens', 'aperture', 'shutter', 'iso', 'exposure', 'composition', 'lighting',
    'studio', 'portrait', 'landscape', 'nature', 'wildlife', 'macro', 'street', 'documentary', 'journalism',
    'creative', 'fine art', 'black and white', 'film', 'digital', 'mirrorless', 'dslr', 'rangefinder',
    'medium format', 'instant', 'polaroid', 'leica', 'canon', 'nikon', 'sony', 'fujifilm', 'olympus',
    'panasonic', 'pentax', 'ricoh', 'rolleiflex', 'hasselblad', 'phase one', 'zeiss', 'sigma', 'tamron',
    'tokina', 'vintage', 'analog', 'processing', 'developing', 'printing', 'darkroom', 'enlarger', 'chemistry',
    'developer', 'fixer', 'wash', 'toner', 'dry', 'mount', 'frame', 'gallery', 'exhibition', 'curate',
    'editing', 'retouching', 'color grading', 'culling', 'cataloging', 'storage', 'backup', 'cloud',
    'camera bag', 'tripod', 'monopod', 'gimbal', 'slider', 'drone', 'remote', 'flash', 'reflector',
    'diffuser', 'softbox', 'umbrella', 'beauty dish', 'grid', 'gel', 'polarizer', 'neutral density',
    'graduated', 'cokin', 'lee', 'b+w', 'hoya', 'tiffen', 'adapter', 'ring', 'bellows', 'extension tube',
    'macro filter', 'fish eye', 'tilt shift', 'telephoto', 'wide angle', 'standard', 'zoom', 'prime',
    'manual', 'auto', 'program', 'aperture priority', 'shutter priority', 'metering', 'spot', 'center',
    
    // Gaming
    'gaming', 'video game', 'playing', 'streaming', 'esports', 'league of legends', 'dota', 'counter strike',
    'valorant', 'overwatch', 'call of duty', 'battlefield', 'apex', 'fortnite', 'pubg', 'minecraft',
    'roblox', 'gta', 'red dead', 'assassin creed', 'god of war', 'horizon', 'zelda', 'mario', 'sonic',
    'street fighter', 'mortal kombat', 'tekken', 'smash bros', 'pokemon', 'final fantasy', 'kingdom hearts',
    'resident evil', 'silent hill', 'evil within', 'outlast', 'amnesia', 'fnaf', 'dead by daylight',
    'among us', 'fall guys', 'rust', 'ark', 'dayz', 'tarkov', 'hunt showdown', 'valorant', 'csgo',
    'rainbow six siege', 'rocket league', 'warcraft', 'starCraft', 'diablo', 'world of warcraft',
    'final fantasy xiv', 'elder scrolls online', 'guild wars 2', 'black desert', 'ark survival',
    'subnautica', 'terraria', 'stardew valley', 'animal crossing', 'harvest moon', 'story of seasons',
    'visual novel', 'rpg', 'fps', 'battle royale', 'simulation', 'strategy', 'mmorpg', 'moba', 'sports',
    'racing', 'fighting', 'horror', 'adventure', 'puzzle', 'platformer', 'shooter', 'stealth', 'survival',
    'sandbox', 'roguelike', 'metroidvania', 'jrpg', 'crpg', 'rts', 'tower defense', 'card game', 'board game',
    'tabletop', 'deck building', 'expansion', 'dlc', 'season pass', 'battle pass', 'microtransactions'
  ];

  const combinedText = keywords.join(' ') + ' ' + title.toLowerCase();
  
  // Check if ANY educational word exists (no minimum threshold)
  return allEducationalWords.some(word => combinedText.includes(word));
};

// ============================================
// 7. Auto-Review Video
// ============================================
export const autoReviewVideo = async (videoId) => {
  try {
    const analysis = await analyzeVideoContent(videoId);
    
    let status = 'pending';
    if (analysis.isEducational) {
      status = 'approved';
    } else {
      status = 'rejected';
    }

    const { error } = await supabase
      .from('videos')
      .update({
        status: status,
        admin_notes: analysis.isEducational ? 'Auto-approved (educational)' : 'Auto-rejected (non-educational)',
      })
      .eq('youtube_video_id', videoId);

    if (error) throw error;

    return { status, analysis };
  } catch (error) {
    console.error('Error auto-reviewing video:', error);
    return { status: 'pending', analysis: null };
  }
};

// ============================================
// 8. Fetch All Videos
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
// 9. Fetch Video Content
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
// 10. Extract Smart Keywords
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
// 11. Generate Summary
// ============================================
export const generateSummary = (title, description, keywords) => {
  if (!description) return title;
  
  const words = description.split(' ');
  const shortDesc = words.slice(0, 30).join(' ') + (words.length > 30 ? '...' : '');
  const keywordStr = keywords.slice(0, 5).join(', ');
  
  return `${shortDesc}\n\nKeywords: ${keywordStr}`;
};

// ============================================
// 12. Process Video
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
// 13. Advanced Search with Categories
// ============================================
export const advancedSearch = async (query) => {
  try {
    const allVideos = await fetchAllVideos();
    
    if (!allVideos || allVideos.length === 0) {
      return [];
    }
    
    const filteredByCategory = filterVideosByCategory(allVideos, query);
    const queryWords = extractSmartKeywords(query);
    console.log('Query words:', queryWords);
    
    const ranked = filteredByCategory.map(video => {
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
      
      const category = detectVideoCategory(video.title, video.description, videoKeywords);
      const queryCategory = detectCategoryFromQuery(query);
      if (category === queryCategory) {
        matchScore += 10;
      }
      
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
// 14. Search Videos by Question (Legacy)
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
// 15. Knowledge Base (Simple)
// ============================================
const knowledgeBase = [
  {
    keywords: ['what is BrainThrive', 'about BrainThrive', 'platform', 'brainthrive'],
    response: 'BrainThrive is an educational video platform that curates the best learning content from YouTube in a seamless reel format.'
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
    response: 'Yes! BrainThrive is completely free to use. No hidden costs, no subscriptions.'
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
    response: 'Hello! Welcome to BrainThrive. I\'m EduBot, your AI educational assistant.'
  }
];

// ============================================
// 16. Search Knowledge Base
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
// 17. Get Enhanced Response
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
    
    
    return {
      text: `I found these videos based on your question:\n\n${videoList}\n\nClick on any video to watch it!`,
      videos: videos,
      source: 'videos',
      keywords: extractSmartKeywords(question),
    };
  }
  
  return {
    text: 'I couldn\'t find any videos matching your question. Try using different keywords!',
    videos: [],
    source: 'fallback',
    keywords: extractSmartKeywords(question),
  };
};

// ============================================
// 18. Analyze Sentiment
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
