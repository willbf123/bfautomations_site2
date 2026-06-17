// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initAnimations();
    initNavigation();
    initCounters();
    initTiltEffect();
    initCalculator();
    initArchitecture();
    initEngineeringCounters();
    initProcessTimeline();
});

// GSAP Animations
function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance animations
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTimeline
        .from('.hero-badge', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: 0.2
        })
        .from('.title-line', {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.1
        }, '-=0.4')
        .from('.hero-subtitle', {
            y: 30,
            opacity: 0,
            duration: 0.8
        }, '-=0.6')
        .from('.hero-cta .btn', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1
        }, '-=0.4')
        .from('.stat', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1
        }, '-=0.3');

    // Navigation scroll effect
    ScrollTrigger.create({
        start: 'top -100',
        onUpdate: (self) => {
            const nav = document.querySelector('.nav');
            if (self.direction === 1 && self.scroll() > 100) {
                nav.classList.add('scrolled');
            } else if (self.scroll() < 100) {
                nav.classList.remove('scrolled');
            }
        }
    });

    // Section headers animation
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header.children, {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
        });
    });

    // Solution cards animation
    gsap.from('.solution-card', {
        scrollTrigger: {
            trigger: '.solutions-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
    });

    // (Process steps and result cards animations are handled in initProcessTimeline())

    // Booking section animation
    gsap.from('.booking-content', {
        scrollTrigger: {
            trigger: '.booking',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.calendar-widget', {
        scrollTrigger: {
            trigger: '.booking',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        x: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
    });

    // Parallax effect for floating shapes
    gsap.to('.shape-1', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 100,
        rotation: 20
    });

    gsap.to('.shape-2', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: -80,
        rotation: -15
    });

    // Magnetic button effect
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                x: x * 0.2,
                y: y * 0.2,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// Navigation
function initNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const spans = mobileMenuBtn.querySelectorAll('span');

        if (navLinks.classList.contains('active')) {
            gsap.to(spans[0], { rotation: 45, y: 4, duration: 0.3 });
            gsap.to(spans[1], { rotation: -45, y: -4, duration: 0.3 });
        } else {
            gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
            gsap.to(spans[1], { rotation: 0, y: 0, duration: 0.3 });
        }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                navLinks.classList.remove('active');
            }
        });
    });
}



function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i data-lucide="check-circle"></i>
        <span>${message}</span>
    `;

    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: '#0a0a0a',
        color: '#fff',
        padding: '16px 24px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        zIndex: '3000',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
    });

    document.body.appendChild(notification);
    lucide.createIcons();

    gsap.from(notification, {
        y: 50,
        opacity: 0,
        duration: 0.4,
        ease: 'back.out(1.7)'
    });

    setTimeout(() => {
        gsap.to(notification, {
            y: 50,
            opacity: 0,
            duration: 0.3,
            onComplete: () => notification.remove()
        });
    }, 5000);
}

// Counter animation
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        const suffix = counter.textContent.includes('+') ? '+' : '';
        const prefix = counter.textContent.includes('%') ? '%' : '';

        ScrollTrigger.create({
            trigger: counter,
            start: 'top 80%',
            onEnter: () => {
                gsap.to(counter, {
                    innerHTML: target,
                    duration: 2,
                    ease: 'power2.out',
                    snap: { innerHTML: 1 },
                    onUpdate: function() {
                        counter.textContent = Math.round(this.targets()[0].innerHTML) + prefix + suffix;
                    }
                });
            },
            once: true
        });
    });
}

// 3D Tilt effect for cards
function initTiltEffect() {
    const cards = document.querySelectorAll('[data-tilt]');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                transformPerspective: 1000,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });
}

// Text scramble effect for hero title
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;

        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];

            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble-char">${char}</span>`;
            } else {
                output += from;
            }
        }

        this.el.innerHTML = output;

        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Initialize text scramble on hero title
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const lines = heroTitle.querySelectorAll('.title-line');
    lines.forEach((line, index) => {
        const fx = new TextScramble(line);
        const originalText = line.textContent;

        setTimeout(() => {
            fx.setText(originalText);
        }, 500 + (index * 200));
    });
}

