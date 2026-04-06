import React, { useState } from "react";
import API from "./api";
import AdvisoryResult from "./AdvisoryResult";
import styles from "./AdvisoryForm.module.css";

// Importing icons from react-icons
import { 
  FaMapMarkerAlt, 
  FaLeaf, 
  FaCalendarAlt, 
  FaMagic, 
  FaCheckCircle,
  FaExclamationTriangle,
  FaGlobeAmericas,
  FaChevronRight,
  FaSeedling,
  FaCloudSun,
  FaChartLine,
  FaRobot,
  FaTint,
  FaSun,
  FaSnowflake,
  FaUmbrella,
  FaCloudRain,
  FaTree,
  FaLanguage
} from "react-icons/fa";
import { GiWheat } from "react-icons/gi";
import { RiLoader4Line } from "react-icons/ri";

// Translation dictionaries
const translations = {
  en: {
    title: "AI Crop Advisory",
    subtitle: "Get intelligent, data-driven recommendations powered by satellite imagery, weather forecasts, and agricultural research",
    generateAdvisory: "Generate Advisory",
    fillDetails: "Fill in your farm details below",
    farmLocation: "Farm Location",
    optional: "Optional",
    locationPlaceholder: "Enter city, village, or coordinates...",
    currentlyUsing: "Currently using:",
    autoDetect: "Auto-detect Location",
    soilType: "Soil Type",
    selectSoil: "Select the dominant soil type in your farming field",
    sowingSeason: "Sowing Season",
    recommended: "Recommended",
    selectMonth: "Select your planned sowing month for season-specific recommendations",
    generateButton: "Generate Smart Advisory",
    analyzing: "Analyzing Soil & Weather Data...",
    errorMessage: "Failed to fetch advisory. Please check your location and try again.",
    whyUse: "Why Use Our Advisory?",
    satelliteData: "Satellite Data",
    satelliteDesc: "Real-time NDVI & weather analysis",
    aiPredictions: "AI Predictions",
    aiDesc: "Machine learning crop recommendations",
    yieldOptimization: "Yield Optimization",
    yieldDesc: "Maximize productivity with data insights",
    climateSmart: "Climate Smart",
    climateDesc: "Adaptive to changing weather patterns",
    proTips: "Pro Tips",
    tip1: "Provide location for hyper-local weather insights",
    tip2: "Select accurate soil type for better fertilizer recommendations",
    tip3: "Set sowing month for seasonal crop planning",
    tip4: "Consider crop rotation suggestions for soil health",
    trustedByFarmers: "Trusted by Farmers",
    activeUsers: "Active Users",
    accuracyRate: "Accuracy Rate",
    cropVarieties: "Crop Varieties",
    dataUpdates: "Data Updates",
    selectLanguage: "Select Language",
    language: "Language",
    aiPowered: "AI-Powered",
    autoSelectMonth: "Auto-select (Current Season)",
    months: {
      1: "January - Winter Crops",
      2: "February - Early Spring",
      3: "March - Spring Sowing",
      4: "April - Pre-Monsoon",
      5: "May - Summer Crops",
      6: "June - Monsoon Start",
      7: "July - Kharif Season",
      8: "August - Main Crop",
      9: "September - Late Monsoon",
      10: "October - Rabi Prep",
      11: "November - Winter Prep",
      12: "December - Cool Season"
    },
    soilTypes: {
      loam: { label: "Loam", desc: "Rich & Balanced" },
      clay: { label: "Clay", desc: "Moist & Heavy" },
      sandy: { label: "Sandy", desc: "Dry & Light" }
    }
  },
  hi: {
    title: "AI फसल सलाह",
    subtitle: "उपग्रह चित्र, मौसम पूर्वानुमान और कृषि अनुसंधान द्वारा संचालित बुद्धिमान, डेटा-संचालित सिफारिशें प्राप्त करें",
    generateAdvisory: "सलाह जनरेट करें",
    fillDetails: "अपने फार्म का विवरण नीचे भरें",
    farmLocation: "फार्म स्थान",
    optional: "वैकल्पिक",
    locationPlaceholder: "शहर, गाँव या निर्देशांक दर्ज करें...",
    currentlyUsing: "वर्तमान में उपयोग कर रहे हैं:",
    autoDetect: "स्वतः पता लगाना स्थान",
    soilType: "मिट्टी का प्रकार",
    selectSoil: "अपने खेत में प्रमुख मिट्टी के प्रकार का चयन करें",
    sowingSeason: "बुवाई का मौसम",
    recommended: "अनुशंसित",
    selectMonth: "मौसम-विशिष्ट सिफारिशों के लिए अपने नियोजित बुवाई माह का चयन करें",
    generateButton: "स्मार्ट सलाह जनरेट करें",
    analyzing: "मिट्टी और मौसम डेटा का विश्लेषण...",
    errorMessage: "सलाह प्राप्त करने में विफल। कृपया अपना स्थान जांचें और पुनः प्रयास करें।",
    whyUse: "हमारी सलाह क्यों उपयोग करें?",
    satelliteData: "उपग्रह डेटा",
    satelliteDesc: "रीयल-टाइम NDVI और मौसम विश्लेषण",
    aiPredictions: "AI भविष्यवाणियां",
    aiDesc: "मशीन लर्निंग फसल सिफारिशें",
    yieldOptimization: "उपज अनुकूलन",
    yieldDesc: "डेटा अंतर्दृष्टि के साथ उत्पादकता बढ़ाएं",
    climateSmart: "जलवायु स्मार्ट",
    climateDesc: "बदलते मौसम पैटर्न के अनुकूल",
    proTips: "पेशेवर सुझाव",
    tip1: "हाइपर-लोकल मौसम अंतर्दृष्टि के लिए स्थान प्रदान करें",
    tip2: "बेहतर उर्वरक सिफारिशों के लिए सटीक मिट्टी का प्रकार चुनें",
    tip3: "मौसमी फसल योजना के लिए बुवाई माह सेट करें",
    tip4: "मिट्टी के स्वास्थ्य के लिए फसल चक्र सुझावों पर विचार करें",
    trustedByFarmers: "किसानों द्वारा विश्वसनीय",
    activeUsers: "सक्रिय उपयोगकर्ता",
    accuracyRate: "सटीकता दर",
    cropVarieties: "फसल किस्में",
    dataUpdates: "डेटा अपडेट",
    selectLanguage: "भाषा चुनें",
    language: "भाषा",
    aiPowered: "AI-संचालित",
    autoSelectMonth: "स्वतः चयन (वर्तमान मौसम)",
    months: {
      1: "जनवरी - शीतकालीन फसलें",
      2: "फरवरी - प्रारंभिक वसंत",
      3: "मार्च - वसंत बुवाई",
      4: "अप्रैल - मानसून पूर्व",
      5: "मई - ग्रीष्मकालीन फसलें",
      6: "जून - मानसून प्रारंभ",
      7: "जुलाई - खरीफ मौसम",
      8: "अगस्त - मुख्य फसल",
      9: "सितंबर - देर से मानसून",
      10: "अक्टूबर - रबी तैयारी",
      11: "नवंबर - शीतकालीन तैयारी",
      12: "दिसंबर - शीत मौसम"
    },
    soilTypes: {
      loam: { label: "दोमट", desc: "समृद्ध और संतुलित" },
      clay: { label: "चिकनी", desc: "नम और भारी" },
      sandy: { label: "बलुई", desc: "सूखी और हल्की" }
    }
  },
  kn: {
    title: "AI ಬೆಳೆ ಸಲಹೆ",
    subtitle: "ಉಪಗ್ರಹ ಚಿತ್ರಗಳು, ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ಮತ್ತು ಕೃಷಿ ಸಂಶೋಧನೆಯಿಂದ ಶಕ್ತಿಯುತವಾದ ಬುದ್ಧಿವಂತ, ಡೇಟಾ-ಚಾಲಿತ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ",
    generateAdvisory: "ಸಲಹೆ ಉತ್ಪಾದಿಸಿ",
    fillDetails: "ನಿಮ್ಮ ಕೃಷಿ ಭೂಮಿಯ ವಿವರಗಳನ್ನು ಕೆಳಗೆ ತುಂಬಿಸಿ",
    farmLocation: "ಕೃಷಿ ಭೂಮಿ ಸ್ಥಳ",
    optional: "ಐಚ್ಛಿಕ",
    locationPlaceholder: "ನಗರ, ಗ್ರಾಮ ಅಥವಾ ನಿರ್ದೇಶಾಂಕಗಳನ್ನು ನಮೂದಿಸಿ...",
    currentlyUsing: "ಪ್ರಸ್ತುತ ಬಳಸುತ್ತಿದ್ದಾರೆ:",
    autoDetect: "ಸ್ವಯಂ ಪತ್ತೆ ಸ್ಥಳ",
    soilType: "ಮಣ್ಣಿನ ಪ್ರಕಾರ",
    selectSoil: "ನಿಮ್ಮ ಕೃಷಿ ಭೂಮಿಯಲ್ಲಿ ಪ್ರಮುಖ ಮಣ್ಣಿನ ಪ್ರಕಾರವನ್ನು ಆರಿಸಿ",
    sowingSeason: "ಬಿತ್ತನೆ ಋತು",
    recommended: "ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ",
    selectMonth: "ಋತು-ನಿರ್ದಿಷ್ಟ ಶಿಫಾರಸುಗಳಿಗಾಗಿ ನಿಮ್ಮ ಯೋಜಿತ ಬಿತ್ತನೆ ತಿಂಗಳನ್ನು ಆರಿಸಿ",
    generateButton: "ಸ್ಮಾರ್ಟ್ ಸಲಹೆ ಉತ್ಪಾದಿಸಿ",
    analyzing: "ಮಣ್ಣು ಮತ್ತು ಹವಾಮಾನ ಡೇಟಾವನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
    errorMessage: "ಸಲಹೆಯನ್ನು ಪಡೆಯಲು ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಮರುಪ್ರಯತ್ನಿಸಿ.",
    whyUse: "ನಮ್ಮ ಸಲಹೆಯನ್ನು ಏಕೆ ಬಳಸಬೇಕು?",
    satelliteData: "ಉಪಗ್ರಹ ಡೇಟಾ",
    satelliteDesc: "ರಿಯಲ್-ಟೈಮ್ NDVI ಮತ್ತು ಹವಾಮಾನ ವಿಶ್ಲೇಷಣೆ",
    aiPredictions: "AI ಮುನ್ಸೂಚನೆಗಳು",
    aiDesc: "ಮೆಷಿನ್ ಲರ್ನಿಂಗ್ ಬೆಳೆ ಶಿಫಾರಸುಗಳು",
    yieldOptimization: "ಪೈದಾಯು ಅತ್ಯುತ್ತಮೀಕರಣ",
    yieldDesc: "ಡೇಟಾ ಒಳನೋಟಗಳೊಂದಿಗೆ ಉತ್ಪಾದಕತೆಯನ್ನು ಗರಿಷ್ಠಗೊಳಿಸಿ",
    climateSmart: "ಹವಾಮಾನ ಸ್ಮಾರ್ಟ್",
    climateDesc: "ಬದಲಾಗುತ್ತಿರುವ ಹವಾಮಾನ ಮಾದರಿಗಳಿಗೆ ಹೊಂದಿಕೊಳ್ಳುವ",
    proTips: "ವೃತ್ತಿಪರ ಸಲಹೆಗಳು",
    tip1: "ಹೈಪರ್-ಲೋಕಲ್ ಹವಾಮಾನ ಒಳನೋಟಗಳಿಗಾಗಿ ಸ್ಥಳವನ್ನು ಒದಗಿಸಿ",
    tip2: "ಉತ್ತಮ ಗೊಬ್ಬರ ಶಿಫಾರಸುಗಳಿಗಾಗಿ ನಿಖರವಾದ ಮಣ್ಣಿನ ಪ್ರಕಾರವನ್ನು ಆರಿಸಿ",
    tip3: "ಋತುವಾರು ಬೆಳೆ ಯೋಜನೆಗಾಗಿ ಬಿತ್ತನೆ ತಿಂಗಳನ್ನು ಹೊಂದಿಸಿ",
    tip4: "ಮಣ್ಣಿನ ಆರೋಗ್ಯಕ್ಕಾಗಿ ಬೆಳೆ ತಿರುಗುವಿಕೆ ಸಲಹೆಗಳನ್ನು ಪರಿಗಣಿಸಿ",
    trustedByFarmers: "ರೈತರಿಂದ ವಿಶ್ವಸನೀಯ",
    activeUsers: "ಸಕ್ರಿಯ ಬಳಕೆದಾರರು",
    accuracyRate: "ನಿಖರತೆ ದರ",
    cropVarieties: "ಬೆಳೆ ವಿಧಗಳು",
    dataUpdates: "ಡೇಟಾ ನವೀಕರಣಗಳು",
    selectLanguage: "ಭಾಷೆ ಆರಿಸಿ",
    language: "ಭಾಷೆ",
    aiPowered: "AI-ಶಕ್ತಿ",
    autoSelectMonth: "ಸ್ವಯಂ ಆಯ್ಕೆ (ಪ್ರಸ್ತುತ ಋತು)",
    months: {
      1: "ಜನವರಿ - ಚಳಿಗಾಲದ ಬೆಳೆಗಳು",
      2: "ಫೆಬ್ರವರಿ - ಪ್ರಾರಂಭಿಕ ವಸಂತ",
      3: "ಮಾರ್ಚ್ - ವಸಂತ ಬಿತ್ತನೆ",
      4: "ಏಪ್ರಿಲ್ - ಮುನ್ನೀರ ಮುಂಚೆ",
      5: "ಮೇ - ಬೇಸಿಗೆ ಬೆಳೆಗಳು",
      6: "ಜೂನ್ - ಮುನ್ನೀರ ಪ್ರಾರಂಭ",
      7: "ಜುಲೈ - ಖರೀಫ್ ಋತು",
      8: "ಆಗಸ್ಟ್ - ಮುಖ್ಯ ಬೆಳೆ",
      9: "ಸೆಪ್ಟೆಂಬರ್ - ತಡವಾದ ಮುನ್ನೀರ",
      10: "ಅಕ್ಟೋಬರ್ - ರಬಿ ತಯಾರಿ",
      11: "ನವೆಂಬರ್ - ಚಳಿಗಾಲದ ತಯಾರಿ",
      12: "ಡಿಸೆಂಬರ್ - ತಂಪಾದ ಋತು"
    },
    soilTypes: {
      loam: { label: "ಮರಳುಮಿಶ್ರಿತ", desc: "ಸಮೃದ್ಧ ಮತ್ತು ಸಮತೋಲಿತ" },
      clay: { label: "ಕ್ಲೇ", desc: "ಆರ್ದ್ರ ಮತ್ತು ಭಾರೀ" },
      sandy: { label: "ಮರಳು", desc: "ಒಣ ಮತ್ತು ಹಗುರ" }
    }
  }
};

