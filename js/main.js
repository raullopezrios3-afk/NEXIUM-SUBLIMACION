window.addEventListener("DOMContentLoaded", () => {

    const slides = document.querySelectorAll(".slide");

    if (slides.length === 0) return;

    let index = 0;

    // activar primera imagen
    slides[0].classList.add("active");

    setInterval(() => {

        slides[index].classList.remove("active");

        index = (index + 1) % slides.length;

        slides[index].classList.add("active");

    }, 4000);
});
