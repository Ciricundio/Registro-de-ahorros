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


/* const boton = document.getElementsByClassName("boton")[0]; 
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

const darkModeToggle = document.getElementById('dark-mode-checkbox');
const body = document.body;

cambiarModoOscuro();
cargarLista();
cargarModoOscuro(); */
/* 
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

const darkModeToggle = document.getElementById('dark-mode-checkbox');
const body = document.body;

cambiarModoOscuro();

window.addEventListener('load', () => {
    cargarLista();
    cargarModoOscuro();
});

formulario.addEventListener('submit', handleSubmit);
botonBorrar.addEventListener('click', borrarLista);
botonBorrarUltimo.addEventListener('click', borrarUltimoElemento);
botonRestar.addEventListener('click', restarTotal);
darkModeToggle.addEventListener('change', cambiarModoOscuro);

function handleSubmit(e) {
    e.preventDefault();
    const inputValue = parseFloat(input.value);
    if (!isNaN(inputValue)){
        crearEtiqueta(inputValue);
        sumarLista();
        guardarLista();
        formulario.reset();
    }
}

function cambiarModoOscuro() {
    if (darkModeToggle.checked) {
        enableDarkMode();
        setCookie('modoOscuro', 'activado', 365);
    } else {
        disableDarkMode();
        setCookie('modoOscuro', 'desactivado', 365);
    }
}

function cargarModoOscuro() {
    const modoOscuroCookie = getCookie('modoOscuro');
    if (modoOscuroCookie === 'activado') {
        enableDarkMode();
    }
}

// Resto del código...

function enableDarkMode() {
    body.classList.add('dark-mode');
}

function disableDarkMode() {
    body.classList.remove('dark-mode');
}

function setCookie(name, value, days) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    const cookieValue = `${encodeURIComponent(name)}=${encodeURIComponent(value)};expires=${expirationDate.toUTCString()};path=/`;
    document.cookie = cookieValue;
}

function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (decodeURIComponent(cookieName) === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}

function crearEtiqueta(value, isNegative) {
    const newTask = document.createElement("LI"); 
    newTask.textContent = isNegative ? `- ${Math.abs(value)}` : value;
    newTask.classList.add(isNegative ? 'negativo' : 'positivo');

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
        sumarLista();
    }
}

function guardarLista() {
    localStorage.setItem('miLista', lista.innerHTML);
}

function borrarLista() {
    let decision = prompt("¿Estás seguro de querer borrar toda la cuenta?");
    if (decision && decision.toLowerCase() === "si") {
        lista.innerHTML = '';
        total.textContent = 'Total: $0';
        guardarLista();
    } else if (decision && decision.toLowerCase() === "no") {
        alert("Está bien 💕");
    } else {
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
} */