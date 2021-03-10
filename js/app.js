// vARIABLES 
const btnEnviar = document.querySelector('#enviar')
const formulario =document.querySelector('#enviar-mail');


//Varaibles para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const expresionRegular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       

eventListeners();



function eventListeners(){
    document.addEventListener('DOMContentLoaded', iniciarApp);


    // Campos del formulario 
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur',validarFormulario);
    mensaje.addEventListener('blur',validarFormulario);
   

    
   
   



    //enviar email
    formulario.addEventListener('submit',enviarEmail);


}





// Funciones
function iniciarApp(){

    btnEnviar.disabled = true;
    btnEnviar. classList.add('cursor-not-a-allowed', 'opacity');

}


// Validando el formulario 

function validarFormulario(e){

   if(e.target.value.length > 0 ){
       const error = (  document.querySelector('p.error'));
       if(error){
        error.remove();
       }
     

       e.target.classList.remove('border','border-red-500');
       e.target.classList.add('border','border-green-500');


       
   }else{
    e.target.classList.remove('border','border-green-500');
    e.target.classList.add('border','border-red-500');
    mostrarError('Todos los campos son obligatorios');

   }

   if(e.target.type === 'email'){

   

       if(expresionRegular.test(e.target.value)){
           const error = document.querySelector('p.error');
           if(error){
            error.remove();
           }
         

           e.target.classList.remove('border','border-red-500');
           e.target.classList.add('border','border-green-500');

        
       }else{
        e.target.classList.remove('border','border-green-500');
        e.target.classList.add('border','border-red-500');
        mostrarError('El Email no es valido');


       }
   }

   if(expresionRegular.test(email.value) && asunto.value !== '' && mensaje.value !== ''){
       btnEnviar.disabled = false;
       btnEnviar.classList.remove('cursor-not-allowed','opacity-50');

   }
}

function mostrarError(mensaje){

    const mensajeError = document.createElement('P');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-color-100', 'text-red-500','p-3','mt-5','text-center', 'error');

    const errores = document.querySelectorAll('.error');
    if(errores.length === 0){
        // el mensaje se muestra arriba del formulario
        formulario.insertBefore(mensajeError, document.querySelector('.mb-10'));

    }

     //muestra el mensaje abajo del formalario 
   // formulario.appendChild(mensajeError);

    
}





//enviar el email
function enviarEmail (e){
    e.preventDefault();

    // MOSTRAR EL SPINNER
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    // despues de 3s ocultar el spinner y mostrar el mesj
    setTimeout( () => {
        spinner.style.display = 'none';

        // Mensaje que dice que se envio correctamente 
        const parrafo = document.createElement('p');
        parrafo.textContent ='El mensaje se envio correctamente';
        parrafo.classList.add('text-center', 'my-10','p-2','bg-green-500','text-white','font-bold','uppercase');


        // insertar el parrafo antes del spinner
        formulario.insertBefore(parrafo, spinner);

        setTimeout( ()  => {
            parrafo.remove(); // eñlimainar el mesnaje de exito

            resetearFormulario();
        },5000);


    }, 3000);

}


// funcion para limpiar el formulario
function resetearFormulario(){

    formulario.reset();

    iniciarApp();

}