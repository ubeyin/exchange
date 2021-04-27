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
$("#ub-topic-btn").onclick = function (){
	$hide("#ub-guest-container");
	$show("#ub-join-container");
};

function $TO_SIGNIN() {
  $hide("#username");
  $show("#signIn");
  $hide("#toSignIn");
  $show("#toSignUp");
  $hide("#signUp");
  $("#sign").innerHTML = "Sign In";
}

function $TO_SIGNUP() {
  $show("#username");
  $hide("#signIn");
  $show("#toSignIn");
  $show("#signUp");
  $hide("#toSignUp");
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
     return document.querySelector(x).style.display = "";
}