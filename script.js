// EmailJS Configuration
// Initialize EmailJS - Replace 'YOUR_PUBLIC_KEY' with your EmailJS public key after setup
// Get your keys from https://www.emailjs.com/
const RECIPIENT_EMAIL = "asattar@vndallac.com";

// Initialize EmailJS when the library is loaded
window.addEventListener('DOMContentLoaded', () => {
    if (typeof emailjs !== 'undefined') {
        emailjs.init("L0CyUrcq4pR_BqJ6q"); // Replace with your EmailJS public key
    }
});

// Navigation functionality
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scheduling form handling
const schedulingForm = document.getElementById('scheduling-form');
const scheduleMessageStatus = document.getElementById('schedule-message-status');
const scheduleButtonText = document.getElementById('schedule-button-text');
const scheduleButtonLoading = document.getElementById('schedule-button-loading');

if (schedulingForm) {
    schedulingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        scheduleButtonText.style.display = 'none';
        scheduleButtonLoading.style.display = 'inline';
        
        const formData = new FormData(schedulingForm);
        const data = Object.fromEntries(formData);
        
        scheduleMessageStatus.style.display = 'none';
        
        // Prepare email template parameters
        const emailParams = {
            to_email: RECIPIENT_EMAIL,
            from_name: data.name,
            from_email: data.email,
            phone: data.phone,
            preferred_date: data.date,
            preferred_time: data.time,
            service_type: data.service,
            procedure_details: data.procedure || 'Not provided',
            additional_info: data.message || 'None',
            subject: `New Appointment Request from ${data.name}`
        };
        
        try {
            // Check if EmailJS is available
            if (typeof emailjs === 'undefined') {
                throw new Error('EmailJS not loaded. Please check EMAIL_SETUP.md for setup instructions.');
            }
            
            // Send email using EmailJS
            // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your EmailJS service and template IDs
            await emailjs.send(
                'service_q456ae8',  // Replace with your EmailJS service ID
                'template_dqhtcs8', // Replace with your EmailJS template ID for scheduling
                emailParams
            );
            
            scheduleMessageStatus.textContent = 'Thank you! Your appointment request has been received. We will contact you shortly to confirm your appointment.';
            scheduleMessageStatus.className = 'form-message success';
            scheduleMessageStatus.style.display = 'block';
            
            // Reset form
            schedulingForm.reset();
            
            // Hide message after 8 seconds
            setTimeout(() => {
                scheduleMessageStatus.style.display = 'none';
            }, 8000);
        } catch (error) {
            console.error('Email sending error:', error);
            scheduleMessageStatus.textContent = 'Sorry, there was an error sending your request. Please try again or contact us directly at ' + RECIPIENT_EMAIL;
            scheduleMessageStatus.className = 'form-message error';
            scheduleMessageStatus.style.display = 'block';
        } finally {
            // Reset button state
            scheduleButtonText.style.display = 'inline';
            scheduleButtonLoading.style.display = 'none';
        }
    });
}

// Contact form handling
const contactForm = document.getElementById('contact-form');
const contactMessageStatus = document.getElementById('contact-message-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        contactMessageStatus.style.display = 'none';
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Prepare email template parameters
        const emailParams = {
            to_email: RECIPIENT_EMAIL,
            from_name: data.name,
            from_email: data.email,
            phone: data.phone || 'Not provided',
            subject: data.subject,
            message: data.message
        };
        
        try {
            // Check if EmailJS is available
            if (typeof emailjs === 'undefined') {
                throw new Error('EmailJS not loaded. Please check EMAIL_SETUP.md for setup instructions.');
            }
            
            // Send email using EmailJS
            // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your EmailJS service and template IDs
            await emailjs.send(
                'service_q456ae8',  // Replace with your EmailJS service ID
                'template_7uacagj', // Replace with your EmailJS template ID for contact form
                emailParams
            );
            
            contactMessageStatus.textContent = 'Thank you! Your message has been sent. We will get back to you soon.';
            contactMessageStatus.className = 'form-message success';
            contactMessageStatus.style.display = 'block';
            
            // Reset form
            contactForm.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                contactMessageStatus.style.display = 'none';
            }, 5000);
        } catch (error) {
            console.error('Email sending error:', error);
            contactMessageStatus.textContent = 'Sorry, there was an error sending your message. Please try again or contact us directly.';
            contactMessageStatus.className = 'form-message error';
            contactMessageStatus.style.display = 'block';
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
}

// Square Payment Integration
// IMPORTANT: Replace 'YOUR_APPLICATION_ID' and 'YOUR_LOCATION_ID' with your Square credentials
// Get these from https://developer.squareup.com/
const squareApplicationId = 'YOUR_APPLICATION_ID'; // Replace with your Square Application ID
const squareLocationId = 'YOUR_LOCATION_ID'; // Replace with your Square Location ID

let payments;
let card;

