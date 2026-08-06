/*
=========================================================
 VECTORIZER STUDIO
 Vectorizer Engine
---------------------------------------------------------
 Motor de conversión imagen → SVG
=========================================================
*/


export default class Vectorizer{


    constructor(app){


        this.app = app;



        /*
        =====================================
        CONFIGURACIÓN
        =====================================
        */


        this.maxSize = 300;


        this.defaultIterations = 8;



        console.log(

            "Vectorizer Engine creado."

        );


    }



    /*
    =====================================================
    PROCESAR IMAGEN
    =====================================================
    */


    process(image,colorCount=6){



        this.app.ui.log(

            "Analizando imagen..."

        );



        const canvas =

            this.prepareCanvas(

                image

            );



        const ctx =

            canvas.getContext(

                "2d"

            );



        const data =

            ctx.getImageData(

                0,

                0,

                canvas.width,

                canvas.height

            );



        this.app.ui.log(

            "Reduciendo colores..."

        );



        const result =

            this.quantize(

                data,

                colorCount

            );



        this.app.ui.log(

            "Generando regiones..."

        );



        const svg =

            this.createSVG(

                result,

                canvas.width,

                canvas.height

            );



        return svg;


    }



    /*
    =====================================================
    PREPARAR CANVAS
    =====================================================
    */


    prepareCanvas(image){


        const scale =

            Math.min(

                1,

                this.maxSize /

                Math.max(

                    image.width,

                    image.height

                )

            );



        const canvas =

            document.createElement(

                "canvas"

            );



        canvas.width =

            Math.round(

                image.width * scale

            );



        canvas.height =

            Math.round(

                image.height * scale

            );



        const ctx =

            canvas.getContext(

                "2d"

            );



        ctx.drawImage(

            image,

            0,

            0,

            canvas.width,

            canvas.height

        );



        return canvas;


    }


    /*
    =====================================================
    CUANTIZACIÓN DE COLOR
    =====================================================
    */


    quantize(imageData,k){


        const data =

            imageData.data;



        const total =

            data.length / 4;



        const pixels =

            new Float32Array(

                total * 3

            );



        /*
        =====================================
        CONVERTIR PIXELES
        =====================================
        */


        for(

            let i=0;

            i<total;

            i++

        ){


            pixels[i*3] =

                data[i*4];


            pixels[i*3+1] =

                data[i*4+1];


            pixels[i*3+2] =

                data[i*4+2];


        }



        /*
        =====================================
        CREAR CENTROIDES INICIALES
        =====================================
        */


        let centroids = [];



        const step =

            Math.max(

                1,

                Math.floor(

                    total / k

                )

            );



        for(

            let c=0;

            c<k;

            c++

        ){


            const index =

                Math.min(

                    total-1,

                    c*step

                );



            centroids.push([


                pixels[index*3],


                pixels[index*3+1],


                pixels[index*3+2]


            ]);

        }



        const assignments =

            new Int32Array(

                total

            );



        /*
        =====================================
        ITERACIONES
        =====================================
        */


        for(

            let iteration=0;

            iteration<this.defaultIterations;

            iteration++

        ){



            /*
            -------------------------------
            Buscar color más cercano
            -------------------------------
            */


            for(

                let p=0;

                p<total;

                p++

            ){


                let best = 0;


                let distance = Infinity;



                for(

                    let c=0;

                    c<k;

                    c++

                ){



                    const dr =

                        pixels[p*3]

                        -

                        centroids[c][0];



                    const dg =

                        pixels[p*3+1]

                        -

                        centroids[c][1];



                    const db =

                        pixels[p*3+2]

                        -

                        centroids[c][2];



                    const d =

                        dr*dr

                        +

                        dg*dg

                        +

                        db*db;



                    if(d < distance){


                        distance = d;


                        best = c;


                    }


                }



                assignments[p] = best;


            }



            /*
            -------------------------------
            Recalcular centros
            -------------------------------
            */


            const sums =

                Array.from(

                    {

                    length:k

                    },

                    ()=>[0,0,0,0]

                );



            for(

                let p=0;

                p<total;

                p++

            ){


                const c =

                    assignments[p];



                sums[c][0] +=

                    pixels[p*3];


                sums[c][1] +=

                    pixels[p*3+1];


                sums[c][2] +=

                    pixels[p*3+2];


                sums[c][3]++;


            }



            for(

                let c=0;

                c<k;

                c++

            ){


                if(

                    sums[c][3] > 0

                ){


                    centroids[c] = [


                        sums[c][0]

                        /

                        sums[c][3],



                        sums[c][1]

                        /

                        sums[c][3],



                        sums[c][2]

                        /

                        sums[c][3]



                    ];

                }


            }


        }



        return {


            assignments,


            centroids,


            width:imageData.width,


            height:imageData.height


        };


    }


    /*
    =====================================================
    CREAR SVG
    =====================================================
    */


