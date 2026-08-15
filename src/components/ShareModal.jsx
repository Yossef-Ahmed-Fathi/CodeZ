import React, { useState } from 'react';
import { FaTimes, FaWhatsapp, FaFacebook, FaTwitter, FaTelegram, FaLink, FaCopy, FaCheck, FaShareAlt } from 'react-icons/fa';

const ShareModal = ({ isOpen, onClose, videoId, title }) => {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  if (!isOpen) return null;

  const videoUrl = `${window.location.origin}/video/${videoId}`;
  const shareText = `🎓 Check out this educational video!\n\n${title || 'Educational Video'}\n\nWatch it here: ${videoUrl}`;
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(videoUrl);

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodedText}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
  };

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(videoUrl);
      } else {
        // Fallback method
        const textArea = document.createElement('textarea');
        textArea.value = videoUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setCopyError(false);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy:', err);
      setCopyError(true);
      setTimeout(() => setCopyError(false), 3000);
    }
  };

  const handleNativeShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'CodeZ - Educational Video',
          text: shareText,
          url: videoUrl,
        });
        onClose();
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <div className="share-modal-overlay" onClick={onClose}>
      <div className="share-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="share-modal-header">
          <h5>📤 Share This Video</h5>
          <button className="share-close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {navigator.share && (
          <button className="share-native-btn" onClick={handleNativeShare}>
            <FaShareAlt /> Share Directly
          </button>
        )}

        <div className="share-buttons-grid">
          <button className="share-btn whatsapp" onClick={() => window.open(shareLinks.whatsapp, '_blank')}>
            <FaWhatsapp /> WhatsApp
          </button>
          <button className="share-btn facebook" onClick={() => window.open(shareLinks.facebook, '_blank')}>
            <FaFacebook /> Facebook
          </button>
          <button className="share-btn twitter" onClick={() => window.open(shareLinks.twitter, '_blank')}>
            <FaTwitter /> Twitter
          </button>
          <button className="share-btn telegram" onClick={() => window.open(shareLinks.telegram, '_blank')}>
            <FaTelegram /> Telegram
          </button>
          <button className="share-btn copy" onClick={handleCopyLink}>
            {copied ? <FaCheck /> : <FaCopy />}
            {copied ? 'Copied!' : copyError ? 'Error!' : 'Copy Link'}
          </button>
        </div>

        <div className="share-link-box">
          <FaLink className="share-link-icon" />
          <input
            type="text"
            className="share-link-input"
            value={videoUrl}
            readOnly
            onClick={(e) => e.target.select()}
          />
          <button className="share-link-copy-btn" onClick={handleCopyLink}>
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
