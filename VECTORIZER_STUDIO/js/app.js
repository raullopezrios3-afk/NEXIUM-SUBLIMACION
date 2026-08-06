/*
=========================================================

 NEXIUM VECTOR STUDIO

 Archivo Principal

 Controlador central

 Versión 2.1.1

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
    "app.js cargado correctamente"
);





/*
=========================================================
 CLASE PRINCIPAL
=========================================================
*/


class VectorizerStudio{


    constructor(){


        console.log(
            "Creando Vectorizer Studio..."
        );



        this.name =
            "Vectorizer Studio";



        this.version =
            "2.1.1";



        /*
        ==========================
        CORE
        ==========================
        */


        this.state =
            new AppState(this);



        this.helpers =
            new Helpers(this);



        this.ui =
            new UIManager(this);



        this.fileManager =
            new FileManager(this);




        /*
        ==========================
        MODULES
        ==========================
        */


        this.vectorizer =
            new Vectorizer(this);



        this.textureGenerator =
            new TextureGenerator(this);



        this.renderer =
            new MugRenderer(this);



        this.download =
            new DownloadManager(this);




        console.log(
            "Todos los módulos creados."
        );



        this.start();


    }





    start(){


        console.log(
            "Inicializando sistema..."
        );



        if(this.ui.initialize){

            this.ui.initialize();

        }



        if(this.state.setStatus){

            this.state.setStatus(
                "Sistema listo."
            );

        }



        if(this.ui.log){

            this.ui.log(
                "NEXIUM Vector Studio iniciado."
            );

        }



        console.log(
            "Vectorizer Studio funcionando."
        );


    }




    info(){


        return {


            name:
            this.name,


            version:
            this.version,


            modules:{


                state:
                this.state,


                ui:
                this.ui,


                vectorizer:
                this.vectorizer,


                renderer:
                this.renderer,


                download:
                this.download


            }


        };


    }



}





/*
=========================================================
 ARRANQUE
=========================================================
*/


window.addEventListener(

"DOMContentLoaded",

()=>{


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
        "Disponible en window.VectorizerStudio"
    );


    console.log(
        studio
    );


    console.log(
        "================================"
    );


}

);