    createSVG(result,width,height){


        let paths = "";



        const {

            assignments,

            centroids

        } = result;



        const used = [];



        /*
        =====================================
        RECORRER COLORES
        =====================================
        */


        for(

            let color=0;

            color<centroids.length;

            color++

        ){


            const mask =

                new Uint8Array(

                    width *

                    height

                );



            for(

                let i=0;

                i<assignments.length;

                i++

            ){


                if(

                    assignments[i]===color

                ){


                    mask[i]=1;


                }


            }



            const regions =

                this.connectedComponents(

                    mask,

                    width,

                    height

                );



            for(

                const region of regions

            ){



                /*
                Ignorar ruido pequeño
                */


                if(

                    region.pixels.length < 5

                ){

                    continue;

                }



                const contour =

                    this.traceContour(

                        mask,

                        width,

                        height,

                        region.start[0],

                        region.start[1]

                    );



                if(

                    contour.length < 3

                ){

                    continue;

                }



                const simplified =

                    this.simplify(

                        contour

                    );



                paths +=

                    this.pathFromPoints(

                        simplified,

                        this.rgbHex(

                            centroids[color]

                        )

                    );



                used.push(region);


            }


        }



        return `

        <svg 

        xmlns="http://www.w3.org/2000/svg"

        viewBox="0 0 ${width} ${height}"

        width="100%"

        height="100%">


        ${paths}


        </svg>

        `;


    }




    /*
    =====================================================
    COMPONENTES CONECTADOS
    =====================================================
    */


    connectedComponents(mask,width,height){


        const labels =

            new Int32Array(

                width *

                height

            )

            .fill(-1);



        const components = [];



        let id = 0;



        for(

            let y=0;

            y<height;

            y++

        ){


            for(

                let x=0;

                x<width;

                x++

            ){



                const index =

                    y *

                    width

                    +

                    x;



                if(

                    mask[index]

                    &&

                    labels[index]===-1

                ){



                    const pixels=[];



                    const stack=[

                        [x,y]

                    ];



                    labels[index]=id;



                    let start=[x,y];



                    while(

                        stack.length

                    ){



                        const current =

                            stack.pop();



                        const cx=current[0];

                        const cy=current[1];



                        pixels.push([

                            cx,

                            cy

                        ]);



                        if(

                            cy < start[1]

                            ||

                            (

                            cy===start[1]

                            &&

                            cx<start[0]

                            )

                        ){


                            start=[cx,cy];


                        }



                        const neighbors=[


                            [cx+1,cy],


                            [cx-1,cy],


                            [cx,cy+1],


                            [cx,cy-1]


                        ];



                        for(

                            const n of neighbors

                        ){


                            const nx=n[0];

                            const ny=n[1];



                            if(

                                nx>=0

                                &&

                                ny>=0

                                &&

                                nx<width

                                &&

                                ny<height

                            ){


                                const ni =

                                    ny *

                                    width

                                    +

                                    nx;



                                if(

                                    mask[ni]

                                    &&

                                    labels[ni]===-1

                                ){


                                    labels[ni]=id;


                                    stack.push([

                                        nx,

                                        ny

                                    ]);

                                }


                            }


                        }


                    }



                    components.push({

                        pixels,

                        start

                    });



                    id++;


                }


            }


        }



        return components;


    }


    /*
    =====================================================
    TRAZADO DE CONTORNO
    =====================================================
    */


    traceContour(

        mask,

        width,

        height,

        startX,

        startY

    ){


        const directions = [


            [1,0],


            [1,1],


            [0,1],


            [-1,1],


            [-1,0],


            [-1,-1],


            [0,-1],


            [1,-1]


        ];



        const isValid =

            (x,y)=>{


                if(

                    x<0 ||

                    y<0 ||

                    x>=width ||

                    y>=height

                ){

                    return false;

                }



                return (

                    mask[

                        y *

                        width

                        +

                        x

                    ]

                    ===1

                );


            };



        const points=[];



        let x=startX;

        let y=startY;


        let direction=0;



        const maxSteps =

            width *

            height *

            2;



        let steps=0;



        do{


            points.push([

                x,

                y

            ]);



            let found=false;



            for(

                let i=0;

                i<8;

                i++

            ){


                const dir =

                    (

                    direction+i

                    )

                    %

                    8;



                const nx =

                    x +

                    directions[dir][0];



                const ny =

                    y +

                    directions[dir][1];



                if(

                    isValid(

                        nx,

                        ny

                    )

                ){


                    x=nx;

                    y=ny;


                    direction=(dir+6)%8;


                    found=true;


                    break;


                }


            }



            if(!found){

                break;

            }



            steps++;



        }

        while(

            (

            x!==startX

            ||

            y!==startY

            )

            &&

            steps<maxSteps

        );



        return points;


    }



    /*
    =====================================================
    SIMPLIFICAR CONTORNO
    =====================================================
    */


    simplify(points){



        if(

            points.length<=4

        ){

            return points;

        }



        const result=[];



        const step =

            Math.ceil(

                points.length / 120

            );



        for(

            let i=0;

            i<points.length;

            i+=step

        ){


            result.push(

                points[i]

            );


        }



        return result;


    }



    /*
    =====================================================
    CREAR PATH SVG
    =====================================================
    */


    pathFromPoints(points,color){


        if(

            points.length<3

        ){

            return "";

        }



        let d =

            "M "

            +

            points[0][0]

            +

            " "

            +

            points[0][1];



        for(

            let i=1;

            i<points.length;

            i++

        ){



            d +=

                " L "

                +

                points[i][0]

                +

                " "

                +

                points[i][1];


        }



        d += " Z";



        return `

        <path

        d="${d}"

        fill="${color}"

        stroke="none"/>

        `;


    }



    /*
    =====================================================
    RGB A HEX
    =====================================================
    */


    rgbHex(rgb){



        const convert =

            value=>{


                return Math

                .max(

                    0,

                    Math.min(

                        255,

                        Math.round(value)

                    )

                )

                .toString(16)

                .padStart(

                    2,

                    "0"

                );


            };



        return "#"

        +

        convert(rgb[0])

        +

        convert(rgb[1])

        +

        convert(rgb[2]);


    }



}