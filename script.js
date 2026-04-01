console.log("Script loaded");
localStorage.removeItem("cart");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, id) {
    let item = cart.find(i => i.id === id);

    if (item) {
        item.qty++;
    } else {
        cart.push({ id, name, price, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    updateUI(id);
}

function increaseQty(id) {
    let item = cart.find(i => i.id === id);
    if (!item) return;

    item.qty++;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    updateUI(id);
}

function decreaseQty(id) {
    let item = cart.find(i => i.id === id);
    if (!item) return;

    item.qty--;

    if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== id);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    updateUI(id);
}

function updateUI(id) {
    let item = cart.find(i => i.id === id);
    let div = document.getElementById(id);

    if (!div) return;

    div.innerHTML = "";

    if (!item) {
        let btn = document.createElement("button");
        btn.innerText = "Add";
        btn.className="cart-controls add-btn";
        btn.onclick = () => addToCart(itemName, itemPrice, id);
        div.appendChild(btn);
        return;
    }

    let minus = document.createElement("button");
    minus.innerText = "-";
    minus.onclick = () => decreaseQty(id);

    let qty = document.createElement("span");
    qty.innerText = item.qty;

    let plus = document.createElement("button");
    plus.innerText = "+";
    plus.onclick = () => increaseQty(id);

    div.appendChild(minus);
    div.appendChild(qty);
    div.appendChild(plus);
}
// UPDATE CART COUNT
function updateCartCount() {
    let count = 0;
    cart.forEach(item => count += item.qty);
    document.getElementById("cartCount").innerText = count;
}

// GO TO BILL PAGE
function goToCart() {
    window.location.href = "bill.html";
}