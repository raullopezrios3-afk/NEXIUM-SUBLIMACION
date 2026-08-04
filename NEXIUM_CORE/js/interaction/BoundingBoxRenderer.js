/*
=========================================
 NEXIUM CORE
 Bounding Box Renderer
=========================================
*/

class BoundingBoxRenderer{

    constructor(core){

        this.core = core;

        console.log(
            "Bounding Box Renderer creado"
        );

    }



    render(){

        const obj =
        this.core.selectedObject;

        if(!obj)
        return;



        const ctx =
        this.core.context;



        ctx.save();



        ctx.strokeStyle =
        "#2196F3";



        ctx.lineWidth =
        2;



        ctx.setLineDash([6,4]);



        ctx.strokeRect(

            obj.x-2,

            obj.y-2,

            obj.ancho+4,

            obj.alto+4

        );


     // HANDLE INFERIOR DERECHO

ctx.fillStyle =
"#2196F3";


ctx.fillRect(

    obj.x + obj.ancho - 5,

    obj.y + obj.alto - 5,

    10,

    10

);



        ctx.restore();

    }

}
