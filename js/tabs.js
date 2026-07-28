// ========================================
// File: js/tabs.js
// Description: Tabs component
// ========================================

(function() {
    'use strict';

    class Tabs {
        constructor(element) {
            this.element = element;
            this.tabs = element.querySelectorAll('[role="tab"]');
            this.panels = [];

            this.tabs.forEach(tab => {
                const panelId = tab.getAttribute('aria-controls');
                if (panelId) {
                    const panel = document.getElementById(panelId);
                    if (panel) {
                        this.panels.push(panel);
                    }
                }
            });

            this.init();
        }

        init() {
            // Set initial state
            this.tabs.forEach((tab, index) => {
                const isSelected = tab.getAttribute('aria-selected') === 'true';

                tab.setAttribute('role', 'tab');
                tab.setAttribute('tabindex', isSelected ? '0' : '-1');

                if (this.panels[index]) {
                    this.panels[index].setAttribute('role', 'tabpanel');
                    this.panels[index].setAttribute('aria-labelledby', tab.id);
                    this.panels[index].hidden = !isSelected;
                }

                tab.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.select(index);
                });

                tab.addEventListener('keydown', (e) => {
                    let newIndex = index;

                    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                        e.preventDefault();
                        newIndex = (index + 1) % this.tabs.length;
                    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                        e.preventDefault();
                        newIndex = (index - 1 + this.tabs.length) % this.tabs.length;
                    } else if (e.key === 'Home') {
                        e.preventDefault();
                        newIndex = 0;
                    } else if (e.key === 'End') {
                        e.preventDefault();
                        newIndex = this.tabs.length - 1;
                    }

                    this.select(newIndex);
                    this.tabs[newIndex].focus();
                });
            });

            // Set tablist role
            const tablist = this.element.querySelector('[role="tablist"]');
            if (tablist) {
                tablist.setAttribute('role', 'tablist');
            }
        }

        select(index) {
            if (index < 0 || index >= this.tabs.length) return;

            // Update tabs
            this.tabs.forEach((tab, i) => {
                const isSelected = i === index;
                tab.setAttribute('aria-selected', isSelected);
                tab.setAttribute('tabindex', isSelected ? '0' : '-1');

                if (this.panels[i]) {
                    this.panels[i].hidden = !isSelected;
                }
            });

            // Dispatch custom event
            this.element.dispatchEvent(new CustomEvent('tabChange', {
                detail: {
                    index: index,
                    tab: this.tabs[index],
                    panel: this.panels[index]
                }
            }));
        }

        // Get current selected tab index
        getSelectedIndex() {
            for (let i = 0; i < this.tabs.length; i++) {
                if (this.tabs[i].getAttribute('aria-selected') === 'true') {
                    return i;
                }
            }
            return 0;
        }
    }

    // --- Initialize all tabs ---
    function initTabs() {
        document.querySelectorAll('.tabs').forEach(el => {
            if (!el._tabs) {
                el._tabs = new Tabs(el);
            }
        });
    }

    // --- Initialize on DOM ready ---
    document.addEventListener('DOMContentLoaded', initTabs);

    // --- Re-initialize for dynamic content ---
    window.initTabs = initTabs;

})();