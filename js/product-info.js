//Funcion para mostras informacion del producto seleccionado en este caso es el mismo para cualquier producto

var productInfo = {};

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productInfoImagesGallery").innerHTML = htmlContentToAppend;
    }
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productInfo = resultObj.data;

            let productInfoNameHTML  = document.getElementById("Name");
            let productInfoDescriptionHTML = document.getElementById("Description");
            let productInfoCostHTML = document.getElementById("Cost");
            let productInfoCurrencyHTML = document.getElementById("Currency");
            let productInfoSoldCountHTML = document.getElementById("soldCount");
            let productInfoCategoryHTML = document.getElementById("Category");
            let productInfoRelatedProductsHTML = document.getElementById("relatedProducts");

            productInfoNameHTML.innerHTML = productInfo.name;
            productInfoDescriptionHTML.innerHTML = productInfo.description;
            productInfoCostHTML.innerHTML = productInfo.cost;
            productInfoCurrencyHTML.innerHTML = productInfo.currency;
            productInfoSoldCountHTML.innerHTML = productInfo.soldCount;
            productInfoCategoryHTML.innerHTML = productInfo.category;
            productInfoRelatedProductsHTML.innerHTML= productInfo.relatedProducts;

            //Muestro las imagenes en forma de galería
            showImagesGallery(productInfo.images);

            

        }
    });
});
    
    function enviar(){
    var comentario=document.getElementById("comment").value;
    document.getElementById("comentarios").innerHTML='<p> '+ comentario +' </p>';  
}

document.addEventListener("DOMContentLoaded", function(e){

});