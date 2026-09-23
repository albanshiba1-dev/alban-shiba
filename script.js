/* ALBAN SHIBA - MAIN JAVASCRIPT */
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".nav a");

if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
        const isActive = nav.classList.toggle("active");
        menuToggle.setAttribute("aria-expanded", String(isActive));
    });
}

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        if (nav) nav.classList.remove("active");
        if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
    });
});

const header = document.getElementById("header");
window.addEventListener("scroll", () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 50);
});

const currentYear = document.getElementById("currentYear");
if (currentYear) currentYear.textContent = new Date().getFullYear();

const statNumbers = document.querySelectorAll(".stat-box strong");
let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;
    statsAnimated = true;
    statNumbers.forEach((number) => {
        const target = Number.parseInt(number.dataset.target || "0", 10);
        const duration = 1200;
        const startTime = performance.now();
        function update(timestamp) {
            const progress = Math.min((timestamp - startTime) / duration, 1);
            number.textContent = String(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(update);
            else number.textContent = String(target);
        }
        requestAnimationFrame(update);
    });
}

const statsSection = document.querySelector(".achievements-section");
if (statsSection && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
            animateStats();
            observer.disconnect();
        }
    }, { threshold: 0.3 });
    observer.observe(statsSection);
} else {
    animateStats();
}

const revealElements = document.querySelectorAll(".international-card, .media-card, .timeline-item, .detail-item");
if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach((element) => {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });
}

const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
    let currentSection = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + section.offsetHeight) {
            currentSection = section.getAttribute("id") || "";
        }
    });
    navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
    });
});
