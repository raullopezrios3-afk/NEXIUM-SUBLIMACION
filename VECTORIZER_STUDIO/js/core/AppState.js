/*
=========================================================
 VECTORIZER STUDIO
 AppState
---------------------------------------------------------
 Estado global de la aplicación
=========================================================
*/


export default class AppState{


    constructor(app){


        this.app = app;



        /*
        =====================================
        INFORMACIÓN DEL PROYECTO
        =====================================
        */


        this.version = "2.0.0";


        this.projectName =

            "Nuevo proyecto";



        /*
        =====================================
        ARCHIVOS
        =====================================
        */


        this.file = null;


        this.fileName = "";


        this.image = null;



        /*
        =====================================
        PROCESAMIENTO
        =====================================
        */


        this.colorCount = 6;


        this.svg = null;


        this.texture = null;



        /*
        =====================================
        PRODUCTO ACTIVO
        =====================================
        */


        this.product = "mug";



        /*
        =====================================
        ESTADOS
        =====================================
        */


        this.status =

            "Inicializando";


        this.processing = false;



        /*
        =====================================
        DATOS DE IMAGEN
        =====================================
        */


        this.imageData = {


            width:0,


            height:0,


            size:0


        };



        console.log(

            "AppState creado."

        );


    }



    /*
    =====================================================
    ASIGNAR IMAGEN
    =====================================================
    */


    setImage(image,file){


        this.image = image;


        this.file = file;


        this.fileName = file.name;



        this.imageData = {


            width:image.width,


            height:image.height,


            size:file.size


        };



        this.status =

            "Imagen cargada";



    }


    /*
    =====================================================
    ACTUALIZAR ESTADO
    =====================================================
    */

    setStatus(message){


        this.status = message;


        if(this.app.ui){


            this.app.ui.updateStatus(

                message

            );


        }


    }



    /*
    =====================================================
    CAMBIAR PRODUCTO
    =====================================================
    */

    setProduct(product){


        this.product = product;


        this.setStatus(

            "Producto seleccionado: " + product

        );


    }



    /*
    =====================================================
    CAMBIAR CANTIDAD DE COLORES
    =====================================================
    */

    setColors(amount){


        this.colorCount = Number(amount);


        this.setStatus(

            "Colores configurados: " 
            + 
            this.colorCount

        );


    }



    /*
    =====================================================
    ESTADO DE PROCESAMIENTO
    =====================================================
    */

    setProcessing(value){


        this.processing = value;


    }



    /*
    =====================================================
    OBTENER INFORMACIÓN
    =====================================================
    */

    getInfo(){


        return {


            version:this.version,


            project:this.projectName,


            file:this.fileName,


            image:this.imageData,


            colors:this.colorCount,


            product:this.product,


            status:this.status,


            processing:this.processing


        };


    }



    /*
    =====================================================
    EXPORTAR ESTADO
    =====================================================
    */

    serialize(){


        return JSON.stringify(

            {


                project:this.projectName,


                file:this.fileName,


                colors:this.colorCount,


                product:this.product,


                status:this.status


            },

            null,

            4

        );


    }



    /*
    =====================================================
    REINICIAR PROYECTO
    =====================================================
    */

    reset(){


        this.file = null;


        this.fileName = "";


        this.image = null;


        this.svg = null;


        this.texture = null;


        this.processing = false;


        this.status =

            "Proyecto limpio";



        this.imageData = {


            width:0,


            height:0,


            size:0


        };



    }



}
