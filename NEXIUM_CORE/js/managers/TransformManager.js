/*
=========================================
 NEXIUM CORE
 Transform Manager
=========================================
*/


class TransformManager{


    constructor(core){

        this.core = core;


        this.transforming = false;


        this.objeto = null;


        this.handle = null;


        this.startX = 0;

        this.startY = 0;


        this.startWidth = 0;

        this.startHeight = 0;



        console.log(
            "Transform Manager creado"
        );

    }





    /*
    =========================================
     DETECTAR HANDLE DE RESIZE
    =========================================
    */

    isHandleClicked(x,y){


        const obj =
        this.core.selectedObject;



        if(!obj)
        return false;



        const handleX =
        obj.x + obj.ancho;



        const handleY =
        obj.y + obj.alto;




        if(
            x >= handleX - 8 &&
            x <= handleX + 8 &&
            y >= handleY - 8 &&
            y <= handleY + 8
        ){

            return true;

        }



        return false;

    }







    /*
    =========================================
     INICIAR RESIZE
    =========================================
    */

    startResize(x,y){


        const obj =
        this.core.selectedObject;



        if(!obj)
        return;



        this.transforming = true;



        this.objeto = obj;



        this.startX = x;

        this.startY = y;



        this.startWidth =
        obj.ancho;



        this.startHeight =
        obj.alto;



        console.log(
            "Resize iniciado",
            obj
        );


    }








    /*
    =========================================
     EJECUTAR RESIZE
    =========================================
    */

    resize(x,y){


        if(!this.transforming)
        return;



        const deltaX =
        x - this.startX;



        const deltaY =
        y - this.startY;



        this.objeto.ancho =
        this.startWidth + deltaX;



        this.objeto.alto =
        this.startHeight + deltaY;



        console.log(
            "Resize:",
            this.objeto.ancho,
            this.objeto.alto
        );


    }








    /*
    =========================================
     FINALIZAR RESIZE
    =========================================
    */

  endResize(){


    if(!this.transforming)
    return;



    this.transforming = false;



    /*
    =========================================
     GUARDAR ESTADO EN HISTORIAL
    =========================================
    */

   if(
    this.core.modules.history
){

    this.core.modules.history.save();

}



    this.objeto = null;



console.log(
        "Resize finalizado"
    );


}


}
