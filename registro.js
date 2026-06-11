const firebaseConfig = {
  apiKey: "AIzaSyDA4gAFeWcYE2_w3N-7Os8TXzXMyljDak8",
  authDomain: "kwitter-247d6.firebaseapp.com",
  databaseURL: "https://kwitter-247d6-default-rtdb.firebaseio.com",
  projectId: "kwitter-247d6",
  storageBucket: "kwitter-247d6.firebasestorage.app",
  messagingSenderId: "599266540979",
  appId: "1:599266540979:web:03ba14e476e0e2f9961fc6"
};

firebase.initializeApp(firebaseConfig);

function togglePassword() {
    var pass = document.getElementById("password");

    if (pass.type === "password") {
        pass.type = "text";
    } else {
        pass.type = "password";
    }
}

function registrar() {

    var nombre = document.getElementById("user_name").value.trim();
    var curp = document.getElementById("curp").value.trim().toUpperCase();
    var password = document.getElementById("password").value;

    if (nombre === "" || curp === "" || password === "") {
        document.getElementById("mensaje").innerHTML =
        "Completa todos los campos";
        return;
    }

    var curpRegex = /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[A-Z0-9][0-9]$/;

    if (!curpRegex.test(curp)) {
        document.getElementById("mensaje").innerHTML =
        "CURP inválido";
        return;
    }

    var anio = parseInt(curp.substring(4,6));
    var mes = parseInt(curp.substring(6,8));
    var dia = parseInt(curp.substring(8,10));

    var anioCompleto;

    if (anio <= new Date().getFullYear() % 100) {
        anioCompleto = 2000 + anio;
    } else {
        anioCompleto = 1900 + anio;
    }

    var nacimiento = new Date(anioCompleto, mes - 1, dia);

    var hoy = new Date();

    var edad = hoy.getFullYear() - nacimiento.getFullYear();

    if (
        hoy.getMonth() < nacimiento.getMonth() ||
        (hoy.getMonth() === nacimiento.getMonth() &&
         hoy.getDate() < nacimiento.getDate())
    ) {
        edad--;
    }

    if (edad < 12) {
        document.getElementById("mensaje").innerHTML =
        "Debes tener al menos 13 años";
        return;
    }

    var sexo = curp.charAt(10);

    sexo = (sexo === "H") ? "Hombre" : "Mujer";

    firebase.database().ref("usuarios/" + nombre).set({
        nombre: nombre,
        curp: curp,
        sexo: sexo,
        edad: edad,
        password: password
    });

    localStorage.setItem("user_name", nombre);

    localStorage.setItem("user_name", nombre);

document.getElementById("mensaje").innerHTML =
"Conexión creada correctamente";

setTimeout(function() {
    window.location = "kwitter_room.html";
}, 1500)
}