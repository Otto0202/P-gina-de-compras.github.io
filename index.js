// --- Estado interno ---
const row = document.createElement('div'); row.className = 'flex justify-between items-center gap-2 mt-1';


const left = document.createElement('div'); left.textContent = `${variant} x ${qty}`;
const subtotal = qty * item.price; total += subtotal;
const right = document.createElement('div'); right.textContent = '$' + subtotal.toLocaleString('es-CO');


const actions = document.createElement('div'); actions.className = 'flex gap-1 ml-2';
const plus = document.createElement('button'); plus.className = 'px-2 py-1 bg-green-500 text-white rounded'; plus.textContent = '+'; plus.onclick = () => changeQty(idx, variant, 1);
const minus = document.createElement('button'); minus.className = 'px-2 py-1 bg-red-500 text-white rounded'; minus.textContent = '-'; minus.onclick = () => changeQty(idx, variant, -1);


actions.appendChild(plus); actions.appendChild(minus);


row.appendChild(left); row.appendChild(right); row.appendChild(actions);
container.appendChild(row);
});


cartDiv.appendChild(container);
});


const totalDiv = document.createElement('div'); totalDiv.className = 'font-bold mt-4'; totalDiv.textContent = 'Total: $' + total.toLocaleString('es-CO');
cartDiv.appendChild(totalDiv);
}


function changeQty(productIndex, variant, delta){
const item = cart[productIndex];
item.variants[variant] = (item.variants[variant] || 0) + delta;
if(item.variants[variant] <= 0) delete item.variants[variant];
if(Object.keys(item.variants).length === 0) cart.splice(productIndex, 1);
updateCart();
}


function checkout(){
if(cart.length === 0){ alert('Tu carrito está vacío.'); return; }


let message = 'Hola, quiero comprar:
';
let total = 0;
cart.forEach(item => {
const variantsText = Object.entries(item.variants).map(([v,q]) => `(${v} x ${q})`).join(' ');
const subtotal = Object.values(item.variants).reduce((acc, q) => acc + q * item.price, 0);
total += subtotal;
message += `- ${item.name} ${variantsText} => $${subtotal.toLocaleString('es-CO')}
`;
});
message += `
Total de la compra: $${total.toLocaleString('es-CO')}`;
const encoded = encodeURIComponent(message);
// Open WhatsApp to the fixed number
window.open(`https://wa.me/573239618378?text=${encoded}`, '_blank');
}


// Initialize values
document.addEventListener('DOMContentLoaded', () => updatePriceEmpanada());
</script>
</body>
</html>
