import React, { useState, useRef } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_BASE_URL2 || "http://localhost:8000";

const LeafDiseasePage = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Check if file is an image
    if (!selectedFile.type.startsWith('image/')) {
      setError("Please upload an image file (JPEG, PNG, etc.)");
      return;
    }

    setFile(selectedFile);
    setError(null);
    setResult(null);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select an image first");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const form = new FormData();
      form.append("file", file);

      const res = await axios.post(`${API}/detect-leaf-disease`, form, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to analyze leaf image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setFile(droppedFile);
      setError(null);
      setResult(null);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(droppedFile);
    } else {
      setError("Please drop an image file (JPEG, PNG, etc.)");
    }
  };

  // Inline Styles
  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f0fdf4 0%, #f0f9ff 100%)",
      padding: "2rem 1rem",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      animation: "fadeIn 0.6s ease-out",
    },
    
    header: {
      textAlign: "center",
      marginBottom: "3rem",
      maxWidth: "800px",
    },
    
    headerIconWrapper: {
      position: "relative",
      display: "inline-block",
      marginBottom: "1.5rem",
    },
    
    headerIconBg: {
      position: "absolute",
      top: "-20px",
      left: "-20px",
      right: "-20px",
      bottom: "-20px",
      background: "linear-gradient(135deg, #27ae60, #2ecc71)",
      borderRadius: "50%",
      opacity: 0.2,
      filter: "blur(20px)",
      animation: "pulse 2s ease-in-out infinite",
    },
    
    headerIcon: {
      fontSize: "4rem",
      color: "#27ae60",
      position: "relative",
      zIndex: 1,
      animation: "float 3s ease-in-out infinite",
    },
    
    title: {
      fontSize: "2.5rem",
      fontWeight: 800,
      color: "#1a472a",
      marginBottom: "0.75rem",
      lineHeight: 1.2,
    },
    
    titleGradient: {
      background: "linear-gradient(135deg, #27ae60 0%, #2ecc71 50%, #1e8449 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    
    subtitle: {
      fontSize: "1.125rem",
      color: "#2d6a4f",
      lineHeight: 1.6,
      maxWidth: "600px",
      margin: "0 auto",
    },
    
    contentWrapper: {
      maxWidth: "1200px",
      width: "100%",
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "2rem",
    },
    
    leftPanel: {
      background: "white",
      borderRadius: "1.5rem",
      padding: "2rem",
      boxShadow: "0 20px 60px rgba(39, 174, 96, 0.15), 0 5px 15px rgba(0, 0, 0, 0.05)",
      border: "1px solid rgba(39, 174, 96, 0.2)",
      position: "relative",
      overflow: "hidden",
    },
    
    panelBg: {
      position: "absolute",
      top: 0,
      right: 0,
      width: "150px",
      height: "150px",
      background: "linear-gradient(135deg, rgba(39, 174, 96, 0.1) 0%, rgba(46, 204, 113, 0.05) 100%)",
      borderRadius: "0 0 0 100px",
      zIndex: 0,
    },
    
    panelHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "2rem",
      position: "relative",
      zIndex: 1,
    },
    
    panelTitle: {
      fontSize: "1.75rem",
      fontWeight: 700,
      color: "#1a472a",
      margin: 0,
    },
    
    panelSubtitle: {
      color: "#2d6a4f",
      margin: "0.25rem 0 0 0",
    },
    
    aiBadge: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      background: "linear-gradient(to right, #f0fdf4, #dcfce7)",
      padding: "0.5rem 1rem",
      borderRadius: "9999px",
      border: "1px solid rgba(39, 174, 96, 0.2)",
      fontSize: "0.875rem",
      fontWeight: 600,
      color: "#166534",
    },
    
    uploadSection: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
      position: "relative",
      zIndex: 1,
    },
    
    uploadArea: {
      border: "3px dashed #86efac",
      borderRadius: "1rem",
      padding: "3rem 2rem",
      textAlign: "center",
      background: "#f0fdf4",
      cursor: "pointer",
      transition: "all 0.3s ease",
      position: "relative",
    },
    
    uploadAreaHover: {
      borderColor: "#22c55e",
      background: "#dcfce7",
      transform: "translateY(-2px)",
      boxShadow: "0 10px 30px rgba(39, 174, 96, 0.2)",
    },
    
    uploadIcon: {
      fontSize: "3rem",
      color: "#22c55e",
      marginBottom: "1rem",
    },
    
    uploadText: {
      fontSize: "1.125rem",
      fontWeight: 600,
      color: "#166534",
      marginBottom: "0.5rem",
    },
    
    uploadSubtext: {
      fontSize: "0.875rem",
      color: "#2d6a4f",
      margin: 0,
    },
    
    fileInput: {
      display: "none",
    },
    
    fileInfo: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      padding: "1rem",
      background: "#f0fdf4",
      borderRadius: "0.75rem",
      border: "1px solid rgba(39, 174, 96, 0.2)",
    },
    
    fileIcon: {
      fontSize: "1.5rem",
      color: "#22c55e",
    },
    
    fileName: {
      flex: 1,
      fontSize: "0.875rem",
      fontWeight: 600,
      color: "#1a472a",
      wordBreak: "break-all",
    },
    
    imagePreview: {
      width: "100%",
      maxHeight: "300px",
      objectFit: "contain",
      borderRadius: "0.75rem",
      border: "2px solid #e8f5e9",
      background: "#f8fff9",
    },
    
    buttonGroup: {
      display: "flex",
      gap: "1rem",
      marginTop: "1rem",
    },
    
    primaryButton: {
      flex: 2,
      padding: "1rem 1.5rem",
      background: "linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)",
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
      boxShadow: "0 8px 25px rgba(39, 174, 96, 0.3), 0 4px 10px rgba(0, 0, 0, 0.1)",
    },
    
    primaryButtonHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 12px 35px rgba(39, 174, 96, 0.4), 0 6px 15px rgba(0, 0, 0, 0.15)",
    },
    
    primaryButtonDisabled: {
      opacity: 0.7,
      cursor: "not-allowed",
    },
    
    secondaryButton: {
      flex: 1,
      padding: "1rem 1.5rem",
      background: "white",
      color: "#1a472a",
      border: "2px solid #e8f5e9",
      borderRadius: "0.75rem",
      fontSize: "1rem",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    
    secondaryButtonHover: {
      borderColor: "#22c55e",
      color: "#166534",
      transform: "translateY(-2px)",
    },
    
    spinner: {
      width: "1.25rem",
      height: "1.25rem",
      border: "3px solid rgba(255, 255, 255, 0.3)",
      borderRadius: "50%",
      borderTopColor: "white",
      animation: "spin 1s linear infinite",
    },
    
    errorMessage: {
      padding: "1rem",
      background: "linear-gradient(135deg, #fff0f0 0%, #ffe6e6 100%)",
      border: "2px solid #ffcccc",
      borderRadius: "0.75rem",
      color: "#c0392b",
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      animation: "slideDown 0.3s ease-out",
    },
    
    errorIcon: {
      fontSize: "1.25rem",
      flexShrink: 0,
    },
    
    resultSection: {
      background: "white",
      borderRadius: "1.5rem",
      padding: "2rem",
      boxShadow: "0 20px 60px rgba(39, 174, 96, 0.15), 0 5px 15px rgba(0, 0, 0, 0.05)",
      border: "1px solid rgba(39, 174, 96, 0.2)",
      animation: "slideUp 0.5s ease-out",
    },
    
    resultHeader: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      marginBottom: "1.5rem",
    },
    
    resultIcon: {
      fontSize: "2rem",
      color: "#22c55e",
    },
    
    resultTitle: {
      fontSize: "1.5rem",
      fontWeight: 700,
      color: "#1a472a",
      margin: 0,
    },
    
    diagnosisCard: {
      background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
      borderRadius: "1rem",
      padding: "1.5rem",
      marginBottom: "1.5rem",
      border: "1px solid rgba(39, 174, 96, 0.2)",
    },
    
    diagnosisGrid: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "1.5rem",
    },
    
    diagnosisItem: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
    
    diagnosisLabel: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "0.875rem",
      fontWeight: 600,
      color: "#2d6a4f",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },
    
    diagnosisIcon: {
      fontSize: "1rem",
      color: "#22c55e",
    },
    
    diagnosisValue: {
      fontSize: "1.125rem",
      fontWeight: 700,
      color: "#1a472a",
      lineHeight: 1.4,
    },
    
    severityBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.5rem 1rem",
      borderRadius: "9999px",
      fontSize: "0.875rem",
      fontWeight: 700,
    },
    
    lowSeverity: {
      background: "linear-gradient(135deg, #dcfce7, #bbf7d0)",
      color: "#166534",
    },
    
    mediumSeverity: {
      background: "linear-gradient(135deg, #fef3c7, #fde68a)",
      color: "#92400e",
    },
    
    highSeverity: {
      background: "linear-gradient(135deg, #fee2e2, #fecaca)",
      color: "#991b1b",
    },
    
    treatmentCard: {
      background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
      borderRadius: "1rem",
      padding: "1.5rem",
      border: "1px solid rgba(59, 130, 246, 0.2)",
    },
    
    treatmentHeader: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      marginBottom: "1rem",
    },
    
    treatmentIcon: {
      fontSize: "1.5rem",
      color: "#3b82f6",
    },
    
    treatmentTitle: {
      fontSize: "1.25rem",
      fontWeight: 700,
      color: "#1e40af",
      margin: 0,
    },
    
    treatmentContent: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    
    treatmentItem: {
      paddingBottom: "1rem",
      borderBottom: "1px solid rgba(59, 130, 246, 0.1)",
    },
    
    treatmentItemLast: {
      paddingBottom: 0,
      borderBottom: "none",
    },
    
    treatmentSubtitle: {
      fontSize: "1rem",
      fontWeight: 600,
      color: "#1e40af",
      marginBottom: "0.5rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    
    treatmentText: {
      fontSize: "0.875rem",
      color: "#374151",
      lineHeight: 1.6,
      margin: 0,
    },
    
    infoPanel: {
      background: "linear-gradient(135deg, #f8fff9 0%, #e8f6f3 100%)",
      borderRadius: "1.5rem",
      padding: "2rem",
      border: "1px solid rgba(39, 174, 96, 0.2)",
    },
    
    infoTitle: {
      fontSize: "1.5rem",
      fontWeight: 700,
      color: "#1a472a",
      marginBottom: "1.5rem",
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
    },
    
    tipsList: {
      display: "flex",
      flexDirection: "column",
      gap: "1.25rem",
    },
    
    tipItem: {
      display: "flex",
      alignItems: "flex-start",
      gap: "1rem",
    },
    
    tipIcon: {
      width: "2rem",
      height: "2rem",
      background: "linear-gradient(135deg, #22c55e, #16a34a)",
      color: "white",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1rem",
      flexShrink: 0,
      marginTop: "0.125rem",
    },
    
    tipContent: {
      flex: 1,
    },
    
    tipTitle: {
      fontSize: "1rem",
      fontWeight: 600,
      color: "#1a472a",
      marginBottom: "0.25rem",
    },
    
    tipText: {
      fontSize: "0.875rem",
      color: "#2d6a4f",
      lineHeight: 1.6,
      margin: 0,
    },
    
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "1rem",
      marginTop: "2rem",
    },
    
    statItem: {
      textAlign: "center",
      padding: "1rem",
      background: "white",
      borderRadius: "0.75rem",
      border: "1px solid rgba(39, 174, 96, 0.2)",
    },
    
    statNumber: {
      fontSize: "1.5rem",
      fontWeight: 800,
      color: "#22c55e",
      marginBottom: "0.25rem",
    },
    
    statLabel: {
      fontSize: "0.75rem",
      color: "#2d6a4f",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },
  };

  // Animation keyframes
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
      50% { transform: translateY(-10px); }
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

  // Helper function to get severity style
  const getSeverityStyle = (severity) => {
    if (!severity) return styles.lowSeverity;
    const severityLower = severity.toLowerCase();
    if (severityLower.includes('high') || severityLower.includes('severe')) {
      return styles.highSeverity;
    } else if (severityLower.includes('medium') || severityLower.includes('moderate')) {
      return styles.mediumSeverity;
    }
    return styles.lowSeverity;
  };

  return (
    <>
      <style>{keyframes}</style>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerIconWrapper}>
            <div style={styles.headerIconBg}></div>
            <div style={styles.headerIcon}>🌿</div>
          </div>
          
          <h1 style={styles.title}>
            <span style={styles.titleGradient}>AI Leaf Disease Detector</span>
          </h1>
          
          <p style={styles.subtitle}>
            Upload a leaf image to detect diseases, get severity analysis, and receive 
            eco-friendly treatment recommendations powered by AI
          </p>
        </div>

        <div style={styles.contentWrapper}>
          {/* Left Panel - Upload & Results */}
          <div style={styles.leftPanel}>
            <div style={styles.panelBg}></div>
            
            <div style={styles.panelHeader}>
              <div>
                <h2 style={styles.panelTitle}>Leaf Analysis</h2>
                <p style={styles.panelSubtitle}>Upload a clear image of the affected leaf</p>
              </div>
              <div style={styles.aiBadge}>
                <span>🤖</span>
                <span>AI-Powered Detection</span>
              </div>
            </div>

            <div style={styles.uploadSection}>
              {/* Tips Section - Moved to top of upload area */}
              <div style={{
                ...styles.infoPanel,
                marginBottom: "2rem",
                padding: "1.5rem",
                background: "linear-gradient(135deg, #f8fff9 0%, #e8f6f3 100%)",
              }}>
                <h3 style={{
                  ...styles.infoTitle,
                  fontSize: "1.25rem",
                  marginBottom: "1rem",
                }}>
                  <span>💡</span>
                  Tips for Best Results
                </h3>
                
                <div style={styles.tipsList}>
                  <div style={styles.tipItem}>
                    <div style={styles.tipIcon}>1</div>
                    <div style={styles.tipContent}>
                      <div style={styles.tipTitle}>Use Clear Images</div>
                      <p style={styles.tipText}>
                        Capture photos in good lighting with the leaf centered and in focus.
                        Avoid blurry or dark images.
                      </p>
                    </div>
                  </div>
                  
                  <div style={styles.tipItem}>
                    <div style={styles.tipIcon}>2</div>
                    <div style={styles.tipContent}>
                      <div style={styles.tipTitle}>Focus on Affected Areas</div>
                      <p style={styles.tipText}>
                        Ensure the diseased or discolored parts of the leaf are clearly visible.
                        Include both affected and healthy areas for better diagnosis.
                      </p>
                    </div>
                  </div>
                  
                  <div style={styles.tipItem}>
                    <div style={styles.tipIcon}>3</div>
                    <div style={styles.tipContent}>
                      <div style={styles.tipTitle}>Multiple Angles</div>
                      <p style={styles.tipText}>
                        For best results, upload images from different angles showing both
                        sides of the leaf (top and bottom surfaces).
                      </p>
                    </div>
                  </div>
                  
                  <div style={styles.tipItem}>
                    <div style={styles.tipIcon}>4</div>
                    <div style={styles.tipContent}>
                      <div style={styles.tipTitle}>Regular Monitoring</div>
                      <p style={styles.tipText}>
                        Monitor your plants regularly and upload new images as symptoms
                        progress to track disease development.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upload Area */}
              <div
                style={styles.uploadArea}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                onMouseEnter={(e) => {
                  Object.assign(e.currentTarget.style, styles.uploadAreaHover);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#86efac";
                  e.currentTarget.style.background = "#f0fdf4";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={styles.uploadIcon}>📤</div>
                <div style={styles.uploadText}>
                  {file ? "Change Image" : "Upload Leaf Image"}
                </div>
                <p style={styles.uploadSubtext}>
                  Drag & drop or click to browse (JPEG, PNG, etc.)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={styles.fileInput}
                />
              </div>

              {/* File Info */}
              {file && (
                <div style={styles.fileInfo}>
                  <div style={styles.fileIcon}>📄</div>
                  <div style={styles.fileName}>{file.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "#2d6a4f" }}>
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>
              )}

              {/* Image Preview */}
              {preview && (
                <div style={{ textAlign: "center" }}>
                  <img
                    src={preview}
                    alt="Leaf preview"
                    style={styles.imagePreview}
                  />
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div style={styles.errorMessage}>
                  <span style={styles.errorIcon}>⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div style={styles.buttonGroup}>
                <button
                  onClick={handleUpload}
                  disabled={loading || !file}
                  style={{
                    ...styles.primaryButton,
                    ...((loading || !file) ? styles.primaryButtonDisabled : {}),
                  }}
                  onMouseEnter={(e) => {
                    if (!loading && file) {
                      Object.assign(e.currentTarget.style, styles.primaryButtonHover);
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading && file) {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 8px 25px rgba(39, 174, 96, 0.3), 0 4px 10px rgba(0, 0, 0, 0.1)";
                    }
                  }}
                >
                  {loading ? (
                    <>
                      <div style={styles.spinner}></div>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <span>🔍</span>
                      <span>Analyze Leaf Disease</span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={handleReset}
                  style={styles.secondaryButton}
                  onMouseEnter={(e) => {
                    Object.assign(e.currentTarget.style, styles.secondaryButtonHover);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e8f5e9";
                    e.currentTarget.style.color = "#1a472a";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Results */}
            {result && (
              <div style={styles.resultSection}>
                <div style={styles.resultHeader}>
                  <div style={styles.resultIcon}>📋</div>
                  <h2 style={styles.resultTitle}>Disease Diagnosis Report</h2>
                </div>

                {/* Diagnosis Card */}
                <div style={styles.diagnosisCard}>
                  <div style={styles.diagnosisGrid}>
                    <div style={styles.diagnosisItem}>
                      <div style={styles.diagnosisLabel}>
                        <span style={styles.diagnosisIcon}>🦠</span>
                        Disease Detected
                      </div>
                      <div style={styles.diagnosisValue}>{result.disease_name}</div>
                    </div>
                    
                    <div style={styles.diagnosisItem}>
                      <div style={styles.diagnosisLabel}>
                        <span style={styles.diagnosisIcon}>📊</span>
                        Severity Level
                      </div>
                      <div style={{
                        ...styles.severityBadge,
                        ...getSeverityStyle(result.severity),
                      }}>
                        {result.severity}
                      </div>
                    </div>
                    
                    <div style={styles.diagnosisItem}>
                      <div style={styles.diagnosisLabel}>
                        <span style={styles.diagnosisIcon}>🔍</span>
                        Primary Cause
                      </div>
                      <div style={styles.diagnosisValue}>{result.cause}</div>
                    </div>
                  </div>
                </div>

                {/* Treatment Card */}
                <div style={styles.treatmentCard}>
                  <div style={styles.treatmentHeader}>
                    <div style={styles.treatmentIcon}>💊</div>
                    <h3 style={styles.treatmentTitle}>Treatment Recommendations</h3>
                  </div>
                  
                  <div style={styles.treatmentContent}>
                    <div style={styles.treatmentItem}>
                      <div style={styles.treatmentSubtitle}>
                        <span>🩺</span>
                        Recommended Treatment
                      </div>
                      <p style={styles.treatmentText}>{result.recommended_treatment}</p>
                    </div>
                    
                    <div style={{...styles.treatmentItem, ...styles.treatmentItemLast}}>
                      <div style={styles.treatmentSubtitle}>
                        <span>🌱</span>
                        Eco-Friendly Solution
                      </div>
                      <p style={styles.treatmentText}>{result.eco_friendly_solution}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Stats Only */}
          <div style={styles.infoPanel}>
            {/* Stats */}
            <div style={{
              ...styles.statsGrid,
              marginTop: 0,
            }}>
              <div style={styles.statItem}>
                <div style={styles.statNumber}>95%</div>
                <div style={styles.statLabel}>Accuracy Rate</div>
              </div>
              <div style={styles.statItem}>
                <div style={styles.statNumber}>50+</div>
                <div style={styles.statLabel}>Diseases Detected</div>
              </div>
              <div style={styles.statItem}>
                <div style={styles.statNumber}>24/7</div>
                <div style={styles.statLabel}>Analysis</div>
              </div>
              <div style={styles.statItem}>
                <div style={styles.statNumber}>10K+</div>
                <div style={styles.statLabel}>Leaves Analyzed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeafDiseasePage;