document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const animateOnScrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Only observe once
                animateOnScrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const elementsToAnimate = [
        '.demo-feature',
        '.timeline-step',
        '.feature',
        '.tech-item',
        '.showcase-item',
        '.client-type',
        '.faq-item'
    ].join(',');

    document.querySelectorAll(elementsToAnimate).forEach(element => {
        element.classList.add('animate-on-scroll');
        animateOnScrollObserver.observe(element);
    });

    // Demo info button functionality
    const demoInfoButton = document.querySelector('.demo-info-button');
    const demoInfoContent = document.querySelector('.demo-info-content');
    
    if (demoInfoButton && demoInfoContent) {
        demoInfoButton.addEventListener('click', () => {
            demoInfoContent.classList.toggle('active');
            const arrow = demoInfoButton.querySelector('.arrow');
            if (demoInfoContent.classList.contains('active')) {
                arrow.style.transform = 'rotate(180deg)';
                demoInfoButton.querySelector('span:first-child').textContent = 'Klik hier om te verbergen';
            } else {
                arrow.style.transform = 'rotate(0)';
                demoInfoButton.querySelector('span:first-child').textContent = 'Let op - Klik hier voor meer informatie';
            }
        });
    }

    // Timeline functionality
    const timelineSteps = document.querySelectorAll('.timeline-step');
    const timelineProgress = document.querySelector('.timeline-progress');
    const timelineContainer = document.querySelector('.timeline-container');
    
    // Check if device supports hover
    const supportsHover = window.matchMedia('(hover: hover)').matches;

    function updateProgress(step) {
        const progress = ((step + 1) / timelineSteps.length) * 100;
        timelineProgress.style.height = `${progress}%`;
    }

    // Desktop hover functionality
    if (supportsHover && timelineSteps.length > 0 && timelineProgress) {
        timelineSteps.forEach((step, index) => {
            step.addEventListener('mouseenter', () => {
                timelineSteps.forEach(s => s.classList.remove('active'));
                step.classList.add('active');
                updateProgress(index);
            });

            step.addEventListener('mouseleave', () => {
                step.classList.remove('active');
                timelineProgress.style.height = '0';
            });
        });
    }

    // Mobile scroll functionality
    function updateMobileProgress() {
        if (!timelineContainer || !timelineProgress) return;
        
        const containerRect = timelineContainer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate how much of the timeline is in view
        const containerTop = containerRect.top;
        const containerBottom = containerRect.bottom;
        
        // If container is not in view at all
        if (containerBottom < 0 || containerTop > windowHeight) {
            timelineProgress.style.height = '0%';
            return;
        }
        
        // If container is partially or fully in view
        const visibleHeight = Math.min(windowHeight, containerBottom) - Math.max(0, containerTop);
        const containerHeight = containerRect.height;
        
        // Calculate progress based on how much is visible and scrolled
        let progress = 0;
        if (containerTop < 0) {
            // Container is scrolled up
            progress = Math.min(100, (-containerTop / containerHeight) * 100);
        } else {
            // Container is scrolling into view
            progress = Math.min(100, (visibleHeight / containerHeight) * 100);
        }
        
        // Ensure progress stays between 0 and 100
        progress = Math.max(0, Math.min(100, progress));
        timelineProgress.style.height = `${progress}%`;
    }

    // Add scroll event listener with throttling
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.innerWidth <= 768) {
                    updateMobileProgress();
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial check for mobile progress
    if (window.innerWidth <= 768) {
        updateMobileProgress();
    }

    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            question.addEventListener('click', () => {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        });
    }

    // Page Transition System
    let isAnimating = false;
    const transitionDuration = 700;

    // Create transition overlay
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';

    // Create logo container
    const logoContainer = document.createElement('div');
    logoContainer.className = 'transition-logo';
    logoContainer.innerHTML = `
        <div class="logo-text">
            KH<span class="highlight">Custom</span>Web
        </div>
    `;

    const shapes = document.createElement('div');
    shapes.className = 'transition-shapes';
    shapes.innerHTML = `
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
    `;

    overlay.appendChild(shapes);
    overlay.appendChild(logoContainer);
    document.body.appendChild(overlay);

    const style = document.createElement('style');
    style.textContent = `
    .page-transition-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #fff8f0 0%, #ffecb3 100%);
        transform: translateY(100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        transition: transform ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;
    }

    .page-transition-overlay.active {
        transform: translateY(0);
    }

    .transition-logo {
        position: relative;
        z-index: 2;
        opacity: 0;
        transform: scale(0.5);
        transition: all ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .page-transition-overlay.active .transition-logo {
        opacity: 1;
        transform: scale(1.5);
    }

    .logo-text {
        font-size: 2.2rem;
        font-weight: 700;
        color: var(--color-dark);
        user-select: none;
    }

    .logo-text .highlight {
        color: var(--color-primary);
    }

    .transition-shapes {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        pointer-events: none;
    }

    .shape {
        position: absolute;
        background-color: var(--color-primary);
        opacity: 0.08;
        transition: all ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .shape-1 {
        width: 300px;
        height: 300px;
        border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
        top: -100px;
        right: -100px;
        transform: rotate(-15deg) translateY(-100%);
    }

    .shape-2 {
        width: 200px;
        height: 200px;
        border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%;
        bottom: -50px;
        left: -50px;
        transform: translateY(100%);
    }

    .shape-3 {
        width: 150px;
        height: 150px;
        border-radius: 41% 59% 47% 53% / 44% 57% 43% 56%;
        top: 40%;
        right: 15%;
        transform: translateX(100%);
    }

    .shape-4 {
        width: 180px;
        height: 180px;
        clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        bottom: 20%;
        left: 10%;
        transform: rotate(25deg) translateX(-100%);
    }

    .page-transition-overlay.active .shape {
        transform: translate(0) rotate(0);
    }

    .page-transition-overlay.active .shape-1 {
        transform: rotate(-15deg);
    }

    .page-transition-overlay.active .shape-4 {
        transform: rotate(25deg);
    }

    body {
        opacity: 1;
        transition: opacity ${transitionDuration/2}ms ease;
    }

    body.transitioning {
        opacity: 0;
    }

    @media (max-width: 900px) {
        .logo-text {
            font-size: 2rem;
        }
    }

    @media (max-width: 600px) {
        .logo-text {
            font-size: 1.5rem;
        }
    }
    `;

    document.head.appendChild(style);

    // Handle all link clicks
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (!link) return;

        if (
            link.target === '_blank' ||
            link.href.startsWith('mailto:') ||
            link.href.startsWith('tel:') ||
            link.href.startsWith('#') ||
            link.hasAttribute('download') ||
            isAnimating
        ) return;

        e.preventDefault();
        const targetUrl = link.href;

        isAnimating = true;
        overlay.classList.add('active');

        setTimeout(() => {
            document.body.classList.add('transitioning');
        }, transitionDuration / 2);

        setTimeout(() => {
            window.location.href = targetUrl;
        }, transitionDuration);
    });

    // Handle page load transition
    window.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            isAnimating = false;
            overlay.classList.remove('active');
            document.body.classList.remove('transitioning');
        }
    });

    // Header scroll behavior
    const header = document.getElementById('site-header');
    let lastScroll = 0;
    let isHeaderHidden = false;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (window.innerWidth > 768) {
            if (currentScroll === 0) {
                header.style.backgroundColor = 'transparent';
                header.style.backdropFilter = 'none';
                header.style.webkitBackdropFilter = 'none';
                header.style.boxShadow = 'none';
                header.classList.remove('scrolled', 'hidden');
                isHeaderHidden = false;
            } 
            else if (currentScroll > lastScroll && !isHeaderHidden) {
                header.classList.add('hidden');
                isHeaderHidden = true;
            } 
            else if (currentScroll < lastScroll && isHeaderHidden) {
                header.classList.remove('hidden');
                header.classList.add('scrolled');
                header.style.backgroundColor = '#ffffff';
                header.style.backdropFilter = 'none';
                header.style.webkitBackdropFilter = 'none';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
                isHeaderHidden = false;
            }
        }

        lastScroll = currentScroll;
    });

    // Mobile Menu Toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuButton && navMenu) {
        mobileMenuButton.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            const spans = mobileMenuButton.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'translateY(8px) rotate(45deg)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
});