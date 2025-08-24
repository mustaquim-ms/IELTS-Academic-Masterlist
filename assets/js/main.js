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

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("open");
        menuToggle.classList.toggle("active");
    });

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
        ".btn-primary, .btn-secondary, .feature-card, .course-card, .pricing-card, .trainer-card, .resource-card"
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
    // Dashboard Chart (Mock Test Progress)
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
                        data: [55, 62, 70, 78], // sample data, replace with dynamic values
                        borderColor: "#ff6b6b", // coral accent
                        backgroundColor: "rgba(255, 107, 107, 0.2)",
                        tension: 0.4,
                        fill: true,
                        pointBackgroundColor: "#008080", // deep teal
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
                            font: {
                                family: "Poppins, sans-serif",
                            },
                        },
                    },
                    y: {
                        ticks: {
                            color: "#555",
                            font: {
                                family: "Poppins, sans-serif",
                            },
                        },
                        beginAtZero: true,
                        max: 100,
                    },
                },
            },
        });
    }
});

// ===== Expand Feature Cards =====
document.querySelectorAll("[data-expand]").forEach(card => {
    const btn = card.querySelector(".btn-readmore");
    btn.addEventListener("click", () => {
        card.classList.toggle("expanded");
        btn.textContent = card.classList.contains("expanded") ? "Show Less" : "Read More";
    });
});

// Ripple effect on buttons
document.querySelectorAll(".btn-primary, .btn-secondary").forEach(btn => {
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

    // Simulated AI feedback (later can be connected to backend/real API)
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