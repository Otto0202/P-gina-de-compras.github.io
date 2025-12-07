
let cart = [];
let selectedSeller = null;

function selectSeller(name) {
  selectedSeller = name;
  document.getElementById('welcomeModal').style.display = 'none';
  
}

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

  if (!selectedSeller) {
    alert("Por favor selecciona de parte de quién vienes primero.");
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
    ? '57NUMERO1'
    : '57NUMERO2'; 
  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
}
// ==== IMÁGENES CON FLECHAS PARA CAPIBARA ====

const capibaraImages = [
  ".jpg",
  ".jpg",
  ".jpg",
  ".jpg",
  ".jpg"
];

let currentCapibaraIndex = 0;

function updateCapibaraImage() {
  const imgElement = document.getElementById("mainImageCapibara");
  imgElement.src = capibaraImages[currentCapibaraIndex];
}

function nextImageCapibara() {
  currentCapibaraIndex = (currentCapibaraIndex + 1) % capibaraImages.length;
  updateCapibaraImage();
}

function prevImageCapibara() {
  currentCapibaraIndex = (currentCapibaraIndex - 1 + capibaraImages.length) % capibaraImages.length;
  updateCapibaraImage();
}


// ==== IMÁGENES CON FLECHAS PARA Marcapáginas ====

const MarcapáginasImages = [
  ".jpg",
  ".jpg",
  
];

let currentMarcapáginasIndex = 0;

function updateMarcapáginasImage() {
  const imgElement = document.getElementById("mainImageMarcapáginas");
  imgElement.src = MarcapáginasImages[currentMarcapáginasIndex];
}

function nextImageMarcapáginas() {
  currentMarcapáginasIndex = (currentMarcapáginasIndex + 1) % MarcapáginasImages.length;
  updateMarcapáginasImage();
}

function prevImageMarcapáginas() {
  currentMarcapáginasIndex = (currentMarcapáginasIndex - 1 + MarcapáginasImages.length) % MarcapáginasImages.length;
  updateMarcapáginasImage();
}

// ==== IMÁGENES CON FLECHAS PARA Deadpool ====

const DeadpoolImages = [
  ".jpg",
  ".jpg",
  
];

let currentDeadpoolIndex = 0;

function updateDeadpoolImage() {
  const imgElement = document.getElementById("mainImageDeadpool");
  imgElement.src = DeadpoolImages[currentDeadpoolIndex];
}

function nextImageDeadpool() {
  currentDeadpoolIndex = (currentDeadpoolIndex + 1) % DeadpoolImages.length;
  updateDeadpoolImage();
}

function prevImageDeadpool() {
  currentDeadpoolIndex = (currentDeadpoolIndex - 1 + DeadpoolImages.length) % DeadpoolImages.length;
  updateDeadpoolImage();
}

// ==== IMÁGENES CON FLECHAS PARA GatoZombie ====

const GatoZombieImages = [
  ".jpg",
  ".jpg",
  
];

let currentGatoZombieIndex = 0;

function updateGatoZombieImage() {
  const imgElement = document.getElementById("mainImageGatoZombie");
  imgElement.src = GatoZombieImages[currentGatoZombieIndex];
}

function nextImageGatoZombie() {
  currentGatoZombieIndex = (currentGatoZombieIndex + 1) % GatoZombieImages.length;
  updateGatoZombieImage();
}

function prevImageGatoZombie() {
  currentGatoZombieIndex = (currentGatoZombieIndex - 1 + GatoZombieImages.length) % GatoZombieImages.length;
  updateGatoZombieImage();
}
// ==== IMÁGENES CON FLECHAS PARA SeñorPool ====

const SeñorPoolImages = [
  ".jpg",
  ".jpg",
  
];

let currentSeñorPoolIndex = 0;

function updateSeñorPoolImage() {
  const imgElement = document.getElementById("mainImageSeñorPool");
  imgElement.src = SeñorPoolImages[currentSeñorPoolIndex];
}

function nextImageSeñorPool() {
  currentSeñorPoolIndex = (currentSeñorPoolIndex + 1) % SeñorPoolImages.length;
  updateSeñorPoolImage();
}

function prevImageSeñorPool() {
  currentSeñorPoolIndex = (currentSeñorPoolIndex - 1 + SeñorPoolImages.length) % SeñorPoolImages.length;
  updateSeñorPoolImage();
}


// ==== IMÁGENES CON FLECHAS PARA Pez ====

const PezImages = [
  ".jpg",
  ".jpg",
  
];

let currentPezIndex = 0;

function updatePezImage() {
  const imgElement = document.getElementById("mainImagePez");
  imgElement.src = PezImages[currentPezIndex];
}

function nextImagePez() {
  currentPezIndex = (currentPezIndex + 1) % PezImages.length;
  updatePezImage();
}

function prevImagePez() {
  currentPezIndex = (currentPezIndex - 1 + PezImages.length) % PezImages.length;
  updatePezImage();
}

// ==== IMÁGENES CON FLECHAS PARA Pulpo ====

const PulpoImages = [
  ".jpg",
  ".jpg",
  
];

let currentPulpoIndex = 0;

function updatePulpoImage() {
  const imgElement = document.getElementById("mainImagePulpo");
  imgElement.src = PulpoImages[currentPulpoIndex];
}

function nextImagePulpo() {
  currentPulpoIndex = (currentPulpoIndex + 1) % PulpoImages.length;
  updatePulpoImage();
}

function prevImagePulpo() {
  currentPulpoIndex = (currentPulpoIndex - 1 + PulpoImages.length) % PulpoImages.length;
  updatePulpoImage();
}
