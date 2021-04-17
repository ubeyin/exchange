let Auth;

// All Variables

$ = function(id) {
 return document.getElementById(id);
};

// All ID Names
var ubNav = document.getElementById("ub-nav");
var ubNavMenu = document.getElementById("ub-nav-menu");
var ubHome = document.getElementById("ub-home");
var ubAuth = document.getElementById("ub-auth");
var ubAuthForm = document.getElementById("ub-auth-form");
var ubAuthAccList = document.getElementById("ub-auth-acc-list");
var ubAuthAccListDiv = document.querySelector("#ub-auth-acc-list div");
var ubAuthAddAcc = document.getElementById("ub-auth-add-acc");

// "ubAuth.this" && "ubAuth.form.this"

Auth = Ubeyin.auth({
 apiKey: "AIzaSyAE9eqPw5-XTBwx0gIRZGpKxftLm8uS6NU",
 authDomain: "ubeyin-data.firebaseapp.com",
 databaseURL: "ubeyin-data-default-rtdb.firebaseio.com",
 projectId: "ubeyin-data",
 storageBucket: "ubeyin-data.appspot.com",
 messagingSenderId: "154658789445",
 appId: "1:154658789445:web:ab9dde4fd5e795c4d62b2c",
 measurementId: "G-6W9W2FJW3X"
});

Auth.user({
 on: {
  user: function(info) {
   ubAuth.style.display = "block";
   ubAuthAccList.style.display = "block";
   
   Ubeyin.db("users/"+info.uid).get({
    on: {
     load: function(data) {
      ubAuthAccListDiv.querySelector("p strong").innerHTML = data.name;
      ubAuthAccListDiv.querySelector("p span").innerHTML = info.email;
      ubAuthAccListDiv.querySelector("img").src = data.avater;
      
     }, error: function() {
      ubAuthAccListDiv.querySelector("p strong").innerHTML = "Unavailable";
      ubAuthAccListDiv.querySelector("p span").innerHTML = info.email;
      ubAuthAccListDiv.querySelector("img").src = "https://ubeyin.github.io/icon/ubeyin.png";
     }
    }
   });
   console.warn("user");
  }, guest: function() {
   ubAuth.style.display = "none";
   console.warn("guest");
  }
 }
});
/*
document.querySelector("#ub-auth-acc-list div").onclick = function(target) {
 let profileData = {};
 profileData.name = this.querySelector("p strong").innerHTML;
 profileData.email = this.querySelector("p span").innerHTML;
 profileData.avater = this.querySelector("img").src;
 profileData.version = "Ubeyin Authentication, 1.0.0";
 console.log(profileData);
}
document.querySelector("#ub-auth-add-acc").onclick = function(target) {
 console.log("Not Available");
}*/document.getElementById
