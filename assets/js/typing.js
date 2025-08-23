document.addEventListener("DOMContentLoaded", function () {
    const typedText = document.getElementById("typed-text");

    const phrases = [
        "AI-Powered Learning",
        "Score Higher in IELTS",
        "Personalized Study Plans",
        "Track Your Progress"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let currentPhrase = "";
    let isDeleting = false;
    const typingSpeed = 100;  // typing speed in ms
    const eraseSpeed = 60;    // erasing speed
    const delayBetweenPhrases = 1500; // pause before deleting

    function typeEffect() {
        currentPhrase = phrases[phraseIndex];

        if (!isDeleting) {
            // Typing forward
            typedText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentPhrase.length) {
                isDeleting = true;
                setTimeout(typeEffect, delayBetweenPhrases);
                return;
            }
        } else {
            // Deleting
            typedText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }
        }

        setTimeout(typeEffect, isDeleting ? eraseSpeed : typingSpeed);
    }

    typeEffect();
});
