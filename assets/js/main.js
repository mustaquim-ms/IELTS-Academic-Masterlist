// -----------------------------
// Typing Animation (Typed.js)
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("typing")) {
        new Typed("#typing", {
            strings: [
                "AI-Powered IELTS Learning",
                "Score Higher with Smart Insights",
                "Personalized IELTS Success"
            ],
            typeSpeed: 60,
            backSpeed: 40,
            loop: true
        });
    }

    // -----------------------------
    // Chart.js Dashboard Progress
    // -----------------------------
    if (document.getElementById("progressChart")) {
        const ctx = document.getElementById("progressChart").getContext("2d");
        new Chart(ctx, {
            type: "line",
            data: {
                labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
                datasets: [{
                    label: "Mock Test Progress",
                    data: [55, 65, 70, 80],
                    borderColor: "#006d77",
                    backgroundColor: "rgba(0, 109, 119, 0.2)",
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true, max: 100 }
                }
            }
        });
    }

    // -----------------------------
    // Navbar Scroll Effect
    // -----------------------------
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // -----------------------------
    // AOS Init (Animate on Scroll)
    // -----------------------------
    AOS.init({
        duration: 800,
        once: true
    });
});

// -----------------------------
// Reveal on Scroll
// -----------------------------
const animatedElements = document.querySelectorAll("[data-animate]");
const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    animatedElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < triggerBottom) {
            el.classList.add("visible");
        }
    });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
