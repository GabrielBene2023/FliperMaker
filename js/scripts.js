document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slider");
    let slideIndex = 0;

    function nextSlide() {
        slideIndex++;
        if (slideIndex >= slider.children.length) {
            slideIndex = 0;
        }
        updateSlider();
    }

    function updateSlider() {
        slider.style.transform = `translateX(-${slideIndex * 100}%)`;
    }
    setInterval(nextSlide, 3000);
});
function openModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "block";
}

function closeModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
}

var openButton = document.getElementById("openModal");
openButton.addEventListener("click", openModal);

var closeButton = document.getElementById("closeModal");
closeButton.addEventListener("click", closeModal);

var itensNoCarrinho = document.querySelector(".itens-no-carrinho");
itensNoCarrinho.textContent = quantidadeItens;

var carrinho = {};

function adicionarAoCarrinho(nomeProduto, precoProduto) {
    if (carrinho[nomeProduto]) {
        carrinho[nomeProduto].quantidade++;
    } else {
        carrinho[nomeProduto] = {
            quantidade: 1,
            preco: precoProduto,
        };
    }

    atualizarQuantidadeNoCarrinho();
}

function atualizarQuantidadeNoCarrinho() {
    var totalItens = 0;

    for (var produto in carrinho) {
        totalItens += carrinho[produto].quantidade;
    }

    var itensNoCarrinho = document.querySelector(".itens-no-carrinho");
    itensNoCarrinho.textContent = totalItens;
}

var botoesAdicionar = document.querySelectorAll(".adicionar-ao-carrinho");

botoesAdicionar.forEach(function (botao) {
    botao.addEventListener("click", function (event) {
        var produto = event.target.closest(".produto");
        var nomeProduto = produto.querySelector("h2").textContent;
        var precoProdutoTexto =
            produto.querySelector("p:last-child").textContent;
        var precoProduto = parseFloat(
            precoProdutoTexto.replace("Preço: R$", "").replace(",", ".")
        );

        adicionarAoCarrinho(nomeProduto, precoProduto);
        event.preventDefault();
    });
});
