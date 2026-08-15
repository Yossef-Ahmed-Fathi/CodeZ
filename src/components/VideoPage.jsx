import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { FaArrowLeft } from 'react-icons/fa';
import { Spinner } from 'react-bootstrap';

const VideoPage = () => {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const { data, error } = await supabase
          .from('videos')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        if (!data) {
          setError('Video not found');
          return;
        }

        const correctSlug = data.title?.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() || 'video';
        if (slug !== correctSlug) {
          navigate(`/video/${data.id}/${correctSlug}`, { replace: true });
        }

        setVideo(data);
      } catch (error) {
        console.error('Error fetching video:', error);
        setError('Failed to load video');
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id, slug, navigate]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-black">
        <Spinner animation="border" variant="light" size="lg" />
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-black text-white">
        <div className="text-center">
          <h3>❌ {error || 'Video not found'}</h3>
          <button className="btn btn-light mt-3" onClick={() => navigate('/')}>
            <FaArrowLeft /> Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="video-page-container">
      <button className="video-page-back" onClick={() => navigate('/')}>
        <FaArrowLeft /> Back to Reels
      </button>

      <div className="video-page-player">
        <iframe
          src={`https://www.youtube.com/embed/${video.youtube_video_id}?autoplay=1&rel=0`}
          className="video-page-iframe"
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          title={video.title}
        />
      </div>

      <div className="video-page-info">
        <h2>{video.title || 'Untitled'}</h2>
        <p>{video.description || 'No description available'}</p>
        <div className="video-page-meta">
          <span>📺 {video.channel_name || 'Unknown'}</span>
          <span>❤️ {video.likes_count || 0} likes</span>
          <span>👁️ {video.views_count || 0} views</span>
          <span>{video.type === 'shorts' ? '📱 Shorts' : '🎬 Video'}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
