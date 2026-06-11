firebase.initializeApp(firebaseConfig);

function crearPost() {

    var text = document.getElementById("post_text").value;
    var img = document.getElementById("post_img").value;

    firebase.database().ref("posts").push({
        user: localStorage.getItem("user_name"),
        text: text,
        img: img,
        likes: 0,
        time: Date.now()
    });

    document.getElementById("post_text").value = "";
    document.getElementById("post_img").value = "";
}