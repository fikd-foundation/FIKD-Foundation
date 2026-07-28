// ========================================
// File: js/gallery.js
// Description: Image gallery with lightbox
// ========================================

(function() {
    'use strict';

    class Gallery {
        constructor(element) {
            this.element = element;
            this.items = element.querySelectorAll('.gallery-item');
            this.currentIndex = 0;

            this.init();
        }

        init() {
            this.items.forEach((item, index) => {
                item.addEventListener('click', () => this.openLightbox(index));

                // Keyboard support
                item.setAttribute('tabindex', '0');
                item.setAttribute('role', 'button');
                item.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.openLightbox(index);
                    }
                });
            });
        }

        openLightbox(index) {
            this.currentIndex = index;

            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.setAttribute('role', 'dialog');
            lightbox.setAttribute('aria-modal', 'true');
            lightbox.setAttribute('aria-label', 'Image gallery');

            // Content
            const content = document.createElement('div');
            content.className = 'lightbox-content';

            const img = this.items[index].querySelector('img');
            const imgClone = img ? img.cloneNode(true) : document.createElement('img');

            // Close button
            const closeBtn = document.createElement('button');
            closeBtn.className = 'lightbox-close';
            closeBtn.setAttribute('aria-label', 'Close gallery');
            closeBtn.innerHTML = '×';
            closeBtn.addEventListener('click', () => this.closeLightbox());

            // Navigation
            const prevBtn = document.createElement('button');
            prevBtn.className = 'lightbox-prev';
            prevBtn.setAttribute('aria-label', 'Previous image');
            prevBtn.innerHTML = '‹';
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.navigateLightbox(-1);
            });

            const nextBtn = document.createElement('button');
            nextBtn.className = 'lightbox-next';
            nextBtn.setAttribute('aria-label', 'Next image');
            nextBtn.innerHTML = '›';
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.navigateLightbox(1);
            });

            // Counter
            const counter = document.createElement('span');
            counter.className = 'lightbox-counter';
            counter.textContent = `${index + 1} / ${this.items.length}`;

            // Caption
            const caption = document.createElement('figcaption');
            caption.className = 'lightbox-caption';
            const figcaption = this.items[index].querySelector('figcaption');
            if (figcaption) {
                caption.textContent = figcaption.textContent;
            }

            content.appendChild(imgClone);
            content.appendChild(closeBtn);
            content.appendChild(prevBtn);
            content.appendChild(nextBtn);
            content.appendChild(counter);
            content.appendChild(caption);

            lightbox.appendChild(content);
            document.body.appendChild(lightbox);

            // Prevent body scroll
            document.body.style.overflow = 'hidden';

            // Close on background click
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    this.closeLightbox();
                }
            });

            // Keyboard navigation
            const keyHandler = (e) => {
                if (e.key === 'Escape') {
                    this.closeLightbox();
                } else if (e.key === 'ArrowLeft') {
                    this.navigateLightbox(-1);
                } else if (e.key === 'ArrowRight') {
                    this.navigateLightbox(1);
                }
            };

            document.addEventListener('keydown', keyHandler);
            lightbox._keyHandler = keyHandler;

            // Focus trap
            const focusable = content.querySelectorAll('button');
            if (focusable.length) {
                focusable[0].focus();
            }

            // Animate in
            requestAnimationFrame(() => {
                lightbox.classList.add('active');
            });

            // Store reference
            this._lightbox = lightbox;
        }

        closeLightbox() {
            const lightbox = this._lightbox;
            if (!lightbox) return;

            lightbox.classList.remove('active');

            // Remove after animation
            setTimeout(() => {
                document.body.removeChild(lightbox);
                document.body.style.overflow = '';
                if (lightbox._keyHandler) {
                    document.removeEventListener('keydown', lightbox._keyHandler);
                }
                this._lightbox = null;

                // Focus back to gallery
                if (this.items[this.currentIndex]) {
                    this.items[this.currentIndex].focus();
                }
            }, 300);
        }

        navigateLightbox(direction) {
            const newIndex = this.currentIndex + direction;
            if (newIndex < 0 || newIndex >= this.items.length) return;

            this.currentIndex = newIndex;

            // Update lightbox content
            const lightbox = this._lightbox;
            if (!lightbox) return;

            const content = lightbox.querySelector('.lightbox-content');
            const img = this.items[newIndex].querySelector('img');
            const imgClone = img ? img.cloneNode(true) : document.createElement('img');

            // Update image
            const existingImg = content.querySelector('img');
            if (existingImg) {
                content.replaceChild(imgClone, existingImg);
            }

            // Update counter
            const counter = content.querySelector('.lightbox-counter');
            if (counter) {
                counter.textContent = `${newIndex + 1} / ${this.items.length}`;
            }

            // Update caption
            const caption = content.querySelector('.lightbox-caption');
            if (caption) {
                const figcaption = this.items[newIndex].querySelector('figcaption');
                caption.textContent = figcaption ? figcaption.textContent : '';
            }

            // Update navigation focus
            const prevBtn = content.querySelector('.lightbox-prev');
            const nextBtn = content.querySelector('.lightbox-next');
            const focused = document.activeElement;

            if (focused === prevBtn || focused === nextBtn) {
                // Keep focus on navigation
            }
        }
    }

    // --- Initialize all galleries ---
    function initGalleries() {
        document.querySelectorAll('.gallery').forEach(el => {
            if (!el._gallery) {
                el._gallery = new Gallery(el);
            }
        });
    }

    // --- Initialize on DOM ready ---
    document.addEventListener('DOMContentLoaded', initGalleries);

    // --- Re-initialize for dynamic content ---
    window.initGalleries = initGalleries;

})();