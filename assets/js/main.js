// Chart.js
const ctx = document.getElementById("progressChart");
if (ctx) {
    new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
            datasets: [{
                label: "Your IELTS Progress",
                data: [5.5, 6.0, 6.5, 7.0],
                borderColor: "#006d77",
                backgroundColor: "rgba(0,109,119,0.2)",
                fill: true,
                tension: 0.4,
            }],
        },
        options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { min: 0, max: 9 } } },
    });
}

// Chat Button
const chatBtn = document.querySelector(".chat-btn");
if (chatBtn) {
    chatBtn.addEventListener("click", () => {
        alert("Chatbot coming soon 🚀");
    });
}
