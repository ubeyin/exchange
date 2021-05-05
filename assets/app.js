/*
      Source: https://ubeyin.github.io/assets/app.js
      Licensed under Creative Commons, MIT And Apache 2.0.
      Copyright 2021 by Ubeyin LLC.
*/

let authData = null;

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
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    firebase.analytics();
  },
    100);
};

// All functions of HTML Elements
$("#ub-topic-btn").onclick = function () {
  $show("#ub-join-container");
  $hide("#ub-dash-container");
  $hide("#ub-guest-container");
  $hide("#ub-anltcs-container");
};

$("#signUp").onclick = function () {
  $show("#ub-join-layer");
  if ($("#username").value != null && $("#username").value.length >= 5 && $("#username").value.length <= 18) {
    firebase.auth().createUserWithEmailAndPassword($("#email").value, $("#password").value)
    .then((data) => {
      signUpQuery(new Date(), data.user);
      signUpAlert(data.user);
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
    signInQuery(new Date(), data.user);
    signInAlert(data.user);
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
  } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
    var textarea = document.createElement("textarea");
    textarea.textContent = text;
    textarea.style.opacity = 0;
    textarea.style.position = "fixed";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      return document.execCommand("copy");
    }
    catch (ex) {
      alert.error("Copy to clipboard failed");
      return false;
    }
    finally {
      document.body.removeChild(textarea);
      alert.log("Copied to clipboard");
    }
  }
}

