const arrayStock = [
    {id:1, nombre: 'Vela Apoel'.toUpperCase(), peso:'500g' ,aroma:'Coconut' ,precio:670},
    {id:2, nombre: 'Vela Burgio'.toUpperCase(), peso:'350g' ,aroma:'Lemon Grass' ,precio:900},
    {id:3,nombre: 'Vela Casteldefells'.toUpperCase(), peso:'475g' ,aroma:'Vainilla' ,precio:1499},
    {id:4, nombre: 'Vela Dinamo'.toUpperCase(), peso:'270g' ,aroma:'Chocolate' ,precio:999}
]
const arrayStockClon = [...arrayStock]
//FUNCIONES
function valorProductos(cantidadProducto){
    while (!cantidadProducto || isNaN(cantidadProducto) || cantidadProducto<0) {
        cantidadProducto = +prompt("Por favor ingrese la cantidad de items a agregar, solo con caracteres numericos: ");
    };
    return cantidadProducto*VALOR_VELA;
 }
 function msjEnvio(valorEnvio) {
    const DIRECCION = prompt(`El valor del envio es $${valorEnvio} y se abona en tu domicilio, dejanos tu direccion:`);
    confirm(`Resumen de tu compra: El valor total de los productos seleccionados es $${total}, debes abonar $${valorEnvio} del envio a ${DIRECCION} en el momento de la entrega`);
}
//SIM DE COMPRA
// PRECIO DE LOS PRODUCTOS
const VALOR_VELA_APOEL = 670;
const VALOR_VELA_BURGIO = 900;
const VALOR_VELA_CASTELDEFELLS = 1499;
const VALOR_VELA_DINAMO = 999;

//ELECCION DE PRODUCTO
let valorVelaSeleccionada = +prompt('Que producto desea comprar? \n 1-Vela Apoel \n  2-Vela Burgio \n  3-Vela Casteldefells \n  4-Vela Dinamo \n 5-Mas info sobre productos \n 6-Busqueda \n 7-Salir')
//VALIDAR QUE EL NUMERO INGRESADO ES UNA DE LAS OPCIONES
while (!valorVelaSeleccionada || isNaN(valorVelaSeleccionada) || valorVelaSeleccionada<0 || valorVelaSeleccionada>=8 ){
    valorVelaSeleccionada = +prompt('Por favor ingresa un caracter valido \n 1-Vela Apoel \n  2-Vela Burgio \n  3-Vela Casteldefells \n  4-Vela Dinamo \n 5-Mas info sobre productos \n 6-Busqueda \n 7-Salir')
};
if (valorVelaSeleccionada===1){
    VALOR_VELA = 670
} if (valorVelaSeleccionada===2){
    VALOR_VELA = 900
} if (valorVelaSeleccionada===3){
    VALOR_VELA = 1499
} if (valorVelaSeleccionada===4){
    VALOR_VELA = 999
} if (valorVelaSeleccionada===5){
    arrayStock.forEach((element) => {
        alert(`La ${element.nombre} cuenta con las siguiente caracteristicas. \n Aromas: ${element.aroma} \n Peso: ${element.peso} \n El precio por unidad es de: $${element.precio}`)
    });
} if (valorVelaSeleccionada===6){
    let textoIngresado = prompt('Que producto esta buscando?').toUpperCase()
    const coincidenciaTexto = arrayStock.filter(producto => producto.nombre.includes(textoIngresado))
    console.log(coincidenciaTexto)
}
// CANTIDAD DE PRODUCTOS A AGREGAR AL CARRITO
let cantidadProducto = +prompt(`Cantidad de items a agregar(unidad: $${VALOR_VELA}):`);
valorProductos(cantidadProducto)
// ALERT CON SUBTOTAL
const VALOR_PARCIAL = cantidadProducto*VALOR_VELA
alert(`Llevas gastado= $${VALOR_PARCIAL}`)
//PRODUCTOS A QUITAR DEL CARRITO
let cantProductoEliminado = +prompt(`Si deseas eliminar items indicanos cuantas unidades(cada unidad: $${VALOR_VELA}), si no queres eliminar nada ingresa: 0: `)
while (!cantProductoEliminado || isNaN(cantProductoEliminado) || cantProductoEliminado<0 || cantProductoEliminado>cantidadProducto) {
    cantProductoEliminado = prompt("Por favor ingrese la cantidad de items a eliminar, no puede ser menor que cero ni mayor que los productos agregados al carrito, siempre con caracteres numericos: ");
};

let total = VALOR_PARCIAL-(cantProductoEliminado*VALOR_VELA)

//ALERT CON TOTAL A PAGAR
alert(`El total a pagar es $${total}`)
//SELECCIONA LA FORMA DE RETIRO/ENVIO DE PRODUCTOS Y CONFIRMACION
const ENVIO_1 = 450;
const ENVIO_2 = 600;
if (total<=0){
    alert('Eliminaste todos los productos de tu carrito de compras')
} else {    
    alert('A continuacion podes elegir la forma de envio o retiro de tu compra');
    let envio = prompt('Elegi la forma de retiro de los productos: 0- Retiro personalmente; 1-Envio a CABA; 2-Envio a GBA');
    while (!envio || isNaN(envio) || envio<0 || envio>=3) {
        envio = +prompt("Por favor ingrese un numero contenido en las opciones anteriores, 0- Retiro personalmente; 1-Envio a CABA; 2-Envio a GBA: ");
    }
    if(envio==0){
        alert('Te esperamos de lunes a jueves de 9 a 16hs')
    } else if(envio==1){
        msjEnvio(ENVIO_1)
    } else {
        msjEnvio(ENVIO_2)
    }
}