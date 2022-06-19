class registroUsuario {
    constructor (usuario, password){
        this.usuario=usuario
        this.password=password
    }
}
const validacionesLogin = (contadorP,mensaje, formulario) => {
    if(contadorP<2){
        let datosIncorrectos=document.createElement('p');
        datosIncorrectos.innerText=mensaje;
        datosIncorrectos.classList.add('mensajeIncorrecto')
        formulario.append(datosIncorrectos);
    }
}
// variables a usar
const usuariosRegistrados = []
let contadorRegistro = 0
let contadorSesion = 0
//GetElement
let formularioSesion =document.getElementById('formularioSesion')
let formularioRegistro =document.getElementById("formularioRegistro")
let inputNombre = document.getElementById('inputNombre')
let inputCorreo = document.getElementById('inputCorreo')
let inputPass = document.getElementById('inputPass')
let btnSesion = document.getElementById('btnSesion')
let btnRegistrarse = document.getElementById('btnRegistrarse')
let usuarioSesion = document.getElementById('usuarioSesion')
let usuarioPassword = document.getElementById('usuarioPassword')


btnRegistrarse.addEventListener('click',(e)=>{
    if(!inputNombre.value||!inputCorreo.value||!inputPass.value||!inputNombre.value.trim()||!inputCorreo.value.trim()||!inputPass.value.trim()||inputCorreo.value.includes('@')==false){
        e.preventDefault()
        contadorRegistro++
        validacionesLogin(contadorRegistro,'Debes rellenar todos los campos',formularioRegistro)
    } else {
    //toma los valores de los input
    localStorage.setItem('nombre',inputNombre.value)
    localStorage.setItem('correo',inputCorreo.value)
    localStorage.setItem('pass',inputPass.value)
    //con los valores guardados un crea usuario
    let caracteresNombre = localStorage.getItem('nombre').substring(0,3)
    let caracteresCorreo = localStorage.getItem('correo').substring(0,4)
    let usuario =`${caracteresCorreo}${Math.floor((Math.random()*(98-1))+1)}${caracteresNombre}`
    let password = localStorage.getItem('pass')
    //setea usuario y muestra en pantalla
    localStorage.setItem('usuario',usuario)
    Swal.fire(
        'Usuario registrado',
        `Tu usuario es: ${localStorage.getItem('usuario')}`,
        'success',
      )
    usuariosRegistrados.push(new registroUsuario (usuario,password))
    localStorage.setItem('BaseUsuarios',JSON.stringify(usuariosRegistrados))
    }
})
// validaciones e inicio de sesion
btnSesion.addEventListener('click',()=>{
    if(!usuarioSesion.value||!usuarioPassword.value||!usuarioSesion.value.trim()||!usuarioPassword.value.trim()){
        contadorSesion++
        validacionesLogin(contadorSesion,'¡Usuario o contraseña incorrecta!',formularioSesion)
    } else {
        usuariosRegistrados.forEach(usuario => {
            if(usuario.usuario===usuarioSesion.value&&usuario.password===usuarioPassword.value){
                window.location.href='./index.html'
            } else {
                contadorSesion++
                validacionesLogin(contadorSesion,'¡Usuario o contraseña incorrecta!',formularioSesion)
            }
    })
}})

