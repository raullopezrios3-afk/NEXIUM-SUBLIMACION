/*
=========================================================
 VECTORIZER STUDIO
---------------------------------------------------------
 Archivo Principal
---------------------------------------------------------
 Inicializa toda la aplicación.
=========================================================
*/

/*
=========================================================
IMPORTACIONES
=========================================================
*/

import AppState
from "./core/AppState.js";

import UIManager
from "./core/UIManager.js";

import FileManager
from "./core/FileManager.js";

import Vectorizer
from "./modules/Vectorizer.js";

import MugRenderer
from "./modules/MugRenderer.js";

import TextureGenerator
from "./modules/TextureGenerator.js";

import DownloadManager
from "./modules/DownloadManager.js";

import Recorder
from "./modules/Recorder.js";

import Helpers
from "./utils/Helpers.js";

/*
=========================================================
VECTORIZER STUDIO
=========================================================
*/

class VectorizerStudio{

    constructor(){

        console.log(

            "======================================="

        );

        console.log(

            " VECTORIZER STUDIO"

        );

        console.log(

            " Version 2.0.0"

        );

        console.log(

            "======================================="

        );

        /*
        =========================================
        Información
        =========================================
        */

        this.version = "2.0.0";

        this.name = "Vectorizer Studio";

        /*
        =========================================
        Estado Global
        =========================================
        */

        this.state =

            new AppState(this);

        /*
        =========================================
        Utilidades
        =========================================
        */

        this.helpers =

            new Helpers(this);

        /*
        =========================================
        Interfaz
        =========================================
        */

        this.ui =

            new UIManager(this);

        /*
        =========================================
        Archivos
        =========================================
        */

        this.fileManager =

            new FileManager(this);

        /*
        =========================================
        Vectorizador
        =========================================
        */

        this.vectorizer =

            new Vectorizer(this);

        /*
        =========================================
        Texturas
        =========================================
        */

        this.textureGenerator =

            new TextureGenerator(this);

        /*
        =========================================
        Renderizador
        =========================================
        */

        this.renderer =

            new MugRenderer(this);

        /*
        =========================================
        Descargas
        =========================================
        */

        this.download =

            new DownloadManager(this);

        /*
        =========================================
        Grabador
        =========================================
        */

        this.recorder =

            new Recorder(this);

        /*
        =========================================
        Inicialización
        =========================================
        */

        this.initialize();

    }

    /*
    =====================================================
    Inicializar
    =====================================================
    */

    initialize(){

        console.log(

            "Inicializando módulos..."

        );

        this.registerEvents();

        this.ui.initialize();

        this.state.setStatus(

            "Sistema listo."

        );

        console.log(

            "Aplicación iniciada."

        );

    }


    /*
    =====================================================
    REGISTRO DE EVENTOS
    =====================================================
    */

    registerEvents(){


        /*
        =====================================
        INPUT IMAGEN
        =====================================
        */

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


                        this.ui.showLoading(

                            "Cargando imagen..."

                        );


                        await this.fileManager.load(

                            file

                        );


                        this.ui.updateImageInfo();


                        this.ui.enableProcess();


                        this.ui.log(

                            "Imagen cargada correctamente."

                        );


                    }

                    catch(error){


                        console.error(error);


                        this.ui.log(

                            error

                        );


                        this.ui.showMessage(

                            "Error",

                            error

                        );


                    }

