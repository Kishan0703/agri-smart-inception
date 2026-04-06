import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  
  FaUser, 
  FaSignOutAlt, 
  FaRobot,
  FaHistory,
  FaSeedling,
  FaCloudSun,
  FaBars,
  FaTimes,
  FaLeaf,
  FaShoppingCart
} from "react-icons/fa";

import styles from "./Navbar.module.css";

const Navbar = ({ farmer, onLogout }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <nav className={styles.navbar}>
        {/* Mobile Menu Toggle */}
        <button className={styles.menuToggle} onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Logo & Brand */}
        <div className={styles.navBrand}>
          <Link to="/" className={styles.logo} onClick={closeMenu}>
            <FaSeedling className={styles.logoIcon} />
            <div className={styles.logoText}>
              <span className={styles.logoTitle}>AgriSmart</span>
              <span className={styles.logoSubtitle}>AI Advisory</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className={`${styles.navLinks} ${isMenuOpen ? styles.navLinksOpen : ''}`}>
          <Link 
            to="/chatbot" 
            className={`${styles.navLink} ${isActive('/chatbot') ? styles.active : ''}`}
            onClick={closeMenu}
          >
            <FaRobot className={styles.linkIcon} />
            <span>Chatbot</span>
          </Link>
          
          <Link 
            to="/" 
            className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
            onClick={closeMenu}
          >
            <FaCloudSun className={styles.linkIcon} />
            <span>Advisory</span>
          </Link>
          
          <Link 
            to="/history" 
            className={`${styles.navLink} ${isActive('/history') ? styles.active : ''}`}
            onClick={closeMenu}
          >
            <FaHistory className={styles.linkIcon} />
            <span>History</span>
          </Link>

          <Link
            to="/agrshops"
            className={`${styles.navLink} ${isActive('/agrshops') ? styles.active : ''}`}
            onClick={closeMenu}
          >
            <FaShoppingCart className={styles.linkIcon} />
            <span>🛒 AgriShops</span>
          </Link>
          
          {farmer && (
            <Link 
              to="/leaf-disease" 
              className={`${styles.navLink} ${isActive('/leaf-disease') ? styles.active : ''}`}
              onClick={closeMenu}
            >
              <FaLeaf className={styles.linkIcon} />
              <span>Leaf Disease</span>
            </Link>
          )}
        </div>

        {/* User Actions */}
        <div className={`${styles.userSection} ${isMenuOpen ? styles.userSectionOpen : ''}`}>
          {farmer ? (
            <>
              <div className={styles.userInfo}>
                <div className={styles.userAvatar}>
                  <FaUser className={styles.avatarIcon} />
                </div>
                <div className={styles.userDetails}>
                  <span className={styles.userName}>{farmer.name}</span>
                  <span className={styles.userRole}>Farmer</span>
                </div>
              </div>
              
              <button className={styles.logoutButton} onClick={onLogout}>
                <FaSignOutAlt className={styles.logoutIcon} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div className={styles.authButtons}>
              <Link to="/login" className={styles.loginButton} onClick={closeMenu}>
                <FaUser className={styles.buttonIcon} />
                <span>Login</span>
              </Link>
              <Link to="/register" className={styles.registerButton} onClick={closeMenu}>
                <FaSeedling className={styles.buttonIcon} />
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className={styles.mobileOverlay} onClick={closeMenu}></div>
      )}
    </>
  );
};

export default Navbar;