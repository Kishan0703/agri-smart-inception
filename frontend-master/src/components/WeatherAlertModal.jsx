import React, { useState } from "react";
import axios from "axios";

const WEATHER_API = process.env.REACT_APP_WEATHER_ALERT_API || "http://localhost:5000";

const WeatherAlertModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Delhi");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null); // 'success' or 'error'

  const subscribe = async () => {
    if (!email || !email.includes('@')) {
      setMessage("Please enter a valid email address");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage(null);
    
    try {
      await axios.post(`${WEATHER_API}/subscribe-weather-alert`, {
        email,
        city: city || "Delhi",
      });

      setMessage("Subscription successful! You will receive weather alerts via email.");
      setMessageType("success");
      setEmail(""); // Clear form on success
    } catch (err) {
      setMessage("Subscription failed. Please try again later.");
      setMessageType("error");
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      subscribe();
    }
  };

  // Inline Styles
  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.5)",
      backdropFilter: "blur(4px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 2000,
      padding: "1rem",
      animation: "fadeIn 0.3s ease-out",
    },
    
    box: {
      background: "linear-gradient(135deg, #ffffff 0%, #f8fff9 100%)",
      padding: "2rem",
      borderRadius: "1.5rem",
      width: "100%",
      maxWidth: "440px",
      boxShadow: "0 20px 60px rgba(39, 174, 96, 0.15), 0 5px 15px rgba(0, 0, 0, 0.05)",
      border: "1px solid rgba(39, 174, 96, 0.2)",
      position: "relative",
      overflow: "hidden",
      animation: "slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    
    boxBg: {
      position: "absolute",
      top: 0,
      right: 0,
      width: "120px",
      height: "120px",
      background: "linear-gradient(135deg, rgba(39, 174, 96, 0.1) 0%, rgba(46, 204, 113, 0.05) 100%)",
      borderRadius: "0 0 0 80px",
      zIndex: 0,
    },
    
    closeButton: {
      position: "absolute",
      top: "1rem",
      right: "1rem",
      background: "rgba(39, 174, 96, 0.1)",
      color: "#27ae60",
      border: "1px solid rgba(39, 174, 96, 0.2)",
      width: "2rem",
      height: "2rem",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontSize: "1.25rem",
      transition: "all 0.3s ease",
      zIndex: 1,
    },
    
    header: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      marginBottom: "0.75rem",
      position: "relative",
      zIndex: 1,
    },
    
    headerIcon: {
      fontSize: "2rem",
      animation: "float 3s ease-in-out infinite",
    },
    
    title: {
      fontSize: "1.5rem",
      fontWeight: 700,
      color: "#1a472a",
      margin: 0,
      background: "linear-gradient(135deg, #27ae60 0%, #2ecc71 50%, #1e8449 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    
    subtitle: {
      fontSize: "0.875rem",
      color: "#2d6a4f",
      marginBottom: "1.5rem",
      lineHeight: 1.5,
      position: "relative",
      zIndex: 1,
    },
    
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1.25rem",
      position: "relative",
      zIndex: 1,
    },
    
    inputGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
    
    label: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "0.875rem",
      fontWeight: 600,
      color: "#1a472a",
    },
    
    labelIcon: {
      fontSize: "1rem",
      color: "#27ae60",
    },
    
    optional: {
      fontSize: "0.75rem",
      color: "#27ae60",
      background: "rgba(39, 174, 96, 0.1)",
      padding: "0.125rem 0.5rem",
      borderRadius: "0.75rem",
      marginLeft: "0.5rem",
    },
    
    inputWrapper: {
      position: "relative",
    },
    
    inputIcon: {
      position: "absolute",
      left: "1rem",
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "1.125rem",
      color: "#2d6a4f",
      pointerEvents: "none",
    },
    
    input: {
      width: "100%",
      padding: "0.875rem 1rem 0.875rem 3rem",
      background: "#ffffff",
      border: "2px solid #e8f5e9",
      borderRadius: "0.75rem",
      fontSize: "0.875rem",
      fontWeight: 500,
      color: "#1a472a",
      transition: "all 0.3s ease",
      boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.04)",
    },
    
    inputFocus: {
      borderColor: "#27ae60",
      boxShadow: "0 0 0 4px rgba(39, 174, 96, 0.15), inset 0 2px 4px rgba(0, 0, 0, 0.04)",
      outline: "none",
    },
    
    inputHover: {
      borderColor: "#bdc3c7",
    },
    
    hint: {
      fontSize: "0.75rem",
      color: "#2d6a4f",
      marginTop: "0.25rem",
      paddingLeft: "0.5rem",
      fontWeight: 500,
      opacity: 0.8,
    },
    
    submitButton: {
      padding: "1rem 1.5rem",
      background: "linear-gradient(135deg, #27ae60 0%, #2ecc71 50%, #1e8449 100%)",
      color: "white",
      border: "none",
      borderRadius: "0.75rem",
      fontSize: "1rem",
      fontWeight: 700,
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.75rem",
      marginTop: "0.5rem",
      boxShadow: "0 8px 25px rgba(39, 174, 96, 0.3), 0 4px 10px rgba(0, 0, 0, 0.1)",
      position: "relative",
      overflow: "hidden",
    },
    
    submitButtonHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 12px 35px rgba(39, 174, 96, 0.4), 0 6px 15px rgba(0, 0, 0, 0.15)",
    },
    
    submitButtonActive: {
      transform: "translateY(1px)",
      boxShadow: "0 5px 20px rgba(39, 174, 96, 0.3), 0 3px 10px rgba(0, 0, 0, 0.1)",
    },
    
    submitButtonDisabled: {
      opacity: 0.7,
      cursor: "not-allowed",
    },
    
    buttonIcon: {
      fontSize: "1.125rem",
      position: "relative",
      zIndex: 1,
    },
    
    spinner: {
      width: "1.25rem",
      height: "1.25rem",
      border: "3px solid rgba(255, 255, 255, 0.3)",
      borderRadius: "50%",
      borderTopColor: "white",
      animation: "spin 1s linear infinite",
      position: "relative",
      zIndex: 1,
    },
    
    message: {
      marginTop: "1rem",
      padding: "1rem",
      borderRadius: "0.75rem",
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      animation: "slideDown 0.3s ease-out",
    },
    
    successMessage: {
      background: "linear-gradient(135deg, #e8f6f3 0%, #d4f1e4 100%)",
      border: "2px solid #27ae60",
      color: "#1a472a",
    },
    
    errorMessage: {
      background: "linear-gradient(135deg, #fff0f0 0%, #ffe6e6 100%)",
      border: "2px solid #ffcccc",
      color: "#c0392b",
    },
    
    messageIcon: {
      fontSize: "1.25rem",
      flexShrink: 0,
    },
    
    benefits: {
      marginTop: "1.5rem",
      padding: "1rem",
      background: "linear-gradient(135deg, #e8f6f3 0%, #d4f1e4 100%)",
      borderRadius: "0.75rem",
      border: "1px solid rgba(39, 174, 96, 0.2)",
    },
    
    benefitsTitle: {
      fontSize: "0.875rem",
      fontWeight: 700,
      color: "#1a472a",
      marginBottom: "0.5rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    
    benefitsList: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
    
    benefitItem: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "0.75rem",
      color: "#2d6a4f",
    },
    
    benefitIcon: {
      fontSize: "0.75rem",
      color: "#27ae60",
    },
  };

  // Animation keyframes as style tag
  const keyframes = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-5px); }
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div style={styles.overlay}>
        <div style={styles.box}>
          {/* Background Element */}
          <div style={styles.boxBg}></div>
          
          {/* Close Button */}
          <button 
            style={styles.closeButton}
            onClick={onClose}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(39, 174, 96, 0.2)";
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(39, 174, 96, 0.1)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            ×
          </button>
          
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerIcon}>🌦️</div>
            <h2 style={styles.title}>Weather Alert Subscription</h2>
          </div>
          
          <p style={styles.subtitle}>
            Get timely email alerts for harsh weather conditions to protect your crops
          </p>
          
          {/* Form */}
          <div style={styles.form}>
            {/* Email Input */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <span style={styles.labelIcon}>📧</span>
                Email Address
              </label>
              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}>✉️</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your email address"
                  style={styles.input}
                  onFocus={(e) => {
                    Object.assign(e.target.style, styles.inputFocus);
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e8f5e9";
                    e.target.style.boxShadow = "inset 0 2px 4px rgba(0, 0, 0, 0.04)";
                  }}
                  onMouseEnter={(e) => {
                    if (document.activeElement !== e.target) {
                      Object.assign(e.target.style, styles.inputHover);
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (document.activeElement !== e.target) {
                      e.target.style.borderColor = "#e8f5e9";
                    }
                  }}
                />
              </div>
            </div>
            
            {/* City Input */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <span style={styles.labelIcon}>📍</span>
                Location
                <span style={styles.optional}>Optional</span>
              </label>
              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}>🏙️</span>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="e.g., Delhi, Mumbai, Bangalore"
                  style={styles.input}
                  onFocus={(e) => {
                    Object.assign(e.target.style, styles.inputFocus);
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e8f5e9";
                    e.target.style.boxShadow = "inset 0 2px 4px rgba(0, 0, 0, 0.04)";
                  }}
                  onMouseEnter={(e) => {
                    if (document.activeElement !== e.target) {
                      Object.assign(e.target.style, styles.inputHover);
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (document.activeElement !== e.target) {
                      e.target.style.borderColor = "#e8f5e9";
                    }
                  }}
                />
              </div>
              <p style={styles.hint}>
                Default location: <strong>Delhi</strong>. Set your city for localized alerts.
              </p>
            </div>
            
            {/* Submit Button */}
            <button
              onClick={subscribe}
              disabled={loading || !email}
              style={{
                ...styles.submitButton,
                ...(loading || !email ? styles.submitButtonDisabled : {}),
              }}
              onMouseEnter={(e) => {
                if (!loading && email) {
                  Object.assign(e.currentTarget.style, styles.submitButtonHover);
                  e.currentTarget.style.animation = "pulse 2s infinite";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading && email) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(39, 174, 96, 0.3), 0 4px 10px rgba(0, 0, 0, 0.1)";
                  e.currentTarget.style.animation = "none";
                }
              }}
              onMouseDown={(e) => {
                if (!loading && email) {
                  Object.assign(e.currentTarget.style, styles.submitButtonActive);
                }
              }}
              onMouseUp={(e) => {
                if (!loading && email && e.currentTarget.matches(':hover')) {
                  Object.assign(e.currentTarget.style, styles.submitButtonHover);
                }
              }}
            >
              {loading ? (
                <>
                  <div style={styles.spinner}></div>
                  <span>Subscribing...</span>
                </>
              ) : (
                <>
                  <span style={styles.buttonIcon}>🔔</span>
                  <span>Subscribe to Weather Alerts</span>
                  <span style={{ marginLeft: "8px", fontSize: "20px" }}>→</span>
                </>
              )}
            </button>
            
            {/* Message Display */}
            {message && (
              <div style={{
                ...styles.message,
                ...(messageType === "success" ? styles.successMessage : styles.errorMessage),
              }}>
                <span style={styles.messageIcon}>
                  {messageType === "success" ? "✅" : "⚠️"}
                </span>
                <span style={{ flex: "1" }}>{message}</span>
              </div>
            )}
            
            {/* Benefits Section */}
            <div style={styles.benefits}>
              <h4 style={styles.benefitsTitle}>
                <span>✨</span>
                What You'll Receive
              </h4>
              <div style={styles.benefitsList}>
                <div style={styles.benefitItem}>
                  <span style={styles.benefitIcon}>•</span>
                  <span>Heavy rainfall & flood alerts</span>
                </div>
                <div style={styles.benefitItem}>
                  <span style={styles.benefitIcon}>•</span>
                  <span>Heatwave & drought warnings</span>
                </div>
                <div style={styles.benefitItem}>
                  <span style={styles.benefitIcon}>•</span>
                  <span>Frost & cold wave notifications</span>
                </div>
                <div style={styles.benefitItem}>
                  <span style={styles.benefitIcon}>•</span>
                  <span>Storm & wind damage alerts</span>
                </div>
                <div style={styles.benefitItem}>
                  <span style={styles.benefitIcon}>•</span>
                  <span>Crop protection recommendations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherAlertModal;