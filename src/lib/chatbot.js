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
// 2. تحليل المحتوى التعليمي (للمراجعة التلقائية)
// ============================================
export const analyzeVideoContent = async (videoId) => {
  try {
    const response = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
    );
    const data = await response.json();

    const keywords = extractKeywords(data.title + ' ' + (data.author_name || ''));
    
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
// 3. استخراج الكلمات المفتاحية
// ============================================
const extractKeywords = (text) => {
  const stopWords = ['the', 'and', 'or', 'for', 'to', 'of', 'in', 'on', 'at', 'with', 'without', 'about', 'from', 'by', 'into', 'through', 'during', 'including'];
  const words = text.toLowerCase().match(/[a-z0-9\u0600-\u06FF]+/g) || [];
  return words
    .filter(w => w.length > 2 && !stopWords.includes(w))
    .slice(0, 10);
};

// ============================================
// 4. اكتشاف المحتوى التعليمي
// ============================================
const detectEducational = (keywords, title) => {
  const educationalWords = [
    'learn', 'study', 'education', 'lesson', 'course', 'tutorial',
    'training', 'school', 'college', 'university', 'teacher',
    'math', 'science', 'history', 'physics', 'chemistry', 'biology',
    'programming', 'coding', 'development', 'design', 'engineering',
    'english', 'language', 'grammar', 'writing', 'reading',
    'تعلم', 'درس', 'شرح', 'مدرسة', 'جامعة', 'تعليم', 'تدريس'
  ];
  
  const combinedText = keywords.join(' ') + ' ' + title.toLowerCase();
  return educationalWords.some(word => combinedText.includes(word));
};

// ============================================
// 5. المراجعة التلقائية للفيديو (Auto-Review)
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
        admin_notes: analysis.isEducational ? '✅ Auto-approved (educational)' : '⏳ Pending review',
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
// 6. البحث في قاعدة المعرفة (Knowledge Base)
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
// 7. البحث عن فيديوهات (Semantic Search)
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
// 8. توليد ردود ديناميكية
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
// 9. الدالة الرئيسية للـ Chatbot
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
// 10. تحليل المشاعر (Sentiment Analysis)
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
// 11. اقتراح مواضيع شائعة
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
