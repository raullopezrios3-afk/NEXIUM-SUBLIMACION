 /*
=========================================================

 VECTORIZER STUDIO

 DownloadManager

---------------------------------------------------------
 Gestión profesional de exportaciones

 SVG
 PNG
 WEBM

=========================================================
*/


export default class DownloadManager{


    constructor(app){


        this.app = app;



        this.projectName =

            "nexium-design";



        console.log(

            "DownloadManager creado."

        );


    }




    /*
    =====================================================
    DESCARGAR ARCHIVO
    =====================================================
    */


    download(

        blob,

        filename

    ){



        const url =

            URL.createObjectURL(

                blob

            );



        const link =

            document.createElement(

                "a"

            );



        link.href = url;



        link.download = filename;



        document.body.appendChild(

            link

        );



        link.click();



        document.body.removeChild(

            link

        );



        setTimeout(()=>{


            URL.revokeObjectURL(

                url

            );


        },2000);



    }




    /*
    =====================================================
    DESCARGAR SVG
    =====================================================
    */


    exportSVG(svg){



        if(

            !svg

        ){

            console.warn(

                "SVG vacío"

            );


            return;

        }



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



        this.download(

            blob,

            this.projectName

            +

            "-vector.svg"


        );



    }





    /*
    =====================================================
    DESCARGAR PNG MOCKUP
    =====================================================
    */


    async exportPNG(renderer){



        if(

            !renderer

        ){

            console.warn(

                "Renderer no disponible"

            );


            return;

        }



        const blob =

            await renderer.capturePNG();



        if(

            blob

        ){


            this.download(

                blob,

                this.projectName

                +

                "-mockup.png"

            );


        }


    }





    /*
    =====================================================
    CREAR NOMBRE DE PROYECTO
    =====================================================
    */


    setProjectName(name){



        if(

            !name

        ){

            return;

        }



        this.projectName =

            name

            .trim()

            .replace(

                /\s+/g,

                "-"

            )

            .toLowerCase();



    }





    /*
    =====================================================
    INFORMACIÓN DE EXPORTACIÓN
    =====================================================
    */


    getInfo(){



        return {


            project:

                this.projectName,


            formats:[


                "SVG",

                "PNG",

                "WEBM"


            ]



        };


    }





    /*
    =====================================================
    EXPORTAR DATA URL
    =====================================================
    */


    downloadDataURL(

        dataURL,

        filename

    ){



        const link =

            document.createElement(

                "a"

            );



        link.href =

            dataURL;



        link.download =

            filename;



        document.body.appendChild(

            link

        );



        link.click();



        document.body.removeChild(

            link

        );



    }

 
    /*
    =====================================================
    EXPORTAR VIDEO 360°
    =====================================================
    */


    record360(

        renderer,

        duration = 12000

    ){



        if(

            !renderer ||

            !renderer.renderer

        ){

            console.warn(

                "Renderer no disponible"

            );


            return;

        }




        const canvas =

            renderer.renderer

            .domElement;




        if(

            !canvas.captureStream

        ){


            console.warn(

                "Captura no soportada"

            );


            return;

        }




        const stream =

            canvas.captureStream(

                30

            );



        let mimeType =

            "video/webm;codecs=vp9";



        if(

            !MediaRecorder

            .isTypeSupported(

                mimeType

            )

        ){


            mimeType =

                "video/webm";


        }




        const recorder =

            new MediaRecorder(

                stream,

                {

                mimeType

                }

            );



        const chunks=[];




        recorder.ondataavailable =

            event=>{


                if(

                    event.data.size

                ){


                    chunks.push(

                        event.data

                    );


                }


            };





        recorder.onstop = ()=>{


            const blob =

                new Blob(

                    chunks,

                    {

                    type:

                    "video/webm"

                    }

                );



            this.download(

                blob,

                this.projectName

                +

                "-360.webm"

            );


        };





        recorder.start();




        setTimeout(()=>{


            recorder.stop();



        },duration);



    }





    /*
    =====================================================
    ESTADO
    =====================================================
    */


    status(){


        return {


            ready:true,


            manager:

            "DownloadManager"



        };


    }




}
