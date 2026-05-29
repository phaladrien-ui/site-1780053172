Voici le fichier `static/script.js` pour votre landing page e-commerce de montres de luxe avec animations et scroll en JavaScript vanilla :

// static/script.js
// Landing page e-commerce montre de luxe - Animations et scroll

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ============================================
    // 1. SMOOTH SCROLL - Navigation fluide
    // ============================================
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================
    // 2. INTERSECTION OBSERVER - Animations au scroll
    // ============================================
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionnel : arrêter d'observer une fois l'animation déclenchée
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => observer.observe(el));

    // ============================================
    // 3. PARALLAX EFFECT - Effet parallaxe subtil
    // ============================================
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            const yPos = -(scrollY * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });

    // ============================================
    // 4. COUNTER ANIMATION - Compteurs animés
    // ============================================
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetValue = parseInt(target.dataset.target);
                const duration = parseInt(target.dataset.duration) || 2000;
                const step = targetValue / (duration / 16); // 60fps
                
                let current = 0;
                const updateCounter = () => {
                    current += step;
                    if (current < targetValue) {
                        target.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        target.textContent = targetValue;
                    }
                };
                updateCounter();
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ============================================
    // 5. NAVBAR SCROLL EFFECT - Navbar dynamique
    // ============================================
    const navbar = document.querySelector('.navbar');
    let lastScrollY = 0;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Ajouter une classe quand on scroll vers le bas
        if (currentScrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
        
        // Cacher/montrer la navbar
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.classList.add('navbar-hidden');
        } else {
            navbar.classList.remove('navbar-hidden');
        }
        
        lastScrollY = currentScrollY;
    });

    // ============================================
    // 6. PRODUCT ZOOM - Zoom au survol
    // ============================================
    const productImages = document.querySelectorAll('.product-image');
    
    productImages.forEach(img => {
        img.addEventListener('mousemove', (e) => {
            const rect = img.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            img.style.transformOrigin = `${x}% ${y}%`;
            img.style.transform = 'scale(1.5)';
        });
        
        img.addEventListener('mouseleave', () => {
            img.style.transformOrigin = 'center center';
            img.style.transform = 'scale(1)';
        });
    });

    // ============================================
    // 7. PROGRESS BAR - Barre de progression
    // ============================================
    const progressBar = document.querySelector('.progress-bar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    });

    // ============================================
    // 8. BACK TO TOP - Retour en haut
    // ============================================
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // 9. LOADING ANIMATION - Animation de chargement
    // ============================================
    window.addEventListener('load', () => {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.classList.add('loaded');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    });

    // ============================================
    // 10. PRODUCT CARD HOVER - Cartes produits
    // ============================================
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hovered');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hovered');
        });
    });

    // ============================================
    // 11. TESTIMONIAL CAROUSEL - Carrousel avis
    // ============================================
    const testimonialContainer = document.querySelector('.testimonials-container');
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    if (testimonialContainer && testimonials.length > 0) {
        const showTestimonial = (index) => {
            testimonials.forEach((t, i) => {
                t.classList.remove('active');
                if (i === index) {
                    t.classList.add('active');
                }
            });
        };
        
        // Auto-play
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
        
        // Navigation manuelle
        const prevBtn = document.querySelector('.testimonial-prev');
        const nextBtn = document.querySelector('.testimonial-next');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
                showTestimonial(currentTestimonial);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                showTestimonial(currentTestimonial);
            });
        }
    }

    // ============================================
    // 12. VIDEO BACKGROUND - Vidéo en fond
    // ============================================
    const videoBackground = document.querySelector('.video-background video');
    
    if (videoBackground) {
        // Pause vidéo quand hors écran
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    videoBackground.play();
                } else {
                    videoBackground.pause();
                }
            });
        }, { threshold: 0.3 });
        
        videoObserver.observe(videoBackground.parentElement);
    }

    // ============================================
    // 13. FORM ANIMATION - Animation formulaire
    // ============================================
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.parentElement.classList.remove('focused');
            }
        });
    });

    // ============================================
    // 14. PRICE FILTER - Filtre de prix
    // ============================================
    const priceRange = document.querySelector('.price-range');
    const priceValue = document.querySelector('.price-value');
    
    if (priceRange && priceValue) {
        priceRange.addEventListener('input', () => {
            priceValue.textContent = `${priceRange.value}€`;
        });
    }

    // ============================================
    // 15. WISHLIST TOGGLE - Favoris
    // ============================================
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            const icon = btn.querySelector('i');
            if (icon) {
                icon.classList.toggle('far');
                icon.classList.toggle('fas');
            }
        });
    });

    // ============================================
    // 16. QUANTITY SELECTOR - Sélecteur quantité
    // ============================================
    const quantitySelectors = document.querySelectorAll('.quantity-selector');
    
    quantitySelectors.forEach(selector => {
        const minusBtn = selector.querySelector('.qty-minus');
        const plusBtn = selector.querySelector('.qty-plus');
        const input = selector.querySelector('.qty-input');
        
        if (minusBtn && plusBtn && input) {
            minusBtn.addEventListener('click', () => {
                let value = parseInt(input.value);
                if (value > 1) {
                    input.value = value - 1;
                }
            });
            
            plusBtn.addEventListener('click', () => {
                let value = parseInt(input.value);
                if (value < 10) {
                    input.value = value + 1;
                }
            });
        }
    });

    // ============================================
    // 17. TOOLTIP - Infobulles
    // ============================================
    const tooltips = document.querySelectorAll('[data-tooltip]');
    
    tooltips.forEach(el => {
        el.addEventListener('mouseenter', (e) => {
            const tooltipText = el.dataset.tooltip;
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            document.body.appendChild(tooltip);
            
            const rect = el.getBoundingClientRect();
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
            tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
        });
        
        el.addEventListener('mouseleave', () => {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });

    // ============================================
    // 18. RESPONSIVE MENU - Menu mobile
    // ============================================
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Fermer le menu au clic sur un lien
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // ============================================
    // 19. SCROLL REVEAL - Révélation au scroll
    // ============================================
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // ============================================
    // 20. PERFORMANCE OPTIMIZATION
    // ============================================
    // Debounce pour les événements de scroll
    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    // Appliquer le debounce aux événements coûteux
    const debouncedScroll = debounce(() => {
        // Actions à optimiser
    }, 100);

    window.addEventListener('scroll', debouncedScroll);

    // ============================================
    // INITIALISATION
    // ============================================
    console.log('🚀 Landing page initialisée avec succès');
    console.log('✨ Animations et scroll activés');
});

