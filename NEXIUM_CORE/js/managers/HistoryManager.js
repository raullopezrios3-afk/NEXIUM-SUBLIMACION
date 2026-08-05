/*
=========================================
 NEXIUM CORE
 History Manager
=========================================
*/


class HistoryManager{


    constructor(core){

        this.core = core;


        this.history = [];


        this.position = -1;



        console.log(
            "History Manager creado"
        );

    }





    /*
    =========================================
     GUARDAR ESTADO
    =========================================
    */


    save(){


        const estado =
        JSON.stringify(
            this.core.objects
        );



        /*
        Eliminar estados futuros
        si estamos después de un undo
        */


      this.history =
this.history.slice(
    0,
    this.position + 1
);


/*
Evitar estados duplicados
*/

if(

    this.history.length>0 &&

    this.history[
        this.history.length-1
    ]===estado

){

    return;

}


this.history.push(
    estado
);



        this.position =
        this.history.length - 1;



        console.log(
            "Estado guardado"
        );


    }






    /*
    =========================================
     UNDO
    =========================================
    */


    undo(){


        if(this.position <= 0)
        return;



        this.position--;



        const estado =
        this.history[
            this.position
        ];



        this.core.objects =
        JSON.parse(
            estado
        );



        console.log(
            "Undo ejecutado"
        );


    }



}
