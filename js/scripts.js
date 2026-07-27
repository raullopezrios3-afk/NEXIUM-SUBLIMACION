/* =========================
   VARIABLES GLOBALES
========================= */

let imagenes = [];
let indexActual = 0;


// ===============================
// MOTOR 360 TAZA
// ===============================

let frameActualTaza = 1;
let imagenesTaza360 = [];
let productoActivo = "taza";
let giroTazaActivo = false;

// ===============================
// PLAYERA
// ===============================
let vistaPlayera = "anverso";


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

    iniciarEventosGlobales();

    iniciarCotizacion();

    iniciarVideo();

    iniciarTema();

    iniciarStudio();
    
    iniciarTaza360();

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


}

/* =========================
   EVENTOS GLOBALES
========================= */

function iniciarEventosGlobales(){


    /*
    CERRAR TARJETAS AL HACER CLICK FUERA
    */

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





    /*
    CERRAR VISOR AL HACER CLICK FUERA
    */


    document.addEventListener(
    "click",
    function(e){


        const visor =
        document.getElementById("visor");


        if(!visor)
        return;



        if(
        visor.style.display === "flex"
        &&
        e.target === visor
        ){


            cerrarVisor();


        }


    });






    /*
    ESC GLOBAL
    */


    document.addEventListener(
    "keydown",
    function(e){


        if(e.key !== "Escape")
        return;




        // CERRAR VISOR

        const visor =
        document.getElementById("visor");



        if(
        visor &&
        visor.style.display === "flex"
        ){


            cerrarVisor();


        }





        // CERRAR MODAL COTIZACION

        const modal =
        document.getElementById("modalCotizacion");



        if(
        modal &&
        modal.style.display === "flex"
        ){


            cerrarModalCotizacion();


        }





        // CERRAR DESIGN STUDIO

        const studio =
        document.getElementById("modalStudio");



        if(
        studio &&
        studio.style.display === "flex"
        ){


            studio.style.display="none";


        }





        // CERRAR TARJETAS ABIERTAS

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


    if(e.target === modal){

        modal.style.display="none";

    }


});
   
/* =========================
   PRODUCTOS STUDIO
========================= */


const areaImpresion =
document.getElementById("areaImpresion");



const productoActual =
document.getElementById("productoActual") ||
document.getElementById("taza360");

const taza360 =
document.getElementById("taza360");



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
productoActivo = producto;




if(!productoActual)
return;




switch(producto){



case "taza":


if(taza360){

    taza360.src =
    "configurador/productos/tazas/360/taza-01.png";

}


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




if(subirDiseno){


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


// CERRAMOS INICIAR STUDIO AQUÍ
}


/* =========================
   MOVER DISEÑO CON MOUSE
========================= */


function moverDiseno(){

    const diseno =
    document.getElementById("disenoUsuario");


    const area =
    document.getElementById("areaImpresion");


    if(!diseno || !area)
    return;


    let moviendo=false;

    let offsetX=0;

    let offsetY=0;


    diseno.addEventListener(
    "mousedown",
    function(e){


        moviendo=true;


        offsetX =
        e.clientX -
        diseno.offsetLeft;


        offsetY =
        e.clientY -
        diseno.offsetTop;


        diseno.style.cursor="grabbing";


    });


    document.addEventListener(
    "mousemove",
    function(e){


        if(!moviendo)
        return;


        diseno.style.left =
        (e.clientX-offsetX)+"px";


        diseno.style.top =
        (e.clientY-offsetY)+"px";


    });


    document.addEventListener(
    "mouseup",
    function(){


        moviendo=false;


        diseno.style.cursor="grab";


    });


}

// ===================================
// MOTOR 360 TAZA - PREPARACIÓN
// ===================================

const totalFramesTaza = 21;

function cargarTaza360() {

    for (let i = 1; i <= totalFramesTaza; i++) {

        let numero = i.toString().padStart(2, "0");

        let img = new Image();

        img.src = 
        `configurador/productos/tazas/360/taza-${numero}.png`;

        imagenesTaza360.push(img);
    }

    console.log("Imágenes 360 cargadas:", imagenesTaza360);

}

cargarTaza360();

// ===================================
// PLAYERA ANVERSO / REVERSO
// ===================================

function cambiarVistaPlayera(vista){

    const producto =
    document.getElementById("productoActual");


    if(!producto)
    return;


    productoActivo = "playera";


    vistaPlayera = vista;


    if(vista === "anverso"){


        producto.src =
        "configurador/productos/playeras/playera-anverso.png";


    }


    if(vista === "reverso"){


        producto.src =
        "configurador/productos/playeras/playera-reverso.png";


    }


    actualizarAreaImpresion("playera");

}

   // ===============================
// MOSTRAR FRAME TAZA 360
// ===============================

function mostrarFrameTaza(){


    const taza =
    document.getElementById("taza360");


    if(!taza)
    return;


    let numero =
    frameActualTaza
    .toString()
    .padStart(2,"0");


    taza.src =
    `configurador/productos/tazas/360/taza-${numero}.png`;


}

   // ===============================
// CONTROL GIRO TAZA 360
// ===============================

function girarTaza(direccion){


    frameActualTaza += direccion;


    if(frameActualTaza > 21){

        frameActualTaza = 1;

    }


    if(frameActualTaza < 1){

        frameActualTaza = 21;

    }


    mostrarFrameTaza();


}

// ===================================
// ARRASTRE MOUSE TAZA 360
// ===================================

function activarArrastreTaza360(){


    const taza =
    document.getElementById("taza360");


    if(!taza)
    return;


    let inicioX = 0;

    let arrastrando = false;



    taza.addEventListener(
    "mousedown",
    function(e){


        arrastrando = true;


        inicioX = e.clientX;


        taza.style.cursor="grabbing";


    });



    document.addEventListener(
    "mousemove",
    function(e){


        if(!arrastrando)
        return;



        let movimiento =
        e.clientX - inicioX;



        if(Math.abs(movimiento) > 15){


            if(movimiento > 0){

                girarTaza(-1);

            }else{

                girarTaza(1);

            }


            inicioX = e.clientX;


        }



    });



    document.addEventListener(
    "mouseup",
    function(){


        arrastrando=false;


        taza.style.cursor="grab";


    });


    console.log(
    "Taza 360 interactiva activada"
    );


}



// ===================================
// CONTROL 360 INTERACTIVO TAZA
// ===================================

function iniciarTaza360(){

    const taza =
    document.getElementById("taza360");


    if(!taza)
    return;


    let presionando = false;

    let posicionInicial = 0;

    let frameAnterior = frameActualTaza;



    function iniciarMovimiento(posicion){

        presionando = true;

        posicionInicial = posicion;

        frameAnterior = frameActualTaza;

    }



    function mover(posicion){


    if(!presionando)
    return;


    if(productoActivo !== "taza")
    return;



        let diferencia =
        posicion - posicionInicial;



        if(Math.abs(diferencia) > 10){


            if(diferencia > 0){

                frameActualTaza--;

            }else{

                frameActualTaza++;

            }



            if(frameActualTaza > totalFramesTaza){

                frameActualTaza = 1;

            }


            if(frameActualTaza < 1){

                frameActualTaza = totalFramesTaza;

            }



            mostrarFrameTaza();



            posicionInicial = posicion;


        }


    }



    function terminar(){

        presionando=false;

    }



    // MOUSE

   taza.addEventListener(
"mousedown",
e=>{

    if(productoActivo !== "taza")
    return;


    iniciarMovimiento(e.clientX);

});



    window.addEventListener(
    "mousemove",
    e=>{

        mover(e.clientX);

    });



    window.addEventListener(
    "mouseup",
    terminar);



    // TOUCH MOVIL

    taza.addEventListener(
    "touchstart",
    e=>{


        iniciarMovimiento(
            e.touches[0].clientX
        );


    });



    taza.addEventListener(
    "touchmove",
    e=>{


        mover(
            e.touches[0].clientX
        );


    });



    taza.addEventListener(
    "touchend",
    terminar);



    console.log(
    "Taza 360 interactiva activada"
    );

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
