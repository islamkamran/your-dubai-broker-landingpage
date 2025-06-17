// Replace your existing script.js with this enhanced version

document.addEventListener('DOMContentLoaded', function() {
    // Add loading state
    document.body.classList.add('loading');
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            document.querySelector('.nav-links').classList.toggle('active');
        });
    }

    // Initialize carousels with improved logic
    initCarousels();

    // Animation on scroll with intersection observer for better performance
    initScrollAnimations();

    // Remove loading state when everything is ready
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 500);

    // Smooth scrolling for navigation
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
                if (navLinks && navLinks.classList.contains('active')) {
                    mobileMenuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // Form Validation with better UX
    const leadForm = document.querySelector('.lead-form');
    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            
            if (name && email) {
                // Show success feedback
                const submitBtn = this.querySelector('button[type="submit"]');
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate sending
                setTimeout(() => {
                    submitBtn.textContent = '✓ Sent!';
                    this.reset();
                    setTimeout(() => {
                        submitBtn.textContent = 'Send Me the Guide';
                        submitBtn.disabled = false;
                    }, 2000);
                }, 1000);
            } else {
                // Highlight empty fields
                this.querySelectorAll('input[required]').forEach(input => {
                    if (!input.value) {
                        input.style.borderColor = '#ff6b6b';
                        setTimeout(() => {
                            input.style.borderColor = '';
                        }, 2000);
                    }
                });
            }
        });
    }

    // WhatsApp Integration
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            window.open('https://wa.me/971556643426', '_blank');
        });
    }

    // Sticky Header with scroll direction detection
    let lastScroll = 0;
    const header = document.querySelector('.sticky-header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.style.boxShadow = '0 2px 15px rgba(0,0,0,0.1)';
            
            if (currentScroll > lastScroll && currentScroll > 100) {
                // Scrolling down
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
});

