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
    var img = document.getElementById("img_url").value;

    if (msg.trim() === "" && img.trim() === "") return;

    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        image: img,
        like: 0
    });

    document.getElementById("msg").value = "";
    document.getElementById("img_url").value = "";
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

                var name = data.name || "Anon";
                var message = data.message || "";
                var image = data.image || "";
                var like = data.like || 0;

                var imageTag = "";

                if (image !== "") {
                    imageTag = "<br><img src='" + image + "' style='max-width:200px;border-radius:10px;'>";
                }

                var row =
                "<div style='background:#fff;padding:10px;border-radius:10px;margin:10px 0;'>" +
                    "<h4>👤 " + name + "</h4>" +
                    "<p>" + message + "</p>" +
                    imageTag +
                    "<br><br>" +

                    "<button class='btn btn-warning btn-sm' id='" + message_id + "' value='" + like + "' onclick='updateLike(this.id)'>" +
                        "👍 Like: " + like +
                    "</button>" +

                "</div><hr>";

                document.getElementById("output").innerHTML += row;
            }
        });

    });
}

getData();

// LIKE FUNCIONAL
function updateLike(id) {

    var button = document.getElementById(id);
    var likes = button.value;

    firebase.database().ref(room_name).child(id).update({
        like: Number(likes) + 1
    });
}

// LOGOUT
function logout() {

    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");

    window.location = "login.html";
}
function searchRoom() {

    var input = document.getElementById("search_room").value.toLowerCase().trim();
    var rooms = document.getElementsByClassName("room_name");

    for (var i = 0; i < rooms.length; i++) {

        var txt = rooms[i].innerText.toLowerCase().replace("»", "").trim();

        if (txt.includes(input)) {
            rooms[i].style.display = "block";
        } else {
            rooms[i].style.display = "none";
        }
    }
}