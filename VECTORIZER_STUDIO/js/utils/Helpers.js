/*
=========================================================

 NEXIUM VECTOR STUDIO

 Helpers

 Utilidades generales

=========================================================
*/


export default class Helpers{


    constructor(app){


        this.app = app;


        console.log(

            "Helpers creado."

        );


    }



    clamp(value,min,max){


        return Math.min(

            Math.max(

                value,

                min

            ),

            max

        );


    }




    formatSize(bytes){


        if(bytes === 0){

            return "0 KB";

        }


        return (

            bytes / 1024

        )

        .toFixed(2)

        +

        " KB";


    }




    timestamp(){


        return Date.now();


    }



}
