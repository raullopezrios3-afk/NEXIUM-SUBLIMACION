/*
=========================================
 NEXIUM CORE MAIN
 Archivo principal
=========================================
*/


document.addEventListener(
"DOMContentLoaded",
()=>{


    const nexium =
    new NexiumCore();
 
    window.NEXIUM =
    nexium;



    nexium.modules.canvas.init(
        "nexiumCanvas"
    );

 nexium.modules.mouse.bindEvents();

 nexium.modules.render.start();

 nexium.addObject({

    id:1,

    tipo:"rectangulo",

    x:100,
    y:100,

    ancho:200,
    alto:100

});



});
