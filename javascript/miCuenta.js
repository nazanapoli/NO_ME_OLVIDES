import { validacionDeSesion } from './validacionInicioSesion.js';
validacionDeSesion();

//Funcion para tomar datos del user y autocompletar
let autocompletarNombre = () => {
  JSON.parse(localStorage.getItem('BaseUsuarios')).forEach((element) => {
    if( element.usuario.indexOf(localStorage.getItem('usuarioEnSesion'))!==-1){
      document.getElementById('nombreUsuario').innerText = `${element.nombre}`;
      document.getElementById('nombreInfoUsuario').innerText = `${element.nombre}`;
      document.getElementById('usuarioInfoUsuario').innerText = `${element.usuario}`;
      document.getElementById('mailInfoUsuario').innerText = `${element.correo}`;
    }
  });
};

autocompletarNombre();

//Cerrar sesion con boton y redireccion a login
document.getElementById('botonLogOut').addEventListener('click', () => {
  localStorage.removeItem('usuarioEnSesion');
  window.location.href = './login.html';
});