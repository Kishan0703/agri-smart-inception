import React, { useState } from "react";
import API from "./api";
import { 
  FaUser, 
  FaLock, 
  FaSignInAlt, 
  FaSeedling, 
  FaEnvelope,
  FaExclamationTriangle,
  FaArrowRight,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";
import styles from "./LoginForm.module.css";

const LoginForm = ({ onLoginSuccess, switchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await API.post("/auth/login", { email, password });
      localStorage.setItem("farmerToken", data.token);
      onLoginSuccess(data);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.logo}>
            <FaSeedling className={styles.logoIcon} />
            <div className={styles.logoText}>
              <span className={styles.logoTitle}>AgriSmart</span>
              <span className={styles.logoSubtitle}>Welcome Back</span>
            </div>
          </div>
          <p className={styles.welcomeMessage}>
            Sign in to access your AI crop advisory dashboard
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className={styles.form}>
          {/* Email Input */}
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>
              <FaEnvelope className={styles.labelIcon} />
              Email Address
            </label>
            <div className={styles.inputWrapper}>
              <FaUser className={styles.inputIcon} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className={styles.input}
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className={styles.inputGroup}>
            <div className={styles.passwordHeader}>
              <label className={styles.inputLabel}>
                <FaLock className={styles.labelIcon} />
                Password
              </label>
              <button 
                type="button" 
                className={styles.forgotPassword}
                onClick={() => {/* Add forgot password functionality */}}
              >
                Forgot Password?
              </button>
            </div>
            <div className={styles.inputWrapper}>
              <FaLock className={styles.inputIcon} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={styles.input}
                required
                disabled={loading}
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className={styles.rememberMe}>
            <input 
              type="checkbox" 
              id="remember" 
              className={styles.checkbox}
            />
            <label htmlFor="remember" className={styles.checkboxLabel}>
              Remember me for 30 days
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <div className={styles.errorMessage}>
              <FaExclamationTriangle className={styles.errorIcon} />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`${styles.submitButton} ${loading ? styles.submitButtonLoading : ''}`}
          >
            {loading ? (
              <>
                <div className={styles.spinner}></div>
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <FaSignInAlt className={styles.buttonIcon} />
                <span>Sign In to Dashboard</span>
                <FaArrowRight className={styles.buttonArrow} />
              </>
            )}
          </button>

          {/* Divider */}
          {/* <div className={styles.divider}>
            <span>or continue with</span>
          </div> */}

          {/* Social Login (Optional) */}
          <div className={styles.socialButtons}>
            {/* <button type="button" className={styles.googleButton}>
              <svg className={styles.googleIcon} viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
            </button> */}
          </div>
        </form>

        {/* Register Link */}
        <div className={styles.registerSection}>
          <p className={styles.registerText}>
            New to AgriSmart? 
          </p>
          <button 
            type="button" 
            className={styles.registerButton}
            onClick={switchToRegister}
            disabled={loading}
          >
            <FaSeedling className={styles.registerIcon} />
            <span>Create Free Account</span>
            <FaArrowRight className={styles.registerArrow} />
          </button>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <p className={styles.footerText}>
            By signing in, you agree to our 
            <button type="button" className={styles.footerLink}>Terms of Service</button> 
            and 
            <button type="button" className={styles.footerLink}>Privacy Policy</button>
          </p>
        </div>
      </div>

      {/* Side Illustration */}
      <div className={styles.sideIllustration}>
        <div className={styles.illustrationContent}>
          <div className={styles.illustrationIcon}>
            <FaSeedling />
          </div>
          <h3 className={styles.illustrationTitle}>
            Smart Farming Made Simple
          </h3>
          <p className={styles.illustrationText}>
            Access AI-powered crop recommendations, 
            weather insights, and farm management tools 
            tailored for modern agriculture.
          </p>
          <div className={styles.featuresList}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>🌾</div>
              <span>AI Crop Advisory</span>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>🌦️</div>
              <span>Weather Intelligence</span>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>📊</div>
              <span>Yield Analytics</span>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>🤖</div>
              <span>Smart Predictions</span>
            </div>
          </div>
        </div>
        <div className={styles.illustrationBg}></div>
      </div>
    </div>
  );
};

export default LoginForm;