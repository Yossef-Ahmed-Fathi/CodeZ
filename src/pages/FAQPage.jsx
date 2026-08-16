import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const FAQPage = () => {
  const navigate = useNavigate();

   const faqs = [
    { q: 'What is BrainThrive?', a: 'BrainThrive is an educational video platform that curates the best learning content from YouTube in a seamless reel format.' },
    { q: 'How do I add a video?', a: 'Click the + button on the home page and paste a YouTube URL. The system will auto-review it for educational quality.' },
    { q: 'Is BrainThrive free?', a: 'Yes, BrainThrive is completely free to use.' },
    { q: 'How does the chatbot work?', a: 'Ask any question, and EduBot will find relevant educational videos for you.' },
    { q: 'Can I share videos?', a: 'Yes! Each video has a unique URL you can share with anyone.' },
    { q: 'How are videos reviewed?', a: 'Videos are automatically reviewed using AI to detect educational content. Admins can also manually review them.' },
    { q: 'What types of videos are available?', a: 'We have videos in Math, Science, Programming, Languages, History, and more.' },
  ];

  return (
    <div className="faq-page">
      <div className="faq-page-container">
        <button className="faq-page-back" onClick={() => navigate('/')}>
          <FaHome /> Back to Home
        </button>

        <h1 className="faq-page-title">❓ Frequently Asked Questions</h1>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item-card">
              <h3 className="faq-item-q">{faq.q}</h3>
              <p className="faq-item-a">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
