// ========================================
// File: js/counters.js
// Description: Animated number counters
// ========================================

(function() {
    'use strict';

    class Counter {
        constructor(element) {
            this.element = element;
            this.target = parseInt(element.getAttribute('data-count')) || 0;
            this.current = 0;
            this.duration = 2000; // ms
            this.startTime = null;
            this.animated = false;
        }

        animate(timestamp) {
            if (!this.startTime) this.startTime = timestamp;

            const progress = Math.min((timestamp - this.startTime) / this.duration, 1);

            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            this.current = Math.round(easeOut * this.target);

            this.element.textContent = this.current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame((t) => this.animate(t));
            } else {
                this.element.textContent = this.target.toLocaleString();
                this.animated = true;
            }
        }

        start() {
            if (this.animated) return;
            this.startTime = null;
            requestAnimationFrame((t) => this.animate(t));
        }
    }

    // --- Initialize counters ---
    function initCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');

        if (counters.length === 0) return;

        const counterInstances = [];

        counters.forEach(el => {
            const counter = new Counter(el);
            counterInstances.push(counter);
        });

        // Use IntersectionObserver to trigger counters
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = counterInstances.find(c => c.element === entry.target);
                    if (counter) counter.start();
                }
            });
        }, { threshold: 0.5 });

        counterInstances.forEach(counter => {
            observer.observe(counter.element);
        });

        // Fallback: start counters after a delay if not triggered
        setTimeout(() => {
            counterInstances.forEach(counter => {
                if (!counter.animated) {
                    counter.start();
                }
            });
        }, 3000);
    }

    // --- Initialize on DOM ready ---
    document.addEventListener('DOMContentLoaded', initCounters);

})();