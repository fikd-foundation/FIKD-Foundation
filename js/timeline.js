// ========================================
// File: js/timeline.js
// Description: Interactive timeline
// ========================================

(function() {
    'use strict';

    class Timeline {
        constructor(element) {
            this.element = element;
            this.items = element.querySelectorAll('.timeline-item');
            this.currentIndex = 0;

            this.init();
        }

        init() {
            // Set up navigation buttons
            const prevBtn = this.element.querySelector('.timeline-prev');
            const nextBtn = this.element.querySelector('.timeline-next');
            const dots = this.element.querySelectorAll('.timeline-dot');

            if (prevBtn) {
                prevBtn.addEventListener('click', () => this.prev());
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', () => this.next());
            }

            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => this.goTo(index));
            });

            // Keyboard navigation
            this.element.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    this.prev();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.next();
                }
            });

            // Set initial state
            this.update(0);
        }

        goTo(index) {
            if (index < 0 || index >= this.items.length) return;
            this.update(index);
        }

        next() {
            const nextIndex = (this.currentIndex + 1) % this.items.length;
            this.update(nextIndex);
        }

        prev() {
            const prevIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
            this.update(prevIndex);
        }

        update(index) {
            this.currentIndex = index;

            // Update items
            this.items.forEach((item, i) => {
                const isActive = i === index;
                item.classList.toggle('active', isActive);
                item.setAttribute('aria-hidden', !isActive);
            });

            // Update dots
            this.element.querySelectorAll('.timeline-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
                dot.setAttribute('aria-current', i === index ? 'step' : 'false');
            });

            // Dispatch event
            this.element.dispatchEvent(new CustomEvent('timelineChange', {
                detail: {
                    index: index,
                    item: this.items[index]
                }
            }));
        }

        // Get current item
        getCurrentItem() {
            return this.items[this.currentIndex];
        }

        // Get number of items
        getTotalItems() {
            return this.items.length;
        }
    }

    // --- Initialize all timelines ---
    function initTimelines() {
        document.querySelectorAll('.timeline').forEach(el => {
            if (!el._timeline) {
                el._timeline = new Timeline(el);
            }
        });
    }

    // --- Initialize on DOM ready ---
    document.addEventListener('DOMContentLoaded', initTimelines);

    // --- Re-initialize for dynamic content ---
    window.initTimelines = initTimelines;

})();