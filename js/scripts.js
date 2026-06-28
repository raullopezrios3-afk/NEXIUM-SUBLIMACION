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

// =============================
// MODAL
// =============================

function openModalCotizacion() {
    document.getElementById("modalCotizacion").style.display = "flex";
}

function closeModalCotizacion() {
    document.getElementById("modalCotizacion").style.display = "none";
}

function cerrarModalCotizacion() {

    const form = document.getElementById("formCotizacion");

    if (form) {
        form.reset();
    }

    document.getElementById("modalCotizacion").style.display = "none";

}

// cerrar clic afuera
window.addEventListener("click", function(e) {
    const modal = document.getElementById("modalCotizacion");
    if (e.target === modal) {
        modal.style.display = "none";
    }
});


// =============================
// WHATSAPP
// =============================

function enviarWhatsApp() {

    let nombre = document.getElementById("nombre").value;
    let telefono = document.getElementById("telefono").value;
    let correo = document.getElementById("correo").value;
    let producto = document.getElementById("producto").value;
    let cantidad = document.getElementById("cantidad").value;
    let fecha = document.getElementById("fecha").value;
    let descripcion = document.getElementById("descripcion").value;

    let mensaje =
`*SOLICITUD DE COTIZACIÓN*

Nombre: ${nombre}
Teléfono: ${telefono}
Correo: ${correo}
Producto: ${producto}
Cantidad: ${cantidad}
Fecha: ${fecha}

Descripción:
${descripcion}`;

    let numero = "525610066522";

    window.open(
        "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensaje),
        "_blank"
    );
}

function enviarCotizacionCorreo() {

    emailjs.send("service_e8slvmi", "template_ams0res", {
        nombre: document.getElementById("nombre").value,
        telefono: document.getElementById("telefono").value,
        correo: document.getElementById("correo").value,
        producto: document.getElementById("producto").value,
        cantidad: document.getElementById("cantidad").value,
        fecha: document.getElementById("fecha").value,
        descripcion: document.getElementById("descripcion").value
    })
   .then(() => {

    alert("Cotización enviada correctamente ✅");

    // Limpiar formulario
    const form = document.getElementById("formCotizacion");

    if (form) {
        form.reset();
    }

    // Cerrar el modal
    cerrarModalCotizacion();

})
    .catch((error) => {
        console.log("ERROR EMAILJS:", error);
        alert("Error al enviar ❌ revisa consola");
    });
}

function abrirWhatsApp() {

    const numero = "5215610066522";

    const mensaje = `¡Hola!

Gracias por comunicarte con NEXIUM SUBLIMACION.

!HACEMOS REALIDAD TUS IDEAS BRILLANTES¡

Me gustaría recibir información sobre sus productos promocionales y servicios de personalización.

Quedo atento(a) a su respuesta.`;

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");

}
