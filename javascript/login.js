import { validacionDeSesion } from './validacionInicioSesion.js';
validacionDeSesion();
class registroUsuario {
  constructor(usuario, password, nombre, correo) {
    this.usuario = usuario;
    this.password = password;
    this.nombre = nombre;
    this.correo = correo;
  }
}
const validacionesLogin = (contadorP, mensaje, formulario) => {
  if (contadorP < 2) {
    let datosIncorrectos = document.createElement('p');
    datosIncorrectos.innerText = mensaje;
    datosIncorrectos.classList.add('mensajeIncorrecto');
    formulario.append(datosIncorrectos);
  }
};

// variables a usar
const usuariosRegistrados =
  JSON.parse(localStorage.getItem('BaseUsuarios')) || [];
let contadorRegistro = 0;
let contadorSesion = 0;
//GetElement
let formularioSesion = document.getElementById('formularioSesion');
let formularioRegistro = document.getElementById('formularioRegistro');
let inputNombre = document.getElementById('inputNombre');
let inputCorreo = document.getElementById('inputCorreo');
let inputPass = document.getElementById('inputPass');
let btnSesion = document.getElementById('btnSesion');
let btnRegistrarse = document.getElementById('btnRegistrarse');
let usuarioSesion = document.getElementById('usuarioSesion');
let usuarioPassword = document.getElementById('usuarioPassword');

//Valida el registro y en caso de que los campos esten completos crea un usuario
btnRegistrarse.addEventListener('click', (e) => {
  if (
    !inputNombre.value ||
    !inputCorreo.value ||
    !inputPass.value ||
    !inputNombre.value.trim() ||
    !inputCorreo.value.trim() ||
    !inputPass.value.trim() ||
    inputCorreo.value.includes('@') == false
  ) {
    e.preventDefault();
    contadorRegistro++;
    validacionesLogin(
      contadorRegistro,
      'Debes rellenar todos los campos',
      formularioRegistro
    );
  } else {
    e.preventDefault();
    //toma los valores de los input
    let nombre = inputNombre.value;
    let correo = inputCorreo.value;
    //con los valores guardados un crea usuario
    let caracteresNombre = nombre.substring(0, 3);
    let caracteresCorreo = correo.substring(0, 4);
    let password = inputPass.value;
    let usuario = `${caracteresCorreo}${Math.floor(
      Math.random() * (98 - 1) + 1
    )}${caracteresNombre}`;
    //setea usuario y muestra en pantalla
    usuariosRegistrados.push(
      new registroUsuario(usuario, password, nombre, correo)
    );
    localStorage.setItem('BaseUsuarios', JSON.stringify(usuariosRegistrados));
    Swal.fire({
      confirmButtonColor: '#AD8B73',
      title: 'Usuario registrado',
      text: `Tu usuario es: ${usuario}`,
      icon: 'success',
    });
    formularioRegistro.reset();
  }
});
// validaciones e inicio de sesion
btnSesion.addEventListener('click', () => {
  if(!usuarioSesion.value||!usuarioPassword.value||!usuarioSesion.value.trim()||!usuarioPassword.value.trim()){
    contadorSesion++;
    validacionesLogin(contadorSesion,'¡Usuario o contraseña incorrecta!',formularioSesion);
  } else {
    usuariosRegistrados.forEach((usuario) => {
      if (usuario.usuario===usuarioSesion.value && usuario.password===usuarioPassword.value){
        window.location.href = './miCuenta.html';
        localStorage.setItem('usuarioEnSesion', usuarioSesion.value);
      } else {
        contadorSesion++;
        validacionesLogin(contadorSesion,'¡Usuario o contraseña incorrecta!',formularioSesion);
      }
    });
  }
});