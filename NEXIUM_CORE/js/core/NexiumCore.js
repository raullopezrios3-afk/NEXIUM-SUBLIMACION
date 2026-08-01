/*
====================================================
 NEXIUM CORE ENGINE
 Archivo: NexiumCore.js
 Función: Núcleo principal del motor
====================================================
*/


class NexiumCore {

    constructor(){

        this.version = "1.0.0";

        this.modules = {};

        this.scene = null;

        this.objects = [];

        this.layers = [];

        this.history = [];


        console.log(
            "NEXIUM CORE iniciado",
            this.version
        );

    }



    registerModule(nombre, modulo){

        this.modules[nombre] = modulo;

        console.log(
            "Modulo registrado:",
            nombre
        );

    }



    addObject(objeto){

        this.objects.push(objeto);

        this.saveHistory();

    }



    removeObject(id){

        this.objects =
        this.objects.filter(
            obj => obj.id !== id
        );

        this.saveHistory();

    }



    getObjects(){

        return this.objects;

    }



    saveHistory(){

        this.history.push(
            JSON.stringify(this.objects)
        );


        if(this.history.length > 50){

            this.history.shift();

        }

    }



    undo(){

        if(this.history.length > 1){

            this.history.pop();

            let anterior =
            this.history[
                this.history.length-1
            ];


            this.objects =
            JSON.parse(anterior);


            console.log(
                "Undo ejecutado"
            );

        }

    }



    init(){

        console.log(
            "NEXIUM ENGINE READY"
        );

    }


}


// Exportación global

window.NexiumCore = NexiumCore;
