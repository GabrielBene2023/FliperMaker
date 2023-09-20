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

    // Configure um temporizador para mudar automaticamente os slides a cada 3 segundos (ajuste conforme necessário)
    setInterval(nextSlide, 3000);
});
// Função para abrir o modal do carrinho
function openModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "block";
}

// Função para fechar o modal do carrinho
function closeModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
}

// Evento de clique para abrir o modal do carrinho
var openButton = document.getElementById("openModal");
openButton.addEventListener("click", openModal);

// Evento de clique para fechar o modal do carrinho
var closeButton = document.getElementById("closeModal");
closeButton.addEventListener("click", closeModal);

// Atualizar a quantidade de itens no carrinho (substitua 0 pelo número real)
var quantidadeItens = 0; // Substitua 0 pela quantidade real de itens no carrinho
var itensNoCarrinho = document.querySelector(".itens-no-carrinho");
itensNoCarrinho.textContent = quantidadeItens;

// Variável para manter o estado atual do carrinho (pode ser um objeto para armazenar detalhes do produto)
var carrinho = {};

// Função para adicionar um produto ao carrinho
function adicionarAoCarrinho(nomeProduto, precoProduto) {
    if (carrinho[nomeProduto]) {
        // Se o produto já estiver no carrinho, aumente a quantidade
        carrinho[nomeProduto].quantidade++;
    } else {
        // Se o produto não estiver no carrinho, adicione-o
        carrinho[nomeProduto] = {
            quantidade: 1,
            preco: precoProduto
        };
    }

    // Atualize a quantidade de itens no carrinho
    atualizarQuantidadeNoCarrinho();
}

// Função para atualizar a quantidade de itens no carrinho
function atualizarQuantidadeNoCarrinho() {
    var totalItens = 0;

    for (var produto in carrinho) {
        totalItens += carrinho[produto].quantidade;
    }

    // Atualize a quantidade de itens no ícone do carrinho
    var itensNoCarrinho = document.querySelector(".itens-no-carrinho");
    itensNoCarrinho.textContent = totalItens;
}

// Evento de clique para o botão "Adicionar ao Carrinho" em cada produto
var botoesAdicionar = document.querySelectorAll(".adicionar-ao-carrinho");

botoesAdicionar.forEach(function(botao) {
    botao.addEventListener("click", function(event) {
        var produto = event.target.closest(".produto");
        var nomeProduto = produto.querySelector("h2").textContent;
        var precoProdutoTexto = produto.querySelector("p:last-child").textContent;
        var precoProduto = parseFloat(precoProdutoTexto.replace("Preço: R$", "").replace(",", "."));

        // Adicione o produto ao carrinho
        adicionarAoCarrinho(nomeProduto, precoProduto);

        // Você pode exibir uma mensagem ou realizar outras ações aqui, se desejar

        // Impedir o comportamento padrão do botão (evitar que a página seja recarregada)
        event.preventDefault();
    });
});
