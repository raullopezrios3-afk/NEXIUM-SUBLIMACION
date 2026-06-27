
/* =============================
   WHATSAPP (COTIZACIÓN)
============================= */

function enviarWhatsApp() {

    let nombre = document.getElementById("nombre").value;
    let telefono = document.getElementById("telefono").value;
    let correo = document.getElementById("correo").value;
    let producto = document.getElementById("producto").value;
    let cantidad = document.getElementById("cantidad").value;
    let fecha = document.getElementById("fecha").value;
    let descripcion = document.getElementById("descripcion").value;

    let mensaje = `*SOLICITUD DE COTIZACIÓN*

Nombre: ${nombre}
Teléfono: ${telefono}
Correo: ${correo}
Producto: ${producto}
Cantidad: ${cantidad}
Fecha requerida: ${fecha}

Descripción:
${descripcion}`;

    let numero = "5215512345678";

    window.open(
        "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensaje),
        "_blank"
    );
}


/* =============================
   FUNCIONALIDAD GENERAL
============================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       CARRUSEL
    ========================= */

    const slides = document.querySelectorAll(".slide");
    let index = 0;

    if (slides.length > 0) {
        slides[0].classList.add("active");
    }

    function showNextSlide() {
        slides.forEach(slide => slide.classList.remove("active"));
        index = (index + 1) % slides.length;
        slides[index].classList.add("active");
    }

    setInterval(showNextSlide, 4000);


    /* =========================
       HEADER SCROLL EFFECT
    ========================= */

    const header = document.querySelector("header");

    if (header) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 80) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }


    /* =========================
       REVEAL ON SCROLL
    ========================= */

    const revealElements = document.querySelectorAll(".reveal");

    function revealOnScroll() {

        revealElements.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;

            if (elementTop < windowHeight - 100) {
                el.classList.add("active");
            }
        });

    }

    window.addEventListener("scroll", revealOnScroll);

    // Ejecutar al cargar
    revealOnScroll();


    /* =========================
       SCROLL SPY (MENÚ ACTIVO)
    ========================= */

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");

    function setActiveMenu() {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener("scroll", setActiveMenu);

    // Ejecutar al cargar
    setActiveMenu();

});
