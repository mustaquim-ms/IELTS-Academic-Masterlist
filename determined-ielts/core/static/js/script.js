// -----------------------------
// Navbar shrink on scroll
// -----------------------------
window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("shrink");
    } else {
        navbar.classList.remove("shrink");
    }
});

// -----------------------------
// Floating chat toggle
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
    const chatIcon = document.getElementById("chat-icon");
    const chatBox = document.getElementById("chat-box");

    if (chatIcon && chatBox) {
        chatIcon.addEventListener("click", () => {
            chatBox.classList.toggle("active");
        });
    }
});

// -----------------------------
// Chart.js for IELTS Progress
// -----------------------------
const ctx = document.getElementById("progressChart");
if (ctx) {
    new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
            datasets: [
                {
                    label: "Overall Band Score",
                    data: [5.5, 6.0, 6.5, 7.0, 7.5],
                    borderColor: "#c59d7e",
                    backgroundColor: "rgba(197, 157, 126, 0.2)",
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: "#c59d7e",
                    pointRadius: 6,
                    pointHoverRadius: 8
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: { color: "#333", font: { family: "Poppins" } }
                }
            },
            scales: {
                x: {
                    ticks: { color: "#333", font: { family: "Inter" } },
                    grid: { color: "rgba(0,0,0,0.05)" }
                },
                y: {
                    ticks: { color: "#333", font: { family: "Inter" } },
                    grid: { color: "rgba(0,0,0,0.05)" }
                }
            }
        }
    });
}
