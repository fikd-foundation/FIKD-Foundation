// ========================================
// File: js/accessibility.js
// Description: Accessibility enhancements
// ========================================

(function() {
    'use strict';

    // --- Skip Link ---
    const skipLink = document.querySelector('.skip-link');
    const mainContent = document.getElementById('main');

    if (skipLink && mainContent) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            mainContent.focus({ preventScroll: true });
            mainContent.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // --- Keyboard navigation for dropdowns ---
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        const link = dropdown.querySelector('a[aria-haspopup="true"]');
        const menu = dropdown.querySelector('.dropdown-menu');

        if (link && menu) {
            // Open dropdown on Enter or Space
            link.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const isOpen = dropdown.classList.contains('open');
                    dropdown.classList.toggle('open');
                    this.setAttribute('aria-expanded', !isOpen);

                    if (!isOpen) {
                        const firstLink = menu.querySelector('a');
                        if (firstLink) firstLink.focus();
                    }
                }
            });

            // Close dropdown on Escape
            menu.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    dropdown.classList.remove('open');
                    link.setAttribute('aria-expanded', 'false');
                    link.focus();
                }
            });

            // Trap focus within dropdown
            menu.addEventListener('keydown', function(e) {
                if (e.key === 'Tab') {
                    const links = menu.querySelectorAll('a');
                    const firstLink = links[0];
                    const lastLink = links[links.length - 1];

                    if (e.shiftKey && document.activeElement === firstLink) {
                        e.preventDefault();
                        lastLink.focus();
                    } else if (!e.shiftKey && document.activeElement === lastLink) {
                        e.preventDefault();
                        firstLink.focus();
                    }
                }
            });
        }
    });

    // --- Ensure all images have alt text ---
    document.querySelectorAll('img').forEach(img => {
        if (!img.hasAttribute('alt') || img.getAttribute('alt') === '') {
            img.setAttribute('alt', '');
        }
    });

    // --- Add ARIA labels to interactive elements ---
    document.querySelectorAll('[role="button"]').forEach(el => {
        if (!el.hasAttribute('tabindex')) {
            el.setAttribute('tabindex', '0');
        }
    });

    // --- Focus management for page changes ---
    document.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Skip external links and hash links
            if (this.getAttribute('target') === '_blank') return;
            if (this.getAttribute('href').startsWith('#')) return;
            if (this.getAttribute('href').startsWith('http')) return;
        });
    });

    // --- Reduce motion preference ---
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {
        document.querySelectorAll('.animate-fade-in, .animate-fade-in-up, .animate-slide-in-left, .animate-slide-in-right, .animate-scale-in').forEach(el => {
            el.style.animation = 'none';
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }

    // --- Announce dynamic content updates ---
    function announceContent(message, politeness = 'polite') {
        const announcer = document.getElementById('announcer') || (() => {
            const el = document.createElement('div');
            el.id = 'announcer';
            el.setAttribute('aria-live', politeness);
            el.setAttribute('aria-atomic', 'true');
            el.className = 'sr-only';
            document.body.appendChild(el);
            return el;
        })();

        announcer.textContent = '';
        // Use setTimeout to ensure the screen reader picks up the change
        setTimeout(() => {
            announcer.textContent = message;
        }, 100);
    }

    // --- Expose announcer globally ---
    window.announceContent = announceContent;

})();