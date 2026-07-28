// ========================================
// File: js/accordion.js
// Description: Accordion component
// ========================================

(function() {
    'use strict';

    class Accordion {
        constructor(element) {
            this.element = element;
            this.headers = element.querySelectorAll('.accordion-header');
            this.panels = element.querySelectorAll('.accordion-panel');

            this.init();
        }

        init() {
            // Set initial states
            this.headers.forEach((header, index) => {
                const button = header.querySelector('button') || header;
                const panel = this.panels[index];

                if (panel) {
                    const isExpanded = panel.hasAttribute('aria-hidden') && panel.getAttribute('aria-hidden') === 'false';
                    button.setAttribute('aria-expanded', isExpanded);
                    button.setAttribute('aria-controls', panel.id || `panel-${index}`);

                    if (!panel.id) {
                        panel.id = `panel-${index}`;
                    }

                    if (!isExpanded) {
                        panel.setAttribute('aria-hidden', 'true');
                    }
                }

                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggle(index);
                });

                // Keyboard support
                button.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.toggle(index);
                    }
                });
            });
        }

        toggle(index) {
            const header = this.headers[index];
            const button = header.querySelector('button') || header;
            const panel = this.panels[index];

            if (!panel) return;

            const isExpanded = button.getAttribute('aria-expanded') === 'true';

            // Close all panels if accordion is exclusive
            if (this.element.dataset.accordion === 'exclusive') {
                this.headers.forEach((h, i) => {
                    if (i !== index) {
                        const btn = h.querySelector('button') || h;
                        const p = this.panels[i];
                        btn.setAttribute('aria-expanded', 'false');
                        if (p) p.setAttribute('aria-hidden', 'true');
                    }
                });
            }

            // Toggle current panel
            button.setAttribute('aria-expanded', !isExpanded);
            panel.setAttribute('aria-hidden', isExpanded);

            // Dispatch custom event
            this.element.dispatchEvent(new CustomEvent('accordionChange', {
                detail: {
                    index: index,
                    expanded: !isExpanded
                }
            }));
        }

        // Open a specific panel
        open(index) {
            if (this.panels[index]) {
                const button = this.headers[index].querySelector('button') || this.headers[index];
                const panel = this.panels[index];

                // Close all panels
                this.headers.forEach((h, i) => {
                    const btn = h.querySelector('button') || h;
                    const p = this.panels[i];
                    btn.setAttribute('aria-expanded', 'false');
                    if (p) p.setAttribute('aria-hidden', 'true');
                });

                // Open the specified panel
                button.setAttribute('aria-expanded', 'true');
                panel.setAttribute('aria-hidden', 'false');
            }
        }

        // Close a specific panel
        close(index) {
            if (this.panels[index]) {
                const button = this.headers[index].querySelector('button') || this.headers[index];
                const panel = this.panels[index];
                button.setAttribute('aria-expanded', 'false');
                panel.setAttribute('aria-hidden', 'true');
            }
        }

        // Toggle all panels
        toggleAll(expand) {
            this.headers.forEach((header, index) => {
                const button = header.querySelector('button') || header;
                const panel = this.panels[index];
                const isExpanded = expand !== undefined ? expand : button.getAttribute('aria-expanded') !== 'true';
                button.setAttribute('aria-expanded', isExpanded);
                if (panel) panel.setAttribute('aria-hidden', !isExpanded);
            });
        }
    }

    // --- Initialize all accordions ---
    function initAccordions() {
        document.querySelectorAll('.accordion').forEach(el => {
            // Store instance on element
            if (!el._accordion) {
                el._accordion = new Accordion(el);
            }
        });
    }

    // --- Initialize on DOM ready ---
    document.addEventListener('DOMContentLoaded', initAccordions);

    // --- Re-initialize for dynamic content ---
    window.initAccordions = initAccordions;

})();