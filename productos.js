class Producto {
  constructor(id, nombre, peso, aroma, precio, imagen) {
    this.id = id;
    this.nombre = nombre.toUpperCase();
    this.peso = peso;
    this.aroma = aroma;
    this.precio = precio;
    this.imagen = imagen;
  }
}
const arrayStock = [
  new Producto(
    1,
    'Vela Apoel',
    '500g',
    'Coconut',
    670,
    'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/261/858/products/218fcfac-ceef-4def-8741-d89354205f28-2548678907693e45d716442702125362-640-0.jpeg'
  ),
  new Producto(
    2,
    'Vela Burgio',
    '350g',
    'Lemon Grass',
    900,
    'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/261/858/products/b377a23a-e5b6-40cc-9f05-fb4ba9a34e1d-494f38c12054145f3116346029035665-640-0.jpeg'
  ),
  new Producto(
    3,
    'Vela Casteldefells',
    '475g',
    'Vainilla',
    1499,
    'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/261/858/products/8e7a69cb-8b9d-4cdf-8d2d-97ba44dcdfd3-012cc258c7d14151f316442582167641-1024-1024.jpeg'
  ),
  new Producto(
    4,
    'Vela Dinamo',
    '270g',
    'Chocolate',
    999,
    'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/261/858/products/fc271cb4-6163-418f-b87c-b52b0279d715_nube-764eb6126f8a181d3616065106131993-640-0.jpg'
  ),
];
//DOM
let carritoLocalStorage
const carrito = [];
const valorInicial = 0;
//FUNCIONES
function subtotal(vela) {
  carrito.push(arrayStock[vela].precio);
  containerInput.innerHTML = `<p class="subtotalProductos">Subtotal: $${carrito.reduce(
    (previo, actual) => previo + actual,
    valorInicial
  )}</p>`;
  let subtotalLS = carrito.reduce(
    (previo, actual) => previo + actual,
    valorInicial
  )
  if(carrito==''){
    console.log('no hay datos')
  } else {
    carritoLocalStorage = localStorage.setItem('carritoValor', subtotalLS);
    let subtotalGuardadoLS = localStorage.getItem('carritoValor')
    console.log(subtotalGuardadoLS)
  }
}
function cargaProductos() {
  arrayStock.forEach((vela) => {
    // Estructura Card
    const card = document.createElement('div');
    card.classList.add('card');
    // Imagen
    const imagenProducto = document.createElement('img');
    imagenProducto.classList.add('card-img-top');
    imagenProducto.setAttribute('src', vela.imagen);
    // Body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    // Titulo
    const title = document.createElement('h3');
    title.classList.add('card-title');
    title.textContent = vela.nombre;
    // Texto
    const textoCard = document.createElement('p');
    textoCard.classList.add('card-text');
    textoCard.innerHTML = `Vela disponible en aroma/s: ${vela.aroma}. <br> Peso de: ${vela.peso}`;
    // Div Compra
    const cardCompra = document.createElement('div');
    cardCompra.classList.add('card-compra');
    // Precio
    const cardPrecio = document.createElement('p');
    cardPrecio.classList.add('precio');
    cardPrecio.textContent = `$${vela.precio}`;
    // Boton
    const botonCompra = document.createElement('button');
    botonCompra.classList.add('btnCompra');
    botonCompra.textContent = '+';
    botonCompra.addEventListener('click', () => subtotal(vela.id - 1));
    // Interaccion con DOM
    card.appendChild(imagenProducto);
    card.appendChild(cardBody);
    cardBody.appendChild(title);
    cardBody.appendChild(textoCard);
    card.appendChild(cardCompra);
    cardCompra.appendChild(cardPrecio);
    cardCompra.appendChild(botonCompra);
    main.appendChild(card);
    // Lista de cada producto
    let liProducto = document.createElement('li');
    liProducto.textContent = `${vela.nombre} ${valorInicial}`;
    liProducto.classList.add('cantidadProductos');
    divCarrito.append(containerInput);
    carritoLista.appendChild(liProducto);
  });
}
// GetElement
let main = document.getElementById('main');
let divCarrito = document.getElementById('divCarrito');
let divFiltroAroma = document.getElementById('divFiltroAroma');
let carritoLista = document.getElementById('carritoLista');
let vaciarCarrito = document.getElementById('vaciarCarrito');
// CreateElement
let containerInput = document.createElement('div');

for (const vela of arrayStock) {
  let containerInput = document.createElement('div');
  containerInput.innerHTML = `<div class="containerInput" id="containerInput"><input type="radio" name="my-input" id="no"><label for="no">${vela.aroma}</label></div>`;
  divFiltroAroma.append(containerInput);
}

divCarrito.append(vaciarCarrito);
vaciarCarrito.addEventListener('click', () => {
  carrito.splice(0, carrito.length),
    console.log(carrito),
    (containerInput.innerHTML = `<p class="subtotalProductos">Has vaciado el carrito</p>`);
  localStorage.clear()
});

cargaProductos();