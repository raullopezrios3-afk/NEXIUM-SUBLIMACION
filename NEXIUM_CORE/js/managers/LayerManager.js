/*
=========================================
 NEXIUM CORE
 Layer Manager
=========================================
*/


class LayerManager{


    constructor(core){

        this.core = core;


        console.log(
            "Layer Manager creado"
        );

    }





    /*
    =========================================
     TRAER OBJETO AL FRENTE
    =========================================
    */


    bringToFront(){


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



        this.core.objects.push(
            obj
        );



        this.save();



        console.log(
            "Objeto al frente"
        );


    }






    /*
    =========================================
     ENVIAR OBJETO AL FONDO
    =========================================
    */


    sendToBack(){


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



        this.core.objects.unshift(
            obj
        );



        this.save();



        console.log(
            "Objeto al fondo"
        );


    }






    /*
    =========================================
     SUBIR UNA CAPA
    =========================================
    */


    bringForward(){


        const obj =
        this.core.selectedObject;



        if(!obj)
        return;



        const index =

        this.core.objects.findIndex(

            item => item.id === obj.id

        );



        if(
            index <
            this.core.objects.length -1
        ){


            const temp =

            this.core.objects[index+1];



            this.core.objects[index+1] = obj;


            this.core.objects[index] = temp;



            this.save();


        }



        console.log(
            "Objeto subido una capa"
        );


    }






    /*
    =========================================
     BAJAR UNA CAPA
    =========================================
    */


    sendBackward(){


        const obj =
        this.core.selectedObject;



        if(!obj)
        return;



        const index =

        this.core.objects.findIndex(

            item => item.id === obj.id

        );



        if(index > 0){


            const temp =

            this.core.objects[index-1];



            this.core.objects[index-1] = obj;


            this.core.objects[index] = temp;



            this.save();


        }



        console.log(
            "Objeto bajado una capa"
        );


    }





    save(){


        if(
            this.core.modules.history
        ){

            this.core.modules.history.save();

        }


    }



}


window.LayerManager =
LayerManager;
