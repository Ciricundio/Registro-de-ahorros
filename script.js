const boton = document.getElementsByClassName("boton")[0]; 
const formulario = document.getElementById("formulario");
const input = formulario.getElementsByClassName("input")[0];
const lista = document.getElementsByClassName("lista")[0];
const botonBorrar = document.getElementById("botonBorrar");
const botonBorrarUltimo = document.getElementById("botonBorrarUltimo");
const total = document.createElement("div");
total.classList.add("total");
total.textContent = "Total: $0";
botonBorrarUltimo.insertAdjacentElement('afterend', total);
const botonRestar = document.querySelector('.boton-restar');

window.addEventListener('load', cargarLista);

formulario.addEventListener('submit', handleSubmit);
botonBorrar.addEventListener('click', borrarLista);
botonBorrarUltimo.addEventListener('click', borrarUltimoElemento);
botonRestar.addEventListener('click', restarTotal);

function handleSubmit(e) {
    e.preventDefault();
    const inputValue = parseFloat(input.value);
    if (!isNaN(inputValue)){
        crearEtiqueta(inputValue);
        sumarLista();
        guardarLista(); // Guardar la lista en localStorage después de cada modificación
        formulario.reset();
    }
}
 
function crearEtiqueta(value) {
    const newTask = document.createElement("LI"); 
    newTask.textContent = value;

    lista.insertBefore(newTask, lista.firstChild);
}

function restarTotal() {
    const inputValue = parseFloat(input.value);
    if (!isNaN(inputValue) && inputValue !== 0) {
        const negativo = -inputValue;
        crearEtiqueta(negativo, true);
        sumarLista();
        guardarLista();
        formulario.reset();
    }
}

function sumarLista(){
    const elementosLista = lista.getElementsByTagName("LI");
    let suma = 0;

    for (let i = 0; i < elementosLista.length; i++){
        suma += parseFloat(elementosLista[i].textContent);
    }

    total.textContent = "Total: $" + suma;
}

function cargarLista() {
    const listaGuardada = localStorage.getItem('miLista');
    if (listaGuardada) {
        lista.innerHTML = listaGuardada;
        sumarLista(); // Recalcular la suma después de cargar la lista
    }
}

function guardarLista() {
    localStorage.setItem('miLista', lista.innerHTML);
}

function borrarLista() {
    let decision = prompt("¿Estás seguro de querer borrar toda la cuenta?");
    if (decision.toLowerCase() == "si"){
        lista.innerHTML = '';
        total.textContent = 'Total: $0';
        guardarLista();
    } else if(decision.toLowerCase() == "no"){
        alert("Está bien 💕");
    } else{
        alert("La respuesta no coincide con la pregunta");
    }
}

function borrarUltimoElemento() {
    const elementosLista = lista.getElementsByTagName("LI");
    if (elementosLista.length > 0) {
        elementosLista[0].remove();
        guardarLista();
        sumarLista();
    }
}