const AdvisoryForm = ({ farmer }) => {
  const [location, setLocation] = useState(farmer?.location || "");
  const [soilType, setSoilType] = useState("loam");
  const [sowingMonth, setSowingMonth] = useState("");
  const [loading, setLoading] = useState(false);
  const [locLoading, setLocLoading] = useState(false);
  const [advisoryData, setAdvisoryData] = useState(null);
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("en");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const t = translations[language];

  const handleDetectLocation = () => {
    setLocLoading(true);
    // Simulate loading for a moment, then set Bengaluru
    setTimeout(() => {
      setLocation("Bengaluru");
      setLocLoading(false);
    }, 500);
  };

  const handleGetAdvisory = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setAdvisoryData(null);

    try {
      const payload = {
        soilType,
      };

      if (location) payload.location = location;
      if (sowingMonth) payload.sowingMonth = Number(sowingMonth);

      const { data } = await API.post("/advisory", payload);
      setAdvisoryData(data);
    } catch (err) {
      const backendMessage = err.response?.data?.message;
      const backendDetails = err.response?.data?.details;
      setError(
        backendMessage
          ? `${backendMessage}${backendDetails ? ` (${backendDetails})` : ""}`
          : t.errorMessage
      );
    } finally {
      setLoading(false);
    }
  };

  const soilTypes = [
    { 
      type: "loam", 
      icon: <FaLeaf className={styles.soilIcon} />, 
      label: t.soilTypes.loam.label, 
      desc: t.soilTypes.loam.desc,
      color: "var(--color-emerald)"
    },
    { 
      type: "clay", 
      icon: <FaTint className={styles.soilIcon} />, 
      label: t.soilTypes.clay.label, 
      desc: t.soilTypes.clay.desc,
      color: "var(--color-amber)"
    },
    { 
      type: "sandy", 
      icon: <FaSun className={styles.soilIcon} />, 
      label: t.soilTypes.sandy.label, 
      desc: t.soilTypes.sandy.desc,
      color: "var(--color-gold)"
    }
  ];

  const months = [
    { value: "", label: t.autoSelectMonth, icon: <FaCloudSun /> },
    { value: "1", label: t.months[1], icon: <FaSnowflake /> },
    { value: "2", label: t.months[2], icon: <GiWheat /> },
    { value: "3", label: t.months[3], icon: <FaLeaf /> },
    { value: "4", label: t.months[4], icon: <FaUmbrella /> },
    { value: "5", label: t.months[5], icon: <FaSun /> },
    { value: "6", label: t.months[6], icon: <FaCloudRain /> },
    { value: "7", label: t.months[7], icon: <FaTree /> },
    { value: "8", label: t.months[8], icon: <GiWheat /> },
    { value: "9", label: t.months[9], icon: <FaLeaf /> },
    { value: "10", label: t.months[10], icon: <FaLeaf /> },
    { value: "11", label: t.months[11], icon: <FaCloudSun /> },
    { value: "12", label: t.months[12], icon: <FaSnowflake /> }
  ];

  const features = [
    {
      icon: <FaGlobeAmericas />,
      title: t.satelliteData,
      desc: t.satelliteDesc
    },
    {
      icon: <FaRobot />,
      title: t.aiPredictions,
      desc: t.aiDesc
    },
    {
      icon: <FaChartLine />,
      title: t.yieldOptimization,
      desc: t.yieldDesc
    },
    {
      icon: <FaMagic />,
      title: t.climateSmart,
      desc: t.climateDesc
    }
  ];

  const tips = [
    t.tip1,
    t.tip2,
    t.tip3,
    t.tip4
  ];

  const languageOptions = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "kn", name: "ಕನ್ನಡ", flag: "🇮🇳" }
  ];

  const getLanguageName = (code) => {
    const lang = languageOptions.find(l => l.code === code);
    return lang ? lang.name : "English";
  };

  const getLanguageFlag = (code) => {
    const lang = languageOptions.find(l => l.code === code);
    return lang ? lang.flag : "🇺🇸";
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.languageSelector}>
            <button
              type="button"
              className={styles.languageButton}
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            >
              <FaLanguage className={styles.languageIcon} />
              <span className={styles.languageText}>{t.language}</span>
              <span className={styles.currentLanguage}>
                {getLanguageFlag(language)} {getLanguageName(language)}
              </span>
              <FaChevronRight className={`${styles.languageArrow} ${showLanguageDropdown ? styles.languageArrowActive : ''}`} />
            </button>
            
            {showLanguageDropdown && (
              <div className={styles.languageDropdown}>
                {languageOptions.map((option) => (
                  <button
                    key={option.code}
                    type="button"
                    className={`${styles.languageOption} ${language === option.code ? styles.languageOptionActive : ''}`}
                    onClick={() => {
                      setLanguage(option.code);
                      setShowLanguageDropdown(false);
                    }}
                  >
                    <span className={styles.languageFlag}>{option.flag}</span>
                    <span className={styles.languageName}>{option.name}</span>
                    {language === option.code && (
                      <FaCheckCircle className={styles.languageCheck} />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.headerIconWrapper}>
          <div className={styles.headerIconBg}></div>
          <FaSeedling className={styles.headerIcon} />
        </div>
        
        <h1 className={styles.title}>
          <span className={styles.titleGradient}>{t.title}</span>
        </h1>
        
        <p className={styles.subtitle}>
          {t.subtitle}
        </p>
      </div>

      <div className={styles.contentWrapper}>
        {/* Main Form Card */}
        <div className={styles.mainCard}>
          <div className={styles.cardHeader}>
            <div>
              <h2 className={styles.cardTitle}>{t.generateAdvisory}</h2>
              <p className={styles.cardSubtitle}>{t.fillDetails}</p>
            </div>
            <div className={styles.aiBadge}>
              <FaMagic className={styles.aiIcon} />
              <span>{t.aiPowered}</span>
            </div>
          </div>

          <form onSubmit={handleGetAdvisory} className={styles.form}>
            {/* Location Input */}
            <div className={styles.formGroup}>
              <div className={styles.formLabelWrapper}>
                <label className={styles.formLabel}>
                  <FaMapMarkerAlt className={styles.labelIcon} />
                  {t.farmLocation}
                </label>
                <span className={styles.optionalBadge}>{t.optional}</span>
              </div>
              
              <div className={styles.inputWrapper}>
                <FaGlobeAmericas className={styles.inputIcon} />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={t.locationPlaceholder}
                  className={styles.input}
                />
                <button
                  type="button"
                  className={styles.detectButton}
                  onClick={handleDetectLocation}
                  disabled={locLoading}
                >
                  {locLoading ? "Detecting..." : t.autoDetect}
                </button>
              </div>
              
              <p className={styles.inputHint}>
                {t.currentlyUsing}{" "}
                <span className={styles.highlight}>
                  {farmer?.location || t.autoDetect}
                </span>
              </p>
            </div>

            {/* Soil Type Selection */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                <FaTint className={styles.labelIcon} />
                {t.soilType}
              </label>
              
              <div className={styles.soilOptions}>
                {soilTypes.map((item) => {
                  const isActive = soilType === item.type;
                  return (
                    <button
                      key={item.type}
                      type="button"
                      onClick={() => setSoilType(item.type)}
                      className={`${styles.soilOption} ${isActive ? styles.soilOptionActive : ''}`}
                    >
                      {isActive && (
                        <div className={styles.activeIndicator}>
                          <FaCheckCircle />
                        </div>
                      )}
                      
                      <div className={`${styles.soilIconWrapper} ${isActive ? styles.soilIconWrapperActive : ''}`}>
                        {item.icon}
                      </div>
                      
                      <div className={styles.soilInfo}>
                        <div className={styles.soilName}>{item.label}</div>
                        <div className={styles.soilDesc}>{item.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
              
              <p className={styles.inputHint}>
                {t.selectSoil}
              </p>
            </div>

            {/* Sowing Month Selection */}
            <div className={styles.formGroup}>
              <div className={styles.formLabelWrapper}>
                <label className={styles.formLabel}>
                  <FaCalendarAlt className={styles.labelIcon} />
                  {t.sowingSeason}
                </label>
                <span className={styles.recommendedBadge}>{t.recommended}</span>
              </div>
              
              <div className={styles.selectWrapper}>
                <FaCalendarAlt className={styles.selectIcon} />
                <select
                  value={sowingMonth}
                  onChange={(e) => setSowingMonth(e.target.value)}
                  className={styles.select}
                >
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
                <FaChevronRight className={styles.selectArrow} />
              </div>
              
              <p className={styles.inputHint}>
                {t.selectMonth}
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`${styles.submitButton} ${loading ? styles.submitButtonLoading : ''}`}
            >
              {loading ? (
                <>
                  <RiLoader4Line className={styles.spinner} />
                  <span>{t.analyzing}</span>
                </>
              ) : (
                <>
                  <FaMagic className={styles.buttonIcon} />
                  <span>{t.generateButton}</span>
                  <FaChevronRight className={styles.buttonArrow} />
                </>
              )}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className={styles.errorMessage}>
              <FaExclamationTriangle className={styles.errorIcon} />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Side Info Panel */}
        <div className={styles.sidePanel}>
          {/* Features Card */}
          <div className={styles.featuresCard}>
            <h3 className={styles.sidePanelTitle}>{t.whyUse}</h3>
            
            <div className={styles.featuresList}>
              {features.map((feature, index) => (
                <div key={index} className={styles.featureItem}>
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <div>
                    <div className={styles.featureTitle}>{feature.title}</div>
                    <div className={styles.featureDesc}>{feature.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips Card */}
          <div className={styles.tipsCard}>
            <h3 className={styles.sidePanelTitle}>{t.proTips}</h3>
            
            <div className={styles.tipsList}>
              {tips.map((tip, index) => (
                <div key={index} className={styles.tipItem}>
                  <div className={styles.tipNumber}>{index + 1}</div>
                  <span className={styles.tipText}>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Preview */}
          <div className={styles.statsCard}>
            <h3 className={styles.statsTitle}>{t.trustedByFarmers}</h3>
            
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                 <div className={styles.statNumber}>24/7</div>
                <div className={styles.statLabel}>{t.dataUpdates}</div>
                {/* <div className={styles.statNumber}>15K+</div>
                <div className={styles.statLabel}>{t.activeUsers}</div> */}
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>92%</div>
                <div className={styles.statLabel}>{t.accuracyRate}</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>50+</div>
                <div className={styles.statLabel}>{t.cropVarieties}</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>3</div> 
                <div className={styles.statLabel}>languages</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advisory Results */}
      {advisoryData && (
        <div className={styles.resultsSection}>
          <AdvisoryResult data={advisoryData} language={language} />
        </div>
      )}
    </div>
  );
};

export default AdvisoryForm;