/*
=========================================================
 VECTORIZER STUDIO

 TextureGenerator

---------------------------------------------------------
 Generador de texturas para productos 3D

=========================================================
*/


export default class TextureGenerator{


    constructor(app){


        this.app = app;



        /*
        =====================================
        CONFIGURACIÓN DE TEXTURA
        =====================================
        */


        this.width = 1024;


        this.height = 512;



        this.background =

            "#FFFFFF";



        console.log(

            "TextureGenerator creado."

        );


    }



    /*
    =====================================================
    CREAR TEXTURA DESDE IMAGEN
    =====================================================
    */


    create(image){



        this.app.ui.log(

            "Preparando textura..."

        );



        const canvas =

            this.createCanvas();



        const ctx =

            canvas.getContext(

                "2d"

            );



        this.drawBackground(

            ctx,

            canvas

        );



        this.fitImage(

            ctx,

            image,

            canvas

        );



        const texture =

            this.createTexture(

                canvas

            );



        return texture;


    }



    /*
    =====================================================
    CREAR CANVAS BASE
    =====================================================
    */


    createCanvas(){



        const canvas =

            document.createElement(

                "canvas"

            );



        canvas.width =

            this.width;



        canvas.height =

            this.height;



        return canvas;


    }



    /*
    =====================================================
    FONDO DE TEXTURA
    =====================================================
    */


    drawBackground(

        ctx,

        canvas

    ){


        ctx.fillStyle =

            this.background;



        ctx.fillRect(

            0,

            0,

            canvas.width,

            canvas.height

        );


    }



    /*
    =====================================================
    AJUSTAR IMAGEN A TEXTURA
    =====================================================
    */


    fitImage(

        ctx,

        image,

        canvas

    ){



        const margin = 80;



        const areaWidth =

            canvas.width

            -

            (

            margin * 2

            );



        const areaHeight =

            canvas.height

            -

            (

            margin * 2

            );



        const ratio =

            Math.min(

                areaWidth /

                image.width,



                areaHeight /

                image.height

            );



        const drawWidth =

            image.width *

            ratio;



        const drawHeight =

            image.height *

            ratio;



        const x =

            (

            canvas.width

            -

            drawWidth

            )

            /

            2;



        const y =

            (

            canvas.height

            -

            drawHeight

            )

            /

            2;



        ctx.drawImage(

            image,

            x,

            y,

            drawWidth,

            drawHeight

        );


    }



    /*
    =====================================================
    CREAR TEXTURA THREE.JS
    =====================================================
    */


    createTexture(canvas){



        const texture =

            new THREE.CanvasTexture(

                canvas

            );



        texture.needsUpdate =

            true;



        /*
        Configuración UV
        */


        texture.wrapS =

            THREE.ClampToEdgeWrapping;



        texture.wrapT =

            THREE.ClampToEdgeWrapping;



        texture.minFilter =

            THREE.LinearFilter;



        return texture;


    }



    /*
    =====================================================
    CREAR DESDE SVG
    =====================================================
    */


    createFromSVG(svg){



        return new Promise(

            resolve=>{



                const blob =

                    new Blob(

                        [

                            svg

                        ],

                        {

                        type:

                        "image/svg+xml"

                        }

                    );



                const url =

                    URL.createObjectURL(

                        blob

                    );



                const img =

                    new Image();



                img.onload = ()=>{



                    const texture =

                        this.create(

                            img

                        );



                    URL.revokeObjectURL(

                        url

                    );



                    resolve(

                        texture

                    );



                };



                img.src = url;



            }

        );


    }



    /*
    =====================================================
    CREAR TEXTURA DESDE CANVAS EXISTENTE
    =====================================================
    */


    fromCanvas(canvas){


        const texture =

            new THREE.CanvasTexture(

                canvas

            );



        texture.needsUpdate = true;



        return texture;


    }



    /*
    =====================================================
    EXPORTAR TEXTURA PNG
    =====================================================
    */


    exportPNG(canvas){


        return new Promise(

            resolve=>{


                canvas.toBlob(

                    blob=>{


                        resolve(

                            blob

                        );


                    },

                    "image/png"

                );


            }

        );


    }



    /*
    =====================================================
    OBTENER INFORMACIÓN
    =====================================================
    */


    getInfo(){


        return {


            width:

                this.width,


            height:

                this.height,


            ratio:

                (

                this.width /

                this.height

                ),


            format:

                "CanvasTexture"



        };


    }



    /*
    =====================================================
    LIMPIAR
    =====================================================
    */


    clear(){


        this.app.ui.log(

            "Textura liberada."

        );


    }



    /*
    =====================================================
    RESET
    =====================================================
    */


    reset(){


        this.clear();


    }



}
