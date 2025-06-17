// script.js for Nare Logistics

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const nav = document.querySelector('nav');
    
    mobileMenuButton.addEventListener('click', function() {
        nav.classList.toggle('active');
        const isExpanded = nav.classList.contains('active');
        this.setAttribute('aria-expanded', isExpanded);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.prepend(scrollProgress);
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + '%';
    });

    // Animated statistics counter
    const statNumbers = document.querySelectorAll('.stat-number');
    const speed = 200; // Lower is faster
    
    function animateStats() {
        statNumbers.forEach(statNumber => {
            const target = +statNumber.getAttribute('data-target');
            const count = +statNumber.innerText;
            const increment = target / speed;
            
            if (count < target) {
                statNumber.innerText = Math.ceil(count + increment);
                setTimeout(animateStats, 1);
            } else {
                statNumber.innerText = target;
            }
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate stats when stats section is visible
                if (entry.target.classList.contains('stats-container')) {
                    animateStats();
                }
                
                // Fade in elements
                if (entry.target.classList.contains('fade-in')) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
                
                // Timeline animation
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.classList.add('visible');
                }
            }
        });
    }, observerOptions);

    // Observe all elements that need animation
    document.querySelectorAll('.fade-in, .stats-container, .timeline-item').forEach(el => {
        observer.observe(el);
    });

    // Testimonial carousel
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    const indicators = document.querySelectorAll('.testimonial-indicators button');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        indicators[index].classList.add('active');
        currentTestimonial = index;
    }

    prevBtn.addEventListener('click', () => {
        let newIndex = currentTestimonial - 1;
        if (newIndex < 0) newIndex = testimonials.length - 1;
        showTestimonial(newIndex);
    });

    nextBtn.addEventListener('click', () => {
        let newIndex = currentTestimonial + 1;
        if (newIndex >= testimonials.length) newIndex = 0;
        showTestimonial(newIndex);
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => showTestimonial(index));
    });

    // Auto-rotate testimonials
    let testimonialInterval = setInterval(() => {
        let newIndex = currentTestimonial + 1;
        if (newIndex >= testimonials.length) newIndex = 0;
        showTestimonial(newIndex);
    }, 5000);

    // Pause auto-rotation on hover
    const carousel = document.querySelector('.testimonials-carousel');
    carousel.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
    carousel.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
            let newIndex = currentTestimonial + 1;
            if (newIndex >= testimonials.length) newIndex = 0;
            showTestimonial(newIndex);
        }, 5000);
    });

    // Current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Feature card details buttons
    const featureButtons = document.querySelectorAll('.feature-details-btn');
    featureButtons.forEach(button => {
        button.addEventListener('click', function() {
            // In a real implementation, this would show more details about the feature
            alert('This would show more details about this feature in a full implementation.');
        });
    });

    // CTA button functionality
    const ctaButton = document.getElementById('cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Scroll to contact section or show a modal
            document.querySelector('.form-container')?.scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Lightbox for images (would need implementation)
    const images = document.querySelectorAll('img[data-lightbox]');
    images.forEach(img => {
        img.addEventListener('click', function() {
            // Lightbox implementation would go here
            alert('Lightbox functionality would display this image larger.');
        });
    });

    // Form validation for any forms on the page
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    const errorMsg = field.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.style.display = 'block';
                        errorMsg.textContent = 'This field is required';
                    }
                } else {
                    field.classList.remove('error');
                    const errorMsg = field.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.style.display = 'none';
                    }
                }
            });
            
            // Email validation
            const emailFields = form.querySelectorAll('input[type="email"]');
            emailFields.forEach(field => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (field.value && !emailRegex.test(field.value)) {
                    isValid = false;
                    field.classList.add('error');
                    const errorMsg = field.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.style.display = 'block';
                        errorMsg.textContent = 'Please enter a valid email address';
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                // Scroll to first error
                const firstError = form.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            } else {
                // Form is valid - could show success message
                const successMessage = form.querySelector('.success-message');
                if (successMessage) {
                    e.preventDefault();
                    successMessage.style.display = 'block';
                    form.reset();
                    
                    // Scroll to success message
                    setTimeout(() => {
                        successMessage.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }, 100);
                }
            }
        });
    });

    // Close success message buttons
    const closeSuccessButtons = document.querySelectorAll('.close-success');
    closeSuccessButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.success-message').style.display = 'none';
        });
    });

    // Character counters for textareas
    const textareas = document.querySelectorAll('textarea[data-maxlength]');
    textareas.forEach(textarea => {
        const maxLength = parseInt(textarea.getAttribute('data-maxlength'));
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.textContent = `0/${maxLength}`;
        textarea.parentNode.insertBefore(counter, textarea.nextSibling);
        
        textarea.addEventListener('input', function() {
            const remaining = maxLength - this.value.length;
            counter.textContent = `${this.value.length}/${maxLength}`;
            
            if (remaining < 0) {
                counter.style.color = 'red';
                this.value = this.value.substring(0, maxLength);
            } else {
                counter.style.color = '#7f8c8d';
            }
        });
    });

    // AJAX form submission example
    const ajaxForms = document.querySelectorAll('form[data-ajax]');
    ajaxForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const submitButton = form.querySelector('[type="submit"]');
            const originalButtonText = submitButton.value;
            
            // Show loading state
            submitButton.disabled = true;
            submitButton.value = 'Sending...';
            
            // Simulate AJAX request
            setTimeout(() => {
                // In a real implementation, this would be a fetch or XMLHttpRequest
                console.log('Form data:', Object.fromEntries(formData));
                
                // Show success message
                const successMessage = form.querySelector('.success-message');
                if (successMessage) {
                    successMessage.style.display = 'block';
                    form.reset();
                    
                    // Scroll to success message
                    successMessage.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
                
                // Reset button
                submitButton.disabled = false;
                submitButton.value = originalButtonText;
            }, 1500);
        });
    });

    // Theme switcher functionality
    const themeSwitcher = document.createElement('div');
    themeSwitcher.className = 'theme-switcher';
    themeSwitcher.innerHTML = `
        <button aria-label="Toggle dark mode" class="theme-toggle">
            <i class="fas fa-moon"></i>
        </button>
    `;
    document.body.appendChild(themeSwitcher);
    
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        this.setAttribute('aria-label', isDark ? 'Toggle light mode' : 'Toggle dark mode');
        this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        
        // Save preference to localStorage
        localStorage.setItem('darkMode', isDark);
    });
    
    // Check for saved theme preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        themeToggle.setAttribute('aria-label', 'Toggle light mode');
    }

    // Initialize any interactive maps (placeholder - would need API key for real implementation)
    if (typeof L !== 'undefined') {
        // Leaflet.js map initialization would go here
        console.log('Map library loaded, would initialize map here');
    }

    // Dynamic content loading example
    const dynamicContentSections = document.querySelectorAll('[data-dynamic-content]');
    dynamicContentSections.forEach(section => {
        const url = section.getAttribute('data-dynamic-content');
        
        if (url) {
            // In a real implementation, this would fetch content from the URL
            setTimeout(() => {
                section.innerHTML = `
                    <h3>Dynamically Loaded Content</h3>
                    <p>This content would be loaded from ${url} in a real implementation.</p>
                    <p>For demonstration, we're showing this placeholder content.</p>
                `;
                section.classList.add('loaded');
            }, 1000);
        }
    });

    // Search functionality
    const searchForms = document.querySelectorAll('form[role="search"]');
    searchForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = form.querySelector('input[type="search"]');
            const searchTerm = searchInput.value.trim();
            
            if (searchTerm) {
                // In a real implementation, this would search your content
                alert(`Search functionality would search for: ${searchTerm}`);
                // Could redirect to a search results page or filter content
            }
        });
    });

    // Accordion functionality for any accordions on the page
    const accordions = document.querySelectorAll('.accordion');
    accordions.forEach(accordion => {
        const header = accordion.querySelector('.accordion-header');
        const content = accordion.querySelector('.accordion-content');
        
        header.addEventListener('click', function() {
            const isOpen = content.style.maxHeight;
            
            // Close all other accordions
            document.querySelectorAll('.accordion-content').forEach(item => {
                if (item !== content) {
                    item.style.maxHeight = null;
                    item.previousElementSibling.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle this accordion
            if (isOpen) {
                content.style.maxHeight = null;
                header.setAttribute('aria-expanded', 'false');
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Tab functionality
    const tabContainers = document.querySelectorAll('.tabs');
    tabContainers.forEach(container => {
        const tabs = container.querySelectorAll('.tab');
        const tabContents = container.querySelectorAll('.tab-content');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const target = this.getAttribute('data-tab');
                
                // Update active tab
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding content
                tabContents.forEach(content => {
                    if (content.id === target) {
                        content.classList.add('active');
                    } else {
                        content.classList.remove('active');
                    }
                });
            });
        });
    });

    // Modal functionality
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                // Focus on first focusable element
                const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                if (focusable) focusable.focus();
            }
        });
    });
    
    modals.forEach(modal => {
        const closeButtons = modal.querySelectorAll('.modal-close, .modal-close-btn');
        
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        });
        
        // Close when clicking outside content
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});
// script.js for About Us Page

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle (consistent with home page)
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const nav = document.querySelector('nav');
    
    mobileMenuButton.addEventListener('click', function() {
        nav.classList.toggle('active');
        const isExpanded = nav.classList.contains('active');
        this.setAttribute('aria-expanded', isExpanded);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Team Slider Functionality
    const teamSlider = document.getElementById('team-slider');
    if (teamSlider) {
        const teamMembers = [
            {
                name: "Thabo Nare",
                position: "Founder & CEO",
                bio: "With over 15 years in logistics, Thabo founded Nare Logistics to revolutionize supply chain solutions in Africa.",
                image: "Images/team1.jpg"
            },
            {
                name: "Lerato Molefe",
                position: "Operations Director",
                bio: "Lerato oversees all daily operations with a focus on efficiency and customer satisfaction.",
                image: "Images/team2.jpg"
            },
            {
                name: "David Smith",
                position: "International Logistics",
                bio: "David manages our global network with expertise in customs and international regulations.",
                image: "Images/team3.jpg"
            },
            {
                name: "Nomsa Khumalo",
                position: "Customer Relations",
                bio: "Nomsa ensures every client receives personalized attention and swift problem resolution.",
                image: "Images/team4.jpg"
            },
            {
                name: "James Wilson",
                position: "Technology Director",
                bio: "James leads our digital transformation, implementing cutting-edge tracking and management systems.",
                image: "Images/team5.jpg"
            }
        ];

        // Populate team slider
        teamMembers.forEach(member => {
            const memberElement = document.createElement('div');
            memberElement.className = 'team-member';
            memberElement.innerHTML = `
                <img src="${member.image}" alt="${member.name}" loading="lazy">
                <div class="team-member-info">
                    <h4>${member.name}</h4>
                    <p>${member.position}</p>
                    <div class="bio">${member.bio}</div>
                </div>
            `;
            teamSlider.appendChild(memberElement);
        });

        // Team slider navigation
        let currentSlide = 0;
        const teamMemberElements = document.querySelectorAll('.team-member');
        
        function showTeamMember(index) {
            teamMemberElements.forEach((member, i) => {
                member.style.transform = `translateX(${100 * (i - index)}%)`;
            });
            currentSlide = index;
        }

        // Initialize slider
        showTeamMember(0);

        // Auto-advance team slider
        let teamInterval = setInterval(() => {
            let nextSlide = currentSlide + 1;
            if (nextSlide >= teamMembers.length) nextSlide = 0;
            showTeamMember(nextSlide);
        }, 5000);

        // Pause on hover
        teamSlider.addEventListener('mouseenter', () => clearInterval(teamInterval));
        teamSlider.addEventListener('mouseleave', () => {
            teamInterval = setInterval(() => {
                let nextSlide = currentSlide + 1;
                if (nextSlide >= teamMembers.length) nextSlide = 0;
                showTeamMember(nextSlide);
            }, 5000);
        });

        // Touch support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        teamSlider.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});
        
        teamSlider.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, {passive: true});
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                // Swipe left - next
                let nextSlide = currentSlide + 1;
                if (nextSlide >= teamMembers.length) nextSlide = 0;
                showTeamMember(nextSlide);
            }
            
            if (touchEndX > touchStartX + 50) {
                // Swipe right - previous
                let prevSlide = currentSlide - 1;
                if (prevSlide < 0) prevSlide = teamMembers.length - 1;
                showTeamMember(prevSlide);
            }
        }
    }

    // Timeline Functionality
    const timeline = document.getElementById('timeline');
    if (timeline) {
        const milestones = [
            {
                year: "2012",
                title: "Company Founded",
                description: "Nare Logistics was established in Johannesburg with a small team and big ambitions to transform logistics in Africa."
            },
            {
                year: "2014",
                title: "First International Route",
                description: "Expanded operations to neighboring countries, establishing our first cross-border logistics network."
            },
            {
                year: "2016",
                title: "Warehousing Expansion",
                description: "Opened our first dedicated warehousing facility, offering comprehensive storage solutions."
            },
            {
                year: "2018",
                title: "Technology Platform Launch",
                description: "Introduced our proprietary tracking system, providing real-time visibility for all shipments."
            },
            {
                year: "2020",
                title: "Sustainability Initiative",
                description: "Launched our green logistics program to reduce environmental impact across all operations."
            },
            {
                year: "2022",
                title: "50 Countries Reached",
                description: "Celebrated servicing clients in 50 countries across 5 continents with our global network."
            },
            {
                year: "2025",
                title: "Digital Transformation",
                description: "Implemented AI-driven logistics optimization across all business units."
            }
        ];

        // Populate timeline
        milestones.forEach((milestone, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.className = `timeline-item ${index % 2 === 0 ? 'left' : 'right'}`;
            timelineItem.innerHTML = `
                <div class="timeline-content">
                    <div class="timeline-date">${milestone.year}</div>
                    <h3 class="timeline-title">${milestone.title}</h3>
                    <p class="timeline-text">${milestone.description}</p>
                </div>
            `;
            timeline.appendChild(timelineItem);
        });

        // Animate timeline on scroll
        const timelineItems = document.querySelectorAll('.timeline-item');
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
    }

    // Feature Card Animations
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.color = '#2980b9';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1)';
                icon.style.color = '#3498db';
            }
        });
    });

    // Mission Image Animation
    const missionImage = document.querySelector('.mission-image img');
    if (missionImage) {
        missionImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        missionImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // CTA Button Effects
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Scroll progress indicator (consistent with home page)
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.prepend(scrollProgress);
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + '%';
    });

    // Theme switcher (consistent with home page)
    const themeSwitcher = document.createElement('div');
    themeSwitcher.className = 'theme-switcher';
    themeSwitcher.innerHTML = `
        <button aria-label="Toggle dark mode" class="theme-toggle">
            <i class="fas fa-moon"></i>
        </button>
    `;
    document.body.appendChild(themeSwitcher);
    
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        this.setAttribute('aria-label', isDark ? 'Toggle light mode' : 'Toggle dark mode');
        this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        
        // Save preference to localStorage
        localStorage.setItem('darkMode', isDark);
    });
    
    // Check for saved theme preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        themeToggle.setAttribute('aria-label', 'Toggle light mode');
    }

    // Add subtle animation to section headers
    const sectionHeaders = document.querySelectorAll('.section-header h2');
    sectionHeaders.forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'translateY(20px)';
        header.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        const headerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.5 });
        
        headerObserver.observe(header);
    });
});
// script.js for Contact Us Page

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle (consistent across all pages)
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const nav = document.querySelector('nav');
    
    mobileMenuButton.addEventListener('click', function() {
        nav.classList.toggle('active');
        const isExpanded = nav.classList.contains('active');
        this.setAttribute('aria-expanded', isExpanded);
    });

    // Current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Form Validation
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('contact-success');
    
    if (contactForm) {
        // Character counter for message textarea
        const messageTextarea = document.getElementById('contact-message');
        const charCounter = document.querySelector('.char-counter');
        
        if (messageTextarea && charCounter) {
            messageTextarea.addEventListener('input', function() {
                const currentLength = this.value.length;
                const maxLength = 500;
                charCounter.textContent = `${currentLength}/${maxLength}`;
                
                if (currentLength > maxLength) {
                    charCounter.style.color = '#e74c3c';
                    this.classList.add('error');
                } else {
                    charCounter.style.color = '#7f8c8d';
                    this.classList.remove('error');
                }
            });
        }

        // Form submission handler
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous errors
            resetErrors();
            
            // Validate form
            const isValid = validateForm();
            
            if (isValid) {
                // Simulate form submission (in a real app, this would be AJAX)
                simulateFormSubmission();
            }
        });

        // Close success message
        const closeSuccessBtn = document.querySelector('.close-success');
        if (closeSuccessBtn) {
            closeSuccessBtn.addEventListener('click', function() {
                successMessage.style.display = 'none';
                contactForm.reset();
                document.querySelector('.char-counter').textContent = '0/500';
            });
        }
    }

    // Form validation functions
    function validateForm() {
        let isValid = true;
        
        // Validate name
        const nameInput = document.getElementById('contact-name');
        if (!nameInput.value.trim()) {
            showError('name-error', 'Please enter your name');
            isValid = false;
        }
        
        // Validate email
        const emailInput = document.getElementById('contact-email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim()) {
            showError('email-error', 'Please enter your email');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value)) {
            showError('email-error', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate phone (if provided)
        const phoneInput = document.getElementById('contact-phone');
        if (phoneInput.value.trim()) {
            const phoneRegex = /^[0-9]{10,15}$/;
            if (!phoneRegex.test(phoneInput.value.replace(/\D/g, ''))) {
                showError('phone-error', 'Please enter a valid phone number');
                isValid = false;
            }
        }
        
        // Validate subject
        const subjectSelect = document.getElementById('contact-subject');
        if (!subjectSelect.value) {
            showError('subject-error', 'Please select a subject');
            isValid = false;
        }
        
        // Validate message
        const messageInput = document.getElementById('contact-message');
        if (!messageInput.value.trim()) {
            showError('message-error', 'Please enter your message');
            isValid = false;
        } else if (messageInput.value.length > 500) {
            showError('message-error', 'Message must be 500 characters or less');
            isValid = false;
        }
        
        return isValid;
    }

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            
            // Add error class to corresponding input
            const inputId = elementId.replace('-error', '');
            const inputElement = document.getElementById(inputId);
            if (inputElement) {
                inputElement.classList.add('error');
                
                // Scroll to first error
                if (inputElement === document.querySelector('.error')) {
                    inputElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }
        }
    }

    function resetErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
        });
        
        const errorInputs = document.querySelectorAll('.error');
        errorInputs.forEach(input => {
            input.classList.remove('error');
        });
    }

    function simulateFormSubmission() {
        const contactForm = document.getElementById('contact-form');
        const successMessage = document.getElementById('contact-success');
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Simulate API call delay
        setTimeout(() => {
            // Hide form and show success message
            contactForm.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Reset button
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            
            // Scroll to success message
            successMessage.scrollIntoView({
                behavior: 'smooth'
            });
            
            // In a real implementation, you would use fetch() to submit the form
            // Example:
            /*
            const formData = new FormData(contactForm);
            
            fetch('/submit_contact', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    contactForm.style.display = 'none';
                    successMessage.style.display = 'block';
                } else {
                    showSubmissionError();
                }
            })
            .catch(error => {
                showSubmissionError();
            });
            */
        }, 1500);
    }

    // Interactive map functionality
    const mapIframe = document.querySelector('.map-container iframe');
    if (mapIframe) {
        // Lazy load the map when it comes into view
        const mapObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const src = mapIframe.getAttribute('src');
                    if (!src.includes('embed')) {
                        mapIframe.setAttribute('src', src.replace('preview', 'embed'));
                    }
                    mapObserver.unobserve(mapIframe);
                }
            });
        }, { threshold: 0.1 });
        
        mapObserver.observe(mapIframe);
    }

    // Contact info cards hover effect
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.color = '#2980b9';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1)';
                icon.style.color = '#3498db';
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Theme switcher (consistent across all pages)
    const themeSwitcher = document.createElement('div');
    themeSwitcher.className = 'theme-switcher';
    themeSwitcher.innerHTML = `
        <button aria-label="Toggle dark mode" class="theme-toggle">
            <i class="fas fa-moon"></i>
        </button>
    `;
    document.body.appendChild(themeSwitcher);
    
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        this.setAttribute('aria-label', isDark ? 'Toggle light mode' : 'Toggle dark mode');
        this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        
        // Save preference to localStorage
        localStorage.setItem('darkMode', isDark);
    });
    
    // Check for saved theme preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        themeToggle.setAttribute('aria-label', 'Toggle light mode');
    }

    // Scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.prepend(scrollProgress);
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
});
// Contact Form Validation and Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const phoneInput = document.getElementById('contact-phone');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');
    const charCounter = document.querySelector('.char-counter');
    const successMessage = document.getElementById('contact-success');
    const closeSuccessBtn = document.querySelector('.close-success');
    
    // Error elements
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const phoneError = document.getElementById('phone-error');
    const subjectError = document.getElementById('subject-error');
    const messageError = document.getElementById('message-error');
    
    // Form validation flags
    let isNameValid = false;
    let isEmailValid = false;
    let isPhoneValid = true; // optional field
    let isSubjectValid = false;
    let isMessageValid = false;
    
    // Character counter for message
    messageInput.addEventListener('input', function() {
        const currentLength = this.value.length;
        charCounter.textContent = `${currentLength}/500`;
        
        if (currentLength > 500) {
            charCounter.style.color = 'red';
        } else {
            charCounter.style.color = '#7f8c8d';
        }
    });
    
    // Input validation functions
    function validateName() {
        const nameValue = nameInput.value.trim();
        const nameRegex = /^[a-zA-Z\s]{2,50}$/;
        
        if (nameValue === '') {
            nameError.textContent = 'Name is required';
            nameError.style.display = 'block';
            nameInput.classList.add('error');
            isNameValid = false;
        } else if (!nameRegex.test(nameValue)) {
            nameError.textContent = 'Name must be 2-50 letters only';
            nameError.style.display = 'block';
            nameInput.classList.add('error');
            isNameValid = false;
        } else {
            nameError.style.display = 'none';
            nameInput.classList.remove('error');
            isNameValid = true;
        }
    }
    
    function validateEmail() {
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailValue === '') {
            emailError.textContent = 'Email is required';
            emailError.style.display = 'block';
            emailInput.classList.add('error');
            isEmailValid = false;
        } else if (!emailRegex.test(emailValue)) {
            emailError.textContent = 'Please enter a valid email address';
            emailError.style.display = 'block';
            emailInput.classList.add('error');
            isEmailValid = false;
        } else {
            emailError.style.display = 'none';
            emailInput.classList.remove('error');
            isEmailValid = true;
        }
    }
    
    function validatePhone() {
        const phoneValue = phoneInput.value.trim();
        const phoneRegex = /^[0-9\s+\-()]{10,15}$/;
        
        // Phone is optional, but if provided must be valid
        if (phoneValue !== '' && !phoneRegex.test(phoneValue)) {
            phoneError.textContent = 'Please enter a valid phone number';
            phoneError.style.display = 'block';
            phoneInput.classList.add('error');
            isPhoneValid = false;
        } else {
            phoneError.style.display = 'none';
            phoneInput.classList.remove('error');
            isPhoneValid = true;
        }
    }
    
    function validateSubject() {
        const subjectValue = subjectInput.value;
        
        if (subjectValue === '') {
            subjectError.textContent = 'Please select a subject';
            subjectError.style.display = 'block';
            subjectInput.classList.add('error');
            isSubjectValid = false;
        } else {
            subjectError.style.display = 'none';
            subjectInput.classList.remove('error');
            isSubjectValid = true;
        }
    }
    
    function validateMessage() {
        const messageValue = messageInput.value.trim();
        
        if (messageValue === '') {
            messageError.textContent = 'Message is required';
            messageError.style.display = 'block';
            messageInput.classList.add('error');
            isMessageValid = false;
        } else if (messageValue.length > 500) {
            messageError.textContent = 'Message must be 500 characters or less';
            messageError.style.display = 'block';
            messageInput.classList.add('error');
            isMessageValid = false;
        } else {
            messageError.style.display = 'none';
            messageInput.classList.remove('error');
            isMessageValid = true;
        }
    }
    
    // Event listeners for real-time validation
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    phoneInput.addEventListener('blur', validatePhone);
    subjectInput.addEventListener('change', validateSubject);
    messageInput.addEventListener('blur', validateMessage);
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields before submission
        validateName();
        validateEmail();
        validatePhone();
        validateSubject();
        validateMessage();
        
        // Check if all required fields are valid
        if (isNameValid && isEmailValid && isPhoneValid && isSubjectValid && isMessageValid) {
            // Simulate form submission (in a real scenario, this would be an AJAX call)
            simulateFormSubmission();
        } else {
            // Scroll to the first error
            const firstError = document.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    // Simulate form submission (replace with actual AJAX call in production)
    function simulateFormSubmission() {
        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Simulate API call delay
        setTimeout(function() {
            // Hide form and show success message
            contactForm.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Reset form and button state (hidden for now)
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 1500);
    }
    
    // Close success message and reset form
    closeSuccessBtn.addEventListener('click', function() {
        successMessage.style.display = 'none';
        contactForm.style.display = 'block';
        contactForm.reset();
        charCounter.textContent = '0/500';
        
        // Reset validation states
        isNameValid = false;
        isEmailValid = false;
        isPhoneValid = true;
        isSubjectValid = false;
        isMessageValid = false;
        
        // Remove error classes
        nameInput.classList.remove('error');
        emailInput.classList.remove('error');
        phoneInput.classList.remove('error');
        subjectInput.classList.remove('error');
        messageInput.classList.remove('error');
        
        // Hide error messages
        nameError.style.display = 'none';
        emailError.style.display = 'none';
        phoneError.style.display = 'none';
        subjectError.style.display = 'none';
        messageError.style.display = 'none';
    });
    
    // Add animation to form elements when they come into view
    const formGroups = document.querySelectorAll('.form-group');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        group.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(group);
    });
    
    // Google Maps interaction (if you want to add more interactivity)
    const mapIframe = document.querySelector('.map-container iframe');
    if (mapIframe) {
        mapIframe.addEventListener('load', function() {
            // You could add additional map interaction code here
            console.log('Map loaded successfully');
        });
    }
});
// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const nav = document.querySelector('nav');
    
    mobileMenuButton.addEventListener('click', function() {
        nav.classList.toggle('active');
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
    });

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Form validation and functionality
    const enquiryForm = document.getElementById('enquiry-form');
    const successMessage = document.getElementById('success-message');
    const messageTextarea = document.getElementById('message');
    const charCounter = document.querySelector('.char-counter');

    if (enquiryForm) {
        // Character counter for message textarea
        messageTextarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            charCounter.textContent = `${currentLength}/500`;
            
            if (currentLength > 500) {
                charCounter.style.color = '#e74c3c';
            } else {
                charCounter.style.color = '#7f8c8d';
            }
        });

        // Form validation
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous errors
            resetErrors();
            
            // Validate fields
            const isValidName = validateName();
            const isValidEmail = validateEmail();
            const isValidPhone = validatePhone();
            const isValidService = validateService();
            const isValidMessage = validateMessage();
            
            if (isValidName && isValidEmail && isValidPhone && isValidService && isValidMessage) {
                // Simulate form submission (in a real scenario, this would be an AJAX call)
                simulateSubmission();
            }
        });

        // Form reset
        enquiryForm.querySelector('.reset-btn').addEventListener('click', function() {
            resetErrors();
            charCounter.textContent = '0/500';
            charCounter.style.color = '#7f8c8d';
        });

        // Close success message
        document.querySelector('.close-success').addEventListener('click', function() {
            successMessage.style.display = 'none';
        });
    }

    // Validation functions
    function validateName() {
        const nameInput = document.getElementById('name');
        const errorElement = document.getElementById('name-error');
        
        if (!nameInput.value.trim()) {
            showError(nameInput, errorElement, 'Full name is required');
            return false;
        }
        
        if (nameInput.value.trim().length < 3) {
            showError(nameInput, errorElement, 'Name must be at least 3 characters');
            return false;
        }
        
        return true;
    }
    
    function validateEmail() {
        const emailInput = document.getElementById('email');
        const errorElement = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailInput.value.trim()) {
            showError(emailInput, errorElement, 'Email is required');
            return false;
        }
        
        if (!emailRegex.test(emailInput.value)) {
            showError(emailInput, errorElement, 'Please enter a valid email address');
            return false;
        }
        
        return true;
    }
    
    function validatePhone() {
        const phoneInput = document.getElementById('phone');
        const errorElement = document.getElementById('phone-error');
        
        // Phone is optional, but if provided, validate it
        if (phoneInput.value.trim() && !/^[\d\s\-+]{10,15}$/.test(phoneInput.value)) {
            showError(phoneInput, errorElement, 'Please enter a valid phone number (10-15 digits)');
            return false;
        }
        
        return true;
    }
    
    function validateService() {
        const serviceSelect = document.getElementById('service');
        const errorElement = document.getElementById('service-error');
        
        if (!serviceSelect.value) {
            showError(serviceSelect, errorElement, 'Please select a service');
            return false;
        }
        
        return true;
    }
    
    function validateMessage() {
        const messageInput = document.getElementById('message');
        const errorElement = document.getElementById('message-error');
        
        if (!messageInput.value.trim()) {
            showError(messageInput, errorElement, 'Message is required');
            return false;
        }
        
        if (messageInput.value.trim().length < 10) {
            showError(messageInput, errorElement, 'Message must be at least 10 characters');
            return false;
        }
        
        if (messageInput.value.length > 500) {
            showError(messageInput, errorElement, 'Message must be 500 characters or less');
            return false;
        }
        
        return true;
    }
    
    function showError(inputElement, errorElement, message) {
        inputElement.classList.add('error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    function resetErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        const errorInputs = document.querySelectorAll('.error');
        
        errorMessages.forEach(el => {
            el.style.display = 'none';
        });
        
        errorInputs.forEach(el => {
            el.classList.remove('error');
        });
    }
    
    function simulateSubmission() {
        // Show loading state
        const submitBtn = enquiryForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Hide form and show success message
            enquiryForm.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Reset form and button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Reset form after showing success (optional)
            setTimeout(() => {
                enquiryForm.reset();
                enquiryForm.style.display = 'block';
                successMessage.style.display = 'none';
            }, 5000);
        }, 1500);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);
    
    window.addEventListener('scroll', function() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        scrollProgress.style.width = scrollPercentage + '%';
    });

    // Animation for elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .service-card, .timeline-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load

    // Testimonial carousel functionality
    const testimonials = document.querySelectorAll('.testimonial');
    const indicators = document.querySelectorAll('.testimonial-indicators button');
    let currentTestimonial = 0;
    
    if (testimonials.length > 0) {
        // Show first testimonial
        showTestimonial(currentTestimonial);
        
        // Auto-rotate testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
        
        // Indicator click handlers
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentTestimonial = index;
                showTestimonial(currentTestimonial);
            });
        });
        
        // Previous/next buttons
        document.querySelector('.prev-testimonial')?.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentTestimonial);
        });
        
        document.querySelector('.next-testimonial')?.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        });
    }
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        testimonials[index].classList.add('active');
        
        indicators.forEach(indicator => indicator.classList.remove('active'));
        indicators[index].classList.add('active');
    }
});

// Form input processing (simulated email sending)
function processFormInput(formData) {
    console.log('Form data to be processed:', formData);
    // In a real implementation, this would send the data to a server
    return true;
}