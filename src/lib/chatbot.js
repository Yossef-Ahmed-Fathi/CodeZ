import { supabase } from './supabase';

// ============================================
// 1. قاعدة المعرفة المخصصة (Custom Knowledge Base)
// ============================================
const knowledgeBase = [
  {
    keywords: ['what is codez', 'about codez', 'platform'],
    response: 'CodeZ is an educational video platform that curates the best learning content from YouTube in a seamless reel format. We help you discover educational videos easily!'
  },
  {
    keywords: ['how to add video', 'upload', 'submit video'],
    response: 'To add a video, click the + button on the home page, paste a YouTube URL, and our AI will automatically review it for educational quality. Once approved, it will appear in the feed!'
  },
  {
    keywords: ['free', 'cost', 'price', 'pay'],
    response: 'Yes! CodeZ is completely free to use. No hidden costs, no subscriptions. Just educational content for everyone.'
  },
  {
    keywords: ['who are you', 'what are you', 'chatbot', 'edubot'],
    response: 'I\'m EduBot! Your personal educational video assistant. I help you find the best educational videos based on your questions.'
  },
  {
    keywords: ['math', 'mathematics', 'algebra', 'calculus'],
    response: 'We have many math videos! Topics include Algebra, Calculus, Geometry, Statistics, and more. What specific math topic are you interested in?'
  },
  {
    keywords: ['science', 'physics', 'chemistry', 'biology'],
    response: 'We cover Physics, Chemistry, Biology, Astronomy, and Earth Sciences. Which science subject interests you?'
  },
  {
    keywords: ['programming', 'coding', 'python', 'javascript', 'react'],
    response: 'We have programming tutorials for Python, JavaScript, React, HTML/CSS, and many more. What language or framework are you learning?'
  },
  {
    keywords: ['english', 'language', 'grammar', 'writing'],
    response: 'We have English language lessons including grammar, writing, speaking, and vocabulary. What aspect of English are you looking for?'
  },
  {
    keywords: ['history', 'ancient', 'civilization'],
    response: 'Our history videos cover Ancient Civilizations, World Wars, Modern History, and Cultural Studies. What historical period interests you?'
  },
  {
    keywords: ['thanks', 'thank you', 'great', 'awesome'],
    response: 'You\'re welcome! 😊 I\'m always here to help you find great educational content. Keep learning! 🚀'
  },
  {
    keywords: ['hello', 'hi', 'hey', 'greetings'],
    response: '👋 Hello! Welcome to CodeZ. I\'m EduBot, your educational video assistant. How can I help you today?'
  },
  {
    keywords: ['bye', 'goodbye', 'see you'],
    response: '👋 Goodbye! Come back anytime for more educational content. Happy learning! 🎓'
  },
];

// ============================================
// 2. تحليل السؤال واستخراج الكلمات المفتاحية
// ============================================
const extractKeywords = (text) => {
  const stopWords = ['the', 'and', 'or', 'for', 'to', 'of', 'in', 'on', 'at', 'with', 'without', 'about', 'from', 'by', 'into', 'through', 'during', 'including'];
  const words = text.toLowerCase().match(/[a-z0-9\u0600-\u06FF]+/g) || [];
  return words
    .filter(w => w.length > 2 && !stopWords.includes(w))
    .slice(0, 10);
};

// ============================================
// 3. البحث عن فيديوهات (Semantic Search)
// ============================================
export const searchVideosByQuestion = async (question) => {
  try {
    const { data: videos, error } = await supabase
      .from('videos')
      .select('*')
      .eq('status', 'approved')
      .limit(20);

    if (error) throw error;

    if (!videos || videos.length === 0) {
      return [];
    }

    const questionWords = extractKeywords(question);
    console.log('🔍 Question words:', questionWords);

    const ranked = videos.map(video => {
      const videoText = (video.title || '') + ' ' + (video.description || '') + ' ' + (video.channel_name || '');
      const videoWords = extractKeywords(videoText);
      
      // حساب درجة التشابه
      let matchCount = 0;
      let matchScore = 0;
      
      questionWords.forEach(qWord => {
        videoWords.forEach(vWord => {
          if (vWord.includes(qWord) || qWord.includes(vWord)) {
            matchCount++;
            matchScore += Math.max(vWord.length, qWord.length) / 10;
          }
        });
      });
      
      const score = matchCount > 0 ? (matchScore / Math.max(questionWords.length, 1)) * 100 : 0;
      
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
// 4. البحث في قاعدة المعرفة (Knowledge Base)
// ============================================
const searchKnowledgeBase = (question) => {
  const words = extractKeywords(question);
  let bestMatch = null;
  let bestScore = 0;

  knowledgeBase.forEach(item => {
    let score = 0;
    item.keywords.forEach(keyword => {
      const keywordWords = extractKeywords(keyword);
      keywordWords.forEach(kw => {
        words.forEach(word => {
          if (word.includes(kw) || kw.includes(word)) {
            score += 2;
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
// 5. توليد ردود ديناميكية
// ============================================
const generateDynamicResponse = (question, videos) => {
  if (!videos || videos.length === 0) {
    return {
      text: '😕 I couldn\'t find any videos matching your question. Try using different keywords!\n\n💡 Examples:\n• "Math tutorials"\n• "Learn Python"\n• "Physics lessons"',
      videos: []
    };
  }

  const videoList = videos.map((v, i) => 
    `${i + 1}. **${v.title || 'Untitled'}**\n   📺 ${v.channel_name || 'Unknown'}\n   👁️ ${v.views_count || 0} views`
  ).join('\n\n');

  return {
    text: `🎬 I found these videos for you:\n\n${videoList}\n\n💡 Click on any video to watch it!`,
    videos: videos
  };
};

// ============================================
// 6. الدالة الرئيسية للـ Chatbot
// ============================================
export const getChatbotResponse = async (question, previousMessages = []) => {
  // 1. البحث في قاعدة المعرفة المخصصة
  const knowledgeMatch = searchKnowledgeBase(question);
  if (knowledgeMatch) {
    return {
      text: knowledgeMatch.response,
      videos: [],
      source: 'knowledge'
    };
  }

  // 2. البحث في الفيديوهات
  const videos = await searchVideosByQuestion(question);
  
  if (videos && videos.length > 0) {
    const response = generateDynamicResponse(question, videos);
    return {
      text: response.text,
      videos: response.videos,
      source: 'videos'
    };
  }

  // 3. ردود افتراضية
  return {
    text: '🤔 I\'m not sure I understand. Could you rephrase your question?\n\n💡 Try asking:\n• "Show me math videos"\n• "Programming tutorials"\n• "Science lessons"',
    videos: [],
    source: 'fallback'
  };
};

// ============================================
// 7. تحليل المشاعر (Sentiment Analysis) - بسيط
// ============================================
export const analyzeSentiment = (text) => {
  const positiveWords = ['good', 'great', 'awesome', 'excellent', 'amazing', 'love', 'like', 'thanks', 'thank you'];
  const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'dislike', 'useless', 'waste'];
  
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
// 8. اقتراح مواضيع شائعة
// ============================================
export const getPopularTopics = () => {
  return [
    { icon: '📐', name: 'Mathematics', query: 'math tutorials' },
    { icon: '🔬', name: 'Science', query: 'science lessons' },
    { icon: '💻', name: 'Programming', query: 'programming tutorials' },
    { icon: '🌍', name: 'Languages', query: 'learn english' },
    { icon: '📖', name: 'History', query: 'history lessons' },
    { icon: '🎨', name: 'Design', query: 'design tutorials' },
  ];
};
