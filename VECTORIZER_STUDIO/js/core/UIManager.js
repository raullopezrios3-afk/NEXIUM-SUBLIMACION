/*
=========================================================
 VECTORIZER STUDIO
 UIManager
---------------------------------------------------------
 Control de interfaz gráfica
=========================================================
*/


export default class UIManager{


    constructor(app){


        this.app = app;


        this.elements = {};



        this.cacheElements();



        console.log(

            "UIManager creado."

        );


    }



    /*
    =====================================================
    GUARDAR REFERENCIAS DOM
    =====================================================
    */

    cacheElements(){


        this.elements = {


            /*
            Botones
            */

            processButton:

                document.getElementById(
                    "processButton"
                ),


            downloadSVG:

                document.getElementById(
                    "downloadSVG"
                ),


            downloadPNG:

                document.getElementById(
                    "downloadPNG"
                ),


            downloadWEBM:

                document.getElementById(
                    "downloadWEBM"
                ),


            clearSVG:

                document.getElementById(
                    "clearSVG"
                ),



            /*
            Contenedores
            */


            svgPreview:

                document.getElementById(
                    "svgPreview"
                ),


            viewer3D:

                document.getElementById(
                    "viewer3D"
                ),



            /*
            Información
            */


            status:

                document.getElementById(
                    "statusMessage"
                ),


            console:

                document.getElementById(
                    "consoleOutput"
                ),



            /*
            Loading
            */


            overlay:

                document.getElementById(
                    "loadingOverlay"
                ),


            loadingText:

                document.getElementById(
                    "loadingText"
                ),


            progress:

                document.getElementById(
                    "progressBar"
                ),



            /*
            Modal
            */


            modal:

                document.getElementById(
                    "modal"
                ),


            modalTitle:

                document.getElementById(
                    "modalTitle"
                ),


            modalContent:

                document.getElementById(
                    "modalContent"
                ),


            modalClose:

                document.getElementById(
                    "modalClose"
                )


        };


    }



    /*
    =====================================================
    INICIALIZAR UI
    =====================================================
    */

    initialize(){


        this.disableDownloads();



        this.updateStatus(

            "Sistema preparado."

        );



        this.log(

            "UIManager iniciado."

        );



        this.bindModal();


    }



    /*
    =====================================================
    ESTADO GENERAL
    =====================================================
    */


    updateStatus(message){


        if(!this.elements.status){

            return;

        }


        this.elements.status.textContent = message;


    }



    /*
    =====================================================
    CONSOLA INTERNA
    =====================================================
    */


    log(message){


        if(!this.elements.console){

            return;

        }



        const line =

            document.createElement(

                "div"

            );



        const time =

            new Date()

            .toLocaleTimeString();



        line.textContent =

            "["

            +

            time

            +

            "] "

            +

            message;



        this.elements.console.appendChild(

            line

        );



        this.elements.console.scrollTop =

            this.elements.console.scrollHeight;


    }



    /*
    =====================================================
    LOADING
    =====================================================
    */


    showLoading(message="Procesando..."){


        if(!this.elements.overlay){

            return;

        }



        this.elements.overlay

            .classList

            .remove(

                "hidden"

            );



        this.setLoadingText(

            message

        );


    }



    hideLoading(){


        if(!this.elements.overlay){

            return;

        }



        this.elements.overlay

            .classList

            .add(

                "hidden"

            );


        this.setProgress(

            0

        );


    }



    setLoadingText(message){


        if(

            this.elements.loadingText

        ){


            this.elements.loadingText.textContent =

                message;


        }


    }



    setProgress(value){


        if(

            this.elements.progress

        ){


            const percent =

                Math.min(

                    100,

                    Math.max(

                        0,

                        value

                    )

                );



            this.elements.progress.style.width =

                percent

                +

                "%";


        }


    }



    /*
    =====================================================
    SVG
    =====================================================
    */


    renderSVG(svg){


        if(!this.elements.svgPreview){

            return;

        }



        this.elements.svgPreview.innerHTML =

            "";



        this.elements.svgPreview.appendChild(

            this.svgToElement(svg)

        );


    }



    svgToElement(svgString){


        const wrapper =

            document.createElement(

                "div"

            );



        wrapper.innerHTML =

            svgString.trim();



        return wrapper.firstChild;


    }



    clearSVG(){


        if(

            this.elements.svgPreview

        ){


            this.elements.svgPreview.innerHTML =

            `

            <div class="placeholder">

            No existe ningún SVG generado.

            </div>

            `;


        }


    }



    /*
    =====================================================
    INFORMACIÓN DE IMAGEN
    =====================================================
    */


    updateImageInfo(){


        const state =

            this.app.state;



        const fileInfo =

            document.getElementById(

                "infoFile"

            );



        const sizeInfo =

            document.getElementById(

                "infoSize"

            );



        if(fileInfo){


            fileInfo.textContent =

                state.fileName;


        }



        if(sizeInfo){


            sizeInfo.textContent =

                state.imageData.width

                +

                " x "

                +

                state.imageData.height;


        }


    }



    /*
    =====================================================
    COLORES
    =====================================================
    */


    updateColors(value){


        const element =

            document.getElementById(

                "infoColors"

            );



        if(element){


            element.textContent = value;


        }


    }



    /*
    =====================================================
    PRODUCTO
    =====================================================
    */


    updateProduct(product){


        const element =

            document.getElementById(

                "infoProduct"

            );



        if(element){


            element.textContent =

                product;


        }


    }



    /*
    =====================================================
    BOTONES
    =====================================================
    */


    enableProcess(){


        if(

            this.elements.processButton

        ){


            this.elements.processButton.disabled =

                false;


        }


    }



    enableDownloads(){


        [

            this.elements.downloadSVG,

            this.elements.downloadPNG,

            this.elements.downloadWEBM,

            this.elements.clearSVG


        ]

        .forEach(button=>{


            if(button){


                button.disabled = false;


            }


        });


    }



    disableDownloads(){


        [

            this.elements.downloadSVG,

            this.elements.downloadPNG,

            this.elements.downloadWEBM,

            this.elements.clearSVG


        ]

        .forEach(button=>{


            if(button){


                button.disabled = true;


            }


        });


    }



    /*
    =====================================================
    MODAL
    =====================================================
    */


    bindModal(){


        if(

            !this.elements.modalClose

        ){

            return;

        }



        this.elements.modalClose

            .addEventListener(

                "click",

                ()=>{


                    this.closeModal();


                }

            );


    }



    showMessage(title,message){


        if(

            !this.elements.modal

        ){

            return;

        }



        this.elements.modalTitle.textContent =

            title;



        this.elements.modalContent.textContent =

            message;



        this.elements.modal

            .classList

            .remove(

                "hidden"

            );


    }



    closeModal(){


        if(

            this.elements.modal

        ){


            this.elements.modal

            .classList

            .add(

                "hidden"

            );


        }


    }



    /*
    =====================================================
    LIMPIAR INTERFAZ
    =====================================================
    */


    clear(){


        this.clearSVG();



        if(

            this.elements.viewer3D

        ){


            this.elements.viewer3D.innerHTML =

            `

            <div class="placeholder">

            No existe ningún modelo cargado.

            </div>

            `;


        }



        this.disableDownloads();



        this.updateStatus(

            "Proyecto limpio."

        );



    }



}