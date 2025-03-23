// Initialize cart in localStorage if it doesn't exist
if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}

// Function to add items to cart
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show confirmation message
    alert(`${name} added to cart!`);
}

// Function to update cart display
function updateCartDisplay() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartSection = document.getElementById('cartItems');
    
    if (!cartSection) return;
    
    if (cartItems.length === 0) {
        cartSection.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }
    
    let total = 0;
    let cartHTML = '<div class="cart-items">';
    
    cartItems.forEach((item, index) => {
        total += item.price;
        cartHTML += `
            <div class="cart-item">
                <h3>${item.name}</h3>
                <p class="price">₹${item.price}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });
    
    cartHTML += `
        <div class="cart-total">
            <h3>Total: ₹${total}</h3>
            <button onclick="checkout()">Checkout</button>
        </div>
    </div>`;
    
    cartSection.innerHTML = cartHTML;
}

// Function to remove items from cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Function to handle checkout
function checkout() {
    alert('Thank you for shopping with us!');
    localStorage.setItem('cart', JSON.stringify([]));
    updateCartDisplay();
}

// Update cart display when cart page loads
if (window.location.pathname.includes('cart.html')) {
    window.onload = updateCartDisplay;
}
