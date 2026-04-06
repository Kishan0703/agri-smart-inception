import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const CHATBOT_BASE_URL =
  process.env.REACT_APP_CHATBOT_API_URL ||
  process.env.REACT_APP_API_BASE_URL2 ||
  "http://localhost:8000";

const normalizeBotReply = (data) => {
  if (!data) return "";
  if (typeof data.reply === "string") return data.reply.trim();
  if (typeof data.response === "string") return data.response.trim();
  if (typeof data.message === "string") return data.message.trim();
  return "";
};

const ChatBotWidget = ({ fullPage = false }) => {
  const [isOpen, setIsOpen] = useState(fullPage); // Start open if fullPage
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I can help you with crops, weather & farming 🌾" },
  ]);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  // ---------- INITIALIZE SPEECH RECOGNITION ----------
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      setIsRecording(false);
    };

    recognition.onerror = (e) => {
      console.error("Speech Error:", e);
      setIsRecording(false);
    };

    recognition.onend = () => setIsRecording(false);

    recognitionRef.current = recognition;
  }, []);

  // ---------- VOICE INPUT ----------
  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert("Voice input not supported on this device.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  // ---------- SEND MESSAGE ----------
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");

    try {
      // First try shared API client (configured in src/api.js)
      const { data } = await API.post("/api/chatbot", { message: userMessage, language: "English" });
      const botReply = normalizeBotReply(data);

      if (!botReply) {
        throw new Error("Empty chatbot response");
      }

      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (err) {
      console.error("Primary chatbot API failed:", err?.message || err);

      try {
        // Fallback path hits the python service directly to avoid baseURL mismatch issues.
        const response = await fetch(`${CHATBOT_BASE_URL}/api/chatbot`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMessage, language: "English" }),
        });

        if (!response.ok) {
          throw new Error(`Chatbot HTTP ${response.status}`);
        }

        const fallbackData = await response.json();
        const fallbackReply = normalizeBotReply(fallbackData);

        if (!fallbackReply) {
          throw new Error("Fallback chatbot returned no reply");
        }

        setMessages((prev) => [...prev, { sender: "bot", text: fallbackReply }]);
      } catch (fallbackErr) {
        console.error("Fallback chatbot API failed:", fallbackErr?.message || fallbackErr);
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Chat service is currently unavailable. Ensure python-backend is running on port 8000 and GEMINI_API_KEY is valid.",
          },
        ]);
      }
    }
  };

  return (
    <>
      {/* Floating Chat Icon - Only show when not fullPage */}
      {!fullPage && (
        <div className="chatbot-button" onClick={() => setIsOpen(!isOpen)}>
          💬
        </div>
      )}

      {/* Chat Window - Always show when fullPage or when isOpen */}
      {(fullPage || isOpen) && (
        <div className={`chatbot-window ${fullPage ? 'fullpage' : ''}`}>
          <div className="chatbot-header">
            <span>Agri ChatBot 🤖</span>
            <button 
              className="close-btn" 
              onClick={() => fullPage ? navigate('/') : setIsOpen(false)}
            >
              ×
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chat-message ${
                  msg.sender === "user" ? "user-msg" : "bot-msg"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            {/* Voice Button */}
            <button
              className={`mic-btn ${isRecording ? "recording" : ""}`}
              onClick={handleVoiceInput}
            >
              🎤
            </button>

            <button onClick={sendMessage}>➤</button>
          </div>
        </div>
      )}

      {/* CSS */}
      <style jsx="true">{`
        .chatbot-button {
          position: fixed;
          bottom: 20px;
          left: 20px;
          background: #03dac6;
          width: 55px;
          height: 55px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          font-size: 24px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          z-index: 999;
        }

        .chatbot-window {
          position: fixed;
          bottom: 90px;
          left: 20px;
          width: 300px;
          height: 380px;
          background: #121212;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
          display: flex;
          flex-direction: column;
          z-index: 1000;
        }

        .chatbot-window.fullpage {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          border-radius: 0;
          bottom: auto;
          right: auto;
        }

        .chatbot-header {
          background: #1f1f1f;
          padding: 10px;
          font-weight: bold;
          display: flex;
          justify-content: space-between;
          color: #fff;
          border-bottom: 1px solid #333;
        }

        .chatbot-messages {
          flex: 1;
          padding: 10px;
          overflow-y: auto;
          color: white;
        }

        .chat-message {
          margin-bottom: 10px;
          padding: 8px 10px;
          border-radius: 8px;
          max-width: 85%;
          white-space: pre-wrap;
        }

        .user-msg {
          background: #03dac6;
          color: black;
          align-self: flex-end;
        }

        .bot-msg {
          background: #333;
          color: white;
          align-self: flex-start;
        }

        .chatbot-input {
          display: flex;
          border-top: 1px solid #333;
        }

        .chatbot-input input {
          flex: 1;
          padding: 10px;
          border: none;
          background: #222;
          color: white;
          outline: none;
        }

        .chatbot-input button {
          width: 50px;
          border: none;
          cursor: pointer;
          font-size: 16px;
        }

        .mic-btn {
          background: #222;
          color: #fff;
        }

        .mic-btn.recording {
          background: red;
          color: white;
          animation: pulse 1s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }

        .close-btn {
          background: transparent;
          border: none;
          color: #fff;
          font-size: 20px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default ChatBotWidget;