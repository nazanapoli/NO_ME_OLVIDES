const PASSWORD = 'EstaEsMiContrasenia'
for(let i = 5; i>0;i--){
    let passwordIngresado = prompt('Ingrese su contrasenia')
    if(passwordIngresado!=PASSWORD){
        alert(`Password incorrecto, te quedan ${i} intentos`)
        // continue (NO ES NECESARIO, DE POR SI IBA A SEGUIR)
    } else {
        alert('Felicitaciones adivinaste el password')
        break
    }
    location.reload() //HACE QUE VUELVA A EMPEZAR EL FOR
}