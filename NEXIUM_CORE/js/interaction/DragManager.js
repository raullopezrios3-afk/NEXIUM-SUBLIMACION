/*
=========================================
 NEXIUM CORE
 Drag Manager
 Versión 1.0
=========================================
*/

class DragManager{

    constructor(core){

        this.core = core;

        this.dragging = false;

        this.offsetX = 0;
        this.offsetY = 0;

        console.log(
            "Drag Manager creado"
        );

    }



    start(x, y){

        const obj =
        this.core.selectedObject;

        if(!obj){
            return;
        }

        this.dragging = true;

        this.offsetX =
        x - obj.x;

        this.offsetY =
        y - obj.y;

        console.log(
            "Drag iniciado"
        );

    }



    move(x, y){

        if(!this.dragging){
            return;
        }

        const obj =
        this.core.selectedObject;

        if(!obj){
            return;
        }

        obj.x =
        x - this.offsetX;

        obj.y =
        y - this.offsetY;

    }



    stop(){

        if(!this.dragging){
            return;
        }

        this.dragging = false;

        console.log(
            "Drag finalizado"
        );

    }



    isDragging(){

        return this.dragging;

    }

}
