document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            menu.classList.toggle('active');
        });
    }
    
    // Funcionalidad del carrito
    const cartButtons = document.querySelectorAll('.cart-icon');
    const cartCount = document.querySelector('.cart-count');
    let count = 0;
    
    cartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            count++;
            cartCount.textContent = count;
        });
    });
    
    // Animación de productos al hacer scroll
    const productCards = document.querySelectorAll('.product-card');
    
    function checkScroll() {
        productCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight * 0.8) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Inicializar estilos para animación
    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Verificar scroll inicial y añadir listener
    checkScroll();
    window.addEventListener('scroll', checkScroll);
});

(function() {
    'use strict';
    
    // Fade-in al cargar la página
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        requestAnimationFrame(function() {
            document.body.style.transition = 'opacity 0.5s ease-in-out';
            document.body.style.opacity = '1';
        });
    });

    // Interceptar clics en enlaces de navegación
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href]');
        
        if (!link) return;
        
        const href = link.getAttribute('href');
        
        if (href && 
            !href.startsWith('#') && 
            !href.startsWith('http') && 
            !href.startsWith('mailto:') &&
            !link.hasAttribute('target')) {
            
            e.preventDefault();
            document.body.classList.add('fade-out');
            
            setTimeout(function() {
                window.location.href = href;
            }, 500);
        }
    });
})();