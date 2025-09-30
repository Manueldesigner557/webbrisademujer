// Menú Hamburguesa
document.addEventListener('DOMContentLoaded', function() {
    // Crear botón hamburguesa si no existe
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    // Verificar si el botón ya existe
    let menuToggle = document.querySelector('.menu-toggle');
    
    if (!menuToggle) {
        // Crear el botón hamburguesa
        menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.setAttribute('aria-label', 'Menú');
        menuToggle.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        
        // Insertar antes del nav
        header.insertBefore(menuToggle, nav);
    }
    
    // Toggle del menú
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Cerrar menú al hacer clic en un enlace
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Cerrar menú al hacer clic en el overlay (fuera del menú)
    document.addEventListener('click', function(e) {
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Cerrar menú al cambiar el tamaño de la ventana (si se pasa a desktop)
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 768) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }, 250);
    });
    
    // Prevenir scroll cuando el menú está abierto
    const preventScroll = (e) => {
        if (document.body.classList.contains('menu-open')) {
            e.preventDefault();
        }
    };
    
    // Agregar listeners para prevenir scroll en móvil
    document.addEventListener('touchmove', function(e) {
        if (document.body.classList.contains('menu-open') && 
            !nav.contains(e.target)) {
            e.preventDefault();
        }
    }, { passive: false });
});

// Animación suave para el scroll (opcional, mejora UX)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Actualizar contador del carrito (ejemplo)
function updateCartCount(count) {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = count;
        
        // Animación cuando cambia el número
        cartCount.style.transform = 'scale(1.3)';
        setTimeout(() => {
            cartCount.style.transform = 'scale(1)';
        }, 200);
    }
}

// Hacer visible el header en scroll (opcional - sticky header mejorado)
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.transform = 'translateY(0)';
        return;
    }
    
    // Si hace scroll hacia abajo y ya pasó el header
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Transición del header
header.style.transition = 'transform 0.3s ease';
// Funcionalidades adicionales al cargar el DOM
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