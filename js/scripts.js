// =============================
// 1. WHATSAPP (YA LO TIENES)
// =============================

function enviarWhatsApp(){

    let nombre=document.getElementById("nombre").value;
    let telefono=document.getElementById("telefono").value;
    let correo=document.getElementById("correo").value;
    let producto=document.getElementById("producto").value;
    let cantidad=document.getElementById("cantidad").value;
    let fecha=document.getElementById("fecha").value;
    let descripcion=document.getElementById("descripcion").value;

    let mensaje=
`*SOLICITUD DE COTIZACIÓN*

Nombre: ${nombre}

Teléfono: ${telefono}

Correo: ${correo}

Producto: ${producto}

Cantidad: ${cantidad}

Fecha requerida: ${fecha}

Descripción:

${descripcion}`;

    let numero="5215512345678";

    window.open("https://wa.me/"+numero+"?text="+encodeURIComponent(mensaje));
}


// =============================
// 2. CARRUSEL AUTOMÁTICO (NUEVO)
// =============================

let index = 0;
const slides = document.querySelectorAll(".slide");

function showSlide() {

    // Si no existen slides, no hace nada (evita errores)
    if (slides.length === 0) return;

    // Quitamos clase active a todos
    slides.forEach(slide => slide.classList.remove("active"));

    // Avanzamos al siguiente
    index = (index + 1) % slides.length;

    // Activamos el actual
    slides[index].classList.add("active");
}

// Inicia solo cuando cargue la página
window.addEventListener("DOMContentLoaded", function () {

    // Seguridad: solo corre si hay slider
    if (slides.length > 0) {
        setInterval(showSlide, 4000);
    }
});

// =============================
// WHATSAPP (COTIZACIÓN)
// =============================

function enviarWhatsApp(){

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
Fecha requerida: ${fecha}

Descripción:
${descripcion}`;

    let numero = "5215512345678";

    window.open(
        "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensaje),
        "_blank"
    );
}


// =============================
// CARRUSEL AUTOMÁTICO ESTABLE
// =============================

window.addEventListener("load", () => {

    const slides = document.querySelectorAll(".slide");

    // seguridad: si no hay slider, no ejecutar nada
    if (!slides || slides.length === 0) return;

    let index = 0;

    function showNextSlide() {

        slides.forEach(slide => slide.classList.remove("active"));

        index = (index + 1) % slides.length;

        slides[index].classList.add("active");

    }

    // estado inicial limpio
    slides.forEach(s => s.classList.remove("active"));

    if (slides.length > 0) {
        slides[0].classList.add("active");
    }

    // intervalo estable
    setInterval(showNextSlide, 4000);

});
