// Smooth scrolling para links de anclaje y llamado a funcion de inicialización del carrusel
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#inicio') {
                if (href === '#inicio') {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
                return;
            }

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    initCarousel();
});

function initCarousel() {
    const wrapper = document.querySelector('.carousel-wrapper');
    if (!wrapper) return;

    // Los dots viven fuera de .carousel-wrapper (hermanos dentro de .container),
    // por eso se buscan desde una sección más arriba.
    const section = wrapper.closest('.por-que-apriori') || document;

    const cards = Array.from(wrapper.querySelectorAll('.carousel-card'));
    const dots = Array.from(section.querySelectorAll('.dot'));
    const prevBtn = wrapper.querySelector('.btn-prev');
    const nextBtn = wrapper.querySelector('.btn-next');

    if (cards.length === 0) return;

    let currentIndex = Math.max(0, cards.findIndex((card) => card.classList.contains('active')));
    let autoplayId = null;

    function goToSlide(index) {
        const newIndex = (index + cards.length) % cards.length;

        cards[currentIndex].classList.remove('active');
        if (dots[currentIndex]) dots[currentIndex].classList.remove('active');

        cards[newIndex].classList.add('active');
        if (dots[newIndex]) dots[newIndex].classList.add('active');

        currentIndex = newIndex;
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    function startAutoplay() {
        stopAutoplay();
        autoplayId = setInterval(nextSlide, 6000);
    }

    function stopAutoplay() {
        if (autoplayId) clearInterval(autoplayId);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startAutoplay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            startAutoplay();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            startAutoplay();
        });
    });

    startAutoplay();
}