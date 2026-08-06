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

    // Inicializar el motor
    nexium.init();

    // Inicializar módulos
    nexium.modules.canvas.init(
        "nexiumCanvas"
    );

    nexium.modules.mouse.bindEvents();

    // OBJETO DE PRUEBA
    nexium.createRectangle(
        100,
        100,
        200,
        100
    );

    // Iniciar render
    nexium.modules.render.start();

});
