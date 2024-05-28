function slider() {
    const heroSection = document.querySelector(".hero");
    const prevBtn = document.querySelector(".fa-chevron-left");
    const nextBtn = document.querySelector(".fa-chevron-right");
    const imgs = ["../imgs/home-imgs/hero-img1.jpg", "../imgs/home-imgs/hero-img2.jpg", "../imgs/home-imgs/hero-img3.jpg"];
    let currentNoSlider = 0;

    function updateBackground() {
        heroSection.style.backgroundImage = `url(${imgs[currentNoSlider]})`;
    }

    function nextSlide() {
        currentNoSlider = (currentNoSlider + 1) % imgs.length;
        updateBackground();
    }

    function prevSlide() {
        currentNoSlider = (currentNoSlider - 1 + imgs.length) % imgs.length;
        updateBackground();
    }

    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);
}

slider();
