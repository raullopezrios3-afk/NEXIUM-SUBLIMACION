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


// SISTEMA DE MODULOS

this.modules = {};


this.modules.canvas =
new CanvasManager(this);

this.modules.render =
new RenderEngine(this);

    this.modules.mouse =
new MouseManager(this);

    this.modules.selection =
new SelectionManager(this);

    this.modules.hitTest =
new HitTest(this);

    this.modules.boundingBox =
new BoundingBoxRenderer(this);
    


    // ESCENA

    this.scene = null;


    // OBJETOS DEL EDITOR

    this.objects = [];


    // CAPAS

    this.layers = [];


    // HISTORIAL

this.history = [
    JSON.stringify([])
];



    // CANVAS ENGINE

    this.canvas = null;

    this.context = null;



    // OBJETO ACTIVO

    this.selectedObject = null;



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

    if(this.history.length > 0){

        this.history.pop();


        let anterior =
        this.history.length > 0
        ? this.history[this.history.length-1]
        : "[]";


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


        this.conectarCanvas();

        this.iniciarEventos();

    }



    conectarCanvas(){


        this.canvas =
        document.getElementById(
            "nexiumCanvas"
        );


        if(!this.canvas){

            console.error(
                "Canvas no encontrado"
            );

            return;

        }


        this.context =
        this.canvas.getContext(
            "2d"
        );


        this.canvas.width =
        this.canvas.offsetWidth;


        this.canvas.height =
        this.canvas.offsetHeight;


        console.log(
            "Canvas conectado correctamente"
        );


    }



    iniciarEventos(){


        window.addEventListener(
            "resize",
            ()=>{


                if(this.canvas){


                    this.canvas.width =
                    this.canvas.offsetWidth;


                    this.canvas.height =
                    this.canvas.offsetHeight;


                }


            }
        );


        console.log(
            "Eventos NEXIUM activos"
        );


    }


}


// Exportación global

window.NexiumCore = NexiumCore;
