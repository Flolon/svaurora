checkTh();

function loadTheme() {
    try {
        var theme = localStorage.getItem('theme');
        if (theme != undefined) {
            if (theme == "custom") {
                if (localStorage.getItem('customtheme').trim() != "") {
                    document.getElementById('themer').href = localStorage.getItem('customtheme');
                } else {
                    document.getElementById('themer').href = 'css/themes/dark.css';
                }
            } else {
                document.getElementById('themer').href = 'css/themes/' + theme + ".css";
            }
        } else {
            document.getElementById('themer').href = 'css/themes/dark.css';
        }
    } catch (err) {
        console.error(err);
    }
}

function getAllUrlParams(url) {
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
    var obj = {};
    if (queryString) {
        queryString = queryString.split('#')[0];
        var arr = queryString.split('&');
        for (var i = 0; i < arr.length; i++) {
            var a = arr[i].split('=');
            var paramNum = undefined;
            var paramName = a[0].replace(/\[\d*\]/, function (v) {
                paramNum = v.slice(1, -1);
                return '';
            });
            var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
            paramName = paramName;
            paramValue = paramValue;
            if (obj[paramName]) {
                if (typeof obj[paramName] === 'string') {
                    obj[paramName] = [obj[paramName]];
                }
                if (typeof paramNum === 'undefined') {
                    obj[paramName].push(paramValue);
                }
                else {
                    obj[paramName][paramNum] = paramValue;
                }
            }
            else {
                obj[paramName] = paramValue;
            }
        }
    }
    return obj;
}

function toJSON(cookie) {
    var output = {};
    cookie.split(/\s*;\s*/).forEach(function (pair) {
        pair = pair.split(/\s*=\s*/);
        output[pair[0]] = pair.splice(1).join('=');
    });
    return output;
}

var checkVerified = function (poster) {
    var thing = new XMLHttpRequest();
    thing.open("GET", "https://api.stibarc.com/checkverify.sjs?id=" + poster, false);
    thing.send(null);
    var stuff = thing.responseText.split("\n")[0];
    if (stuff == "true") {
        document.getElementById("verified").style.display = "";
    }
}

function loginWithS() {
    var loginpopup = window.open("https://stibarc.com/login/", "", "menubar=no,location=no,resizable=no,scrollbars=yes,status=yes,height=360,width=500");
    window.addEventListener("message", function (evt) {
        if (evt.data != "Cancelled") {
            localStorage.sess = evt.data;
            getUsername();
            loginpopup.close();
            location.reload();
        } else {
            loginpopup.close();
        }
    });
}

function checkTh() {
    var themeserv = localStorage.themesystem
    if (themeserv == "false") {
        loadTheme();
    }
}