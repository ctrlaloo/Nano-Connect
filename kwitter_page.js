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

    if (msg.trim() === "") return;

    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like: 0,

        // ⭐ REACCIONES
        reaccion_sonrisa: 0,
        reaccion_corazon: 0,
        reaccion_risa: 0
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

                var name = data.name || "Anon";
                var message = data.message || "";
                var like = data.like || 0;

                var reaccion_sonrisa = data.reaccion_sonrisa || 0;
                var reaccion_corazon = data.reaccion_corazon || 0;
                var reaccion_risa = data.reaccion_risa || 0;

                var row = `
                <div style="background:#fff; padding:10px; border-radius:10px; margin:10px 0;">

                    <h4>👤 ${name}</h4>

                    <p style="font-size:16px;">${message}</p>

                    <!-- 👍 LIKE -->
                    <button class="btn btn-warning btn-sm"
                        id="${message_id}"
                        value="${like}"
                        onclick="updateLike(this.id)">
                        👍 Like: ${like}
                    </button>

                    <br><br>

                    <!-- 😀 REACCIONES -->
                    <button class="btn btn-light btn-sm"
                        onclick="reaccion('${message_id}','reaccion_sonrisa')">
                        😀 ${reaccion_sonrisa}
                    </button>

                    <button class="btn btn-light btn-sm"
                        onclick="reaccion('${message_id}','reaccion_corazon')">
                        ❤️ ${reaccion_corazon}
                    </button>

                    <button class="btn btn-light btn-sm"
                        onclick="reaccion('${message_id}','reaccion_risa')">
                        😂 ${reaccion_risa}
                    </button>

                </div>
                <hr>
                `;

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

    firebase.database().ref(room_name).child(id).update({
        like: Number(likes) + 1
    });
}

// 😀 REACCIONES
function reaccion(message_id, tipo) {

    firebase.database()
    .ref(room_name)
    .child(message_id)
    .once("value")
    .then(function(snapshot){

        var actual = snapshot.val()[tipo] || 0;

        firebase.database()
        .ref(room_name)
        .child(message_id)
        .update({
            [tipo]: actual + 1
        });
    });
}

// 🚪 LOGOUT
function logout() {

    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");

    window.location = "login.html";
}