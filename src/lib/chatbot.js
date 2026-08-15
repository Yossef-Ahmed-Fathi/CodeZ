import { supabase } from './supabase';

// ============================================
// 1. جلب محتوى الفيديو بالكامل
// ============================================
export const fetchVideoContent = async (videoId) => {
  try {
    // 1. جلب المعلومات الأساسية من YouTube oEmbed
    const oembedResponse = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
    );
    const oembedData = await oembedResponse.json();

    // 2. جلب الوصف من صفحة الفيديو
    const pageResponse = await fetch(`https://www.youtube.com/watch?v=${videoId}`);
    const html = await pageResponse.text();
    
    // استخراج الوصف
    const descMatch = html.match(/"shortDescription":"([^"]+)"/);
    const description = descMatch ? decodeURIComponent(descMatch[1]) : '';

    // استخراج التصنيفات (Tags)
    const tagsMatch = html.match(/"keywords":"([^"]+)"/);
    const tags = tagsMatch ? decodeURIComponent(tagsMatch[1]).split(',') : [];

    // استخراج التعليقات (من الـ API)
    // ملاحظة: التعليقات تحتاج API key, هنستخدم بيانات افتراضية للتوضيح

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
// 2. استخراج الكلمات المفتاحية الذكية (TF-IDF Style)
// ============================================
export const extractSmartKeywords = (title, description, tags = []) => {
  // 1. دمج النصوص
  const fullText = `${title} ${description} ${tags.join(' ')}`.toLowerCase();
  
  // 2. تقسيم إلى كلمات
  const words = fullText.match(/[a-z0-9\u0600-\u06FF]+/g) || [];
  
  // 3. إزالة الكلمات الشائعة (Stop Words)
  const stopWords = [
    'the', 'and', 'or', 'for', 'to', 'of', 'in', 'on', 'at', 'with', 'without',
    'about', 'from', 'by', 'into', 'through', 'during', 'including', 'using',
    'this', 'that', 'these', 'those', 'then', 'than', 'there', 'their', 'they',
    'what', 'which', 'who', 'whom', 'whose', 'how', 'why', 'where', 'when',
    'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
    'should', 'may', 'might', 'must', 'shall', 'can', 'etc', 'etcetera'
  ];
  
  const filteredWords = words.filter(w => 
    w.length > 2 && !stopWords.includes(w) && !/^[0-9]+$/.test(w)
  );
  
  // 4. حساب التكرار (Frequency)
  const frequencyMap = {};
  filteredWords.forEach(word => {
    frequencyMap[word] = (frequencyMap[word] || 0) + 1;
  });
  
  // 5. فرز حسب الأهمية (تكرار أعلى = أهمية أعلى)
  const sortedWords = Object.entries(frequencyMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([word]) => word);
  
  return sortedWords;
};

// ============================================
// 3. توليد ملخص تلقائي للفيديو
// ============================================
export const generateSummary = (title, description, keywords) => {
  if (!description) return title;
  
  // خذ أول 100 كلمة من الوصف
  const words = description.split(' ');
  const shortDesc = words.slice(0, 30).join(' ') + (words.length > 30 ? '...' : '');
  
  // بناء ملخص من الكلمات المفتاحية
  const keywordStr = keywords.slice(0, 5).join(', ');
  
  return `${shortDesc}\n\n📌 Keywords: ${keywordStr}`;
};

