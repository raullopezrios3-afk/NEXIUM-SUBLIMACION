/*
=========================================
 NEXIUM CORE
 Render Engine
=========================================
*/

class RenderEngine{

    constructor(core){

        this.core = core;

        this.objectRenderer =
        new ObjectRenderer(core);

        console.log(
            "Render Engine creado"
        );

    }



    clear(){

        if(!this.core.context)
        return;

        this.core.context.clearRect(
            0,
            0,
            this.core.canvas.width,
            this.core.canvas.height
        );

    }



    render(){

        this.clear();

        const objetos =
        this.core.objects;

        objetos.forEach(
        obj=>{

            this.objectRenderer.render(obj);

        });

        this.core.modules.boundingBox.render();

    }



    start(){

        const loop = ()=>{

            this.render();

            requestAnimationFrame(loop);

        };

        loop();

    }

}
