/*
=========================================================
 VECTORIZER STUDIO
 FileManager
---------------------------------------------------------
 Gestión de archivos e imágenes
=========================================================
*/


export default class FileManager{


    constructor(app){


        this.app = app;



        /*
        =====================================
        CONFIGURACIÓN
        =====================================
        */


        this.allowedTypes = [


            "image/png",


            "image/jpeg",


            "image/webp",


            "image/svg+xml"


        ];



        this.maxSize =

            20 * 1024 * 1024;



        console.log(

            "FileManager creado."

        );


    }



    /*
    =====================================================
    CARGAR ARCHIVO
    =====================================================
    */


    async load(file){



        this.validate(file);



        this.app.ui.log(

            "Validando archivo..."

        );



        const image =

            await this.readImage(file);



        this.app.state.setImage(

            image,

            file

        );



        this.app.state.setStatus(

            "Imagen lista"

        );



        return image;


    }



    /*
    =====================================================
    VALIDACIÓN
    =====================================================
    */


    validate(file){



        if(!file){


            throw new Error(

                "No se recibió ningún archivo."

            );


        }



        if(

            !this.allowedTypes.includes(

                file.type

            )

        ){


            throw new Error(

                "Formato de imagen no compatible."

            );


        }



        if(

            file.size > this.maxSize

        ){


            throw new Error(

                "La imagen supera el límite permitido."

            );


        }



        return true;


    }


    /*
    =====================================================
    LEER IMAGEN
    =====================================================
    */

    readImage(file){


        return new Promise(

            (resolve,reject)=>{


                const reader =

                    new FileReader();



                reader.onload = (event)=>{


                    const img =

                        new Image();



                    img.onload = ()=>{


                        resolve(

                            img

                        );


                    };



                    img.onerror = ()=>{


                        reject(

                            new Error(

                                "No fue posible procesar la imagen."

                            )

                        );


                    };



                    img.src =

                        event.target.result;


                };



                reader.onerror = ()=>{


                    reject(

                        new Error(

                            "Error leyendo archivo."

                        )

                    );


                };



                reader.readAsDataURL(

                    file

                );


            }

        );


    }



    /*
    =====================================================
    OBTENER INFORMACIÓN
    =====================================================
    */


    getFileInfo(){


        const state =

            this.app.state;



        if(!state.file){


            return null;


        }



        return {


            name:

                state.file.name,


            type:

                state.file.type,


            size:

                this.formatSize(

                    state.file.size

                ),


            width:

                state.imageData.width,


            height:

                state.imageData.height


        };


    }



    /*
    =====================================================
    FORMATEAR TAMAÑO
    =====================================================
    */


    formatSize(bytes){


        if(bytes === 0){


            return "0 Bytes";


        }



        const units = [


            "Bytes",


            "KB",


            "MB",


            "GB"


        ];



        const index =

            Math.floor(

                Math.log(bytes)

                /

                Math.log(1024)

            );



        return (

            bytes /

            Math.pow(

                1024,

                index

            )

        )

        .toFixed(2)

        +

        " "

        +

        units[index];


    }


    /*
    =====================================================
    VERIFICAR IMAGEN ACTIVA
    =====================================================
    */


    hasImage(){


        return (

            this.app.state.image !== null

        );


    }



    /*
    =====================================================
    OBTENER IMAGEN ACTUAL
    =====================================================
    */


    getImage(){


        return this.app.state.image;


    }



    /*
    =====================================================
    REEMPLAZAR IMAGEN
    =====================================================
    */


    async replace(file){


        this.app.ui.log(

            "Reemplazando imagen..."

        );



        return await this.load(

            file

        );


    }



    /*
    =====================================================
    LIBERAR MEMORIA
    =====================================================
    */


    clear(){


        this.app.state.file = null;


        this.app.state.fileName = "";


        this.app.state.image = null;



        this.app.ui.log(

            "Archivo eliminado."

        );


    }



    /*
    =====================================================
    RESET COMPLETO
    =====================================================
    */


    reset(){


        this.clear();


    }



    /*
    =====================================================
    DEBUG
    =====================================================
    */


    info(){


        return {


            allowedTypes:

                this.allowedTypes,


            maxSize:

                this.formatSize(

                    this.maxSize

                ),


            loaded:

                this.hasImage()


        };


    }



}