// ============================================
// 4. معالجة الفيديو (استخراج المحتوى والكلمات)
// ============================================
export const processVideo = async (videoId) => {
  try {
    // 1. جلب محتوى الفيديو
    const content = await fetchVideoContent(videoId);
    if (!content) return null;
    
    // 2. استخراج الكلمات المفتاحية الذكية
    const keywords = extractSmartKeywords(
      content.title,
      content.description,
      content.tags
    );
    
    // 3. توليد الملخص
    const summary = generateSummary(content.title, content.description, keywords);
    
    // 4. حفظ في قاعدة البيانات
    const { data, error } = await supabase
      .from('videos')
      .update({
        keywords: keywords,
        summary: summary,
        processed: true,
        updated_at: new Date().toISOString()
      })
      .eq('youtube_video_id', videoId)
      .select()
      .single();
    
    if (error) throw error;
    
    // 5. تحديث جدول الكلمات المفتاحية
    for (const keyword of keywords) {
      const { data: existing } = await supabase
        .from('keyword_index')
        .select('*')
        .eq('keyword', keyword)
        .single();
      
      if (existing) {
        // تحديث التكرار
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
        // إضافة كلمة جديدة
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
// 5. البحث المتقدم باستخدام الكلمات المفتاحية
// ============================================
export const advancedSearch = async (query) => {
  try {
    const queryWords = extractSmartKeywords(query, '');
    
    // البحث في جدول الكلمات المفتاحية
    const { data: keywordMatches, error } = await supabase
      .from('keyword_index')
      .select('*')
      .in('keyword', queryWords);
    
    if (error || !keywordMatches || keywordMatches.length === 0) {
      // لو مفيش تطابق، جرب البحث العادي
      return searchVideosByQuestion(query);
    }
    
    // تجميع video_ids من الكلمات المطابقة
    const videoIdSet = new Set();
    keywordMatches.forEach(kw => {
      (kw.video_ids || []).forEach(id => {
        videoIdSet.add(id);
      });
    });
    
    const videoIds = Array.from(videoIdSet);
    if (videoIds.length === 0) {
      return searchVideosByQuestion(query);
    }
    
    // جلب الفيديوهات
    const { data: videos, error: videosError } = await supabase
      .from('videos')
      .select('*')
      .in('id', videoIds)
      .eq('status', 'approved');
    
    if (videosError) throw videosError;
    
    // ترتيب حسب عدد الكلمات المفتاحية المطابقة
    const ranked = videos.map(video => {
      let matchCount = 0;
      (video.keywords || []).forEach(kw => {
        if (queryWords.includes(kw)) matchCount++;
      });
      return { ...video, score: matchCount };
    });
    
    ranked.sort((a, b) => b.score - a.score);
    
    return ranked.slice(0, 5).filter(v => v.score > 0);
    
  } catch (error) {
    console.error('Error in advanced search:', error);
    return searchVideosByQuestion(query);
  }
};

// ============================================
// 6. تحسين الردود بناءً على الكلمات المفتاحية
// ============================================
export const getEnhancedResponse = async (question, previousMessages = []) => {
  // 1. استخراج الكلمات المفتاحية من السؤال
  const questionWords = extractSmartKeywords(question, '');
  
  // 2. البحث المتقدم
  const videos = await advancedSearch(question);
  
  // 3. قاعدة المعرفة المخصصة
  const knowledgeMatch = searchKnowledgeBase(question);
  
  let response = '';
  let source = '';
  
  if (knowledgeMatch) {
    response = knowledgeMatch.response;
    source = 'knowledge';
  } else if (videos && videos.length > 0) {
    const videoList = videos.map((v, i) => {
      const keywords = (v.keywords || []).slice(0, 3).join(', ');
      return `${i + 1}. **${v.title || 'Untitled'}**\n   📺 ${v.channel_name || 'Unknown'}\n   🔑 ${keywords || 'No keywords'}\n   👁️ ${v.views_count || 0} views`;
    }).join('\n\n');
    
    response = `🔍 I found these videos based on your question:\n\n${videoList}\n\n💡 Click on any video to watch it!`;
    source = 'videos';
  } else {
    response = '🤔 I couldn\'t find anything matching your question. Try using different keywords!\n\n💡 Examples:\n• "Math tutorials"\n• "Learn Python"\n• "Physics lessons"';
    source = 'fallback';
  }
  
  return {
    text: response,
    videos: videos || [],
    source: source,
    keywords: questionWords,
  };
};

// ============================================
// 7. قاعدة المعرفة المخصصة
// ============================================
const knowledgeBase = [
  {
    keywords: ['what is codez', 'about codez', 'platform'],
    response: 'CodeZ is an educational video platform that curates the best learning content from YouTube in a seamless reel format. We use smart AI to analyze and categorize videos!'
  },
  {
    keywords: ['how to add video', 'upload', 'submit video'],
    response: 'To add a video, click the + button on the home page, paste a YouTube URL, and our AI will automatically analyze it for educational quality. The system extracts keywords and generates a summary!'
  },
  {
    keywords: ['how it works', 'algorithm', 'smart'],
    response: 'Our AI analyzes video titles, descriptions, and tags to extract smart keywords. It then builds a knowledge graph to help you find exactly what you\'re looking for!'
  },
  {
    keywords: ['free', 'cost', 'price', 'pay'],
    response: 'Yes! CodeZ is completely free to use. No hidden costs, no subscriptions. Just educational content for everyone.'
  },
  {
    keywords: ['who are you', 'what are you', 'chatbot', 'edubot'],
    response: 'I\'m EduBot! A smart AI assistant that analyzes educational videos and helps you find exactly what you need. I use keyword extraction and semantic search to understand your questions!'
  },
  {
    keywords: ['thanks', 'thank you', 'great', 'awesome'],
    response: 'You\'re welcome! 😊 I\'m constantly learning and improving. Keep asking questions and I\'ll get even smarter! 🚀'
  },
  {
    keywords: ['hello', 'hi', 'hey', 'greetings'],
    response: '👋 Hello! Welcome to CodeZ. I\'m EduBot, your AI educational assistant. I can analyze videos, extract keywords, and help you find exactly what you need!'
  },
];

// ============================================
// 8. البحث في قاعدة المعرفة
// ============================================
const searchKnowledgeBase = (question) => {
  const words = extractSmartKeywords(question, '');
  let bestMatch = null;
  let bestScore = 0;

  knowledgeBase.forEach(item => {
    let score = 0;
    item.keywords.forEach(keyword => {
      const keywordWords = extractSmartKeywords(keyword, '');
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
// 9. البحث العادي (للتوافق)
// ============================================
export const searchVideosByQuestion = async (question) => {
  try {
    const { data: videos, error } = await supabase
      .from('videos')
      .select('*')
      .eq('status', 'approved')
      .limit(20);

    if (error) throw error;
    if (!videos || videos.length === 0) return [];

    const questionWords = extractSmartKeywords(question, '');
    console.log('🔍 Question words:', questionWords);

    const ranked = videos.map(video => {
      const videoText = (video.title || '') + ' ' + (video.description || '') + ' ' + (video.channel_name || '');
      const videoWords = extractSmartKeywords(videoText, '');
      
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
// 10. Extract Smart Keywords (Export)
// ============================================
export { extractSmartKeywords as extractKeywords };

// ============================================
// 11. تحليل المشاعر
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
// 12. اقتراح مواضيع شائعة
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
  ];
};
