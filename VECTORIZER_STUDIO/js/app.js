/*
=========================================================

 NEXIUM VECTOR STUDIO

 Archivo Principal

 Controlador central de aplicación

 Versión 2.1.2

=========================================================
*/


/*
=========================================================
 IMPORTACIONES
=========================================================
*/


import AppState from "./core/AppState.js";

import UIManager from "./core/UIManager.js";

import FileManager from "./core/FileManager.js";


import Vectorizer from "./modules/Vectorizer.js";

import TextureGenerator from "./modules/TextureGenerator.js";

import MugRenderer from "./modules/MugRenderer.js";

import DownloadManager from "./modules/DownloadManager.js";

import Helpers from "./utils/Helpers.js";



console.log(
    "NEXIUM VECTOR STUDIO app.js cargado"
);





/*
=========================================================
 CLASE PRINCIPAL
=========================================================
*/


class VectorizerStudio{


constructor(){


    console.log(
        "Constructor VectorizerStudio ejecutado"
    );



    this.name =
        "NEXIUM Vector Studio";


    this.version =
        "2.1.2";



    /*
    =====================================
    CORE
    =====================================
    */


    this.state =
        new AppState(this);



    this.helpers =
        new Helpers(this);



    /*
    =====================================
    UI
    =====================================
    */


    this.ui =
        new UIManager(this);



    /*
    =====================================
    ARCHIVOS
    =====================================
    */


    this.fileManager =
        new FileManager(this);



    /*
    =====================================
    VECTOR
    =====================================
    */


    this.vectorizer =
        new Vectorizer(this);



    /*
    =====================================
    TEXTURA
    =====================================
    */


    this.textureGenerator =
        new TextureGenerator(this);



    /*
    =====================================
    3D
    =====================================
    */


    this.renderer =
        new MugRenderer(this);



    /*
    =====================================
    EXPORTACIONES
    =====================================
    */


    this.download =
        new DownloadManager(this);



    console.log(
        "Todos los módulos creados"
    );



    this.initialize();


}





/*
=========================================================
 INICIALIZACIÓN
=========================================================
*/


initialize(){



    console.log(
        "Inicializando Vectorizer Studio..."
    );



    try{


        if(
            this.ui.initialize
        ){

            this.ui.initialize();

        }



        const viewer =
            document.getElementById(
                "viewer3D"
            );



        if(viewer){


            this.renderer.initialize(
                viewer
            );


            console.log(
                "MugRenderer iniciado"
            );


        }
        else{


            console.warn(
                "No existe viewer3D"
            );


        }



        this.registerEvents();



        if(
            this.state.setStatus
        ){

            this.state.setStatus(
                "Sistema listo"
            );

        }



        if(
            this.ui.log
        ){

            this.ui.log(
                "NEXIUM Vector Studio preparado."
            );

        }



        console.log(
            "Inicialización completada"
        );



    }


    catch(error){


        console.error(
            "Error inicializando Studio:",
            error
        );


    }



}







/*
=========================================================
 EVENTOS PRINCIPALES
=========================================================
*/


registerEvents(){



const fileInput =
document.getElementById(
    "fileInput"
);



if(fileInput){


fileInput.addEventListener(

"change",

async(event)=>{


const file =
event.target.files[0];


if(!file){

return;

}



try{


if(this.ui.showLoading){

this.ui.showLoading(
"Cargando imagen..."
);

}



await this.fileManager.load(
file
);



if(this.ui.updateImageInfo){

this.ui.updateImageInfo();

}



if(this.ui.enableProcess){

this.ui.enableProcess();

}



if(this.ui.log){

this.ui.log(
"Imagen cargada correctamente."
);

}



}


catch(error){


console.error(
error
);



}



finally{


if(this.ui.hideLoading){

this.ui.hideLoading();

}



}


}

);


}







const processButton =
document.getElementById(
"processButton"
);



if(processButton){


processButton.addEventListener(

"click",

()=>{


this.generate();


}

);


}





const downloadSVG =
document.getElementById(
"downloadSVG"
);



if(downloadSVG){


downloadSVG.addEventListener(

"click",

()=>{


if(this.state.svg){


this.download.exportSVG(
this.state.svg
);


}


}

);


}






const downloadPNG =
document.getElementById(
"downloadPNG"
);



if(downloadPNG){


downloadPNG.addEventListener(

"click",

()=>{


this.download.exportPNG(
this.renderer
);


}

);


}




const downloadWEBM =
document.getElementById(
"downloadWEBM"
);



if(downloadWEBM){


downloadWEBM.addEventListener(

"click",

()=>{


this.download.record360(
this.renderer
);


}

);


}



}








/*
=========================================================
 GENERAR PROYECTO
=========================================================
*/


generate(){



if(
!this.state.image
){

this.ui.log(
"No existe imagen cargada."
);


return;

}




try{


const svg =
this.vectorizer.process(

this.state.image,

this.state.colorCount

);



this.state.svg =
svg;



if(this.ui.renderSVG){

this.ui.renderSVG(
svg
);

}



const texture =
this.textureGenerator.create(

this.state.image

);



this.state.texture =
texture;



this.renderer.load(
texture
);



if(this.ui.enableDownloads){

this.ui.enableDownloads();

}



this.ui.log(
"Proyecto generado correctamente."
);



}


catch(error){


console.error(
error
);


}



}







/*
=========================================================
 ESTADO
=========================================================
*/


status(){


return {


name:this.name,


version:this.version,


imageLoaded:
!!this.state.image,


svgGenerated:
!!this.state.svg,


textureGenerated:
!!this.state.texture,


renderer:

this.renderer.getState

?

this.renderer.getState()

:

null


};


}



}




/*
=========================================================
 ARRANQUE GLOBAL
=========================================================
*/


window.addEventListener(

"DOMContentLoaded",

()=>{


try{


const studio =
new VectorizerStudio();



window.VectorizerStudio =
studio;



console.log(
"================================"
);


console.log(
"NEXIUM VECTOR STUDIO OK"
);


console.log(
studio
);


console.log(
"================================"
);



}

catch(error){


console.error(

"ERROR FATAL VECTORIZER STUDIO",

error

);



}


});
