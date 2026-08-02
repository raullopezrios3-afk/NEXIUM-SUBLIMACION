/*
=========================================
 NEXIUM CORE
 Render Engine
=========================================
*/


class RenderEngine{


    constructor(core){

        this.core = core;

        console.log(
            "Render Engine creado"
        );

    }



    clear(){

        if(!this.core.context)
        return;


        this.core.context.clearRect(
            0,
            0,
            this.core.canvas.width,
            this.core.canvas.height
        );

    }



    render(){


        this.clear();



        let objetos =
        this.core.objects;



        objetos.forEach(
        obj=>{


            this.core.context.fillStyle =
            "#D4AF37";


            this.core.context.fillRect(
                obj.x,
                obj.y,
                obj.ancho,
                obj.alto
            );



        });



        console.log(
            "Render ejecutado",
            objetos.length,
            "objetos"
        );


    }


}
