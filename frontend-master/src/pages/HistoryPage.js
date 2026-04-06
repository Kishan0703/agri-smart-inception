import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../components/api";
import {
  FaHistory,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaSeedling,
  FaFlask,
  FaLeaf,
  FaChevronRight,
  FaEye,
  FaDownload,
  FaShare,
  FaSpinner,
  FaExclamationTriangle
} from "react-icons/fa";
import { GiWheat, GiPlantRoots } from "react-icons/gi";
import styles from "./HistoryPage.module.css";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const { data } = await API.get("/history");
        setHistory(data);
        setError(null);
      } catch (err) {
        console.error("History fetch error", err);
        setError("Failed to load history. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      full: date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      short: date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  const getSoilIcon = (soilType) => {
    switch (soilType?.toLowerCase()) {
      case 'loam':
        return <FaLeaf className={styles.soilIcon} />;
      case 'clay':
        return <GiPlantRoots className={styles.soilIcon} />;
      case 'sandy':
        return <FaSeedling className={styles.soilIcon} />;
      default:
        return <FaFlask className={styles.soilIcon} />;
    }
  };

  const getMonthName = (monthNum) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return months[monthNum - 1] || "Not specified";
  };

  const handleViewDetails = (advisoryData) => {
    // Navigate to advisory details page or show modal
    navigate('/advisory/details', { state: { advisory: advisoryData } });
  };

  const handleExportData = (item) => {
    const dataStr = JSON.stringify(item, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `advisory-${item.location}-${item._id}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <FaSpinner className={styles.spinner} />
        <p className={styles.loadingText}>Loading your advisory history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <FaExclamationTriangle className={styles.errorIcon} />
        <h3 className={styles.errorTitle}>Unable to Load History</h3>
        <p className={styles.errorMessage}>{error}</p>
        <button 
          className={styles.retryButton}
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.emptyIconWrapper}>
          <FaHistory className={styles.emptyIcon} />
        </div>
        <h3 className={styles.emptyTitle}>No Advisory History Found</h3>
        <p className={styles.emptyMessage}>
          You haven't generated any crop advisories yet. 
          Create your first advisory to see your history here.
        </p>
        <button 
          className={styles.createButton}
          onClick={() => navigate('/')}
        >
          Create Your First Advisory
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <div className={styles.headerContent}>
          <div className={styles.headerIconWrapper}>
            <FaHistory className={styles.headerIcon} />
            <div className={styles.headerIconBg}></div>
          </div>
          <div>
            <h1 className={styles.title}>Advisory History</h1>
            <p className={styles.subtitle}>
              Review all your previous crop recommendations and farm advisories
            </p>
          </div>
        </div>
        
        <div className={styles.statsBar}>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>{history.length}</div>
            <div className={styles.statLabel}>Total Advisories</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>
              {new Set(history.map(h => h.location)).size}
            </div>
            <div className={styles.statLabel}>Locations</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>
              {history.reduce((acc, item) => 
                acc + (item.advisory?.topRecommendations?.length || 0), 0
              )}
            </div>
            <div className={styles.statLabel}>Crop Recommendations</div>
          </div>
        </div>
      </div>

      {/* History Grid */}
      <div className={styles.historyGrid}>
        {history.map((item) => {
          const dateInfo = formatDate(item.createdAt);
          const topCrop = item.advisory?.topRecommendations?.[0];
          
          return (
            <div className={styles.historyCard} key={item._id}>
              {/* Card Header */}
              <div className={styles.cardHeader}>
                <div className={styles.locationSection}>
                  <FaMapMarkerAlt className={styles.locationIcon} />
                  <div>
                    <h3 className={styles.locationName}>{item.location}</h3>
                    <div className={styles.dateInfo}>
                      <FaCalendarAlt className={styles.dateIcon} />
                      <span>{dateInfo.short} • {dateInfo.time}</span>
                    </div>
                  </div>
                </div>
                <div className={styles.cardActions}>
                  <button 
                    className={styles.actionButton}
                    onClick={() => handleExportData(item)}
                    title="Export as JSON"
                  >
                    <FaDownload />
                  </button>
                  <button 
                    className={styles.actionButton}
                    title="Share"
                  >
                    <FaShare />
                  </button>
                </div>
              </div>

              {/* Soil & Season Info */}
              <div className={styles.detailsSection}>
                <div className={styles.detailItem}>
                  <div className={styles.detailIcon}>
                    {getSoilIcon(item.soilType)}
                  </div>
                  <div>
                    <div className={styles.detailLabel}>Soil Type</div>
                    <div className={styles.detailValue}>{item.soilType}</div>
                  </div>
                </div>
                
                <div className={styles.detailItem}>
                  <div className={styles.detailIcon}>
                    <FaCalendarAlt />
                  </div>
                  <div>
                    <div className={styles.detailLabel}>Sowing Month</div>
                    <div className={styles.detailValue}>
                      {getMonthName(item.sowingMonth)}
                    </div>
                  </div>
                </div>

                {topCrop && (
                  <div className={styles.detailItem}>
                    <div className={styles.detailIcon}>
                      <GiWheat />
                    </div>
                    <div>
                      <div className={styles.detailLabel}>Top Crop</div>
                      <div className={styles.detailValue}>{topCrop.name}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Top Crops Preview */}
              {item.advisory?.topRecommendations && (
                <div className={styles.cropsSection}>
                  <h4 className={styles.sectionTitle}>Recommended Crops</h4>
                  <div className={styles.cropsList}>
                    {item.advisory.topRecommendations.slice(0, 3).map((crop, index) => (
                      <div key={crop.name} className={styles.cropItem}>
                        <div className={styles.cropRank}>#{index + 1}</div>
                        <div className={styles.cropInfo}>
                          <div className={styles.cropName}>{crop.name}</div>
                          <div className={styles.cropScore}>
                            <div className={styles.scoreBar}>
                              <div 
                                className={styles.scoreFill}
                                style={{ width: `${crop.totalScore}%` }}
                              ></div>
                            </div>
                            <span className={styles.scoreValue}>{crop.totalScore}/100</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {item.advisory.topRecommendations.length > 3 && (
                    <div className={styles.moreCrops}>
                      +{item.advisory.topRecommendations.length - 3} more crops
                    </div>
                  )}
                </div>
              )}

              {/* Weather Summary */}
              {item.advisory && (
                <div className={styles.weatherSection}>
                  <h4 className={styles.sectionTitle}>Weather Conditions</h4>
                  <div className={styles.weatherGrid}>
                    <div className={styles.weatherItem}>
                      <div className={styles.weatherLabel}>Temperature</div>
                      <div className={styles.weatherValue}>
                        🌡️ {item.advisory.avgTemp?.toFixed(1)}°C
                      </div>
                    </div>
                    <div className={styles.weatherItem}>
                      <div className={styles.weatherLabel}>Humidity</div>
                      <div className={styles.weatherValue}>
                        💧 {item.advisory.avgHumidity?.toFixed(1)}%
                      </div>
                    </div>
                    <div className={styles.weatherItem}>
                      <div className={styles.weatherLabel}>Rainfall</div>
                      <div className={styles.weatherValue}>
                        🌧️ {item.advisory.totalRain?.toFixed(1)} mm
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className={styles.cardFooter}>
                <button 
                  className={styles.viewButton}
                  onClick={() => handleViewDetails(item)}
                >
                  <FaEye className={styles.buttonIcon} />
                  View Full Details
                  <FaChevronRight className={styles.buttonArrow} />
                </button>
                <button 
                  className={styles.recreateButton}
                  onClick={() => navigate('/', { 
                    state: { 
                      prefill: {
                        location: item.location,
                        soilType: item.soilType,
                        sowingMonth: item.sowingMonth
                      }
                    }
                  })}
                >
                  <FaSeedling className={styles.buttonIcon} />
                  Recreate Advisory
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination/Info Footer */}
      <div className={styles.footer}>
        <div className={styles.footerText}>
          Showing {history.length} of {history.length} advisories
        </div>
        <div className={styles.footerActions}>
          <button className={styles.footerButton}>
            <FaDownload />
            Export All Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;