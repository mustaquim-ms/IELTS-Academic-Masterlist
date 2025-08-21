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

/* ========= IELTS PROGRESS GRAPH ========= */
document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById("progressChart").getContext("2d");

    const progressChart = new Chart(ctx, {
        type: "radar", // modern & engaging chart type
        data: {
            labels: ["Listening", "Reading", "Writing", "Speaking"],
            datasets: [
                {
                    label: "Your Current Scores",
                    data: [6, 6.5, 5.5, 6], // Dummy data for now
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 2,
                    pointBackgroundColor: "#4bc0c0"
                },
                {
                    label: "Target Band Score",
                    data: [8, 8, 7.5, 7.5],
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 2,
                    pointBackgroundColor: "#ff6384"
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                    labels: { color: "#333", font: { size: 14 } }
                },
                title: {
                    display: true,
                    text: "IELTS Band Progress Tracker",
                    font: { size: 18 }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 9,
                    ticks: { stepSize: 1, color: "#555" },
                    grid: { color: "rgba(0,0,0,0.1)" },
                    angleLines: { color: "rgba(0,0,0,0.1)" }
                }
            }
        }
    });
});