// Improved carousel initialization
function initCarousels() {
    // Why Work With Us Carousel
    const diffCarousel = document.querySelector('.diff-carousel');
    if (diffCarousel) {
        const diffCards = document.querySelectorAll('.diff-carousel .diff-card');
        const diffPrevBtn = document.querySelector('.differentiators .carousel-prev');
        const diffNextBtn = document.querySelector('.differentiators .carousel-next');
        let diffCurrentIndex = 0;
        let isDiffDragging = false;
        let startDiffPos = 0;
        let currentDiffTranslate = 0;
        
        // Testimonials Carousel
        const testimonialCarousel = document.querySelector('.testimonial-carousel');
        const testimonialCards = document.querySelectorAll('.testimonial-carousel .testimonial-card');
        const testimonialPrevBtn = document.querySelector('.testimonials .carousel-prev');
        const testimonialNextBtn = document.querySelector('.testimonials .carousel-next');
        let testimonialCurrentIndex = 0;
        let isTestimonialDragging = false;
        let startTestimonialPos = 0;
        let currentTestimonialTranslate = 0;
        
        // Function to update carousel position with smooth transition
        function updateCarousel(carousel, index, isMobile) {
            if (!carousel || !carousel.firstElementChild) return;
            
            const cardWidth = carousel.firstElementChild.offsetWidth + (isMobile ? 20 : 30);
            const maxTranslate = (carousel.scrollWidth - carousel.parentElement.offsetWidth);
            const newTranslate = Math.min(index * cardWidth, maxTranslate);
            
            carousel.style.transition = 'transform 0.5s ease';
            carousel.style.transform = `translateX(-${newTranslate}px)`;
            
            // Disable transition after it completes
            setTimeout(() => {
                carousel.style.transition = 'none';
            }, 500);
        }
        
        // Touch event handlers for Why Work With Us carousel
        diffCarousel.addEventListener('touchstart', (e) => {
            isDiffDragging = true;
            startDiffPos = e.touches[0].clientX;
            currentDiffTranslate = getTranslateX(diffCarousel);
            diffCarousel.style.transition = 'none';
        });
        
        diffCarousel.addEventListener('touchmove', (e) => {
            if (!isDiffDragging) return;
            const currentPos = e.touches[0].clientX;
            const diff = currentPos - startDiffPos;
            diffCarousel.style.transform = `translateX(${-currentDiffTranslate + diff}px)`;
        });
        
        diffCarousel.addEventListener('touchend', () => {
            if (!isDiffDragging) return;
            isDiffDragging = false;
            
            const cardsToShow = window.innerWidth < 768 ? 1 : 2;
            const threshold = diffCarousel.firstElementChild.offsetWidth / 4;
            const currentTranslate = getTranslateX(diffCarousel);
            
            if (currentTranslate < currentDiffTranslate - threshold) {
                // Swiped left
                if (diffCurrentIndex < diffCards.length - cardsToShow) {
                    diffCurrentIndex++;
                }
            } else if (currentTranslate > currentDiffTranslate + threshold) {
                // Swiped right
                if (diffCurrentIndex > 0) {
                    diffCurrentIndex--;
                }
            }
            
            updateCarousel(diffCarousel, diffCurrentIndex, window.innerWidth < 768);
        });
        
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
        
        // Initialize carousel positions
        updateCarousel(diffCarousel, diffCurrentIndex, window.innerWidth < 768);
        updateCarousel(testimonialCarousel, testimonialCurrentIndex, window.innerWidth < 768);
        
        // Handle window resize with debounce
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                updateCarousel(diffCarousel, diffCurrentIndex, window.innerWidth < 768);
                updateCarousel(testimonialCarousel, testimonialCurrentIndex, window.innerWidth < 768);
            }, 200);
        });
    }

    // Video Carousel
    const videosCarousel = document.querySelector('.videos-carousel');
    if (videosCarousel) {
        const videoCards = document.querySelectorAll('.videos-carousel .video-card');
        const videosPrevBtn = document.querySelector('.property-videos .carousel-prev');
        const videosNextBtn = document.querySelector('.property-videos .carousel-next');
        let videosCurrentIndex = 0;
        let isVideosDragging = false;
        let startVideosPos = 0;
        let currentVideosTranslate = 0;
    
        // Touch event handlers for Video carousel
        videosCarousel.addEventListener('touchstart', (e) => {
            isVideosDragging = true;
            startVideosPos = e.touches[0].clientX;
            currentVideosTranslate = getTranslateX(videosCarousel);
            videosCarousel.style.transition = 'none';
        });
    
        videosCarousel.addEventListener('touchmove', (e) => {
            if (!isVideosDragging) return;
            const currentPos = e.touches[0].clientX;
            const diff = currentPos - startVideosPos;
            videosCarousel.style.transform = `translateX(${-currentVideosTranslate + diff}px)`;
        });
    
        videosCarousel.addEventListener('touchend', () => {
            if (!isVideosDragging) return;
            isVideosDragging = false;
        
            const cardsToShow = window.innerWidth < 768 ? 1 : 2;
            const threshold = videosCarousel.firstElementChild.offsetWidth / 4;
            const currentTranslate = getTranslateX(videosCarousel);
        
            if (currentTranslate < currentVideosTranslate - threshold) {
                // Swiped left
                if (videosCurrentIndex < videoCards.length - cardsToShow) {
                    videosCurrentIndex++;
                }
            } else if (currentTranslate > currentVideosTranslate + threshold) {
                // Swiped right
                if (videosCurrentIndex > 0) {
                    videosCurrentIndex--;
                }
            }
        
            updateCarousel(videosCarousel, videosCurrentIndex, window.innerWidth < 768);
        });
    
        // Video Carousel Navigation
        if (videosPrevBtn && videosNextBtn) {
            videosPrevBtn.addEventListener('click', () => {
                if (videosCurrentIndex > 0) {
                    videosCurrentIndex--;
                    updateCarousel(videosCarousel, videosCurrentIndex, window.innerWidth < 768);
                }
            });
        
            videosNextBtn.addEventListener('click', () => {
                const cardsToShow = window.innerWidth < 768 ? 1 : 2;
                if (videosCurrentIndex < videoCards.length - cardsToShow) {
                    videosCurrentIndex++;
                    updateCarousel(videosCarousel, videosCurrentIndex, window.innerWidth < 768);
                }
            });
        }
    
        // Initialize carousel position
        updateCarousel(videosCarousel, videosCurrentIndex, window.innerWidth < 768);
    }
    
    // Helper function to get current translateX value
    function getTranslateX(element) {
        const style = window.getComputedStyle(element);
        const matrix = new WebKitCSSMatrix(style.transform);
        return matrix.m41;
    }
}

// Improved scroll animations with Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    document.querySelectorAll('.diff-card, .testimonial-card, .blog-card, .section-header').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Special animation for hero text
    const heroText = document.querySelector('.text-container');
    if (heroText) {
        heroText.style.opacity = '0';
        heroText.style.transform = 'translateY(20px)';
        heroText.style.transition = 'opacity 1s ease 0.2s, transform 1s ease 0.2s';
        setTimeout(() => {
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateY(0)';
        }, 300);
    }
}