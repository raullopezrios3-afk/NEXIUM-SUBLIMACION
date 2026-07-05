document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       SLIDER
    ========================= */
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

//==================================
// MENÚ ACTIVO
//==================================

const enlaces = document.querySelectorAll('.menu a');

enlaces.forEach(enlace=>{

    enlace.addEventListener('click',function(){

        enlaces.forEach(item=>item.classList.remove('active'));

        this.classList.add('active');

    });

});

function abrirPoster(){

    const img = document.createElement("img");
    img.src = "imagenes/poster.jpg";

    img.style.position = "fixed";
    img.style.top = "0";
    img.style.left = "0";
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "contain";
    img.style.background = "rgba(0,0,0,0.9)";
    img.style.zIndex = "999999";
    img.style.cursor = "zoom-out";

    img.onclick = () => img.remove();

    document.body.appendChild(img);

}
