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

$("#signUp").onclick = function (){
	  $hide("#ub-join");
	  if ($("#username").value != null && $("#username").value.length >= 5 && $("#username").value.length <= 18) {
    firebase.auth().createUserWithEmailAndPassword($("#email").value, $("#password").value)
    .then((data) => {
      $hide("#ub-join");
      return signUpQuery(new Date(), data), signUpAlert(data);
    })
    .catch((error) => {
      $show("#ub-join");
      openAlert(error.code, error.message, "Previous", function(){
         $show("#ub-join");
     });
    });
  } else {
  	$show("#ub-join");
      openAlert("auth/weak_username", "Your username must be 6-18 characters", "Previous", function(){
         $show("#ub-join");
     });
  }
};

$("#signIn").onclick = function (){
	$hide("#ub-join");
    firebase.auth().signInWithEmailAndPassword($("#email").value, $("#password").value)
    .then((data) => {
      $hide("#ub-join");
      return signInQuery(new Date(), data), signInAlert(data);
    })
    .catch((error) => {
      $show("#ub-join");
      openAlert(error.code, error.message, "Previous", function(){
         $show("#ub-join");
     });
    });
};

$("#toSignIn").onclick = function(){
  $hide("#username");
  $show("#signIn");
  $hide("#toSignIn");
  $show("#toSignUp");
  $hide("#signUp");
  $("#sign").innerHTML = "Sign In";
};

$("#toSignUp").onclick = function(){
  $show("#username");
  $hide("#signIn");
  $show("#toSignIn");
  $show("#signUp");
  $hide("#toSignUp");
  $("#sign").innerHTML = "Sign Up";
};

function signUpQuery(today, data){
     firebase.database().ref('users/'+data.user.uid).set({
        userid: data.user.uid,
        name: $("#username").value,
        email: data.user.email,
        password: $("#password").value,
        avater: "https://ubeyin.github.io/icon/user.png",
        username: $("#username").value.toLowerCase().replaceAll(" ","_")
     });
     firebase.database().ref('activity/'+data.user.uid).set({
        joinDate: {
            format: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
            day: today.getDate(),
            month: (today.getMonth()+1),
            year: today.getFullYear(),
            hour: today.getHours(),
            minute: today.getMinutes(),
            second: today.getSeconds()
        },
        joinOn: navigator.appCodeName,
        lastSync: null,
        lastSyncOn: null
     });
}

function signInQuery(today, data){
    firebase.database().ref('activity/'+data.user.uid).update({
         lastSync: {
            format: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
            day: today.getDate(),
            month: (today.getMonth()+1),
            year: today.getFullYear(),
            hour: today.getHours(),
            minute: today.getMinutes(),
            second: today.getSeconds()
        },
        lastSyncOn: navigator.appCodeName
    });
}

function signInAlert(data){
	firebase.database().ref("users/"+data.user.uid).child("Name").on("value", function(snapshot) {
       if(snapshot.exists()){
           openAlert("Dear "+snapshot.val(), "You have been successfully redirected to your account.<br>Your current email address is "+data.user.email, "Continue", function(){
               $hide("#ub-join-container");
               $show("#ub-dash-container");
               $hide("#ub-guest-container");
               $hide("#ub-anltcs-container");
           });
       }
  });
}

function signUpAlert(data){
	 openAlert($("#username").value, "You have been successfully created an account.<br>Your current email address is "+data.user.email, "Continue to dashboard", function(){
         $hide("#ub-join-container");
         $show("#ub-dash-container");
         $hide("#ub-guest-container");
         $hide("#ub-anltcs-container");
     });
}

function openAlert(title, message, button, event){
	$show("#ub-alert-x");
	$show("#ub-alert");
	$("#ub-alert > h3").innerHTML = title;
	$("#ub-alert > div").innerHTML = message;
	$("#ub-alert-btn").innerHTML = button;
	$("#ub-alert-btn").onclick = function(){
         $hide("#ub-alert");
         $hide("#ub-alert-x");
         $("#ub-alert > h3").innerHTML = "";
	     $("#ub-alert > div").innerHTML = "";
	     $("#ub-alert-btn").innerHTML = "";
	    return event();
     };
}


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

// All functions of order
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
       firebase.database().ref("users/"+data.user.uid).child("Name").on("value", function(snapshot) {
          if(snapshot.exists()){
             openAlert("Dear "+snapshot.val(), "You have been successfully redirected to your account.<br>Your current email address is "+data.user.email, "Continue", function(){
                 $hide("#ub-join-container");
                 $show("#ub-dash-container");
                 $hide("#ub-guest-container");
                 $hide("#ub-anltcs-container");
             });
          }
      });
      $hide("#ub-join-container");
      $show("#ub-dash-container");
      $hide("#ub-guest-container");
      $hide("#ub-anltcs-container");
    } else {
      $show("#ub-guest-container");
      $hide("#ub-dash-container");
      $hide("#ub-guest-container");
      $hide("#ub-join-container");
      $hide("#ub-anltcs-container");
    }
});