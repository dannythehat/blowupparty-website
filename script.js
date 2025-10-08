// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
    }
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email) {
            alert('Please fill in all required fields!');
            return;
        }
        
        // Show success message (you can replace this with actual form submission)
        alert('Thank you for your message! We\'ll get back to you soon about your BlowUp Party!');
        this.reset();
    });
}

// Booking form handling
const bookingForm = document.querySelector('.booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        if (!data.name || !data.email || !data.date) {
            alert('Please fill in all required fields!');
            return;
        }
        
        alert('Booking request submitted! We\'ll contact you within 24 hours to confirm your BlowUp Party!');
        this.reset();
    });
}

// Gallery lightbox effect
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        // Simple lightbox effect - you can enhance this
        const content = this.querySelector('.placeholder-img span').textContent;
        alert(`Gallery Image: ${content}\n\nThis would open a full-size image viewer in the final version!`);
    });
});

// Pricing calculator
function calculatePrice() {
    const basePrice = 500; // Base price in BGN
    const duration = document.getElementById('duration')?.value || 4;
    const guests = document.getElementById('guests')?.value || 50;
    const addOns = document.querySelectorAll('input[name="addons"]:checked');
    
    let total = basePrice;
    
    // Duration pricing
    if (duration > 4) {
        total += (duration - 4) * 100;
    }
    
    // Guest pricing
    if (guests > 50) {
        total += Math.ceil((guests - 50) / 25) * 150;
    }
    
    // Add-ons pricing
    addOns.forEach(addon => {
        total += parseInt(addon.value);
    });
    
    const priceDisplay = document.getElementById('price-estimate');
    if (priceDisplay) {
        priceDisplay.textContent = `${total} BGN`;
        priceDisplay.style.color = '#00ffff';
        priceDisplay.style.textShadow = '0 0 10px #00ffff';
    }
}

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const isOpen = answer.style.display === 'block';
        
        // Close all other answers
        document.querySelectorAll('.faq-answer').forEach(a => {
            a.style.display = 'none';
        });
        
        // Toggle current answer
        answer.style.display = isOpen ? 'none' : 'block';
        
        // Update question styling
        document.querySelectorAll('.faq-question').forEach(q => {
            q.classList.remove('active');
        });
        
        if (!isOpen) {
            this.classList.add('active');
        }
    });
});

// Intersection Observer for animations
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

// Observe all sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Hero section is always visible
const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroSection.style.opacity = '1';
    heroSection.style.transform = 'translateY(0)';
}

// Dynamic bubble generation
function createBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    
    const size = Math.random() * 60 + 20;
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.left = Math.random() * 100 + '%';
    bubble.style.animationDuration = (Math.random() * 3 + 4) + 's';
    bubble.style.animationDelay = Math.random() * 2 + 's';
    
    const bubblesContainer = document.querySelector('.floating-bubbles');
    if (bubblesContainer) {
        bubblesContainer.appendChild(bubble);
        
        // Remove bubble after animation
        setTimeout(() => {
            bubble.remove();
        }, 8000);
    }
}

// Create bubbles periodically
setInterval(createBubble, 2000);

// Initialize price calculator if on pricing page
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('price-estimate')) {
        calculatePrice();
    }
});

console.log('🎉 BlowUp Party website loaded! Ready to party! 🎈');