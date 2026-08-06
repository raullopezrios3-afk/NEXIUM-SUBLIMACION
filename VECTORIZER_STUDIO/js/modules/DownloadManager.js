/*
=========================================================

 NEXIUM VECTOR STUDIO

 DownloadManager

 Gestión de exportaciones

=========================================================
*/


export default class DownloadManager{


    constructor(app){


        this.app = app;


        this.projectName = "nexium-design";


        console.log(
            "DownloadManager creado."
        );


    }




    exportSVG(svg){


        if(!svg){

            console.warn(
                "No existe SVG para exportar"
            );

            return;

        }


        const blob = new Blob(

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

            this.projectName + ".svg"

        );


    }




    download(blob,filename){


        const url =

            URL.createObjectURL(blob);



        const link =

            document.createElement("a");



        link.href = url;


        link.download = filename;



        document.body.appendChild(link);


        link.click();


        document.body.removeChild(link);



        URL.revokeObjectURL(url);



    }




    exportPNG(){


        console.log(
            "Exportación PNG preparada."
        );


    }




    record360(){


        console.log(
            "Exportación WEBM preparada."
        );


    }




    status(){


        return {


            ready:true,


            module:
            "DownloadManager"


        };


    }



}
