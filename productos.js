// //FUNCIONES
// function valorProductos(cantidadProducto){
//     while (!cantidadProducto || isNaN(cantidadProducto) || cantidadProducto<0) {
//         cantidadProducto = +prompt("Por favor ingrese la cantidad de items a agregar, solo con caracteres numericos: ");
//     };
//     return cantidadProducto*VALOR_VELA;
//  }
//  function msjEnvio(valorEnvio) {
//     const DIRECCION = prompt(`El valor del envio es $${valorEnvio} y se abona en tu domicilio, dejanos tu direccion:`);
//     confirm(`Resumen de tu compra: El valor total de los productos seleccionados es $${total}, debes abonar $${valorEnvio} del envio a ${DIRECCION} en el momento de la entrega`);
// }

// const MAYORIA_EDAD = 18;
// let edad = prompt("Ingrese su edad: ");
// while (!edad || isNaN(edad) || edad<MAYORIA_EDAD) {
//     edad = +prompt("Ingrese su edad en caracteres numericos y recuerde que debe ser mayor de edad: ");
// };

// //SIM DE COMPRA
// const VALOR_VELA = 1000;
// let cantidadProducto = +prompt(`Cantidad de items a agregar(unidad: $${VALOR_VELA}):`);
// valorProductos(cantidadProducto)

// // ALERT CON SUBTOTAL
// const VALOR_PARCIAL = cantidadProducto*VALOR_VELA
// alert(`Llevas gastado= $${VALOR_PARCIAL}`)

// //PRODUCTOS A QUITAR DEL CARRITO
// let cantProductoEliminado = +prompt(`Si deseas eliminar items indicanos cuantas unidades(cada unidad: $${VALOR_VELA}), si no queres eliminar nada ingresa: 0: `)
// while (!cantProductoEliminado || isNaN(cantProductoEliminado) || cantProductoEliminado<0 || cantProductoEliminado>cantidadProducto) {
//     cantProductoEliminado = prompt("Por favor ingrese la cantidad de items a eliminar, no puede ser menor que cero ni mayor que los productos agregados al carrito, siempre con caracteres numericos: ");
// };

// let total = VALOR_PARCIAL-(cantProductoEliminado*VALOR_VELA)

// //ALERT CON TOTAL A PAGAR
// alert(`El total a pagar es $${total}`)

// //SELECCIONA LA FORMA DE RETIRO/ENVIO DE PRODUCTOS Y CONFIRMACION
// const ENVIO_1 = 450;
// const ENVIO_2 = 600;
// if (total<=0){
//     alert('Eliminaste todos los productos de tu carrito de compras')
// } else {    
//     alert('A continuacion podes elegir la forma de envio o retiro de tu compra');
//     let envio = prompt('Elegi la forma de retiro de los productos: 0- Retiro personalmente; 1-Envio a CABA; 2-Envio a GBA');
//     while (!envio || isNaN(envio) || envio<0 || envio>=3) {
//         envio = +prompt("Por favor ingrese un numero contenido en las opciones anteriores, 0- Retiro personalmente; 1-Envio a CABA; 2-Envio a GBA: ");
//     }
//     if(envio==0){
//         alert('Te esperamos de lunes a jueves de 9 a 16hs')
//     } else if(envio==1){
//         msjEnvio(ENVIO_1)
//     } else {
//         msjEnvio(ENVIO_2)
//     }
// }

class VelaDeSoja {
    constructor(peso, aroma, material){
        this.peso = peso
        this.aroma = aroma
        this.material = material
    }
};

const velaApoel = new VelaDeSoja('500g','Coconut','Vidrio');
const velaBurgio = new VelaDeSoja('350g','Lemon Grass','Madera');
const velaCasteldefells = new VelaDeSoja('475g','Vainilla','Ceramica');
const velaDinamo = new VelaDeSoja('270g','Chocolate','Madera');

const arrayStock = ['Vela Apoel','Vela Burgio','Vela Castelldefels','Vela Dinamo']
const arrayStockClon = [...arrayStock]
// PROMPT PARA SELECCIONAR QUE VELA COMPRAR O SALIR SI ASI SE LO DESEA
let productoSeleccionado = +prompt('Que producto desea comprar? \n 1-Vela Apoel \n  2-Vela Burgio \n  3-Vela Castelldefels \n  4-Vela Dinamo \n 5-Salir')
// VALIDACION DE NUMERO ELEGIDO
while (!productoSeleccionado || isNaN(productoSeleccionado) || productoSeleccionado<0 || productoSeleccionado>=6) {
    productoSeleccionado = +prompt('Por favor ingresa un caracter valido \n 1-Vela Apoel \n  2-Vela Burgio \n  3-Vela Castelldefels \n 4-Vela Dinamo \n 5-Salir');}
// FUNCION PARA AHORRAR LINEAS DE CODIGO
function alertaCompraYStock() {
    const productoAComprar = arrayStock.slice(productoSeleccionado-1,productoSeleccionado)
    confirm(`Compraste: ${productoAComprar}`)
    arrayStock.splice(productoSeleccionado-1,1)
    alert(`Luego de los cambios realizados, el stock actual es:\n ${arrayStock.join('\n')}`)
}
//CAMBIOS EN ARRAY Y ALERTS CON STOCK
if(productoSeleccionado==1){
    alertaCompraYStock()
} else if (productoSeleccionado==2){
    alertaCompraYStock()
} else if (productoSeleccionado==3){
    alertaCompraYStock()
}  else if (productoSeleccionado==4){
    alertaCompraYStock()
} else {
    alert('Gracias, te esperamos luego')
}