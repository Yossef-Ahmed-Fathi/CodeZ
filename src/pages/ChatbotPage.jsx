import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaPaperPlane, FaRobot, FaUser } from 'react-icons/fa';
import { getEnhancedResponse, analyzeSentiment } from '../lib/chatbot';

const ChatbotPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    setMessages([
      {
        id: 1,
        sender: 'bot',
        text: 'Hi! I\'m **EduBot**! 🎓\n\nI can help you find educational videos on any topic.\n\nTry asking me:\n• "Show me math tutorials"\n• "Learn Python"\n• "Physics lessons"'
      }
    ]);
    
    setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
  }, []);

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
      const sentiment = analyzeSentiment(input);
      const response = await getEnhancedResponse(input, messages);
      
      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: response.text,
        videos: response.videos || [],
        sentiment: sentiment,
      };
      
      setMessages(prev => [...prev, botMessage]);

      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);

    } catch (error) {
      console.error('Error in chatbot:', error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: 'Sorry, I had trouble processing your request. Please try again.',
        videos: [],
      }]);
      
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoClick = (video) => {
    const slug = video.title?.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() || 'video';
    navigate(`/video/${video.id}/${slug}`);
  };

  return (
    <div className="chatbot-page">
      <div className="chatbot-page-container">
        <button className="chatbot-page-back" onClick={() => navigate('/')}>
          <FaHome /> Back to Home
        </button>

        <div className="chatbot-page-header">
          <h1 className="chatbot-page-title">EduBot</h1>
          <p className="chatbot-page-subtitle">Your personal educational video assistant</p>
        </div>

        <div className="chatbot-page-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`chatbot-page-message ${msg.sender}`}>
              <div className="chatbot-page-avatar">
                {msg.sender === 'bot' ? <FaRobot /> : <FaUser />}
              </div>
              <div className="chatbot-page-bubble">
                <div className="chatbot-page-text">{msg.text}</div>
                {msg.videos && msg.videos.length > 0 && (
                  <div className="chatbot-page-results">
                    {msg.videos.map((video) => (
                      <div 
                        key={video.id} 
                        className="chatbot-page-result-item"
                        onClick={() => handleVideoClick(video)}
                      >
                        <img 
                          src={`https://img.youtube.com/vi/${video.youtube_video_id}/mqdefault.jpg`}
                          alt={video.title}
                        />
                        <div className="chatbot-page-result-info">
                          <strong>{video.title}</strong>
                          <small>{video.channel_name} • {video.views_count || 0} views</small>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {msg.sentiment && msg.sentiment === 'positive' && (
                  <div className="chatbot-page-sentiment positive">Glad you liked that!</div>
                )}
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="chatbot-page-message bot">
              <div className="chatbot-page-avatar"><FaRobot /></div>
              <div className="chatbot-page-bubble">
                <div className="chatbot-page-typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <form className="chatbot-page-input-form" onSubmit={handleSendMessage}>
          <input
            ref={inputRef}
            type="text"
            className="chatbot-page-input"
            placeholder="Ask about any topic..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button type="submit" className="chatbot-page-send-btn" disabled={loading}>
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatbotPage;
