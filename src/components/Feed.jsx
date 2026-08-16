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
  const [showUpload, setShowUpload] = useState(false);
  const [error, setError] = useState('');
  const [visibleIndex, setVisibleIndex] = useState(0);
  const feedRef = useRef(null);
  const videoRefs = useRef([]);

  const fetchAllVideos = useCallback(async () => {
    setLoading(true);
    try {
      const { data: videosData, error: videosError } = await supabase
        .from('videos')
        .select('*')
        .eq('status', 'approved');

      if (videosError) throw videosError;

      if (!videosData || videosData.length === 0) {
        setVideos([]);
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
      setVideos(shuffled);
    } catch (error) {
      console.error('Error fetching videos:', error);
      setError('Failed to load videos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllVideos();
  }, []);

  // Keyboard Controls
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
        const nextIndex = Math.min(visibleIndex + 1, videos.length - 1);
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
  }, [visibleIndex, videos.length]);

  const scrollToIndex = (index) => {
    const container = feedRef.current;
    if (!container) return;
    const targetElement = container.children[index];
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      setVisibleIndex(index);
    }
  };

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

  const handleVideoEnded = (videoId) => {
    const nextIndex = Math.min(visibleIndex + 1, videos.length - 1);
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
              setShowUpload(false);
              // سيتعامل مع الـ refresh من الـ popup نفسه
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
            <YoutubeReel
              key={video.id + '_' + index}
              video={video}
              onEnded={handleVideoEnded}
              isVisible={index === visibleIndex}
              ref={(el) => (videoRefs.current[index] = el)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;
