window.addEventListener("load", () => {

    const slides = document.querySelectorAll(".slide");

    if (!slides || slides.length === 0) {
        console.log("No hay slides");
        return;
    }

    let index = 0;

    // 🔥 FORZAR primera imagen visible
    slides.forEach(s => s.classList.remove("active"));
    slides[0].classList.add("active");

    setInterval(() => {

        slides[index].classList.remove("active");

        index = (index + 1) % slides.length;

        slides[index].classList.add("active");

    }, 4000);

});
