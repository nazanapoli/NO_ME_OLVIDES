export function cambiosAlActualizarCarrito(ul, carritoActualizado,pruebaTotal) {
  //Borra el UL para realizarlo con otro array
  ul.innerHTML = '';
  //forEach sobre el nuevo carrito para cargar los productos
  carritoActualizado.forEach((e) => {
    //Crea LI
    let li = document.createElement('li');
    li.classList.add('productoExistenteEnCarrito');
    li.innerHTML = `<img src="${e.item.imagen}"></img><h3 class="infoProducto">${e.item.nombre}</h3><h3 class="infoProducto">Cantidad:${e.cantidad}</h3><button class="botonEliminar" id="vela-${e.item.id}">X</button>`;
    //Agrega Items
    ul.append(li);
    //Evento al eliminar un producto
    document
      .getElementById(`vela-${e.item.id}`)
      .addEventListener('click', () => {
        //Busca por ID al elemento
        const indexVela = carritoActualizado.findIndex((i) => {
          return i.item.id == e.item.id;
        });
        //elimina el producto
        carritoActualizado.splice(indexVela, 1);
        //Setea el nuevo valor
        localStorage.setItem(
          'carritoActualizado',
          JSON.stringify(carritoActualizado)
        );
        //'agrega' en numero negativo el precio para que, al hacer reduce, se reste
        pruebaTotal.push(-(e.item.precio * e.cantidad));
        //Carga el nuevo total
        totalDelCarrito.innerText = `Total: $${pruebaTotal.reduce(
          (previo, actual) => previo + actual
        )}`;
        cambiosAlActualizarCarrito(ul, carritoActualizado,pruebaTotal);
        //Si se elimino todo en el carrito se muestra pagSinProductos
        if (pruebaTotal.reduce((previo, actual) => previo + actual) == 0) {
          pagSinProductos();
          totalDelCarrito.innerHTML = '';
          localStorage.removeItem('carritoAgregado')
          localStorage.removeItem('carritoValor')
        }
      });
  });
}

export function pagSinProductos() {
  document.getElementById('contenedorFacturacion').innerText = '';
  let contenedorListaDeProductos = document.getElementById(
    'contenedorListaDeProductos'
  );
  //msj
  let noHayProductos = document.createElement('p');
  noHayProductos.innerText = `Tu carrito está vacío \n Antes de continuar con el pago, debes agregar algunos productos a tu carrito de compras.
  Encontrarás muchos productos interesantes en nuestra Tienda.`;
  noHayProductos.classList.add('mensajeAgregarProductos');
  //Img carro vacio
  let cartEmpty = document.createElement('img');
  let divCartEmpty = document.createElement('div');
  cartEmpty.classList.add('ocultarResponsive');
  cartEmpty.classList.add('medidas');
  cartEmpty.src = './images/cart-empty.png';
  //Boton redireccion a tienda
  let botonRedireccion = document.createElement('button');
  let divBoton = document.createElement('div');
  botonRedireccion.innerText = 'Ir a la tienda';
  botonRedireccion.classList.add('css-button-arrow--black');
  botonRedireccion.classList.add('botonSinProductosEnCarrito');
  botonRedireccion.addEventListener('click', () => {
    window.location.href = './productos.html';
  });
  // anade al DOM
  divCartEmpty.append(cartEmpty);
  contenedorListaDeProductos.append(divCartEmpty);
  contenedorListaDeProductos.append(noHayProductos);
  divBoton.append(botonRedireccion);
  contenedorListaDeProductos.append(divBoton);
}