// ========================================
// File: js/utils.js
// Description: Utility functions
// ========================================

/**
 * Debounce function to limit how often a function is called
 */
function debounce(func, wait = 100) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to limit function calls
 */
function throttle(func, limit = 100) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element, offset = 0) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top + offset < window.innerHeight &&
        rect.bottom > 0
    );
}

/**
 * Get data attribute value from element
 */
function getData(element, key) {
    return element.dataset[key];
}

/**
 * Set data attribute on element
 */
function setData(element, key, value) {
    element.dataset[key] = value;
}

/**
 * Generate random ID
 */
function generateId(prefix = 'id') {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Format number with commas
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Get element or throw error
 */
function getElement(selector, context = document) {
    const el = context.querySelector(selector);
    if (!el) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
    return el;
}

/**
 * Get all elements
 */
function getElements(selector, context = document) {
    return context.querySelectorAll(selector);
}

/**
 * Add class to element
 */
function addClass(element, className) {
    if (element) element.classList.add(className);
}

/**
 * Remove class from element
 */
function removeClass(element, className) {
    if (element) element.classList.remove(className);
}

/**
 * Toggle class on element
 */
function toggleClass(element, className) {
    if (element) element.classList.toggle(className);
}

/**
 * Check if element has class
 */
function hasClass(element, className) {
    return element ? element.classList.contains(className) : false;
}

/**
 * Create element with attributes and children
 */
function createElement(tag, attributes = {}, children = []) {
    const el = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'className') {
            el.className = value;
        } else if (key === 'html') {
            el.innerHTML = value;
        } else {
            el.setAttribute(key, value);
        }
    });
    children.forEach(child => {
        if (typeof child === 'string') {
            el.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
            el.appendChild(child);
        }
    });
    return el;
}

// Export utilities
const Utils = {
    debounce,
    throttle,
    isInViewport,
    getData,
    setData,
    generateId,
    formatNumber,
    getElement,
    getElements,
    addClass,
    removeClass,
    toggleClass,
    hasClass,
    createElement
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}