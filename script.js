// Mobile Navigation
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
    mobileNavOverlay.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
});

mobileNavOverlay.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    mobileNav.classList.remove('active');
    mobileNavOverlay.classList.remove('active');
    document.body.style.overflow = '';
});

// Close mobile nav when clicking a link
document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Gallery Modal
const modal = document.getElementById('gallery-modal');
const modalImage = document.getElementById('modal-image');
const modalClose = document.querySelector('.modal-close');
const modalPrev = document.querySelector('.modal-prev');
const modalNext = document.querySelector('.modal-next');
const modalCounter = document.querySelector('.modal-counter');

let currentGallery = [];
let currentIndex = 0;

// Open gallery
document.querySelectorAll('.gallery-item:not(.gallery-video):not(.gallery-link)').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const galleryName = item.dataset.gallery;
        const count = parseInt(item.dataset.count);
        openGallery(galleryName, count);
    });
});

function openGallery(name, count) {
    currentGallery = [];
    for (let i = 1; i <= count; i++) {
        currentGallery.push(`./assets/gallery/full/${name}${i}.jpg`);
    }
    currentIndex = 0;
    showImage();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function showImage() {
    if (currentGallery.length === 0) return;
    modalImage.src = currentGallery[currentIndex];
    modalCounter.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
}

function nextImage() {
    if (currentGallery.length === 0) return;
    currentIndex = (currentIndex + 1) % currentGallery.length;
    showImage();
}

function prevImage() {
    if (currentGallery.length === 0) return;
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    showImage();
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    currentGallery = [];
}

// Modal controls
modalClose.addEventListener('click', closeModal);
modalNext.addEventListener('click', nextImage);
modalPrev.addEventListener('click', prevImage);

// Close modal on background click
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    
    switch(e.key) {
        case 'Escape':
            closeModal();
            break;
        case 'ArrowRight':
            nextImage();
            break;
        case 'ArrowLeft':
            prevImage();
            break;
    }
});

// Touch swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

modal.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

modal.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
        nextImage();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
        prevImage();
    }
}

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add stagger animation to gallery items
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 50);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.gallery-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(item);
});

// Performance optimization: Preload next/prev images in gallery
function preloadImages() {
    if (currentGallery.length === 0) return;
    
    const nextIndex = (currentIndex + 1) % currentGallery.length;
    const prevIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    
    const nextImg = new Image();
    nextImg.src = currentGallery[nextIndex];
    
    const prevImg = new Image();
    prevImg.src = currentGallery[prevIndex];
}

// Call preload when showing an image
const originalShowImage = showImage;
showImage = function() {
    originalShowImage();
    setTimeout(preloadImages, 100);
};

// Console message
console.info(`Willkommen in der Entwicklerkonsole
    ,~~.
    (  6 )-_,
(\\___ )=='-'
 \\ .   ) )
  \\ \`- ' /    hjw
~'\`~'\`~'\`~'\`~

Falls dir WebDev auch Spaß macht schreib mir doch auf Discord : )
Logge#1337`);

// Analytics placeholder (removed Google Analytics dependency)
// You can add your own privacy-respecting analytics here
const trackEvent = (category, action, label) => {
    console.log('Event:', category, action, label);
    // Add your analytics solution here
};

// Track gallery interactions
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const title = item.dataset.title;
        if (item.dataset.gallery) {
            trackEvent('gallery', 'galleryClick', title);
        } else {
            trackEvent('content', 'click', title);
        }
    });
});

// Track navigation clicks
document.querySelectorAll('.top-nav a, .mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('navigation', 'click', link.href);
    });
});