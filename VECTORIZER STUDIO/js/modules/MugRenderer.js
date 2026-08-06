/*
=========================================================
 VECTORIZER STUDIO

 MugRenderer

---------------------------------------------------------
 Motor 3D Three.js para taza 360°

=========================================================
*/


export default class MugRenderer{


    constructor(app){


        this.app = app;



        /*
        =====================================
        THREE OBJECTS
        =====================================
        */


        this.scene = null;


        this.camera = null;


        this.renderer = null;


        this.mugGroup = null;



        /*
        =====================================
        ANIMATION
        =====================================
        */


        this.animationFrame = null;


        this.autoRotate = true;



        /*
        =====================================
        CONTROL
        =====================================
        */


        this.dragging = false;


        this.lastX = 0;



        console.log(

            "MugRenderer creado."

        );


    }




    /*
    =====================================================
    INICIALIZAR ESCENA
    =====================================================
    */


    initialize(container){



        this.container = container;



        const width =

            container.clientWidth;



        const height =

            container.clientHeight;



        /*
        =====================================
        ESCENA
        =====================================
        */


        this.scene =

            new THREE.Scene();



        /*
        =====================================
        CÁMARA
        =====================================
        */


        this.camera =

            new THREE.PerspectiveCamera(

                35,

                width / height,

                0.1,

                100

            );



        this.camera.position.set(

            0,

            0.3,

            6

        );



        /*
        =====================================
        RENDERER
        =====================================
        */


        this.renderer =

            new THREE.WebGLRenderer(

                {

                antialias:true,

                preserveDrawingBuffer:true,

                alpha:true

                }

            );



        this.renderer.setSize(

            width,

            height

        );



        this.renderer.setPixelRatio(

            window.devicePixelRatio || 1

        );



        container.innerHTML = "";


        container.appendChild(

            this.renderer.domElement

        );



        this.createLights();



        this.bindControls();



        this.start();



    }



    /*
    =====================================================
    ILUMINACIÓN
    =====================================================
    */


    createLights(){


        const ambient =

            new THREE.AmbientLight(

                0xffffff,

                0.65

            );



        this.scene.add(

            ambient

        );



        const keyLight =

            new THREE.DirectionalLight(

                0xffffff,

                0.9

            );



        keyLight.position.set(

            3,

            4,

            5

        );



        this.scene.add(

            keyLight

        );



        const fillLight =

            new THREE.DirectionalLight(

                0xffffff,

                0.35

            );



        fillLight.position.set(

            -4,

            2,

            -3

        );



        this.scene.add(

            fillLight

        );


    }




    /*
    =====================================================
    CREAR TAZA
    =====================================================
    */


    createMug(texture){



        this.mugGroup =

            new THREE.Group();



        /*
        =====================================
        MATERIAL DISEÑO
        =====================================
        */


        const designMaterial =

            new THREE.MeshStandardMaterial(

                {

                map:texture,

                roughness:0.5,

                metalness:0.05,

                side:THREE.DoubleSide

                }

            );



        /*
        =====================================
        CUERPO
        =====================================
        */


        const bodyGeometry =

            new THREE.CylinderGeometry(

                1,

                1,

                2.4,

                64,

                1,

                true

            );



        const body =

            new THREE.Mesh(

                bodyGeometry,

                designMaterial

            );



        this.mugGroup.add(

            body

        );



        /*
        =====================================
        PORCELANA INTERIOR
        =====================================
        */


        const ceramicMaterial =

            new THREE.MeshStandardMaterial(

                {

                color:

                0xf5f3ec,


                roughness:

                0.4


                }

            );



        const insideGeometry =

            new THREE.CylinderGeometry(

                0.94,

                0.94,

                2.3,

                64,

                1,

                true

            );



        const inside =

            new THREE.Mesh(

                insideGeometry,

                ceramicMaterial

            );



        this.mugGroup.add(

            inside

        );



        /*
        =====================================
        BASE DE LA TAZA
        =====================================
        */


        const bottomGeometry =

            new THREE.CircleGeometry(

                1,

                64

            );



        const bottom =

            new THREE.Mesh(

                bottomGeometry,

                ceramicMaterial

            );



        bottom.rotation.x =

            Math.PI / 2;



        bottom.position.y =

            -1.2;



        this.mugGroup.add(

            bottom

        );



        /*
        =====================================
        BORDE SUPERIOR
        =====================================
        */


        const rimGeometry =

            new THREE.TorusGeometry(

                1,

                0.05,

                16,

                64

            );



        const rim =

            new THREE.Mesh(

                rimGeometry,

                ceramicMaterial

            );



        rim.rotation.x =

            Math.PI / 2;



        rim.position.y =

            1.2;



        this.mugGroup.add(

            rim

        );



        /*
        =====================================
        ASA
        =====================================
        */


        const handleGeometry =

            new THREE.TorusGeometry(

                0.55,

                0.13,

                16,

                48,

                Math.PI * 1.5

            );



        const handle =

            new THREE.Mesh(

                handleGeometry,

                ceramicMaterial

            );



        handle.position.set(

            1.05,

            0,

            0

        );



        handle.rotation.z =

            Math.PI / 2;



        handle.rotation.y =

            Math.PI / 2;



        this.mugGroup.add(

            handle

        );



        /*
        =====================================
        AGREGAR A ESCENA
        =====================================
        */


        this.scene.add(

            this.mugGroup

        );



        this.mugGroup.rotation.y =

            0;



    }





