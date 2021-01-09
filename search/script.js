// https://ubeyin.github.io/search

$(document).ready(function(w) {
  $("#get-started").click(function (_this) {
    $("html, body").animate({
      scrollTop: 300+"px"
    }, 190);
  });
  $("#search-area").hide();
  $("#loadsearch").hide();
  $u.alert({
    align: "center",
    title: "Ubeyin search [beta]",
    message: "Welcome to ubeyin search. Explore more, Find any discussions, and read any articles in Nother search. Free for all.",
    button: "Hide"
  });
});
function searching1(_this) {
  if ($("#search").val()) {
    let results = "";
    var url = "https://en.wikipedia.org/w/api.php";
    $("#loadsearch").show();

    var params = {
      action: "query",
      list: "search",
      srsearch: $("#search").val(),
      format: "json"
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key) {
      url += "&" + key + "=" + params[key];
    });

    setTimeout(function() {
      fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        $("#loadsearch").hide();
        $("#search-area").show();
        for (var i = 0; i < response.query.search.length; i++) {
          results += '<tr style="font-size: 14px"><td style="min-width:120px"><p style="font-size: 14px">'+response.query.search[i].title+'</p></td><td><p style="font-size: 14px">'+response.query.search[i].snippet+'....<br><a href= "http://en.wikipedia.org/wiki?curid='+response.query.search[i].pageid+'" target="_parent"> Read more </a></p></td> </tr>'+"<br><br>";
        }
        document.getElementById('results').innerHTML = results;
      })
      .catch(function(error) {
        // console.log(error);
      });
    }, 1000);
  } else {
    $("#search").val("Website development");
    searching1();
  }
}
function searching2(_this) {
  if ($("#search").val()) {
    let results = "";
    var url = "https://api.stackexchange.com/search/advanced?site=stackoverflow.com&q="+$("#search").val();
    $("#loadsearch").show();
    setTimeout(function() {
      fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        $("#search-area").show();
        $("#loadsearch").hide();
        for (var i = 0; i < response.items.length; i++) {
          let answer = response.items[i].answer_count;
          let view = response.items[i].view_count;
          let tags = "";
          for (var k = 0; k < response.items[i].tags.length; k++) {
            tags += '<span class="badge bg-primary" style="margin: 5px; margin-right: 10px;">'+response.items[i].tags[k]+'</span>';
          }
          results += '<tr style="font-size: 14px"><td><p style="font-size: 14px"><img style="width: 30px; height: 30px; border-radius:100rem; background: #eee;" src="'+response.items[i].owner.profile_image+'"/><br>'+response.items[i].owner.display_name+'<br><br>'+response.items[i].title+'<br><a href= "'+response.items[i].link+'" target="_parent"> Read more </a><br><br><i class="fa fa-comments"></i> '+answer+'<i style="padding-left:19px"></i>'+'<i class="fa fa-eye"></i> '+view+'</p>'+tags+'<br></td></tr>';
        }
        document.getElementById('results').innerHTML = results;
      })
      .catch(function(error) {
        // console.log(error);
      });
    }, 1000);
  } else {
    $("#search").val("About firebase storage");
    searching2();
  }
}
function menus(_this) {
  $("html, body").animate({
    scrollTop: 0
  }, 190);
}
