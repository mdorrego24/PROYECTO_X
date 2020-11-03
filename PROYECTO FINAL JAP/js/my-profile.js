//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var datos = {};

function cargarDatos(){
        datos.nombres = document.getElementById("nombres").value;
        datos.apellidos = document.getElementById("apellidos").value;
        datos.email = document.getElementById("email").value;
        datos.celular = document.getElementById("celular").value;
        datos.direccion = document.getElementById("direccion").value;
        localStorage.setItem("datos_usuario", JSON.stringify(datos));

   /* let datos_aux = localStorage.getItem("datos_usuario");
    datos = JSON.parse(datos_aux);

    if(datos!=null){ 

    

    document.getElementById("nombres").value =datos.nombres;
    document.getElementById("apellidos").value = datos.apellidos;
    document.getElementById("email").value = datos.email;
    document.getElementById("celular").value = datos.celular;
    document.getElementById("direccion").value = datos.direccion;
}

    console.log(datos);*/
    //mostrarDatos();
};

function mostrarDatos(){
  

let datos_aux = localStorage.getItem("datos_usuario");
datos = JSON.parse(datos_aux);

if(datos!=null){ 

document.getElementById("nombres").value =datos.nombres;
document.getElementById("apellidos").value = datos.apellidos;
document.getElementById("email").value = datos.email;
document.getElementById("celular").value = datos.celular;
document.getElementById("direccion").value = datos.direccion;
}

console.log(datos);
};

$(document).ready(function() {

    
    var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.avatar').attr('src', e.target.result);
            }
    
            reader.readAsDataURL(input.files[0]);
        }
    }
    

    $(".file-upload").on('change', function(){
        readURL(this);
    });
});
document.addEventListener("DOMContentLoaded", function (e) {
mostrarDatos();
});
