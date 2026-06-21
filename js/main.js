window.addEventListener("load", () => {

    const slides = document.querySelectorAll(".slide");

    if (!slides.length) return;

    let index = 0;

    // 🔥 FORZAR SOLO UNA IMAGEN VISIBLE AL INICIO
    slides.forEach(slide => slide.classList.remove("active"));
    slides[0].classList.add("active");

    setInterval(() => {

        slides[index].classList.remove("active");

        index++;

        if (index >= slides.length) {
            index = 0;
        }

        slides[index].classList.add("active");

    }, 4000);

});
