/*
=========================================
 NEXIUM CORE
 Hit Test
=========================================
*/

class HitTest{

    constructor(core){

        this.core = core;

        console.log(
            "Hit Test creado"
        );

    }



    getObject(x,y){

        const objetos =
        this.core.objects;



        for(
            let i = objetos.length-1;
            i>=0;
            i--
        ){

            const obj =
            objetos[i];



            if(
                x>=obj.x &&
                x<=obj.x+obj.ancho &&
                y>=obj.y &&
                y<=obj.y+obj.alto
            ){

                return obj;

            }

        }



        return null;

    }

}
