
let cart = [];

function addToCart(productName, price) {
  const existingProduct = cart.find(item => item.productName === productName);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ productName, price, quantity: 1 });
  }
  updateCart();
}

function removeFromCart(productName) {
  const index = cart.findIndex(item => item.productName === productName);
  if (index !== -1) {
    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1;
    } else {
      cart.splice(index, 1);
    }
  }
  updateCart();
}

function updateCart() {
  const cartContainer = document.getElementById('cart');
  cartContainer.innerHTML = '';
  
  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>No hay productos en el carrito.</p>';
    return;
  }

  let total = 0;
  cart.forEach((item) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    cartContainer.innerHTML += `
      <div class='flex justify-between items-center mb-2'>
        <div>
          <span>${item.productName} x${item.quantity}</span>
          <span class="block text-sm text-gray-500">$${item.price} c/u</span>
        </div>
        <div class="flex items-center space-x-2">
          <span class="font-semibold">$${subtotal}</span>
          <button onclick="removeFromCart('${item.productName}')" class="bg-red-500 text-white px-2 py-1 rounded text-sm">Eliminar</button>
        </div>
      </div>`;
  });

  cartContainer.innerHTML += `
    <div class='flex justify-between font-bold border-t pt-2 mt-2'>
      <span>Total:</span>
      <span>$${total}</span>
    </div>`;
}

function checkout() {
  if (cart.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  let message = "Hola, quiero comprar:\n";
  let total = 0;

  cart.forEach(item => {
    const subtotal = item.quantity * item.price;
    total += subtotal;
    message += `- ${item.productName} x${item.quantity} ($${item.price} c/u) = $${subtotal}\n`;
  });

  message += `\nTotal de la compra: $${total}`;

  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/573008140612?text=${encodedMessage}`, '_blank');
}
