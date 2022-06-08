let inputNombre = document.getElementById('inputNombre')
let inputMail = document.getElementById('inputMail')
let textArea = document.getElementById('textArea')
let formulario = document.getElementById('formulario')
let contador = 0

formulario.addEventListener("submit",(e)=>{
    if(!textArea.value||!inputNombre.value||!inputMail.value||textArea.value.trim||inputNombre.value.trim){
        e.preventDefault()
        contador += 1
        if(contador<2){
            let completarCampos=document.createElement('p')
            completarCampos.innerHTML='<p class="mensajeCompletar">¡Debes completar todos los campos!</p>';
            formulario.append(completarCampos)
        }
    } else {
        alert('Tus datos fueron enviados correctamente')
    }
})