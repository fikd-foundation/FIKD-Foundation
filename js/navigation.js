// ========================================
// File: js/navigation.js
// Description: Navigation functionality
// ========================================

(function() {
    'use strict';

    const navToggle = document.getElementById('navToggle');
    const mainNav = document.getElementById('mainNav');
    const dropdowns = document.querySelectorAll('.dropdown');

    // --- Mobile Nav Toggle ---
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', function() {
            const isOpen = mainNav.classList.toggle('open');
            this.setAttribute('aria-expanded', isOpen);
            this.classList.toggle('active');
        });

        // Close nav on outside click
        document.addEventListener('click', function(e) {
            if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) {
                mainNav.classList.remove('open');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Close nav on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mainNav.classList.contains('open')) {
                mainNav.classList.remove('open');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.focus();
            }
        });
    }

    // --- Dropdown Toggle for Mobile ---
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a[aria-haspopup="true"]');

        if (link) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 1024) {
                    e.preventDefault();
                    dropdown.classList.toggle('open');
                    const expanded = dropdown.classList.contains('open');
                    this.setAttribute('aria-expanded', expanded);
                }
            });

            // Close dropdown on outside click
            document.addEventListener('click', function(e) {
                if (!dropdown.contains(e.target) && window.innerWidth <= 1024) {
                    dropdown.classList.remove('open');
                    link.setAttribute('aria-expanded', 'false');
                }
            });
        }

        // Hover support for desktop
        if (window.innerWidth > 1024) {
            dropdown.addEventListener('mouseenter', function() {
                const link = this.querySelector('a[aria-haspopup="true"]');
                if (link) link.setAttribute('aria-expanded', 'true');
            });

            dropdown.addEventListener('mouseleave', function() {
                const link = this.querySelector('a[aria-haspopup="true"]');
                if (link) link.setAttribute('aria-expanded', 'false');
            });
        }
    });

    // --- Active Link Highlight ---
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-list a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href !== '#') {
            // Handle relative paths
            const linkPath = href.replace(/^\.\.\//, '/');
            const cleanPath = currentPath.replace(/\/index\.html$/, '/');

            if (cleanPath === linkPath || cleanPath + '/' === linkPath) {
                link.classList.add('active');
            }
        }
    });

    // --- Header Scroll Effect ---
    const header = document.querySelector('.site-header');
    let lastScrollY = 0;

    if (header) {
        window.addEventListener('scroll', throttle(() => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScrollY = currentScrollY;
        }, 50), { passive: true });
    }

})();