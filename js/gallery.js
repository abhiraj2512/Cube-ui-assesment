

document.addEventListener('DOMContentLoaded', function() {
    
    let currentImageIndex = 0;
    
    const mainImage = document.getElementById('mainImage');
    const prevBtn = document.querySelector('.gallery-nav.prev');
    const nextBtn = document.querySelector('.gallery-nav.next');
    const dots = document.querySelectorAll('.gallery-dots .dot');
    const thumbnails = document.querySelectorAll('.gallery-thumbnails img');
    
    if (!mainImage || !prevBtn || !nextBtn) {
        console.log('Gallery elements not found on this page');
        return;
    }
    
    function updateGallery(index) {
        currentImageIndex = index;
        
        const newImageSrc = thumbnails[currentImageIndex].src;
        
        mainImage.src = newImageSrc;
        
        const dotIndex = currentImageIndex % dots.length;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === dotIndex);
        });
        
       thumbnails.forEach((thumb, i) => {
            if (i === currentImageIndex) {
                thumb.style.border = '2px solid #0B4026';
                thumb.style.opacity = '1';
            } else {
                thumb.style.border = '1px solid #ddd';
                thumb.style.opacity = '0.6';
            }
        });
    }
    
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function() {
            updateGallery(index);
        });
    });
    

    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + thumbnails.length) % thumbnails.length;
        updateGallery(currentImageIndex);
    });
    
    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % thumbnails.length;
        updateGallery(currentImageIndex);
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            updateGallery(slideIndex);
        });
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (mainImage) {
        mainImage.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        mainImage.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextBtn.click();
        }
        if (touchEndX > touchStartX + 50) {
            prevBtn.click();
        }
    }
    
    updateGallery(0);
    
    console.log('Gallery.js loaded successfully! 🖼️');
});
