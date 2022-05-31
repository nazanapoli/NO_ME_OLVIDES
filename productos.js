class producto {
    constructor(id, nombre, peso, aroma, precio){
        this.id = id
        this.nombre = nombre.toUpperCase()
        this.peso = peso
        this.aroma = aroma
        this.precio = precio
    }
}
const arrayStock = [
    new producto(1,'Vela Apoel','500g' ,'Coconut',670),
    new producto(2,'Vela Burgio','350g','Lemon Grass',900),
    new producto(3,'Vela Casteldefells','475g','Vainilla',1499),
    new producto(4,'Vela Dinamo','270g','Chocolate',999),
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
function opcionesVelas(velas){
    let menu = "";
    velas.forEach((vela, i) => {
        menu += `\n${i+4}-${vela.nombre}`
    })
    return menu;
}
function validacion(p1,p2,mensaje){
    while (!p1 || isNaN(p1) || p1<0 || p1>p2){
        p1 = +prompt(mensaje)
    };
    return valorVelaSeleccionada
}
//SIM DE COMPRA
//ELECCION DE PRODUCTO
let valorVelaSeleccionada = +prompt('Que producto desea comprar? \n 1-Salir \n 2-Mas info sobre productos \n 3-Busqueda' + opcionesVelas(arrayStock))
// VALIDAR QUE EL NUMERO INGRESADO ES UNA DE LAS OPCIONES
while (!valorVelaSeleccionada || isNaN(valorVelaSeleccionada) || valorVelaSeleccionada<0 || valorVelaSeleccionada>arrayStock.length+3){
    valorVelaSeleccionada = +prompt('Por favor ingresa un caracter valido\n 1-Salir \n 2-Mas info sobre productos \n 3-Busqueda' + opcionesVelas(arrayStock))
};
// validacion(valorVelaSeleccionada,arrayStock.length+3,'Por favor ingresa un caracter valido\n 1-Salir \n 2-Mas info sobre productos \n 3-Busqueda' + opcionesVelas(arrayStock))
if (valorVelaSeleccionada===1){

} else if (valorVelaSeleccionada===2){
    arrayStock.forEach((element) => {
        alert(`La ${element.nombre} cuenta con las siguiente caracteristicas. \n Aromas: ${element.aroma} \n Peso: ${element.peso} \n El precio por unidad es de: $${element.precio}`)
    });
} else if (valorVelaSeleccionada===3){
    let textoIngresado = prompt('Que producto esta buscando?').toUpperCase()
    const coincidenciaTexto = arrayStock.filter(producto => producto.nombre.includes(textoIngresado))
    console.log(coincidenciaTexto)
} else if (valorVelaSeleccionada===4){
    var VALOR_VELA = arrayStock[valorVelaSeleccionada-4]['precio']
} else if (valorVelaSeleccionada===5){
    var VALOR_VELA = arrayStock[valorVelaSeleccionada-4]['precio']
} else if (valorVelaSeleccionada===6){
    var VALOR_VELA = arrayStock[valorVelaSeleccionada-4]['precio']
} else if (valorVelaSeleccionada===7){
    var VALOR_VELA = arrayStock[valorVelaSeleccionada-4]['precio']
}

if(VALOR_VELA>1){
    // CANTIDAD DE PRODUCTOS A AGREGAR AL CARRITO y ALERT CON SUBTOTAL
    let cantidadProducto = +prompt(`Cantidad de items a agregar(unidad: $${VALOR_VELA}):`);
    let valorParcial = valorProductos(cantidadProducto)
    alert(`Llevas gastado= $${valorParcial}`)
    //PRODUCTOS A QUITAR DEL CARRITO
    let cantProductoEliminado = +prompt(`Si deseas eliminar items indicanos cuantas unidades(cada unidad: $${VALOR_VELA}), si no queres eliminar nada ingresa: 0: `)
    while (!cantProductoEliminado || isNaN(cantProductoEliminado) || cantProductoEliminado<0 || cantProductoEliminado>cantidadProducto) {
        cantProductoEliminado = prompt("Por favor ingrese la cantidad de items a eliminar, no puede ser menor que cero ni mayor que los productos agregados al carrito, siempre con caracteres numericos: ");
    };
    var total = valorParcial-(cantProductoEliminado*VALOR_VELA)
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
}