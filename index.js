function cartCount() {
  const cartCount = document.querySelector(".cart div");

  const cartItemsJSON = localStorage.getItem("selectedProduct-toCart");

  const cartItems = JSON.parse(cartItemsJSON);

  cartCount.textContent = cartItems ? cartItems.length : 0;
}

cartCount()
