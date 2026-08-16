import { supabase } from './supabase';

// ============================================
// Educational Keywords Database (400+ per category)
// ============================================
const educationalKeywords = [
  // ===== Programming & Coding =====
  'programming', 'coding', 'developer', 'software', 'engineer', 'computer science',
  'python', 'javascript', 'react', 'node', 'express', 'mongodb', 'sql', 'postgresql',
  'mysql', 'html', 'css', 'java', 'c++', 'csharp', 'ruby', 'php', 'swift', 'kotlin',
  'go', 'rust', 'typescript', 'angular', 'vue', 'django', 'flask', 'spring', 'laravel',
  'rails', 'api', 'rest', 'graphql', 'docker', 'kubernetes', 'aws', 'azure', 'gcp',
  'git', 'github', 'gitlab', 'ci/cd', 'devops', 'agile', 'scrum', 'algorithm',
  'data structure', 'variable', 'function', 'class', 'object', 'loop', 'array',
  'string', 'boolean', 'integer', 'float', 'compiler', 'interpreter', 'debugging',
  'syntax', 'semantic', 'runtime', 'framework', 'library', 'package', 'module',
  'dependency', 'repository', 'branch', 'merge', 'commit', 'push', 'pull', 'clone',
  'fork', 'issue', 'pull request', 'code review', 'testing', 'unit test', 'integration',
  'deployment', 'server', 'client', 'frontend', 'backend', 'fullstack', 'mobile',
  'web app', 'responsive', 'user interface', 'user experience', 'accessibility',
  'security', 'authentication', 'authorization', 'encryption', 'hashing', 'jwt',
  'oauth', 'session', 'cookie', 'database', 'schema', 'query', 'join', 'index',
  'optimization', 'scalability', 'performance', 'cache', 'redis', 'memcached',
  'message queue', 'rabbitmq', 'kafka', 'microservices', 'monolith', 'serverless',
  'cloud', 'infrastructure', 'automation', 'terraform', 'ansible', 'jenkins',
  'github actions', 'circleci', 'travis', 'npm', 'yarn', 'pip', 'composer', 'bundler',
  'gradle', 'maven', 'ant', 'make', 'cmake', 'visual studio', 'vscode', 'intellij',
  'eclipse', 'android studio', 'xcode', 'vim', 'emacs', 'sublime', 'atom', 'regex',
  'json', 'xml', 'yaml', 'markdown', 'http', 'https', 'websocket', 'tcp', 'udp',
  'ip', 'dns', 'firewall', 'proxy', 'load balancer', 'nginx', 'apache', 'tomcat',
  'javascript frameworks', 'state management', 'redux', 'context', 'hooks', 'lifecycle',
  'component', 'props', 'state', 'events', 'forms', 'validation', 'routing', 'navigation',
  'animation', 'transition', 'webpack', 'babel', 'vite', 'rollup', 'bundler', 'transpiler',
  'computer architecture', 'operating systems', 'networking', 'cybersecurity',
  'machine learning', 'artificial intelligence', 'data science', 'big data',
  'hadoop', 'spark', 'tensorflow', 'pytorch', 'keras', 'scikit-learn', 'pandas',
  'numpy', 'matplotlib', 'seaborn', 'jupyter', 'colab', 'kaggle', 'deep learning',
  'neural networks', 'nlp', 'computer vision', 'reinforcement learning', 'gan',
  'transformer', 'bert', 'gpt', 'llm', 'rag', 'embedding', 'vector database',
  'prompt engineering', 'fine-tuning', 'training', 'inference', 'evaluation',
  'confusion matrix', 'accuracy', 'precision', 'recall', 'f1 score', 'auc',
  'roc', 'cross-validation', 'hyperparameter', 'regularization', 'dropout',
  'batch normalization', 'early stopping', 'learning rate', 'optimizer', 'adam',
  'sgd', 'loss function', 'activation function', 'relu', 'sigmoid', 'tanh',
  'softmax', 'convolution', 'pooling', 'flatten', 'dense layer', 'recurrent',
  'lstm', 'gru', 'attention', 'memory', 'gpu', 'cuda', 'tpu', 'parallel computing',
  
  // ===== Engineering & Technology =====
  'engineering', 'engineer', 'mechanical', 'electrical', 'civil', 'chemical',
  'aerospace', 'automotive', 'biomedical', 'industrial', 'environmental',
  'material science', 'thermodynamics', 'fluid dynamics', 'statics', 'dynamics',
  'strength of materials', 'structural analysis', 'circuits', 'electronics',
  'power systems', 'control systems', 'robotics', 'automation', 'mechatronics',
  'cad', 'cam', 'cae', 'solidworks', 'autocad', 'catia', 'ansys', 'matlab',
  'simulink', 'labview', 'arduino', 'raspberry pi', 'embedded systems', 'iot',
  'sensors', 'actuators', 'microcontrollers', 'fpga', 'pcb', 'oscilloscope',
  'multimeter', 'soldering', 'breadboard', 'circuit design', 'signal processing',
  'telecommunications', 'wireless', 'rf', 'antenna', 'microwave', 'optical',
  'fiber optics', 'renewable energy', 'solar', 'wind', 'hydro', 'geothermal',
  'power plant', 'grid', 'smart grid', 'electric vehicle', 'battery', 'fuel cell',
  'hydrogen', 'sustainability', 'climate change', 'environmental engineering',
  'water treatment', 'waste management', 'pollution control', 'gis', 'remote sensing',
  'surveying', 'construction', 'building', 'architecture', 'urban planning',
  'transportation', 'highway', 'bridge', 'tunnel', 'dam', 'foundation', 'concrete',
  'steel', 'wood', 'composite', 'nanotechnology', 'mems', 'nems', 'quantum',
  'photonics', 'acoustics', 'vibration', 'stress', 'strain', 'elasticity',
  'plasticity', 'fracture', 'fatigue', 'creep', 'tribology', 'corrosion',
  'welding', 'manufacturing', 'cnc', '3d printing', 'additive manufacturing',
  'injection molding', 'casting', 'forging', 'machining', 'lathe', 'mill',
  'grinding', 'drill', 'press', 'stamping', 'laser', 'waterjet', 'plasma',
  
  // ===== Medicine & Health =====
  'medical', 'medicine', 'doctor', 'physician', 'surgeon', 'nurse', 'dentist',
  'pharmacist', 'veterinarian', 'anatomy', 'physiology', 'pathology', 'microbiology',
  'immunology', 'epidemiology', 'oncology', 'cardiology', 'neurology', 'psychiatry',
  'dermatology', 'ophthalmology', 'orthopedics', 'pediatrics', 'gynecology', 'urology',
  'radiology', 'anesthesia', 'emergency', 'critical care', 'primary care', 'family medicine',
  'internal medicine', 'surgery', 'orthopedic surgery', 'neuro surgery', 'cardiac surgery',
  'plastic surgery', 'dental', 'orthodontics', 'periodontics', 'prosthetics', 'implants',
  'pharmacy', 'pharmacology', 'toxicology', 'clinical', 'diagnosis', 'treatment',
  'therapy', 'rehabilitation', 'physical therapy', 'occupational therapy', 'speech therapy',
  'psychology', 'mental health', 'psychotherapy', 'counseling', 'psychiatry',
  'nutrition', 'dietetics', 'public health', 'healthcare', 'hospital', 'clinic',
  'emergency room', 'operating room', 'laboratory', 'imaging', 'mri', 'ct scan',
  'x-ray', 'ultrasound', 'ecg', 'eeg', 'blood test', 'urinalysis', 'biopsy',
  'vaccine', 'immunization', 'antibiotic', 'analgesic', 'antidepressant', 'antihypertensive',
  'antihistamine', 'anticoagulant', 'statins', 'insulin', 'thyroid', 'hormone',
  'menstruation', 'pregnancy', 'childbirth', 'neonatal', 'lactation', 'fertility',
  'contraception', 'menopause', 'andropause', 'aging', 'geriatrics', 'palliative',
  'hospice', 'wellness', 'preventive', 'screening', 'checkup', 'vital signs',
  'blood pressure', 'heart rate', 'respiration', 'temperature', 'oxygen saturation',
  'genetics', 'genomics', 'proteomics', 'metabolomics', 'bioinformatics',
  'pharmaceutical', 'biotechnology', 'bioengineering', 'biomechanics', 'biostatistics',
  'cancer', 'tumor', 'benign', 'malignant', 'metastasis', 'remission', 'prognosis',
  'acute', 'chronic', 'symptom', 'sign', 'syndrome', 'disorder', 'disease',
  'infection', 'inflammation', 'autoimmune', 'allergy', 'asthma', 'diabetes',
  'hypertension', 'stroke', 'heart attack', 'aneurysm', 'arrhythmia', 'palpitation',
  'hygiene', 'sanitation', 'epidemic', 'pandemic', 'quarantine', 'isolation',
  
  // ===== Business & Economics =====
  'business', 'entrepreneur', 'startup', 'entrepreneurship', 'management',
  'leadership', 'strategy', 'marketing', 'sales', 'finance', 'accounting',
  'economics', 'microeconomics', 'macroeconomics', 'market', 'industry',
  'competition', 'monopoly', 'oligopoly', 'demand', 'supply', 'price', 'profit',
  'revenue', 'cost', 'margin', 'investment', 'stock', 'bond', 'dividend',
  'portfolio', 'asset', 'liability', 'equity', 'balance sheet', 'income statement',
  'cash flow', 'budget', 'forecast', 'financial analysis', 'valuation', 'audit',
  'tax', 'corporation', 'llc', 'partnership', 'sole proprietorship', 'franchise',
  'intellectual property', 'patent', 'trademark', 'copyright', 'trade secret',
  'licensing', 'royalty', 'm&a', 'merger', 'acquisition', 'ipo', 'venture capital',
  'angel investor', 'seed funding', 'series a', 'series b', 'growth', 'scaling',
  'operations', 'supply chain', 'logistics', 'warehousing', 'inventory', 'procurement',
  'quality control', 'lean', 'six sigma', 'kaizen', 'kanban', 'sprint', 'backlog',
  'productivity', 'efficiency', 'outsourcing', 'offshoring', 'consulting', 'corporate',
  'governance', 'compliance', 'ethics', 'csr', 'sustainability', 'diversity', 'inclusion',
  'negotiation', 'communication', 'public speaking', 'persuasion', 'influence',
  'team building', 'culture', 'engagement', 'retention', 'recruitment', 'interview',
  'performance review', 'compensation', 'benefits', 'payroll', 'hr', 'human resources',
  'talent management', 'leadership development', 'executive', 'director', 'manager',
  'board', 'stakeholder', 'shareholder', 'customer', 'client', 'partner', 'vendor',
  'b2b', 'b2c', 'd2c', 'saas', 'paas', 'iaas', 'subscription', 'recurring revenue',
  'freemium', 'upsell', 'cross-sell', 'churn', 'retention', 'lifetime value',
  'acquisition cost', 'roi', 'kpi', 'metric', 'dashboard', 'analytics', 'data driven',
  'customer success', 'support', 'service', 'quality', 'satisfaction', 'loyalty',
  'referral', 'affiliate', 'distribution', 'channel', 'network', 'ecosystem',
  'innovation', 'disruption', 'transformation', 'digital', 'ecommerce', 'retail',
  'wholesale', 'manufacturing', 'production', 'service', 'professional', 'consulting',
  'agency', 'freelance', 'gig', 'contract', 'partnership', 'joint venture',
  'alliance', 'cooperation', 'collaboration', 'synergy', 'integration',
  
  // ===== Science & Research =====
  'science', 'research', 'biology', 'chemistry', 'physics', 'astronomy',
  'geology', 'oceanography', 'meteorology', 'ecology', 'evolution', 'genetics',
  'molecular', 'cell', 'organism', 'species', 'ecosystem', 'biodiversity',
  'conservation', 'climate', 'environment', 'sustainability', 'renewable',
  'fossil fuels', 'carbon', 'emissions', 'global warming', 'ozone', 'acids',
  'bases', 'chemical reactions', 'experiments', 'lab', 'microscope', 'telescope',
  'spectrometer', 'chromatography', 'centrifuge', 'electrophoresis', 'pcr',
  'dna', 'rna', 'protein', 'enzyme', 'hormone', 'neurotransmitter', 'synapse',
  'neuron', 'brain', 'cognitive', 'perception', 'consciousness', 'quantum',
  'relativity', 'gravity', 'electromagnetism', 'thermodynamics', 'entropy',
  'chaos theory', 'complexity', 'emergence', 'systems', 'modeling', 'simulation',
  'hypothesis', 'theory', 'law', 'principle', 'experiment', 'observation',
  'measurement', 'data', 'analysis', 'statistics', 'probability', 'correlation',
  'causation', 'peer review', 'publication', 'journal', 'conference', 'collaboration',
  'breakthrough', 'discovery', 'invention', 'innovation', 'technology', 'engineering',
  'mathematics', 'statistics', 'calculus', 'algebra', 'geometry', 'trigonometry',
  'linear algebra', 'differential equations', 'numerical analysis', 'optimization',
  
  // ===== Arts & Humanities =====
  'history', 'ancient', 'civilization', 'medieval', 'renaissance', 'industrial revolution',
  'world war', 'cold war', 'colonialism', 'imperialism', 'nationalism', 'democracy',
  'revolution', 'protest', 'movement', 'culture', 'society', 'philosophy', 'ethics',
  'logic', 'metaphysics', 'epistemology', 'aesthetics', 'existentialism', 'nihilism',
  'stoicism', 'buddhism', 'confucianism', 'religion', 'theology', 'mythology',
  'literature', 'poetry', 'prose', 'novel', 'short story', 'drama', 'comedy',
  'tragedy', 'epic', 'lyric', 'sonnet', 'haiku', 'art', 'painting', 'sculpture',
  'drawing', 'printmaking', 'photography', 'film', 'cinema', 'documentary',
  'animation', 'music', 'classical', 'jazz', 'blues', 'rock', 'pop', 'hiphop',
  'electronic', 'folk', 'world music', 'instrument', 'composition', 'harmony',
  'melody', 'rhythm', 'notation', 'improvisation', 'performance', 'theater',
  'dance', 'ballet', 'contemporary', 'folk dance', 'choreography', 'architecture',
  'gothic', 'baroque', 'neoclassical', 'modern', 'postmodern', 'minimalist',
  'design', 'graphic', 'industrial', 'interior', 'landscape', 'urban', 'typography',
  'calligraphy', 'illustration', 'storytelling', 'narrative', 'myth', 'legend',
  'folklore', 'anthropology', 'archaeology', 'linguistics', 'sociology', 'psychology',
  'political science', 'international relations', 'diplomacy', 'governance',
  'law', 'justice', 'rights', 'freedom', 'equality', 'ethics', 'morality',
  'virtue', 'duty', 'character', 'wisdom', 'knowledge', 'truth', 'beauty',
  'goodness', 'justice', 'courage', 'temperance', 'prudence', 'faith', 'hope',
  'charity', 'grace', 'redemption', 'salvation', 'enlightenment', 'wisdom',
  
  // ===== Languages & Linguistics =====
  'language', 'linguistics', 'grammar', 'vocabulary', 'syntax', 'semantics',
  'phonetics', 'phonology', 'morphology', 'pragmatics', 'discourse', 'dialect',
  'accent', 'translation', 'interpretation', 'bilingual', 'multilingual',
  'language acquisition', 'learning', 'teaching', 'english', 'spanish', 'french',
  'german', 'italian', 'portuguese', 'chinese', 'japanese', 'korean', 'arabic',
  'russian', 'hindi', 'bengali', 'urdu', 'persian', 'turkish', 'dutch', 'swedish',
  'norwegian', 'danish', 'finnish', 'polish', 'czech', 'hungarian', 'greek',
  'latin', 'sanskrit', 'hebrew', 'swahili', 'tagalog', 'vietnamese', 'thai',
  'indonesian', 'malay', 'amharic', 'zulu', 'xhosa', 'afrikaans', 'irish',
  'scottish', 'welsh', 'basque', 'catalan', 'galician', 'romanian', 'bulgarian',
  'serbian', 'croatian', 'slovenian', 'slovak', 'ukrainian', 'belarusian',
  'lithuanian', 'latvian', 'estonian', 'armenian', 'georgian', 'mongolian',
  'nepali', 'sinhala', 'tamil', 'telugu', 'kannada', 'malayalam', 'gujarati',
  'marathi', 'punjabi', 'oriya', 'assamese', 'kashmiri', 'sindhi', 'pashto',
  'dari', 'tajik', 'kyrgyz', 'uzbek', 'turkmen', 'azerbaijani', 'bashkir',
  'tatar', 'chechen', 'ingush', 'abkhaz', 'ossetian', 'moldovan', 'transnistrian',
  'gagauz', 'karakalpak', 'uighur', 'tibetan', 'dzongkha', 'sikkimese', 'lepcha',
  'limbu', 'rai', 'gurung', 'magar', 'tharu', 'maithili', 'bhojpuri', 'awadhi',
  'braj', 'khariboli', 'haryanvi', 'marwari', 'mewari', 'shekhawati', 'dhundhari',
  'harauti', 'mewati', 'bagri', 'bilaspuri', 'kangri', 'kullui', 'mandyali',
  'chambeali', 'pahari', 'dogri', 'kashmiri', 'shina', 'kohistani', 'khowar',
  'kalash', 'nuristani', 'pashayi', 'ormuri', 'parachi', 'sanglechi', 'ishkashimi',
  'wakhi', 'yaghnobi', 'sogdian', 'khwarezmian', 'bactrian', 'khotanese', 'tumshuqese',
  
  // ===== General Learning =====
  'learn', 'study', 'education', 'lesson', 'course', 'tutorial', 'guide',
  'training', 'school', 'college', 'university', 'academy', 'institute',
  'class', 'lecture', 'seminar', 'workshop', 'webinar', 'coaching', 'mentoring',
  'teaching', 'instruction', 'explanation', 'demonstration', 'practice',
  'exercise', 'homework', 'assignment', 'project', 'exam', 'test', 'quiz',
  'certificate', 'diploma', 'degree', 'bachelor', 'master', 'phd', 'doctorate',
  'scholarship', 'fellowship', 'research', 'publication', 'journal', 'paper',
  'thesis', 'dissertation', 'curriculum', 'syllabus', 'lesson plan', 'module',
  'chapter', 'topic', 'concept', 'principle', 'theory', 'model', 'framework',
  'methodology', 'approach', 'strategy', 'technique', 'skill', 'competency',
  'knowledge', 'wisdom', 'understanding', 'comprehension', 'application',
  'analysis', 'synthesis', 'evaluation', 'creation', 'innovation', 'problem solving',
  'critical thinking', 'creative thinking', 'decision making', 'communication',
  'collaboration', 'teamwork', 'leadership', 'management', 'organization',
  'planning', 'time management', 'productivity', 'efficiency', 'effectiveness',
  'improvement', 'growth', 'development', 'advancement', 'progress', 'achievement'
];

