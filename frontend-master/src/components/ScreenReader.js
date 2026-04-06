import React, { useState } from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import styles from "./ScreenReader.module.css";

const ScreenReader = () => {
  const [isReading, setIsReading] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState(null);

  React.useEffect(() => {
    if ('speechSynthesis' in window) {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

  const extractVisibleText = () => {
    // Get all text content from the current page
    const elements = document.querySelectorAll('*');
    let visibleText = '';

    elements.forEach(element => {
      // Check if element is visible
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top >= 0 &&
                       rect.left >= 0 &&
                       rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                       rect.right <= (window.innerWidth || document.documentElement.clientWidth);

      if (isVisible && element.textContent && element.textContent.trim()) {
        // Skip script, style, hidden elements, and navbar
        const tagName = element.tagName.toLowerCase();
        const display = window.getComputedStyle(element).display;
        const visibility = window.getComputedStyle(element).visibility;

        // Skip navbar elements
        const isNavbar = element.closest('.navbar') ||
                        element.closest('[class*="nav"]') ||
                        element.closest('nav') ||
                        element.classList.contains('navbar') ||
                        element.classList.contains('nav');

        if (tagName !== 'script' && tagName !== 'style' &&
            display !== 'none' && visibility !== 'hidden' &&
            !element.classList.contains('screen-reader-button') &&
            !isNavbar) {
          visibleText += element.textContent.trim() + ' ';
        }
      }
    });

    return visibleText.replace(/\s+/g, ' ').trim();
  };

  const detectLanguage = (text) => {
    // Try to detect language from HTML lang attribute first
    const htmlLang = document.documentElement.lang || document.documentElement.getAttribute('lang');
    if (htmlLang) {
      return htmlLang;
    }

    // Simple language detection based on common patterns
    const textLower = text.toLowerCase();

    // Kannada detection (common in your app)
    if (textLower.includes('ನ') || textLower.includes('ಮ') || textLower.includes('ಸ')) {
      return 'kn-IN'; // Kannada
    }

    // Hindi detection
    if (textLower.includes('ह') || textLower.includes('क') || textLower.includes('ग') ||
        textLower.includes('ख') || textLower.includes('घ')) {
      return 'hi-IN'; // Hindi
    }

    // Tamil detection
    if (textLower.includes('அ') || textLower.includes('இ') || textLower.includes('உ')) {
      return 'ta-IN'; // Tamil
    }

    // Telugu detection
    if (textLower.includes('అ') || textLower.includes('ఇ') || textLower.includes('ఉ')) {
      return 'te-IN'; // Telugu
    }

    // Default to English
    return 'en-US';
  };

  const handleReadScreen = () => {
    if (!speechSynthesis) {
      alert('Text-to-speech is not supported in your browser.');
      return;
    }

    if (isReading) {
      // Stop reading
      speechSynthesis.cancel();
      setIsReading(false);
    } else {
      // Start reading
      const text = extractVisibleText();

      if (!text) {
        alert('No readable text found on the screen.');
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = detectLanguage(text); // Auto-detect language
      utterance.rate = 0.8; // Slightly slower for clarity
      utterance.pitch = 1;

      utterance.onstart = () => setIsReading(true);
      utterance.onend = () => setIsReading(false);
      utterance.onerror = () => setIsReading(false);

      speechSynthesis.speak(utterance);
    }
  };

  return (
    <button
      className={`${styles.screenReaderButton} ${isReading ? styles.reading : ''}`}
      onClick={handleReadScreen}
      title={isReading ? "Stop reading" : "Read screen content"}
    >
      {isReading ? <FaVolumeMute /> : <FaVolumeUp />}
    </button>
  );
};

export default ScreenReader;