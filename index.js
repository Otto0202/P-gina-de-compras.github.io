let cart = [];

// ===============================
// CONFIGURACIÓN DE MAYORISTAS
// ===============================
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

// ===============================
// AGREGAR AL CARRITO
// ===============================
function addToCart(name, unitPrice) {
  let product = cart.find(p => p.name === name);

  if (!product) {
    product = {
      name,
      qty: 0,
      unitPrice,
      finalPrice: unitPrice
    };
    cart.push(product);
  }

  product.qty++;
  applyWholesale(product);
  updateCart();
}

// ===============================
// APLICAR PRECIO POR MAYOR
// ===============================
function applyWholesale(product) {
  const rule = wholesaleRules[product.name];

  if (rule && product.qty >= rule.limit) {
    product.finalPrice = rule.wholesale;
  } else {
    product.finalPrice = product.unitPrice;
  }
}

// ===============================
// ACTUALIZAR CARRITO
// ===============================
function updateCart() {
  const cartDiv = document.getElementById("cart");
  cartDiv.innerHTML = "";

  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>No hay productos en el carrito.</p>";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const rule = wholesaleRules[item.name];
    const isWholesale = rule && item.qty >= rule.limit;
    const subtotal = item.qty * item.finalPrice;
    total += subtotal;

    let mayorBadge = "";
    let faltanMsg = "";
    let precioUnitarioHtml = "";

    if (rule) {
      if (isWholesale) {
        mayorBadge = `
          <span class="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded mt-1 animate-pulse">
            🔥 Precio por mayor aplicado
          </span>
        `;

        precioUnitarioHtml = `
          <span class="text-xs text-gray-500 line-through">
            $${rule.unit.toLocaleString("es-CO")}
          </span>
        `;
      } else {
        const faltan = rule.limit - item.qty;
        faltanMsg = `
          <span class="text-xs text-orange-600 font-semibold">
            ⚠️ Faltan ${faltan} unidades para precio por mayor
          </span>
        `;
      }
    }

    let div = document.createElement("div");
    div.className = "mb-4 p-3 border rounded";

    div.innerHTML = `
      <p class="font-bold text-lg">${item.name}</p>

      ${mayorBadge}
      ${faltanMsg}

      <div class="flex justify-between items-center mt-2">
        <div class="flex flex-col">
          ${precioUnitarioHtml}
          <span class="font-semibold">
            ${item.qty} x $${item.finalPrice.toLocaleString("es-CO")}
          </span>
        </div>
        <span class="font-bold">$${subtotal.toLocaleString("es-CO")}</span>
      </div>

      <div class="flex gap-2 mt-2">
        <button class="bg-green-500 text-white px-3 py-1 rounded"
          onclick="addOne(${index})">+</button>
        <button class="bg-red-500 text-white px-3 py-1 rounded"
          onclick="removeOne(${index})">-</button>
      </div>
    `;

    cartDiv.appendChild(div);
  });

  cartDiv.innerHTML += `
    <div class="font-bold mt-4 text-xl text-center">
      Total: $${total.toLocaleString("es-CO")}
    </div>
  `;
}

function addOne(index) {
  cart[index].qty++;
  applyWholesale(cart[index]);
  updateCart();
}

function removeOne(index) {
  cart[index].qty--;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  } else {
    applyWholesale(cart[index]);
  }
  updateCart();
}

// ===============================
// ENVIAR A WHATSAPP
// ===============================
function checkout() {
  const nombre = document.getElementById("clienteNombre").value;
  const direccion = document.getElementById("clienteDireccion").value;
  const fecha = document.getElementById("fechaEntrega").value;
  const pago = document.getElementById("tipoPago").value;

  if (!nombre || !direccion || !fecha) {
    alert("Por favor completa todos los datos del pedido");
    return;
  }

  let mensaje = `Hola, quiero realizar un pedido:\n\n`;
  mensaje += `👤 Nombre: ${nombre}\n`;
  mensaje += `📍 Dirección: ${direccion}\n`;
  mensaje += `📅 Fecha de entrega: ${fecha}\n`;
  mensaje += `💳 Pago: ${pago}\n\n`;
  mensaje += `🛒 Pedido:\n`;

  let total = 0;

  cart.forEach(item => {
    const subtotal = item.qty * item.finalPrice;
    total += subtotal;
    mensaje += `- ${item.name} x${item.qty} → $${subtotal.toLocaleString("es-CO")}\n`;
  });

  mensaje += `\n💵 Total: $${total.toLocaleString("es-CO")}`;

  window.open(
    `https://wa.me/573239618378?text=${encodeURIComponent(mensaje)}`,
    "_blank"
  );
}
