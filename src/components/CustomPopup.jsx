import React, { useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaInfoCircle, FaSpinner } from 'react-icons/fa';

const CustomPopup = ({ isOpen, onClose, type, title, message, details, duration = 4000 }) => {
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  const icons = {
    success: <FaCheckCircle className="popup-icon-success" />,
    error: <FaTimesCircle className="popup-icon-error" />,
    info: <FaInfoCircle className="popup-icon-info" />,
    loading: <FaSpinner className="popup-icon-loading fa-spin" />,
  };

  const bgColors = {
    success: 'popup-success',
    error: 'popup-error',
    info: 'popup-info',
    loading: 'popup-loading',
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className={`popup-container ${bgColors[type]}`} onClick={(e) => e.stopPropagation()}>
        <div className="popup-icon-wrapper">
          {icons[type] || icons.info}
        </div>
        <h3 className="popup-title">{title}</h3>
        <p className="popup-message">{message}</p>
        {details && (
          <div className="popup-details">
            {details}
          </div>
        )}
        <button className="popup-btn" onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  );
};

export default CustomPopup;
