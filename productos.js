class Producto {
    constructor(id, nombre, peso, aroma, precio){
        this.id = id
        this.nombre = nombre.toUpperCase()
        this.peso = peso
        this.aroma = aroma
        this.precio = precio
    }
}
const arrayStock = [
    new Producto(1,'Vela Apoel','500g' ,'Coconut',670),
    new Producto(2,'Vela Burgio','350g','Lemon Grass',900),
    new Producto(3,'Vela Casteldefells','475g','Vainilla',1499),
    new Producto(4,'Vela Dinamo','270g','Chocolate',999),
]

// //DOM
// const aromasSugeridos = []
// do{
//     let aromaSugerido = prompt("Que 3 aromas te interesarian ver en nuestras velas: ");
//     aromasSugeridos.push(aromaSugerido)
// } while (aromasSugeridos.length<3)
// console.log(aromasSugeridos)

// let main = document.getElementById('main')
// let divSugerencia = document.createElement('div')
// main.append(divSugerencia)
// divSugerencia.innerHTML = '<h3>Aromas sugeridos</h3><ul id="sugerenciaUsuario">Tus sugerencias quedaron registradas:</ul>'
// for (const aroma of aromasSugeridos) {
//     let liAroma = document.createElement("li")
//     liAroma.innerHTML = `${aroma}`
//     sugerenciaUsuario.append(liAroma)
// }

let divFiltroAroma = document.getElementById('divFiltroAroma')
for (const vela of arrayStock) {
    let containerInput = document.createElement("div")
    containerInput.innerHTML = `<div class="containerInput" id="containerInput"><input type="radio" name="my-input" id="no"><label for="no">${vela.aroma}</label></div>`
    divFiltroAroma.append(containerInput)
}
let containerInput = document.createElement("div")

const carrito = []
const valorInicial = 0
let carritoLista = document.getElementById('carritoLista')
let vaciarCarrito = document.getElementById('vaciarCarrito')
vaciarCarrito.addEventListener('click',()=>{
    carrito.splice(0,carrito.length),
    console.log(carrito),
    containerInput.innerHTML = `<p class="subtotalProductos">Has vaciado el carrito</p>`
})

function subtotal (vela){
    carrito.push(arrayStock[vela].precio);
    containerInput.innerHTML = `<p class="subtotalProductos">Subtotal: $${carrito.reduce((previo,actual) =>
        previo + actual,
        valorInicial)}</p>`
    carritoLista.append(containerInput)
    console.log(carrito)
}

let compraApoel = document.getElementById('compraApoel')
compraApoel.addEventListener('click',()=>subtotal(0))

let compraBurgio = document.getElementById('compraBurgio')
compraBurgio.addEventListener('click',()=>subtotal(1))

let compraCasteldefells = document.getElementById('compraCasteldefells')
compraCasteldefells.addEventListener('click',()=>subtotal(2))

let compraDinamo = document.getElementById('compraDinamo')
compraDinamo.addEventListener('click',()=>subtotal(3))


// for (const e of carrito) {
    // containerInput.innerHTML = `<div class="containerInput" id="containerInput"><p>Total: $${carrito.reduce((previo,actual) =>
    // previo + actual,
    // valorInicial)}</p></div>`
    // divFiltroAroma.append(containerInput)
// s

