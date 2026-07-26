/* =========================
   VARIABLES GLOBALES
========================= */

let imagenes = [];
let indexActual = 0;


/* =========================
   INICIO GENERAL NEXIUM
========================= */

document.addEventListener(
    "DOMContentLoaded",
    iniciarNexium
);


function iniciarNexium(){

    console.log("NEXIUM iniciado");


    iniciarSlider();

    iniciarMenu();

    iniciarPoster();

    iniciarGalerias();

    iniciarCotizacion();

    iniciarVideo();

    iniciarTema();

    iniciarStudio();

}



/* =========================
   SLIDER
========================= */

function iniciarSlider(){

    const slides =
    document.querySelectorAll(".slide");


    if(slides.length === 0) return;


    let index = 0;


    slides[0].classList.add("active");


    setInterval(()=>{


        slides.forEach(slide=>{

            slide.classList.remove("active");

        });


        index =
        (index + 1) % slides.length;


        slides[index]
        .classList.add("active");


    },4000);

}



/* =========================
   MENU ACTIVO
========================= */

function iniciarMenu(){


    const menuLinks =
    document.querySelectorAll(".menu a");


    if(menuLinks.length === 0) return;



    menuLinks.forEach(link=>{


        link.addEventListener(
        "click",
        function(){


            menuLinks.forEach(item=>{

                item.classList.remove("active");

            });



            this.classList.add("active");


        });


    });


}



/* =========================
   POSTER
========================= */

function iniciarPoster(){


    const btnPoster =
    document.getElementById("btnPoster");


    if(!btnPoster) return;



    btnPoster.addEventListener(
        "click",
        function(e){


            e.preventDefault();


            abrirPoster();


        }
    );


}



/* =========================
   GALERIAS PRODUCTOS
========================= */

function iniciarGalerias(){


const cards =
document.querySelectorAll(".producto-card");



cards.forEach(card=>{


    card.addEventListener(
    "click",
    function(e){



        if(
        e.target.closest(".galeria img")
        ) return;



        e.stopPropagation();



        cerrarVisor();



        const estabaAbierta =
        card.classList.contains("active");



        cards.forEach(c=>{

            c.classList.remove("active");

        });



        if(!estabaAbierta){

            card.classList.add("active");

        }



    });


});



/* CERRAR AL HACER CLICK FUERA */


document.addEventListener(
"click",
function(e){


    if(
    !e.target.closest(".producto-card")
    ){


        document
        .querySelectorAll(".producto-card.active")
        .forEach(card=>{


            card.classList.remove("active");


        });


    }


});



/* CERRAR VISOR CLICK FUERA */


document.addEventListener(
"click",
function(e){


const visor =
document.getElementById("visor");


if(!visor) return;


if(
visor.style.display==="flex"
&&
e.target===visor
){


    cerrarVisor();


}


});



/* ESC GLOBAL */


document.addEventListener(
"keydown",
function(e){


if(e.key!=="Escape")
return;



const visor =
document.getElementById("visor");


if(
visor &&
visor.style.display==="flex"
){


    cerrarVisor();


}



const modal =
document.getElementById("modalCotizacion");


if(
modal &&
modal.style.display==="flex"
){


    cerrarModalCotizacion();


}



document
.querySelectorAll(".producto-card.active")
.forEach(card=>{


card.classList.remove("active");


});


});


}



/* =========================
   COTIZACION
========================= */

function iniciarCotizacion(){


const campos =
document.querySelectorAll(
"#nombre,#telefono,#correo,#producto,#cantidad,#fecha"
);



const btn =
document.getElementById("btnCotizar");



if(!btn) return;



function validarFormulario(){


let completo=true;



campos.forEach(campo=>{


if(campo.value.trim()===""){


completo=false;


}


});



btn.disabled=!completo;


}



campos.forEach(campo=>{


campo.addEventListener(
"input",
validarFormulario
);


});


}

/* =========================
   VISOR DE IMÁGENES
========================= */


