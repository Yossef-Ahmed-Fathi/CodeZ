import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { supabase } from "../lib/supabase";
import {
  FaHeart,
  FaVolumeUp,
  FaVolumeMute,
  FaEye,
  FaChevronDown,
  FaMusic,
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
} from "react-icons/fa";
import { Spinner } from "react-bootstrap";

const YoutubeReel = forwardRef(({ video, onEnded, isVisible }, ref) => {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const playerInitialized = useRef(false);

  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(video.likes_count || 0);
  const [viewsCount, setViewsCount] = useState(video.views_count || 0);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasViewed, setHasViewed] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [likeAnimation, setLikeAnimation] = useState(false);
  const [lastTap, setLastTap] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayIndicator, setShowPlayIndicator] = useState(false);
  const [playerError, setPlayerError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);

  const username = video.users?.username || "user";

  // Expose handleTogglePlay to parent (Feed)
  useImperativeHandle(ref, () => ({
    handleTogglePlay: () => {
      if (!playerRef.current) return;
      try {
        if (isPlaying) {
          playerRef.current.pauseVideo();
          setIsPlaying(false);
        } else {
          playerRef.current.playVideo();
          setIsPlaying(true);
        }
      } catch (error) {}
    },
  }));

  useEffect(() => {
    if (!playerRef.current || !playerInitialized.current) return;
    if (isVisible) {
      try {
        playerRef.current.playVideo();
        setIsPlaying(true);
      } catch (e) {}
    } else {
      try {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } catch (e) {}
    }
  }, [isVisible]);

  useEffect(() => {
    if (window.YT && window.YT.Player) {
      initPlayer();
      return;
    }

    const loadYouTubeAPI = () => {
      if (document.querySelector('script[src*="youtube.com/iframe_api"]'))
        return;
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.async = true;
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    };

    window.onYouTubeIframeAPIReady = () => {
      initPlayer();
    };

    loadYouTubeAPI();

    const timeoutId = setTimeout(() => {
      if (!playerInitialized.current && window.YT && window.YT.Player) {
        initPlayer();
      }
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
      if (playerRef.current && playerRef.current.destroy) {
        try {
          playerRef.current.destroy();
        } catch (e) {}
        playerRef.current = null;
        playerInitialized.current = false;
      }
    };
  }, [video.youtube_video_id]);

  const initPlayer = () => {
    if (
      playerInitialized.current ||
      !containerRef.current ||
      !window.YT ||
      !window.YT.Player
    )
      return;

    try {
      playerInitialized.current = true;
      playerRef.current = new window.YT.Player(containerRef.current, {
        height: "100%",
        width: "100%",
        videoId: video.youtube_video_id,
        playerVars: {
          autoplay: 0,
          mute: 0,
          loop: 0,
          controls: 0,
          rel: 0,
          modestbranding: 1,
          iv_load_policy: 3,
          disablekb: 1,
          fs: 0,
          showinfo: 0,
          playsinline: 1,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
          onError: onPlayerError,
        },
      });
    } catch (error) {
      console.error("Error creating YouTube Player:", error);
      setPlayerError(true);
      setIsLoading(false);
    }
  };

  const onPlayerReady = (event) => {
    setIsLoading(false);
    setPlayerError(false);
    setDuration(event.target.getDuration());
    if (isVisible) {
      try {
        event.target.playVideo();
        setIsPlaying(true);
      } catch (e) {}
    }
  };

  const onPlayerStateChange = (event) => {
    const state = event.data;
    if (state === 1) {
      setIsPlaying(true);
      setIsLoading(false);
      setPlayerError(false);
    } else if (state === 2) {
      setIsPlaying(false);
    } else if (state === 0) {
      setIsPlaying(false);
      if (onEnded) {
        onEnded(video.id);
      }
    } else if (state === -1) {
      setIsLoading(true);
    }
  };

  const onPlayerError = (error) => {
    console.error("YouTube Player Error:", error);
    setPlayerError(true);
    setIsLoading(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        try {
          setCurrentTime(playerRef.current.getCurrentTime());
        } catch (e) {}
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!video) return;
    const checkLike = async () => {
      try {
        const { data } = await supabase
          .from("likes")
          .select("*")
          .eq("video_id", video.id)
          .single();
        setIsLiked(!!data);
      } catch (error) {}
    };
    checkLike();
  }, [video.id]);

  useEffect(() => {
    if (hasViewed || !isVisible) return;
    const recordView = async () => {
      try {
        await supabase.from("views").insert({ video_id: video.id });
        setViewsCount((prev) => prev + 1);
        setHasViewed(true);
      } catch (error) {}
    };
    const timer = setTimeout(recordView, 3000);
    return () => clearTimeout(timer);
  }, [video.id, hasViewed, isVisible]);

  const handleVideoClick = (e) => {
    e.stopPropagation();
    if (!playerRef.current) return;

    setShowPlayIndicator(true);
    setTimeout(() => setShowPlayIndicator(false), 1500);

    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    } catch (error) {}
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!playerRef.current) return;
    try {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    } catch (error) {}
  };

  const seekForward = (e) => {
    e.stopPropagation();
    if (!playerRef.current) return;
    try {
      const current = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(current + 5, true);
    } catch (error) {}
  };

  const seekBackward = (e) => {
    e.stopPropagation();
    if (!playerRef.current) return;
    try {
      const current = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(current - 5, true);
    } catch (error) {}
  };

  const handleLike = async () => {
    if (isLiked) {
      await supabase.from("likes").delete().eq("video_id", video.id);
      setLikesCount((prev) => prev - 1);
      setIsLiked(false);
    } else {
      await supabase.from("likes").insert({ video_id: video.id });
      setLikesCount((prev) => prev + 1);
      setIsLiked(true);
      setShowFireworks(true);
      setLikeAnimation(true);
      setTimeout(() => {
        setShowFireworks(false);
        setLikeAnimation(false);
      }, 800);
    }
  };

  const handleDoubleTap = (e) => {
    e.preventDefault();
    const now = Date.now();
    const timeSinceLastTap = now - lastTap;
    if (timeSinceLastTap < 300 && !isLiked) {
      setLikesCount((prev) => prev + 1);
      setIsLiked(true);
      setShowFireworks(true);
      setLikeAnimation(true);
      setTimeout(() => {
        setShowFireworks(false);
        setLikeAnimation(false);
      }, 800);
      setLastTap(0);
    } else {
      setLastTap(now);
    }
  };

  const handleRetry = () => {
    setPlayerError(false);
    setIsLoading(true);
    playerInitialized.current = false;
    if (playerRef.current) {
      try {
        playerRef.current.destroy();
      } catch (e) {}
      playerRef.current = null;
    }
    setTimeout(() => {
      if (window.YT && window.YT.Player) {
        initPlayer();
      } else {
        window.onYouTubeIframeAPIReady = () => {
          initPlayer();
        };
      }
    }, 500);
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className="reel-item"
      ref={containerRef}
      onDoubleClick={handleDoubleTap}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div className="reel-click-layer" onClick={handleVideoClick} />

      <div className={`reel-controls ${showControls ? "visible" : ""}`}>
        <div className="controls-top">
          <button
            className="control-btn"
            onClick={seekBackward}
            title="Back 5s"
          >
            <FaStepBackward />
          </button>
          <button className="control-btn play-btn" onClick={handleVideoClick}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button
            className="control-btn"
            onClick={seekForward}
            title="Forward 5s"
          >
            <FaStepForward />
          </button>
        </div>
        <div className="controls-bottom">
          <span className="time-text">{formatTime(currentTime)}</span>
          <div className="progress-bar-custom">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="time-text">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="video-timeline">
        <div className="timeline-bar">
          <div className="timeline-fill" style={{ width: `${progress}%` }} />
          <div className="timeline-dot" style={{ left: `${progress}%` }} />
        </div>
        <div className="timeline-time">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {showPlayIndicator && (
        <div className={`play-indicator ${isPlaying ? "playing" : "paused"}`}>
          {isPlaying ? (
            <svg viewBox="0 0 24 24" width="48" height="48" fill="white">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="48" height="48" fill="white">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </div>
      )}

      {isLoading && !playerError && (
        <div className="loading-overlay">
          <div className="text-center">
            <Spinner animation="border" variant="light" size="lg" />
            <p className="text-white mt-2 small">Loading video...</p>
          </div>
        </div>
      )}

      {playerError && (
        <div className="loading-overlay">
          <div className="text-center text-white">
            <div className="display-1 mb-3">⚠️</div>
            <h5>Failed to load video</h5>
            <p className="text-muted small">Please try again</p>
            <button className="btn btn-light btn-sm mt-2" onClick={handleRetry}>
              Retry
            </button>
          </div>
        </div>
      )}

      {showFireworks && (
        <div className="firework-container">
          <span className="firework-emoji">❤️</span>
          <span className="firework-emoji">🔥</span>
          <span className="firework-emoji">✨</span>
          <span className="firework-emoji">💖</span>
          <span className="firework-emoji">⭐</span>
        </div>
      )}

      <div className="reel-overlay">
        <h5 className="fw-bold">@{username}</h5>
        {video.title && (
          <h6 className="mb-1 text-light" style={{ fontSize: "0.9rem" }}>
            {video.title}
          </h6>
        )}
        {video.description && video.description !== video.title && (
          <p className="mb-0 small opacity-75 text-truncate-2">
            {video.description}
          </p>
        )}
        {video.channel_name && (
          <small className="text-light opacity-50">
            📺 {video.channel_name}
          </small>
        )}
        <div className="music-info">
          <FaMusic className="music-icon" />
          <span className="music-name">
            {video.type === "shorts" ? "Shorts" : "Video"}
          </span>
        </div>
      </div>

      <div className="scroll-indicator">
        <FaChevronDown size={24} />
        <span>Swipe up</span>
      </div>

      <div className="side-actions">
        <div className="action-item" onClick={handleLike}>
          <FaHeart className={isLiked ? "liked" : ""} size={32} />
          <span>{likesCount}</span>
        </div>
        <div className="action-item">
          <FaEye size={26} />
          <span>{viewsCount}</span>
        </div>
        <div className="action-item" onClick={toggleMute}>
          {isMuted ? <FaVolumeMute size={28} /> : <FaVolumeUp size={28} />}
        </div>
      </div>
    </div>
  );
});

YoutubeReel.displayName = "YoutubeReel";

export default YoutubeReel;
