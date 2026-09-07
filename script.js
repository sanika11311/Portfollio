document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;
        const target = document.querySelector(targetId);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

const revealItems = document.querySelectorAll('.reveal, .reveal-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealItems.forEach((item) => observer.observe(item));

const navLinks = document.querySelectorAll('.nav a');
const sections = [...document.querySelectorAll('section[id]')];

function setActiveNavLink() {
    const scrollPosition = window.scrollY + 180;
    let currentId = 'home';

    sections.forEach((section) => {
        if (scrollPosition >= section.offsetTop) {
            currentId = section.id;
        }
    });

    navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${currentId}`;
        link.classList.toggle('active', isActive);
    });
}

window.addEventListener('scroll', setActiveNavLink, { passive: true });
setActiveNavLink();

