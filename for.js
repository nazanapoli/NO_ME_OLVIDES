const PASSWORD = 'EstaEsMiContrasenia'
for(let i = 5; i>-1;i--){
    let passwordIngresado = prompt('Ingrese su contrasenia')
    if(passwordIngresado!=PASSWORD){
        alert(`Password incorrecto, te quedan ${i} intentos`)
        continue
    } else {
        alert('Felicitaciones adivinaste el password')
        break
    }
}