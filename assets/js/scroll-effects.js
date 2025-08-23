document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");
    const logoImg = document.querySelector(".logo img");

    let lastScrollTop = 0;

    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > lastScrollTop && currentScroll > 80) {
            // Scrolling down → hide menu and actions
            navbar.classList.add("hidden");
            if (logoImg) logoImg.style.transform = "scale(0.8)";
        } else {
            // Scrolling up → show full navbar
            navbar.classList.remove("hidden");
            if (logoImg) logoImg.style.transform = "scale(1)";
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // avoid negative
    });
});
