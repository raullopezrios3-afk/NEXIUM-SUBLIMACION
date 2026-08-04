/*
=========================================
 NEXIUM CORE
 Mouse Manager
 Version 2.0
=========================================
*/

class MouseManager{


    constructor(core){

        this.core = core;


        this.x = 0;
        this.y = 0;


        this.isDown = false;


        this.selectedObject = null;


        console.log(
            "Mouse Manager creado"
        );

    }



    /*
    =========================================
     INICIALIZAR EVENTOS DEL MOUSE
    =========================================
    */

    bindEvents(){


        this.core.canvas.addEventListener(

            "mousedown",

            (e)=>{

                const pos =
                this.getMousePosition(e);


                this.x = pos.x;
                this.y = pos.y;

                this.isDown = true;

                console.log(
                    "Mouse Down:",
                    this.x,
                    this.y
                );

             const resize =
this.core.modules.transform.isHandleClicked(
    this.x,
    this.y
);


if(resize){

   this.core.modules.transform.startResize(
    this.x,
    this.y
);


    return;

}

                const obj =
                this.core.modules.hitTest.getObject(
                    this.x,
                    this.y
                );


                console.log(
                    "HitTest:",
                    obj
                );


                if(obj){


                    console.log(
                        "Seleccionando objeto"
                    );


                    this.selectedObject = obj;


                    this.core.modules.selection.select(
                        obj
                    );


                    /*
                    Preparación DragManager
                    */

                    if(
                        this.core.modules.drag
                    ){

                        this.core.modules.drag.start(
                            obj,
                            this.x,
                            this.y
                        );

                    }


                }else{


                    console.log(
                        "Limpiando selección"
                    );


                    this.selectedObject = null;


                    this.core.modules.selection.clear();


                }


            }

        );




        this.core.canvas.addEventListener(

            "mousemove",

            (e)=>{


                if(!this.isDown)
                return;



                const pos =
                this.getMousePosition(e);



                this.x = pos.x;
                this.y = pos.y;


             if(
    this.core.modules.transform &&
    this.core.modules.transform.transforming
){

    this.core.modules.transform.resize(
        this.x,
        this.y
    );

    return;

}



                if(
                    this.core.modules.drag &&
                    this.selectedObject
                ){


                    this.core.modules.drag.move(

                        this.x,
                        this.y

                    );


                }


            }

        );


        window.addEventListener(

            "mouseup",

            ()=>{


                if(!this.isDown)
                return;



                this.isDown = false;



                console.log(
                    "Mouse Up"
                );



                if(
                    this.core.modules.drag
                ){

                    this.core.modules.drag.end();

                }


            }

        );


    }





    /*
    =========================================
     CONVERSIÓN COORDENADAS CANVAS
    =========================================
    */

    getMousePosition(e){


        const rect =
        this.core.canvas.getBoundingClientRect();



        const escalaX =
        this.core.canvas.width /
        rect.width;



        const escalaY =
        this.core.canvas.height /
        rect.height;



        return {


            x:
            (e.clientX - rect.left)
            *
            escalaX,



            y:
            (e.clientY - rect.top)
            *
            escalaY


        };


    }



}
