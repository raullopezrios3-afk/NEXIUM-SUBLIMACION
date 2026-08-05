/*
=========================================
 NEXIUM CORE
 Object Actions Manager
=========================================
*/


class ObjectActionsManager{


   constructor(core){

    this.core = core;


    this.clipboard = null;


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





    /*
    =========================================
     COPIAR OBJETO SELECCIONADO
    =========================================
    */


    copySelected(){


        const obj =
        this.core.selectedObject;



        if(!obj){

            console.log(
                "No hay objeto seleccionado"
            );

            return;

        }



        this.clipboard =

        JSON.parse(

            JSON.stringify(obj)

        );



        console.log(
            "Objeto copiado",
            this.clipboard
        );


    }





       /*
    =========================================
     PEGAR OBJETO
    =========================================
    */


    paste(){


        if(!this.clipboard){


            console.log(
                "Clipboard vacío"
            );


            return;

        }



        const copia =

        JSON.parse(

            JSON.stringify(
                this.clipboard
            )

        );



        /*
        Nuevo ID
        */

        copia.id =
        Date.now();



        /*
        Desplazamiento visual
        */

        copia.x += 30;

        copia.y += 30;



        /*
        Agregar objeto
        */

        this.core.objects.push(
            copia
        );



        /*
        Seleccionar nueva copia
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
            "Objeto pegado",
            copia
        );


    }





    /*
    =========================================
     CORTAR OBJETO SELECCIONADO
    =========================================
    */


    cutSelected(){


        const obj =
        this.core.selectedObject;



        if(!obj){


            console.log(
                "No hay objeto seleccionado"
            );


            return;

        }



        /*
        Copiar al clipboard
        */

        this.copySelected();



        /*
        Eliminar objeto
        */

        this.deleteSelected();



        console.log(
            "Objeto cortado"
        );


    }


}


// Exportación global

window.ObjectActionsManager =
ObjectActionsManager;
