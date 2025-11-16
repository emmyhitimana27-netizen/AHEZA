// components/HelpDeskWidget.jsx
import React, { useState, useEffect, useRef } from 'react';

const HelpDeskWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const chatRef = useRef(null);

  // ---------- 1. Create initial message only once ----------
  useEffect(() => {
    const now = new Date();
    setMessages([
      {
        id: 1,
        type: 'agent',
        content:
          "Hello! I'm your sleep expert. How can I help you find the perfect mattress?",
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }, []);

  // ---------- Quick questions ----------
  const quickQuestions = [
    "What's the difference between memory foam and hybrid?",
    'Which mattress is best for back pain?',
    'What are your delivery options?',
    'Do you offer financing?',
  ];

  // ---------- Canned responses ----------
  const agentResponses = {
    'Memory Foam vs Hybrid':
      'Memory foam provides excellent pressure relief and motion isolation, perfect for couples. Hybrid combines foam comfort with spring support, offering better airflow and responsiveness. Which sleep position do you typically prefer?',
    'Best for Back Pain':
      'For back pain, we recommend our Premium Hybrid Elite with zoned support that provides extra reinforcement for your lumbar region. The Luxury Memory Foam is also great for pressure point relief.',
    'Delivery Options':
      'We offer free standard delivery within 3-5 business days. Express delivery (1-2 days) is available for $49. All mattresses come compressed in a box for easy setup.',
    'Financing Options':
      'We offer 0% financing for 12 months through our partner lenders. You can apply during checkout - instant approval decisions in most cases.',
    default:
      'Thank you for your question! Our sleep experts are here to help you find the perfect mattress. Could you tell me more about your sleep preferences or any specific concerns you have?',
  };

  // ---------- Helper: add a message ----------
  const addMessage = (content, type = 'user') => {
    const now = new Date();
    const newMsg = {
      id: Date.now(),
      type,
      content,
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, newMsg]);

    // scroll to bottom
    setTimeout(() => {
      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }, 0);
  };

  // ---------- Quick-question handler ----------
  const handleQuickQuestion = (question) => {
    addMessage(question, 'user');

    setTimeout(() => {
      let response = agentResponses.default;
      Object.keys(agentResponses).forEach((key) => {
        if (question.toLowerCase().includes(key.toLowerCase())) {
          response = agentResponses[key];
        }
      });
      addMessage(response, 'agent');
    }, 1000);
  };

  // ---------- Send custom message ----------
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    addMessage(inputMessage, 'user');
    const userText = inputMessage;
    setInputMessage('');

    setTimeout(() => {
      let response = agentResponses.default;
      Object.keys(agentResponses).forEach((key) => {
        if (userText.toLowerCase().includes(key.toLowerCase())) {
          response = agentResponses[key];
        }
      });
      addMessage(response, 'agent');
    }, 1000);
  };

  // ---------- Enter key ----------
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="help-desk-widget">
      {/* Toggle button */}
      <button
        className="help-desk-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open help desk"
      >
        <i className="fa-solid fa-headset" />
      </button>

      {/* Chat panel */}
      <div className={`help-desk-content ${isOpen ? 'active' : ''}`}>
        <div className="help-desk-header">
          <h4>Sleep Expert Support</h4>
          <button
            className="help-desk-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="help-desk-body">
          {/* Messages */}
          <div className="chat-messages" ref={chatRef}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${msg.type}-message`}
              >
                <div className="message-content">
                  <p>{msg.content}</p>
                  <span className="message-time">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick questions */}
          <div className="quick-questions">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                className="quick-question"
                onClick={() => handleQuickQuestion(q)}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="chat-input-container">
            <input
              type="text"
              className="chat-input"
              placeholder="Type your question..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="chat-send"
              onClick={handleSendMessage}
              aria-label="Send"
            >
              <i className="fa-solid fa-paper-plane-top" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpDeskWidget;