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


        console.log(
            "Transform Manager creado"
        );

    }



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


}