                    finally{


                        this.ui.hideLoading();


                    }


                }

            );


        }



        /*
        =====================================
        SLIDER COLORES
        =====================================
        */


        const colorRange =

            document.getElementById(

                "colorRange"

            );


        if(colorRange){


            colorRange.addEventListener(

                "input",

                (event)=>{


                    const value =

                        event.target.value;



                    this.state.colorCount =

                        Number(value);



                    this.ui.updateColors(

                        value

                    );


                }

            );


        }



        /*
        =====================================
        SELECT PRODUCTO
        =====================================
        */


        const productSelect =

            document.getElementById(

                "productSelect"

            );



        if(productSelect){


            productSelect.addEventListener(

                "change",

                (event)=>{


                    this.state.product =

                        event.target.value;



                    this.ui.updateProduct(

                        event.target.value

                    );


                    this.ui.log(

                        "Producto cambiado: "

                        +

                        event.target.value

                    );


                }

            );


        }



        /*
        =====================================
        BOTÓN VECTOR
        =====================================
        */


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



        /*
        =====================================
        DESCARGAR SVG
        =====================================
        */


        const downloadSVG =

            document.getElementById(

                "downloadSVG"

            );



        if(downloadSVG){


            downloadSVG.addEventListener(

                "click",

                ()=>{


                    this.download.svg();


                }

            );


        }



        /*
        =====================================
        DESCARGAR PNG
        =====================================
        */


        const downloadPNG =

            document.getElementById(

                "downloadPNG"

            );



        if(downloadPNG){


            downloadPNG.addEventListener(

                "click",

                ()=>{


                    this.download.png();


                }

            );


        }



        /*
        =====================================
        DESCARGAR VIDEO
        =====================================
        */


        const downloadWEBM =

            document.getElementById(

                "downloadWEBM"

            );



        if(downloadWEBM){


            downloadWEBM.addEventListener(

                "click",

                ()=>{


                    this.recorder.record();


                }

            );


        }



        /*
        =====================================
        LIMPIAR SVG
        =====================================
        */


        const clearSVG =

            document.getElementById(

                "clearSVG"

            );



        if(clearSVG){


            clearSVG.addEventListener(

                "click",

                ()=>{


                    this.clear();


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

    if(!this.state.image){

        this.ui.log(

            "No existe imagen para procesar."

        );

        return;

    }


    try{


        this.ui.showLoading(

            "Vectorizando imagen..."

        );


        this.ui.log(

            "Iniciando vectorización..."

        );


        /*
        =====================================
        GENERAR SVG
        =====================================
        */


        const svg =

            this.vectorizer.process(

                this.state.image,

                this.state.colorCount

            );



        this.state.svg = svg;



        this.ui.renderSVG(

            svg

        );


        this.ui.log(

            "SVG generado correctamente."

        );



        /*
        =====================================
        GENERAR TEXTURA
        =====================================
        */


        const texture =

            this.textureGenerator.create(

                this.state.image

            );



        this.state.texture = texture;



        this.ui.log(

            "Textura creada."

        );



        /*
        =====================================
        CREAR MOCKUP
        =====================================
        */


        this.renderer.render(

            texture,

            this.state.product

        );



        this.ui.log(

            "Modelo 3D generado."

        );



        this.ui.enableDownloads();



        this.state.status =

            "Proyecto listo";



    }


    catch(error){


        console.error(error);


        this.ui.log(

            "ERROR: "

            +

            error.message

        );


    }


    finally{


        this.ui.hideLoading();


    }


}



/*
=========================================================
LIMPIAR PROYECTO
=========================================================
*/


clear(){


    this.state.reset();


    this.ui.clear();


    this.renderer.clear();


    this.ui.log(

        "Proyecto limpiado."

    );


}



/*
=========================================================
OBTENER INFORMACIÓN
=========================================================
*/


info(){


    return {

        version:this.version,

        state:this.state,

        modules:{

            ui:this.ui,

            vectorizer:this.vectorizer,

            renderer:this.renderer,

            downloader:this.download,

            recorder:this.recorder

        }

    };


}


}



/*
=========================================================
INICIO DE APLICACIÓN
=========================================================
*/


window.addEventListener(

    "DOMContentLoaded",

    ()=>{


        const studio =

            new VectorizerStudio();



        /*
        Exponer para pruebas
        */

        window.VectorizerStudio = studio;



        console.log(

            "VectorizerStudio disponible en window."

        );


    }

);
 
