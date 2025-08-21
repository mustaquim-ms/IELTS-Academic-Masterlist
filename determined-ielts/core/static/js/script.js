/* ========= NAVBAR SHRINK ON SCROLL ========= */
window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("shrink");
    } else {
        navbar.classList.remove("shrink");
    }
});

/* ========= TYPED TEXT EFFECT ========= */
document.addEventListener("DOMContentLoaded", function () {
    const typedText = document.querySelector(".hero-typed");
    const phrases = [
        "Achieve your dream IELTS score 🚀",
        "Practice smarter with AI 🤖",
        "Track your progress with insights 📊",
        "Be Determined, Be Unstoppable 💪"
    ];

    let currentPhrase = 0;
    let currentChar = 0;
    let isDeleting = false;

    function type() {
        const phrase = phrases[currentPhrase];
        if (isDeleting) {
            typedText.textContent = phrase.substring(0, currentChar--);
            if (currentChar < 0) {
                isDeleting = false;
                currentPhrase = (currentPhrase + 1) % phrases.length;
            }
        } else {
            typedText.textContent = phrase.substring(0, currentChar++);
            if (currentChar > phrase.length) {
                isDeleting = true;
                setTimeout(type, 1200); // pause before deleting
                return;
            }
        }
        setTimeout(type, isDeleting ? 50 : 100);
    }

    type();
});

/* ========= SCROLL REVEAL ========= */
const revealElements = document.querySelectorAll(".feature-section, .graph-section, .cta-section");

window.addEventListener("scroll", function () {
    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < triggerBottom) {
            el.classList.add("show");
        }
    });
});
