/*
=========================================
 NEXIUM CORE
 Canvas Manager
=========================================
*/


class CanvasManager{


    constructor(core){

        this.core = core;

        this.canvas = null;

        this.context = null;


        console.log(
            "Canvas Manager creado"
        );

    }



    init(id){


        this.canvas =
        document.getElementById(id);



        if(!this.canvas){

            console.error(
                "Canvas no encontrado:",
                id
            );

            return;

        }



        this.canvas.width = 900;

        this.canvas.height = 600;



        this.context =
        this.canvas.getContext("2d");



        this.core.canvas =
        this.canvas;


        this.core.context =
        this.context;



        console.log(
            "Canvas inicializado"
        );


    }



    resize(ancho, alto){


        if(!this.canvas)
        return;



        this.canvas.width =
        ancho;


        this.canvas.height =
        alto;



        console.log(
            "Canvas redimensionado",
            ancho,
            alto
        );


    }


}
