/********************************
 * MODAL DOMICILIO
 ********************************/
function closeAlertModal() {
  document.getElementById("welcomeModal").style.display = "none";
  localStorage.setItem("modalClosed", "true");
}

window.onload = function () {
  if (localStorage.getItem("modalClosed") === "true") {
    document.getElementById("welcomeModal").style.display = "none";
  }
};

/********************************
 * MODAL IMAGEN
 ********************************/
function openImageModal(src) {
  document.getElementById("modalImage").src = src;
  document.getElementById("imageModal").classList.remove("hidden");
}

function closeImageModal(e) {
  if (e.target.id === "imageModal") {
    document.getElementById("imageModal").classList.add("hidden");
  }
}

/********************************
 * CARRITO
 ********************************/
let cart = [];
let abonoInfo = null;

const wholesaleRules = {
  "Empanadas medianas": { limit: 30, unit: 2500, wholesale: 2000 },
  "Burritos salados medianos": { limit: 30, unit: 5000, wholesale: 4500 },
  "Mini perros calientes": { limit: 30, unit: 5000, wholesale: 4500 },
  "Mini hamburguesas": { limit: 30, unit: 6000, wholesale: 5500 },
  "Sandwich especial": { limit: 30, unit: 10000, wholesale: 9000 },
  "Mini sandwich": { limit: 30, unit: 4000, wholesale: 3500 },
  "Mini arepas rellenas": { limit: 30, unit: 5000, wholesale: 4500 },
  "Medallones de pechuga rellena": { limit: 30, unit: 7000, wholesale: 6400 },
  "Natilla + 3 buñuelos": { limit: 50, unit: 5000, wholesale: 4500 }
};

function addToCart(name, price) {
  let product = cart.find(p => p.name === name);
  if (!product) {
    product = { name, qty: 0, unitPrice: price, finalPrice: price };
    cart.push(product);
  }
  product.qty++;
  applyWholesale(product);
  updateCart();
}

function applyWholesale(product) {
  const rule = wholesaleRules[product.name];
  product.finalPrice =
    rule && product.qty >= rule.limit ? rule.wholesale : product.unitPrice;
}

function updateQuantity(index, value) {
  cart[index].qty = Math.max(1, parseInt(value) || 1);
  applyWholesale(cart[index]);
  updateCart();
}

function updateCart() {
  const cartDiv = document.getElementById("cart");
  cartDiv.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const rule = wholesaleRules[item.name];
    const isWholesale = rule && item.qty >= rule.limit;
    const subtotal = item.qty * item.finalPrice;
    total += subtotal;

    cartDiv.innerHTML += `
      <div class="border p-3 mb-3 rounded">
        <p class="font-bold">${item.name}</p>
        ${isWholesale ? `<span class="text-green-700 text-xs animate-pulse">🔥 Precio por mayor aplicado</span>` : rule ? `<span class="text-orange-600 text-xs">Faltan ${rule.limit - item.qty}</span>` : ""}
        <div class="flex justify-between items-center mt-2">
          <input type="number" min="1" value="${item.qty}"
            onchange="updateQuantity(${index}, this.value)"
            class="border p-1 w-20 rounded"/>
          <span>$${subtotal.toLocaleString("es-CO")}</span>
        </div>
      </div>
    `;
  });

  cartDiv.innerHTML += `<p class="font-bold text-xl">Total: $${total.toLocaleString("es-CO")}</p>`;
}

/********************************
 * ABONO
 ********************************/
function handlePagoChange(value) {
  if (value === "Abono") {
    document.getElementById("abonoModal").classList.remove("hidden");
    updateAbono(50);
  }
}

function updateAbono(percent) {
  let total = cart.reduce((s, i) => s + i.qty * i.finalPrice, 0);
  let abono = total * (percent / 100);
  abonoInfo = {
    percent,
    abono,
    restante: total - abono
  };

  document.getElementById("abonoInfo").innerHTML = `
    Abono (${percent}%): $${abono.toLocaleString("es-CO")} <br>
    Restante: $${abonoInfo.restante.toLocaleString("es-CO")}
  `;
}

function closeAbonoModal() {
  document.getElementById("abonoModal").classList.add("hidden");
}

/********************************
 * WHATSAPP
 ********************************/
function checkout() {
  const nombre = clienteNombre.value;
  const direccion = clienteDireccion.value;
  const fecha = fechaEntrega.value;
  const pago = tipoPago.value;

  let msg = `Pedido:\n👤 ${nombre}\n📍 ${direccion}\n📅 ${fecha}\n💳 ${pago}\n\n`;

  cart.forEach(i => {
    msg += `- ${i.name} x${i.qty}\n`;
  });

  if (abonoInfo) {
    msg += `\n💰 Abono: ${abonoInfo.percent}% ($${abonoInfo.abono.toLocaleString("es-CO")})`;
    msg += `\n💵 Restante: $${abonoInfo.restante.toLocaleString("es-CO")}`;
  }

  window.open(`https://wa.me/573239618378?text=${encodeURIComponent(msg)}`, "_blank");
}