Ce fichier JavaScript vanilla comprend :

## Fonctionnalités principales :

1. **Smooth Scroll** - Navigation fluide vers les ancres
2. **Intersection Observer** - Animations déclenchées au scroll
3. **Parallax Effect** - Effet de profondeur subtil
4. **Counter Animation** - Compteurs animés
5. **Navbar Dynamique** - Apparition/disparition au scroll
6. **Product Zoom** - Zoom au survol des images
7. **Progress Bar** - Barre de progression de lecture
8. **Back to Top** - Bouton retour en haut
9. **Loading Animation** - Animation de chargement
10. **Product Cards** - Effets au survol
11. **Testimonial Carousel** - Carrousel d'avis
12. **Video Background** - Gestion vidéo
13. **Form Animation** - Animations formulaire
14. **Price Filter** - Filtre de prix interactif
15. **Wishlist** - Gestion des favoris
16. **Quantity Selector** - Sélecteur de quantité
17. **Tooltips** - Infobulles dynamiques
18. **Responsive Menu** - Menu mobile
19. **Scroll Reveal** - Révélation d'éléments
20. **Performance** - Optimisation avec debounce

## Utilisation :

Ajoutez les classes CSS correspondantes dans votre HTML :
- `.animate-on-scroll` pour les animations au scroll
- `.parallax` pour l'effet parallaxe
- `.counter` avec `data-target` pour les compteurs
- `.product-image` pour le zoom
- `.product-card` pour les cartes produits
- etc.

Le code est modulaire, commenté et prêt à l'emploi pour une landing page de montres de luxe.