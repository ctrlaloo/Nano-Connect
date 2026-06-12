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

// 👤 usuario
var user_name = localStorage.getItem("user_name");

// 🚨 protección por si no hay usuario
if (user_name != null) {
    document.getElementById("user_name").innerHTML =
    "¡Bienvenido " + user_name + "!";
}

// ➕ crear room
function addRoom() {

    var room_name = document.getElementById("room_name").value;

    if (room_name === "") {
        alert("Escribe un nombre de room");
        return;
    }

    firebase.database().ref("/").child(room_name).update({
        purpose: "adding room name"
    });

    localStorage.setItem("room_name", room_name);

    window.location = "kwitter_page.html";
}

// 📡 obtener rooms
function getData() {

    firebase.database().ref("/").on('value', function(snapshot) {

        document.getElementById("output").innerHTML = "";

        snapshot.forEach(function(childSnapshot) {

            var room_name = childSnapshot.key;

            console.log("Room Name - " + room_name);

            var row =
            "<div class='room_name' id='" + room_name + "' onclick='redirectToRoomName(this.id)'>» " +
            room_name +
            "</div><hr>";

            document.getElementById("output").innerHTML += row;
        });

    });

}

getData();

// 🔁 entrar a room
function redirectToRoomName(name) {

    console.log(name);

    localStorage.setItem("room_name", name);

    window.location = "kwitter_page.html";
}

// 🚪 logout
function logout() {

    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");

    window.location = "login.html";
}