// All functions of Database
function signUpQuery(today, data) {
  firebase.database().ref('users/'+data.uid).set({
    id: data.uid,
    avater: "https://ubeyin.github.io/icon/user.png",
    name: $("#username").value,
    email: data.email,
    isVerified: false
  });
  firebase.database().ref('qa/'+data.uid).set({});
  firebase.database().ref('play/'+data.uid).set({
    level: 1,
    xp: 100
  });
  firebase.database().ref('activity/'+data.uid).set({
    joined: {
      date: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
      format: {
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
  firebase.database().ref('activity/'+data.uid).update({
    logged: {
      date: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
      format: {
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
  $("#dash-uid").innerHTML = "<i class='fa fa-fingerprint'></i>"+data.uid;
  firebase.database().ref("users").child(data.uid).on("value", function(snapshot) {
    $hide("#ub-join-layer");
    if (snapshot.exists()) {
      $("#dash-uname").innerHTML = snapshot.val().name;
    } else {
      $("#dash-uname").innerHTML = "Welcome";
    }
    if (snapshot.val().isVerified == true) {
      $show("#dash-alert-main");
      $("#dash-alert-msg").innerHTML = '<i id="dash-alert-icon" class="fa fa-bell"></i> You have been verified by our teams. Now you can get started.';
      /**/ $hide("#ub-join-layer");
    } else if (snapshot.val().isVerified == false) {
      $show("#dash-alert-main");
      $("#dash-alert-msg").innerHTML = '<i id="dash-alert-icon" class="fa fa-bell"></i>You are not a verified user, wait for verification';
      /**/ $hide("#ub-join-layer");
    }
    /**/ $hide("#ub-join-layer");
  });
}

// All functions of order
function signInAlert(data) {
  openAlert("Welcome back",
    "You have been successfully redirected to your account.<br>Your current email address is "+data.email,
    "Continue to dashboard",
    function() {
      $hide("#ub-join-container");
      $show("#ub-dash-container");
      $hide("#ub-guest-container");
      $hide("#ub-anltcs-container");
      $show("#ub-join-layer");
      handleMore(data);
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
      handleMore(data);
      setTimeout(function() {
        /**/ $hide("#ub-join-layer");
      }, 2000);
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
function openInputAlert(title, message, button, event) {
  $show("#ub-i-alert-x");
  $show("#ub-i-alert");
  $("#ub-i-alert > input").value = "";
  $("#ub-i-alert > h3").innerHTML = title;
  $("#ub-i-alert > input").placeholder = message;
  $("#ub-i-alert-btn").innerHTML = button;
  $("#ub-i-alert-btn").onclick = function() {
       return event($("#ub-i-alert > input").value);
  };

  	$show("#ub-c-alert-btn");
      $("#ub-c-alert-btn").onclick = function(){
      	$hide("#ub-i-alert");
    $hide("#ub-i-alert-x");
    $("#ub-i-alert > h3").innerHTML = "";
    $("#ub-i-alert > input").placeholder = "";
    $("#ub-i-alert-btn").innerHTML = button;
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

function handleMore(data) {
	
}

  $("#dash-uname").onclick = function() {
    console.log(firebase.auth().currentUser.uid);
    openInputAlert("Change Name", "Enter a username", "Update now", function(x) {
    firebase.database().ref("users").child(firebase.auth().currentUser.uid).on("value",
      function(snapshot) {
        if (snapshot.val().isVerified == true) {
          	firebase.database().ref("users").child(firebase.auth().currentUser.uid).update({
          	name: x
          });
          } else {
            alert.error("You are not a verified user");
          }
          });
          $hide("#ub-i-alert");
    $hide("#ub-i-alert-x");
    $("#ub-i-alert > h3").innerHTML = "";
    $("#ub-i-alert > input").placeholder = "";
    $("#ub-i-alert-btn").innerHTML = "";
    });
      }

    /* Alerts */
    let alert_main = document.getElementById('ub-alert-main');
    let alert_msg = document.getElementById('ub-alert-msg');
    let alert_btn = document.getElementById('ub-alert-btn');

    alert_btn.onclick = function() {
      alert_main.style.height = '0px';
    }

    alert_main.ontouchmove = function() {
      alert_main.style.height = '0px';
    }

    alert["error"] = function(msg) {
      document.getElementById('ub-alert-icon').className = 'fa fa-warning';
      if (msg != "" && msg != null) {
        alert_msg.innerHTML = msg;
      } else if (msg == null) {
        alert_msg.innerHTML = "Null";
      } else if (msg == "") {
        alert_msg.innerHTML = "Empty";
      } else {
        alert_msg.innerHTML = "Undefined";
      }
      setTimeout(()=> {
        alert_main.style.height = '0px';
      }, 2500);
      alert_main.style.height = '50px';
      alert_main.style.background = '#ff3535';
    }
    alert["log"] = function(msg) {
      document.getElementById('ub-alert-icon').className = 'fa fa-bell';
      if (msg != "" && msg != null) {
        alert_msg.innerHTML = msg;
      } else if (msg == null) {
        alert_msg.innerHTML = "Null";
      } else if (msg == "") {
        alert_msg.innerHTML = "Empty";
      } else {
        alert_msg.innerHTML = "Undefined";
      }
      setTimeout(()=> {
        alert_main.style.height = '0px';
      }, 2500);
      alert_main.style.height = '50px';
      alert_main.style.background = '#222';
    }
    
/** Q/A Search **/
$("#ub-dash-search").onclick=function(){
openInputAlert("Search", "Type some keywords", "Search now", function(x) {
  document.getElementById('ub-dash-qa-p').innerHTML = "";
  if (x) {
    let results1 = "";
    let results2 = "";
    
    var url1 = "https://en.wikipedia.org/w/api.php";
    var url2 = "https://api.stackexchange.com/search/advanced?site=stackoverflow.com&q="+x;
    
    $show("#ub-join-layer");

    var params = {
      action: "query",
      list: "search",
      srsearch: x,
      format: "json"
    };
    url1 = url1 + "?origin=*";
    Object.keys(params).forEach(function(key) {
      url1 += "&" + key + "=" + params[key];
    });

    setTimeout(function() {
      fetch(url1)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        $hide("#ub-join-layer");
       
        for (var i = 0; i < response.query.search.length; i++) {
          results1 += '<hr><tr style="font-size: 14px" class="ub-qa-post"><td style="min-width:120px"><p style="font-size: 14px">'+response.query.search[i].title+'</p></td><td><p style="font-size: 14px">'+response.query.search[i].snippet+'....<br><a href= "http://en.wikipedia.org/wiki?curid='+response.query.search[i].pageid+'" target="_parent"> Read more </a></p></td> </tr>'+"<br><br>";
        }
        document.getElementById('ub-dash-qa-p').innerHTML += results1;
         });
    }, 50);
    
    setTimeout(function() {
      fetch(url2)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        $hide("#ub-join-layer");
        
        for (var i = 0; i < response.items.length; i++) {
          let answer = response.items[i].answer_count;
          let view = response.items[i].view_count;
          let tags = "";
          for (var k = 0; k < response.items[i].tags.length; k++) {
            tags += '<span class="badge bg-primary" style="margin: 5px; margin-right: 10px;">'+response.items[i].tags[k]+'</span>';
          }
          results2 += '<hr><tr style="font-size: 14px"><td><p style="font-size: 14px"><img style="width: 30px; height: 30px; border-radius:100rem; background: #eee;" src="'+response.items[i].owner.profile_image+'"/><br>'+response.items[i].owner.display_name+'<br><br>'+response.items[i].title+'<br><a href= "'+response.items[i].link+'" target="_parent"> Read more </a><br><br><i class="fa fa-comments"></i> '+answer+'<i style="padding-left:19px"></i>'+'<i class="fa fa-eye"></i> '+view+'</p>'+tags+'<br></td></tr>';
        }
        document.getElementById('ub-dash-qa-p').innerHTML += results2;
        $hide("#ub-i-alert");
    $hide("#ub-i-alert-x");
    $("#ub-i-alert > h3").innerHTML = "";
    $("#ub-i-alert > input").placeholder = "";
    $("#ub-i-alert-btn").innerHTML = "";
        });
    }, 50);
   
  } else {
    
  }
});
}
