document.addEventListener("DOMContentLoaded", () => {
    // Scroll animations
    const elements = document.querySelectorAll(".fade-in, .zoom-in");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });
    elements.forEach(el => observer.observe(el));

    // Chat Box functionality
    const chatInput = document.getElementById("chatInput");
    const chatSend = document.getElementById("chatSend");
    const chatResponse = document.getElementById("chatResponse");

    chatSend.addEventListener("click", () => {
        const userText = chatInput.value.trim();
        if (!userText) return;
        chatResponse.innerHTML = `<strong>You:</strong> ${userText}<br><em>AI is thinking...</em>`;

        setTimeout(() => {
            chatResponse.innerHTML = `<strong>You:</strong> ${userText}<br><strong>AI:</strong> That’s a great question! Here’s a quick improvement suggestion for your IELTS prep.`;
        }, 1000);

        chatInput.value = "";
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Floating chat elements
    const chatToggle = document.getElementById("chatToggle");
    const chatWidget = document.querySelector(".chat-widget");
    const chatMessages = document.getElementById("chatMessages");
    const chatInput = document.getElementById("chatWidgetInput");
    const chatSend = document.getElementById("chatWidgetSend");

    // Toggle open/close
    chatToggle.addEventListener("click", () => {
        chatWidget.classList.toggle("collapsed");
        chatToggle.textContent = chatWidget.classList.contains("collapsed") ? "+" : "–";
    });

    // Send message
    chatSend.addEventListener("click", () => sendMessage());
    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });

    function sendMessage() {
        const userText = chatInput.value.trim();
        if (!userText) return;

        // User message
        chatMessages.innerHTML += `<div class="user"><strong>You:</strong> ${userText}</div>`;
        chatInput.value = "";

        // AI "thinking"
        chatMessages.innerHTML += `<div class="ai"><em>AI is typing...</em></div>`;
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Simulated AI response
        setTimeout(() => {
            chatMessages.lastElementChild.innerHTML = `<strong>AI:</strong> Here’s a quick IELTS tip for "${userText}" — focus on clarity, coherence, and practice with real exam conditions.`;
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }
});
