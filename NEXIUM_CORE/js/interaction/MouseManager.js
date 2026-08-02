/*=========================================
 NEXIUM CORE
 Mouse Manager
=========================================*/

class MouseManager{

    constructor(core){

        this.core = core;

        this.x = 0;
        this.y = 0;

        this.isDown = false;

        console.log(
            "Mouse Manager creado"
        );

    }



    bindEvents(){

        this.core.canvas.addEventListener(

            "click",

            (e)=>{

                const rect =
                this.core.canvas.getBoundingClientRect();

                const x =
                e.clientX - rect.left;

                const y =
                e.clientY - rect.top;

                const obj =
                this.core.modules.hitTest.getObject(
                    x,
                    y
                );

                if(obj){

                    this.core.modules.selection.select(
                        obj
                    );

                }else{

                    this.core.modules.selection.clear();

                }

            }

        );

    }

}
