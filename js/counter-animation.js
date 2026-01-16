

document.addEventListener('DOMContentLoaded', function() {
    
    const percentageElements = document.querySelectorAll('.percentage');
    
    if (percentageElements.length === 0) {
        console.log('No percentage counters found on this page');
        return;
    }
    
    let hasAnimated = false;
    
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16); // 60 FPS
        let current = start;
        
        const timer = setInterval(function() {
            current += increment;
            
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            element.textContent = Math.floor(current);
        }, 16);
    }
    
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                startCounters();
            }
        });
    }, observerOptions);
    
    const statsBar = document.querySelector('.stats-bar');
    if (statsBar) {
        observer.observe(statsBar);
    }
    
   
    function startCounters() {
        percentageElements.forEach(element => {
            const target = parseInt(element.getAttribute('data-target'));
            
            if (!isNaN(target)) {
                animateCounterWithEasing(element, target, 2000);
            }
        });
    }
    
    function animateCounterWithEasing(element, target, duration = 2000) {
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
           const easeOut = 1 - Math.pow(1 - progress, 3);
            
            const current = Math.floor(easeOut * target);
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        }
        
        requestAnimationFrame(update);
    }
    

    if (!('IntersectionObserver' in window)) {
        function checkScroll() {
            if (!hasAnimated && statsBar && isInViewport(statsBar)) {
                hasAnimated = true;
                startCounters();
                window.removeEventListener('scroll', checkScroll);
            }
        }
        
        window.addEventListener('scroll', checkScroll);
        checkScroll();
    }
    
    console.log('Counter-animation.js loaded successfully! 🔢');
});
