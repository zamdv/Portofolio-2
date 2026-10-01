// ================= PRELOADER =================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 800); // Delay sedikit agar animasi smooth
});

// ================= MOBILE MENU =================
const mobileMenu = document.getElementById('mobile-menu');
const navbar = document.querySelector('.navbar');
const header = document.querySelector('.header');

mobileMenu?.addEventListener('click', () => {
    const isOpen = navbar?.classList.toggle('active') ?? false;
    mobileMenu.classList.toggle('active', isOpen);
    mobileMenu.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        navbar?.classList.remove('active');
        mobileMenu?.classList.remove('active');
        mobileMenu?.setAttribute('aria-expanded', 'false');
    });
});

// ================= HEADER SCROLL =================
const updateHeader = () => {
    header?.classList.toggle('scrolled', window.scrollY > 20);
};
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

// ================= ACTIVE NAV LINK =================
const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.navbar a')];

const setActiveNav = () => {
    const position = window.scrollY + window.innerHeight * 0.35;
    let current = sections[0]?.id || '';
    
    for (const section of sections) {
        if (position >= section.offsetTop) current = section.id;
    }
    
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
};
setActiveNav();
window.addEventListener('scroll', setActiveNav, { passive: true });

// ================= TYPING ANIMATION =================
const typingText = document.querySelector('.typing-text span');
const words = ['Backend Student', 'PHP Learner', 'Laravel Enthusiast', 'API Developer'];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    if (!typingText) return;
    const word = words[wordIndex];
    
    typingText.textContent = deleting 
        ? word.slice(0, charIndex - 1) 
        : word.slice(0, charIndex + 1);
        
    charIndex += deleting ? -1 : 1;
    let speed = deleting ? 45 : 80;
    
    if (!deleting && charIndex === word.length) {
        deleting = true;
        speed = 1500;
    } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 350;
    }
    
    window.setTimeout(typeEffect, speed);
}
typeEffect();

// ================= SMOOTH SCROLL =================
for (const anchor of document.querySelectorAll('a[href^="#"]')) {
    anchor.addEventListener('click', event => {
        const targetId = anchor.getAttribute('href');
        if (!targetId || targetId === '#') return;
        const target = document.querySelector(targetId);
        if (!target) return;
        
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

// ================= REVEAL & SKILL BAR ANIMATION =================
const revealItems = document.querySelectorAll('.reveal');
const skillBars = document.querySelectorAll('.skill-progress');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        
        entry.target.classList.add('visible');
        
        // Trigger skill bar animation if inside the revealed element
        if (entry.target.classList.contains('skills-column')) {
            const bars = entry.target.querySelectorAll('.skill-progress');
            bars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                bar.style.setProperty('--progress', `${progress}%`);
                setTimeout(() => {
                    bar.classList.add('animate');
                }, 200); // Delay sedikit agar transisi lebih terasa
            });
        }
        
        observer.unobserve(entry.target);
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

revealItems.forEach(item => revealObserver.observe(item));

// ================= CONTACT FORM VALIDATION =================
const contactForm = document.querySelector('.contact-form');
contactForm?.addEventListener('submit', event => {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const projectType = document.getElementById('projectType').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Basic Validation
    if (!name || !email || !message) {
        alert('Mohon isi kolom Nama, Email, dan Pesan!');
        return;
    }
    
    // Simple Email Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Format email tidak valid!');
        return;
    }

    const finalSubject = subject || `Pesan portfolio dari ${name}`;
    const body = [
        `Nama: ${name}`,
        `Email: ${email}`,
        projectType ? `Jenis Project: ${projectType}` : '',
        '',
        `Pesan:\n${message}`
    ].filter(Boolean).join('\n');
    
    window.location.href = `mailto:miftakhulnizamramadhan@email.com?subject=${encodeURIComponent(finalSubject)}&body=${encodeURIComponent(body)}`;
});