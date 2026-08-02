/*
=========================================
 NEXIUM CORE
 Mouse Manager
=========================================
*/

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



                const escalaX =
                this.core.canvas.width /
                rect.width;



                const escalaY =
                this.core.canvas.height /
                rect.height;



                const x =
                (e.clientX - rect.left) *
                escalaX;



                const y =
                (e.clientY - rect.top) *
                escalaY;



                console.log(
                    "Click canvas:",
                    x,
                    y
                );



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
