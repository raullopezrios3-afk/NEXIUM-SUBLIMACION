/*
=========================================
 NEXIUM CORE
 Object Renderer
=========================================
*/


class ObjectRenderer{


    constructor(core){

        this.core = core;


        console.log(
            "Object Renderer creado"
        );

    }



    render(obj){


        switch(obj.tipo){


            case "rectangulo":

                this.renderRectangulo(obj);

            break;



            default:

                console.warn(
                    "Tipo no soportado:",
                    obj.tipo
                );

            break;


        }


    }




    renderRectangulo(obj){


        this.core.context.fillStyle =
        "#D4AF37";


        this.core.context.fillRect(
            obj.x,
            obj.y,
            obj.ancho,
            obj.alto
        );


    }


}
