const header = document.querySelector("#siteHeader");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");
const revealItems = document.querySelectorAll(".reveal");
const year = document.querySelector("#year");
const faqItems = document.querySelectorAll(".faq-list details");
let headerUpdatePending = false;

if (year) {
    year.textContent = new Date().getFullYear();
}

const updateHeader = () => {
    header?.classList.toggle("scrolled", window.scrollY > 18);
    headerUpdatePending = false;
};

const requestHeaderUpdate = () => {
    if (headerUpdatePending) {
        return;
    }

    headerUpdatePending = true;
    window.requestAnimationFrame(updateHeader);
};

updateHeader();
window.addEventListener("scroll", requestHeaderUpdate, { passive: true });

const closeMenu = () => {
    document.body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Abrir menu");
};

navToggle?.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});

navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, revealObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("active");
            revealObserver.unobserve(entry.target);
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px",
    });

    revealItems.forEach((item) => observer.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add("active"));
}

faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
        if (!item.open) {
            return;
        }

        faqItems.forEach((otherItem) => {
            if (otherItem !== item) {
                otherItem.open = false;
            }
        });
    });
});
