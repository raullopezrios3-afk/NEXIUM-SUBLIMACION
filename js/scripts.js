
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

});
