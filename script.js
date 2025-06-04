// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            document.querySelector('.nav-links').classList.toggle('active');
        });
    }

    // Initialize carousels
    initCarousels();

    // Animation on scroll
    const elements = document.querySelectorAll('.diff-card, .testimonial-card, .blog-card');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Run initial animation check
    animateOnScroll();
});

// Initialize carousels
function initCarousels() {
    // Why Work With Us Carousel
    const diffCarousel = document.querySelector('.diff-carousel');
    if (diffCarousel) {
        const diffCards = document.querySelectorAll('.diff-carousel .diff-card');
        const diffPrevBtn = document.querySelector('.differentiators .carousel-prev');
        const diffNextBtn = document.querySelector('.differentiators .carousel-next');
        let diffCurrentIndex = 0;
        
        // Testimonials Carousel
        const testimonialCarousel = document.querySelector('.testimonial-carousel');
        const testimonialCards = document.querySelectorAll('.testimonial-carousel .testimonial-card');
        const testimonialPrevBtn = document.querySelector('.testimonials .carousel-prev');
        const testimonialNextBtn = document.querySelector('.testimonials .carousel-next');
        let testimonialCurrentIndex = 0;
        
        // Function to update carousel position
        function updateCarousel(carousel, index, isMobile) {
            if (!carousel || !carousel.firstElementChild) return;
            const cardWidth = carousel.firstElementChild.offsetWidth + (isMobile ? 20 : 30);
            carousel.style.transform = `translateX(-${index * cardWidth}px)`;
        }
        
        // Why Work With Us Carousel Navigation
        if (diffPrevBtn && diffNextBtn) {
            diffPrevBtn.addEventListener('click', () => {
                if (diffCurrentIndex > 0) {
                    diffCurrentIndex--;
                    updateCarousel(diffCarousel, diffCurrentIndex, window.innerWidth < 768);
                }
            });
            
            diffNextBtn.addEventListener('click', () => {
                const cardsToShow = window.innerWidth < 768 ? 1 : 2;
                if (diffCurrentIndex < diffCards.length - cardsToShow) {
                    diffCurrentIndex++;
                    updateCarousel(diffCarousel, diffCurrentIndex, window.innerWidth < 768);
                }
            });
        }
        
        // Testimonials Carousel Navigation
        if (testimonialPrevBtn && testimonialNextBtn) {
            testimonialPrevBtn.addEventListener('click', () => {
                if (testimonialCurrentIndex > 0) {
                    testimonialCurrentIndex--;
                    updateCarousel(testimonialCarousel, testimonialCurrentIndex, window.innerWidth < 768);
                }
            });
            
            testimonialNextBtn.addEventListener('click', () => {
                const cardsToShow = window.innerWidth < 768 ? 1 : 2;
                if (testimonialCurrentIndex < testimonialCards.length - cardsToShow) {
                    testimonialCurrentIndex++;
                    updateCarousel(testimonialCarousel, testimonialCurrentIndex, window.innerWidth < 768);
                }
            });
        }
        
        // Handle window resize
        window.addEventListener('resize', () => {
            updateCarousel(diffCarousel, diffCurrentIndex, window.innerWidth < 768);
            updateCarousel(testimonialCarousel, testimonialCurrentIndex, window.innerWidth < 768);
        });

        // Initialize carousel positions
        updateCarousel(diffCarousel, diffCurrentIndex, window.innerWidth < 768);
        updateCarousel(testimonialCarousel, testimonialCurrentIndex, window.innerWidth < 768);
    }
}

// Sticky Header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.sticky-header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 15px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    }
});

// Form Validation
const leadForm = document.querySelector('.lead-form');
if (leadForm) {
    leadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        
        if (name && email) {
            alert('Thank you! Your guide will be sent shortly.');
            this.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

// WhatsApp Integration
const whatsappBtn = document.querySelector('.whatsapp-btn');
if (whatsappBtn) {
    whatsappBtn.addEventListener('click', function() {
        window.open('https://wa.me/971556643426');
    });
}

// Smooth Scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.diff-card, .testimonial-card, .blog-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Run animation check on scroll
window.addEventListener('scroll', animateOnScroll);