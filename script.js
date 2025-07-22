// Single, clean FAQ implementation
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').classList.remove('show');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            answer.classList.toggle('show');
        });
    });
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form Submission with WhatsApp Integration
// Notification System
class NotificationSystem {
    constructor() {
        this.container = null;
        this.notifications = [];
        this.createContainer();
    }

    createContainer() {
        this.container = document.querySelector('.notification-container');
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.className = 'notification-container';
            document.body.appendChild(this.container);
        }
    }

    show(type = 'success', title = '', message = '', duration = 5000) {
        const notification = this.createNotification(type, title, message, duration);
        this.container.appendChild(notification);
        this.notifications.push(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            this.remove(notification);
        }, duration);

        return notification;
    }

    createNotification(type, title, message, duration) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;

        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };

        notification.innerHTML = `
            <div class="notification-icon">
                <i class="${icons[type] || icons.success}"></i>
            </div>
            <div class="notification-content">
                <div class="notification-title">${title}</div>
                <div class="notification-message">${message}</div>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
            <div class="notification-progress"></div>
        `;

        const closeBtn = notification.querySelector('.notification-close');
        closeBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.remove(notification);
        });

        notification.addEventListener('click', () => {
            this.remove(notification);
        });

        return notification;
    }

    remove(notification) {
        if (!notification || !notification.parentNode) return;

        notification.classList.add('hide');
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            
            const index = this.notifications.indexOf(notification);
            if (index > -1) {
                this.notifications.splice(index, 1);
            }
        }, 400);
    }

    success(title, message, duration = 5000) {
        return this.show('success', title, message, duration);
    }

    error(title, message, duration = 5000) {
        return this.show('error', title, message, duration);
    }

    warning(title, message, duration = 5000) {
        return this.show('warning', title, message, duration);
    }

    info(title, message, duration = 5000) {
        return this.show('info', title, message, duration);
    }

    clear() {
        this.notifications.forEach(notification => {
            this.remove(notification);
        });
    }
}

// Initialize notification system
const notifications = new NotificationSystem();

// Form Submission Handler
// Form Submission Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        if (!validateForm()) return;

        const formData = new FormData(this);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const age = formData.get('age');
        const email = formData.get('email');
        const level = formData.get('level');
        const question_user = formData.get('question-user') || "None";

        const formObject = Object.fromEntries(formData.entries());
        console.log("Form Data Object:", formObject);
        
        const levelText = {
            'zero': 'Starting from Zero',
            'beginner': 'Beginner',
            'intermediate': 'Intermediate'
        };

        const countryCode = document.getElementById('countrySearch').dataset.selectedCode;
        const countryb = document.getElementById('countrySearch').value;
        console.log("countryb",countryb);
        const fullPhone = countryCode + phone;

        let message = `🎓 New Arabic Course Enrollment\n\n👤 Name: ${name}\n📞 Phone: ${fullPhone}\n🎂 Age: ${age}\n📧 Email: ${email}\n 🌍 Country: ${countryb}\n 📘Level: ${levelText[level] || 'Unknown'}\n ⁉ Question user: ${question_user}`;

        // Collect friend data
        const friendForms = document.querySelectorAll('.friend-form');
        if (friendForms.length > 0) {
            message += `\n🧑‍🤝‍🧑 Friends Joining:\n`;
            friendForms.forEach((form, i) => {
                const friendId = i + 1;
                const friendName = form.querySelector(`[name="friend-${friendId}-name"]`)?.value;
                const friendPhone = form.querySelector(`[name="friend-${friendId}-phone"]`)?.value;
                const friendAge = form.querySelector(`[name="friend-${friendId}-age"]`)?.value;
                const friendEmail = form.querySelector(`[name="friend-${friendId}-email"]`)?.value;
                const friendLevel = form.querySelector(`[name="friend-${friendId}-level"]`)?.value;
                const friendCountry = form.querySelector(`#friend-${friendId}-country`)?.dataset.selectedCode || '+20';
                const friendCountryFlag = form.querySelector(`#friend-${friendId}-country`)?.value;

                message += `\n👤 Friend ${friendId}\n📛 Name: ${friendName}\n📞 Phone: ${friendCountry}${friendPhone}\n🎂 Age: ${friendAge}\n📧 Email: ${friendEmail}\n 🌍 Country: ${friendCountryFlag}\n 📘 Level: ${levelText[friendLevel] || 'Unknown'}\n`;
            });
        }

        message += `\nAre you ready to begin your learning journey?`;
        console.log("Message sent: ",message);
        // Show loading state
        const submitBtn = document.querySelector('.form-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Send WhatsApp message
        const apiUrl = "https://api.callmebot.com/whatsapp.php";
        const params = new URLSearchParams({
            phone: "201096913603",
            text: message,
            apikey: "9966346"
        });

        try {
            const response = await fetch(`${apiUrl}?${params.toString()}`);
            const resultText = await response.text();

            notifications.success(
                'Enrollment Successful! 🎉',
                'Thank you for joining Arabic Vibes! We will contact you soon to start your learning journey.',
                6000
            );
            contactForm.reset();
        } catch (error) {
            console.error('Error sending message:', error);
            notifications.error(
                'Oops! Something went wrong.',
                'Please try again or contact us directly.',
                6000
            );
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Form Validation Functions
function validateForm() {
    const inputs = document.querySelectorAll('#contactForm input, #contactForm select');
    let isValid = true;

    inputs.forEach(input => {
        clearErrors(input);

        // ✅ Skip optional fields by ID or name
        const optionalFields = ['question-user'];
        if (optionalFields.includes(input.name)) {
            return; // Skip validation
        }

        if (!input.value.trim()) {
            showFieldError(input, 'This field is required');
            isValid = false;
        } else {
            if (input.type === 'email' && !isValidEmail(input.value)) {
                showFieldError(input, 'Please enter a valid email address');
                isValid = false;
            }
            if (input.type === 'tel' && !isValidPhone(input.value)) {
                showFieldError(input, 'Please enter a valid phone number');
                isValid = false;
            }
            if (input.type === 'number') {
                const age = parseInt(input.value);
                if (age < 5 || age > 99) {
                    showFieldError(input, 'Age must be between 5 and 99');
                    isValid = false;
                }
            }
        }
    });

    return isValid;
}

function clearErrors(field) {
    field.classList.remove('error');
    const errorMsg = field.parentNode.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
    field.parentNode.appendChild(errorDiv);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    phone = phone.replace(/^0+/, ''); // Remove leading 0s
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


console.log('Arabic Course Website Loaded Successfully! 🎉');
// Notification System

// Usage example for testing (remove this in production)
// You can call these functions in your form submission handler:
// showEnrollmentSuccessNotification(); // For success
// showEnrollmentErrorNotification(); // For error

document.addEventListener('DOMContentLoaded', () => {
    const pdfIframe = document.getElementById('coursePDF');
    const courseSection = document.getElementById('course');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !pdfIframe.src) {
                pdfIframe.src = pdfIframe.dataset.src;
                observer.unobserve(entry.target); // load only once
            }
        });
    }, {
        threshold: 0.4 // PDF loads when 40% of section is visible
    });

    observer.observe(courseSection);
});
