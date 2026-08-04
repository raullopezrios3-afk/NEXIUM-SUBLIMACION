/*
=========================================
 NEXIUM CORE
 Mouse Manager
 Version 2.1
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



        /*
        =====================================
         MOUSE DOWN
        =====================================
        */

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





                /*
                ================================
                 VERIFICAR HANDLE RESIZE
                ================================
                */


                if(
                    this.core.modules.transform &&
                    this.core.modules.transform.isHandleClicked(
                        this.x,
                        this.y
                    )
                ){


                    this.core.modules.transform.startResize(
                        this.x,
                        this.y
                    );


                    return;

                }





                /*
                ================================
                 HIT TEST
                ================================
                */


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
                    ============================
                     INICIAR DRAG
                    ============================
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








        /*
        =====================================
         MOUSE MOVE
        =====================================
        */


        this.core.canvas.addEventListener(

            "mousemove",

            (e)=>{



                if(!this.isDown)
                return;




                const pos =
                this.getMousePosition(e);



                this.x = pos.x;

                this.y = pos.y;






                /*
                ================================
                 RESIZE ACTIVO
                ================================
                */


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







                /*
                ================================
                 DRAG ACTIVO
                ================================
                */


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









        /*
        =====================================
         MOUSE UP
        =====================================
        */


        window.addEventListener(

            "mouseup",

            ()=>{



                if(!this.isDown)
                return;




                this.isDown = false;



                console.log(
                    "Mouse Up"
                );







                /*
                ================================
                 FINALIZAR RESIZE
                ================================
                */


                if(
                    this.core.modules.transform &&
                    this.core.modules.transform.transforming
                ){


                    this.core.modules.transform.endResize();


                }







                /*
                ================================
                 FINALIZAR DRAG
                ================================
                */


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
