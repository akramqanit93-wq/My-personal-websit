// ============================================
// NAVIGATION
// ============================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
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

// Active link on scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// BACK TO TOP BUTTON
// ============================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================
// FADE-IN ON SCROLL (Intersection Observer)
// ============================================
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

fadeElements.forEach(el => observer.observe(el));

// ============================================
// SKILL BAR ANIMATION
// ============================================
const skillBars = document.querySelectorAll('.skill-bar');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target.querySelector('.skill-fill');
            const width = fill.style.width;
            fill.style.width = '0';
            setTimeout(() => {
                fill.style.width = width;
            }, 200);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// ============================================
// PORTFOLIO FILTER
// ============================================
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ============================================
// CONTACT FORM
// ============================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const captchaQuestion = document.getElementById('captchaQuestion');

// Generate random CAPTCHA
let num1 = Math.floor(Math.random() * 10) + 1;
let num2 = Math.floor(Math.random() * 10) + 1;
captchaQuestion.textContent = num1 + ' + ' + num2;

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const captchaAnswer = parseInt(document.getElementById('captchaAnswer').value);

    // Validation
    if (name.length < 2) {
        showFormStatus('Please enter your name.', 'error');
        return;
    }
    if (!email.includes('@') || !email.includes('.')) {
        showFormStatus('Please enter a valid email address.', 'error');
        return;
    }
    if (message.length < 10) {
        showFormStatus('Message must be at least 10 characters.', 'error');
        return;
    }
    if (captchaAnswer !== num1 + num2) {
        showFormStatus('Incorrect CAPTCHA answer. Please try again.', 'error');
        refreshCaptcha();
        return;
    }

    // Simulate sending
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
        showFormStatus('Thank you, ' + name + '! Your message has been sent successfully. I will get back to you soon.', 'success');
        this.reset();
        refreshCaptcha();
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        submitBtn.disabled = false;
    }, 1500);
});

function showFormStatus(text, type) {
    formStatus.textContent = text;
    formStatus.className = 'form-status ' + type;
    formStatus.style.display = 'block';

    setTimeout(() => {
        formStatus.style.display = 'none';
    }, 6000);
}

function refreshCaptcha() {
    num1 = Math.floor(Math.random() * 10) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;
    captchaQuestion.textContent = num1 + ' + ' + num2;
    document.getElementById('captchaAnswer').value = '';
}
