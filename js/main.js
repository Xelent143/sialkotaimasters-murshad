/**
 * Sialkot AI Masters - Main JavaScript
 * Handles navigation, interactions, and WhatsApp checkout
 */

// WhatsApp Configuration
const WHATSAPP_NUMBER = '923022922242';
const WHATSAPP_MESSAGE = {
    flatlaypro: `Hi! I'm interested in buying Flat Lay Pro (PKR 2,000). Please send me payment details.`,
    ayzelify: `Hi! I'm interested in buying Ayzelify (PKR 5,000 for 200 images). Please send me payment details.`,
    default: `Hi! I'm interested in your AI tools. Please provide more information.`
};

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    initNavigation();
    initFAQ();
    initScrollAnimations();
    initWhatsAppCheckout();
    initSmoothScroll();
});

// ================================
// NAVIGATION
// ================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const dropdowns = document.querySelectorAll('.nav-dropdown');

    const setMenuState = (open) => {
        if (!mobileToggle || !navMenu) return;

        navMenu.classList.toggle('active', open);
        document.body.classList.toggle('nav-open', open);
        mobileToggle.setAttribute('aria-expanded', open ? 'true' : 'false');

        const icon = mobileToggle.querySelector('i');
        if (icon) {
            icon.setAttribute('data-lucide', open ? 'x' : 'menu');
            lucide.createIcons();
        }

        if (!open) {
            dropdowns.forEach((dropdown) => dropdown.classList.remove('open'));
        }
    };
    
    // Sticky navbar on scroll
    if (navbar) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Mobile menu toggle
    if (mobileToggle && navMenu) {
        mobileToggle.setAttribute('aria-expanded', 'false');

        mobileToggle.addEventListener('click', () => {
            setMenuState(!navMenu.classList.contains('active'));
        });
        
        // Close mobile menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                const isMobileDropdownTrigger = window.innerWidth <= 768 && link.classList.contains('nav-link') && link.closest('.nav-dropdown') && !link.closest('.dropdown-menu');
                if (isMobileDropdownTrigger) return;
                setMenuState(false);
            });
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                setMenuState(false);
            }
        });

        document.addEventListener('click', (event) => {
            if (window.innerWidth > 768) return;
            if (!navMenu.classList.contains('active')) return;
            if (navMenu.contains(event.target) || mobileToggle.contains(event.target)) return;
            setMenuState(false);
        });

        window.addEventListener('resize', () => {
            setMenuState(false);
        });

        setMenuState(false);
    }

    dropdowns.forEach((dropdown) => {
        const trigger = dropdown.querySelector('.nav-link');
        if (!trigger) return;

        trigger.addEventListener('click', (event) => {
            if (window.innerWidth > 768) return;
            event.preventDefault();
            dropdown.classList.toggle('open');
        });
    });
}

// ================================
// FAQ ACCORDION
// ================================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// ================================
// SCROLL ANIMATIONS
// ================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .tool-card, .why-card, .industry-card, .case-card, .testimonial-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// ================================
// SMOOTH SCROLL
// ================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const navHeight = document.getElementById('navbar').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ================================
// WHATSAPP CHECKOUT
// ================================
function initWhatsAppCheckout() {
    const buyButtons = document.querySelectorAll('.btn-buy');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const product = button.getAttribute('data-product');
            
            // Get appropriate message
            const message = WHATSAPP_MESSAGE[product] || WHATSAPP_MESSAGE.default;
            
            // Encode message for URL
            const encodedMessage = encodeURIComponent(message);
            
            // Create WhatsApp link
            const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
            
            // Track event
            trackEvent('begin_checkout', {
                product: product,
                method: 'whatsapp'
            });
            
            // Open WhatsApp
            window.open(whatsappLink, '_blank');
        });
    });
}

// Buy Now function for direct calls
function buyNow(product, price) {
    const message = WHATSAPP_MESSAGE[product] || WHATSAPP_MESSAGE.default;
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    trackEvent('begin_checkout', {
        product: product,
        price: price,
        method: 'whatsapp'
    });
    
    window.open(whatsappLink, '_blank');
}

// Join waitlist function
function joinWaitlist(product) {
    const message = `Hi! I'm interested in ${product}. Please add me to the waitlist and notify me when it's available.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    trackEvent('join_waitlist', {
        product: product
    });
    
    window.open(whatsappLink, '_blank');
    
    showToast('Opening WhatsApp to join waitlist...', 'success');
}

// ================================
// TOAST NOTIFICATIONS
// ================================
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');
    const toastIcon = toast.querySelector('i');
    
    toastMessage.textContent = message;
    
    // Set icon based on type
    const iconMap = {
        'success': 'check-circle',
        'error': 'alert-circle',
        'info': 'info'
    };
    toastIcon.setAttribute('data-lucide', iconMap[type] || 'info');
    lucide.createIcons();
    
    // Show toast
    toast.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ================================
// FORM HANDLING
// ================================
function handleContactForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual backend)
    setTimeout(() => {
        showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// ================================
// NEWSLETTER SUBSCRIPTION
// ================================
function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    
    if (email) {
        showToast('Thanks for subscribing! Check your email for confirmation.', 'success');
        e.target.reset();
    } else {
        showToast('Please enter a valid email address.', 'error');
    }
}

// ================================
// UTILITY FUNCTIONS
// ================================

// Debounce function for performance
function debounce(func, wait) {
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!', 'success');
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// ================================
// ANALYTICS (Optional)
// ================================
function trackEvent(eventName, properties = {}) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, properties);
    }
    
    console.log('Event tracked:', eventName, properties);
}

// Track page views
document.addEventListener('DOMContentLoaded', () => {
    trackEvent('page_view', {
        page_title: document.title,
        page_location: window.location.href
    });
});

// Track CTA clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const btnText = btn.textContent.trim();
        trackEvent('cta_click', {
            button_text: btnText,
            button_location: btn.closest('section')?.className || 'unknown'
        });
    });
});

// Export functions for global access
window.SialkotAIMasters = {
    showToast,
    copyToClipboard,
    trackEvent,
    handleContactForm,
    handleNewsletterSubmit,
    buyNow,
    joinWaitlist
};
