// Language Detection and Auto-Redirect
(function() {
    'use strict';

    const LANGUAGE_KEY = 'preferred_language';
    const RUSSIAN_PAGE = 'index.html';
    const ENGLISH_PAGE = 'index-en.html';

    // Get current page
    function getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('index-en.html')) {
            return 'en';
        }
        return 'ru';
    }

    // Get browser language
    function getBrowserLanguage() {
        const lang = navigator.language || navigator.userLanguage;
        // Check for Russian language codes
        if (lang.toLowerCase().startsWith('ru')) {
            return 'ru';
        }
        // Default to English for all other languages
        return 'en';
    }

    // Get saved language preference
    function getSavedLanguage() {
        try {
            return localStorage.getItem(LANGUAGE_KEY);
        } catch (e) {
            return null;
        }
    }

    // Save language preference
    function saveLanguage(lang) {
        try {
            localStorage.setItem(LANGUAGE_KEY, lang);
        } catch (e) {
            // localStorage not available
        }
    }

    // Redirect to appropriate page
    function redirectToLanguage(targetLang) {
        const currentPage = getCurrentPage();

        // Don't redirect if already on correct page
        if (currentPage === targetLang) {
            return;
        }

        // Redirect
        if (targetLang === 'ru') {
            window.location.href = RUSSIAN_PAGE;
        } else {
            window.location.href = ENGLISH_PAGE;
        }
    }

    // Initialize language detection
    function initLanguageDetection() {
        const currentPage = getCurrentPage();
        const savedLanguage = getSavedLanguage();

        // If user has saved preference, use it
        if (savedLanguage) {
            if (savedLanguage !== currentPage) {
                redirectToLanguage(savedLanguage);
            }
            return;
        }

        // First visit - detect browser language
        const browserLang = getBrowserLanguage();

        // Save browser language as preference
        saveLanguage(browserLang);

        // Redirect if needed
        if (browserLang !== currentPage) {
            redirectToLanguage(browserLang);
        }
    }

    // Save language when user clicks language button
    function setupLanguageButtons() {
        // Wait for DOM to load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', addLanguageListeners);
        } else {
            addLanguageListeners();
        }
    }

    function addLanguageListeners() {
        const langButtons = document.querySelectorAll('.lang-button');

        langButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                // Determine language from href
                if (href.includes('index-en.html')) {
                    saveLanguage('en');
                } else {
                    saveLanguage('ru');
                }
            });
        });
    }

    // Run detection on page load
    initLanguageDetection();
    setupLanguageButtons();

})();
