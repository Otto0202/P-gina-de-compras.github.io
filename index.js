


function closeAlertModal() {
  document.getElementById('welcomeModal').style.display = 'none';
}

function addToCart(productName, price, color = null) {
  let product = cart.find(item => item.name === productName);

  if (!product) {
    product = { name: productName, price, colors: {} };
    cart.push(product);
  }

  if (color) {
    if (!product.colors[color]) product.colors[color] = 1;
    else product.colors[color] += 1;
  } else {
    if (!product.colors["Único"]) product.colors["Único"] = 1;
    else product.colors["Único"] += 1;
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

    let subtotal = Object.values(item.colors).reduce((acc, qty) => acc + qty * item.price, 0);
    total += subtotal;

    cartDiv.appendChild(productContainer);
  });

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
    product.colors[color] -= 1;
  } else {
    delete product.colors[color];
  }

  if (Object.keys(product.colors).length === 0) {
    cart.splice(productIndex, 1);
  }

  updateCart();
}

function checkout() {
  if (cart.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }


  let message = "Hola, quiero comprar:\n";
  let total = 0;

  cart.forEach(item => {
    let colorsText = Object.entries(item.colors)
      .map(([color, qty]) => `(${color} x ${qty})`)
      .join(" ");
    let subtotal = Object.values(item.colors).reduce((acc, qty) => acc + qty * item.price, 0);
    total += subtotal;
    message += `- ${item.name} ${colorsText}\n`;
  });

  message += `\nTotal de la compra: $${total}`;
  const encodedMessage = encodeURIComponent(message);

  let phoneNumber = selectedSeller === 'NOMBRE'
    ? '57 323 9618378'; 
  window.open(`https://wa.me/57 323 9618378`, "_blank");
}
