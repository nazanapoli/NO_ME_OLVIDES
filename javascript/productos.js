import Producto from './classVelas.js'
const arrayStock = [
  new Producto(1,'Vela Apoel','500g','Coconut',670,'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/261/858/products/218fcfac-ceef-4def-8741-d89354205f28-2548678907693e45d716442702125362-640-0.jpeg'),
  new Producto(2,'Vela Burgio','350g','Lemon Grass',900,'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/261/858/products/b377a23a-e5b6-40cc-9f05-fb4ba9a34e1d-494f38c12054145f3116346029035665-640-0.jpeg'),
  new Producto(3,'Vela Casteldefells','475g','Vainilla',1499,'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/261/858/products/8e7a69cb-8b9d-4cdf-8d2d-97ba44dcdfd3-012cc258c7d14151f316442582167641-1024-1024.jpeg'),
  new Producto(4,'Vela Dinamo','270g','Chocolate',999,'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/261/858/products/fc271cb4-6163-418f-b87c-b52b0279d715_nube-764eb6126f8a181d3616065106131993-640-0.jpg'),
];
// Desestructuraciones
const nombreProducto = (productoADesestructurar) => {
  const {nombre} = productoADesestructurar
  return nombre
}
const precioProducto = (productoADesestructurar) => {
  const {precio} = productoADesestructurar
  return precio
}
// Variables
let carritoLocalStorage
let subtotalMostrado = []
let subtotalGuardadoLS = localStorage.getItem('carritoValor')
let carrito = []
// GetElement
let main = document.getElementById('main');
let divCarrito = document.getElementById('divCarrito');
let divFiltroAroma = document.getElementById('divFiltroAroma');
let carritoLista = document.getElementById('carritoLista');
let subtotalProductos = document.getElementById('subtotalProductos')
let vaciarCarrito = document.getElementById('vaciarCarrito');
const card = document.createElement('div');
let busqueda = document.getElementById('busqueda');
let lupa = document.getElementById('lupa');
// CreateElement
let containerInput = document.createElement('div');
//FUNCIONES
// function carritoLista (vela){
//   let liProducto = document.createElement('li');
//   liProducto.textContent = `${vela.nombre}`;
//   liProducto.classList.add('cantidadProductos');
// }
function tareaConReduce (){
  return subtotalMostrado.reduce((previo, actual) => previo + actual, +subtotalGuardadoLS)
}
function subtotal(vela) {

  // //funcion
  // const indexVelaEnCarrito = carrito.findIndex((v)=>{return v.item.nombre==arrayStock[vela].nombre})
  // console.log(indexVelaEnCarrito)
  // if (indexVelaEnCarrito===-1){
  //   carrito.push({cantidad: 1,item: arrayStock[vela]});
  // } else {
  //   carrito[indexVelaEnCarrito].cantidad++
  // }
  // // ul='' y forEach con paramet


  localStorage.setItem('carritoAgregado',JSON.stringify({carrito}))
  subtotalMostrado.push(precioProducto(arrayStock[vela]));
  subtotalProductos.innerText = `Subtotal: $${tareaConReduce()}`;
  let subtotalLS = tareaConReduce()
  let liProducto = document.createElement('li');
  liProducto.textContent = `${nombreProducto(arrayStock[vela])}`;
  liProducto.classList.add('cantidadProductos');
  divCarrito.append(containerInput);
  carritoLista.appendChild(liProducto);
  if(subtotalMostrado!==''){
    carritoLocalStorage = localStorage.setItem('carritoValor', subtotalLS);
    let subtotalGuardadoLS = localStorage.getItem('carritoValor')
  }
}
// CARGA AUTOMATICA DE CARDS Y CARRITO
function cargaProductos(arFiltrado) {
  main.innerHTML = ''
  arFiltrado.forEach((vela) => {
    // Estructura Card
    const card = document.createElement('div');
    card.classList.add('card');
    // Imagen
    const imagenProducto = document.createElement('img');
    imagenProducto.classList.add('card-img-top');
    imagenProducto.setAttribute('src', vela.imagen);
    imagenProducto.setAttribute('alt', nombreProducto(vela));
    // Body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    // Titulo
    const title = document.createElement('h3');
    title.classList.add('card-title');
    title.textContent = `${nombreProducto(vela)}`;
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
    cardPrecio.textContent = `$${precioProducto(vela)}`;
    // Boton
    const botonCompra = document.createElement('button');
    botonCompra.classList.add('btnCompra');
    botonCompra.textContent = '+';
    botonCompra.addEventListener('click', () => subtotal(vela.id-1));
    // Interaccion con DOM
    card.appendChild(imagenProducto);
    card.appendChild(cardBody);
    cardBody.appendChild(title);
    cardBody.appendChild(textoCard);
    card.appendChild(cardCompra);
    cardCompra.appendChild(cardPrecio);
    cardCompra.appendChild(botonCompra);
    main.appendChild(card);
  });
  (!subtotalGuardadoLS)?subtotalProductos.innerText=`Subtotal: $0`:subtotalProductos.innerText =`Subtotal: $${subtotalGuardadoLS}` //valor que aparece en 'subtotal' (carrito)
  divCarrito.append(vaciarCarrito);
  vaciarCarrito.addEventListener('click', () => {
    subtotalMostrado.splice(0, subtotalMostrado.length);
    (subtotalProductos.innerText = `Has vaciado el carrito`);
    carritoLista.innerHTML='';
    subtotalGuardadoLS = 0;
    localStorage.clear();
  });
}
for (const vela of arrayStock) {
  let containerInput = document.createElement('div');
  containerInput.innerHTML = `<div class="containerInput" id="containerInput"><input type="radio" name="my-input" id="no"><label for="no">${vela.aroma}</label></div>`;
  divFiltroAroma.append(containerInput);
}
cargaProductos(arrayStock)

const filtroPorBusqueda = () => {
  const busquedaUsuario = busqueda.value.toUpperCase()
  const arFiltrado = arrayStock.filter((vela)=>{
    return nombreProducto(vela).includes(busquedaUsuario) == true
  })
    if (arFiltrado.length==0){
      main.innerHTML = `Producto no encontrado`
    } else {
      cargaProductos(arFiltrado)
    }
}
lupa.addEventListener('click',filtroPorBusqueda)
busqueda.addEventListener('keyup',()=>{
  (busqueda.value=='')?cargaProductos(arrayStock):filtroPorBusqueda()
})