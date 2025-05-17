function iniciarSesion() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "Ciro Muñoz" && password === "1082") {
        window.location.href="suCuenta.html";
    } else {
        alert("Nombre de usuario o contraseña incorrectos");
    }
}