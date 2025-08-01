
let cart = [];

function addToCart(productName, price, color = null) {
  // Buscar si el producto ya existe en el carrito
  let product = cart.find(item => item.name === productName);

  if (!product) {
    // Si no existe, agregar producto nuevo
    product = { name: productName, price, colors: {} };
    cart.push(product);
  }

  // Si tiene color
  if (color) {
    if (!product.colors[color]) {
      product.colors[color] = 1;
    } else {
      product.colors[color] += 1;
    }
  } else {
    // Si no hay color, se maneja como sin color
    if (!product.colors["Único"]) {
      product.colors["Único"] = 1;
    } else {
      product.colors["Único"] += 1;
    }
  }

  updateCart();
}

function updateCart() {
  const cartDiv = document.getElementById("cart");
  cartDiv.innerHTML = "";

  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>No hay productos en el carrito.</p>";
    return;
  }

  let total = 0;

  cart.forEach((item, productIndex) => {
    let productContainer = document.createElement("div");
    productContainer.className = "mb-4 p-2 border-b";

    let productTitle = document.createElement("p");
    productTitle.className = "font-bold";
    productTitle.textContent = item.name;
    productContainer.appendChild(productTitle);

    // Mostrar los colores y cantidades
    Object.entries(item.colors).forEach(([color, qty]) => {
      let colorDiv = document.createElement("div");
      colorDiv.className = "flex justify-between items-center ml-4 gap-2";

      let colorText = document.createElement("span");
      colorText.textContent = `(${color} x ${qty})`;

      let colorPrice = document.createElement("span");
      colorPrice.textContent = `$${qty * item.price}`;

      let addButton = document.createElement("button");
      addButton.className = "bg-green-500 text-white px-2 py-1 rounded";
      addButton.textContent = "+";
      addButton.onclick = () => addColorQuantity(productIndex, color);

      let removeButton = document.createElement("button");
      removeButton.className = "bg-red-500 text-white px-2 py-1 rounded";
      removeButton.textContent = "-";
      removeButton.onclick = () => removeColorFromCart(productIndex, color);

      colorDiv.appendChild(colorText);
      colorDiv.appendChild(colorPrice);
      colorDiv.appendChild(addButton);
      colorDiv.appendChild(removeButton);

      productContainer.appendChild(colorDiv);
    });

    // Calcular subtotal del producto
    let subtotal = Object.values(item.colors).reduce((acc, qty) => acc + qty * item.price, 0);
    total += subtotal;

    cartDiv.appendChild(productContainer);
  });

  // Total
  const totalDiv = document.createElement("div");
  totalDiv.className = "font-bold mt-4";
  totalDiv.textContent = `Total: $${total}`;
  cartDiv.appendChild(totalDiv);
}

function addColorQuantity(productIndex, color) {
  cart[productIndex].colors[color] += 1;
  updateCart();
}

function removeColorFromCart(productIndex, color) {
  let product = cart[productIndex];

  if (product.colors[color] > 1) {
    product.colors[color] -= 1; // Reducir cantidad si hay más de uno
  } else {
    delete product.colors[color]; // Eliminar color si solo queda 1
  }

  // Si el producto ya no tiene colores, eliminarlo del carrito
  if (Object.keys(product.colors).length === 0) {
    cart.splice(productIndex, 1);
  }

  updateCart();
}

function checkout() {
  alert("Redirigiendo a WhatsApp para pagar...");
}