function abrirVisor(img){


    const galeria =
    img.closest(".galeria")
    .querySelectorAll("img");



    imagenes =
    Array.from(galeria)
    .map(i=>i.src);



    indexActual =
    imagenes.indexOf(img.src);



    const visor =
    document.getElementById("visor");


    const imgGrande =
    document.getElementById("imgGrande");



    if(visor){

        visor.style.display="flex";

    }



    if(imgGrande){

        imgGrande.src=img.src;

    }


}



function cambiarImagen(dir,e){


    if(e){

        e.stopPropagation();

    }



    indexActual += dir;



    if(indexActual < 0){

        indexActual =
        imagenes.length-1;

    }



    if(indexActual >= imagenes.length){

        indexActual=0;

    }



    const imgGrande =
    document.getElementById("imgGrande");



    if(imgGrande){

        imgGrande.src =
        imagenes[indexActual];

    }


}



function cerrarVisor(e){


    if(e){

        e.stopPropagation();

    }



    const visor =
    document.getElementById("visor");



    if(visor){

        visor.style.display="none";

    }


}



/* =========================
   MODAL COTIZACION
========================= */


function abrirModalCotizacion(){


const modal =
document.getElementById("modalCotizacion");



if(modal){

    modal.style.display="flex";

}


}




function cerrarModalCotizacion(){


const modal =
document.getElementById("modalCotizacion");


const form =
document.getElementById("formCotizacion");


const btn =
document.getElementById("btnCotizar");




if(form){

    form.reset();

}



if(btn){

    btn.disabled=true;

}



if(modal){

    modal.style.display="none";

}



}





/* =========================
   POSTER
========================= */


function abrirPoster(){


const overlay =
document.createElement("div");



overlay.style.cssText=`

position:fixed;
top:0;
left:0;
width:100%;
height:100%;
background:rgba(0,0,0,.85);
display:flex;
align-items:center;
justify-content:center;
z-index:999999;

`;



const img =
document.createElement("img");



img.src =
"imagenes/poster.jpg";



img.style.maxWidth="90%";
img.style.maxHeight="90%";
img.style.borderRadius="12px";
img.style.cursor="zoom-out";



overlay.appendChild(img);



overlay.onclick=()=>{

    overlay.remove();

};



document.body.appendChild(overlay);



}




/* =========================
   WHATSAPP
========================= */


function enviarWhatsApp(){


const mensaje=`¡Hola!


Gracias por comunicarte con NEXIUM SUBLIMACION.


¡HACEMOS REALIDAD TUS IDEAS BRILLANTES!


Me gustaría recibir información sobre sus productos promocionales y servicios de personalización.


Quedo atento(a) a su respuesta.`;




window.open(

"https://wa.me/525610066522?text="
+
encodeURIComponent(mensaje),

"_blank"

);


}





/* =========================
   EMAILJS
========================= */


function enviarCotizacionCorreo(){



emailjs.send(

"service_e8slvmi",

"template_ams0res",

{


nombre:
document.getElementById("nombre").value,


telefono:
document.getElementById("telefono").value,


correo:
document.getElementById("correo").value,


producto:
document.getElementById("producto").value,


cantidad:
document.getElementById("cantidad").value,


fecha:
document.getElementById("fecha").value,


descripcion:
document.getElementById("descripcion").value


}


)



.then(()=>{


alert(
"Solicitud enviada correctamente."
);



cerrarModalCotizacion();



})



.catch(()=>{


alert(
"Error al enviar ❌"
);



});



}

/* =========================
   VIDEO
========================= */

/* =========================
   INICIALIZAR VIDEO
========================= */

function iniciarVideo(){


    const visorVideo =
    document.getElementById("visorVideo");


    if(!visorVideo) return;



    visorVideo.addEventListener(
        "click",
        function(e){


            if(e.target === visorVideo){

                cerrarVideo();

            }


        }
    );


}


