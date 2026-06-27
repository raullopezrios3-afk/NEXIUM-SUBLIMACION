
/* =============================
   1. WHATSAPP (COTIZACIÓN)
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
   2. CARRUSEL AUTOMÁTICO LIMPIO
============================= */

document.addEventListener("DOMContentLoaded", function () {

    const slides = document.querySelectorAll(".slide");

    if (!slides || slides.length === 0) return;

    let index = 0;

    // activar primer slide
    slides.forEach(s => s.classList.remove("active"));
    slides[0].classList.add("active");

    function showNextSlide() {

        slides.forEach(slide => slide.classList.remove("active"));

        index = (index + 1) % slides.length;

        slides[index].classList.add("active");

    }

    setInterval(showNextSlide, 4000);

});
