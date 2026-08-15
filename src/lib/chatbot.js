import { supabase } from './supabase';

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

const extractKeywords = (text) => {
  const stopWords = ['the', 'and', 'or', 'for', 'to', 'of', 'in', 'on', 'at'];
  const words = text.toLowerCase().match(/[a-z0-9]+/g) || [];
  return words
    .filter(w => w.length > 3 && !stopWords.includes(w))
    .slice(0, 10);
};

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

export const searchVideosByQuestion = async (question) => {
  try {
    const { data: videos, error } = await supabase
      .from('videos')
      .select('*')
      .eq('status', 'approved');

    if (error) throw error;

    const questionWords = extractKeywords(question);
    console.log('🔍 Question words:', questionWords);

    const ranked = videos.map(video => {
      const videoText = (video.title || '') + ' ' + (video.description || '');
      const videoWords = extractKeywords(videoText);
      
      const matchCount = questionWords.filter(w => videoWords.includes(w)).length;
      const score = matchCount / Math.max(questionWords.length, 1);
      
      return { ...video, score };
    });

    ranked.sort((a, b) => b.score - a.score);

    return ranked.slice(0, 5).filter(v => v.score > 0.1);

  } catch (error) {
    console.error('Error searching videos:', error);
    return [];
  }
};
