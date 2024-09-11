var root = document.getElementById("root")


var firebaseConfig = {
    apiKey: "AIzaSyCrMRSKL5jVLHCXUu6PSugxg70YgZA4Tvg",
    authDomain: "raheel-pertice.firebaseapp.com",
    projectId: "raheel-pertice",
    storageBucket: "raheel-pertice.appspot.com",
    messagingSenderId: "554756930481",
    appId: "1:554756930481:web:4e62641cbd397f05dc5b90",
    measurementId: "G-HFVHQ9SQ2D"
};
var provider = new firebase.auth.GoogleAuthProvider();
firebase.initializeApp(firebaseConfig)

   var email = document.getElementById("email")
   var password = document.getElementById("password")

var auth = firebase.auth()
var db = firebase.firestore();



function myfunchion() {
    var val = document.getElementsByName("sex")
    var gender;
    // console.log(val)
    for (i = 0; i < val.length; i++) {
        // console.log(val[i].checked)
        if (val[i].checked) {
            gender = val[i].value
        }
    }

    // Extract values from the HTML elements
    


    auth.createUserWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            // ...
            var data = {
                first: document.getElementById("first_name").value,
                last: document.getElementById("sur_name").value,
                gmail: document.getElementById("email").value,
                password: document.getElementById("password").value,
                day: document.getElementById("day").value,
                month: document.getElementById("month").value,
                year: document.getElementById("year").value,
                sex: gender,
                uid : user.uid
        
            };
            db.collection("users").add(data)
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
            console.log(errorMessage, "gg")
        });

}

function login() {
    
       var email = document.getElementById("gmail").value
       var password = document.getElementById("password").value

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // ...
            console.log("yes",user)
            db.collection("users").where("uid", "==", user.uid)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data())
           var data_login = document.createTextNode( doc.data().gmail)
           root.appendChild(data_login)
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
            
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

        });
}