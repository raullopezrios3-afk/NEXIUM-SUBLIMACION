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



            }

        );


    }


} // <-- CIERRA LA CLASE KeyboardManager



window.KeyboardManager = KeyboardManager;
