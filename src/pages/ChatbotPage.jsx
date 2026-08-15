import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaPaperPlane, FaRobot, FaUser } from 'react-icons/fa';
import { searchVideosByQuestion } from '../lib/chatbot';

const ChatbotPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Welcome message
    setMessages([
      {
        id: 1,
        sender: 'bot',
        text: '👋 Hi! I\'m EduBot. Ask me anything and I\'ll find the best educational videos for you!\n\nExamples:\n• "Math tutorials"\n• "Learn Python"\n• "Physics lessons"'
      }
    ]);
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
  };

  return (
    <div className="chatbot-page">
      <div className="chatbot-page-container">
        <button className="chatbot-page-back" onClick={() => navigate('/')}>
          <FaHome /> Back to Home
        </button>

        <h1 className="chatbot-page-title">🤖 EduBot</h1>
        <p className="chatbot-page-subtitle">Ask me anything about educational videos!</p>

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
