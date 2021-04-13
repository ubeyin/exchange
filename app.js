var Ubeyin;
var init = false;
var config = {};

var e = $ID_NAME("email").value;
var p = $ID_NAME("password").value;
var n = $ID_NAME("username").value;

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
      $ID_NAME("form-x").style.display = "none";
      $ID_NAME("form-z").style.display = "none";
      $ID_NAME("form-y").style.display = "block";

      if (init == false) {
        $USER_DATA(user.uid, "Welcome back to ubeyin. You are current logged in to <i>"+user.email+"</i><br>Now press the button to gets started and make a new discover.");
      }
    } else {
      $ID_NAME("form-x").style.display = "block";
      $ID_NAME("form-y").style.display = "none";
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
      $USER_DATA(userCredential.user.uid,
        "You have been successfully created an account. Your account id is <i>"+userCredential.user.uid+"</i><br>Now press the button to gets started and make a new discover.",
        "You have been successfully created an account. <br>Now press the button to gets started and make a new discover.");
      $ID_NAME("form-x").style.display = "none";
      $ID_NAME("form-y").style.display = "block";
      $ID_NAME("form-z").style.display = "none";
      init = true;

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
    $USER_DATA(userCredential.user.uid,
      "Welcome back to ubeyin. You have been logged in to your account to <i>"+e+"</i><br>Now press the button to gets started and make a new discover.",
      "Welcome back to ubeyin. You have been logged in to your account.<br>Now press the button to gets started and make a new discover.");
    $ID_NAME("form-x").style.display = "none";
    $ID_NAME("form-y").style.display = "block";
    $ID_NAME("form-z").style.display = "none";
    init = true;
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
    alert("Sign-out successful.");
  }).catch((error) => {
    alert("An error happened.");
  });
}
function $ID_NAME(x) {
  return document.getElementById(x);
}
function $SET_DATA(x) {
  firebase.database().ref('users/' + x.id).set(x);
}
function $USER_DATA(userId, message1, message2) {
  firebase.database().ref("users/" + userId).get().then(function(snapshot) {
    if (snapshot.exists()) {
      $ID_NAME("form-y-img").src = snapshot.val().avater;
      $ID_NAME("form-y-e1").innerHTML = "Welcome <i>"+snapshot.val().name+"</i>";
      $ID_NAME("form-y-e2").innerHTML = message1;
      $ID_NAME("form-y-btn").style.display = "block";
    } else {
      $ID_NAME("form-y-img").src = snapshot.val().avater;
      $ID_NAME("form-y-e1").innerHTML = "Welcome <i>"+snapshot.val().name+"</i>";
      $ID_NAME("form-y-e2").innerHTML = message2;
      $ID_NAME("form-y-btn").style.display = "block";
    }
  }).catch(function(error) {
    $ID_NAME("form-y-img").src = snapshot.val().avater;
    $ID_NAME("form-y-e1").innerHTML = "Welcome <i>User</i>";
    $ID_NAME("form-y-e2").innerHTML = "Somethings error occurred! your profile data is not loaded. Error: "+error+"<br>You can go to home by press the button.";
    $ID_NAME("form-y-btn").style.display = "block";
  });
}

/*
var starCountRef = firebase.database().ref('posts/' + postId + '/starCount');
starCountRef.on('value', (snapshot) => {
  const data = snapshot.val();
  updateStarCount(postElement, data);
});
*/