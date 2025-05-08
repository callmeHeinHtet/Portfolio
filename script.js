// Mobile Menu Toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggle.classList.toggle("open");
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (event) {
    event.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    window.scrollTo({
      top: target.offsetTop - 60,
      behavior: "smooth",
    });
  });
});

// Contact Form Validation
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const subject = this.subject.value.trim();
    const message = this.message.value.trim();
  
    if (!name || !email || !subject || !message) {
      alert("Please fill out all fields.");
      return;
    }
  
    alert("Thank you! Your message has been sent.");
    this.reset();
  });
  
  
