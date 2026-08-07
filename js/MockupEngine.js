/*
=========================================
 NEXIUM
 Mockup Engine
 Versión 1.0
=========================================
*/

class MockupEngine{


    constructor(){

        console.log(
            "Mockup Engine creado"
        );


        this.canvas = null;

        this.ctx = null;


        this.imagen = null;

        this.producto = null;

        this.capas = [];

    }



    /*
    =========================================
     CREAR CANVAS DEL MOCKUP
    =========================================
    */


  init(){


    this.canvas =
    document.createElement(
        "canvas"
    );


  this.canvas.width = 370;

this.canvas.height = 470;



    this.canvas.style.position =
    "absolute";


    this.canvas.style.left =
    "0";


    this.canvas.style.top =
    "0";


    this.canvas.style.transform =
    "none";


    this.canvas.style.zIndex =
    "2";



    const contenedor =
    document.getElementById(
        "mockupContainer"
    );


    if(contenedor){

        contenedor.appendChild(
            this.canvas
        );

    }else{

        console.warn(
            "No existe mockupContainer"
        );

    }



    this.ctx =
    this.canvas.getContext(
        "2d"
    );


    console.log(
        "Mockup Canvas creado"
    );


    this.render();


}



       /*
    =========================================
     RENDER PRINCIPAL
    =========================================
    */


    render(){


        if(!this.ctx)
        return;



        this.ctx.clearRect(

            0,
            0,
            this.canvas.width,
            this.canvas.height

        );



        this.ctx.fillStyle =
        "#ffffff";


        this.ctx.fillRect(

            0,
            0,
            this.canvas.width,
            this.canvas.height

        );



        if(this.producto){


   this.ctx.drawImage(

    this.producto,

    40,
    60,

    290,
    350

);


}


        console.log(
            "Mockup render ejecutado"
        );


    }

     /*
    =========================================
     CARGAR PRODUCTO BASE
    =========================================
    */


    loadProduct(src){


        this.producto =
        new Image();



        this.producto.onload = ()=>{


            console.log(
                "Producto cargado en Mockup Engine"
            );


            this.render();


        };



        this.producto.src =
        src;


    }

  /*
    =========================================
     AGREGAR CAPA AL MOCKUP
    =========================================
    */


    addLayer(imagen){


        this.capas.push(
            imagen
        );


        console.log(
            "Capa agregada al Mockup Engine"
        );


        this.render();


    }

}
