// console.info("'app-ubeyin.js' is ready.");

var Ubeyin;
var init = {};
var config = {};

(function(){
      var scriptLinks = ["https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js","https://www.gstatic.com/firebasejs/8.3.2/firebase-analytics.js","https://www.gstatic.com/firebasejs/8.3.2/firebase-auth.js","https://www.gstatic.com/firebasejs/8.3.2/firebase-database.js","https://www.gstatic.com/firebasejs/8.3.2/firebase-firestore.js","/__/init.js"];
      for(var i=0; i<scriptLinks.length; i++){
        var a = document.createElement("script");
        a.src = scriptLinks[i];
        document.head.appendChild(a);
      }
      
      setTimeout(function(){
			   	config = {
				      apiKey: "AIzaSyAE9eqPw5-XTBwx0gIRZGpKxftLm8uS6NU",
            authDomain: "ubeyin-data.firebaseapp.com",
            databaseURL: "https://ubeyin-data-default-rtdb.firebaseio.com",
            projectId: "ubeyin-data",
            storageBucket: "ubeyin-data.appspot.com",
            messagingSenderId: "154658789445",
            appId: "1:154658789445:web:ab9dde4fd5e795c4d62b2c",
            measurementId: "G-6W9W2FJW3X"
        };
        firebase.initializeApp(config);
        firebase.analytics();
        init();
     },100);
});

init = function(){
				
}
