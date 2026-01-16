
document.addEventListener('DOMContentLoaded', function() {
    
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
        
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
    
});

const accordionHeaders = document.querySelectorAll('.accordion-header');

if (accordionHeaders.length > 0) {
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const isActive = accordionItem.classList.contains('active');
            
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
                const icon = item.querySelector('.accordion-icon');
                if (icon) icon.textContent = '+';
            });
            
            if (!isActive) {
                accordionItem.classList.add('active');
                const icon = this.querySelector('.accordion-icon');
                if (icon) icon.textContent = '−';
            } else {
                const icon = this.querySelector('.accordion-icon');
                if (icon) icon.textContent = '+';
            }
        });
    });
    
    console.log('Accordion initialized! 📂');
}



const singleSubRadio = document.getElementById('single-sub');
const doubleSubRadio = document.getElementById('double-sub');
const singleDetails = document.getElementById('single-details');
const doubleDetails = document.getElementById('double-details');

if (singleSubRadio && doubleSubRadio && singleDetails && doubleDetails) {
    singleSubRadio.addEventListener('change', function() {
        if (this.checked) {
            singleDetails.classList.add('active');
            doubleDetails.classList.remove('active');
        }
    });
    
    doubleSubRadio.addEventListener('change', function() {
        if (this.checked) {
            doubleDetails.classList.add('active');
            singleDetails.classList.remove('active');
        }
    });
    
    console.log('Subscription toggle initialized! 🔄');
}



function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

console.log('Main.js loaded successfully! ');
