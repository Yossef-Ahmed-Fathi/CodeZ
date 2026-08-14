import { supabase } from './supabase';

// ============================================
// 1. تحليل محتوى الفيديو باستخدام YouTube oEmbed
// ============================================
export const analyzeVideoContent = async (videoId) => {
  try {
    // 1. جلب معلومات الفيديو
    const response = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
    );
    const data = await response.json();

    // 2. استخراج الكلمات المفتاحية من الوصف
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
// 2. استخراج الكلمات المفتاحية (بسيطة)
// ============================================
const extractKeywords = (text) => {
  const stopWords = ['the', 'and', 'or', 'for', 'to', 'of', 'in', 'on', 'at'];
  const words = text.toLowerCase().match(/[a-z\u0600-\u06FF]+/g) || [];
  return words
    .filter(w => w.length > 3 && !stopWords.includes(w))
    .slice(0, 10);
};

// ============================================
// 3. اكتشاف إذا كان المحتوى تعليمي
// ============================================
const detectEducational = (keywords, title) => {
  const educationalWords = [
    'تعلم', 'درس', 'شرح', 'مدرسة', 'جامعة', 'تعليم', 'تدريس',
    'learn', 'study', 'education', 'lesson', 'course', 'tutorial',
    'training', 'school', 'college', 'university', 'teacher',
    'math', 'science', 'history', 'physics', 'chemistry', 'biology',
    'programming', 'coding', 'development', 'design', 'engineering'
  ];
  
  const combinedText = keywords.join(' ') + ' ' + title.toLowerCase();
  return educationalWords.some(word => combinedText.includes(word));
};

// ============================================
// 4. مراجعة الفيديو تلقائياً (في الخلفية)
// ============================================
export const autoReviewVideo = async (videoId) => {
  try {
    const analysis = await analyzeVideoContent(videoId);
    
    // 5. تحديد الحالة تلقائياً
    let status = 'pending';
    if (analysis.isEducational) {
      status = 'approved';
    } else if (analysis.keywords.length < 2) {
      status = 'rejected';
    }

    // 6. تحديث قاعدة البيانات
    const { error } = await supabase
      .from('videos')
      .update({
        status: status,
        admin_notes: analysis.isEducational ? '✅ Auto-approved (educational)' : '⏳ Pending review',
        keywords: analysis.keywords,
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
// 7. البحث عن فيديوهات حسب السؤال (Semantic Search)
// ============================================
export const searchVideosByQuestion = async (question) => {
  try {
    // 1. جلب كل الفيديوهات الموافق عليها
    const { data: videos, error } = await supabase
      .from('videos')
      .select('*')
      .eq('status', 'approved');

    if (error) throw error;

    // 2. تحليل السؤال
    const questionWords = extractKeywords(question);
    console.log('🔍 Question words:', questionWords);

    // 3. ترتيب الفيديوهات حسب التشابه
    const ranked = videos.map(video => {
      const videoText = (video.title || '') + ' ' + (video.description || '');
      const videoWords = extractKeywords(videoText);
      
      // حساب عدد الكلمات المشتركة
      const matchCount = questionWords.filter(w => videoWords.includes(w)).length;
      const score = matchCount / Math.max(questionWords.length, 1);
      
      return { ...video, score };
    });

    // 4. ترتيب تنازلي حسب النتيجة
    ranked.sort((a, b) => b.score - a.score);

    // 5. إرجاع أفضل 5 فيديوهات
    return ranked.slice(0, 5).filter(v => v.score > 0.1);

  } catch (error) {
    console.error('Error searching videos:', error);
    return [];
  }
};
