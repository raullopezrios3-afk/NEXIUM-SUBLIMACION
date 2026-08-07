/*
=========================================
 NEXIUM
 Mockup Engine
 Versión 1.0
=========================================
*/

class MockupEngine{


    constructor(){

        console.log(
            "Mockup Engine creado"
        );


        this.canvas = null;

        this.ctx = null;


        this.imagen = null;

        this.producto = null;


    }



    /*
    =========================================
     CREAR CANVAS DEL MOCKUP
    =========================================
    */


    init(){


        this.canvas =
        document.createElement(
            "canvas"
        );


        this.canvas.width = 600;

        this.canvas.height = 600;



        this.canvas.style.position =
        "absolute";


        this.canvas.style.left =
        "50%";


        this.canvas.style.top =
        "50%";


        this.canvas.style.transform =
        "translate(-50%, -50%)";


        this.canvas.style.zIndex =
        "999";


        document.body.appendChild(
            this.canvas
        );



        this.ctx =
        this.canvas.getContext(
            "2d"
        );



        console.log(
            "Mockup Canvas creado"
        );


        this.render();


    }




    /*
    =========================================
     RENDER PRINCIPAL
    =========================================
    */


    render(){


        if(!this.ctx)
        return;



        this.ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );



        this.ctx.fillStyle =
        "#ffffff";


        this.ctx.fillRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );


        console.log(
            "Mockup render ejecutado"
        );


    }


}


    init(canvasId){

        this.canvas =
        document.getElementById(canvasId);

        if(!this.canvas){

            console.warn(
                "Canvas no encontrado:",
                canvasId
            );

            return;

        }

        this.ctx =
        this.canvas.getContext("2d");

        console.log(
            "Canvas Mockup inicializado"
        );

    }


    loadImage(src){

        this.imagen =
        new Image();

        this.imagen.onload=()=>{

            console.log(
                "Imagen cargada"
            );

            this.render();

        };

        this.imagen.src = src;

    }


    render(){

        if(
            !this.ctx ||
            !this.imagen
        ) return;


        this.ctx.clearRect(

            0,
            0,
            this.canvas.width,
            this.canvas.height

        );


        this.ctx.drawImage(

            this.imagen,

            0,
            0,

            this.canvas.width,

            this.canvas.height

        );

    }

}
