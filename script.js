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

// Orbital Gallery Layout
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryGrid = document.querySelector('.gallery-grid');

// Position items in an orbital/spiral pattern
function positionGalleryItems() {
    const centerX = window.innerWidth / 2;
    const baseY = 400; // Starting Y position
    
    galleryItems.forEach((item, index) => {
        // Create a spiral pattern with multiple orbits
        const angle = (index * 137.5) * (Math.PI / 180); // Golden angle for natural distribution
        const orbit = Math.floor(index / 8) + 1; // Which orbit ring
        const radius = 250 + (orbit * 180); // Distance from center increases with orbit
        const yOffset = index * 200; // Vertical spacing for scrolling
        
        // Calculate position
        const x = centerX + Math.cos(angle) * radius;
        const y = baseY + yOffset + Math.sin(angle) * (radius * 0.6);
        
        // Apply position
        item.style.left = `${x - 125}px`; // Center the item (125 = half of 250px width)
        item.style.top = `${y}px`;
        
        // Add rotation based on angle
        const rotation = (angle * (180 / Math.PI)) % 360;
        item.style.transform = `rotate(${rotation * 0.1}deg)`;
        
        // Stagger fade-in animation
        item.style.opacity = '0';
        item.style.animation = `orbitalFadeIn 0.8s ease forwards ${index * 0.05}s`;
    });
}

// Create orbital fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes orbitalFadeIn {
        from {
            opacity: 0;
            transform: scale(0.5) rotate(0deg);
        }
        to {
            opacity: 1;
            transform: scale(1) rotate(var(--rotation, 0deg));
        }
    }
`;
document.head.appendChild(style);

// Parallax scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset;
    const scrollDelta = scroll - lastScroll;
    
    galleryItems.forEach((item, index) => {
        const speed = 0.3 + (index % 5) * 0.1; // Variable parallax speed
        const currentTransform = item.style.transform;
        const rotation = parseFloat(currentTransform.match(/rotate\(([^)]+)deg\)/)?.[1] || 0);
        
        // Apply parallax and rotation on scroll
        const parallax = scrollDelta * speed;
        const newRotation = rotation + (scrollDelta * 0.05);
        
        item.style.transform = `rotate(${newRotation}deg) translateY(${-parallax}px)`;
    });
    
    lastScroll = scroll;
}, { passive: true });

// Initialize positions
positionGalleryItems();

// Reposition on window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        positionGalleryItems();
        drawConstellationLines();
    }, 250);
});

// Constellation lines effect
const canvas = document.getElementById('constellation-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = document.documentElement.scrollHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function drawConstellationLines() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const items = Array.from(galleryItems);
    const maxDistance = 400; // Maximum distance to draw lines
    const scroll = window.pageYOffset;
    
    // Get visible items based on scroll position
    const visibleItems = items.filter(item => {
        const rect = item.getBoundingClientRect();
        const itemY = rect.top + scroll;
        return Math.abs(itemY - scroll) < window.innerHeight * 1.5;
    });
    
    visibleItems.forEach((item1, i) => {
        const rect1 = item1.getBoundingClientRect();
        const x1 = rect1.left + rect1.width / 2;
        const y1 = rect1.top + scroll + rect1.height / 2;
        
        visibleItems.slice(i + 1).forEach(item2 => {
            const rect2 = item2.getBoundingClientRect();
            const x2 = rect2.left + rect2.width / 2;
            const y2 = rect2.top + scroll + rect2.height / 2;
            
            const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            
            if (distance < maxDistance) {
                const opacity = 1 - (distance / maxDistance);
                const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
                gradient.addColorStop(0, `rgba(118, 255, 3, ${opacity * 0.4})`);
                gradient.addColorStop(1, `rgba(255, 23, 68, ${opacity * 0.4})`);
                
                ctx.strokeStyle = gradient;
                ctx.lineWidth = opacity * 2;
                ctx.beginPath();
                ctx.moveTo(x1, y1 - scroll);
                ctx.lineTo(x2, y2 - scroll);
                ctx.stroke();
            }
        });
    });
}

// Draw lines on scroll and initially
drawConstellationLines();
window.addEventListener('scroll', drawConstellationLines, { passive: true });

// Redraw after items are positioned
setTimeout(drawConstellationLines, 1000);

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

// Custom cursor effect
const cursor = document.getElementById('cursor');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.15;
    cursorY += dy * 0.15;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor hover effects
document.querySelectorAll('.gallery-item, a, button').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
    });
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
    });
});

// Mouse trail particles
const trailParticles = [];
const maxTrails = 15;

document.addEventListener('mousemove', (e) => {
    if (trailParticles.length < maxTrails) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail-particle';
        trail.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, rgba(118, 255, 3, 0.8), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9997;
            animation: trailFade 0.5s ease-out forwards;
        `;
        document.body.appendChild(trail);
        trailParticles.push(trail);
        
        setTimeout(() => {
            trail.remove();
            trailParticles.shift();
        }, 500);
    }
});

// Add trail animation
const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes trailFade {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(trailStyle);

// Hide scroll indicator on scroll
const scrollIndicator = document.querySelector('.scroll-indicator');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
    } else {
        scrollIndicator.style.opacity = '1';
    }
}, { passive: true });