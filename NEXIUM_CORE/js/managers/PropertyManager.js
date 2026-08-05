/*
=========================================
 NEXIUM CORE
 Property Manager
=========================================
*/


class PropertyManager{


 constructor(core){

    this.core = core;


    this.container = null;


    this.init();


    console.log(
        "Property Manager creado"
    );


}





/*
=========================================
 INICIALIZAR PANEL
=========================================
*/


init(){


    this.container =
    document.getElementById(
        "object-properties"
    );



    if(!this.container){

        console.warn(
            "Panel de propiedades no encontrado"
        );

        return;

    }



    console.log(
        "Panel de propiedades conectado"
    );


}



    /*
    =========================================
     ACTUALIZAR PROPIEDADES
    =========================================
    */


    update(){


        if(!this.container)
        return;



        const obj =
        this.core.selectedObject;



        if(!obj){


            this.container.innerHTML =
            "Seleccione un objeto";


            return;

        }



        this.container.innerHTML = `


            <div class="property">

                <label>
                    ID
                </label>

                <input 
                    value="${obj.id}"
                    disabled
                >

            </div>



            <div class="property">

                <label>
                    Tipo
                </label>

                <input 
                    value="${obj.tipo}"
                    disabled
                >

            </div>



            <div class="property">

                <label>
                    X
                </label>

                <input 
                    id="propX"
                    value="${obj.x}"
                >

            </div>



            <div class="property">

                <label>
                    Y
                </label>

                <input 
                    id="propY"
                    value="${obj.y}"
                >

            </div>



            <div class="property">

                <label>
                    Ancho
                </label>

                <input 
                    id="propAncho"
                    value="${obj.ancho}"
                >

            </div>



            <div class="property">

                <label>
                    Alto
                </label>

                <input 
                    id="propAlto"
                    value="${obj.alto}"
                >

            </div>


        `;


    }



}


window.PropertyManager =
PropertyManager;
