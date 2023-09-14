document.addEventListener("DOMContentLoaded", function () {
    const carouselContainer = document.querySelector(".carousel-container");
    const carouselSlides = document.querySelectorAll(".carousel-slide");
    const prevButton = document.getElementById("prev-slide");
    const nextButton = document.getElementById("next-slide");

    let currentIndex = 0;
    let intervalId; // Variável para armazenar o intervalo

    function showSlide(index) {
        if (index < 0) {
            currentIndex = carouselSlides.length - 1;
        } else if (index >= carouselSlides.length) {
            currentIndex = 0;
        }

        carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function startAutoSlide() {
        intervalId = setInterval(() => {
            currentIndex++;
            showSlide(currentIndex);
        }, 3000); // Altere o valor (em milissegundos) para ajustar a velocidade de rotação automática
    }

    function stopAutoSlide() {
        clearInterval(intervalId);
    }

    prevButton.addEventListener("click", () => {
        currentIndex--;
        showSlide(currentIndex);
        stopAutoSlide(); // Pare a rotação automática quando a navegação manual é usada
    });

    nextButton.addEventListener("click", () => {
        currentIndex++;
        showSlide(currentIndex);
        stopAutoSlide(); // Pare a rotação automática quando a navegação manual é usada
    });

    // Inicie o carrossel na primeira imagem
    showSlide(currentIndex);

    // Inicie a rotação automática
    startAutoSlide();
});
