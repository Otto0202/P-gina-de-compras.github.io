let cart = [];
let orderData = {};

function closeAlertModal(){
  document.getElementById("welcomeModal").style.display="none";
}

// IMÁGENES
function openImageModal(src){
  modalImage.src=src;
  imageModal.classList.remove("hidden");
}
function closeImageModal(e){
  if(e.target.id==="imageModal") imageModal.classList.add("hidden");
}
function forceCloseImageModal(){ imageModal.classList.add("hidden"); }

// PRECIOS
function updatePrice(){
  priceEmpanada.textContent="$"+Number(empanadaSelect.value).toLocaleString("es-CO");
}

// CARRITO
function addToCart(name,price,option="Único"){
  let item=cart.find(p=>p.name===name);
  if(!item){ item={name,options:{}}; cart.push(item); }
  if(!item.options[option]) item.options[option]={qty:1,price};
  else item.options[option].qty++;
  updateCart();
}

function updateCart(){
  cartDiv=document.getElementById("cart");
  cartDiv.innerHTML="";
  let total=0;

  cart.forEach((item,i)=>{
    let d=document.createElement("div");
    d.innerHTML=`<strong>${item.name}</strong>`;
    Object.entries(item.options).forEach(([op,data])=>{
      let sub=data.qty*data.price;
      total+=sub;
      d.innerHTML+=`
        <div class="flex justify-between ml-4">
          <span>${op} x ${data.qty}</span>
          <span>$${sub.toLocaleString("es-CO")}</span>
        </div>`;
    });
    cartDiv.appendChild(d);
  });

  cartDiv.innerHTML+=`<p class="font-bold mt-4">Total: $${total.toLocaleString("es-CO")}</p>`;
}

// ORDEN
function openOrderModal(){
  if(cart.length===0) return alert("Carrito vacío");
  orderModal.classList.remove("hidden");
}

function confirmOrder(){
  orderData.client=clientName.value;
  orderData.date=deliveryDate.value;
  orderData.address=deliveryAddress.value;
  if(!orderData.client||!orderData.date||!orderData.address)
    return alert("Completa los datos");

  generatePDF();
  orderModal.classList.add("hidden");
  pdfInfoModal.classList.remove("hidden");
}

function closePdfInfoModal(){
  pdfInfoModal.classList.add("hidden");
  sendToWhatsApp();
}

// PDF
function generatePDF(){
  pdfCliente.textContent=orderData.client;
  pdfDireccion.textContent=orderData.address;
  pdfFecha.textContent=orderData.date;

  let total=0;
  pdfProductos.innerHTML="";

  cart.forEach(item=>{
    Object.entries(item.options).forEach(([op,data])=>{
      let sub=data.qty*data.price;
      total+=sub;
      pdfProductos.innerHTML+=`
        <tr>
          <td>${item.name} (${op})</td>
          <td>${data.qty}</td>
          <td>$${sub.toLocaleString("es-CO")}</td>
        </tr>`;
    });
  });

  pdfTotal.textContent=total.toLocaleString("es-CO");
  html2pdf().from(pdfTemplate).save("Orden_Compra.pdf");
}

// WHATSAPP
function sendToWhatsApp(){
  let msg=`Hola 👋, adjunto orden de compra en PDF`;
  window.open(`https://wa.me/573239618378?text=${encodeURIComponent(msg)}`,"_blank");
}
