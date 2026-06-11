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

var user_name = localStorage.getItem("user_name");
var room_name = localStorage.getItem("room_name");

document.getElementById("room_name").innerHTML = "#" + room_name;

// 💬 ENVIAR MENSAJE
function send() {

    var msg = document.getElementById("msg").value;

    if (msg === "") return;

    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like: 0
    });

    document.getElementById("msg").value = "";
}

// 📡 LEER MENSAJES
function getData() {

    firebase.database().ref(room_name).on("value", function(snapshot) {

        document.getElementById("output").innerHTML = "";

        snapshot.forEach(function(childSnapshot) {

            var key = childSnapshot.key;
            var data = childSnapshot.val();

            if (key !== "purpose") {

                var message_id = key;
                var data_val = data;

                var name = data_val.name;
                var message = data_val.message;
                var like = data_val.like;

                var row =
                "<div style='background:#fff; padding:10px; border-radius:10px; margin:10px 0;'>" +
                    "<h4>" + name + "</h4>" +
                    "<p>" + message + "</p>" +
                    "<button class='btn btn-warning btn-sm' id='" + message_id + "' onclick='updateLike(this.id)' value='" + like + "'>" +
                        "👍 Like: " + like +
                    "</button>" +
                "</div><hr>";

                document.getElementById("output").innerHTML += row;
            }
        });

    });
}

getData();

// 👍 LIKE
function updateLike(id) {

    var button = document.getElementById(id);
    var likes = button.value;

    var updated_likes = Number(likes) + 1;

    firebase.database().ref(room_name).child(id).update({
        like: updated_likes
    });
}

// 🚪 LOGOUT
function logout() {

    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");

    window.location = "login.html";
}