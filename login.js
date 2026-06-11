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

function login() {

    var user_name = document.getElementById("user_name").value;
    var password = document.getElementById("password").value;

    if(user_name == "" || password == ""){
        document.getElementById("mensaje").innerHTML =
        "Completa todos los campos";
        return;
    }

    firebase.database().ref("usuarios/" + user_name).once("value")
    .then(function(snapshot){

        if(snapshot.exists()){

            var datos = snapshot.val();

            if(datos.password == password){

                localStorage.setItem("user_name", user_name);

                document.getElementById("mensaje").innerHTML =
                "Inicio de sesión correcto";

                setTimeout(function(){
                    window.location = "kwitter_room.html";
                },1000);

            }else{

                document.getElementById("mensaje").innerHTML =
                "Contraseña incorrecta";
            }

        }else{

            document.getElementById("mensaje").innerHTML =
            "Usuario no encontrado";
        }

    });

}