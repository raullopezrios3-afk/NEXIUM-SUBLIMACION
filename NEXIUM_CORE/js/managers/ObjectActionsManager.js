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





    /*
    =========================================
     DUPLICAR OBJETO SELECCIONADO
    =========================================
    */


    duplicateSelected(){


        const obj =
        this.core.selectedObject;



        if(!obj){

            console.log(
                "No hay objeto seleccionado"
            );

            return;

        }



        const copia =

        JSON.parse(

            JSON.stringify(obj)

        );



        /*
        Nuevo ID
        */

        copia.id =
        Date.now();



        /*
        Desplazamiento visual
        */

        copia.x += 20;

        copia.y += 20;



        /*
        Agregar copia al motor
        */

        this.core.objects.push(
            copia
        );



        /*
        Seleccionar la copia
        */

        this.core.selectedObject =
        copia;



        /*
        Guardar historial
        */

        if(
            this.core.modules.history
        ){

            this.core.modules.history.save();

        }



        console.log(
            "Objeto duplicado",
            copia
        );


    }


}


// Exportación global

window.ObjectActionsManager =
ObjectActionsManager;
