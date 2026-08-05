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


            }

        );


    }


}
