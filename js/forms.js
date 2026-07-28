// ========================================
// File: js/forms.js
// Description: Form validation and handling
// ========================================

(function() {
    'use strict';

    class FormHandler {
        constructor(form) {
            this.form = form;
            this.fields = form.querySelectorAll('input, textarea, select');
            this.submitBtn = form.querySelector('[type="submit"]');

            this.init();
        }

        init() {
            // Add validation on blur
            this.fields.forEach(field => {
                field.addEventListener('blur', () => this.validateField(field));
                field.addEventListener('input', () => {
                    if (field.dataset.touched === 'true') {
                        this.validateField(field);
                    }
                });
            });

            // Form submission
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit(e);
            });

            // Reset form
            this.form.addEventListener('reset', () => {
                this.fields.forEach(field => {
                    this.clearError(field);
                    field.dataset.touched = 'false';
                });
            });
        }

        validateField(field) {
            field.dataset.touched = 'true';
            const isValid = this.checkValidity(field);

            if (isValid) {
                this.clearError(field);
            } else {
                this.showError(field);
            }

            return isValid;
        }

        checkValidity(field) {
            // Required validation
            if (field.hasAttribute('required') && !field.value.trim()) {
                field.setCustomValidity('This field is required');
                return false;
            }

            // Email validation
            if (field.type === 'email' && field.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value.trim())) {
                    field.setCustomValidity('Please enter a valid email address');
                    return false;
                }
            }

            // URL validation
            if (field.type === 'url' && field.value.trim()) {
                try {
                    new URL(field.value.trim());
                } catch (_) {
                    field.setCustomValidity('Please enter a valid URL');
                    return false;
                }
            }

            // Min length validation
            if (field.hasAttribute('minlength')) {
                const min = parseInt(field.getAttribute('minlength'));
                if (field.value.length < min) {
                    field.setCustomValidity(`Minimum length is ${min} characters`);
                    return false;
                }
            }

            // Max length validation
            if (field.hasAttribute('maxlength')) {
                const max = parseInt(field.getAttribute('maxlength'));
                if (field.value.length > max) {
                    field.setCustomValidity(`Maximum length is ${max} characters`);
                    return false;
                }
            }

            // Pattern validation
            if (field.hasAttribute('pattern')) {
                const regex = new RegExp(field.getAttribute('pattern'));
                if (field.value.trim() && !regex.test(field.value.trim())) {
                    field.setCustomValidity(field.getAttribute('title') || 'Invalid format');
                    return false;
                }
            }

            // Custom validation
            if (field.dataset.validate === 'confirm') {
                const targetId = field.dataset.confirmWith;
                if (targetId) {
                    const target = document.getElementById(targetId);
                    if (target && field.value !== target.value) {
                        field.setCustomValidity('Values do not match');
                        return false;
                    }
                }
            }

            field.setCustomValidity('');
            return true;
        }

        showError(field) {
            const errorMsg = field.validationMessage || field.dataset.errorMessage || 'Invalid input';

            // Add error class
            field.classList.add('error');
            field.setAttribute('aria-invalid', 'true');

            // Find or create error message
            let errorEl = field.parentElement.querySelector('.field-error');
            if (!errorEl) {
                errorEl = document.createElement('span');
                errorEl.className = 'field-error';
                errorEl.setAttribute('role', 'alert');
                field.parentElement.appendChild(errorEl);
            }
            errorEl.textContent = errorMsg;

            // Set aria-describedby
            const describedBy = field.getAttribute('aria-describedby') || '';
            field.setAttribute('aria-describedby', `${describedBy} ${errorEl.id || ''}`.trim());
            if (!errorEl.id) {
                errorEl.id = `error-${field.id || Math.random().toString(36).substr(2, 9)}`;
            }
        }

        clearError(field) {
            field.classList.remove('error');
            field.removeAttribute('aria-invalid');

            const errorEl = field.parentElement.querySelector('.field-error');
            if (errorEl) {
                errorEl.remove();
            }

            // Clean up aria-describedby
            const describedBy = field.getAttribute('aria-describedby') || '';
            const newDescribedBy = describedBy.split(' ').filter(id => !id.startsWith('error-')).join(' ');
            if (newDescribedBy) {
                field.setAttribute('aria-describedby', newDescribedBy);
            } else {
                field.removeAttribute('aria-describedby');
            }
        }

        handleSubmit(e) {
            let isValid = true;

            this.fields.forEach(field => {
                if (!this.validateField(field)) {
                    isValid = false;
                }
            });

            if (!isValid) {
                // Focus first error field
                const firstError = this.form.querySelector('.error');
                if (firstError) {
                    firstError.focus();
                }

                // Announce error
                if (window.announceContent) {
                    window.announceContent('Please correct the errors before submitting');
                }

                return;
            }

            // Prepare form data
            const formData = new FormData(this.form);
            const data = {};

            formData.forEach((value, key) => {
                if (data[key]) {
                    if (Array.isArray(data[key])) {
                        data[key].push(value);
                    } else {
                        data[key] = [data[key], value];
                    }
                } else {
                    data[key] = value;
                }
            });

            // Dispatch event with form data
            this.form.dispatchEvent(new CustomEvent('formSubmit', {
                detail: {
                    data: data,
                    formData: formData
                }
            }));

            // Default: log data
            console.log('Form submitted:', data);

            // Show success message if configured
            if (this.form.dataset.successMessage) {
                this.showSuccess(this.form.dataset.successMessage);
            }
        }

        showSuccess(message) {
            // Clear any existing success
            const existing = this.form.querySelector('.form-success');
            if (existing) existing.remove();

            const successEl = document.createElement('div');
            successEl.className = 'form-success';
            successEl.setAttribute('role', 'alert');
            successEl.textContent = message;

            this.form.prepend(successEl);

            // Announce success
            if (window.announceContent) {
                window.announceContent(message);
            }

            // Reset form
            this.form.reset();

            // Remove success after 5 seconds
            setTimeout(() => {
                successEl.remove();
            }, 5000);
        }

        // Reset form validation state
        resetValidation() {
            this.fields.forEach(field => {
                this.clearError(field);
                field.dataset.touched = 'false';
            });
        }
    }

    // --- Initialize all forms ---
    function initForms() {
        document.querySelectorAll('form[data-validate="true"]').forEach(form => {
            if (!form._formHandler) {
                form._formHandler = new FormHandler(form);
            }
        });
    }

    // --- Initialize on DOM ready ---
    document.addEventListener('DOMContentLoaded', initForms);

    // --- Re-initialize for dynamic content ---
    window.initForms = initForms;

})();