export function validacionDeSesion(){ //Si el usuario inicio sesion, redirige a miCuenta.html en vez de login.HTML
    if(localStorage.getItem('usuarioEnSesion')!=null){
        document.getElementById('linkLoginMobile').href = './miCuenta.html'
        document.getElementById('linkLoginDesk').href = './miCuenta.html'
    }
}