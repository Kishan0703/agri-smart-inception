import React, { useState } from "react";
import API from "./api";
import { 
  FaUser, 
  FaLock, 
  FaUserPlus, 
  FaSeedling, 
  FaEnvelope,
  FaMapMarkerAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaArrowRight,
  FaEye,
  FaEyeSlash,
  FaGlobe
} from "react-icons/fa";
import styles from "./RegisterForm.module.css";

const RegisterForm = ({ onRegisterSuccess, switchToLogin }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      const { data } = await API.post("/auth/register", {
        name,
        email,
        password,
        location,
      });
      localStorage.setItem("farmerToken", data.token);
      setSuccess("Registration successful! Welcome to AgriSmart.");
      
      // Auto-redirect after success
      setTimeout(() => {
        onRegisterSuccess(data);
      }, 1500);
      
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = () => {
    if (password.length === 0) return 0;
    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getStrengthColor = () => {
    const strength = passwordStrength();
    if (strength === 0) return 'transparent';
    if (strength === 1) return '#ef4444'; // red
    if (strength === 2) return '#f59e0b'; // amber
    if (strength === 3) return '#22c55e'; // emerald
    return '#16a34a'; // strong green
  };

  return (
    <div className={styles.container}>
      <div className={styles.registerCard}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.logo}>
            <FaSeedling className={styles.logoIcon} />
            <div className={styles.logoText}>
              <span className={styles.logoTitle}>AgriSmart</span>
              <span className={styles.logoSubtitle}>Join Our Community</span>
            </div>
          </div>
          <p className={styles.welcomeMessage}>
            Create your account to access AI-powered farming insights
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleRegister} className={styles.form}>
          {/* Name Input */}
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>
              <FaUser className={styles.labelIcon} />
              Full Name
            </label>
            <div className={styles.inputWrapper}>
              <FaUser className={styles.inputIcon} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className={styles.input}
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Email Input */}
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>
              <FaEnvelope className={styles.labelIcon} />
              Email Address
            </label>
            <div className={styles.inputWrapper}>
              <FaEnvelope className={styles.inputIcon} />
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

          {/* Location Input */}
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>
              <FaMapMarkerAlt className={styles.labelIcon} />
              Farm Location
              <span className={styles.optional}>(Optional)</span>
            </label>
            <div className={styles.inputWrapper}>
              <FaGlobe className={styles.inputIcon} />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Delhi, India or coordinates"
                className={styles.input}
                disabled={loading}
              />
            </div>
            <p className={styles.inputHint}>
              This helps us provide location-specific crop recommendations
            </p>
          </div>

          {/* Password Input */}
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>
              <FaLock className={styles.labelIcon} />
              Password
            </label>
            <div className={styles.inputWrapper}>
              <FaLock className={styles.inputIcon} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
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
            
            {/* Password Strength Indicator */}
            {password && (
              <div className={styles.passwordStrength}>
                <div className={styles.strengthBar}>
                  <div 
                    className={styles.strengthFill}
                    style={{ 
                      width: `${passwordStrength() * 25}%`,
                      backgroundColor: getStrengthColor()
                    }}
                  ></div>
                </div>
                <div className={styles.strengthText}>
                  {passwordStrength() === 0 && "Enter password"}
                  {passwordStrength() === 1 && "Weak"}
                  {passwordStrength() === 2 && "Fair"}
                  {passwordStrength() === 3 && "Good"}
                  {passwordStrength() === 4 && "Strong"}
                </div>
              </div>
            )}

            {/* Password Requirements */}
            <div className={styles.passwordRequirements}>
              <div className={`${styles.requirement} ${password.length >= 6 ? styles.requirementMet : ''}`}>
                <div className={styles.requirementIcon}>
                  {password.length >= 6 ? '✓' : '•'}
                </div>
                <span>At least 6 characters</span>
              </div>
              <div className={`${styles.requirement} ${/[A-Z]/.test(password) ? styles.requirementMet : ''}`}>
                <div className={styles.requirementIcon}>
                  {/[A-Z]/.test(password) ? '✓' : '•'}
                </div>
                <span>One uppercase letter</span>
              </div>
              <div className={`${styles.requirement} ${/[0-9]/.test(password) ? styles.requirementMet : ''}`}>
                <div className={styles.requirementIcon}>
                  {/[0-9]/.test(password) ? '✓' : '•'}
                </div>
                <span>One number</span>
              </div>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>
              <FaLock className={styles.labelIcon} />
              Confirm Password
            </label>
            <div className={styles.inputWrapper}>
              <FaLock className={styles.inputIcon} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className={styles.input}
                required
                disabled={loading}
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {confirmPassword && password !== confirmPassword && (
              <p className={styles.passwordMismatch}>Passwords do not match</p>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className={styles.terms}>
            <input 
              type="checkbox" 
              id="terms" 
              className={styles.checkbox}
              required
            />
            <label htmlFor="terms" className={styles.checkboxLabel}>
              I agree to the <button type="button" className={styles.termsLink}>Terms of Service</button> and <button type="button" className={styles.termsLink}>Privacy Policy</button>
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <div className={styles.errorMessage}>
              <FaExclamationTriangle className={styles.errorIcon} />
              <span>{error}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className={styles.successMessage}>
              <FaCheckCircle className={styles.successIcon} />
              <span>{success}</span>
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
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <FaUserPlus className={styles.buttonIcon} />
                <span>Create Free Account</span>
                <FaArrowRight className={styles.buttonArrow} />
              </>
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className={styles.loginSection}>
          <p className={styles.loginText}>
            Already have an account? 
          </p>
          <button 
            type="button" 
            className={styles.loginButton}
            onClick={switchToLogin}
            disabled={loading}
          >
            <FaUser className={styles.loginIcon} />
            <span>Sign In to Your Account</span>
            <FaArrowRight className={styles.loginArrow} />
          </button>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <p className={styles.footerText}>
            By registering, you agree to receive occasional updates about farming tips and new features. You can unsubscribe anytime.
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
            Join Thousands of Smart Farmers
          </h3>
          <p className={styles.illustrationText}>
            Access premium features designed to optimize your farming operations and increase yields.
          </p>
          <div className={styles.benefitsList}>
            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}>🤖</div>
              <div className={styles.benefitContent}>
                <div className={styles.benefitTitle}>AI-Powered Insights</div>
                <div className={styles.benefitDesc}>Get personalized crop recommendations</div>
              </div>
            </div>
            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}>🌦️</div>
              <div className={styles.benefitContent}>
                <div className={styles.benefitTitle}>Weather Intelligence</div>
                <div className={styles.benefitDesc}>Real-time forecasts and alerts</div>
              </div>
            </div>
            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}>📊</div>
              <div className={styles.benefitContent}>
                <div className={styles.benefitTitle}>Farm Analytics</div>
                <div className={styles.benefitDesc}>Track and optimize your farm performance</div>
              </div>
            </div>
            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}>👨‍🌾</div>
              <div className={styles.benefitContent}>
                <div className={styles.benefitTitle}>Community Support</div>
                <div className={styles.benefitDesc}>Connect with other farmers</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.illustrationBg}></div>
      </div>
    </div>
  );
};

export default RegisterForm;