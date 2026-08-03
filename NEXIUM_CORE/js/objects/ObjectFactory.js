/*
=========================================
 NEXIUM CORE
 Object Factory
 Creador de objetos
=========================================
*/


class ObjectFactory{


    constructor(core){

        this.core = core;

        this.counter = 1;


        console.log(
            "Object Factory creado"
        );

    }




    createRectangle(
        x,
        y,
        ancho,
        alto
    ){


        const objeto = {


            id:
            this.counter++,


            tipo:
            "rectangulo",


            x:x,

            y:y,


            ancho:ancho,


            alto:alto


        };



        this.core.addObject(
            objeto
        );



        return objeto;


    }



}
