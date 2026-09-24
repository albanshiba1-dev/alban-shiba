/* =========================================
   ALBAN SHIBA WEBSITE
   JAVASCRIPT
========================================= */


/* =========================================
   LOADER
========================================= */

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    setTimeout(() => {

        loader.classList.add("hidden");

    }, 500);

});


/* =========================================
   HEADER SCROLL
========================================= */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* =========================================
   MOBILE MENU
========================================= */

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {

    nav.classList.toggle("active");

});


/* CLOSE MOBILE MENU */

document.querySelectorAll(".nav a").forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

    });

});


/* =========================================
   COUNTERS
========================================= */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target = Number(
                counter.getAttribute("data-target")
            );

            let current = 0;

            const duration = 1200;

            const startTime = performance.now();

            function updateCounter(currentTime) {

                const elapsed = currentTime - startTime;

                const progress = Math.min(
                    elapsed / duration,
                    1
                );

                current = Math.floor(
                    progress * target
                );

                counter.textContent = current;

                if (progress < 1) {

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.textContent = target;

                }

            }

            requestAnimationFrame(updateCounter);

            counterObserver.unobserve(counter);

        });

    },

    {
        threshold: 0.5
    }

);

counters.forEach(counter => {

    counterObserver.observe(counter);

});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(

    ".section-heading, " +
    ".profile-text, " +
    ".profile-card, " +
    ".stat-box, " +
    ".timeline-item, " +
    ".international-card, " +
    ".video-card, " +
    ".gallery-placeholder, " +
    ".contact-grid"

);

revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform = "translateY(30px)";

    element.style.transition =
        "opacity 0.8s ease, transform 0.8s ease";

});


const revealObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.style.opacity = "1";

            entry.target.style.transform =
                "translateY(0)";

            revealObserver.unobserve(entry.target);

        });

    },

    {
        threshold: 0.15
    }

);


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================
   BACK TO TOP
========================================= */

const backTop = document.getElementById("backTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 600) {

        backTop.classList.add("visible");

    } else {

        backTop.classList.remove("visible");

    }

});


backTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections = document.querySelectorAll("section[id]");

const navLinks = document.querySelectorAll(".nav a");

const activeObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            navLinks.forEach(link => {

                link.classList.remove("active");

            });

            const activeLink =
                document.querySelector(
                    `.nav a[href="#${entry.target.id}"]`
                );

            if (activeLink) {

                activeLink.classList.add("active");

            }

        });

    },

    {
        threshold: 0.4
    }

);


sections.forEach(section => {

    activeObserver.observe(section);

});


/* =========================================
   VIDEO HOVER EFFECT
========================================= */

const videoCards = document.querySelectorAll(".video-card");

videoCards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-8px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0)";

    });

});
