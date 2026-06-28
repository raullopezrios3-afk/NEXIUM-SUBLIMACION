document.addEventListener("DOMContentLoaded", function () {

    /* SLIDER */
    const slides = document.querySelectorAll(".slide");
    let index = 0;

    if (slides.length > 0) slides[0].classList.add("active");

    setInterval(() => {
        slides.forEach(s => s.classList.remove("active"));
        index = (index + 1) % slides.length;
        slides[index].classList.add("active");
    }, 4000);

});

/* =========================
WHATSAPP (FUNCIONA)
========================= */
function enviarWhatsApp() {

    let nombre = document.getElementById("nombre").value;
    let telefono = document.getElementById("telefono").value;
    let correo = document.getElementById("correo").value;
    let producto = document.getElementById("producto").value;
    let cantidad = document.getElementById("cantidad").value;
    let fecha = document.getElementById("fecha").value;
    let descripcion = document.getElementById("descripcion").value;

    let mensaje = `¡Hola!

Gracias por comunicarte con NEXIUM SUBLIMACION.

¡HACEMOS REALIDAD TUS IDEAS BRILLANTES!

Me gustaría recibir información sobre sus productos promocionales y servicios de personalización.

Quedo atento(a) a su respuesta.

    window.open(
        "https://wa.me/525610066522?text=" + encodeURIComponent(mensaje),
        "_blank"
    );
}

/* =========================
EMAILJS
========================= */
function enviarCotizacionCorreo() {

    emailjs.send("service_e8slvmi", "template_ams0res", {
        nombre: document.getElementById("nombre").value,
        telefono: document.getElementById("telefono").value,
        correo: document.getElementById("correo").value,
        producto: document.getElementById("producto").value,
        cantidad: document.getElementById("cantidad").value,
        fecha: document.getElementById("fecha").value,
        descripcion: document.getElementById("descripcion").value
    }).then(() => {

        alert("Enviado correctamente ✅");

        document.getElementById("formCotizacion").reset();
        document.getElementById("modalCotizacion").style.display = "none";

    }).catch(err => {
        console.log(err);
        alert("Error al enviar ❌");
    });
}

/* MODAL */
function cerrarModalCotizacion() {
    document.getElementById("formCotizacion").reset();
    document.getElementById("modalCotizacion").style.display = "none";
}
