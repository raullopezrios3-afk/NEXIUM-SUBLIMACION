/* =====================================================
   NEXIUM - JS ESTABLE Y FUNCIONAL
===================================================== */

/* =========================
   VARIABLES GLOBALES
========================= */
let imagenes = [];
let indexActual = 0;


/* =========================
   INICIALIZACIÓN
========================= */
document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       SLIDER
    ========================= */
    const slides = document.querySelectorAll(".slide");

    if (slides.length > 0) {
        let index = 0;
        slides[0].classList.add("active");

        setInterval(() => {
            slides.forEach(s => s.classList.remove("active"));
            index = (index + 1) % slides.length;
            slides[index].classList.add("active");
        }, 4000);
    }


    /* =========================
       POSTER
    ========================= */
    const btnPoster = document.getElementById("btnPoster");

    if (btnPoster) {
        btnPoster.addEventListener("click", function (e) {
            e.preventDefault();
            abrirPoster();
        });
    }


    /* =========================
       COTIZAR (MODAL OPEN)
    ========================= */
    const btnCotizar = document.getElementById("btnCotizar");

    if (btnCotizar) {
        btnCotizar.addEventListener("click", function (e) {
            e.preventDefault();

            const modal = document.getElementById("modalCotizacion");
            if (modal) modal.style.display = "flex";
        });
    }


    /* =========================
       WHATSAPP HEADER
    ========================= */
    const btnWhatsApp = document.getElementById("btnWhatsApp");

    if (btnWhatsApp) {
        btnWhatsApp.addEventListener("click", function (e) {
            e.preventDefault();
            enviarWhatsApp();
        });
    }


    /* =========================
       CERRAR MODAL (X)
    ========================= */
    const btnCerrar = document.getElementById("cerrarModal");

    if (btnCerrar) {
        btnCerrar.addEventListener("click", function () {
            cerrarModalCotizacion();
        });
    }


    /* =========================
       MENÚ ACTIVO
    ========================= */
    const menuLinks = document.querySelectorAll(".menu a");

    menuLinks.forEach(link => {
        link.addEventListener("click", function () {
            menuLinks.forEach(i => i.classList.remove("active"));
            this.classList.add("active");
        });
    });


    /* =========================
       GALERÍA (ACORDEÓN TARJETAS)
    ========================= */
    const cards = document.querySelectorAll(".producto-card");

    cards.forEach(card => {

        const header = card.querySelector(".card-header");
        if (!header) return;

        header.addEventListener("click", function (e) {
            e.stopPropagation();

            const isActive = card.classList.contains("active");

            cards.forEach(c => c.classList.remove("active"));

            if (!isActive) card.classList.add("active");
        });
    });


    /* =========================
       CIERRE GLOBAL TARJETAS
    ========================= */
    document.addEventListener("click", function (e) {

        const inside = e.target.closest(".producto-card");

        if (!inside) {
            cards.forEach(c => c.classList.remove("active"));
        }
    });

});


/* =====================================================
   FUNCIONES GLOBALES
===================================================== */


/* =========================
   POSTER
========================= */
function abrirPoster() {

    const overlay = document.createElement("div");

    overlay.style.cssText = `
        position:fixed;
        top:0;left:0;
        width:100%;height:100%;
        background:rgba(0,0,0,0.85);
        display:flex;
        align-items:center;
        justify-content:center;
        z-index:999999;
    `;

    const img = document.createElement("img");
    img.src = "imagenes/poster.jpg";
    img.style.maxWidth = "90%";
    img.style.maxHeight = "90%";
    img.style.borderRadius = "12px";
    img.style.cursor = "zoom-out";

    overlay.appendChild(img);

    overlay.onclick = () => overlay.remove();

    document.body.appendChild(overlay);
}


/* =========================
   WHATSAPP (SOLO TEXTO BASE)
========================= */
function enviarWhatsApp() {

    let mensaje = `¡Hola!

Gracias por comunicarte con NEXIUM SUBLIMACION.

¡HACEMOS REALIDAD TUS IDEAS BRILLANTES!

Me gustaría recibir información sobre sus productos promocionales y servicios de personalización.

Quedo atento(a) a su respuesta.`;

    window.open(
        "https://wa.me/525610066522?text=" + encodeURIComponent(mensaje),
        "_blank"
    );
}


/* =========================
   EMAILJS (COTIZACIÓN)
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
    })
    .then(() => {

        alert("Enviado correctamente ✅");

        const form = document.getElementById("formCotizacion");
        const modal = document.getElementById("modalCotizacion");

        if (form) form.reset();
        if (modal) modal.style.display = "none";

    })
    .catch(() => {
        alert("Error al enviar ❌");
    });
}


/* =========================
   MODAL CLOSE
========================= */
function cerrarModalCotizacion() {

    const modal = document.getElementById("modalCotizacion");
    const form = document.getElementById("formCotizacion");

    if (form) form.reset();
    if (modal) modal.style.display = "none";
}


/* =========================
   VISOR IMAGENES
========================= */
function abrirVisor(img) {

    const galeria = img.closest(".galeria").querySelectorAll("img");

    imagenes = Array.from(galeria).map(i => i.src);
    indexActual = imagenes.indexOf(img.src);

    document.getElementById("visor").style.display = "flex";
    document.getElementById("imgGrande").src = img.src;
}

function cambiarImagen(dir, e) {
    e?.stopPropagation();

    indexActual += dir;

    if (indexActual < 0) indexActual = imagenes.length - 1;
    if (indexActual >= imagenes.length) indexActual = 0;

    document.getElementById("imgGrande").src = imagenes[indexActual];
}

function cerrarVisor(e) {
    e?.stopPropagation();
    document.getElementById("visor").style.display = "none";
}

function safe(fn) {
    return (...args) => {
        try {
            return fn(...args);
        } catch (e) {
            console.error("Error en función:", e);
        }
    };
}

/* =========================
   EXPOSICIÓN GLOBAL (IMPORTANTE)
========================= */
window.abrirPoster = abrirPoster;
window.enviarWhatsApp = enviarWhatsApp;
window.enviarCotizacionCorreo = enviarCotizacionCorreo;
window.cerrarModalCotizacion = cerrarModalCotizacion;
window.abrirVisor = abrirVisor;
window.cambiarImagen = cambiarImagen;
window.cerrarVisor = cerrarVisor;
