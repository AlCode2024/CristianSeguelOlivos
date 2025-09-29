// Scroll suave y drawer
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e){
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });

        drawer.classList.remove('open');
        overlay.classList.remove('active');
    });
});

// Toggle drawer y overlay
const menuToggle = document.getElementById('menu-toggle');
const drawer = document.getElementById('drawer');
const overlay = document.getElementById('overlay');

menuToggle.addEventListener('click', () => {
    drawer.classList.toggle('open');
    overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
});

// Slider automático
const slides = document.querySelectorAll('.slider-container .slide');
let currentSlide = 0;

function showNextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Cambiar cada 1 segundo
setInterval(showNextSlide, 2000);
