/******** MODAL DOMICILIO ********/
function closeAlertModal() {
  document.getElementById("welcomeModal").style.display = "none";
}

window.onload = () => {
  document.getElementById("welcomeModal").style.display = "flex";
};

/******** MODAL IMAGEN FULL ********/
function openImage(src) {
  const modal = document.getElementById("imageModal");
  const img = document.getElementById("modalImage");
  img.src = src;
  modal.classList.remove("hidden");
}

function closeImageModal() {
  document.getElementById("imageModal").classList.add("hidden");
}

/******** MODAL ABONO ********/
function handlePagoChange(v) {
  if (v === "Abono") {
    document.getElementById("abonoModal").classList.remove("hidden");
    updateAbono(50);
  }
}

function updateAbono(p) {
  const total = cart.reduce((s, i) => s + i.qty * i.finalPrice, 0);
  abonoInfo = {
    percent: p,
    abono: total * (p / 100),
    restantePercent: 100 - p,
    restante: total * (1 - p / 100)
  };

  document.getElementById("abonoInfo").innerHTML =
    `Abono: ${abonoInfo.percent}% → $${abonoInfo.abono.toLocaleString("es-CO")}<br>
     Restante: ${abonoInfo.restantePercent}% → $${abonoInfo.restante.toLocaleString("es-CO")}`;
}

function closeAbonoModal() {
  document.getElementById("abonoModal").classList.add("hidden");
}

/******** CARRITO ********/
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
  let p = cart.find(i => i.name === name);
  if (!p) {
    p = { name, qty: 0, unitPrice: price, finalPrice: price };
    cart.push(p);
  }
  p.qty++;
  applyWholesale(p);
  updateCart();

  const cartDiv = document.getElementById("cart");
  cartDiv.classList.add("add-animation");
  setTimeout(() => cartDiv.classList.remove("add-animation"), 300);
}

function applyWholesale(p) {
  const r = wholesaleRules[p.name];
  p.finalPrice = r && p.qty >= r.limit ? r.wholesale : p.unitPrice;
}

function updateQuantity(i, val) {
  cart[i].qty = Math.max(1, parseInt(val));
  applyWholesale(cart[i]);
  updateCart();
}

function addOne(i) {
  cart[i].qty++;
  applyWholesale(cart[i]);
  updateCart();
}

function removeOne(i) {
  cart[i].qty--;
  if (cart[i].qty <= 0) cart.splice(i, 1);
  else applyWholesale(cart[i]);
  updateCart();
}

function updateCart() {
  const div = document.getElementById("cart");
  div.innerHTML = "";
  let total = 0;

  cart.forEach((p, i) => {
    const rule = wholesaleRules[p.name];
    const isWholesale = rule && p.qty >= rule.limit;
    const subtotal = p.qty * p.finalPrice;
    total += subtotal;

    div.innerHTML += `
      <div class="border p-3 mb-3 rounded ${isWholesale ? 'wholesale-animate' : ''}">
        <p class="font-bold">${p.name}</p>

        ${
          isWholesale && rule
            ? `<div class="text-sm">
                <span class="line-through text-gray-500">$${rule.unit}</span>
                <span class="text-green-700 font-bold ml-2">
                  $${p.finalPrice} 🎉
                </span>
              </div>
              <span class="text-green-700 text-xs font-semibold">
                Precio por mayor activado
              </span>`
            : rule
              ? `<span class="text-orange-600 text-xs">
                  Faltan ${rule.limit - p.qty} unidades para precio por mayor
                </span>`
              : `<span class="text-sm">$${p.finalPrice}</span>`
        }

        <div class="flex justify-between items-center mt-2">
          <span>${p.qty} unidades</span>
          <span class="font-bold">$${subtotal.toLocaleString("es-CO")}</span>
        </div>

        <div class="flex items-center gap-2 mt-2">
          <button onclick="removeOne(${i})" class="bg-red-500 text-white px-3 rounded">−</button>
          <input type="number" min="1" value="${p.qty}"
                 onchange="updateQuantity(${i}, this.value)"
                 class="border w-20 text-center rounded">
          <button onclick="addOne(${i})" class="bg-green-500 text-white px-3 rounded">+</button>
        </div>
      </div>
    `;
  });

  div.innerHTML += `
    <p class="font-bold text-xl text-center mt-4">
      Total: $${total.toLocaleString("es-CO")}
    </p>

    ${abonoInfo ? `
      <div class="text-sm text-gray-600 mt-3">
        <p>Abono: ${abonoInfo.percent}% → $${abonoInfo.abono.toLocaleString("es-CO")}</p>
        <p>Restante: ${abonoInfo.restantePercent}% → $${abonoInfo.restante.toLocaleString("es-CO")}</p>
      </div>
    ` : ''}
  `;
}

/******** WHATSAPP ********/
function checkout() {
  let msg = `Pedido ChiquiDetalles\n\n`;

  cart.forEach(p => {
    msg += `- ${p.name} x${p.qty}\n`;
  });

  window.open(
    `https://wa.me/573239618378?text=${encodeURIComponent(msg)}`,
    "_blank"
  );
}
