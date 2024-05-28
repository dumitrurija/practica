
// Fetch data from JSON file
fetch("../data.json")
    .then((response) => response.json())
    .then((data) => {
        showData(data) 
        dropdownToggle();
        checkboxesBrand(data);
        priceFilter(data);
        saveProductToProductPage(data);
        saveProductToCartPage(data);
        createPagination(data);
    })
    .catch((error) => console.log(error));

// Function to display data based on current page
function showData(data) {
    const shopProductsContainer = document.querySelector(".shop-products");
    shopProductsContainer.innerHTML = ""; // Clear previous content

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);

    for (let i = 0; i < paginatedData.length; i++) {
        const shopProduct = document.createElement("div");
        shopProduct.classList.add("shop-product");
        const img = document.createElement("img");
        const productDesc = document.createElement("div");
        productDesc.classList.add("product-desc");
        const productTitle = document.createElement("div");
        productTitle.classList.add("product-title");
        const h3 = document.createElement("h3");
        const h4 = document.createElement("h4");
        const span = document.createElement("span");
        const addToCartBtn = document.createElement("div");
        addToCartBtn.classList.add("add-to-cart");
        addToCartBtn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i>`;
        const a = document.createElement("a");
        a.href = "../product-page/product.html";
        shopProductsContainer.appendChild(shopProduct);
        shopProduct.appendChild(a);
        a.appendChild(img);
        a.appendChild(productDesc);
        productDesc.appendChild(productTitle);
        productDesc.appendChild(span);
        productDesc.appendChild(addToCartBtn);
        productTitle.appendChild(h3);
        productTitle.appendChild(h4);
        img.src = paginatedData[i].img;
        h3.textContent = paginatedData[i].name;
        h4.textContent = paginatedData[i].brand;
        span.textContent = `$${paginatedData[i].price.toFixed(2)}`;
    }
}

// Constants for pagination
const productsPerPage = 6;
let currentPage = 1;

// Function to create pagination controls
function createPagination(data) {
    const paginationContainer = document.querySelector(".pagination");
    const totalPages = Math.ceil(data.length / productsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.addEventListener("click", () => {
            currentPage = i;
            showData(data);
            updateActivePageButton();
            priceFilter(data);
            checkboxesBrand(data)
        });
        paginationContainer.appendChild(pageButton);
    }

    updateActivePageButton();
}


// Function to update the active page button
function updateActivePageButton() {
    const pageButtons = document.querySelectorAll(".pagination button");
    pageButtons.forEach((button, index) => {
        if (index + 1 === currentPage) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });
}


// Filter dropdown toggle
function dropdownToggle() {
    const dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach(dropdown => {
        const dropdownIcon = dropdown.querySelector("i");
        const associatedElements = dropdown.parentElement.querySelectorAll(".brand-name, #priceRange");

        dropdownIcon.addEventListener("click", () => {
            const menuStatus = dropdownIcon.classList.contains("fa-caret-down");

            if (menuStatus) {
                dropdownIcon.classList.remove("fa-caret-down");
                dropdownIcon.classList.add("fa-caret-up");
            } else {
                dropdownIcon.classList.remove("fa-caret-up");
                dropdownIcon.classList.add("fa-caret-down");
            }

            associatedElements.forEach(element => {
                if (menuStatus) {
                    element.style.display = "none";
                } else {
                    element.style.display = "flex";
                }
            });
        });
    });
}

// Filter by brand name
function checkboxesBrand(data) {
    const checkboxes = document.querySelectorAll(".filter-brand input[type=checkbox]");
    const products = document.querySelectorAll(".shop-product");

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            const selectedBrands = Array.from(checkboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.previousElementSibling.textContent.trim())

            if (selectedBrands.length === 0) {
                products.forEach(product => {
                    product.style.display = "block";
                });
            } else {
                products.forEach(product => {
                    const productBrand = product.querySelector(".product-title h4").textContent.trim();
                    const isVisible = selectedBrands.includes(productBrand);
                    product.style.display = isVisible ? "block" : "none";
                });
            }
        });
    });
}

// Filter by price radius
function priceFilter(data) {
    const priceRadiusDOM = document.getElementById("priceRange");
    const checkboxes = document.querySelectorAll(".filter-brand input[type=checkbox]");
    const products = document.querySelectorAll(".shop-product");
    const minPrice = 0;
    const maxPrice = 200;

    priceRadiusDOM.setAttribute("min", minPrice);
    priceRadiusDOM.setAttribute("max", maxPrice);

    priceRadiusDOM.addEventListener("input", () => {
        const selectedBrands = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.previousElementSibling.textContent.trim());

        // Calculate the range of product indices to consider based on pagination
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = Math.min(startIndex + productsPerPage, data.length);

        for (let i = 0; i < products.length; i++) {
            const dataIndex = startIndex + i;
            if (dataIndex < endIndex) {
                const product = data[dataIndex];
                const productBrand = product.brand;
                const isVisibleBrand = selectedBrands.length === 0 || selectedBrands.includes(productBrand);
                const isVisiblePrice = parseInt(priceRadiusDOM.value) >= product.price;
                products[i].style.display = isVisibleBrand && isVisiblePrice ? "block" : "none";
            } else {
                products[i].style.display = "none"; // Hide excess products
            }
        }
    });
}





// Saves product when clicked and displays to product.html
function saveProductToProductPage(data) {
    const products = document.querySelectorAll(".shop-product");

    products.forEach((product, index) => {
        product.addEventListener("click", () => {
            let productSelected = [];
            productSelected.push(data[index]);
            localStorage.setItem("productSelected", JSON.stringify(productSelected));
        });
    });
}

function saveProductToCartPage(data) {
    const addToCartBtns = document.querySelectorAll(".add-to-cart");
    const cartCount = document.querySelector(".cart div");

    let cartData = JSON.parse(localStorage.getItem("selectedProduct-toCart")) || [];

    addToCartBtns.forEach((addToCartBtn, idx) => {
        addToCartBtn.addEventListener("click", (event) => {
            event.preventDefault();

            const selectedProduct = {
                name: data[idx].name,
                brand: data[idx].brand,
                price: data[idx].price,
                img: data[idx].img
            };

            cartData.push(selectedProduct);

            localStorage.setItem("selectedProduct-toCart", JSON.stringify(cartData));

            cartCount.textContent = cartData.length;
        });
    });
}
