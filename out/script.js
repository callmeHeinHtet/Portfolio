// Mobile Menu Toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Smooth Scroll Effect
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(event) {
        event.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        window.scrollTo({
            top: target.offsetTop - 50,
            behavior: "smooth"
        });
    });
});

// Form Validation
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    let name = document.querySelector('input[name="name"]').value.trim();
    let email = document.querySelector('input[name="email"]').value.trim();
    let subject = document.querySelector('input[name="subject"]').value.trim();
    let message = document.querySelector('textarea[name="message"]').value.trim();

    if (name === "" || email === "" || subject === "" || message === "") {
        alert("Please fill out all fields before submitting.");
        return;
    }

    alert("Your message has been sent successfully!");
    this.reset();
});
