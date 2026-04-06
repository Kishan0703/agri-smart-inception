import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import AdvisoryForm from "./components/AdvisoryForm";
import HistoryPage from "./pages/HistoryPage";
import ChatBotWidget from "./components/ChatBotWidget";

// ⭐ NEW PAGES
import CropAdvicePage from "./pages/CropAdvicePage";
import LeafDiseasePage from "./pages/LeafDiseasePage";
import AgriShops from "./pages/AgriShops";

// ⭐ NEW COMPONENT (Weather Popup)
import WeatherAlertModal from "./components/WeatherAlertModal";

// ⭐ NEW COMPONENT (Screen Reader)
import ScreenReader from "./components/ScreenReader";

// ⭐ Node backend API
import API from "./components/api";

// Dev bypass: set to true to skip login/register screens.
const BYPASS_AUTH = true;

function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}

function MainApp() {
  const [farmer, setFarmer] = useState(
    BYPASS_AUTH
      ? {
          _id: "guest-farmer",
          name: "Guest Farmer",
          email: "guest@example.com",
          location: "",
        }
      : null
  );
  const [authView, setAuthView] = useState("login");
  const [loadingProfile, setLoadingProfile] = useState(!BYPASS_AUTH);
  const [showWeatherPopup, setShowWeatherPopup] = useState(false);

  const location = useLocation();

  // ⭐ Load farmer profile from token
  useEffect(() => {
    if (BYPASS_AUTH) {
      return;
    }

    const token = localStorage.getItem("farmerToken");
    if (!token) {
      setLoadingProfile(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const { data } = await API.get("/auth/me");
        setFarmer(data);
      } catch (err) {
        console.error("Profile load failed", err.message);
        localStorage.removeItem("farmerToken");
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    if (BYPASS_AUTH) {
      return;
    }

    localStorage.removeItem("farmerToken");
    setFarmer(null);
  };

  if (loadingProfile) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }

  return (
    <div className="app-container">

      {/* Navbar when logged in */}
      {farmer && <Navbar farmer={farmer} onLogout={handleLogout} />}

      <div className="main-content">
        <Routes>

          {/* --------------- PUBLIC ROUTES --------------- */}
          {!farmer && (
            <>
              <Route
                path="/"
                element={
                  authView === "login" ? (
                    <LoginForm
                      onLoginSuccess={(data) => setFarmer(data)}
                      switchToRegister={() => setAuthView("register")}
                    />
                  ) : (
                    <RegisterForm
                      onRegisterSuccess={(data) => setFarmer(data)}
                      switchToLogin={() => setAuthView("login")}
                    />
                  )
                }
              />

              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}

          {/* --------------- PRIVATE ROUTES --------------- */}
          {farmer && (
            <>
              <Route path="/" element={<AdvisoryForm farmer={farmer} />} />
              <Route path="/crop-advice/:cropName" element={<CropAdvicePage />} />
              <Route path="/chatbot" element={<ChatBotWidget fullPage={true} />} />
              <Route path="/leaf-disease" element={<LeafDiseasePage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/agrshops" element={<AgriShops farmer={farmer} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}

        </Routes>
      </div>

      {/* ⭐ Chatbot + Buttons (ONLY on Home Page) */}
      {farmer && location.pathname === "/" && (
        <div style={{ position: "fixed", bottom: "120px", right: "20px", zIndex: 999 }}>

          {/* ⭐ WEATHER ALERT BUTTON */}
          <button
            onClick={() => setShowWeatherPopup(true)}
            style={{
              marginBottom: "10px",
              padding: "10px 18px",
              backgroundColor: "#ff9800",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold",
              boxShadow: "0px 2px 6px rgba(0,0,0,0.3)"
            }}
          >
            ⚠️ Weather Alerts
          </button>

          {/* ⭐ LEAF DISEASE BUTTON */}
          {/* <button
            onClick={() => window.location.href = "/leaf-disease"}
            style={{
              marginBottom: "10px",
              padding: "10px 15px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              boxShadow: "0px 2px 6px rgba(0,0,0,0.2)"
            }}
          >
            🌿 Leaf Disease Detector
          </button> */}

          {/* Chatbot */}
          {/* <ChatBotWidget /> */}
        </div>
      )}

      {/* ⭐ WEATHER ALERT POPUP (Modal) */}
      {showWeatherPopup && (
        <WeatherAlertModal onClose={() => setShowWeatherPopup(false)} />
      )}

      {/* ⭐ SCREEN READER TOOL (Always visible) */}
      <ScreenReader />
    </div>
  );
}

export default App;
