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



    nexium.modules.render.start();



});
