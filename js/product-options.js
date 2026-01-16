

document.addEventListener('DOMContentLoaded', function() {
    
   
    const fragrances = {
        'fragrance1': 'rose-essence',
        'fragrance2': 'lavender-dream',
        'fragrance3': 'ocean-breeze'
    };
    
    const purchaseTypes = {
        'single': 'one-time',
        'subscription': 'monthly-subscription',
        'double': 'double-subscription'
    };
    
    let selectedFragrance = 'fragrance1';
    let selectedPurchaseType = 'single';
    
    const addToCartBtn = document.getElementById('addToCart');
    
    if (!addToCartBtn) {
        console.log('Product options not found on this page');
        return;
    }
    
    const baseCartURL = 'https://shop.gtgperfumes.com/cart/add?';
    
    function updateCartURL() {
        const fragrance = fragrances[selectedFragrance];
        const purchaseType = purchaseTypes[selectedPurchaseType];
        
        const productID = `${fragrance}-${purchaseType}`;
        

        const cartURL = `${baseCartURL}id=${productID}&quantity=1`;
        
        addToCartBtn.setAttribute('data-url', cartURL);
        
        console.log('Cart URL updated:', cartURL);
        
        updateButtonText();
    }
    
    function updateButtonText() {
        let buttonText = 'Add to Cart';
        
        if (selectedPurchaseType === 'subscription') {
            buttonText = 'Subscribe Now';
        } else if (selectedPurchaseType === 'double') {
            buttonText = 'Subscribe to Double Pack';
        }
        
        addToCartBtn.textContent = buttonText;
    }
    
    function createProductOptions() {
        const pricingSection = document.querySelector('.pricing-section');
        
        if (!pricingSection) return;
        
        pricingSection.innerHTML = `
            <div class="pricing-card most-popular">
                <div class="badge">Most Popular</div>
                <h3>Single Subscription</h3>
                <div class="price">
                    <span class="current">$99.99</span>
                    <span class="original">$141</span>
                </div>
                
                <div class="option-group">
                    <h4>Choose Fragrance</h4>
                    <div class="radio-group">
                        <label class="radio-option">
                            <input type="radio" name="fragrance" value="fragrance1" checked>
                            <span>Rose Essence</span>
                        </label>
                        <label class="radio-option">
                            <input type="radio" name="fragrance" value="fragrance2">
                            <span>Lavender Dream</span>
                        </label>
                        <label class="radio-option">
                            <input type="radio" name="fragrance" value="fragrance3">
                            <span>Ocean Breeze</span>
                        </label>
                    </div>
                </div>
                
                <div class="option-group">
                    <h4>Purchase Type</h4>
                    <div class="radio-group">
                        <label class="radio-option">
                            <input type="radio" name="purchase" value="single" checked>
                            <span>One Time Purchase</span>
                        </label>
                        <label class="radio-option">
                            <input type="radio" name="purchase" value="subscription">
                            <span>Monthly Subscription</span>
                        </label>
                        <label class="radio-option">
                            <input type="radio" name="purchase" value="double">
                            <span>Double Subscription</span>
                        </label>
                    </div>
                </div>
                
                <div class="expandable-section" id="subscriptionDetails" style="display: none;">
                    <h5>Subscription Benefits:</h5>
                    <ul>
                        <li>✓ Save 30% on every order</li>
                        <li>✓ Free shipping always</li>
                        <li>✓ Cancel anytime</li>
                        <li>✓ Flexible delivery schedule</li>
                    </ul>
                </div>
            </div>
        `;
        
        attachRadioListeners();
    }
    
    function attachRadioListeners() {
        const fragranceRadios = document.querySelectorAll('input[name="fragrance"]');
        fragranceRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                selectedFragrance = this.value;
                updateCartURL();
            });
        });
        
        const purchaseRadios = document.querySelectorAll('input[name="purchase"]');
        purchaseRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                selectedPurchaseType = this.value;
                updateCartURL();
                toggleExpandableSection();
            });
        });
    }
    
    function toggleExpandableSection() {
        const subscriptionDetails = document.getElementById('subscriptionDetails');
        
        if (!subscriptionDetails) return;
        
        if (selectedPurchaseType === 'subscription' || selectedPurchaseType === 'double') {
            subscriptionDetails.style.display = 'block';
        } else {
            subscriptionDetails.style.display = 'none';
        }
    }
    
    addToCartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const cartURL = this.getAttribute('data-url');
        
        console.log('Adding to cart:', cartURL);
        
        showNotification('Added to cart successfully! 🛒');

    });
    
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #0B4026;
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    createProductOptions();
    updateCartURL();
    
    console.log('Product-options.js loaded successfully! 🛍️');
});
