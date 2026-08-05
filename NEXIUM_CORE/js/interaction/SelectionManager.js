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



        /*
        =========================================
         ACTUALIZAR PANEL DE PROPIEDADES
        =========================================
        */


        if(
            this.core.modules.properties
        ){

            this.core.modules.properties.update();

        }



        console.log(
            "Objeto seleccionado",
            obj
        );


    }






    clear(){


        this.selected = null;


        this.core.selectedObject = null;




        /*
        =========================================
         LIMPIAR PANEL DE PROPIEDADES
        =========================================
        */


        if(
            this.core.modules.properties
        ){

            this.core.modules.properties.update();

        }



        console.log(
            "Selección limpiada"
        );


    }



}


// Exportación global

window.SelectionManager =
SelectionManager;
