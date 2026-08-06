/*
=========================================================

 NEXIUM VECTOR STUDIO

 Archivo Principal

 Controlador central de aplicación

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





/*
=========================================================
 VALIDACIÓN DE MÓDULOS
=========================================================
*/


function validateModules(studio){



    const required = [


        "state",

        "ui",

        "fileManager",

        "vectorizer",

        "textureGenerator",

        "renderer",

        "download"


    ];



    const missing =

        required.filter(

            module =>

            !studio[module]

        );



    if(

        missing.length > 0

    ){



        console.warn(

            "Módulos faltantes:",

            missing

        );



        return false;


    }



    return true;


}







/*
=========================================================
 CLASE PRINCIPAL
=========================================================
*/


class VectorizerStudio{



    constructor(){



        console.log(

            "================================"

        );


        console.log(

            " NEXIUM VECTOR STUDIO"

        );


        console.log(

            " Version 2.1.1"

        );


        console.log(

            "================================"

        );




        /*
        =====================================
        INFORMACIÓN
        =====================================
        */


        this.name =

            "Vectorizer Studio";



        this.version =

            "2.1.1";





        /*
        =====================================
        ESTADO GLOBAL
        =====================================
        */


        this.state =

            new AppState(

                this

            );





        /*
        =====================================
        UTILIDADES
        =====================================
        */


        this.helpers =

            new Helpers(

                this

            );





        /*
        =====================================
        INTERFAZ
        =====================================
        */


        this.ui =

            new UIManager(

                this

            );





        /*
        =====================================
        ARCHIVOS
        =====================================
        */


        this.fileManager =

            new FileManager(

                this

            );





        /*
        =====================================
        VECTOR
        =====================================
        */


        this.vectorizer =

            new Vectorizer(

                this

            );





        /*
        =====================================
        TEXTURAS
        =====================================
        */


        this.textureGenerator =

            new TextureGenerator(

                this

            );





        /*
        =====================================
        MOTOR 3D
        =====================================
        */


        this.renderer =

            new MugRenderer(

                this

            );





        /*
        =====================================
        EXPORTACIÓN
        =====================================
        */


        this.download =

            new DownloadManager(

                this

            );





        this.initialize();


    }



/*
=========================================================
 INICIALIZACIÓN GENERAL
=========================================================
*/


initialize(){



    console.log(

        "Inicializando módulos..."

    );





    /*
    =====================================
    INICIALIZAR INTERFAZ
    =====================================
    */


    if(

        this.ui.initialize

    ){


        this.ui.initialize();


    }






    /*
    =====================================
    INICIALIZAR MOTOR 3D
    =====================================
    */


    const viewer =

        document.getElementById(

            "mugCanvasHolder"

        );





    if(

        viewer

    ){



        this.renderer.initialize(

            viewer

        );



        console.log(

            "MugRenderer iniciado correctamente."

        );


    }

    else{


        console.warn(

            "No se encontró mugCanvasHolder."

        );


    }





    /*
    =====================================
    EVENTOS
    =====================================
    */


    this.registerEvents();





    /*
    =====================================
    ESTADO INICIAL
    =====================================
    */


    this.state.setStatus(

        "Sistema listo."

    );



    this.ui.log(

        "NEXIUM Vector Studio preparado."

    );



    console.log(

        "Aplicación iniciada."

    );



}








/*
=========================================================
 REGISTRO DE EVENTOS
=========================================================
*/


registerEvents(){





    /*
    =====================================
    CARGA DE IMAGEN
    =====================================
    */


    const fileInput =

        document.getElementById(

            "fileInput"

        );





    if(

        fileInput

    ){



        fileInput.addEventListener(

            "change",

            async(event)=>{



                const file =

                    event.target.files[0];



                if(

                    !file

                ){

                    return;

                }





                try{



                    this.ui.showLoading(

                        "Cargando imagen..."

                    );





                    const image =

                        await this.fileManager.load(

                            file

                        );





                    this.state.image =

                        image;





                    this.ui.updateImageInfo();





                    this.ui.enableProcess();





                    this.ui.log(

                        "Imagen cargada correctamente."

                    );




                }

                catch(error){



                    console.error(

                        error

                    );



                    this.ui.showMessage(

                        "Error",

                        error.message

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
    CONTROL DE COLORES
    =====================================
    */


    const colorRange =

        document.getElementById(

            "colorRange"

        );





    if(

        colorRange

    ){



        colorRange.addEventListener(

            "input",

            event=>{



                const value =

                    Number(

                        event.target.value

                    );





                this.state.colorCount =

                    value;





                this.ui.updateColors(

                    value

                );



            }


        );



    }







    /*
    =====================================
    CAMBIO DE PRODUCTO
    =====================================
    */


    const productSelect =

        document.getElementById(

            "productSelect"

        );





    if(

        productSelect

    ){



        productSelect.addEventListener(

            "change",

            event=>{



                this.state.product =

                    event.target.value;





                this.ui.updateProduct(

                    event.target.value

                );



            }


        );


    }

/*
=========================================================
 BOTÓN PROCESAR
=========================================================
*/


const processButton =

    document.getElementById(

        "processButton"

    );





if(

    processButton

){



    processButton.addEventListener(

        "click",

        ()=>{


            this.generate();


        }


    );


}








/*
=========================================================
 DESCARGAR SVG
=========================================================
*/


const downloadSVG =

    document.getElementById(

        "downloadSVG"

    );





if(

    downloadSVG

){



    downloadSVG.addEventListener(

        "click",

        ()=>{



            if(

                this.state.svg

            ){



                this.download.exportSVG(

                    this.state.svg

                );


            }



        }


    );


}








/*
=========================================================
 DESCARGAR PNG
=========================================================
*/


const downloadPNG =

    document.getElementById(

        "downloadPNG"

    );





if(

    downloadPNG

){



    downloadPNG.addEventListener(

        "click",

        ()=>{



            this.download.exportPNG(

                this.renderer

            );



        }


    );


}








/*
=========================================================
 DESCARGAR VIDEO 360
=========================================================
*/


const downloadWEBM =

    document.getElementById(

        "downloadWEBM"

    );





if(

    downloadWEBM

){



    downloadWEBM.addEventListener(

        "click",

        ()=>{



            this.download.record360(

                this.renderer

            );



        }


    );


}








/*
=========================================================
 LIMPIAR PROYECTO
=========================================================
*/


const clearButton =

    document.getElementById(

        "clearSVG"

    );





if(

    clearButton

){



    clearButton.addEventListener(

        "click",

        ()=>{



            this.clear();



        }


    );


}



}








/*
=========================================================

 GENERAR PROYECTO COMPLETO

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



        this.ui.showLoading(

            "Procesando diseño..."

        );





        this.ui.log(

            "Iniciando vectorización."

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





        this.state.svg =

            svg;





        this.ui.renderSVG(

            svg

        );





        this.ui.log(

            "Vector generado correctamente."

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





        this.state.texture =

            texture;





        this.ui.log(

            "Textura generada."

        );








        /*
        =====================================
        ACTUALIZAR MODELO 3D
        =====================================
        */


        this.renderer.load(

            texture

        );





        this.ui.log(

            "Mockup 360 generado."

        );








        /*
        =====================================
        ACTIVAR EXPORTACIONES
        =====================================
        */


        this.ui.enableDownloads();





        this.state.setStatus(

            "Proyecto terminado."

        );





    }


    catch(error){



        console.error(

            error

        );



        this.ui.log(

            "Error: "

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



    /*
    =====================================
    RESET ESTADO GLOBAL
    =====================================
    */


    this.state.reset();







    /*
    =====================================
    LIMPIAR INTERFAZ
    =====================================
    */


    if(

        this.ui.clear

    ){



        this.ui.clear();


    }







    /*
    =====================================
    LIMPIAR MOTOR 3D
    =====================================
    */


    if(

        this.renderer

    ){



        if(

            this.renderer.dispose

        ){



            this.renderer.dispose();



        }


    }








    this.ui.log(

        "Proyecto limpiado."

    );





    this.state.setStatus(

        "Sistema listo."

    );



}








/*
=========================================================

 INFORMACIÓN DEL SISTEMA

=========================================================
*/


info(){



    return {



        name:

            this.name,



        version:

            this.version,



        state:

            this.state,



        modules:{



            ui:

                this.ui,



            files:

                this.fileManager,



            vectorizer:

                this.vectorizer,



            texture:

                this.textureGenerator,



            renderer:

                this.renderer,



            download:

                this.download



        }



    };



}








/*
=========================================================

 ESTADO ACTUAL DEL MOTOR

=========================================================
*/


status(){



    return {



        version:

            this.version,



        ready:

            true,



        imageLoaded:

            !!this.state.image,



        svgGenerated:

            !!this.state.svg,



        textureGenerated:

            !!this.state.texture,



        renderer:



            this.renderer &&

            this.renderer.getState



                ?



            this.renderer.getState()



                :



            null




    };



}






/*
=========================================================

 CIERRE DE CLASE

=========================================================
*/


}








/*
=========================================================

 INICIO DE APLICACIÓN

 UNA SOLA INSTANCIA

=========================================================
*/


window.addEventListener(

    "DOMContentLoaded",

    ()=>{



        const studio =

            new VectorizerStudio();





        window.VectorizerStudio =

            studio;







        if(

            validateModules(

                studio

            )

        ){



            console.log(

                "================================"

            );



            console.log(

                " NEXIUM VECTOR STUDIO OK"

            );



            console.log(

                " Versión 2.1.1"

            );



            console.log(

                " Todos los módulos cargados"

            );



            console.log(

                "================================"

            );



        }

        else{



            console.warn(

                "Vectorizer Studio inició con módulos incompletos."

            );



        }







        console.log(

            "VectorizerStudio disponible en window."

        );




    }

);
