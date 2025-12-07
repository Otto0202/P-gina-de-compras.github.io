let cart = [];

const welcomeModal = document.getElementById('welcomeModal');
const acceptModal = document.getElementById('acceptModal');
const openCartBtn = document.getElementById('openCartBtn');
const toggleDark = document.getElementById('toggleDark');

acceptModal.addEventListener('click', () => welcomeModal.style.display = 'none');

openCartBtn.addEventListener('click', () =>
  document.querySelector('aside').scrollIntoView({ behavior: 'smooth' })
);

toggleDark.addEventListener('click', () =>
  document.body.classList.toggle('dark-mode')
);

function updatePriceEmpanada(){
  const select = document.getElementById('colorEmpanada');
  const price = parseInt(select.value, 10);
  document.getElementById('priceEmpanada').innerText = '$' + price.toLocaleString('es-CO');
}

function agregarEmpanada(){
  const select = document.getElementById('colorEmpanada');
  const price = parseInt(select.value, 10);
  const label = select.options[select.selectedIndex].text;
  addToCart('Empanadas & Arepas rellenas', price, label);
}

function addToCart(productName, price, variant=null){
  let product = cart.find(p => p.name === productName);
  if(!product){
    product = { name: productName, price, variants: {} };
    cart.push(product);
  }
  const key = variant || 'Único';
  product.variants[key] = (product.variants[key] || 0) + 1;
  updateCart();
}

function updateCart(){
  const cartDiv = document.getElementById('cart');
  cartDiv.innerHTML = '';

  if(cart.length === 0){
    cartDiv.innerHTML = '<p>No hay productos en el carrito.</p>';
    return;
  }

  let total = 0;

  cart.forEach((item, idx)=>{
    const container = document.createElement('div');
    container.className='mb-3 border-b pb-2';

    const title=document.createElement('p');
    title.className='font-bold';
    title.textContent=item.name;
    container.appendChild(title);

    Object.entries(item.variants).forEach(([variant, qty])=>{
      const row=document.createElement('div');
      row.className='flex justify-between items-center gap-2 mt-1';

      const left=document.createElement('div');
      left.textContent=`${variant} x ${qty}`;

      const subtotal=qty*item.price;
      total+=subtotal;

      const right=document.createElement('div');
      right.textContent='$'+subtotal.toLocaleString('es-CO');

      const actions=document.createElement('div');
      actions.className='flex gap-1 ml-2';

      const plus=document.createElement('button');
      plus.className='px-2 py-1 bg-green-500 text-white rounded';
      plus.textContent='+';
      plus.onclick=()=>changeQty(idx,variant,1);

      const minus=document.createElement('button');
      minus.className='px-2 py-1 bg-red-500 text-white rounded';
      minus.textContent='-';
      minus.onclick=()=>changeQty(idx,variant,-1);

      actions.appendChild(plus);
      actions.appendChild(minus);

      row.appendChild(left);
      row.appendChild(right);
      row.appendChild(actions);

      container.appendChild(row);
    });

    cartDiv.appendChild(container);
  });

  const totalDiv=document.createElement('div');
  totalDiv.className='font-bold mt-4';
  totalDiv.textContent='Total: $'+total.toLocaleString('es-CO');
  cartDiv.appendChild(totalDiv);
}

function changeQty(productIndex, variant, delta){
  const item = cart[productIndex];
  item.variants[variant] = (item.variants[variant]||0) + delta;
  if(item.variants[variant] <= 0) delete item.variants[variant];
  if(Object.keys(item.variants).length === 0) cart.splice(productIndex,1);
  updateCart();
}

function checkout(){
  if(cart.length===0){
    alert('Tu carrito está vacío.');
    return;
  }

  let message='Hola, quiero comprar:\n';
  let total=0;

  cart.forEach(item=>{
    const variantsText = Object.entries(item.variants).map(([v,q])=>`(${v} x ${q})`).join(' ');
    const subtotal = Object.values(item.variants).reduce((acc,q)=>acc + q * item.price,0);
    total+=subtotal;
    message+=`- ${item.name} ${variantsText} => $${subtotal.toLocaleString('es-CO')}\n`;
  });

  message+=`\nTotal de la compra: $${total.toLocaleString('es-CO')}`;
  const encoded=encodeURIComponent(message);

  window.open(`https://wa.me/573239618378?text=${encoded}`,'_blank');
}

document.addEventListener('DOMContentLoaded', updatePriceEmpanada);
