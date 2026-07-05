   /* =========================
       SLIDER
========================= */

document.addEventListener("DOMContentLoaded", function () {

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
   WHATSAPP
========================= */
function enviarWhatsApp() {

    let nombre = document.getElementById("nombre").value;
    let telefono = document.getElementById("telefono").value;
    let correo = document.getElementById("correo").value;
    let producto = document.getElementById("producto").value;
    let cantidad = document.getElementById("cantidad").value;
    let fecha = document.getElementById("fecha").value;
    let descripcion = document.getElementById("descripcion").value;

    let mensaje =
`¡Hola!

Gracias por comunicarte con NEXIUM SUBLIMACION.

¡HACEMOS REALIDAD TUS IDEAS BRILLANTES!

Me gustaría recibir información sobre sus productos promocionales y servicios de personalización.

Quedo atento(a) a su respuesta.

---

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
    })
    .then(() => {

        alert("Enviado correctamente ✅");

        document.getElementById("formCotizacion").reset();
        document.getElementById("modalCotizacion").style.display = "none";

    })
    .catch(err => {
        console.log(err);
        alert("Error al enviar ❌");
    });
}


/* =========================
   MODAL
========================= */
function cerrarModalCotizacion() {
    document.getElementById("formCotizacion").reset();
    document.getElementById("modalCotizacion").style.display = "none";
}


/* =========================
   MENÚ ACTIVO NEXIUM
========================= */

const menuLinks = document.querySelectorAll('.menu a');

menuLinks.forEach(link => {
    link.addEventListener('click', function () {

        menuLinks.forEach(item => item.classList.remove('active'));

        this.classList.add('active');

    });
});


/* =========================
   POSTER
========================= */

function abrirPoster(){

    const overlay = document.createElement("div");

    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0,0,0,0.85)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "999999";

    const img = document.createElement("img");
    img.src = "imagenes/poster.jpg";

    img.style.maxWidth = "90%";
    img.style.maxHeight = "90%";
    img.style.borderRadius = "12px";
    img.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)";
    img.style.cursor = "zoom-out";

    overlay.appendChild(img);

    overlay.onclick = () => overlay.remove();

    document.body.appendChild(overlay);

}

document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("btnPoster");

    if(btn){
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            abrirPoster();
        });
    }

});


/* =========================
   VISOR IMAGEN
========================= */

let imagenes = [];
let indexActual = 0;

/* abrir visor */
function abrirVisor(img){

    const galeria = img.closest(".galeria").querySelectorAll("img");

    imagenes = Array.from(galeria).map(i => i.src);
    indexActual = imagenes.indexOf(img.src);

    document.getElementById("visor").style.display = "flex";
    document.getElementById("imgGrande").src = img.src;
}

/* cambiar imagen */
function cambiarImagen(dir, event){
    event.stopPropagation();

    indexActual += dir;

    if(indexActual < 0) indexActual = imagenes.length - 1;
    if(indexActual >= imagenes.length) indexActual = 0;

    document.getElementById("imgGrande").src = imagenes[indexActual];
}

/* cerrar visor */
function cerrarVisor(event){
    if(event) event.stopPropagation();
    document.getElementById("visor").style.display = "none";
}


/* =========================
   GALERÍA TOGGLE REFACTORIZADO
========================= */

function toggleGaleria(elemento) {

    const card = elemento.closest(".producto-card");
    if (!card) return;

    const isActive = card.classList.contains("active");

    // Cerrar todas las demás tarjetas
    document.querySelectorAll(".producto-card.active").forEach(c => {
        if (c !== card) {
            c.classList.remove("active");
        }
    });

    // Abrir o cerrar la actual
    card.classList.toggle("active", !isActive);
}

// Cerrar al hacer click fuera
document.addEventListener("click", (e) => {
    const clickedInsideCard = e.target.closest(".producto-card");

    if (!clickedInsideCard) {
        document.querySelectorAll(".producto-card.active")
            .forEach(c => c.classList.remove("active"));
    }
});
