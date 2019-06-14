window.onload = function () {
    document.getElementById("hides").style.display = "none";
    var id = window.localStorage.getItem("username");
    var offline = false;
    var sess = window.localStorage.getItem("sess");
    var user = window.localStorage.getItem("username");
    document.getElementById("load").style.display = "none";
    document.getElementById("thepage").style.display = "";
    if (sess != undefined && sess != null && sess != "") {
        document.getElementById("loggedout").style.display = "none";
        document.getElementById("loggedin").style.display = "";
    }
    var notiflisten = window.localStorage.notifli;
    if (notiflisten == undefined) {
        notiflisten = false; localStorage.notifli = "false"
    }
    if (notiflisten == "true") { notiflisten = true; } else { notiflisten = false; }
    document.getElementById("notiftoggle").checked = notiflisten;
    document.getElementById("notiftoggle").onchange = function () {
        localStorage.notifli = document.getElementById("notiftoggle").checked;
    }
    var recb = localStorage.browserb;
    if (recb == undefined) {
        recb = true; localStorage.browserb = "true";
    }
    if (recb == "true") { recb = true; } else { recb = false; }
    document.getElementById("browseratoggle").checked = recb;
    document.getElementById("browseratoggle").onchange = function () {
        localStorage.browserb = document.getElementById("browseratoggle").checked;
    }
    var auroraup = localStorage.anewupdate;
    if (auroraup == undefined) {
        auroraup = true; localStorage.anewupdate = "true";
    }
    if (auroraup == "true") { auroraup = true; } else { auroraup = false; }
    document.getElementById("updateatoggle").checked = auroraup;
    document.getElementById("updateatoggle").onchange = function () {
        localStorage.anewupdate = document.getElementById("updateatoggle").checked;
    }
}