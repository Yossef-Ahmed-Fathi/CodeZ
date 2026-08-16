import { supabase } from './supabase';

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
// Detect Educational Content
// ============================================
const detectEducational = (keywords, title) => {
  const educationalWords = [
    'learn', 'study', 'education', 'lesson', 'course', 'tutorial',
    'training', 'school', 'college', 'university', 'teacher',
    'math', 'science', 'history', 'physics', 'chemistry', 'biology',
    'programming', 'coding', 'development', 'design', 'engineering',
    'english', 'language', 'grammar', 'writing', 'reading'
  ];
  
  const combinedText = keywords.join(' ') + ' ' + title.toLowerCase();
  return educationalWords.some(word => combinedText.includes(word));
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

// ============================================
// Get Popular Topics
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
