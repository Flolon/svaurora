window.onload = function () {
    document.getElementById("load").style.display = "none";
    document.getElementById("thepage").style.display = "";
    var poststy = localStorage.pfpstyles;
    if (poststy == undefined) {
        poststy = true; localStorage.pfpstyles = "true";
    }
    if (poststy == "true") { poststy = true; } else { poststy = false; }
    document.getElementById("pfptoggle").checked = poststy;
    document.getElementById("pfptoggle").onchange = function () {
        localStorage.pfpstyles = document.getElementById("pfptoggle").checked;
    }
    var udp = localStorage.pollsystem;
    if (udp == undefined) {
        udp = true; localStorage.pollsystem = "true"
    }
    if (udp == "true") { udp = true; } else { udp = false; }
    document.getElementById("polltoggle").checked = udp;
    document.getElementById("polltoggle").onchange = function () {
        localStorage.pollsystem = document.getElementById("polltoggle").checked;
    }
    var co = localStorage.postorder;
    if (co == undefined) {
        co == true; localStorage.postorder = "true";
    }
    if (co == "true") { co = true; } else { co = false; }
    document.getElementById("commentstoggle").checked = co;
    document.getElementById("commentstoggle").onchange = function () {
        localStorage.postorder = document.getElementById("commentstoggle").checked;
    }
    var togtheme = localStorage.themesystem;
    if (togtheme == undefined) {
        togtheme = true; localStorage.themesystem = "true"
    }
    if (togtheme == "true") { togtheme = true; document.getElementById("themechng").style.display = "none" } else {
        togtheme = false; document.getElementById("themechng").style.display = ""; document.getElementById("autotheme").style.display = "none"
            ;
    }
    document.getElementById("themetoggle").checked = togtheme;
    document.getElementById("themetoggle").onchange = function () {
        localStorage.themesystem = document.getElementById("themetoggle").checked;
    }
    document.getElementById("themechng").onchange = function (evt) {
        var value = document.getElementById("themechng").value;
        localStorage.setItem("theme", value);
        if (value != "custom") {
            document.getElementById("themecust").style.display = "none";
            loadTheme();
        } else {
            document.getElementById("themecust").style.display = "";
        }
    }
    document.getElementById("themecust").onchange = function (evt) {
        var value = document.getElementById("themecust").value;
        localStorage.setItem("customtheme", value);
        if (value.trim() != "") {
            loadTheme();
        }
    }
    try {
        document.getElementById("themechng").value = localStorage.getItem("theme");
        document.getElementById("themecust").value = localStorage.getItem("customtheme");
        if (localStorage.getItem("theme") != "custom") {
            document.getElementById("themecust").style.display = "none";
        } else {
            document.getElementById("themecust").style.display = "";
        }
    } catch (err) { }
}