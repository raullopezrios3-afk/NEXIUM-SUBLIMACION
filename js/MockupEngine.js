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
