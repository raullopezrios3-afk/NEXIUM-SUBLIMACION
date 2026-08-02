/*
=========================================
 NEXIUM CORE
 Selection Manager
=========================================
*/

class SelectionManager{

    constructor(core){

        this.core = core;

        this.selected = null;

        console.log(
            "Selection Manager creado"
        );

    }



    select(obj){

        this.selected = obj;

        this.core.selectedObject = obj;

        console.log(
            "Objeto seleccionado",
            obj
        );

    }



    clear(){

        this.selected = null;

        this.core.selectedObject = null;

        console.log(
            "Selección limpiada"
        );

    }

}
