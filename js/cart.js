var compras = [];
var cantidades =[];
var valorUnitario =[];
var subtotales=[];
var porcentajes=[];
var porcentajeSeleccionado;
var precioTotal = document.getElementById("totalCostText");
var totalProductos = document.getElementById("productCostText");
var gastoPorcentaje = document.getElementById("comissionText");

function showSelectedProductsList(array){ //MUESTRO LOS PRODUCTOS SELECCIONADOS EN EL HTML (INVOCO EL JSON)
    
    let htmlContentToAppend = "";
    for(let i = 1; i <= array.length; i++){
        let producto = array[i-1];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row" style="display:flex; align-items:center">
                <div class="col-2">
                    <img src="` + producto.src + `" class="img-thumbnail">
                </div>
                <div class="col-3">
                    <p>`+ producto.name +`</p>
                </div>
                <div class="col-2">
                    <button class="btn" onclick=aumentarCantidad(` +i+ `)><strong style="font-size:30px" >+</strong></button>
                    <input id="cantidad` +i+ `" type="number" size="2" min="1" value="` + producto.count + `" style="text-align:center" onchange=actualizarPrecio(`+i+`)> 
                    <button class="btn" onclick=restarCantidad(` +i+`)><strong style="font-size:30px">-</strong></button>
                </div>
                <div class="col-2">
                <p><strong><span id="moneda` +i+ `">` + producto.currency + `</span> <span id="unitario` +i+ `">` + producto.unitCost + `</span> </strong></p>
                </div>
                <div class="col-2">
                <p><strong>USD <span id="subtotal` +i+`">` + cambiarMoneda (producto.currency, producto.unitCost) + `</span></strong></p>
                </div>
            </div>
        </div>
        `

        document.getElementById("productos-seleccionados").innerHTML = htmlContentToAppend;
    }
    actualizarArray(array);
    for (i=1;i<=array.length;i++){
        actualizarPrecio(i);
    }
}
function finalizarCompra(){
    var direccion = document.getElementById("direccion").value;
    var numero = document.getElementById("numero").value;
    var departamento = document.getElementById("departamento").value;
    var localidad = document.getElementById("localidad").value;
    var cardNumber = document.getElementById("cardNumber").value;
    var cvv = document.getElementById("cvv").value;
    var expire = document.getElementById("expire").value;
    var name = document.getElementById("name").value;
    var cedula = document.getElementById("cedula").value;
    if (direccion != "" && numero !="" && departamento !="" && localidad !=""&& cardNumber !="" &&
     cvv !="" && expire !="" & name !=""&& cedula !=""){
        alert("Su compra a sido Exitosa")
    }
    else {
      alert("Error en su compra , Compruebe haber completado los campos obligatorios", "error")
    }
}
function porcentaje(){//Funciones que verifican el procentaje seleccionado
    for(i=1;i<4;i++){
        porcentajes.push(document.getElementById("envio"+i));
    }
}
function porcentageSelected(){
    for(i=0;i<porcentajes.length;i++){
        if(porcentajes[i].checked)
        {
            porcentajeSeleccionado = porcentajes[i].value;
        }
    }
    return parseFloat(porcentajeSeleccionado)
}
function calcular(indice){// Funcion que calcula el valor unitario
    return cantidades[indice].value * valorUnitario[indice]
}
function calculoProductos(){ //Calculo del total de todos los productos
    var gastoProductos = 0;
    for(i=0;i<subtotales.length;i++){
        gastoProductos += parseFloat(subtotales[i].innerHTML);
    }
    return gastoProductos
}
function aumentarCantidad(valor){//Funcion que aumenta cantidad de productos seleccionados
    var aux = valor-1;
    cantidades[aux].value = parseInt(cantidades[aux].value)+1;
    actualizarPrecio (valor);
}
function restarCantidad(valor){//Funcion que disminuye la cantidad de los productos seleccionados
    var aux = valor-1;
    if (cantidades[aux].value > 1){
        cantidades[aux].value = parseInt(cantidades[aux].value)-1;
    }
    actualizarPrecio (valor);
}
function cambiarMoneda(moneda,cantidades){//Funcion que cambia la moneda de pesos a dolares
    var resultado = cantidades;
    if(moneda=="UYU"){
        resultado = cantidades / 40;
    }
    return resultado;
}
function actualizarPrecio (indice){
    var aux = indice - 1;
    subtotales[aux].innerHTML = calcular(aux); 
    actualizarTotales()
}
function actualizarTotales(){
    totalProductos.innerHTML = calculoProductos();
    gastoPorcentaje.innerHTML = (calculoProductos() * porcentageSelected()) / 100;
    precioTotal.innerHTML = parseFloat(totalProductos.innerHTML) + parseFloat(gastoPorcentaje.innerHTML);
}
function actualizarArray(array){
    for(let i = 1; i <= array.length; i++){
        cantidades.push(document.getElementById("cantidad"+i));
        valorUnitario.push(parseFloat(cambiarMoneda(document.getElementById("moneda"+i).innerHTML, document.getElementById("unitario"+i).innerHTML)));
        subtotales.push(document.getElementById("subtotal"+i)); 
    }
    porcentaje();
}
function almacenoCarrito(){
    if(compras.length!= null){
        localStorage.setItem("productosEnCarro" , compras.length)
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
    compras = resultObj.data.articles;
    showSelectedProductsList(compras);
    almacenoCarrito();
    actualizarNombre();
    })});
