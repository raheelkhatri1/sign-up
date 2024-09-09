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




var db = firebase.firestore();

function myfunchion() {
    // Extract values from the HTML elements
    var data = {
        first: document.getElementById("first_name").value,
        last: document.getElementById("sur_name").value,
        gmail: document.getElementById("gmail").value,
        password: document.getElementById("password").value,
        day: document.getElementById("day").value,
        month: document.getElementById("month").value,
        year: document.getElementById("year").value,
        sex: document.getElementById("sex").value
    };
    

    console.log(data);

    // Add the data to Firestore
    db.collection("users").add(data)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}

function login() {
    var data = {
        gmail: document.getElementById("gmail").value,
        password: document.getElementById("password").value,
    }
    db.collection("users")
        .where("gmail", "==", data)
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                console.log("No matching documents.");
                return;
            }

            // Results ko iterate karna
            querySnapshot.forEach((doc) => {
                console.log(doc.id , doc.data());
            });
        })
        .catch((error) => {
            console.error("Error getting documents: ", error);
        });
}