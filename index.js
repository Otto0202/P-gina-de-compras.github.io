function closeAlertModal() {
  document.getElementById("welcomeModal").style.display = "none";
}

let cart = [];
let orderData = {};

// ================= CARRITO (TU LÓGICA ORIGINAL) =================

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
      const subtotal = data.qty * data.price;
      total += subtotal;

      div.innerHTML += `
        <div class="ml-4 flex justify-between">
          <span>(${option} x ${data.qty})</span>
          <span>$${subtotal.toLocaleString("es-CO")}</span>
        </div>
      `;
    });

    cartDiv.appendChild(div);
  });

  cartDiv.innerHTML += `<p class="font-bold mt-4">Total: $${total.toLocaleString("es-CO")}</p>`;
}

// ================= NUEVA LÓGICA =================

function openOrderModal() {
  if (cart.length === 0) {
    alert("Tu carrito está vacío");
    return;
  }
  document.getElementById("orderModal").classList.remove("hidden");
}

function confirmOrder() {
  orderData.client = document.getElementById("clientName").value;
  orderData.date = document.getElementById("deliveryDate").value;
  orderData.address = document.getElementById("deliveryAddress").value;
  orderData.cotizacion = Math.floor(10000 + Math.random() * 90000);

  if (!orderData.client || !orderData.date || !orderData.address) {
    alert("Completa todos los datos");
    return;
  }

  generatePDF();
  sendToWhatsApp();
}

function generatePDF() {
  document.getElementById("pdfCliente").textContent = orderData.client;
  document.getElementById("pdfDireccion").textContent = orderData.address;
  document.getElementById("pdfFecha").textContent = orderData.date;
  document.getElementById("pdfCotizacion").textContent = orderData.cotizacion;

  let total = 0;
  const tbody = document.getElementById("pdfProductos");
  tbody.innerHTML = "";

  cart.forEach(item => {
    Object.entries(item.options).forEach(([op, data]) => {
      const sub = data.qty * data.price;
      total += sub;

      tbody.innerHTML += `
        <tr>
          <td>${item.name} (${op})</td>
          <td align="center">${data.qty}</td>
          <td align="right">$${sub.toLocaleString("es-CO")}</td>
        </tr>
      `;
    });
  });

  document.getElementById("pdfTotal").textContent = total.toLocaleString("es-CO");

  html2pdf()
    .set({
      margin: 10,
      filename: `Orden_Compra_${orderData.cotizacion}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { format: "a4", orientation: "portrait" }
    })
    .from(document.getElementById("pdfTemplate"))
    .save();
}

function sendToWhatsApp() {
  let msg = `Hola, adjunto orden de compra.\n\n`;
  msg += `Cliente: ${orderData.client}\n`;
  msg += `Dirección: ${orderData.address}\n`;
  msg += `Fecha entrega: ${orderData.date}\n\n`;

  let total = 0;
  cart.forEach(item => {
    Object.entries(item.options).forEach(([op, data]) => {
      total += data.qty * data.price;
      msg += `- ${item.name} (${op} x ${data.qty})\n`;
    });
  });

  msg += `\nTOTAL: $${total.toLocaleString("es-CO")}\n📎 PDF generado`;

  window.open(
    `https://wa.me/573239618378?text=${encodeURIComponent(msg)}`,
    "_blank"
  );
}
