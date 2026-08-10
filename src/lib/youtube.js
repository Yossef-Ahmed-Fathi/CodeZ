// استخراج Video ID من أي رابط يوتيوب
export const extractYoutubeId = (url) => {
  if (!url) return null;

  url = url.trim();

  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
    /youtube\.com\/live\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      let id = match[1];
      if (id.includes("?")) {
        id = id.split("?")[0];
      }
      return id;
    }
  }

  return null;
};

// التحقق من الفيديو (عن طريق API)
export const validateYoutubeVideo = async (videoId) => {
  try {
    // استخدم API مجاني عشان تتأكد من وجود الفيديو
    const response = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
    );

    if (response.ok) {
      const data = await response.json();
      return {
        valid: true,
        title: data.title,
        thumbnail: data.thumbnail_url,
      };
    }

    return { valid: false, error: "فيديو غير موجود" };
  } catch (error) {
    return { valid: false, error: "خطأ في التحقق" };
  }
};

// تحويل رابط يوتيوب لـ Embed URL
export const getEmbedUrl = (videoId) => {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&showinfo=0`;
};
