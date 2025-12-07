// Cerrar modal
function closeAlertModal() {
  document.getElementById("welcomeModal").style.display = "none";
}

// Carrito
let cart = [];

// Cambiar precio dinámicamente
function updatePrice() {
  const price = document.getElementById("colorEmpanada").value;
  document.getElementById("priceEmpanada").textContent =
    "$" + Number(price).toLocaleString("es-CO");
}

// Agregar al carrito
function addToCart(productName, price, optionName = "Único") {
  let product = cart.find(item => item.name === productName);

  if (!product) {
    product = { name: productName, price: price, options: {} };
    cart.push(product);
  }

  if (!product.options[optionName]) product.options[optionName] = 1;
  else product.options[optionName]++;

  updateCart();
}

// Actualizar carrito
function updateCart() {
  const cartDiv = document.getElementById("cart");
  cartDiv.innerHTML = "";

  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>No hay productos en el carrito.</p>";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    let div = document.createElement("div");
    div.className = "mb-4 p-2 border-b";

    let title = document.createElement("p");
    title.className = "font-bold";
    title.textContent = item.name;
    div.appendChild(title);

    Object.entries(item.options).forEach(([option, qty]) => {
      let row = document.createElement("div");
      row.className = "flex justify-between items-center ml-4 gap-2";

      row.innerHTML = `
        <span>(${option} x ${qty})</span>
        <span>$${(qty * item.price).toLocaleString("es-CO")}</span>
      `;

      let btnAdd = document.createElement("button");
      btnAdd.className = "bg-green-500 text-white px-2 py-1 rounded";
      btnAdd.textContent = "+";
      btnAdd.onclick = () => {
        cart[index].options[option]++;
        updateCart();
      };

      let btnRemove = document.createElement("button");
      btnRemove.className = "bg-red-500 text-white px-2 py-1 rounded";
      btnRemove.textContent = "-";
      btnRemove.onclick = () => {
        if (cart[index].options[option] > 1) {
          cart[index].options[option]--;
        } else {
          delete cart[index].options[option];
        }

        if (Object.keys(cart[index].options).length === 0) {
          cart.splice(index, 1);
        }

        updateCart();
      };

      row.appendChild(btnAdd);
      row.appendChild(btnRemove);

      div.appendChild(row);
    });

    total += Object.values(item.options).reduce(
      (acc, qty) => acc + qty * item.price,
      0
    );

    cartDiv.appendChild(div);
  });

  let totalDiv = document.createElement("div");
  totalDiv.className = "font-bold mt-4";
  totalDiv.textContent = `Total: $${total.toLocaleString("es-CO")}`;
  cartDiv.appendChild(totalDiv);
}

// Enviar pedido a WhatsApp
function checkout() {
  if (cart.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  let message = "Hola, quiero comprar:\n";
  let total = 0;

  cart.forEach(item => {
    const optionsText = Object.entries(item.options)
      .map(([op, qty]) => `(${op} x ${qty})`)
      .join(" ");

    const subtotal = Object.values(item.options)
      .reduce((acc, qty) => acc + qty * item.price, 0);

    total += subtotal;
    message += `- ${item.name} ${optionsText}\n`;
  });

  message += `\nTotal de la compra: $${total.toLocaleString("es-CO")}`;

  const encoded = encodeURIComponent(message);

  const phone = "573239618378"; // ✔ Tu número correcto

  window.open(`https://wa.me/${phone}?text=${encoded}`, "_blank");
}
