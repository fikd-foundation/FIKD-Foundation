// ========================================
// File: js/language.js
// Description: Language toggle functionality
// ========================================

(function() {
    'use strict';

    const langToggle = document.getElementById('langToggle');
    const STORAGE_KEY = 'fikd-lang';

    // --- Supported languages ---
    const languages = {
        en: {
            code: 'en',
            dir: 'ltr',
            label: 'EN'
        },
        ar: {
            code: 'ar',
            dir: 'rtl',
            label: 'AR'
        }
    };

    // --- Get stored language ---
    function getStoredLanguage() {
        return localStorage.getItem(STORAGE_KEY) || 'en';
    }

    // --- Set language ---
    function setLanguage(langCode) {
        const lang = languages[langCode];
        if (!lang) return;

        // Set HTML attributes
        document.documentElement.lang = lang.code;
        document.documentElement.dir = lang.dir;

        // Update toggle button text
        if (langToggle) {
            const currentLang = lang.code === 'en' ? 'ar' : 'en';
            const nextLang = languages[currentLang];
            langToggle.textContent = nextLang ? nextLang.label : 'EN';

            // Set aria-label
            langToggle.setAttribute('aria-label', `Switch to ${currentLang === 'en' ? 'Arabic' : 'English'}`);
        }

        // Store preference
        localStorage.setItem(STORAGE_KEY, lang.code);
    }

    // --- Toggle language ---
    function toggleLanguage() {
        const currentLang = document.documentElement.lang || 'en';
        const nextLang = currentLang === 'en' ? 'ar' : 'en';
        setLanguage(nextLang);

        // Dispatch event for other scripts
        document.dispatchEvent(new CustomEvent('languageChange', {
            detail: { language: nextLang }
        }));
    }

    // --- Initialize ---
    function initLanguage() {
        const stored = getStoredLanguage();
        setLanguage(stored);
    }

    // --- Event listeners ---
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);

        // Accessibility: allow keyboard activation
        langToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleLanguage();
            }
        });
    }

    // --- Initialize ---
    document.addEventListener('DOMContentLoaded', initLanguage);

})();