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
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;
      $hide("#ub-join");
      $show("#ub-join-alert");
      $("#ub-join-alert").innerHTML = '<h3>'+$("#username").value+'</h3><p>You have been successfully created an account.<br>Your current email address is '+data.user.email+'<br></p><button class="ub-btn-x" id="ub-join-alert-btn">Continue to dashboard</button>';
      $("#ub-join-alert-btn").onclick = function(){
         $hide("#ub-join-container");
         $show("#ub-dash-container");
         $hide("#ub-guest-container");
         $hide("#ub-anltcs-container");
         $("#ub-join-alert").innerHTML = '';
     };
     firebase.database().ref('users/'+data.user.uid).set({
        UserID: data.user.uid,
        Name: $("#username").value,
        Email: data.user.email,
        Avater: "https://ubeyin.github.io/icon/user.png",
        JoinDate: dateTime,
        LastSync: dateTime
      });
    })
    .catch((error) => {
      $hide("#ub-join");
      $show("#ub-join-alert");
      $("#ub-join-alert").innerHTML = '<h3>'+error.code+'</h3><p>'+error.message+'</p><button class="ub-btn-x" id="ub-join-alert-btn">Try Again</button>';
  
      $("#ub-join-alert-btn").onclick = function() {
        $show("#ub-join");
        $hide("#ub-join-alert");
        $("#ub-join-alert").innerHTML = '';
      }
    });
  } else {
      $hide("#ub-join");
      $show("#ub-join-alert");
      $("#ub-join-alert").innerHTML = '<h3>auth/weak_username</h3><p>Your username must be 6-18 characters.</p><button class="ub-btn-x" id="ub-join-alert-btn">Try Again</button>';
      $("#ub-join-alert-btn").onclick = function() {
        $show("#ub-join");
        $hide("#ub-join-alert");
        $("#ub-join-alert").innerHTML = '';
      }
  }
};

$("#signIn").onclick = function (){
	$hide("#ub-join");
    firebase.auth().signInWithEmailAndPassword($("#email").value, $("#password").value)
    .then((data) => {
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;
      $hide("#ub-join");
      $show("#ub-join-alert");
      firebase.database().ref("users/"+data.user.uid).child("Name").on("value", function(snapshot) {
       if(snapshot.exists()){
           $("#ub-join-alert").innerHTML = '<h3>'+snapshot.val()+'</h3><p>Press continue to redirect at dashboard</p><button class="ub-btn-x" id="ub-join-alert-btn">Continue to dashboard</button>';
          console.log(snapshot.val());
       }
      $("#ub-join-alert-btn").onclick = function(){
         $hide("#ub-join-container");
         $show("#ub-dash-container");
         $hide("#ub-guest-container");
         $hide("#ub-anltcs-container");
         $("#ub-join-alert").innerHTML = '';
      };
      });
      firebase.database().ref('users/'+data.user.uid).update({
        LastSync: dateTime,
        LastSyncOn: navigator.appCodeName
      });
    })
    .catch((error) => {
      $hide("#ub-join");
      $show("#ub-join-alert");
      $("#ub-join-alert").innerHTML = '<h3>'+error.code+'</h3><p>'+error.message+'</p><button class="ub-btn-x" id="ub-join-alert-btn">Try Again</button>';
      $("#ub-join-alert-btn").onclick = function() {
        $show("#ub-join");
        $hide("#ub-join-alert");
        $("#ub-join-alert").innerHTML = '';
      }
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