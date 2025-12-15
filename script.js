// Matrix Rain Effect
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Recalculate columns on resize
    const newColumns = canvas.width / fontSize;
    // Add or remove drops as needed
    while (drops.length < newColumns) {
        drops.push(Math.random() * -100);
    }
    while (drops.length > newColumns) {
        drops.pop();
    }
}

// Matrix characters - binary digits
const matrixChars = '01';
const fontSize = 16;
// Reduce number of columns significantly (every 3rd column)
let columns = Math.floor(window.innerWidth / fontSize / 3);

// Array of drops - one per column
const drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -200; // Start at even more random heights
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Very slow drop speed
const isMobile = window.innerWidth <= 768;
const dropSpeed = isMobile ? 200 : 150; // Much slower

// Draw the matrix rain
function drawMatrix() {
    // More transparent black to create slower fade effect
    ctx.fillStyle = 'rgba(10, 10, 10, 0.02)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Matrix green color with gradient
    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px monospace';

    // Loop through drops (with spacing)
    for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];

        // Draw character with spacing (every 3rd column)
        const x = i * fontSize * 3;
        const y = drops[i] * fontSize;

        // Much more subtle gradient
        const gradient = ctx.createLinearGradient(x, y - fontSize * 15, x, y);
        gradient.addColorStop(0, 'rgba(0, 255, 65, 0.05)');
        gradient.addColorStop(0.5, 'rgba(0, 255, 65, 0.2)');
        gradient.addColorStop(1, 'rgba(0, 255, 65, 0.4)');
        ctx.fillStyle = gradient;

        ctx.fillText(text, x, y);

        // Reset drop to top much less frequently
        if (y > canvas.height && Math.random() > 0.99) {
            drops[i] = Math.random() * -200;
        }

        // Move drop down slower (only every other frame gets increment)
        if (Math.random() > 0.3) {
            drops[i]++;
        }
    }
}

// Animation loop with performance optimization
let matrixInterval = setInterval(drawMatrix, dropSpeed);

// Pause animation when page is not visible (performance optimization)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(matrixInterval);
    } else {
        matrixInterval = setInterval(drawMatrix, dropSpeed);
    }
});

// Cursor Glow Effect
const cursorGlow = document.querySelector('.cursor-glow');
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorGlow.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
});

function animateCursor() {
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;

    cursorGlow.style.left = currentX + 'px';
    cursorGlow.style.top = currentY + 'px';

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('[data-aos="fade-up"], .service-card, .why-b2b, .recognition, .cta-section').forEach(el => {
    observer.observe(el);
});

// CTA Button Particles Animation
const ctaButton = document.getElementById('ctaButton');
const particlesContainer = document.querySelector('.particles-container');

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const startX = Math.random() * 100;
    const endX = startX + (Math.random() - 0.5) * 50;
    const duration = 1 + Math.random() * 2;

    particle.style.left = startX + '%';
    particle.style.bottom = '-10px';

    particlesContainer.appendChild(particle);

    particle.animate([
        {
            bottom: '-10px',
            left: startX + '%',
            opacity: 0
        },
        {
            bottom: '50%',
            left: ((startX + endX) / 2) + '%',
            opacity: 1,
            offset: 0.5
        },
        {
            bottom: '110%',
            left: endX + '%',
            opacity: 0
        }
    ], {
        duration: duration * 1000,
        easing: 'ease-out'
    }).onfinish = () => particle.remove();
}

let particleInterval;

ctaButton.addEventListener('mouseenter', () => {
    particleInterval = setInterval(createParticle, 100);
});

ctaButton.addEventListener('mouseleave', () => {
    clearInterval(particleInterval);
});

// Add click ripple effect to CTA button
ctaButton.addEventListener('click', (e) => {
    e.preventDefault();

    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.pointerEvents = 'none';

    const rect = ctaButton.getBoundingClientRect();
    ripple.style.left = (e.clientX - rect.left - 10) + 'px';
    ripple.style.top = (e.clientY - rect.top - 10) + 'px';

    ctaButton.appendChild(ripple);

    ripple.animate([
        {
            width: '20px',
            height: '20px',
            opacity: 1
        },
        {
            width: '300px',
            height: '300px',
            opacity: 0
        }
    ], {
        duration: 600,
        easing: 'ease-out'
    }).onfinish = () => ripple.remove();

    // Burst of particles on click
    for (let i = 0; i < 15; i++) {
        setTimeout(() => createParticle(), i * 30);
    }

    // Replace with actual agent link
    setTimeout(() => {
        window.location.href = 'https://your-ai-agent-link.com';
    }, 300);
});

// Service card hover tilt effect
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Smooth scroll behavior
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

// Add parallax effect to background gradients and scroll progress
let scrollY = 0;

window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    document.body.style.setProperty('--scroll', scrollY / 1000);

    // Update scroll progress indicator
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollProgress = scrollY / windowHeight;
    document.body.style.setProperty('--scroll-progress', scrollProgress);
});

// Checklist items animation on scroll
const checklistItems = document.querySelectorAll('.checklist li');
const checklistObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.5 });

checklistItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'all 0.5s ease';
    checklistObserver.observe(item);
});

// B2B Circular Animation - Orbit items appear sequentially
const orbitItems = document.querySelectorAll('.b2b-orbit-item');
const circleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            orbitItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = item.style.transform.replace('scale(0)', 'scale(1)');
                }, index * 200);
            });
        }
    });
}, { threshold: 0.3 });

const circleContainer = document.querySelector('.b2b-circle-container');
if (circleContainer) {
    orbitItems.forEach(item => {
        item.style.opacity = '0';
        const currentTransform = window.getComputedStyle(item).transform;
        item.style.transform = currentTransform + ' scale(0)';
        item.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
    circleObserver.observe(circleContainer);
}

// Console Easter Egg
console.log('%c🤖 Интересуешься AI-агентами?', 'color: #d4af37; font-size: 20px; font-weight: bold;');
console.log('%cЯ тоже создан с помощью AI! 😉', 'color: #f4d03f; font-size: 14px;');
console.log('%cНачни диалог с агентом Сергея и узнай, как автоматизировать свой бизнес!', 'color: #a0a0a0; font-size: 12px;');