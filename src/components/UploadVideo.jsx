import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { FaYoutube, FaUpload, FaSpinner } from 'react-icons/fa';
import { autoReviewVideo, processVideo } from '../lib/chatbot';

const UploadVideo = ({ onUpload }) => {
  const [youtubeLink, setYoutubeLink] = useState('');
  const [uploading, setUploading] = useState(false);
  const [fetchingInfo, setFetchingInfo] = useState(false);
  const [videoInfo, setVideoInfo] = useState(null);

  const ADMIN_USER_ID = 'your-admin-user-id-here';

  const extractYoutubeId = (url) => {
    if (!url) return null;
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const fetchVideoInfo = async (url) => {
    const videoId = extractYoutubeId(url);
    if (!videoId) {
      alert('Invalid YouTube URL');
      return;
    }

    setFetchingInfo(true);
    try {
      const response = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
      );
      if (!response.ok) throw new Error('Failed to fetch video info');
      const data = await response.json();

      setVideoInfo({
        title: data.title || 'No title',
        author: data.author_name || 'Unknown',
        thumbnail: data.thumbnail_url || '',
        description: '',
        videoId: videoId,
      });
    } catch (error) {
      console.error('Error fetching video info:', error);
      setVideoInfo({
        title: 'Educational Video',
        author: 'YouTube',
        thumbnail: '',
        description: '',
        videoId: videoId,
      });
    } finally {
      setFetchingInfo(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!youtubeLink) {
      alert('Please enter a YouTube URL');
      return;
    }

    const videoId = extractYoutubeId(youtubeLink);
    if (!videoId) {
      alert('Invalid YouTube URL');
      return;
    }

    const type = youtubeLink.includes('/shorts/') ? 'shorts' : 'video';
    const title = videoInfo?.title || 'Educational Video';
    const description = videoInfo?.description || '';
    const channelName = videoInfo?.author || 'YouTube';

    setUploading(true);
    try {
      const { data, error } = await supabase
        .from('videos')
        .insert({
          user_id: ADMIN_USER_ID,
          youtube_video_id: videoId,
          status: 'pending',
          type: type,
          description: description || title,
          title: title,
          channel_name: channelName,
          thumbnail: videoInfo?.thumbnail || '',
          likes_count: 0,
          views_count: 0,
        })
        .select();

      if (error) throw error;

      if (data && data[0]) {
        const { status, analysis } = await autoReviewVideo(videoId);
        
        if (status === 'approved' || status === 'rejected') {
          await supabase
            .from('videos')
            .update({ 
              status: status,
              admin_notes: analysis?.isEducational 
                ? 'Auto-approved (educational content)' 
                : 'Auto-rejected (non-educational)'
            })
            .eq('id', data[0].id);
        }

        const processed = await processVideo(videoId);
        if (processed) {
          console.log('Video processed with keywords:', processed.keywords);
        }
      }

      setYoutubeLink('');
      setVideoInfo(null);
      onUpload?.();
      alert('Video added! Auto-review and keyword extraction completed.');
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleLinkChange = (e) => {
    const url = e.target.value;
    setYoutubeLink(url);
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      fetchVideoInfo(url);
    } else {
      setVideoInfo(null);
    }
  };

  return (
    <div className="bg-dark p-4 rounded-4 text-white">
      <h5 className="text-center mb-3">Add YouTube Video</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">YouTube URL</label>
          <div className="input-group">
            <span className="input-group-text bg-secondary bg-opacity-25 border-0 text-white">
              <FaYoutube className="text-danger" />
            </span>
            <input
              type="url"
              className="form-control bg-secondary bg-opacity-25 text-white border-0"
              placeholder="https://www.youtube.com/watch?v=... or /shorts/..."
              value={youtubeLink}
              onChange={handleLinkChange}
              required
            />
          </div>
          <small className="text-muted d-block mt-1">
            Video info will be fetched automatically from YouTube
          </small>
        </div>

        {fetchingInfo && (
          <div className="mb-3 text-center py-2">
            <FaSpinner className="fa-spin me-2" />
            <span className="text-muted">Fetching video info...</span>
          </div>
        )}

        {videoInfo && !fetchingInfo && (
          <div className="mb-3 bg-secondary bg-opacity-10 p-3 rounded-3">
            <div className="d-flex gap-3">
              {videoInfo.thumbnail && (
                <img
                  src={videoInfo.thumbnail}
                  alt="Thumbnail"
                  className="rounded"
                  style={{ width: '80px', height: '60px', objectFit: 'cover' }}
                />
              )}
              <div className="flex-grow-1">
                <h6 className="mb-1 text-truncate">{videoInfo.title}</h6>
                <small className="text-muted"> {videoInfo.author}</small>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary w-100 py-2 d-flex align-items-center justify-content-center gap-2"
          disabled={uploading || fetchingInfo}
        >
          {uploading ? (
            <>
              <span className="spinner-border spinner-border-sm" />
              Adding...
            </>
          ) : (
            <>
              <FaUpload /> Add Video
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default UploadVideo;
