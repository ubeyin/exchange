let Auth;

// All ID Names
var ubNav = document.getElementById("ub-nav");
var ubNavMenu = document.getElementById("ub-nav-menu");
var ubHome = document.getElementById("ub-home");
var ubAuth = document.getElementById("ub-auth");
var ubAuthForm = document.getElementById("ub-auth-form");
var ubAuthAccList = document.getElementById("ub-auth-acc-list");
var ubAuthAccListDiv = document.querySelector("#ub-auth-acc-list div");
var ubAuthAddAcc = document.getElementById("ub-auth-add-acc");

function $ID_NAME(x) {
  return document.getElementById(x);
}

// More
var config = {};

var e = $ID_NAME("email").value;
var p = $ID_NAME("password").value;
var n = $ID_NAME("username").value;

window.onload = function() {
  setTimeout(function() {
    config = {
      apiKey: "AIzaSyDIKeLgXGqY5qQWcwrD5py4FFMy3po1ML0",
      authDomain: "ubeyin-com.firebaseapp.com",
      databaseURL: "https://ubeyin-com-default-rtdb.firebaseio.com",
      projectId: "ubeyin-com",
      storageBucket: "ubeyin-com.appspot.com",
      messagingSenderId: "155369086546",
      appId: "1:155369086546:web:20406b62b899012ece098b",
      measurementId: "G-CB69VC6VEV"
    };
    firebase.initializeApp(config);
    firebase.analytics();
  }, 100);
};

setInterval(function () {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $ID_NAME("form-x").style.display = "none";
      $ID_NAME("form-x-copy").style.display = "none";
      $ID_NAME("form-z").style.display = "block";
      $USER_DATA(user.uid, user.email);
    } else {
      ubAuth.style.display = "none";
      $ID_NAME("form-x").style.display = "block";
      $ID_NAME("form-z").style.display = "none";
    }
  });
}, 100);

function $SIGN_UP() {
  var e = $ID_NAME("email").value;
  var p = $ID_NAME("password").value;
  var n = $ID_NAME("username").value;
  $ID_NAME("form-z").style.display = "block";
  $ID_NAME("form-x-copy").style.display = "none";
  if (n != null && n.length >= 5 && n.length <= 18) {

    firebase.auth().createUserWithEmailAndPassword(e, p)
    .then((userCredential) => {

      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;
      $SET_DATA({
        id: userCredential.user.uid,
        name: n,
        email: userCredential.user.email,
        avater: "https://ubeyin.github.io/icon/ubeyin.png",
        date: dateTime
      });
      $USER_DATA(userCredential.user.uid, userCredential.user.email);
      $ID_NAME("form-x").style.display = "none";
      $ID_NAME("form-z").style.display = "block";
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error(error.message);
      $ID_NAME("form-z").style.display = "none";
      $ID_NAME("form-w").style.display = "block";
      $ID_NAME("form-w-e1").innerHTML = errorCode;
      $ID_NAME("form-w-e2").innerHTML = errorMessage;
      $ID_NAME("form-w-btn").onclick = function() {
        $ID_NAME("form-w").style.display = "none";
        $ID_NAME("form-x-copy").style.display = "block";
      }
    });
  } else {
    $ID_NAME("form-z").style.display = "none";
    $ID_NAME("form-w").style.display = "block";
    $ID_NAME("form-w-e1").innerHTML = "auth/weak_username";
    $ID_NAME("form-w-e2").innerHTML = "Your username should be 6-18 characters.";
    $ID_NAME("form-w-btn").onclick = function() {
      $ID_NAME("form-w").style.display = "none";
      $ID_NAME("form-x-copy").style.display = "block";
    }
  }
}

function $SIGN_IN() {
  var e = $ID_NAME("email").value;
  var p = $ID_NAME("password").value;
  $ID_NAME("form-z").style.display = "block";
  $ID_NAME("form-x-copy").style.display = "none";
  firebase.auth().signInWithEmailAndPassword(e,
    p)
  .then((userCredential) => {
    $USER_DATA(userCredential.user.uid, userCredential.user.email);
    $ID_NAME("form-x").style.display = "none";
    $ID_NAME("form-z").style.display = "block";
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.error(error.message);
    $ID_NAME("form-z").style.display = "none";
    $ID_NAME("form-w").style.display = "block";
    $ID_NAME("form-w-e1").innerHTML = errorCode;
    $ID_NAME("form-w-e2").innerHTML = errorMessage;
    $ID_NAME("form-w-btn").onclick = function() {
      $ID_NAME("form-w").style.display = "none";
      $ID_NAME("form-x-copy").style.display = "block";
    }
  });
}

function $GO_SIGNIN() {
  $ID_NAME("username").style.display = "none";
  $ID_NAME("signin-btnx").style.display = "";
  $ID_NAME("signin-btn").style.display = "none";
  $ID_NAME("signup-btnx").style.display = "none";
  $ID_NAME("signup-btn").style.display = "";
  $ID_NAME("signup").innerHTML = "Sign In";
}

function $GO_SIGNUP() {
  $ID_NAME("username").style.display = "";
  $ID_NAME("signin-btnx").style.display = "none";
  $ID_NAME("signin-btn").style.display = "";
  $ID_NAME("signup-btnx").style.display = "";
  $ID_NAME("signup-btn").style.display = "none";
  $ID_NAME("signup").innerHTML = "Sign Up";
}
function $SIGN_OUT() {
  firebase.auth().signOut().then(() => {
  //  window.location.href = window.location.href;
  }).catch((error) => {
    
  });
}
function $SET_DATA(x) {
  firebase.database().ref('users/' + x.id).set(x);
}
function $USER_DATA(userId, email) {
  firebase.database().ref("users/" + userId).get().then(function(snapshot) {
  ubAuth.style.display = "block";
  ubAuthAccList.style.display = "block";
  ubAuthAddAcc.style.display = "block";
    if (snapshot.exists()) {
        ubAuthAccListDiv.querySelector("p strong").innerHTML = snapshot.val().name;
        ubAuthAccListDiv.querySelector("p span").innerHTML = email;
        ubAuthAccListDiv.querySelector("img").src = snapshot.val().avater;
    } else {
        ubAuthAccListDiv.querySelector("p strong").innerHTML = "No data";
        ubAuthAccListDiv.querySelector("p span").innerHTML = "Please delete your account and re-signup.";
        ubAuthAccListDiv.querySelector("img").src = "https://ubeyin.github.io/icon/ubeyin.png";
    }
  }).catch(function(error) {
        
  });
}
