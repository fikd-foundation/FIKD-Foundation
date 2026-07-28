// ========================================
// File: js/main.js
// Description: Enhanced main entry point
// ========================================

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        console.log('🚀 FIKD Foundation website initialized.');

        // --- Initialize all modules ---
        if (typeof window.initNavigation === 'function') window.initNavigation();
        if (typeof window.initTheme === 'function') window.initTheme();
        if (typeof window.initLanguage === 'function') window.initLanguage();
        if (typeof window.initAccessibility === 'function') window.initAccessibility();
        if (typeof window.initCounters === 'function') window.initCounters();
        if (typeof window.initAccordions === 'function') window.initAccordions();
        if (typeof window.initTabs === 'function') window.initTabs();
        if (typeof window.initTimelines === 'function') window.initTimelines();
        if (typeof window.initSliders === 'function') window.initSliders();
        if (typeof window.initGalleries === 'function') window.initGalleries();
        if (typeof window.initForms === 'function') window.initForms();
        if (typeof window.initSearch === 'function') window.initSearch();
        if (typeof window.initAnimations === 'function') window.initAnimations();

        // --- Scroll Reveal ---
        const revealElements = document.querySelectorAll('.reveal-on-scroll');
        
        if (revealElements.length) {
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            revealElements.forEach(el => revealObserver.observe(el));
        }

        // --- Staggered children ---
        const staggerElements = document.querySelectorAll('.stagger-children');
        staggerElements.forEach(el => {
            const children = el.children;
            Array.from(children).forEach((child, index) => {
                child.style.animationDelay = `${(index + 1) * 150}ms`;
            });
        });

        // --- Smooth anchor scrolling ---
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    const offset = parseInt(this.dataset.offset) || 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // --- Page load animation ---
        document.body.classList.add('loaded');
    });

    // --- Reinitialize components for dynamic content ---
    window.reinitializeComponents = function() {
        if (typeof window.initAccordions === 'function') window.initAccordions();
        if (typeof window.initTabs === 'function') window.initTabs();
        if (typeof window.initSliders === 'function') window.initSliders();
        if (typeof window.initGalleries === 'function') window.initGalleries();
        if (typeof window.initAnimations === 'function') window.initAnimations();
    };

})();