// Add scramble character styles
const style = document.createElement('style');
style.textContent = `
    .scramble-char {
        display: inline-block;
        opacity: 0.5;
    }
`;
document.head.appendChild(style);

// Intersection Observer for lazy animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in')
    .forEach(el => observer.observe(el));

// Performance: Pause animations when tab is hidden
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        gsap.globalTimeline.pause();
    } else {
        gsap.globalTimeline.resume();
    }
});

// Add custom cursor effect
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
Object.assign(cursor.style, {
    width: '20px',
    height: '20px',
    border: '2px solid rgba(10, 10, 10, 0.5)',
    borderRadius: '50%',
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: '9999',
    transition: 'transform 0.15s ease-out, width 0.2s, height 0.2s',
    transform: 'translate(-50%, -50%)'
});
document.body.appendChild(cursor);

const cursorDot = document.createElement('div');
cursorDot.className = 'cursor-dot';
Object.assign(cursorDot.style, {
    width: '6px',
    height: '6px',
    background: '#0a0a0a',
    borderRadius: '50%',
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: '10000',
    transform: 'translate(-50%, -50%)'
});
document.body.appendChild(cursorDot);

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Hover effects for cursor
document.querySelectorAll('a, button, .solution-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.width = '50px';
        cursor.style.height = '50px';
        cursor.style.borderColor = 'rgba(10, 10, 10, 0.3)';
    });

    el.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.borderColor = 'rgba(10, 10, 10, 0.5)';
    });
});

// Hide custom cursor on touch devices
if (window.matchMedia('(pointer: coarse)').matches) {
    cursor.style.display = 'none';
    cursorDot.style.display = 'none';
}

// =====================================================
// REVENUE SAVED CALCULATOR
// =====================================================
function initCalculator() {
    const hoursEl   = document.getElementById('hours');
    const rateEl    = document.getElementById('rate');
    const teamEl    = document.getElementById('team');
    const hoursOut  = document.getElementById('hours-out');
    const rateOut   = document.getElementById('rate-out');
    const teamOut   = document.getElementById('team-out');
    const annualEl  = document.getElementById('annual');
    const monthlyEl = document.getElementById('monthly');
    const weeklyEl  = document.getElementById('weekly');
    const hoursYrEl = document.getElementById('hoursYear');
    const paybackEl = document.getElementById('payback');
    if (!hoursEl) return;

    const fmtGBP = (n) => '£' + Math.round(n).toLocaleString('en-GB');
    const fmtNum = (n) => Math.round(n).toLocaleString('en-GB');

    function recompute() {
        const hours = +hoursEl.value;
        const rate  = +rateEl.value;
        const team  = +teamEl.value;

        const weekly  = hours * rate * team;
        const monthly = weekly * 4.333;
        const annual  = weekly * 52;
        const hrsYr   = hours * 52 * team;

        // Typical BF build cost ≈ 2 weeks at team rate, capped
        const typicalBuildCost = Math.min(Math.max(annual * 0.04, 1500), 18000);
        const paybackMonths = typicalBuildCost / Math.max(monthly, 1);

        hoursOut.value  = hours;
        rateOut.value   = rate;
        teamOut.value   = team;
        annualEl.textContent  = fmtGBP(annual);
        monthlyEl.textContent = fmtGBP(monthly);
        weeklyEl.textContent  = fmtGBP(weekly);
        hoursYrEl.textContent = fmtNum(hrsYr);
        paybackEl.textContent = paybackMonths < 1
            ? '< 1 month'
            : paybackMonths.toFixed(1) + ' months';

        // Pulse the primary output
        annualEl.classList.remove('pulse');
        // force reflow
        void annualEl.offsetWidth;
        annualEl.classList.add('pulse');
    }

    [hoursEl, rateEl, teamEl].forEach(el => {
        el.addEventListener('input', recompute);
    });
    recompute();
}

