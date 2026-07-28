// ========================================
// File: js/theme.js
// Description: Dark/Light theme toggle
// ========================================

(function() {
    'use strict';

    const themeToggle = document.getElementById('themeToggle');
    const STORAGE_KEY = 'fikd-theme';

    // --- Get stored theme ---
    function getStoredTheme() {
        return localStorage.getItem(STORAGE_KEY);
    }

    // --- Get system preference ---
    function getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // --- Set theme ---
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);

        // Update toggle button icon if exists
        if (themeToggle) {
            const iconSun = themeToggle.querySelector('.icon-sun');
            const iconMoon = themeToggle.querySelector('.icon-moon');

            if (iconSun && iconMoon) {
                if (theme === 'dark') {
                    iconSun.style.display = 'none';
                    iconMoon.style.display = 'inline';
                } else {
                    iconSun.style.display = 'inline';
                    iconMoon.style.display = 'none';
                }
            }
        }
    }

    // --- Toggle theme ---
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    }

    // --- Initialize theme ---
    function initTheme() {
        const stored = getStoredTheme();
        let theme;

        if (stored) {
            theme = stored;
        } else {
            theme = getSystemTheme();
        }

        setTheme(theme);
    }

    // --- Event listeners ---
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);

        // Accessibility: allow keyboard activation
        themeToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
            }
        });
    }

    // --- Listen for system theme changes ---
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!getStoredTheme()) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // --- Initialize ---
    document.addEventListener('DOMContentLoaded', initTheme);

})();