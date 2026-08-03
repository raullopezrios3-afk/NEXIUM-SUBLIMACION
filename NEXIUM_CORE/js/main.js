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



nexium.createRectangle(
    100,
    100,
    200,
    100
);



nexium.modules.render.start();
