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

// All functions of HTML Elements
function $TO_SIGNIN() {
  $("#username").style.display = "none";
  $("#signIn").style.display = "";
  $("#toSignIn").style.display = "none";
  $("#toSignUp").style.display = "";
  $("#signUp").style.display = "none";
  $("#sign").innerHTML = "Sign In";
}

function $TO_SIGNUP() {
  $("#username").style.display = "";
  $("#signIn").style.display = "none";
  $("#toSignIn").style.display = "";
  $("#signUp").style.display = "";
  $("#toSignUp").style.display = "none";
  $("#sign").innerHTML = "Sign Up";
}

(function(){
	
})();

// All functions of Module
function $(x) {
     return document.querySelector(x);
}
function $hide(x) {
     return document.querySelector(x).style.display = "none";
}
function $show(x) {
     return document.querySelector(x).style.display = "block";
}