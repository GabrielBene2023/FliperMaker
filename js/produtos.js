document.addEventListener("DOMContentLoaded", function () {
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    const toggleCartButton = document.getElementById("toggle-cart-button");
    const cart = document.getElementById("cart");
    const cartItemCount = document.getElementById("cart-item-count");
    const productDetailsModal = document.getElementById(
        "product-details-modal"
    );

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
        { id: 1, name: "Produto 1", price: 100 },
        { id: 2, name: "Produto 2", price: 150 },
        { id: 3, name: "Produto 3", price: 80 },
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
            // Preencha os detalhes do produto no modal (substitua com informações reais)
            const modalContent =
                productDetailsModal.querySelector(".modal-content");
            modalContent.innerHTML = `
                <span class="close-modal" id="close-modal-button">&times;</span>
                <h2>${product.name}</h2>
                <p>Descrição do Produto ${product.id}.</p>
                <p class="price">Preço: R$ ${product.price.toFixed(2)}</p>
                <button class="add-to-cart">Adicionar ao Carrinho</button>
            `;

            // Abra o modal
            productDetailsModal.style.display = "block";

            const closeModalButton =
                productDetailsModal.querySelector(".close-modal");
            closeModalButton.addEventListener("click", () => {
                // Feche o modal
                productDetailsModal.style.display = "none";
            });

            // Adicione o evento para fechar o modal quando a tecla "Esc" for pressionada
            window.addEventListener("keydown", (event) => {
                if (event.key === "Escape") {
                    productDetailsModal.style.display = "none";
                }
            });
        });
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
});