// =====================================================
// ARCHITECTURE DIAGRAM — cycling demo data flow
// =====================================================
function initArchitecture() {
    const nodes = document.querySelectorAll('.arch-node');
    const triggerEl = document.getElementById('arch-trigger');
    const routeEl   = document.getElementById('arch-route');
    const timeEl    = document.getElementById('arch-time');
    if (!nodes.length || !triggerEl) return;

    const flows = [
        { trigger: 'New lead in CRM',          route: 'CRM → BFAutomations → Email + Sheets + Chat', time: '1.8 seconds' },
        { trigger: 'Client emails at 02:14',   route: 'Email → AI triage → Calendar + Sheets',        time: '0.9 seconds' },
        { trigger: 'Contract signed',          route: 'Docs → BFAutomations → Payment + Chat + CRM',  time: '2.4 seconds' },
        { trigger: 'Support ticket opened',    route: 'Chat → AI doc-match → Routed to human',        time: '0.6 seconds' },
        { trigger: 'Invoice overdue 10 days',  route: 'Payments → BFAutomations → Email + CRM',       time: '1.2 seconds' },
        { trigger: 'Weekly report trigger',    route: 'Sheets + CRM → BFAutomations → Email digest',  time: '3.1 seconds' }
    ];

    let idx = 0;
    let activeNodeIdx = 0;

    function rotate() {
        const flow = flows[idx % flows.length];
        triggerEl.textContent = flow.trigger;
        routeEl.textContent   = flow.route;
        timeEl.textContent    = flow.time;

        // Highlight node by tool keyword
        nodes.forEach(n => n.classList.remove('active'));
        const tool = (flow.route.match(/CRM|Email|Calendar|Sheets|Chat|Payments|Docs|Telephony/) || ['CRM'])[0];
        const map  = { CRM: 'crm', Email: 'email', Calendar: 'calendar',
                       Sheets: 'sheets', Chat: 'chat', Payments: 'payment',
                       Docs: 'docs', Telephony: 'crm2' };
        const target = document.querySelector(`.arch-node[data-tool="${map[tool]}"]`);
        if (target) target.classList.add('active');

        idx++;
    }

    // Manual click on a node updates the readout instantly
    nodes.forEach(n => {
        n.addEventListener('click', () => {
            const label = n.querySelector('span').textContent;
            triggerEl.textContent = `Manual trigger: ${label} event`;
            routeEl.textContent   = `${label} → BFAutomations → orchestrated downstream`;
            timeEl.textContent    = (Math.random() * 2 + 0.5).toFixed(1) + ' seconds';
            nodes.forEach(x => x.classList.remove('active'));
            n.classList.add('active');
        });
    });

    rotate();
    setInterval(rotate, 3500);
}

// =====================================================
// RESULTS — engineering counters (scroll-triggered)
// =====================================================
function initEngineeringCounters() {
    const stats = document.querySelectorAll('.eng-num');
    stats.forEach(stat => {
        const target = parseInt(stat.dataset.countTo, 10);
        ScrollTrigger.create({
            trigger: stat,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                gsap.to(stat, {
                    innerHTML: target,
                    duration: 1.6,
                    ease: 'power2.out',
                    snap: { innerHTML: 1 },
                    onUpdate: function() {
                        stat.textContent = Math.round(this.targets()[0].innerHTML);
                    }
                });
            }
        });
    });
}

// =====================================================
// PROCESS — stagger in the timeline steps on scroll
// =====================================================
function initProcessTimeline() {
    const items = document.querySelectorAll('.ptl-item');
    if (!items.length) return;

    gsap.from(items, {
        scrollTrigger: {
            trigger: '.process-timeline',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        x: -40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out'
    });

    // Reveal the pricing cards too
    gsap.from('.pm-card', {
        scrollTrigger: {
            trigger: '.pricing-model',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
    });

    // Capabilities cards stagger
    gsap.from('.cap-card', {
        scrollTrigger: {
            trigger: '.cap-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out'
    });

    // Calculator in
    gsap.from('.calculator', {
        scrollTrigger: {
            trigger: '.calculator',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out'
    });

    gsap.from('.architecture', {
        scrollTrigger: {
            trigger: '.architecture',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out'
    });

    // Engineering stats bar
    gsap.from('.eng-stats', {
        scrollTrigger: {
            trigger: '.eng-stats',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out'
    });
}

console.log('🚀 BFAutomations website loaded successfully!');
console.log('📅 Calendar integration ready - connect your Google Calendar ID');
console.log('✨ Animations powered by GSAP + ScrollTrigger');
