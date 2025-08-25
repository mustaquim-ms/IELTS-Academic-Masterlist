document.addEventListener("DOMContentLoaded", function () {
    // ===============================
    // Fade-in / Slide-in Animations
    // ===============================
    const animatedElements = document.querySelectorAll("[data-animate]");

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate");
                    observer.unobserve(entry.target); // animate only once
                }
            });
        },
        { threshold: 0.2 }
    );

    animatedElements.forEach((el) => {
        observer.observe(el);
    });

    // Mobile navbar toggle
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("open");
            menuToggle.classList.toggle("active");
        });
    }

    // Navbar background change on scroll
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // ===============================
    // Smooth Hover Lift (extra polish)
    // ===============================
    const hoverables = document.querySelectorAll(
        ".btn-primary, .btn-secondary, .feature-card, .course-card, .pricing-card, .trainer-card, .resource-card, .tip-card, .story-card, .card"
    );

    hoverables.forEach((el) => {
        el.addEventListener("mouseenter", () => {
            el.style.transition = "all 0.3s ease";
            el.style.transform = "translateY(-4px)";
            el.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.15)";
        });

        el.addEventListener("mouseleave", () => {
            el.style.transform = "translateY(0)";
            el.style.boxShadow = "";
        });
    });

    // ===============================
    // Dashboard Chart (Line: Mock Test Progress)
    // ===============================
    const chartCanvas = document.getElementById("progressChart");
    if (chartCanvas) {
        const ctx = chartCanvas.getContext("2d");
        new Chart(ctx, {
            type: "line",
            data: {
                labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
                datasets: [
                    {
                        label: "Mock Test Progress",
                        data: [55, 62, 70, 78],
                        borderColor: "#ff6b6b",
                        backgroundColor: "rgba(255, 107, 107, 0.2)",
                        tension: 0.4,
                        fill: true,
                        pointBackgroundColor: "#008080",
                        pointRadius: 5,
                        pointHoverRadius: 7,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: "#333",
                            font: {
                                family: "Inter, sans-serif",
                                size: 14,
                            },
                        },
                    },
                },
                scales: {
                    x: {
                        ticks: {
                            color: "#555",
                            font: { family: "Poppins, sans-serif" },
                        },
                    },
                    y: {
                        ticks: {
                            color: "#555",
                            font: { family: "Poppins, sans-serif" },
                        },
                        beginAtZero: true,
                        max: 100,
                    },
                },
            },
        });
    }

    // ===============================
    // Radar Chart (Before vs After Skills)
    // ===============================
    const radarCanvas = document.getElementById("skillsRadar");
    if (radarCanvas) {
        new Chart(radarCanvas, {
            type: "radar",
            data: {
                labels: ["Speaking", "Writing", "Listening", "Reading"],
                datasets: [
                    {
                        label: "Before",
                        data: [55, 50, 58, 60],
                        backgroundColor: "rgba(231,111,81,0.3)",
                        borderColor: "#e76f51",
                        pointBackgroundColor: "#e76f51",
                    },
                    {
                        label: "After",
                        data: [80, 82, 78, 75],
                        backgroundColor: "rgba(42,157,143,0.3)",
                        borderColor: "#2a9d8f",
                        pointBackgroundColor: "#2a9d8f",
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                elements: { line: { borderWidth: 2 } },
                scales: {
                    r: {
                        min: 0,
                        max: 100,
                        ticks: { stepSize: 20, color: "#555" },
                        pointLabels: { color: "#333", font: { size: 14 } },
                        grid: { color: "rgba(0,0,0,0.05)" },
                        angleLines: { color: "rgba(0,0,0,0.1)" },
                    },
                },
                plugins: {
                    legend: { labels: { color: "#333" } },
                },
            },
        });
    }

    // ===============================
    // Scroll-to-top button
    // ===============================
    const scrollBtn = document.createElement("button");
    scrollBtn.innerHTML = "⬆";
    scrollBtn.className = "scroll-top-btn";
    document.body.appendChild(scrollBtn);

    scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", () => {
        scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });

    // ===============================
    // Dark Mode Toggle
    // ===============================
    const themeToggle = document.createElement("button");
    themeToggle.className = "theme-toggle";
    themeToggle.textContent = "🌙";
    document.body.appendChild(themeToggle);

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
    });
});

// ===== Expand Feature Cards =====
document.querySelectorAll("[data-expand]").forEach((card) => {
    const btn = card.querySelector(".btn-readmore");
    if (!btn) return;
    btn.addEventListener("click", () => {
        card.classList.toggle("expanded");
        btn.textContent = card.classList.contains("expanded") ? "Show Less" : "Read More";
    });
});

// Ripple effect on buttons
document.querySelectorAll(".btn-primary, .btn-secondary").forEach((btn) => {
    btn.addEventListener("click", function (e) {
        let ripple = document.createElement("span");
        ripple.classList.add("ripple");
        this.appendChild(ripple);

        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        setTimeout(() => ripple.remove(), 600);
    });
});

function getAIFeedback() {
    const input = document.getElementById("aiPrompt").value.trim();
    const responseEl = document.getElementById("aiResponse");

    if (!input) {
        responseEl.style.display = "block";
        responseEl.textContent = "⚠️ Please enter a sentence or response first.";
        return;
    }

    // Simulated AI feedback
    let feedback = "";
    if (input.length < 20) {
        feedback = "Your response is a bit short. Try elaborating with more details.";
    } else if (input.toLowerCase().includes("i think")) {
        feedback = "Great start! Consider varying your phrases instead of 'I think' repeatedly.";
    } else {
        feedback = "Good attempt! Focus on using advanced vocabulary and avoid repetitive structures.";
    }

    responseEl.style.display = "block";
    responseEl.textContent = "🤖 AI Feedback: " + feedback;
}
