function enviarWhatsApp(){

    let nombre=document.getElementById("nombre").value;

    let telefono=document.getElementById("telefono").value;

    let correo=document.getElementById("correo").value;

    let producto=document.getElementById("producto").value;

    let cantidad=document.getElementById("cantidad").value;

    let fecha=document.getElementById("fecha").value;

    let descripcion=document.getElementById("descripcion").value;

    let mensaje=
`*SOLICITUD DE COTIZACIÓN*

Nombre: ${nombre}

Teléfono: ${telefono}

Correo: ${correo}

Producto: ${producto}

Cantidad: ${cantidad}

Fecha requerida: ${fecha}

Descripción:

${descripcion}`;

    let numero="5215512345678";

    window.open("https://wa.me/"+numero+"?text="+encodeURIComponent(mensaje));

}
