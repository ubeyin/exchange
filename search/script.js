// https://ubeyin.github.io/search

$(document).ready(function(w) {
  $("#get-started").click(function (_this) {
    $("html, body").animate({
      scrollTop: 900+"px"
    }, 190);
  });
  $("#search-area").hide();
});
function searching1(_this) {
  if ($("#search").val()) {
    let results = "";
    var url = "https://en.wikipedia.org/w/api.php";


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

    fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      $("#search-area").show();
      for (var i = 0; i < response.query.search.length; i++) {
        results += '<tr style="font-size: 14px"><td style="min-width:120px"><p style="font-size: 14px">'+response.query.search[i].title+'</p></td><td><p style="font-size: 14px">'+response.query.search[i].snippet+'....<br><a href= "http://en.wikipedia.org/wiki?curid='+response.query.search[i].pageid+'" target="_parent"> Read more </a></p></td> </tr>'+"<br><br>";
      }
      document.getElementById('results').innerHTML = results;
    })
    .catch(function(error) {
      // console.log(error);
    });
  } else {
    $("#search").val("website");
    searching1();
  }
}
function searching2(_this) {
  if ($("#search").val()) {
    let results = "";
    var url = "https://api.stackexchange.com/search/advanced?site=stackoverflow.com&q="+$("#search").val();

    fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      $("#search-area").show();
      for (var i = 0; i < response.items.length; i++) {
        let answer = response.items[i].answer_count;
        let view = response.items[i].view_count;
        let tags = "";
        for (var k = 0; k < response.items[i].tags.length; k++) {
          tags += '<span class="badge bg-danger" style="margin-right: 10px;">'+response.items[i].tags[k]+'</span>';
        }
        results += '<tr style="font-size: 14px"><td style="min-width:120px"><p style="font-size: 14px"><img style="width: 30px; height: 30px; border-radius:100rem; background: #eee;" src="'+response.items[i].owner.profile_image+'"/><br>'+response.items[i].owner.display_name+'<br><a href= "'+response.items[i].link+'" target="_parent"> Read more </a></p></td> <td><p style="font-size: 14px">'+response.items[i].title+'<br><i class="fa fa-comments"></i> '+answer+'<i style="padding:10px;padding-left:15px"></i>'+'<i class="fa fa-eye"></i> '+view+'<br>'+tags+'</p></td></tr>'+"<br><br>";
      }
      document.getElementById('results').innerHTML = results;
    })
    .catch(function(error) {
      // console.log(error);
    });
  } else {
    $("#search").val("What is web development?");
    searching2();
  }
}
function menus(_this) {
  $("html, body").animate({
    scrollTop: 0
  }, 190);
}
