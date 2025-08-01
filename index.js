
let cart = [];

function addToCart(productName, price) {
  cart.push({ productName, price });
  updateCart();
}

function updateCart() {
  const cartContainer = document.getElementById('cart');
  cartContainer.innerHTML = '';
  let total = 0;
  cart.forEach((item) => {
    total += item.price;
    cartContainer.innerHTML += `<div class='flex justify-between'>
      <span>${item.productName}</span>
      <span>$${item.price}</span>
    </div>`;
  });
  cartContainer.innerHTML += `<div class='flex justify-between font-bold border-t pt-2 mt-2'>
    <span>Total:</span>
    <span>$${total}</span>
  </div>`;
}

function checkout() {
  let message = "Hola, quiero comprar:\n";
  cart.forEach(item => {
    message += `- ${item.productName} ($${item.price})\n`;
  });
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/573001112233?text=${encodedMessage}`, '_blank');
}
