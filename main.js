/* Jai Laxmi Road Lines & Comm. Agency - Core UI & Logic Script */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navigation Scroll Effect
    initStickyNavbar();

    // 2. Mobile Menu Drawer Toggle
    initMobileMenu();

    // 3. Scroll Reveal Animations (Intersection Observer)
    initScrollReveal();

    // 4. Contact & Inquiry Form Validation
    initFormValidation();

    // 5. WhatsApp API link customization
    initWhatsAppClick();

    // 6. Active Nav Link Highlighter based on page URL
    highlightActiveNavLink();
});

/**
 * Adds dynamic scroll class to the navigation bar for premium design on scroll.
 */
function initStickyNavbar() {
    const header = document.querySelector('header nav');
    if (!header) return;

    const scrollThreshold = 20;

    const handleScroll = () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('navbar-scrolled');
        } else {
            header.classList.remove('navbar-scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    // Run once on load in case the page is already scrolled
    handleScroll();
}

/**
 * Handles opening and closing of the mobile navigation panel.
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!menuToggle || !mobileMenu) return;

    // Toggle menu
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('flex');
    });

    // Close menu when clicking links
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.setAttribute('aria-expanded', 'false');
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.setAttribute('aria-expanded', 'false');
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
        }
    });
}

/**
 * Uses Intersection Observer to fade in and slide up cards as they enter the screen.
 */
function initScrollReveal() {
    const animatedElements = document.querySelectorAll('.reveal-animated, .glass-card, .timeline-item');
    if (animatedElements.length === 0) return;

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                // Optional: Stop observing after reveal has triggered once
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // triggers slightly before entering the viewport fully
    });

    animatedElements.forEach(element => {
        // Pre-add reveal classes
        element.classList.add('reveal-animated');
        revealObserver.observe(element);
    });
}

/**
 * Validates fields on freight inquiry forms and contact forms.
 */
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    if (forms.length === 0) return;

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Clear previous errors
            clearFormErrors(form);

            // Validation checks
            let isValid = true;

            // 1. Name Check
            const nameInput = form.querySelector('input[type="text"][placeholder*="John"], input[type="text"][placeholder*="Name"]');
            if (nameInput && nameInput.value.trim().length < 2) {
                showInputError(nameInput, 'Please enter your full name (at least 2 letters).');
                isValid = false;
            }

            // 2. Mobile Check (Indian Format: 10 digits with optional +91 or 0 prefix)
            const phoneInput = form.querySelector('input[type="tel"], input[placeholder*="Mobile"], input[placeholder*="phone"]');
            if (phoneInput) {
                const phoneVal = phoneInput.value.trim();
                const phonePattern = /^(?:\+91|0)?[6-9]\d{9}$/;
                if (!phonePattern.test(phoneVal.replace(/\s+/g, ''))) {
                    showInputError(phoneInput, 'Please enter a valid 10-digit mobile number.');
                    isValid = false;
                }
            }

            // 3. Email Check (If email field exists)
            const emailInput = form.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim() !== '') {
                const emailVal = emailInput.value.trim();
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailVal)) {
                    showInputError(emailInput, 'Please enter a valid email address.');
                    isValid = false;
                }
            }

            // 4. Locations Check (For pickup/destination)
            const pickupInput = form.querySelector('input[placeholder*="Pickup"]');
            const destInput = form.querySelector('input[placeholder*="Destination"]');
            if (pickupInput && pickupInput.value.trim().length === 0) {
                showInputError(pickupInput, 'Pickup city is required.');
                isValid = false;
            }
            if (destInput && destInput.value.trim().length === 0) {
                showInputError(destInput, 'Destination city is required.');
                isValid = false;
            }

            // 5. Weight Check
            const weightInput = form.querySelector('input[type="number"][placeholder*="weight"], input[placeholder*="5"]');
            if (weightInput) {
                const weightVal = parseFloat(weightInput.value);
                if (isNaN(weightVal) || weightVal <= 0) {
                    showInputError(weightInput, 'Please enter a valid positive weight.');
                    isValid = false;
                }
            }

            if (!isValid) {
                // Focus the first invalid element
                const firstError = form.querySelector('.input-error-msg');
                if (firstError) {
                    firstError.previousElementSibling.focus();
                }
                return;
            }

            // Success simulation
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <span class="inline-block w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Processing...
                `;

                // Simulate server call
                setTimeout(() => {
                    // Show success block
                    showSuccessNotification(form, originalText);
                }, 1500);
            }
        });
    });
}

function showInputError(input, message) {
    input.classList.add('border-red-500', 'focus:border-red-500');
    input.classList.remove('border-transparent', 'focus:border-primary');

    const errorMsg = document.createElement('p');
    errorMsg.className = 'input-error-msg text-red-500 text-xs mt-1 ml-1 font-semibold';
    errorMsg.innerText = message;
    input.parentElement.appendChild(errorMsg);
}

function clearFormErrors(form) {
    form.querySelectorAll('.input-error-msg').forEach(msg => msg.remove());
    form.querySelectorAll('input, select, textarea').forEach(input => {
        input.classList.remove('border-red-500', 'focus:border-red-500');
        input.classList.add('border-transparent');
    });
}

function showSuccessNotification(form, originalBtnText) {
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Clear fields
    form.reset();

    // Reset button
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;

    // Show success dialog
    const successDiv = document.createElement('div');
    successDiv.className = 'fixed top-10 left-1/2 transform -translate-x-1/2 z-50 glass-card border-green-500/50 bg-white/95 px-8 py-6 rounded-2xl shadow-2xl text-center max-w-sm w-11/12 animate-float';
    successDiv.innerHTML = `
        <span class="material-symbols-outlined text-green-500 text-5xl mb-2">check_circle</span>
        <h4 class="text-xl font-bold text-primary mb-1">Inquiry Submitted!</h4>
        <p class="text-sm text-on-surface-variant mb-4">Thank you. Our logistics officer will contact you on your mobile within 30 minutes.</p>
        <button class="bg-primary text-white px-6 py-2 rounded-lg font-button-text hover:bg-primary-container transition-all" onclick="this.parentElement.remove()">Okay</button>
    `;
    document.body.appendChild(successDiv);

    // Auto dismiss after 6 seconds
    setTimeout(() => {
        if (successDiv.parentElement) successDiv.remove();
    }, 6000);
}

/**
 * Customizes WhatsApp links to trigger WhatsApp API with pre-filled message templates.
 */
function initWhatsAppClick() {
    const whatsappNumber = "";
    const waLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp.com"], button[class*="bg-[#25D366]"], a[class*="bg-[#25D366]"]');

    waLinks.forEach(link => {
        const textMessage = encodeURIComponent("Hello Jai Laxmi Road Lines, I'm reaching out from your website to inquire about transport and logistics services.");
        const apiUri = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${textMessage}`;

        if (link.tagName === 'A') {
            link.href = apiUri;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
        } else if (link.tagName === 'BUTTON') {
            link.addEventListener('click', () => {
                window.open(apiUri, '_blank', 'noopener,noreferrer');
            });
        }
    });
}

/**
 * Highlights the active page navigation link based on the window location.
 */
function highlightActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        let linkPath = link.getAttribute('href');
        if (!linkPath) return;

        // Strip queries/hashes
        linkPath = linkPath.split('?')[0].split('#')[0];

        // Treat #home or empty link as index.html
        if (linkPath === '#' || linkPath === '' || linkPath === 'index.html') {
            linkPath = 'index.html';
        }

        if (currentPath === linkPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
