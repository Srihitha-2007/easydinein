let cart = JSON.parse(localStorage.getItem("cart")) || [];

let billDiv = document.getElementById("billItems");
let total = 0;

// Display items
cart.forEach(item => {
    let itemTotal = item.price * item.qty;
    total += itemTotal;

    billDiv.innerHTML += `
        <div>
            <span>${item.name} x ${item.qty}</span>
            <span>₹${itemTotal}</span>
        </div>
    `;
});

// Add GST (optional)
let gst = total * 0.05;
let finalTotal = total + gst;

billDiv.innerHTML += `
    <div>
        <span>GST (5%)</span>
        <span>₹${gst.toFixed(2)}</span>
    </div>
`;

document.getElementById("totalBill").innerText =
    "Total: ₹" + finalTotal.toFixed(2);

// Payment
function payNow() {
    let method = document.querySelector('input[name="pay"]:checked');

    if (!method) {
        alert("Select payment method");
        return;
    }

    alert("Payment Successful 🎉");

    localStorage.removeItem("cart");
    window.location.href = "index.html";
}