    /*
    =====================================================
    ACTUALIZAR TEXTURA
    =====================================================
    */


    updateTexture(texture){



        if(

            !this.mugGroup

        ){

            return;

        }



        const body =

            this.mugGroup.children[0];



        if(

            body.material

        ){



            body.material.map =

                texture;



            body.material.needsUpdate =

                true;


        }


    }


    /*
    =====================================================
    CONTROLES DE INTERACCIÓN
    =====================================================
    */


    bindControls(){



        const canvas =

            this.renderer.domElement;



        canvas.style.cursor =

            "grab";



        canvas.addEventListener(

            "pointerdown",

            event=>{


                this.dragging = true;


                this.autoRotate = false;


                this.lastX =

                    event.clientX;



                canvas.style.cursor =

                    "grabbing";


            }

        );




        window.addEventListener(

            "pointerup",

            ()=>{


                this.dragging = false;


                canvas.style.cursor =

                    "grab";


            }

        );




        window.addEventListener(

            "pointermove",

            event=>{


                if(

                    !this.dragging

                ){

                    return;

                }



                const delta =

                    event.clientX

                    -

                    this.lastX;



                this.lastX =

                    event.clientX;



                if(

                    this.mugGroup

                ){



                    this.mugGroup.rotation.y +=

                        delta *

                        0.01;


                }


            }

        );


    }




    /*
    =====================================================
    ANIMACIÓN
    =====================================================
    */


    start(){



        const animate = ()=>{



            if(

                this.autoRotate

                &&

                this.mugGroup

            ){



                this.mugGroup.rotation.y +=

                    0.008;


            }



            if(

                this.renderer

                &&

                this.scene

                &&

                this.camera

            ){



                this.renderer.render(

                    this.scene,

                    this.camera

                );


            }



            this.animationFrame =

                requestAnimationFrame(

                    animate

                );


        };



        animate();



    }





    /*
    =====================================================
    CAMBIAR ROTACIÓN AUTOMÁTICA
    =====================================================
    */


    toggleAutoRotate(value){



        this.autoRotate = value;



    }





    /*
    =====================================================
    AJUSTE RESPONSIVE
    =====================================================
    */


    resize(){



        if(

            !this.container

        ){

            return;

        }



        const width =

            this.container.clientWidth;



        const height =

            this.container.clientHeight;



        this.camera.aspect =

            width /

            height;



        this.camera.updateProjectionMatrix();



        this.renderer.setSize(

            width,

            height

        );


    }



    /*
    =====================================================
    CARGAR TAZA CON TEXTURA
    =====================================================
    */


    load(texture){



        if(

            this.mugGroup

        ){


            this.scene.remove(

                this.mugGroup

            );


        }



        this.createMug(

            texture

        );



    }




    /*
    =====================================================
    CAPTURA PNG
    =====================================================
    */


    capturePNG(){



        if(

            !this.renderer

        ){

            return null;

        }



        this.renderer.render(

            this.scene,

            this.camera

        );



        return new Promise(

            resolve=>{



                this.renderer.domElement

                .toBlob(

                    blob=>{


                        resolve(

                            blob

                        );


                    },

                    "image/png"

                );



            }

        );


    }




    /*
    =====================================================
    ESTADO DEL MOTOR
    =====================================================
    */


    getState(){



        return {


            initialized:

                !!this.renderer,


            autoRotate:

                this.autoRotate,


            hasMug:

                !!this.mugGroup



        };


    }





    /*
    =====================================================
    DETENER MOTOR
    =====================================================
    */


    stop(){



        if(

            this.animationFrame

        ){



            cancelAnimationFrame(

                this.animationFrame

            );


        }



    }




    /*
    =====================================================
    LIMPIAR MEMORIA
    =====================================================
    */


    dispose(){



        this.stop();



        if(

            this.renderer

        ){



            this.renderer.dispose();


        }



        this.scene = null;


        this.camera = null;


        this.renderer = null;


        this.mugGroup = null;



    }



}