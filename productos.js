//FUNCIONES
function valorProductos(){
    while (!producto || isNaN(producto) || producto<0) {
        producto = +prompt("Por favor ingrese la cantidad de items a agregar, solo con caracteres numericos: ");
    };
    valorProductos = producto*1000;
 }

const MAYORIA_EDAD = 18
let edad = prompt("Ingrese su edad: ");
    
// OPCION 1
// while (edad == null || /\D/.test(edad) || edad == "" || edad<MAYORIA_EDAD) {
//     edad = prompt("Ingrese su edad en caracteres numericos y recuerde que debe ser mayor de edad: ");
// };

// OPCION 2
while (!edad || isNaN(edad) || edad<MAYORIA_EDAD) {
    edad = prompt("Ingrese su edad en caracteres numericos y recuerde que debe ser mayor de edad: ");
};

//SIM DE COMPRA
let producto = +prompt('Cantidad de items a agregar(unidad: $1000):');
valorProductos()

// ALERT CON SUBTOTAL
alert(`Llevas gastado= $${valorProductos}`)

//PRODUCTOS A QUITAR DEL CARRITO
let productoEliminado = prompt('Si deseas eliminar items indicanos cuantas unidades(cada unidad: $1000), si no queres eliminar nada ingresa: 0: ')
while (!productoEliminado || isNaN(productoEliminado) || productoEliminado<0 || productoEliminado>producto) {
    productoEliminado = prompt("Por favor ingrese la cantidad de items a eliminar, no puede ser menor que cero ni mayor que los productos agregados al carrito, siempre con caracteres numericos: ");
};

let total = valorProductos-(productoEliminado*1000)

//ALERT CON TOTAL A PAGAR
alert(`El total a pagar es $${total}`)

//SELECCIONA LA FORMA DE RETIRO/ENVIO DE PRODUCTOS Y CONFIRMACION
if (total<=0){
    alert('Eliminaste todos los productos de tu carrito de compras')
} else {    
    alert('A continuacion podes elegir la forma de envio o retiro de tu compra');
    let envio = prompt('Elegi la forma de retiro de los productos: 0- Retiro personalmente; 1-Envio a CABA; 2-Envio a GBA');
    while (!envio || isNaN(envio) || envio<0 || envio>=3) {
        envio = prompt("Por favor ingrese un numero contenido en las opciones anteriores, 0- Retiro personalmente; 1-Envio a CABA; 2-Envio a GBA: ");
    }
    if(envio==0){
        alert('Te esperamos de lunes a jueves de 9 a 16hs')
    } else if(envio==1){
        let direccion = prompt('El valor del envio es $450 y se abona en tu domicilio, dejanos tu direccion:');
        confirm(`Resumen de tu compra: El valor total de los productos seleccionados es $${total}, debes abonar $450 del envio a ${direccion} en el momento de la entrega`);
    } else {
        alert('El valor del envio es $600 y se abona en tu domicilio');
        let direccion = prompt('El valor del envio es $600 y se abona en tu domicilio, dejanos tu direccion:');
        confirm(`Resumen de tu compra: El valor total de los productos seleccionados es $${total} y debes abonar $600 del envio a ${direccion} en el momento de la entrega`);
    }
}