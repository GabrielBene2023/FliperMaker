document.addEventListener("DOMContentLoaded", function () {
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    const toggleCartButton = document.getElementById("toggle-cart-button");
    const cart = document.getElementById("cart");
    const cartItemCount = document.getElementById("cart-item-count");
    const productDetailsModal = document.getElementById(
        "product-details-modal"
    );
    const checkoutForm = document.getElementById("checkout-form");
    const returnHomeButton = document.getElementById("return-home-button");
    const checkoutButton = document.getElementById("checkout-button");

    let isCartVisible = false;

    toggleCartButton.addEventListener("click", () => {
        isCartVisible = !isCartVisible;
        if (isCartVisible) {
            cart.classList.add("visible");
        } else {
            cart.classList.remove("visible");
        }
    });

    const products = [
        { id: 1, name: "Produto 1", price: 3500 },
        { id: 2, name: "Produto 2", price: 1600 },
    ];

    products.forEach((product, index) => {
        const productSection = document.querySelectorAll(".product")[index];
        const addToCartButton = productSection.querySelector(".add-to-cart");
        const openProductDetailsButton = productSection.querySelector(
            ".open-product-details"
        );

        addToCartButton.addEventListener("click", () => {
            const existingCartItem = Array.from(cartItems.children).find(
                (item) => item.dataset.id === String(product.id)
            );

            if (existingCartItem) {
                const quantityElement =
                    existingCartItem.querySelector(".quantity");
                const quantity = parseInt(quantityElement.textContent, 10) + 1;
                quantityElement.textContent = quantity;
                updateCartItemTotal(existingCartItem);
            } else {
                const cartItem = document.createElement("li");
                cartItem.className = "cart-item";
                cartItem.dataset.id = String(product.id);
                cartItem.innerHTML = `
                    <span>${product.name}</span>
                    <span class="quantity">1</span>
                    <span class="price" data-price="${
                        product.price
                    }">R$ ${product.price.toFixed(2)}</span>
                    <button class="remove-from-cart">X</button>
                `;

                cartItems.appendChild(cartItem);
                attachRemoveEvent(cartItem);
            }

            updateCartTotal();
            updateCartItemCount();
        });

        openProductDetailsButton.addEventListener("click", () => {
            const name = productSection.querySelector("h2").textContent;
            const description = productSection.querySelector("p").textContent;
            const priceText =
                productSection.querySelector(".price").textContent;
            const price = parseFloat(
                priceText.replace("Preço: R$ ", "").replace(",", ".")
            );
            openProductDetails(name, description, price);
        });
    });

    checkoutForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const address = document.getElementById("address").value;

        console.log("Compra Confirmada:");
        console.log("Nome: " + name);
        console.log("E-mail: " + email);
        console.log("Endereço de Entrega: " + address);
    });

    returnHomeButton.addEventListener("click", () => {
        window.location.href = "inicio.html";
    });

    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && isCartVisible) {
            cart.classList.remove("visible");
            isCartVisible = false;
        }
    });

    function attachRemoveEvent(cartItem) {
        const removeButton = cartItem.querySelector(".remove-from-cart");
        removeButton.addEventListener("click", () => {
            const quantityElement = cartItem.querySelector(".quantity");
            const quantity = parseInt(quantityElement.textContent, 10);
            if (quantity > 1) {
                quantityElement.textContent = quantity - 1;
                updateCartItemTotal(cartItem);
            } else {
                cartItems.removeChild(cartItem);
            }
            updateCartTotal();
            updateCartItemCount();
        });
    }

    function updateCartItemCount() {
        const itemCount = Array.from(cartItems.children)
            .map((item) =>
                parseInt(item.querySelector(".quantity").textContent, 10)
            )
            .reduce((acc, quantity) => acc + quantity, 0);

        cartItemCount.textContent = itemCount;
    }

    function updateCartItemTotal(cartItem) {
        const quantity = parseInt(
            cartItem.querySelector(".quantity").textContent,
            10
        );
        const price = parseFloat(
            cartItem.querySelector(".price").dataset.price
        );
        const totalItemPrice = quantity * price;
        cartItem.querySelector(
            ".price"
        ).textContent = `R$ ${totalItemPrice.toFixed(2)}`;
    }

    function updateCartTotal() {
        const total = Array.from(cartItems.querySelectorAll(".price"))
            .map(
                (item) =>
                    parseFloat(item.dataset.price) *
                    parseInt(
                        item.parentElement.querySelector(".quantity")
                            .textContent,
                        10
                    )
            )
            .reduce((acc, price) => acc + price, 0);

        totalPrice.textContent = `Total: R$ ${total.toFixed(2)}`;
    }

    function openProductDetails(name, description, price) {
        const modalContent =
            productDetailsModal.querySelector(".modal-content");
        modalContent.innerHTML = `
            <span class="close-modal" id="close-modal-button">&times;</span>
            <h2>${name}</h2>
            <p class="description">${description}</p>
            <p class="price">Preço: R$ ${price.toFixed(2)}</p>
            <button class="add-to-cart">Adicionar ao Carrinho</button>
        `;

        const descriptionElement = modalContent.querySelector(".description");
        descriptionElement.style.display = "block";

        productDetailsModal.style.display = "block";

        const closeModalButton =
            productDetailsModal.querySelector(".close-modal");
        closeModalButton.addEventListener("click", () => {
            productDetailsModal.style.display = "none";
        });

        window.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                productDetailsModal.style.display = "none";
            }
        });
    }

    checkoutButton.addEventListener("click", () => {
        checkoutModal.style.display = "block";
    });

    closeCheckoutModalButton.addEventListener("click", () => {
        checkoutModal.style.display = "none";
    });

    checkoutForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const address = document.getElementById("address").value;

        console.log("Compra Confirmada:");
        console.log("Nome: " + name);
        console.log("E-mail: " + email);
        console.log("Endereço de Entrega: " + address);

        checkoutModal.style.display = "none";
    });
});
