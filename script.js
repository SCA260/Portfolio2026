// Animation fluide au scroll (Intersection Observer)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Se déclenche quand 15% de l'élément est visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Optionnel : arrête d'observer une fois affiché
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(element => {
    observer.observe(element);
});

// Menu Burger (Optionnel pour mobile)
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

if(burger) {
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
    });
}

// --- CARROUSEL DE PROJETS (Avec Auto-Slide) ---
const carousels = document.querySelectorAll('.carousel-container');

carousels.forEach(carousel => {
    const slides = carousel.querySelectorAll('.carousel-slide');
    if(slides.length <= 1) return;
    const btnPrev = carousel.querySelector('.prev');
    const btnNext = carousel.querySelector('.next');
    let currentSlide = 0;
    let slideInterval; // On crée une variable pour stocker notre chrono

    // Fonction pour afficher une image précise
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    // Fonction pour passer à l'image suivante
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Fonction pour passer à l'image précédente
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // --- NOUVEAUTÉ : Lancement du défilement automatique ---
    function startSlideShow() {
        // Change d'image toutes les 3000 millisecondes (3 secondes)
        slideInterval = setInterval(nextSlide, 3000); 
    }

    // --- NOUVEAUTÉ : Réinitialiser le chrono ---
    function resetInterval() {
        clearInterval(slideInterval); // On arrête le chrono actuel
        startSlideShow(); // On en relance un nouveau de 3 secondes
    }

    // Clic sur le bouton Suivant
    if (btnNext) {
        btnNext.addEventListener('click', () => {
            nextSlide();
            resetInterval(); // Remet le chrono à zéro au clic
        });
    }

    // Clic sur le bouton Précédent
    if (btnPrev) {
        btnPrev.addEventListener('click', () => {
            prevSlide();
            resetInterval(); // Remet le chrono à zéro au clic
        });
    }

    // On démarre le carrousel automatique dès le chargement de la page
    startSlideShow();
});