// Initialize Square Web Payments SDK
function initializeSquarePayments() {
    if (typeof Square === 'undefined') {
        console.error('Square Web Payments SDK not loaded');
        return;
    }

    try {
        payments = Square.payments(squareApplicationId, squareLocationId);
        
        // Initialize card input
        const cardContainer = document.getElementById('card-container');
        if (cardContainer) {
            card = payments.card();
            card.attach('#card-container');
        }
    } catch (error) {
        console.error('Error initializing Square payments:', error);
    }
}

// Initialize when Square SDK is loaded
if (typeof Square !== 'undefined') {
    initializeSquarePayments();
} else {
    window.addEventListener('load', () => {
        if (typeof Square !== 'undefined') {
            initializeSquarePayments();
        }
    });
}

const paymentForm = document.getElementById('payment-form');
const paymentError = document.getElementById('payment-error');
const cardErrors = document.getElementById('card-errors');
const submitButton = document.getElementById('submit-payment');
const buttonText = document.getElementById('button-text');
const buttonLoading = document.getElementById('button-loading');

if (paymentForm) {
    paymentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Hide previous errors
        paymentError.style.display = 'none';
        if (cardErrors) cardErrors.style.display = 'none';
        
        // Show loading state
        buttonText.style.display = 'none';
        buttonLoading.style.display = 'inline';
        submitButton.disabled = true;
        
        const formData = new FormData(paymentForm);
        const amount = parseFloat(formData.get('amount'));
        const patientName = formData.get('patient-name');
        const email = formData.get('email');
        const description = formData.get('description') || 'Service Payment';
        
        // Validate amount
        if (isNaN(amount) || amount <= 0) {
            showPaymentError('Please enter a valid amount');
            resetButtonState();
            return;
        }
        
        // Convert amount to cents (Square uses smallest currency unit)
        const amountInCents = Math.round(amount * 100);
        
        // Validate Square is initialized
        if (!payments || !card) {
            showPaymentError('Payment system not initialized. Please refresh the page and try again.');
            resetButtonState();
            return;
        }
        
        try {
            // Tokenize the card
            const tokenResult = await card.tokenize();
            
            if (tokenResult.status === 'OK') {
                // Card tokenized successfully
                // Now send to your backend to process the payment
                // IMPORTANT: Never process payments directly from the client
                // You must create a backend endpoint to securely process payments
                
                const response = await fetch('/api/process-payment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        sourceId: tokenResult.token,
                        amountMoney: {
                            amount: amountInCents,
                            currency: 'USD'
                        },
                        idempotencyKey: crypto.randomUUID(),
                        referenceId: `PAYMENT-${Date.now()}`,
                        note: description,
                        buyerEmailAddress: email,
                        billingContact: {
                            givenName: patientName.split(' ')[0] || patientName,
                            familyName: patientName.split(' ').slice(1).join(' ') || '',
                            email: email
                        }
                    }),
                });
                
                const result = await response.json();
                
                if (response.ok && result.payment) {
                    // Payment successful
                    showPaymentSuccess('Payment processed successfully! Thank you for your payment.');
                    paymentForm.reset();
                    
                    // Optionally redirect to success page
                    // window.location.href = '/payment-success?id=' + result.payment.id;
                } else {
                    // Payment failed
                    const errorMessage = result.errors?.[0]?.detail || 'Payment could not be processed. Please try again.';
                    showPaymentError(errorMessage);
                }
            } else {
                // Tokenization failed
                const errorMessage = tokenResult.errors?.[0]?.message || 'Invalid card information. Please check your card details.';
                showCardError(errorMessage);
            }
        } catch (error) {
            console.error('Payment error:', error);
            
            // Check if it's a network error (backend not set up)
            if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
                showPaymentError('Payment processing requires backend setup. Please see SQUARE_SETUP.md for instructions.');
            } else {
                showPaymentError('An error occurred processing your payment. Please try again.');
            }
        } finally {
            resetButtonState();
        }
    });
}

function showPaymentError(message) {
    paymentError.textContent = message;
    paymentError.style.display = 'block';
}

function showCardError(message) {
    if (cardErrors) {
        cardErrors.textContent = message;
        cardErrors.style.display = 'block';
    } else {
        showPaymentError(message);
    }
}

function showPaymentSuccess(message) {
    paymentError.textContent = message;
    paymentError.className = 'form-message success';
    paymentError.style.display = 'block';
    
    // Reset to error class after hiding
    setTimeout(() => {
        paymentError.className = 'error-message';
    }, 5000);
}

function resetButtonState() {
    buttonText.style.display = 'inline';
    buttonLoading.style.display = 'none';
    submitButton.disabled = false;
}

function showPaymentError(message) {
    paymentError.textContent = message;
    paymentError.style.display = 'block';
}

function resetButtonState() {
    buttonText.style.display = 'inline';
    buttonLoading.style.display = 'none';
    submitButton.disabled = false;
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and other elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    const featureItems = document.querySelectorAll('.feature-item');
    
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    featureItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

