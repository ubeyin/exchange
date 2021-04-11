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
      $("form-y").style.display = "block";
    } else {
      $("form-x").style.display = "block";
      $("form-z").style.display = "none";
    }
  });
}, 500);

function signup() {
  var e = $("email").value;
  var p = $("password").value;
  var n = $("username").value;
  $("form-z").style.display = "block";
  $("form-x-copy").style.display = "none";
  firebase.auth().createUserWithEmailAndPassword(e, p)
  .then((userCredential) => {
    $auth_data({
      id: userCredential.user.uid,
      name: n,
      email: userCredential.user.email,
      avater: "https://ubeyin.github.io/icon/ubeyin.png"
    });
    $welcome(userCredential.user.uid, "You have been successfully created an account. Your account id is <i>"+userCredential.user.uid+"</i><br>Now press the button to gets started and make a new discover.");
    $("form-x").style.display = "none";
    $("form-y").style.display = "block";
    $("form-z").style.display = "none";
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.error(error.message);
    $("form-z").style.display = "none";
    $("form-w").style.display = "block";
    $("form-w-e1").innerHTML = errorCode;
    $("form-w-e2").innerHTML = errorMessage;
    $("form-w-btn").onclick = function(){
         $("form-w").style.display = "none";
         $("form-x-copy").style.display = "block";
    }
  });
}

function signin() {
  var e = $("email").value;
  var p = $("password").value;
  $("form-z").style.display = "block";
  $("form-x-copy").style.display = "none";
  firebase.auth().signInWithEmailAndPassword(e, p)
  .then((userCredential) => {
    $welcome(userCredential.user.uid, "Welcome back to ubeyin. You have been logged in to your account to <i>"+e+"</i><br>Now press the button to gets started and make a new discover.");
    $("form-x").style.display = "none";
    $("form-y").style.display = "block";
    $("form-z").style.display = "none";
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.error(error.message);
    $("form-z").style.display = "none";
    $("form-w").style.display = "block";
    $("form-w-e1").innerHTML = errorCode;
    $("form-w-e2").innerHTML = errorMessage;
    $("form-w-btn").onclick = function(){
         $("form-w").style.display = "none";
         $("form-x-copy").style.display = "block";
    }
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
function $welcome(userId, message){
  firebase.database().ref("users/" + userId).get().then(function(snapshot) {
  if (snapshot.exists()) {
    $("form-y-img").src = snapshot.val().avater;
    $("form-y-e1").innerHTML = "Welcome <i>"+snapshot.val().name+"</i>";
    $("form-y-e2").innerHTML = message;
    
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