// ============================================
// Detect Educational Content (with threshold)
// ============================================
const detectEducational = (keywords, title) => {
  const combinedText = keywords.join(' ') + ' ' + title.toLowerCase();
  
  // Count how many educational keywords match
  let matchCount = 0;
  const matchedWords = [];
  
  educationalKeywords.forEach(word => {
    if (combinedText.includes(word)) {
      matchCount++;
      matchedWords.push(word);
    }
  });
  
  // 🔥 Minimum 3 matches to approve (prevents false positives)
  const isEducational = matchCount >= 3;
  
  console.log('📊 Educational detection:', {
    totalKeywords: keywords.length,
    matches: matchCount,
    matchedWords: matchedWords.slice(0, 10),
    isEducational
  });
  
  return isEducational;
};

// ============================================
// Analyze Video Content
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
// Auto-Review Video
// ============================================
export const autoReviewVideo = async (videoId) => {
  try {
    const analysis = await analyzeVideoContent(videoId);
    
    let status = 'pending';
    if (analysis.isEducational) {
      status = 'approved';
    } else if (analysis.keywords.length < 2) {
      status = 'rejected';
    }

    const { error } = await supabase
      .from('videos')
      .update({
        status: status,
        admin_notes: analysis.isEducational ? 'Auto-approved (educational)' : 'Pending review',
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
// Fetch Video Content
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
// Process Video
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
// Video Categories
// ============================================
const videoCategories = {
  math: {
    keywords: ['math', 'mathematics', 'algebra', 'calculus', 'geometry', 'statistics', 'arithmetic', 'trigonometry', 'linear algebra', 'differential equations'],
    topics: ['equations', 'formulas', 'numbers', 'graphs', 'functions', 'derivatives', 'integrals', 'matrices', 'vectors']
  },
  science: {
    keywords: ['science', 'physics', 'chemistry', 'biology', 'astronomy', 'earth science', 'geology', 'ecology', 'genetics', 'molecular biology', 'quantum physics', 'thermodynamics'],
    topics: ['experiments', 'lab', 'molecules', 'atoms', 'energy', 'force', 'motion', 'cells', 'DNA', 'evolution', 'climate', 'space', 'planets']
  },
  programming: {
    keywords: ['programming', 'coding', 'python', 'javascript', 'react', 'java', 'c++', 'html', 'css', 'node', 'express', 'mongodb', 'sql', 'git', 'github', 'algorithm', 'data structure'],
    topics: ['variables', 'loops', 'functions', 'classes', 'objects', 'arrays', 'strings', 'compiler', 'debugging', 'software', 'web development', 'app development']
  },
  languages: {
    keywords: ['language', 'english', 'arabic', 'french', 'german', 'spanish', 'grammar', 'vocabulary', 'pronunciation', 'speaking', 'writing', 'reading', 'listening', 'translation'],
    topics: ['verb tenses', 'conjugation', 'sentence structure', 'idioms', 'expressions', 'phrases']
  },
  history: {
    keywords: ['history', 'ancient', 'civilization', 'world war', 'historical', 'kingdom', 'empire', 'revolution', 'renaissance', 'medieval', 'modern history'],
    topics: ['wars', 'leaders', 'culture', 'society', 'art', 'architecture', 'inventions', 'timeline']
  },
  chess: {
    keywords: ['chess', 'checkmate', 'grandmaster', 'opening', 'endgame', 'middlegame', 'pawn', 'rook', 'knight', 'bishop', 'queen', 'king'],
    topics: ['strategy', 'tactics', 'defense', 'attack', 'tournament', 'rating', 'analysis']
  },
  rubik: {
    keywords: ['rubik', 'cube', 'pyramid', 'puzzle', 'solve', 'twist', '3x3', '4x4', '5x5', '6x6', 'megaminx', 'speedcube'],
    topics: ['algorithm', 'finger tricks', 'oll', 'pll', 'cfop', 'beginner method', 'speedcubing']
  },
  design: {
    keywords: ['design', 'graphic', 'ui/ux', 'web design', 'photoshop', 'illustrator', 'figma', 'adobe', 'creative', 'typography', 'layout', 'branding', 'logo', 'poster'],
    topics: ['color theory', 'composition', 'visual identity', 'mockup', 'prototyping', 'wireframe']
  },
  business: {
    keywords: ['business', 'marketing', 'entrepreneur', 'finance', 'management', 'leadership', 'strategy', 'sales', 'investment', 'startup', 'economics'],
    topics: ['planning', 'analysis', 'market', 'branding', 'advertising', 'negotiation', 'team building']
  },
  health: {
    keywords: ['health', 'fitness', 'nutrition', 'exercise', 'mental health', 'wellness', 'diet', 'workout', 'yoga', 'meditation', 'anatomy'],
    topics: ['strength', 'cardio', 'flexibility', 'protein', 'vitamins', 'stress', 'sleep', 'meditation']
  }
};

// ============================================
// Detect Video Category
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
    data.topics.forEach(topic => {
      if (text.includes(topic)) score += 3;
    });
    if (score > bestScore) {
      bestScore = score;
      bestCategory = category;
    }
  });

  return bestScore > 0 ? bestCategory : 'general';
};

// ============================================
// Detect Category from Query
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
// Filter Videos by Category
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
// Advanced Search with Categories
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
// Search Videos by Question
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
  {
    keywords: ['math', 'mathematics', 'algebra', 'calculus', 'math tutorials'],
    response: 'Here are some math videos for you:'
  },
  {
    keywords: ['science', 'physics', 'chemistry', 'biology', 'science lessons'],
    response: 'Here are some science videos for you:'
  },
  {
    keywords: ['programming', 'coding', 'python', 'javascript', 'react', 'programming tutorials'],
    response: 'Here are some programming videos for you:'
  },
  {
    keywords: ['chess', 'checkmate', 'grandmaster'],
    response: 'Here are some chess videos for you:'
  },
  {
    keywords: ['rubik', 'cube', 'pyramid', 'solve'],
    response: 'Here are some rubik\'s cube videos for you:'
  },
  {
    keywords: ['history', 'ancient', 'civilization', 'world war'],
    response: 'Here are some history videos for you:'
  },
  {
    keywords: ['design', 'graphic', 'ui/ux', 'photoshop', 'figma'],
    response: 'Here are some design videos for you:'
  },
  {
    keywords: ['business', 'marketing', 'entrepreneur', 'finance'],
    response: 'Here are some business videos for you:'
  },
  {
    keywords: ['health', 'fitness', 'nutrition', 'exercise', 'wellness'],
    response: 'Here are some health videos for you:'
  },
  {
    keywords: ['languages', 'english', 'french', 'german', 'spanish', 'grammar'],
    response: 'Here are some language learning videos for you:'
  }
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
// Get Enhanced Response
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
