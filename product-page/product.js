

function displaySelectedProduct() {
    const productImg = document.querySelector(".product-left img")
    const productTitle = document.querySelector(".product-title h1")
    const productBrand = document.querySelector(".product-title h4")
    const productPrice = document.querySelector("#buy-now")
    const productDesc = document.querySelector(".desc p")
    const productVideo = document.querySelector("iframe")

    productImg.src = JSON.parse(localStorage.getItem("productSelected"))[0].img;
    productTitle.textContent = JSON.parse(localStorage.getItem("productSelected"))[0].name
    productBrand.textContent = JSON.parse(localStorage.getItem("productSelected"))[0].brand
    productPrice.textContent = `$${JSON.parse(localStorage.getItem("productSelected"))[0].price}`
    productDesc.innerHTML = JSON.parse(localStorage.getItem("productSelected"))[0].description
    productVideo.src = JSON.parse(localStorage.getItem("productSelected"))[0].video
}

displaySelectedProduct()

function addToCart() {
    const addToCartBtn = document.querySelector("#add-to-cart");
    let cartData = JSON.parse(localStorage.getItem("selectedProduct-toCart")) || [];

    const img = document.querySelector(".product-left img").src;
    const name = document.querySelector(".product-title h1").textContent;
    const brand = document.querySelector(".product-title h4").textContent;
    const price = parseFloat(document.querySelector("#buy-now").textContent.replace("$", ""));
    

    addToCartBtn.addEventListener("click", () => {
        // Create an object representing the product
        const product = {
            name: name,
            brand: brand,
            price: price,
            img: img
        };

        cartData.push(product);

        localStorage.setItem("selectedProduct-toCart", JSON.stringify(cartData));
        
     cartCount()
    });
}

addToCart();

function cartCount() {
    const cartCount = document.querySelector(".cart div")
  
    const cartItemsJSON = localStorage.getItem("selectedProduct-toCart")
  
    const cartItems = JSON.parse(cartItemsJSON)
  
    cartCount.textContent = cartItems ? cartItems.length : 0
}
  
  cartCount()


function buyNow() {
    const buyNowBtn = document.querySelector("#buy-now");
    const img = document.querySelector(".product-left img").src;
    const name = document.querySelector(".product-title h1").textContent;
    const brand = document.querySelector(".product-title h4").textContent;
    const price = parseFloat(document.querySelector("#buy-now").textContent.replace("$", ""));
    
    buyNowBtn.addEventListener("click", () => {
        // Create an object representing the product
        const product = {
            name: name,
            brand: brand,
            price: price,
            img: img
        };

        // Clear existing items in the cart
        localStorage.removeItem("selectedProduct-toCart");

        // Add the new product to the cart
        localStorage.setItem("selectedProduct-toCart", JSON.stringify([product]));

        
        cartCount()

        window.location = "../cart-page/cart.html"
    });
}


buyNow()