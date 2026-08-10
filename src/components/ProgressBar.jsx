import React, { useState, useEffect, useRef } from "react";

const ProgressBar = ({ videoRef, isPlaying }) => {
  const [progress, setProgress] = useState(0);
  const animationRef = useRef();

  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;

    const updateProgress = () => {
      if (video.duration) {
        const percent = (video.currentTime / video.duration) * 100;
        setProgress(percent);
      }
      animationRef.current = requestAnimationFrame(updateProgress);
    };

    if (isPlaying) {
      animationRef.current = requestAnimationFrame(updateProgress);
    } else {
      cancelAnimationFrame(animationRef.current);
    }

    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying, videoRef]);

  const handleProgressClick = (e) => {
    const video = videoRef?.current;
    if (!video) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    video.currentTime = percent * video.duration;
  };

  return (
    <div className="progress-bar-container" onClick={handleProgressClick}>
      <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ProgressBar;
