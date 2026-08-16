import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { FaYoutube, FaUpload, FaSpinner } from 'react-icons/fa';
import { autoReviewVideo, processVideo } from '../lib/chatbot';
import CustomPopup from './CustomPopup';

const UploadVideo = ({ onUpload }) => {
  const [youtubeLink, setYoutubeLink] = useState('');
  const [uploading, setUploading] = useState(false);
  const [fetchingInfo, setFetchingInfo] = useState(false);
  const [videoInfo, setVideoInfo] = useState(null);
  const [popup, setPopup] = useState({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
    details: null,
    duration: 8000, // 🔥 زيادة الوقت الافتراضي
  });

  const ADMIN_USER_ID = '681dca92-c909-4db1-8f01-0f9d014e7488';

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

  const showPopup = (type, title, message, details = null, duration = 10000) => {
    setPopup({
      isOpen: true,
      type,
      title,
      message,
      details,
      duration: duration || 10000, // 🔥 10 ثواني افتراضي
    });
  };

  const closePopup = () => {
    setPopup({ ...popup, isOpen: false });
    // 🔥 ريفريش الصفحة بعد إغلاق البوب اب
    if (onUpload) {
      onUpload();
    }
    // 🔥 إعادة تحميل الصفحة بعد 500ms عشان يظهر الفيديو الجديد
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!youtubeLink) {
      showPopup('error', 'Missing URL', 'Please enter a YouTube URL.', null, 5000);
      return;
    }

    const videoId = extractYoutubeId(youtubeLink);
    if (!videoId) {
      showPopup('error', 'Invalid URL', 'Please enter a valid YouTube URL.', null, 5000);
      return;
    }

    const type = youtubeLink.includes('/shorts/') ? 'shorts' : 'video';
    const title = videoInfo?.title || 'Educational Video';
    const description = videoInfo?.description || '';
    const channelName = videoInfo?.author || 'YouTube';

    setUploading(true);
    showPopup('loading', 'Processing...', 'Our AI is analyzing your video.', null, 0);

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
        
        if (status === 'approved' && analysis) {
          const keywords = analysis.keywords || [];
          const keywordList = keywords.slice(0, 8).join(', ');
          
          await supabase
            .from('videos')
            .update({ 
              status: 'approved',
              admin_notes: `✅ Auto-approved: Found ${keywords.length} educational keywords (${keywordList})`
            })
            .eq('id', data[0].id);

          showPopup(
            'success',
            '✅ Video Approved!',
            `Your video has been automatically approved by our AI.`,
            <div>
              <p>🎯 <strong>Educational Keywords Found:</strong></p>
              <p className="keyword-match">{keywords.length > 0 ? keywordList : 'General educational content'}</p>
              <p style={{ marginTop: '8px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
                The video was approved because it matches educational content criteria.
              </p>
            </div>,
            12000 // 🔥 12 ثانية
          );

        } else if (status === 'rejected') {
          await supabase
            .from('videos')
            .update({ 
              status: 'rejected',
              admin_notes: '❌ Auto-rejected: No educational keywords found'
            })
            .eq('id', data[0].id);

          showPopup(
            'error',
            '❌ Video Rejected',
            `Your video was automatically rejected by our AI.`,
            <div>
              <p>🔍 <strong>Reason:</strong> No educational keywords were found.</p>
              <p style={{ marginTop: '8px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
                Try uploading a video with educational content (learning, tutorial, course, etc.)
              </p>
            </div>,
            10000 // 🔥 10 ثانية
          );

        } else {
          await supabase
            .from('videos')
            .update({ 
              status: 'pending',
              admin_notes: '⏳ Pending: Manual review needed (no keywords detected)'
            })
            .eq('id', data[0].id);

          showPopup(
            'info',
            '⏳ Pending Review',
            `Your video is pending manual review by an admin.`,
            <div>
              <p>🔄 <strong>Status:</strong> No educational keywords were automatically detected.</p>
              <p style={{ marginTop: '8px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
                An admin will review it shortly.
              </p>
            </div>,
            10000 // 🔥 10 ثانية
          );
        }

        await processVideo(videoId);
      }

      setYoutubeLink('');
      setVideoInfo(null);

    } catch (error) {
      console.error('Error:', error);
      showPopup('error', 'Error', 'Something went wrong: ' + error.message, null, 8000);
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
    <>
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
                Processing...
              </>
            ) : (
              <>
                <FaUpload /> Add Video
              </>
            )}
          </button>
        </form>
      </div>

      <CustomPopup
        isOpen={popup.isOpen}
        onClose={closePopup}
        type={popup.type}
        title={popup.title}
        message={popup.message}
        details={popup.details}
        duration={popup.duration}
      />
    </>
  );
};

export default UploadVideo;
