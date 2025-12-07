// Cerrar modal
function closeAlertModal() {
  document.getElementById("welcomeModal").style.display = "none";
}

// Carrito
let cart = [];

// Cambiar precio dinámico
function updatePrice() {
  const price = document.getElementById("colorEmpanada").value;
  document.getElementById("priceEmpanada").textContent =
    "$" + Number(price).toLocaleString("es-CO");
}

// Agregar al carrito
function addToCart(productName, price, optionName = "Único") {
  let product = cart.find(item => item.name === productName);

  if (!product) {
    product = { name: productName, options: {} };
    cart.push(product);
  }

  if (!product.options[optionName]) {
    product.options[optionName] = { qty: 1, price: price };
  } else {
    product.options[optionName].qty++;
  }

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

    Object.entries(item.options).forEach(([option, data]) => {
      let row = document.createElement("div");
      row.className = "flex justify-between items-center ml-4 gap-2";

      const subtotal = data.qty * data.price;

      row.innerHTML = `
        <span>(${option} x ${data.qty})</span>
        <span>$${subtotal.toLocaleString("es-CO")}</span>
      `;

      // Botón +
      let btnAdd = document.createElement("button");
      btnAdd.className = "bg-green-500 text-white px-2 py-1 rounded";
      btnAdd.textContent = "+";
      btnAdd.onclick = () => {
        item.options[option].qty++;
        updateCart();
      };

      // Botón -
      let btnRemove = document.createElement("button");
      btnRemove.className = "bg-red-500 text-white px-2 py-1 rounded";
      btnRemove.textContent = "-";
      btnRemove.onclick = () => {
        if (item.options[option].qty > 1) {
          item.options[option].qty--;
        } else {
          delete item.options[option];
        }

        if (Object.keys(item.options).length === 0) {
          cart.splice(index, 1);
        }

        updateCart();
      };

      row.appendChild(btnAdd);
      row.appendChild(btnRemove);

      div.appendChild(row);

      total += subtotal;
    });

    cartDiv.appendChild(div);
  });

  let totalDiv = document.createElement("div");
  totalDiv.className = "font-bold mt-4";
  totalDiv.textContent = `Total: $${total.toLocaleString("es-CO")}`;
  cartDiv.appendChild(totalDiv);
}

// WhatsApp
function checkout() {
  if (cart.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  let message = "Hola, quiero comprar:\n";
  let total = 0;

  cart.forEach(item => {
    Object.entries(item.options).forEach(([op, data]) => {
      const subtotal = data.qty * data.price;
      total += subtotal;
      message += `- ${item.name} (${op} x ${data.qty}) → $${subtotal.toLocaleString("es-CO")}\n`;
    });
  });

  message += `\nTotal de la compra: $${total.toLocaleString("es-CO")}`;

  const encoded = encodeURIComponent(message);
  const phone = "573239618378";

  window.open(`https://wa.me/${phone}?text=${encoded}`, "_blank");
}
