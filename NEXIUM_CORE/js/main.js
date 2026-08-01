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



    nexium.init();



    window.NEXIUM =
    nexium;



});
