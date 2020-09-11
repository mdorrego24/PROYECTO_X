var productInfo = {};
var prodRel = {};

function showImagesGallery(array){//funcion para mostrar las imagenes en forma de galeria

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
document.addEventListener("DOMContentLoaded", function(e){//funcion que ejecuta la extraccion de informacion del json y se muestra en el html
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productInfo = resultObj.data;

            let productInfoNameHTML  = document.getElementById("Name");
            let productInfoDescriptionHTML = document.getElementById("Description");
            let productInfoCurrencyCostHTML = document.getElementById("CurrencyCost");
            let productInfoSoldCountHTML = document.getElementById("soldCount");
            let productInfoCategoryHTML = document.getElementById("Category");

            productInfoNameHTML.innerHTML = productInfo.name;
            productInfoDescriptionHTML.innerHTML = productInfo.description;
            productInfoCurrencyCostHTML.innerHTML = productInfo.currency + " " + productInfo.cost;
            productInfoSoldCountHTML.innerHTML = productInfo.soldCount;
            productInfoCategoryHTML.innerHTML = productInfo.category;


            showImagesGallery(productInfo.images);

                        


            

            }
    });
    function showRelatedProducts(array){// funcion para mostrar los productos relacionados

    
        let htmlContentToAppend = "";
    
        for (let i = 0; i < array.length; i++) {
            var relIndex = array[i];
            var relProd = prodRel[relIndex];
        
            htmlContentToAppend += `
            <div class="col-lg-3 col-md-4 col-6">
                <div class="d-block mb-4 h-100">
                    <img class="img-fluid img-thumbnail" src="` + relProd.imgSrc + `" alt="">
                <h4 class="mb-1">`+ relProd.name +`</h4>
                <p class="mb-1">` + relProd.description + `</p>
                <a href="product-info.html">Ver producto</a>
                </div>
            </div>
            `
        }
            document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
    }

    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok") 
        
        {
             prodRel = resultObj.data; }

        showRelatedProducts(productInfo.relatedProducts);
    });
});



function showStars(stars){// funcion para mostrar la puntuacion de los usuarios sacados del json en forma de estrellas

    let estrellas  = "";

    for(let i = 0; i < stars; i++){
        estrellas += `<span style="font-size: 30px; color:orange;">★</span>`
    }
    for(let i = stars; i < 5; i++){
        estrellas += `<span style="font-size: 30px; color: grey;">★</span>`
    }
    return estrellas
}


document.addEventListener("DOMContentLoaded", function(e){//funcion de extraccion de comentarios 
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
           
           var infoComments = resultObj.data;
           console.log(infoComments);

           for(let comentario of infoComments) {
               let comentariosDOM = document.getElementById("comentariosDOM");
               comentariosDOM.innerHTML += `
                <p><b>${comentario.user}</b>${" " + comentario.dateTime + " "} ${showStars(parseInt(comentario.score))}</p>
                <p>${comentario.description}</p><br><hr><br>
               `;
           }
           
        }
    });
});