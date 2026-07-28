// ========================================
// File: js/slider.js
// Description: Image slider/carousel
// ========================================

(function() {
    'use strict';

    class Slider {
        constructor(element) {
            this.element = element;
            this.slides = element.querySelectorAll('.slider-slide');
            this.slideCount = this.slides.length;

            if (this.slideCount === 0) return;

            this.currentIndex = 0;
            this.autoplayInterval = null;
            this.autoplayDelay = parseInt(element.dataset.autoplay) || 5000;
            this.isAutoplay = element.dataset.autoplay !== 'false';

            this.init();
        }

        init() {
            // Create navigation
            this.createNavigation();

            // Set initial state
            this.goTo(0);

            // Start autoplay
            if (this.isAutoplay && this.slideCount > 1) {
                this.startAutoplay();
            }

            // Pause on hover
            if (this.isAutoplay) {
                this.element.addEventListener('mouseenter', () => this.stopAutoplay());
                this.element.addEventListener('mouseleave', () => this.startAutoplay());
            }

            // Touch events for mobile
            let touchStartX = 0;
            let touchEndX = 0;

            this.element.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            this.element.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                const diff = touchStartX - touchEndX;

                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        this.next();
                    } else {
                        this.prev();
                    }
                }
            }, { passive: true });

            // Keyboard navigation
            this.element.setAttribute('tabindex', '0');
            this.element.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    this.prev();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.next();
                }
            });
        }

        createNavigation() {
            // Create dots
            const dotsContainer = this.element.querySelector('.slider-dots');
            if (dotsContainer) {
                for (let i = 0; i < this.slideCount; i++) {
                    const dot = document.createElement('button');
                    dot.className = 'slider-dot';
                    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                    dot.dataset.index = i;
                    dot.addEventListener('click', () => this.goTo(i));
                    dotsContainer.appendChild(dot);
                }
            }

            // Create prev/next buttons if they don't exist
            const prevBtn = this.element.querySelector('.slider-prev');
            const nextBtn = this.element.querySelector('.slider-next');

            if (prevBtn) {
                prevBtn.addEventListener('click', () => this.prev());
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', () => this.next());
            }

            // If no buttons exist, create them
            if (!prevBtn && !nextBtn && this.slideCount > 1) {
                const controls = this.element.querySelector('.slider-controls') || this.element;
                const prev = document.createElement('button');
                prev.className = 'slider-prev';
                prev.setAttribute('aria-label', 'Previous slide');
                prev.innerHTML = '‹';
                prev.addEventListener('click', () => this.prev());

                const next = document.createElement('button');
                next.className = 'slider-next';
                next.setAttribute('aria-label', 'Next slide');
                next.innerHTML = '›';
                next.addEventListener('click', () => this.next());

                controls.prepend(prev);
                controls.appendChild(next);
            }
        }

        goTo(index) {
            if (index < 0) index = this.slideCount - 1;
            if (index >= this.slideCount) index = 0;

            this.currentIndex = index;

            this.slides.forEach((slide, i) => {
                const isActive = i === index;
                slide.classList.toggle('active', isActive);
                slide.setAttribute('aria-hidden', !isActive);
            });

            // Update dots
            this.element.querySelectorAll('.slider-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            // Dispatch event
            this.element.dispatchEvent(new CustomEvent('slideChange', {
                detail: {
                    index: index,
                    slide: this.slides[index]
                }
            }));
        }

        next() {
            this.goTo(this.currentIndex + 1);
        }

        prev() {
            this.goTo(this.currentIndex - 1);
        }

        startAutoplay() {
            if (this.autoplayInterval) {
                clearInterval(this.autoplayInterval);
            }
            if (this.slideCount > 1) {
                this.autoplayInterval = setInterval(() => {
                    this.next();
                }, this.autoplayDelay);
            }
        }

        stopAutoplay() {
            if (this.autoplayInterval) {
                clearInterval(this.autoplayInterval);
                this.autoplayInterval = null;
            }
        }

        // Reset autoplay timer
        resetAutoplay() {
            if (this.isAutoplay) {
                this.stopAutoplay();
                this.startAutoplay();
            }
        }

        // Go to specific slide and reset autoplay
        goToAndReset(index) {
            this.goTo(index);
            this.resetAutoplay();
        }

        // Destroy slider
        destroy() {
            this.stopAutoplay();
            // Clean up event listeners
            this.element.querySelectorAll('.slider-prev, .slider-next, .slider-dot').forEach(el => {
                el.replaceWith(el.cloneNode(true));
            });
        }
    }

    // --- Initialize all sliders ---
    function initSliders() {
        document.querySelectorAll('.slider').forEach(el => {
            if (!el._slider) {
                el._slider = new Slider(el);
            }
        });
    }

    // --- Initialize on DOM ready ---
    document.addEventListener('DOMContentLoaded', initSliders);

    // --- Re-initialize for dynamic content ---
    window.initSliders = initSliders;

})();