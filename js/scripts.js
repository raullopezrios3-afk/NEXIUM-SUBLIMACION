/* =====================================================
   NEXIUM - JS FINAL ESTABLE (DEPLOY SAFE)
===================================================== */


/* =========================
   VARIABLES GLOBALES
========================= */

let imagenes = [];
let indexActual = 0;


/* =========================
   INICIALIZACIÓN GENERAL
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
       BOTÓN POSTER
    ========================= */
    const btnPoster = document.getElementById("btnPoster");

    if (btnPoster) {
        btnPoster.addEventListener("click", (e) => {
            e.preventDefault();
            abrirPoster();
        });
    }


    /* =========================
       BOTÓN COTIZAR
    ========================= */
    const btnCotizar = document.getElementById("btnCotizar");

    if (btnCotizar) {
        btnCotizar.addEventListener("click", (e) => {
            e.preventDefault();

            const modal = document.getElementById("modalCotizacion");
            if (modal) modal.style.display = "flex";
        });
    }


    /* =========================
       BOTÓN WHATSAPP
    ========================= */
    const btnWhatsApp = document.getElementById("btnWhatsApp");

    if (btnWhatsApp) {
        btnWhatsApp.addEventListener("click", (e) => {
            e.preventDefault();
            enviarWhatsApp();
        });
    }


    /* =========================
       CERRAR MODAL
    ========================= */
    const btnCerrarModal = document.getElementById("cerrarModal");

    if (btnCerrarModal) {
        btnCerrarModal.addEventListener("click", cerrarModalCotizacion);
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
       GALERÍA
    ========================= */
    const cards = document.querySelectorAll(".producto-card");

    cards.forEach(card => {

        const header = card.querySelector(".card-header");
        if (!header) return;

        header.addEventListener("click", function (e) {

            e.stopPropagation();

            const active = card.classList.contains("active");

            cards.forEach(c => c.classList.remove("active"));

            if (!active) card.classList.add("active");
        });
    });


    /* CLICK FUERA */
    document.addEventListener("click", function (e) {

        const inside = e.target.closest(".producto-card");

        if (!inside) {
            document.querySelectorAll(".producto-card.active")
                .forEach(c => c.classList.remove("active"));
        }
    });

});


/* =====================================================
   FUNCIONES GLOBALES
===================================================== */


/* POSTER */
function abrirPoster() {

    const overlay = document.createElement("div");
    overlay.style.cssText = `
        position:fixed;top:0;left:0;width:100%;height:100%;
        background:rgba(0,0,0,0.85);
        display:flex;align-items:center;justify-content:center;
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


/* WHATSAPP */
function enviarWhatsApp() {

    let nombre = document.getElementById("nombre")?.value || "";
    let telefono = document.getElementById("telefono")?.value || "";
    let correo = document.getElementById("correo")?.value || "";
    let producto = document.getElementById("producto")?.value || "";
    let cantidad = document.getElementById("cantidad")?.value || "";
    let fecha = document.getElementById("fecha")?.value || "";
    let descripcion = document.getElementById("descripcion")?.value || "";

    let mensaje = `¡Hola!

SOLICITUD DE COTIZACIÓN
Nombre: ${nombre}
Tel: ${telefono}
Correo: ${correo}
Producto: ${producto}
Cantidad: ${cantidad}
Fecha: ${fecha}

Descripción:
${descripcion}`;

    window.open(
        "https://wa.me/525610066522?text=" + encodeURIComponent(mensaje),
        "_blank"
    );
}


/* EMAILJS */
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

        document.getElementById("formCotizacion").reset();
        document.getElementById("modalCotizacion").style.display = "none";

    })
    .catch(() => {
        alert("Error al enviar ❌");
    });
}


/* MODAL */
function cerrarModalCotizacion() {

    const modal = document.getElementById("modalCotizacion");
    const form = document.getElementById("formCotizacion");

    if (form) form.reset();
    if (modal) modal.style.display = "none";
}


/* VISOR (SIN DUPLICADOS) */
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


/* EXPOSICIÓN GLOBAL (IMPORTANTE PARA HTML onclick) */
window.cerrarModalCotizacion = cerrarModalCotizacion;
window.enviarCotizacionCorreo = enviarCotizacionCorreo;
window.enviarWhatsApp = enviarWhatsApp;
window.abrirPoster = abrirPoster;
window.abrirVisor = abrirVisor;
window.cambiarImagen = cambiarImagen;
window.cerrarVisor = cerrarVisor;
