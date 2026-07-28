// ========================================
// File: js/animations.js
// Description: Scroll-triggered animations
// ========================================

(function() {
    'use strict';

    class Animator {
        constructor() {
            this.elements = [];
            this.observer = null;
            this.init();
        }

        init() {
            this.elements = document.querySelectorAll([
                '.animate-on-scroll',
                '.stagger-children',
                '[data-animate]'
            ].join(','));

            if (this.elements.length === 0) return;

            // Check for reduced motion
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                this.elements.forEach(el => {
                    el.style.opacity = '1';
                    el.style.transform = 'none';
                });
                return;
            }

            this.setupObserver();
        }

        setupObserver() {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateElement(entry.target);
                        this.observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            this.elements.forEach(el => {
                this.observer.observe(el);
            });
        }

        animateElement(element) {
            // Get animation type from data attribute or default
            const animation = element.dataset.animate || 'fade-up';

            // Set initial state if not already set
            if (!element.style.opacity) {
                element.style.opacity = '0';
            }

            // Add animation class based on type
            const classes = {
                'fade': 'animate-fade-in',
                'fade-up': 'animate-fade-in-up',
                'fade-down': 'animate-fade-in-down',
                'slide-left': 'animate-slide-in-left',
                'slide-right': 'animate-slide-in-right',
                'scale': 'animate-scale-in'
            };

            const className = classes[animation] || 'animate-fade-in-up';
            element.classList.add(className);

            // Apply delay if specified
            if (element.dataset.delay) {
                element.style.animationDelay = `${element.dataset.delay}ms`;
            }

            // Handle stagger children
            if (element.classList.contains('stagger-children')) {
                const children = element.children;
                children.forEach((child, index) => {
                    child.style.animationDelay = `${index * 150}ms`;
                });
            }
        }

        // Force animation on specific element
        animateNow(element) {
            if (element) {
                this.animateElement(element);
                if (this.observer) {
                    this.observer.unobserve(element);
                }
            }
        }

        // Refresh observer for dynamically added content
        refresh() {
            if (this.observer) {
                this.observer.disconnect();
            }
            this.init();
        }

        // Destroy observer
        destroy() {
            if (this.observer) {
                this.observer.disconnect();
                this.observer = null;
            }
        }
    }

    // --- Initialize ---
    let animator = null;

    function initAnimations() {
        if (!animator) {
            animator = new Animator();
        } else {
            animator.refresh();
        }
    }

    // --- Initialize on DOM ready ---
    document.addEventListener('DOMContentLoaded', initAnimations);

    // --- Re-initialize for dynamic content ---
    window.initAnimations = initAnimations;

    // --- Expose animator instance ---
    window.animator = animator;

})();