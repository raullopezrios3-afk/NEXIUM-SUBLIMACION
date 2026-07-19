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
   GALERÍA (ACORDEÓN TARJETAS)
========================= */

const cards = document.querySelectorAll(".producto-card");

cards.forEach(card => {

    card.addEventListener("click", function (e) {

        // Si hicieron clic en una imagen del catálogo,
        // no abrir/cerrar la tarjeta.
        if (e.target.closest(".galeria img")) return;

        e.stopPropagation();

        cerrarVisor();

        const estabaAbierta = card.classList.contains("active");

        // Cerrar todas
        cards.forEach(c => c.classList.remove("active"));

        // Abrir solamente la seleccionada
        if (!estabaAbierta) {
            card.classList.add("active");
        }

    });

});   // ← AQUÍ termina el forEach

   /* =========================
   CERRAR CATÁLOGOS AL HACER CLICK FUERA
========================= */

document.addEventListener("click", function (e) {

    if (!e.target.closest(".producto-card")) {

        document.querySelectorAll(".producto-card.active")
            .forEach(card => card.classList.remove("active"));

    }

});

/* =========================
       CERRAR MODAL AL HACER CLICK FUERA
    ========================= */
   document.addEventListener("click", function (e) {

    const modal = document.getElementById("modalCotizacion");

    if (!modal || modal.style.display !== "flex") return;

    // Ignorar el clic que abrió el modal
    if (e.target.closest(".cotizar")) return;

    const content = modal.querySelector(".modal-content");

    if (!content.contains(e.target)) {
        cerrarModalCotizacion();
    }

});

   /* =========================
   CERRAR VISOR AL HACER CLIC FUERA
========================= */
document.addEventListener("click", function (e) {

    const visor = document.getElementById("visor");

    if (!visor) return;

    if (visor.style.display !== "flex") return;

    if (e.target === visor) {
        cerrarVisor();
    }

});

  /* =========================
   ESC GLOBAL
========================= */
document.addEventListener("keydown", function (e) {

    if (e.key !== "Escape") return;

    // Cerrar visor
    const visor = document.getElementById("visor");

    if (visor && visor.style.display === "flex") {
        cerrarVisor();
    }

    // Cerrar modal
    const modal = document.getElementById("modalCotizacion");

    if (modal && modal.style.display === "flex") {
        cerrarModalCotizacion();
    }

    // Cerrar catálogos abiertos
    document.querySelectorAll(".producto-card.active")
        .forEach(card => card.classList.remove("active"));

});

});
     
/* =====================================================
   FUNCIONES GLOBALES
===================================================== */

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

/* =========================
   ABRIR MODAL
========================= */
function abrirModalCotizacion() {

    const modal = document.getElementById("modalCotizacion");

    if (modal) {
        modal.style.display = "flex";
    }

}
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
   WHATSAPP
========================= */
function enviarWhatsApp() {

    const mensaje = `¡Hola!

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

        alert("Solicitud enviada correctamente.");

        cerrarModalCotizacion();

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

/*=========================
VISOR VIDEO
=========================*/

function abrirVideo(e){

    if(e) e.preventDefault();

    const visorVideo=document.getElementById("visorVideo");
    const videoGrande=document.getElementById("videoGrande");

    visorVideo.style.display="flex";

    videoGrande.currentTime=0;
    videoGrande.play();

}

function cerrarVideo(e){

    if(e) e.stopPropagation();

    const visorVideo=document.getElementById("visorVideo");
    const videoGrande=document.getElementById("videoGrande");

    visorVideo.style.display="none";

    videoGrande.pause();
    videoGrande.currentTime=0;

}

window.addEventListener("DOMContentLoaded",()=>{

    const visorVideo=document.getElementById("visorVideo");

    if(visorVideo){

        visorVideo.addEventListener("click",function(e){

            if(e.target===visorVideo){

                cerrarVideo();

            }

        });

    }

});

/*=========================
NEXIUM DESIGN STUDIO
=========================*/

window.addEventListener("DOMContentLoaded",()=>{

    const btn=document.getElementById("btnStudio");

    const modal=document.getElementById("modalStudio");

    const cerrar=document.getElementById("cerrarStudio");

    if(!btn || !modal || !cerrar) return;

    btn.addEventListener("click",()=>{

        modal.style.display="flex";

    });

    cerrar.addEventListener("click",()=>{

        modal.style.display="none";

    });

    modal.addEventListener("click",(e)=>{

        if(e.target===modal){

            modal.style.display="none";

        }

    });

    document.addEventListener("keydown",(e)=>{

        if(e.key==="Escape"){

            modal.style.display="none";

        }

    });

   /*======================================
ÁREA DE IMPRESIÓN POR PRODUCTO
======================================*/

const areaImpresion = document.getElementById("areaImpresion");

function actualizarAreaImpresion(producto){

    switch(producto){

        case "taza":

            areaImpresion.style.width="38%";
            areaImpresion.style.height="30%";
            areaImpresion.style.left="50%";
            areaImpresion.style.top="46%";

        break;


        case "playera":

            areaImpresion.style.width="32%";
            areaImpresion.style.height="46%";
            areaImpresion.style.left="50%";
            areaImpresion.style.top="39%";

        break;


        case "termo":

            areaImpresion.style.width="22%";
            areaImpresion.style.height="48%";
            areaImpresion.style.left="50%";
            areaImpresion.style.top="44%";

        break;

    }

}

  
   /*======================================
SELECCIÓN DE PRODUCTO
======================================*/

const botonesProducto=document.querySelectorAll(".studio-item");

const productoActual=document.getElementById("productoActual");

botonesProducto.forEach(boton=>{

    boton.addEventListener("click",function(){

        const producto=this.dataset.producto;

        switch(producto){

           case "taza":

    productoActual.src="configurador/productos/tazas/taza-blanca.png";

    actualizarAreaImpresion("taza");

break;

           case "playera":

    productoActual.src="configurador/productos/playeras/playera-blanca.png";

    actualizarAreaImpresion("playera");

break;
            case "termo":

    productoActual.src="configurador/productos/termos/termo-blanco.png";

    actualizarAreaImpresion("termo");

break;

        }

    });

});

/*======================================
CARGAR DISEÑO DEL CLIENTE
======================================*/

const subirDiseno=document.getElementById("subirDiseno");

const disenoUsuario=document.getElementById("disenoUsuario");


if(subirDiseno && disenoUsuario){


    subirDiseno.addEventListener("change",function(){


        const archivo=this.files[0];


        if(!archivo) return;


        const lector=new FileReader();


        lector.onload=function(e){


            disenoUsuario.src=e.target.result;

            disenoUsuario.style.display="block";


        };


        lector.readAsDataURL(archivo);


    });


}


});

/* =========================
   EXPORT GLOBAL (SEGURO)
========================= */

window.addEventListener("load",()=>{

    window.abrirPoster=abrirPoster;
    window.enviarWhatsApp=enviarWhatsApp;

    window.abrirVisor=abrirVisor;
    window.cambiarImagen=cambiarImagen;
    window.cerrarVisor=cerrarVisor;

    window.abrirVideo=abrirVideo;
    window.cerrarVideo=cerrarVideo;

    window.cerrarModalCotizacion=cerrarModalCotizacion;
    window.abrirModalCotizacion=abrirModalCotizacion;
    window.enviarCotizacionCorreo=enviarCotizacionCorreo;

});
