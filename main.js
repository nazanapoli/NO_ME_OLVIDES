// let edad = +prompt('Ingrese su edad para comprar en el sitio: ')

// if(isNaN(edad)){
//    alert("Ingrese su edad con caracteres numericos")
//    // let edad = +prompt('Ingrese su edad para comprar en el sitio: ')

//    // let edad = +prompt('Ingrese su edad para comprar en el sitio: ')
//    // while (edad<18){
//    //    alert('Debes ser mayor de edad para comprar en el sitio')
//    // } alert('Gracias por visitarnos!')
// }else{
//    while (edad<18){
//       alert('Debes ser mayor de edad para comprar en el sitio')
//    } alert('Gracias por visitarnos!')
// }

// while (edad<18){
//    alert('Debes ser mayor de edad para comprar en el sitio')
// } 

// let edad2 = +prompt('Ingrese su edad para comprar en el sitio: ')


// if(!isNaN(edad2) && edad2 != null && edad2 != "" && (edad2>=18)){
//    alert('Gracias por visitarnos');
//   break;
// } else{
//    alert('no es numero');
//   continue;
// }

// };
const MAYORIA_EDAD = 18
let edad = prompt("Ingrese su edad: ");
    
while (edad == null || /\D/.test(edad) || edad == "" || edad<MAYORIA_EDAD) {
    edad = prompt("Ingrese su edad en caracteres numericos y recuerde que debe ser mayor de edad: ");
};
