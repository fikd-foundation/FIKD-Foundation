// ========================================
// File: js/search.js
// Description: Search functionality
// ========================================

(function() {
    'use strict';

    class Search {
        constructor(element) {
            this.element = element;
            this.input = element.querySelector('.search-input');
            this.resultsContainer = element.querySelector('.search-results');
            this.submitBtn = element.querySelector('.search-submit');

            this.init();
        }

        init() {
            if (!this.input) return;

            // Search on input
            this.input.addEventListener('input', debounce(() => {
                this.performSearch(this.input.value);
            }, 300));

            // Search on submit
            if (this.submitBtn) {
                this.submitBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.performSearch(this.input.value);
                });
            }

            // Search on Enter key
            this.input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.performSearch(this.input.value);
                }
            });

            // Clear search
            this.input.addEventListener('search', () => {
                if (!this.input.value) {
                    this.clearResults();
                }
            });

            // Close results on outside click
            document.addEventListener('click', (e) => {
                if (!this.element.contains(e.target)) {
                    this.clearResults();
                }
            });

            // Escape key to close
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.clearResults();
                    this.input.blur();
                }
            });
        }

        performSearch(query) {
            query = query.trim();

            if (!query) {
                this.clearResults();
                return;
            }

            // Get data from data attribute or use default
            const dataUrl = this.element.dataset.searchData || '/data/search-data.json';

            // Try to get cached data
            if (this._cachedData) {
                this.filterResults(query, this._cachedData);
                return;
            }

            // Fetch data
            fetch(dataUrl)
                .then(response => {
                    if (!response.ok) throw new Error('Failed to load search data');
                    return response.json();
                })
                .then(data => {
                    this._cachedData = data;
                    this.filterResults(query, data);
                })
                .catch(error => {
                    console.warn('Search data not found, using fallback:', error);
                    // Fallback: use data from the page
                    this.filterResults(query, this.getPageData());
                });
        }

        filterResults(query, data) {
            const results = data.filter(item => {
                const searchText = (item.title + ' ' + item.content + ' ' + item.tags).toLowerCase();
                return searchText.includes(query.toLowerCase());
            });

            this.renderResults(results, query);
        }

        renderResults(results, query) {
            if (!this.resultsContainer) return;

            if (results.length === 0) {
                this.resultsContainer.innerHTML = `
                    <div class="search-empty">
                        <p>No results found for "<strong>${query}</strong>"</p>
                        <small>Try different keywords or browse our categories</small>
                    </div>
                `;
                this.resultsContainer.style.display = 'block';
                return;
            }

            let html = '<ul class="search-results-list">';
            results.forEach(item => {
                const highlightedTitle = this.highlightText(item.title, query);
                const highlightedContent = this.highlightText(item.content || '', query);

                html += `
                    <li class="search-result-item">
                        <a href="${item.url || '#'}">
                            <h4>${highlightedTitle}</h4>
                            ${highlightedContent ? `<p>${highlightedContent}</p>` : ''}
                            ${item.tags ? `<span class="search-tag">${item.tags}</span>` : ''}
                        </a>
                    </li>
                `;
            });
            html += '</ul>';

            this.resultsContainer.innerHTML = html;
            this.resultsContainer.style.display = 'block';

            // Announce results
            if (window.announceContent) {
                window.announceContent(`Found ${results.length} results for "${query}"`);
            }
        }

        highlightText(text, query) {
            if (!text) return '';
            const regex = new RegExp(`(${query})`, 'gi');
            return text.replace(regex, '<mark>$1</mark>');
        }

        clearResults() {
            if (this.resultsContainer) {
                this.resultsContainer.style.display = 'none';
                this.resultsContainer.innerHTML = '';
            }
        }

        getPageData() {
            // Collect data from the page
            const data = [];

            // Get page title
            const title = document.querySelector('h1');
            if (title) {
                data.push({
                    title: title.textContent,
                    content: document.querySelector('main')?.textContent || '',
                    url: window.location.pathname
                });
            }

            // Get all headings and their content
            document.querySelectorAll('h2, h3').forEach(heading => {
                const content = heading.nextElementSibling;
                data.push({
                    title: heading.textContent,
                    content: content ? content.textContent : '',
                    url: window.location.pathname + '#' + (heading.id || '')
                });
            });

            return data;
        }
    }

    // --- Initialize all search bars ---
    function initSearch() {
        document.querySelectorAll('.search').forEach(el => {
            if (!el._search) {
                el._search = new Search(el);
            }
        });
    }

    // --- Initialize on DOM ready ---
    document.addEventListener('DOMContentLoaded', initSearch);

    // --- Re-initialize for dynamic content ---
    window.initSearch = initSearch;

})();