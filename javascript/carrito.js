JSON.parse(localStorage.getItem('carritoAgregado')).carrito.forEach(element => {
  //Crea UL
  let ul = document.getElementById('listaProductosParaMostrar')
  //Crea Li
  let li = document.createElement('li')
  li.classList.add('productoExistenteEnCarrito')
  li.innerHTML=`<img src="${element.item.imagen}"></img><h3 class="infoProducto">${element.item.nombre}</h3><h3 class="infoProducto">Cantidad:${element.cantidad}</h3><button class="botonEliminar">X</button>`
  //Agrega Items
  ul.append(li)
  console.log(element.item)
})
// INFORMA EL TOTAL GASTADO
let totalDelCarrito = document.getElementById('totalDelCarrito')
totalDelCarrito.innerText=`Total: $${localStorage.getItem('carritoValor')}`
// AUTOCOMPLETA DATOS CON LOCALSTORAGE
let nombreFacturacion = document.getElementById('nombreFacturacion')
nombreFacturacion.value=`${JSON.parse(localStorage.getItem('BaseUsuarios'))[0].nombre}`
// VALIDACION PARA REALIZAR EL PEDIDO
// GET ELEMENT DE CADA INPUT
let apellidoFacturacion = document.getElementById('apellidoFacturacion')
let domicilioFacturacion = document.getElementById('domicilioFacturacion')
let pisoFacturacion = document.getElementById('pisoFacturacion')
let cpFacturacion = document.getElementById('cpFacturacion')
let tarjetaFacturacion = document.getElementById('tarjetaFacturacion')
let tarjetaVencimientoFacturacion = document.getElementById('tarjetaVencimientoFacturacion')
let CVV = document.getElementById('CVV')
let enviarPedido = document.getElementById('enviarPedido')
//VALIDACION DEL FORMULARIO COMPLETO
let contador = 0;
enviarPedido.addEventListener('click',(e)=>{
  if(!nombreFacturacion.value||!nombreFacturacion.value.trim()||!apellidoFacturacion.value||!apellidoFacturacion.value.trim()||!domicilioFacturacion.value||!domicilioFacturacion.value.trim()||isNaN(cpFacturacion.value)||!cpFacturacion.value.trim()||isNaN(tarjetaFacturacion.value)||tarjetaFacturacion.value.length!=16||!tarjetaVencimientoFacturacion.value||CVV.value.length!=3||isNaN(CVV.value)||!CVV.value){
    e.preventDefault()
    contador++
    if(contador<2){
      let mensajeCompletar = document.createElement('p')
      mensajeCompletar.innerText='Datos incorrectos'
      mensajeCompletar.classList.add('mensajeCompletar')
      let formularioFacturacion = document.getElementById('formularioFacturacion')
      formularioFacturacion.append(mensajeCompletar)
    }
  } else {
    // e.preventDefault()
    Swal.fire({       
      confirmButtonColor: "#AD8B73",
      title:'Tu pago se realizó correctamente',
      text:`Revisa tu casilla de correo para ver los detalles de tu compra`,
      icon:'success',
      })
      let ul = document.getElementById('listaProductosParaMostrar')
      ul.innerHTML='';
      totalDelCarrito.innerHTML='';
      localStorage.removeItem('carritoValor');
      localStorage.removeItem('carritoAgregado');
  }
})