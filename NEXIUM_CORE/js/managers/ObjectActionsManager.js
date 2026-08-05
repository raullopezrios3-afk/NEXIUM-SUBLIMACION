/*
=========================================
 NEXIUM CORE
 Object Actions Manager
=========================================
*/


class ObjectActionsManager{


    constructor(core){

        this.core = core;


        console.log(
            "Object Actions Manager creado"
        );

    }



    /*
    =========================================
     ELIMINAR OBJETO SELECCIONADO
    =========================================
    */


    deleteSelected(){


        const obj =
        this.core.selectedObject;



        if(!obj){

            console.log(
                "No hay objeto seleccionado"
            );

            return;

        }



        this.core.objects =

        this.core.objects.filter(

            item => item.id !== obj.id

        );



        this.core.selectedObject = null;



        /*
        Guardar estado
        */

        if(
            this.core.modules.history
        ){

            this.core.modules.history.save();

        }



        console.log(
            "Objeto eliminado"
        );


    }


}


// Exportación global

window.ObjectActionsManager =
ObjectActionsManager;
