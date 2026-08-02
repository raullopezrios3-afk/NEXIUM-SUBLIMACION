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

}
