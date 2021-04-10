console.info("'app-ubeyin.js' is ready.");

var Ubeyin;
var init = {};
var config = {};

var e = $("email").value;
var p = $("password").value;
var n = $("username").value;

window.onload = function() {
  setTimeout(function() {
    config = {
      apiKey: "AIzaSyAE9eqPw5-XTBwx0gIRZGpKxftLm8uS6NU",
      authDomain: "ubeyin-data.firebaseapp.com",
      databaseURL: "ubeyin-data-default-rtdb.firebaseio.com",
      projectId: "ubeyin-data",
      storageBucket: "ubeyin-data.appspot.com",
      messagingSenderId: "154658789445",
      appId: "1:154658789445:web:ab9dde4fd5e795c4d62b2c",
      measurementId: "G-6W9W2FJW3X"
    };
    firebase.initializeApp(config);
    firebase.analytics();
  }, 100);
};

setInterval(function () {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $("form-x").style.display = "none";
    } else {
      $("form").style.display = "block";
    }
  });
}, 500);

function signup() {
  var e = $("email").value;
  var p = $("password").value;
  var n = $("username").value;
  firebase.auth().createUserWithEmailAndPassword(e, p)
  .then((userCredential) => {
    $auth_data({
      id: userCredential.user.uid,
      name: n,
      email: userCredential.user.email,
      avater: "https://ubeyin.github.io/icon/ubeyin.png"
    });
    $welcome();
    $("form-x").style.display = "none";
    $("form-y").style.display = "block";
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(error.message);
  });
}

function signin() {
  var e = $("email").value;
  var p = $("password").value;
  firebase.auth().signInWithEmailAndPassword(e, p)
  .then((userCredential) => {
    $("form-x").style.display = "none";
    $("form-y").style.display = "block";
    alert("Welcome back, "+userCredential.user.email);
    $welcome(userCredential.user.uid);
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(error.message);
  });
}

function signInO() {
  $("username").style.display = "none";
  $("signin-btnx").style.display = "";
  $("signin-btn").style.display = "none";
  $("signup-btnx").style.display = "none";
  $("signup-btn").style.display = "";
  $("signup").innerHTML = "Sign In";
}

function signUpO() {
  $("username").style.display = "";
  $("signin-btnx").style.display = "none";
  $("signin-btn").style.display = "";
  $("signup-btnx").style.display = "";
  $("signup-btn").style.display = "none";
  $("signup").innerHTML = "Sign Up";
}
function signout() {
  firebase.auth().signOut().then(() => {
    alert("Sign-out successful.");
  }).catch((error) => {
    alert("An error happened.");
  });
}
function $(x) {
  return document.getElementById(x);
}
function $auth_data(x) {
  firebase.database().ref('users/' + x.id).set(x);
}
function $welcome(userId){
  firebase.database().child("users").child(userId).get().then(function(snapshot) {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  }
  else {
    console.log("No data available");
  }
}).catch(function(error) {
  console.error(error);
});
}

/*
var starCountRef = firebase.database().ref('posts/' + postId + '/starCount');
starCountRef.on('value', (snapshot) => {
  const data = snapshot.val();
  updateStarCount(postElement, data);
});
*/