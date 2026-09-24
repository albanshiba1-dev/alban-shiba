/* =========================================================
   ALBAN SHIBA — FINAL JAVASCRIPT
   ========================================================= */

document.documentElement.classList.add("js-ready");

/* =========================
   LOADER
========================= */

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    if (loader) {
        setTimeout(function () {
            loader.classList.add("hidden");
        }, 500);
    }

});


/* =========================
   HEADER
========================= */

const header = document.getElementById("site-header");

if (header) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 60) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    });

}


/* =========================
   MOBILE MENU
========================= */

const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("main-nav");

if (menuToggle && nav) {

    menuToggle.addEventListener("click", function () {

        nav.classList.toggle("open");

        const icon = menuToggle.querySelector("i");

        if (icon) {

            if (nav.classList.contains("open")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        }

    });


    document.querySelectorAll(".nav-link").forEach(function (link) {

        link.addEventListener("click", function () {

            nav.classList.remove("open");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        });

    });

}


/* =========================
   COUNTERS
========================= */

const counters = document.querySelectorAll("[data-count]");

if ("IntersectionObserver" in window) {

    const counterObserver = new IntersectionObserver(function (entries, observer) {

        entries.forEach(function (entry) {

            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const target = Number(counter.dataset.count) || 0;

            let current = 0;
            const duration = 1000;
            const stepTime = Math.max(30, Math.floor(duration / target));

            const timer = setInterval(function () {

                current++;

                counter.textContent = current;

                if (current >= target) {
                    counter.textContent = target;
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

} else {

    counters.forEach(function (counter) {
        counter.textContent = counter.dataset.count;
    });

}


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

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

} else {

    revealElements.forEach(function (element) {
        element.classList.add("visible");
    });

}


/* =========================
   ACTIVE NAV
========================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 200;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {
            currentSection = section.id;
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

}

window.addEventListener("scroll", updateActiveNavigation);

window.addEventListener("load", updateActiveNavigation);


/* =========================
   BACK TO TOP
========================= */

const backToTop = document.getElementById("backToTop");

if (backToTop) {

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

}


/* =========================
   CURRENT YEAR
========================= */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================
   IMAGE ERROR HANDLING
========================= */

document.querySelectorAll("img").forEach(function (image) {

    image.addEventListener("error", function () {

        image.style.opacity = "0";

    });

});


/* =========================
   SMOOTH SCROLL
========================= */

document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {

    anchor.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});
