/*
=========================================
 NEXIUM CORE
 Keyboard Manager
=========================================
*/


class KeyboardManager{


    constructor(core){

        this.core = core;


        console.log(
            "Keyboard Manager creado"
        );


        this.init();

    }



    init(){


        window.addEventListener(
            "keydown",
            (e)=>{


                /*
                =========================
                 UNDO
                =========================
                */


                if(
                    e.ctrlKey &&
                    e.key === "z"
                ){

                    e.preventDefault();


                    this.core.undo();


                    console.log(
                        "CTRL + Z"
                    );

                }





                /*
                =========================
                 REDO
                =========================
                */


                if(
                    e.ctrlKey &&
                    e.key === "y"
                ){

                    e.preventDefault();


                    this.core.redo();


                    console.log(
                        "CTRL + Y"
                    );

                }





                /*
                =========================
                 DELETE OBJETO
                =========================
                */


                if(
                    e.key === "Delete"
                ){

                    e.preventDefault();


                    if(
                        this.core.modules.actions
                    ){

                        this.core.modules.actions.deleteSelected();

                    }


                    console.log(
                        "DELETE"
                    );

                }





                /*
                =========================
                 DUPLICAR OBJETO
                 CTRL + D
                =========================
                */


                if(
                    e.ctrlKey &&
                    e.key === "d"
                ){

                    e.preventDefault();


                    if(
                        this.core.modules.actions
                    ){

                        this.core.modules.actions.duplicateSelected();

                    }


                    console.log(
                        "CTRL + D"
                    );

                }





                /*
                =========================
                 COPIAR OBJETO
                 CTRL + C
                =========================
                */


                if(
                    e.ctrlKey &&
                    e.key === "c"
                ){

                    e.preventDefault();


                    if(
                        this.core.modules.actions
                    ){

                        this.core.modules.actions.copySelected();

                    }


                    console.log(
                        "CTRL + C"
                    );

                }





                /*
                =========================
                 PEGAR OBJETO
                 CTRL + V
                =========================
                */


                if(
                    e.ctrlKey &&
                    e.key === "v"
                ){

                    e.preventDefault();


                    if(
                        this.core.modules.actions
                    ){

                        this.core.modules.actions.paste();

                    }


                    console.log(
                        "CTRL + V"
                    );

                }





                             /*
                =========================
                 CORTAR OBJETO
                 CTRL + X
                =========================
                */


                if(
                    e.ctrlKey &&
                    e.key === "x"
                ){

                    e.preventDefault();


                    if(
                        this.core.modules.actions
                    ){

                        this.core.modules.actions.cutSelected();

                    }


                    console.log(
                        "CTRL + X"
                    );

                }





                /*
                =========================
                 TRAER AL FRENTE
                 HOME
                =========================
                */


                if(
                    e.key === "Home"
                ){

                    e.preventDefault();


                    if(
                        this.core.modules.layers
                    ){

                        this.core.modules.layers.bringToFront();

                    }


                    console.log(
                        "HOME - AL FRENTE"
                    );

                }





                /*
                =========================
                 ENVIAR AL FONDO
                 END
                =========================
                */


                if(
                    e.key === "End"
                ){

                    e.preventDefault();


                    if(
                        this.core.modules.layers
                    ){

                        this.core.modules.layers.sendToBack();

                    }


                    console.log(
                        "END - AL FONDO"
                    );

                }





                /*
                =========================
                 SUBIR CAPA
                 PAGE UP
                =========================
                */


                if(
                    e.key === "PageUp"
                ){

                    e.preventDefault();


                    if(
                        this.core.modules.layers
                    ){

                        this.core.modules.layers.bringForward();

                    }


                    console.log(
                        "PAGE UP - SUBIR CAPA"
                    );

                }





                /*
                =========================
                 BAJAR CAPA
                 PAGE DOWN
                =========================
                */


                if(
                    e.key === "PageDown"
                ){

                    e.preventDefault();


                    if(
                        this.core.modules.layers
                    ){

                        this.core.modules.layers.sendBackward();

                    }


                    console.log(
                        "PAGE DOWN - BAJAR CAPA"
                    );

                }



            }

        );


    }


} // <-- CIERRA LA CLASE KeyboardManager



window.KeyboardManager = KeyboardManager;
