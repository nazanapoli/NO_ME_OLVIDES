import Producto from './classVelas.js'
const arrayStock = [
  new Producto(1,'Vela Apoel','500g','Coconut',670,'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/261/858/products/218fcfac-ceef-4def-8741-d89354205f28-2548678907693e45d716442702125362-640-0.jpeg'),
  new Producto(2,'Vela Burgio','350g','Lemon Grass',900,'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/261/858/products/b377a23a-e5b6-40cc-9f05-fb4ba9a34e1d-494f38c12054145f3116346029035665-640-0.jpeg'),
  new Producto(3,'Vela Casteldefells','475g','Vainilla',1599,'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/261/858/products/8e7a69cb-8b9d-4cdf-8d2d-97ba44dcdfd3-012cc258c7d14151f316442582167641-1024-1024.jpeg'),
  new Producto(4,'Vela Dinamo','270g','Chocolate',1099,'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/261/858/products/fc271cb4-6163-418f-b87c-b52b0279d715_nube-764eb6126f8a181d3616065106131993-640-0.jpg'),
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
const aromaProducto = (productoADesestructurar) => {
  const {aroma} = productoADesestructurar
  return aroma
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
//Funciones
function tareaConReduce (){
  return subtotalMostrado.reduce((previo, actual) => previo + actual, +subtotalGuardadoLS)
}
//Muestra en el carrito la cantidad de productos agregados
function mostrarLiProductos (arrayConProductos){
  carritoLista.innerText=''
  arrayConProductos.forEach(element => {
    let liProducto = document.createElement('li');
    liProducto.textContent = `${element.item.nombre} x${element.cantidad}uni.`;
    liProducto.classList.add('cantidadProductos');
    carritoLista.appendChild(liProducto);
  });
  localStorage.setItem('carritoAgregado',JSON.stringify({carrito}))
}
//Suma a 'carrito' los productos, si ya habia anteriormente uno solo le suma la cantidad
function pushProductosACarrito(vela){
  const indexVelaEnCarrito = carrito.findIndex((v)=>{return v.item.nombre==arrayStock[vela].nombre});
  (indexVelaEnCarrito===-1)?carrito.push({cantidad: 1,item: arrayStock[vela]}):carrito[indexVelaEnCarrito].cantidad++
}
function subtotal(vela) {
  pushProductosACarrito(vela)
  mostrarLiProductos(carrito)
  //Obtencion de subtotal y agrega al LocalStorage
  subtotalMostrado.push(precioProducto(arrayStock[vela]));
  subtotalProductos.innerText = `Subtotal: $${tareaConReduce()}`;
  let subtotalLS = tareaConReduce()
  divCarrito.append(containerInput);
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
  subtotalProductos.innerText = (!subtotalGuardadoLS) ? `Subtotal: $0`:`Subtotal: $${subtotalGuardadoLS}`
 //valor que aparece en 'subtotal' (carrito)
  divCarrito.append(vaciarCarrito);
  vaciarCarrito.addEventListener('click', () => {
    subtotalMostrado.splice(0, subtotalMostrado.length);
    (subtotalProductos.innerText = `Has vaciado el carrito`);
    carritoLista.innerHTML='';
    subtotalGuardadoLS = 0;
    localStorage.removeItem('carritoValor');
  });
}
//creacion de filtro aromas en HTML
let idAromas = 1 //genera ID dinamicos
for (const vela of arrayStock) {
  let containerInput = document.createElement('div');
  containerInput.innerHTML = `<div class="containerInput" id="containerInput"><input type="radio" value="${vela.aroma}" name="filtro" id="aroma${idAromas++}"><label for="no">${vela.aroma}</label></div>`;
  divFiltroAroma.append(containerInput);
}
cargaProductos(arrayStock)
// busqueda con input y lupa
const filtroPorBusqueda = () => {
  const busquedaUsuario = busqueda.value.toUpperCase()
  const arFiltrado = arrayStock.filter((vela)=>{
    return nombreProducto(vela).includes(busquedaUsuario) == true
  });
  (arFiltrado.length==0)?main.innerHTML = `Producto no encontrado`:cargaProductos(arFiltrado)
}
lupa.addEventListener('click',filtroPorBusqueda)
busqueda.addEventListener('keyup',()=>{
  (busqueda.value=='')?cargaProductos(arrayStock):filtroPorBusqueda()
})
//Filtro Por Precio
//getElement
let primerCheckboxPrecio = document.getElementById('menosDeMil')
let segundoCheckboxPrecio = document.getElementById('EntreXeY')
let tercerCheckboxPrecio = document.getElementById('desde')

//1check
const precioSeleccionadoUsuario1 = primerCheckboxPrecio.value
primerCheckboxPrecio.addEventListener('change',primerCheckFiltro,false)
function primerCheckFiltro (){
const filtroPorPrecio = () => {
  const precioSeleccionadoUsuario = primerCheckboxPrecio.value
  const arFiltradoPrecio1 = arrayStock.filter((vela)=>{
    return vela.precio <= precioSeleccionadoUsuario
  });
    cargaProductos(arFiltradoPrecio1)
}
filtroPorPrecio(arrayStock)
}

// 2check
segundoCheckboxPrecio.addEventListener('change',segundoCheckboxFiltro,false)
function segundoCheckboxFiltro (){
const filtroPorPrecio = () => {
  const precioSeleccionadoUsuario = segundoCheckboxPrecio.value
  const arFiltradoPrecio2 = arrayStock.filter((vela)=>{
    return (vela.precio > precioSeleccionadoUsuario && vela.precio<tercerCheckboxPrecio.value)
  });
    cargaProductos(arFiltradoPrecio2)
}
filtroPorPrecio(arrayStock)
}

//3check
tercerCheckboxPrecio.addEventListener('change',tercerCheckFiltro,false)
function tercerCheckFiltro (){
const filtroPorPrecio = () => {
  const precioSeleccionadoUsuario = tercerCheckboxPrecio.value
  const arFiltradoPrecio3 = arrayStock.filter((vela)=>{
    return vela.precio >= precioSeleccionadoUsuario
  });
    cargaProductos(arFiltradoPrecio3)
}
filtroPorPrecio(arrayStock)
}

//Intento de filtrar por precio con parametros
// function nombreGlobal (p1){
//   const filtroPorPrecio = () => {
//     const arFiltradoPrecio = arrayStock.filter((vela)=>{
//       return vela.precio >= p1.value
//     });
//       cargaProductos(arFiltradoPrecio)
//   }
//   filtroPorPrecio(arrayStock)
// }


//filtro por aroma
let aroma1 = document.getElementById('aroma1')
let aroma2 = document.getElementById('aroma2')
let aroma3 = document.getElementById('aroma3')
let aroma4 = document.getElementById('aroma4')

const filtroPorAroma = (aroma) => {
  const arFiltradoAroma = arrayStock.filter((vela)=>{
    return vela.aroma.includes(aroma.value) == true
  });
  (arFiltradoAroma.length==0)?main.innerHTML = `Producto no encontrado`:cargaProductos(arFiltradoAroma)
}

aroma1.addEventListener('change',()=>filtroPorAroma(aroma1) ,false)
aroma2.addEventListener('change',()=>filtroPorAroma(aroma2) ,false)
aroma3.addEventListener('change',()=>filtroPorAroma(aroma3) ,false)
aroma4.addEventListener('change',()=>filtroPorAroma(aroma4) ,false)