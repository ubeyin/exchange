/*
   Name : Nextra query (js)
   Version : 1.0.0 (first)
   Powered by : Nextra, llc
   Licensed under : Apache 2.0
   Created by : mohammad sefatullah on 9, Jan 2021

 # New features :
   * Create XMLHttpRequest,
   * Tracks GeoLocation lat, long and name
   * Size of a window for handle elements,
   * Create element fonts,
   * Load a function on window.

 # More features :
   * Using functions (Nextra, nextra) or signs ($, $n)
*/
/*
   if ("undefined" == typeof Nextra) throw new TypeError("There have requires Nextra query.");
*/
let $n;
let $;
let Nextra, nextra;
let nextraVersion;

(function(window) {
  Nextra = function() {
    return true;
  };
  $n = new Nextra(), $ = new Nextra(), nextra = new Nextra(), nextraVersion = "1.0.0";
  (function() {
    this.ajax = function(ajax_option) {
      let ajax_setting;
      let method, url, data;
      let ajax_request;
      let fn = {};

      function isEmpty(object) {
        for (let x in object) {
          if (object.hasOwnProperty(x)) {
            return false;
          }
        }
        return true;
      }
      function urlEncode(object) {
        let urlData = '';
        if (!object) {
          return '';
        }
        for (let x in object) {
          urlData = urlData + x + '=' + encodeURIComponent(object[x]) + '&';
        }
        urlData = urlData.substr(0, (urlData.length - 1));
        return urlData;
      }
      if (ajax_option) {
        ajax_setting = ajax_option;
      } else {
        throw new TypeError('Failed to load XMLHttpRequest. Ajax arguments are required.');
      }
      if (ajax_setting.method) {
        method = ajax_setting.method;
      } else {
        throw new TypeError('Failed to load XMLHttpRequest. Ajax methods are required.');
      }
      if (ajax_setting.url) {
        url = ajax_setting.url;
        if (ajax_setting.cors == "anywhere") {
          url = "https://cors-anywhere.herokuapp.com/"+ajax_setting.url;
        }
      } else {
        throw new TypeError('Failed to load XMLHttpRequest. Ajax urls are required.');
      }

      data = ajax_setting.data || '';
      if (ajax_setting.method === 'GET' && data && !isEmpty(data)) {
        url = url + '?' + urlEncode(data);
      }

      try {
        ajax_request = new XMLHttpRequest();
      } catch (e) {
        try {
          ajax_request = new ActiveXObject('MSXML2.XMLHTTP');
        } catch(e) {
          ajax_request = new ActiveXObject('Microsoft.XMLHTTP');
        }
      }
      ajax_request.open(method, url);
      if (ajax_setting.requestHeader) {
        for (let key in ajax_setting.setRequestHeader) {
          ajax_request.setRequestHeader(key, ajax_setting.setRequestHeader[key]);
        }
      }
      if (ajax_setting.credential) {
        ajax_request.withCredentials = true;
      }
      if (ajax_setting.method !== 'GET') {
        ajax_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      }
      ajax_request.send(urlEncode(data));
      fn = {
        onload: function (success) {
          // handle IE8 IE9 CORS
          if (typeof(XDomainRequest) !== 'undefined') {
            let host = location.host,
            matchUrl = url.replace('https://', '').replace('http://', '');
            matchUrl = matchUrl.slice(0, matchUrl.indexOf('/'));
            if (url.indexOf('//') === 0 || matchUrl !== host) {
              let xdr = new XDomainRequest();
              xdr.open(method, url);
              xdr.onprogress = function () {
                // progress
              };
              xdr.ontimeout = function () {
                // timeout
              };
              xdr.onerror = function () {
                // error
              };
              xdr.onload = function() {
                if (success) {
                  success(JSON.parse(xdr.responseText));
                }
              };
              setTimeout(function () {
                xdr.send();
              }, 0);

              return;
            }
          }
          // handle IE8 IE9 CORS end
          ajax_request.onreadystatechange = function () {
            if (success) {

              if (ajax_request.readyState === 4) {
                if (ajax_request.status >= 200 && ajax_request.status <= 400) {
                  let section;
                  switch (ajax_setting.section) {
                    case 'object':
                      section = JSON.parse(ajax_request.responseText);
                      break;
                    case 'xml':
                      section = ajax_request.responseXML;
                      break;
                    case 'none':
                      section = ajax_request;
                      break;
                    case 'text':
                      section = ajax_request.responseText;
                      break;
                    default:
                      section = ajax_request;
                      break;
                  }
                  if (success) {
                    success(section);
                  }
                } else {
                  throw new TypeError(ajax_request.status+" Error!! Somethings is broken or error. ", ajax_request);
                }
              }
            } else {
              throw new TypeError('Failed to load XMLHttpRequest. Only 1 callbacks are required.');
            }
          };
        },
        onerror: function (error) {
          ajax_request.onerror = function() {
            if (error) {
              error(ajax_request.status, ajax_request.responseText);
            }
          };
        }
      };
      return fn;
    };
    this.geolocate = function() {
      let fn = {
        onchange: function (success, error) {
          const getPositionErrorMessage = code => {
            switch (code) {
              case 1:
                return 'Permission denied.';
                break;
              case 2:
                return 'Position unavailable.';
                break;
              case 3:
                return 'Timeout reached.';
                break;
              default:
                return 'An unknown error';
                break;
            }
          }
          if ('geolocation' in navigator === false) {
            console.error(new TypeError('Geolocation is not supported by your browser.'));
          }
          return navigator.geolocation.getCurrentPosition(function (position) {
            let req = new Nextra().ajax({
              method: "GET",
              url: "https://us1.locationiq.com/v1/reverse.php?key=pk.841faf5c95235f9459953b664d1ec98c&lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&format=json",
              section: "object"
            });
            req.onload(function(data) {
              result = data.display_name;
              return success(position.coords.latitude, position.coords.longitude, data.display_name, position);
            });
            req.onerror(function(e) {
              return success(position.coords.latitude, position.coords.longitude, "Not found", position);
            });
          }, function(e) {
            return error(getPositionErrorMessage(e.code));
          });
        },
      };
      return fn;
    };
    this.window = function () {
      let fn = {
        onsize: function(wdw) {
          let mobile,
          tablet,
          laptop,
          ipad,
          dekstop,
          otherwise;
          mobile = wdw.size1;
          tablet = wdw.size2;
          laptop = wdw.size4;
          ipad = wdw.size3;
          dekstop = wdw.size5;
          otherwise = wdw.other;

          if (mobile || tablet || laptop || ipad || dekstop || otherwise) {
            let onl = function() {
              if (window.innerWidth <= 400) {
                if (mobile) {
                  // mobile window
                  mobile(window);
                }
              } else if (window.innerWidth <= 870 && window.innerWidth >= 400) {
                if (tablet) {
                  // tablet window
                  tablet(window);
                }
              } else if (window.innerWidth <= 970 && window.innerWidth >= 870) {
                if (ipad) {
                  // ipad window
                  ipad(window);
                }
              } else if (window.innerWidth <= 1100 && window.innerWidth >= 970) {
                if (laptop) {
                  // laptop window
                  laptop(window);
                }
              } else if (window.innerWidth <= 1200 && window.innerWidth >= 1100) {
                if (dekstop) {
                  // dekstop window
                  dekstop(window);
                }
              } else {
                if (otherwise) {
                  // other window
                  otherwise(window);
                }
              }
            };
            if (document.body) onl();
            else window.onload = onl;
          } else {
            throw new TypeError("Failed to execute window. Only 1 arguments are required, but only 0 arguments are present.");
          }
        }
      };
      return fn;
    };
    this.fonts = function(element = document.body) {
      let fn = {
        onload: function( {
          family, size, weight, style, height, space, width, breaks, color
        }) {
          if (element) {
            if (family) {
              let fontLink = document.createElement("link");
              fontLink.rel = "stylesheet";
              fontLink.setAttribute("href", "https://fonts.googleapis.com/css?family="+family+"&display=swap");
              let fontLinkAppend = function (argument) {
                document.head.appendChild(fontLink);
                element.style.fontFamily = family;
              };
              if (document.body) fontLinkAppend();
              else window.onload = fontLinkAppend;
            }
            if (size) {
              element.style.fontSize = size;
            }
            if (weight) {
              element.style.fontWeight = weight;
            }
            if (style) {
              element.style.fontStyle = style;
            }
            if (height) {
              element.style.lineHeight = height;
            }
            if (space) {
              element.style.letterSpacing = space;
            }
            if (width) {
              element.style.wordSpacing = width;
            }
            if (color) {
              element.style.color = color;
            }
            if (breaks) {
              switch (breaks) {
                case '1':
                  breaks = "auto";
                  break;
                case '2':
                  breaks = "loose";
                  break;
                case '3':
                  breaks = "normal";
                  break;
                case '4':
                  breaks = "strict";
                  break;
                default:
                  breaks = breaks;
                  break;
              }
              element.style.lineBreak = breaks;
            }
          } else {
            throw new TypeError("Failed to create fonts. Element arguments are required, but not present.");
          }
        }
      };
      return fn;
    };
    this.load = function (reg) {
      if ("function" === typeof reg) {
        if (document.body) {
          reg(document.body);
        } else {
          window.onload = function () {
            return reg(window);
          };
        }
      } else {
        throw new TypeError("Cannot read property load() of undefined");
      }
    }
  }).call(Nextra.prototype);
  (function() {
    $.ajax({
      //https://nextra.github.io/dist/query/update.json
      url: "$_all/nextra.query-update.json",
      method: "GET"
    }).onload(function (data) {
      let latestV = JSON.parse(data.responseText).latest.version;
      if (data.responseText) {
        if (latestV >= nextraVersion) {
          return console.log("new VersionUpdate: A new version "+latestV+" is available. Use the new version for explore more. Your current version is Nextra query "+nextraVersion);
        }
      }
    });
  }());
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = Nextra;
  } else if (typeof define === 'function' && define.amd) {
    define([], function () {
      return Nextra;
    });
  } else if (!window.Nextra) {
    window.Nextra = Nextra;
  }
} (typeof window !== 'undefined' ? window: this));