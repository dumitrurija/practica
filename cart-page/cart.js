// adds products to cart from localStorage (selectedProduct-toCart)
function addProductsToCart() {
  const cartData = JSON.parse(localStorage.getItem("selectedProduct-toCart"))

  const cartProducts = document.querySelector(".cart-products")

  cartData.forEach(product => {
    const cartProduct = document.createElement("div")
    cartProduct.classList.add("cart-product")
    cartProducts.appendChild(cartProduct)

    const cartLeft = document.createElement("div")
    cartLeft.classList.add("cart-left")
    cartProduct.appendChild(cartLeft)

    const img = document.createElement("img")
    cartLeft.appendChild(img)

    const productDetails = document.createElement("div")
    productDetails.classList.add("product-details")
    cartLeft.appendChild(productDetails)

    const h2 = document.createElement("h2")
    productDetails.appendChild(h2)

    const h3 = document.createElement("h3")
    productDetails.appendChild(h3)

    const price = document.createElement("h2")
    price.classList.add("price")
    cartLeft.appendChild(price)

    const cartRight = document.createElement("div")
    cartRight.classList.add("cart-right")
    cartProduct.appendChild(cartRight)

    const i = document.createElement("i")
    i.setAttribute("class", "fa-solid fa-trash")
    cartRight.appendChild(i)

    // data into
    img.src = product.img
    h2.textContent = product.name
    h3.textContent = product.brand
    price.textContent = `$${product.price}`
  })
}

addProductsToCart()

function cartCount() {
  const cartCount = document.querySelector(".cart div")

  const cartItemsJSON = localStorage.getItem("selectedProduct-toCart")

  const cartItems = JSON.parse(cartItemsJSON)

  cartCount.textContent = cartItems ? cartItems.length : 0
}

cartCount()


// removes product by pressing trash icon
function removeProduct() {
  const trashIcons = document.querySelectorAll(".fa-trash")
  let cartData = JSON.parse(localStorage.getItem("selectedProduct-toCart"))

  trashIcons.forEach((trashIcon, idx) => {
    trashIcon.addEventListener("click", () => {
      if (cartData.length === 1) {
        cartData = []
      } else {
        cartData.splice(idx, 1)
      }

      localStorage.setItem("selectedProduct-toCart", JSON.stringify(cartData))

      trashIcon.parentNode.parentNode.remove()
      location.reload()
      cartCount()
      checkoutPrice()
    })
  })
}
removeProduct()

// calculates checkout price
function checkoutPrice() {
  const subtotalDOM = document.querySelector("#subtotal")
  const shippingDOM = document.querySelector("#shipping")
  const totalDOM = document.querySelector("#total")

  
  let cartData = JSON.parse(localStorage.getItem("selectedProduct-toCart"))


  let subtotal = 0
  let shipping = 5
  let total = 0

  if (cartData.length === 0) {
    subtotalDOM.textContent = `$`
    shippingDOM.textContent = `$`
    totalDOM.textContent = `$`
  } else {
    cartData.forEach(product => {
      subtotal += product.price
    })
  
    subtotalDOM.textContent = `$${subtotal.toFixed(2)}`
    shippingDOM.textContent = `$${shipping.toFixed(2)}`
    totalDOM.textContent = `$${(subtotal + shipping).toFixed(2)}`
  }
}
checkoutPrice()

// if no product, apply so the page has full height
function cartFullPage() {
  const cartItems = JSON.parse(localStorage.getItem("selectedProduct-toCart"))

  if (cartItems.length === 0 && window.innerWidth >= 1000 || cartItems.length === 1) {
    document.querySelector("main").style.margin = "200px 0"
  } else {
    document.querySelector("main").style.margin = "0"
  }
}

cartFullPage();


function checkoutPage() {
  const cartItems = JSON.parse(localStorage.getItem("selectedProduct-toCart")) || [];
  const checkoutBtn = document.querySelector(".checkout button");

  if (cartItems.length !== 0) {
    checkoutBtn.style.cursor = "pointer";
    checkoutBtn.disabled = false;
  } else {
    checkoutBtn.style.cursor = "not-allowed";
    checkoutBtn.disabled = true;
  }

  checkoutBtn.addEventListener("click", () => {
    if (cartItems.length === 0) return;

    // Define a media query
    const mediaQuery = window.matchMedia("(max-width: 600px)");

    let section = document.createElement("section");
    let productListHTML = '';

    cartItems.forEach(item => {
      productListHTML += `
        <div style="display: flex; justify-content: space-between; width: 100%;">
          <ul style="display: flex; list-style: none; gap: 10px; align-items: center; justify-content: space-between; width: 100%">
            <img src="${item.img}" style="width: 100px; height: 150px;">
            <li style="font-weight: 700">${item.name}</li>
            <li style-"font-weight: 700">${item.brand}</li>
            <li style-"font-weight: 900">$${item.price}</li>
          </ul>
        </div>
      `;
    });
    
    section.innerHTML = productListHTML;

    document.body.style.cssText = `
      max-width: 900px;
      margin: auto;
      margin-top: 50px;
      margin-bottom: 50px;
      box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.2);
      padding: 50px;
      border-radius: 10px;
    `;

    section.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: center;
      justify-content: center;
      margin-top: 50px;
    `;

    document.body.innerHTML = `
      <h1>Order Placed Successfully</h1>
      <h2>Cart Products:</h2>
    `;
    document.body.appendChild(section);

    // Apply media query styles if it matches
    if (mediaQuery.matches) {
      section.querySelectorAll("ul").forEach(ul => {
        ul.style.cssText = `
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          list-style:none;
        `;
      });

      section.querySelectorAll("div").forEach(div => {
        div.style.cssText = `
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        `;
      });
    }

    // Clear cart items from local storage
    localStorage.removeItem("selectedProduct-toCart");

    // Navigate to home page after 10 seconds
    setTimeout(() => {
      window.location.href = "../home-page/home.html";
    }, 10000);
  });
}

checkoutPage();




