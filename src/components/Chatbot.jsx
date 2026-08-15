import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaRobot, FaUser, FaTimes } from 'react-icons/fa';
import { searchVideosByQuestion } from '../lib/chatbot';
import { useNavigate } from 'react-router-dom';

const Chatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          sender: 'bot',
          text: '👋 Hi! I\'m EduBot. Ask me anything and I\'ll find the best educational videos for you!',
        }
      ]);
    }
  }, [isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: input,
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const results = await searchVideosByQuestion(input);
      setSearchResults(results);

      let botResponse = '';
      
      if (results.length === 0) {
        botResponse = '😕 I couldn\'t find any videos matching your question. Try using different keywords!';
      } else {
        const videoList = results.map((v, i) => 
          `${i + 1}. **${v.title || 'Untitled'}** (by ${v.channel_name || 'Unknown'})`
        ).join('\n');
        
        botResponse = `🎬 I found these videos for you:\n\n${videoList}\n\nClick on any video to watch it!`;
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponse,
        videos: results,
      }]);

    } catch (error) {
      console.error('Error in chatbot:', error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: '❌ Sorry, I had trouble processing your request. Please try again.',
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoClick = (video) => {
    const slug = video.title?.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() || 'video';
    navigate(`/video/${video.id}/${slug}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="chatbot-overlay" onClick={onClose}>
      <div className="chatbot-container" onClick={(e) => e.stopPropagation()}>
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <FaRobot className="chatbot-icon" />
            <div>
              <h6>🎓 EduBot</h6>
              <small>Ask me anything!</small>
            </div>
          </div>
          <button className="chatbot-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`chatbot-message ${msg.sender}`}>
              <div className="chatbot-avatar">
                {msg.sender === 'bot' ? <FaRobot /> : <FaUser />}
              </div>
              <div className="chatbot-bubble">
                <div className="chatbot-text">{msg.text}</div>
                {msg.videos && msg.videos.length > 0 && (
                  <div className="chatbot-results">
                    {msg.videos.map((video) => (
                      <div 
                        key={video.id} 
                        className="chatbot-result-item"
                        onClick={() => handleVideoClick(video)}
                      >
                        <img 
                          src={`https://img.youtube.com/vi/${video.youtube_video_id}/mqdefault.jpg`}
                          alt={video.title}
                        />
                        <div className="chatbot-result-info">
                          <strong>{video.title}</strong>
                          <small>{video.channel_name}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="chatbot-message bot">
              <div className="chatbot-avatar"><FaRobot /></div>
              <div className="chatbot-bubble">
                <div className="chatbot-typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <form className="chatbot-input-form" onSubmit={handleSendMessage}>
          <input
            type="text"
            className="chatbot-input"
            placeholder="Ask about any topic..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button type="submit" className="chatbot-send-btn" disabled={loading}>
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
