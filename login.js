firebase.initializeApp(firebaseConfig);

function login() {

    var user_name = document.getElementById("user_name").value.trim().toLowerCase();
    var password = document.getElementById("password").value;

    var mensaje = document.getElementById("mensaje");

    if (user_name === "" || password === "") {
        mensaje.innerHTML = "Completa todos los campos";
        return;
    }

    firebase.database().ref("usuarios/" + user_name).once("value")
    .then(function(snapshot){

        if(snapshot.exists()){

            var datos = snapshot.val();

            if(datos.password === password){

                localStorage.setItem("user_name", user_name);

                mensaje.innerHTML = "Inicio de sesión correcto";

                setTimeout(function(){
                    window.location = "rooms.html";
                }, 1000);

            } else {
                mensaje.innerHTML = "Contraseña incorrecta";
            }

        } else {
            mensaje.innerHTML = "Usuario no encontrado";
        }
    });

}