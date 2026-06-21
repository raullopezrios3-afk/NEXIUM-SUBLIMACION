window.addEventListener("load", () => {

    const slides = document.querySelectorAll(".slide");

    if (slides.length === 0) return;

    let index = 0;

    function showNextSlide() {

        // quitar active de todos
        slides.forEach(slide => slide.classList.remove("active"));

        // siguiente índice seguro
        index = (index + 1) % slides.length;

        // activar siguiente
        slides[index].classList.add("active");

    }

    // 🔥 forzar inicio correcto
    slides.forEach(s => s.classList.remove("active"));
    slides[0].classList.add("active");

    // 🔥 intervalo confiable
    setInterval(showNextSlide, 4000);

});