function abrirVideo(e){


    if(e){

        e.preventDefault();

    }



    const visorVideo =
    document.getElementById("visorVideo");


    const videoGrande =
    document.getElementById("videoGrande");



    if(!visorVideo || !videoGrande)
    return;



    visorVideo.style.display="flex";


    videoGrande.currentTime=0;


    videoGrande.play();



}





function cerrarVideo(e){


    if(e){

        e.stopPropagation();

    }



    const visorVideo =
    document.getElementById("visorVideo");


    const videoGrande =
    document.getElementById("videoGrande");



    if(!visorVideo || !videoGrande)
    return;



    visorVideo.style.display="none";


    videoGrande.pause();


    videoGrande.currentTime=0;



}



/* =========================
   TEMA NEXIUM
========================= */


function iniciarTema(){



const btnDarkMode =
document.getElementById("btnDarkMode");



if(!btnDarkMode)
return;




document.body.classList.add(
"nexium-light"
);



btnDarkMode.addEventListener(
"click",
()=>{



if(
document.body.classList.contains(
"nexium-light"
)
){


document.body.classList.remove(
"nexium-light"
);


document.body.classList.add(
"nexium-dark"
);



btnDarkMode.textContent="☀️";



}else{



document.body.classList.remove(
"nexium-dark"
);



document.body.classList.add(
"nexium-light"
);



btnDarkMode.textContent="🌙";



}



});


}



/* =========================
   NEXIUM DESIGN STUDIO
========================= */


function iniciarStudio(){



const btn =
document.getElementById("btnStudio");


const modal =
document.getElementById("modalStudio");


const cerrar =
document.getElementById("cerrarStudio");



if(!btn || !modal || !cerrar)
return;




btn.addEventListener(
"click",
()=>{


modal.style.display="flex";


});





cerrar.addEventListener(
"click",
()=>{


modal.style.display="none";


});





modal.addEventListener(
"click",
(e)=>{


if(e.target===modal){


modal.style.display="none";


}


});





/* =========================
   PRODUCTOS STUDIO
========================= */


const areaImpresion =
document.getElementById("areaImpresion");



const productoActual =
document.getElementById("productoActual");



function actualizarAreaImpresion(producto){



if(!areaImpresion)
return;



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





const botonesProducto =
document.querySelectorAll(
".studio-item"
);



botonesProducto.forEach(
boton=>{



boton.addEventListener(
"click",
function(){



const producto =
this.dataset.producto;




if(!productoActual)
return;




switch(producto){



case "taza":


productoActual.src =
"configurador/productos/tazas/taza-blanca.png";


actualizarAreaImpresion("taza");


break;





case "playera":


productoActual.src =
"configurador/productos/playeras/playera-blanca.png";


actualizarAreaImpresion("playera");


break;





case "termo":


productoActual.src =
"configurador/productos/termos/termo-blanco.png";


actualizarAreaImpresion("termo");


break;



}



});



});






/* =========================
   SUBIR DISEÑO
========================= */



const subirDiseno =
document.getElementById("subirDiseno");


const disenoUsuario =
document.getElementById("disenoUsuario");




if(
subirDiseno &&
disenoUsuario
){



subirDiseno.addEventListener(
"change",
function(){



const archivo =
this.files[0];



if(!archivo)
return;




const lector =
new FileReader();




lector.onload=function(e){



disenoUsuario.src =
e.target.result;



disenoUsuario.style.display=
"block";



};




lector.readAsDataURL(
archivo
);



});


}




}




/* =========================
   EXPORTAR FUNCIONES GLOBALES
========================= */


window.addEventListener(
"load",
()=>{



window.abrirPoster =
abrirPoster;



window.enviarWhatsApp =
enviarWhatsApp;



window.abrirVisor =
abrirVisor;



window.cambiarImagen =
cambiarImagen;



window.cerrarVisor =
cerrarVisor;



window.abrirVideo =
abrirVideo;



window.cerrarVideo =
cerrarVideo;



window.abrirModalCotizacion =
abrirModalCotizacion;



window.cerrarModalCotizacion =
cerrarModalCotizacion;



window.enviarCotizacionCorreo =
enviarCotizacionCorreo;



});
