import React, { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaCog } from 'react-icons/fa';
import YoutubeReel from './YoutubeReel';
import UploadVideo from './UploadVideo';
import { Spinner } from 'react-bootstrap';

const Feed = () => {
  const navigate = useNavigate();
  const [allVideos, setAllVideos] = useState([]);
  const [displayedVideos, setDisplayedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [page, setPage] = useState(0); // 🔥 تبدأ من 0
  const feedRef = useRef(null);
  const observerRef = useRef(null);
  const videoRefs = useRef([]);
  
  const ITEMS_PER_PAGE = 5;

  const ADMIN_USER_ID = '681dca92-c909-4db1-8f01-0f9d014e7488';

  const fetchAllVideos = useCallback(async () => {
    setLoading(true);
    try {
      const { data: videosData, error: videosError } = await supabase
        .from('videos')
        .select('*')
        .eq('status', 'approved');

      if (videosError) throw videosError;

      if (!videosData || videosData.length === 0) {
        setAllVideos([]);
        setDisplayedVideos([]);
        setHasMore(false);
        setLoading(false);
        return;
      }

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

      const mergedData = videosData.map(video => ({
        ...video,
        users: usersMap[video.user_id] || { username: 'Admin' }
      }));

      const shuffled = mergedData.sort(() => Math.random() - 0.5);
      
      setAllVideos(shuffled);
      
      // 🔥 العرض الأول (الصفحة 0)
      const initialBatch = shuffled.slice(0, ITEMS_PER_PAGE);
      setDisplayedVideos(initialBatch);
      setPage(0);
      setHasMore(shuffled.length > ITEMS_PER_PAGE);

      console.log('📹 Total videos:', shuffled.length);
      console.log('📹 Initial batch:', initialBatch.length);
      console.log('📹 Has more:', shuffled.length > ITEMS_PER_PAGE);

    } catch (error) {
      console.error('Error fetching videos:', error);
      setError('Failed to load videos');
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔥 تحميل الدفعة التالية (مصلح)
  const loadMoreVideos = useCallback(() => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    
    const nextPage = page + 1;
    const startIndex = nextPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const nextBatch = allVideos.slice(startIndex, endIndex);
    
    console.log('📹 Loading more - Page:', nextPage);
    console.log('📹 Start:', startIndex, 'End:', endIndex);
    console.log('📹 Batch size:', nextBatch.length);
    console.log('📹 All videos:', allVideos.length);
    
    if (nextBatch.length === 0) {
      setHasMore(false);
      setLoadingMore(false);
      return;
    }
    
    setDisplayedVideos(prev => [...prev, ...nextBatch]);
    setPage(nextPage);
    setHasMore(endIndex < allVideos.length);
    setLoadingMore(false);
  }, [allVideos, page, hasMore, loadingMore]);

  // التحميل الأولي
  useEffect(() => {
    fetchAllVideos();
  }, []);

  // 🔥 Infinite Scroll Observer
  useEffect(() => {
    if (loading || loadingMore || !hasMore || displayedVideos.length === 0) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore && hasMore) {
          console.log('🔄 Triggering load more...');
          loadMoreVideos();
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
  }, [displayedVideos, loading, loadingMore, hasMore, loadMoreVideos]);

  // ===== Keyboard Controls =====
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
      }

      if (e.key === ' ') {
        const currentVideo = videoRefs.current[visibleIndex];
        if (currentVideo) {
          currentVideo.handleTogglePlay();
        }
        return;
      }

      if (e.key === 'ArrowDown') {
        const nextIndex = Math.min(visibleIndex + 1, displayedVideos.length - 1);
        if (nextIndex !== visibleIndex) {
          scrollToIndex(nextIndex);
        }
        return;
      }

      if (e.key === 'ArrowUp') {
        const prevIndex = Math.max(visibleIndex - 1, 0);
        if (prevIndex !== visibleIndex) {
          scrollToIndex(prevIndex);
        }
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [visibleIndex, displayedVideos.length]);

  const scrollToIndex = (index) => {
    const container = feedRef.current;
    if (!container) return;

    const targetElement = container.children[index];
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      setVisibleIndex(index);
    }
  };

  // ===== مراقبة الفيديو الظاهر =====
  useEffect(() => {
    if (loading || displayedVideos.length === 0) return;

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
  }, [displayedVideos, loading]);

  const handleVideoEnded = (videoId) => {
    const nextIndex = Math.min(visibleIndex + 1, displayedVideos.length - 1);
    if (nextIndex !== visibleIndex) {
      setTimeout(() => scrollToIndex(nextIndex), 500);
    }
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
              fetchAllVideos();
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
      ) : displayedVideos.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center vh-100 text-white">
          <div className="text-center p-4">
            <h3>No videos yet</h3>
            <p className="text-muted">Be the first to add one!</p>
          </div>
        </div>
      ) : (
        <div className="feed-container" ref={feedRef}>
          {displayedVideos.map((video, index) => (
            <YoutubeReel
              key={video.id + '_' + index}
              video={video}
              onEnded={handleVideoEnded}
              isVisible={index === visibleIndex}
              ref={(el) => (videoRefs.current[index] = el)}
            />
          ))}
          {loadingMore && (
            <div className="d-flex justify-content-center align-items-center p-4 bg-black">
              <Spinner animation="border" variant="light" size="sm" />
              <span className="text-white ms-2 small">Loading more videos...</span>
            </div>
          )}
          {!hasMore && displayedVideos.length > 0 && (
            <div className="text-center py-4 text-muted">
              <small>🎬 You've watched all videos!</small>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Feed;
