/*
      Source: https://ubeyin.github.io/assets/app.js
      Licensed under Creative Commons, MIT And Apache 2.0.
      Copyright 2021 by Ubeyin LLC.
*/

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
$("#ub-topic-btn").onclick = function () {
  $hide("#ub-guest-container");
  $show("#ub-join-container");
};

$("#signUp").onclick = function () {
  $show("#ub-join-layer");
  if ($("#username").value != null && $("#username").value.length >= 5 && $("#username").value.length <= 18) {
    firebase.auth().createUserWithEmailAndPassword($("#email").value, $("#password").value)
    .then((data) => {
      signUpQuery(new Date(), data);
      signUpAlert(data);
      $hide("#ub-join-layer");
      dashQuery(data.user);
    })
    .catch((error) => {
      openAlert(error.code, error.message, "Previous", function() {
        $show("#ub-join");
      });
      $hide("#ub-join-layer");
    });
  } else {
    openAlert("auth/weak_username", "Your username must be 6-18 characters", "Previous", function() {
      $show("#ub-join");
    });
    $hide("#ub-join-layer");
  }
};

$("#signIn").onclick = function () {
  $show("#ub-join-layer");
  firebase.auth().signInWithEmailAndPassword($("#email").value, $("#password").value)
  .then((data) => {
    signInQuery(new Date(), data);
    signInAlert(data);
    dashQuery(data.user);
  })
  .catch((error) => {
    openAlert(error.code, error.message, "Previous", function() {
      $show("#ub-join");
    });
    $hide("#ub-join-layer");
  });
};

$("#toSignIn").onclick = function() {
  $hide("#username");
  $show("#signIn");
  $hide("#toSignIn");
  $show("#toSignUp");
  $hide("#signUp");
  $("#sign").innerHTML = "Sign In";
};

$("#toSignUp").onclick = function() {
  $show("#username");
  $hide("#signIn");
  $show("#toSignIn");
  $show("#signUp");
  $hide("#toSignUp");
  $("#sign").innerHTML = "Sign Up";
};

$("#dash-uid").onclick = function() {
  let copyText = $("#dash-uid").innerHTML;
  copyToClipboard(copyText);
  console.log(copyText+" copied to clipboard");
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

function copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        return window.clipboardData.setData("Text", text);
    }
    else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.opacity = 0;
        textarea.style.position = "fixed";
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        }
        catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        }
        finally {
            document.body.removeChild(textarea);
        }
    }
}

// All functions of Database
function signUpQuery(today, data) {
  firebase.database().ref('users/'+data.user.uid).set({
    id: data.user.uid,
    avater: "https://ubeyin.github.io/icon/user.png",
    name: $("#username").value,
    email: data.user.email,
    password: window.btoa($("#password").value),
    verification: false
  });
  firebase.database().ref('branch/'+data.user.uid).set({
    active: false
  });
  firebase.database().ref('activity/'+data.user.uid).set({
    joined: {
      format: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
      parts: {
        day: today.getDate(),
        month: (today.getMonth()+1),
        year: today.getFullYear(),
        hour: today.getHours(),
        minute: today.getMinutes(),
        second: today.getSeconds()
      },
      device: {
        name: getUA(),
        agent: navigator.userAgent
      }
    }
  });
}

function signInQuery(today, data) {
  firebase.database().ref('activity/'+data.user.uid).update({
    logged: {
      format: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
      parts: {
        day: today.getDate(),
        month: (today.getMonth()+1),
        year: today.getFullYear(),
        hour: today.getHours(),
        minute: today.getMinutes(),
        second: today.getSeconds()
      },
      device: {
        name: getUA(),
        agent: navigator.userAgent
      }
    }
  });
}

function dashQuery(data) {
  firebase.database().ref("users").child(data.uid).on("value", function(snapshot) {
    if (snapshot.exists()) {
      if(snapshot.val().active && snapshot.val().active == true){
          $("#ub-dash-branch p").innerHTML = snapshot.val().name;
      } else {
      	$("#ub-dash-branch p").innerHTML = "You have no branch";
      }
    } else {
      $("#ub-dash-branch p").innerHTML = "You have no branch";
    }
  });
  $("#dash-uid").innerHTML = "<i class='fa fa-fingerprint'></i>"+data.uid;
  firebase.database().ref("branch").child(data.uid).on("value", function(snapshot) {
    if (snapshot.exists()) {
      $("#dash-uname").innerHTML = snapshot.val().name;
    } else {
      $("#dash-uname").innerHTML = "Welcome";
    }
  });
}

// All functions of order
function signInAlert(data) {
        openAlert("Welcome back", "You have been successfully redirected to your account.<br>Your current email address is "+data.user.email, "Continue", function() {
          $hide("#ub-join-container");
          $show("#ub-dash-container");
          $hide("#ub-guest-container");
          $hide("#ub-anltcs-container");
        });
        $hide("#ub-join-layer");
}

function signUpAlert(data) {
  openAlert($("#username").value,
    "You have been successfully created an account.<br>Your current email address is "+data.user.email,
    "Continue to dashboard",
    function() {
      $hide("#ub-join-container");
      $show("#ub-dash-container");
      $hide("#ub-guest-container");
      $hide("#ub-anltcs-container");
    });
}

function openAlert(title, message, button, event) {
  $show("#ub-alert-x");
  $show("#ub-alert");
  $("#ub-alert > h3").innerHTML = title;
  $("#ub-alert > div").innerHTML = message;
  $("#ub-alert-btn").innerHTML = button;
  $("#ub-alert-btn").onclick = function() {
    $hide("#ub-alert");
    $hide("#ub-alert-x");
    $("#ub-alert > h3").innerHTML = "";
    $("#ub-alert > div").innerHTML = "";
    $("#ub-alert-btn").innerHTML = "";
    return event();
  };
}

const getUA = () => {
  let device = "Unknown";
  const ua = {
    "Generic Linux": /Linux/i,
    "Android": /Android/i,
    "BlackBerry": /BlackBerry/i,
    "Bluebird": /EF500/i,
    "Chrome OS": /CrOS/i,
    "Datalogic": /DL-AXIS/i,
    "Honeywell": /CT50/i,
    "iPad": /iPad/i,
    "iPhone": /iPhone/i,
    "iPod": /iPod/i,
    "macOS": /Macintosh/i,
    "Windows": /IEMobile|Windows/i,
    "Zebra": /TC70|TC55/i,
    "Opera": /Opera Mini/i
  }
  Object.keys(ua).map(v => navigator.userAgent.match(ua[v]) && (device = v));
  return device;
}

setTimeout(function() {
  var user = firebase.auth().currentUser;
  if (user) {
    firebase.database().ref("users/"+user.uid).child("Name").on("value", function(snapshot) {
      if (snapshot.exists()) {
        openAlert("Dear "+snapshot.val(), "You have been successfully redirected to your account.<br>Your current email address is "+user.email, "Continue", function() {
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
    dashQuery(user);
  } else {
    $show("#ub-guest-container");
    $hide("#ub-dash-container");
    $hide("#ub-guest-container");
    $hide("#ub-join-container");
    $hide("#ub-anltcs-container");
  }
}, 100);