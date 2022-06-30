import { validacionDeSesion } from './validacionInicioSesion.js';
import {cambiosAlActualizarCarrito,pagSinProductos,} from './funcionesCarrito.js';
validacionDeSesion();
const pruebaTotal = [];
let productosEnCarrito = JSON.parse(
  localStorage.getItem('carritoAgregado')
)?.carrito;
let totalDelCarrito = document.getElementById('totalDelCarrito');

//Si no hay productos en el carrito, el body cambia para invitar a ver productos
if (productosEnCarrito == null) {
  pagSinProductos();
} else {
  //Primero se mostraran los productos en carrito
  productosEnCarrito.forEach((element) => {
    console.log(pruebaTotal.push(element.item.precio * element.cantidad));
    //Crea UL
    let ul = document.getElementById('listaProductosParaMostrar');
    //Crea Li
    let li = document.createElement('li');
    li.classList.add('productoExistenteEnCarrito');
    li.innerHTML = `<img src="${element.item.imagen}"></img><h3 class="infoProducto">${element.item.nombre}</h3><h3 class="infoProducto">Cantidad:${element.cantidad}</h3><button class="botonEliminar" id="vela-${element.item.id}">X</button>`;
    //Agrega Items
    ul.append(li);
    //Muestra el total
    totalDelCarrito.innerText = `Total: $${pruebaTotal.reduce(
      (previo, actual) => previo + actual
    )}`;

    //----------Borrar elemento de carrito-------------
    document
      .getElementById(`vela-${element.item.id}`)
      .addEventListener('click', () => {
        //Busca por id al elemento
        const indexVela = productosEnCarrito.findIndex((i) => {
          return i.item.id == element.item.id;
        });
        //Elimina al elemento
        productosEnCarrito.splice(indexVela, 1);
        //Setea nueva key en LocalStorage con los cambios
        localStorage.setItem(
          'carritoActualizado',
          JSON.stringify(productosEnCarrito)
        );
        let carritoActualizado = JSON.parse(
          localStorage.getItem('carritoActualizado')
        );
        //'agrega' en numero negativo el precio para que, al hacer reduce, se reste
        pruebaTotal.push(-(element.item.precio * element.cantidad));
        //Carga el nuevo total
        totalDelCarrito.innerText = `Total: $${pruebaTotal.reduce(
          (previo, actual) => previo + actual
        )}`;
        cambiosAlActualizarCarrito(ul, carritoActualizado, pruebaTotal);
      });
  });

  //Si se inicio sesion se carga el formulario para realizar el pago
  if (localStorage.getItem('usuarioEnSesion') != null) {
    document.getElementById('footer').classList.add('footerConProductos');
    //Funcion para tomar nombre del user en sesion y autocompletar
    let autocompletarNombre = () => {
      JSON.parse(localStorage.getItem('BaseUsuarios')).forEach((element) => {
        if(element.usuario.indexOf(localStorage.getItem('usuarioEnSesion'))!==-1){
          nombreFacturacion.value = element.nombre;
        }
      });
    };
    // AUTOCOMPLETA DATOS CON LOCALSTORAGE
    let nombreFacturacion = document.getElementById('nombreFacturacion');
    autocompletarNombre();
    // VALIDACION PARA REALIZAR EL PEDIDO
    // GET ELEMENT DE CADA INPUT
    let apellidoFacturacion = document.getElementById('apellidoFacturacion');
    let domicilioFacturacion = document.getElementById('domicilioFacturacion');
    let cpFacturacion = document.getElementById('cpFacturacion');
    let tarjetaFacturacion = document.getElementById('tarjetaFacturacion');
    let tarjetaVencimientoFacturacion = document.getElementById(
      'tarjetaVencimientoFacturacion'
    );
    let CVV = document.getElementById('CVV');
    let enviarPedido = document.getElementById('enviarPedido');
    //VALIDACION DEL FORMULARIO COMPLETO
    let contador = 0;
    enviarPedido.addEventListener('click', (e) => {
      if (!nombreFacturacion.value ||
        !nombreFacturacion.value.trim() ||
        !apellidoFacturacion.value ||
        !apellidoFacturacion.value.trim() ||
        !domicilioFacturacion.value ||
        !domicilioFacturacion.value.trim() ||
        isNaN(cpFacturacion.value) ||
        !cpFacturacion.value.trim() ||
        !tarjetaVencimientoFacturacion.value ||
        CVV.value.length != 3 ||
        isNaN(CVV.value) ||
        !CVV.value){
        e.preventDefault();
        contador++;
        if (contador < 2) {
          let mensajeCompletar = document.createElement('p');
          mensajeCompletar.innerText =
            'Por favor, verifica que los datos esten completados de forma correcta';
          mensajeCompletar.classList.add('mensajeCompletar');
          let formularioFacturacion = document.getElementById(
            'formularioFacturacion'
          );
          formularioFacturacion.append(mensajeCompletar);
        }
      } else {
        //En caso de estar todos los inputs llenos de forma correcta muestra alert y resetea el formulario
        e.preventDefault();
        Swal.fire({
          confirmButtonColor: '#AD8B73',
          title: 'Tu pago se realizó correctamente',
          text: `Revisa tu casilla de correo para ver los detalles de tu compra`,
          icon: 'success',
        });
        let ul = document.getElementById('listaProductosParaMostrar');
        ul.innerHTML = '';
        totalDelCarrito.innerHTML = '';
        localStorage.removeItem('carritoValor');
        localStorage.removeItem('carritoAgregado');
        formularioFacturacion.reset();
      }
    });
  } else {
    //En caso de que el usuario no este logueado. Se muestra su carrito pero se le pide iniciar sesion para continuar
    document.getElementById('contenedorFacturacion').innerHTML =
      '<h3 class="alignCenter">Es necesario que inicies sesión para continuar con el pago.</h3>';
  }
}