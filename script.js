/* =========================================================
   ALBAN SHIBA — WEBSITE JAVASCRIPT
   ========================================================= */


/* LOADER */

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    setTimeout(function () {
        loader.classList.add("hidden");
    }, 500);

});


/* HEADER SCROLL */

const header = document.getElementById("header");

window.addEventListener("scroll", function () {

    if (window.scrollY > 60) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* MOBILE MENU */

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", function () {

    nav.classList.toggle("open");

    const icon = menuToggle.querySelector("i");

    if (nav.classList.contains("open")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

});


/* CLOSE MOBILE MENU AFTER CLICK */

document.querySelectorAll(".nav-link").forEach(function (link) {

    link.addEventListener("click", function () {

        nav.classList.remove("open");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* COUNTERS */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(function (entries, observer) {

    entries.forEach(function (entry) {

        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = Number(counter.dataset.target);

        let current = 0;

        const duration = 1200;
        const stepTime = Math.max(20, Math.floor(duration / target));

        const timer = setInterval(function () {

            current++;

            counter.textContent = current;

            if (current >= target) {
                clearInterval(timer);
            }

        }, stepTime);

        observer.unobserve(counter);

    });

}, {
    threshold: 0.5
});


counters.forEach(function (counter) {
    counterObserver.observe(counter);
});


/* SCROLL REVEAL */

const revealElements = document.querySelectorAll(
    ".section-heading, .profile-text, .profile-data, .career-item, .international-card, .honour-card, .video-card, .gallery-item, .contact-item"
);

revealElements.forEach(function (element) {
    element.classList.add("reveal");
});


const revealObserver = new IntersectionObserver(function (entries, observer) {

    entries.forEach(function (entry) {

        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);

    });

}, {
    threshold: 0.08
});


revealElements.forEach(function (element) {
    revealObserver.observe(element);
});


/* ACTIVE NAV */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", function () {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 180;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });


    navLinks.forEach(function (link) {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === "#" + currentSection
        ) {
            link.classList.add("active");
        }

    });

});


/* BACK TO TOP */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {

    if (window.scrollY > 500) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

});


backToTop.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* CURRENT YEAR */

document.getElementById("currentYear").textContent =
    new Date().getFullYear();


/* IMAGE ERROR HANDLING */

document.querySelectorAll("img").forEach(function (image) {

    image.addEventListener("error", function () {

        image.style.display = "none";

    });

});


/* SMOOTH SCROLL */

document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {

    anchor.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});
