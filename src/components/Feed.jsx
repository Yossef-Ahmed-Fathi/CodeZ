import React, { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaCog } from 'react-icons/fa';
import YoutubeReel from './YoutubeReel';
import UploadVideo from './UploadVideo';
import { Spinner } from 'react-bootstrap';

const Feed = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [allVideoIds, setAllVideoIds] = useState([]);
  const [usedVideoIds, setUsedVideoIds] = useState(new Set());
  const [visibleIndex, setVisibleIndex] = useState(0);
  const feedRef = useRef(null);
  const observerRef = useRef(null);
  const isFetchingRef = useRef(false);

  const ADMIN_USER_ID = 'your-admin-user-id-here';

  // 🔥 جلب الفيديوهات العشوائية
  const fetchRandomVideos = useCallback(async (count = 5) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    setLoadingMore(true);

    try {
      // 1. جلب كل IDs الفيديوهات
      let availableIds = allVideoIds;
      if (availableIds.length === 0) {
        const { data, error } = await supabase
          .from('videos')
          .select('id')
          .eq('status', 'approved');

        if (error) throw error;
        availableIds = data.map(v => v.id);
        setAllVideoIds(availableIds);
        console.log('📹 Total videos available:', availableIds.length);
      }

      // 2. فلترة IDs المستخدمة
      const unusedIds = availableIds.filter(id => !usedVideoIds.has(id));
      console.log('📹 Unused videos:', unusedIds.length);

      // 3. لو مفيش فيديوهات جديدة
      if (unusedIds.length === 0) {
        console.log('🔄 All videos watched, resetting...');
        setUsedVideoIds(new Set());
        setHasMore(true);
        setLoadingMore(false);
        isFetchingRef.current = false;
        // جلب تاني بعد الـ reset
        setTimeout(() => fetchRandomVideos(count), 500);
        return;
      }

      // 4. اختيار عشوائي
      const shuffled = unusedIds.sort(() => Math.random() - 0.5);
      const selectedIds = shuffled.slice(0, Math.min(count, shuffled.length));
      console.log('🎲 Selected random IDs:', selectedIds);

      // 5. جلب تفاصيل الفيديوهات
      const { data: videosData, error: videosError } = await supabase
        .from('videos')
        .select('*')
        .in('id', selectedIds);

      if (videosError) throw videosError;

      if (!videosData || videosData.length === 0) {
        setHasMore(false);
        setLoadingMore(false);
        isFetchingRef.current = false;
        return;
      }

      // 6. جلب أسماء المستخدمين
      const userIds = [...new Set(videosData.map(v => v.user_id).filter(id => id))];
      let usersMap = {};
      if (userIds.length > 0) {
        const { data: usersData } = await supabase
          .from('users')
          .select('id, username')
          .in('id', userIds);
        if (usersData) {
          usersMap = usersData.reduce((acc, u) => {
            acc[u.id] = u;
            return acc;
          }, {});
        }
      }

      // 7. دمج البيانات
      const mergedData = videosData.map(video => ({
        ...video,
        users: usersMap[video.user_id] || { username: 'Admin' }
      }));

      // 8. تحديث الحالة
      setVideos(prev => [...prev, ...mergedData]);
      const newIds = new Set(usedVideoIds);
      mergedData.forEach(v => newIds.add(v.id));
      setUsedVideoIds(newIds);

      setHasMore(selectedIds.length === count);

    } catch (error) {
      console.error('❌ Error fetching videos:', error);
      setError('Failed to load videos');
    } finally {
      setLoadingMore(false);
      isFetchingRef.current = false;
    }
  }, [allVideoIds, usedVideoIds]);

  // التحميل الأولي
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await fetchRandomVideos(5);
      setLoading(false);
    };
    init();
  }, []);

  // مراقبة التمرير
  useEffect(() => {
    if (loading || videos.length === 0) return;

    const container = feedRef.current;
    if (!container) return;

    const handleScroll = () => {
      const children = container.children;
      let maxVisible = 0;
      let maxIndex = 0;

      for (let i = 0; i < children.length; i++) {
        const rect = children[i].getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const visibleTop = Math.max(rect.top, containerRect.top);
        const visibleBottom = Math.min(rect.bottom, containerRect.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const totalHeight = rect.height;
        const visiblePercent = totalHeight > 0 ? visibleHeight / totalHeight : 0;

        if (visiblePercent > maxVisible) {
          maxVisible = visiblePercent;
          maxIndex = i;
        }
      }

      if (maxVisible > 0.5) {
        setVisibleIndex(maxIndex);
      }
    };

    container.addEventListener('scroll', handleScroll);
    setTimeout(handleScroll, 100);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [videos, loading]);

  // Infinite Scroll
  useEffect(() => {
    if (loading || loadingMore || !hasMore || videos.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore && hasMore) {
          console.log('🔄 Loading more videos...');
          fetchRandomVideos(3);
        }
      },
      { threshold: 0.5 }
    );

    const lastElement = document.querySelector('.reel-item:last-child');
    if (lastElement) {
      observer.observe(lastElement);
      observerRef.current = observer;
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [videos, loading, loadingMore, hasMore, fetchRandomVideos]);

  const handleVideoEnded = (videoId) => {
    console.log('🎬 Video ended:', videoId);
    setVideos(prev => {
      const filtered = prev.filter(v => v.id !== videoId);
      if (filtered.length < 3) {
        fetchRandomVideos(3);
      }
      return filtered;
    });
  };

  return (
    <div className="App" style={{ background: '#000', height: '100vh' }}>
      <div className="floating-buttons">
        <button
          className="floating-btn floating-btn-admin"
          onClick={() => navigate('/admin-login')}
          title="Admin Panel"
        >
          <FaCog />
        </button>
        <button
          className="floating-btn floating-btn-add"
          onClick={() => setShowUpload(!showUpload)}
          title={showUpload ? 'Close' : 'Add Video'}
        >
          {showUpload ? '✕' : <FaPlus />}
        </button>
      </div>

      {showUpload && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-black bg-opacity-75 d-flex align-items-center justify-content-center p-3 z-2">
          <div className="upload-modal">
            <UploadVideo onUpload={() => {
              setAllVideoIds([]);
              setUsedVideoIds(new Set());
              setVideos([]);
              fetchRandomVideos(5);
              setShowUpload(false);
            }} />
            <button
              className="btn btn-secondary w-100 mt-2"
              onClick={() => setShowUpload(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="position-fixed top-0 start-50 translate-middle-x mt-5 z-3">
          <div className="alert alert-danger">{error}</div>
        </div>
      )}

      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner animation="border" variant="light" size="lg" />
        </div>
      ) : videos.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center vh-100 text-white">
          <div className="text-center p-4">
            <h3>No videos yet</h3>
            <p className="text-muted">Be the first to add one!</p>
          </div>
        </div>
      ) : (
        <div className="feed-container" ref={feedRef}>
          {videos.map((video, index) => (
            <YouTubeReel
              key={video.id + '_' + index}
              video={video}
              onEnded={handleVideoEnded}
              isVisible={index === visibleIndex}
            />
          ))}
          {loadingMore && (
            <div className="d-flex justify-content-center align-items-center p-4 bg-black">
              <Spinner animation="border" variant="light" size="sm" />
              <span className="text-white ms-2 small">Loading more videos...</span>
            </div>
          )}
          {!hasMore && videos.length > 0 && (
            <div className="text-center py-4 text-muted">
              <small>🎬 You've watched all videos! Scroll down to refresh.</small>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Feed;
