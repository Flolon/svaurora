function resetAurora() {
    localStorage.clear;
    window.location.href = "index.html";
}

window.onload = function () {
    document.getElementById("load").style.display = "none";
    document.getElementById("thepage").style.display = "";
    var offline = false;
    var sess = window.localStorage.getItem("sess");
    var user = window.localStorage.getItem("username");
    if (sess != undefined && sess != null && sess != "") {
        document.getElementById("loggedout").style.display = "none";
        document.getElementById("loggedin").style.display = "";
        document.getElementById("loggedin2").style.display = "";
        if (user == "Anon") {
            document.getElementById("managedact").style.display = "";
        } else {

        }
        var thing = new XMLHttpRequest();
        var id = window.localStorage.getItem("username");
        thing.open("GET", "https://api.stibarc.gq/v3/getuser.sjs?id=" + id, false);
        thing.send(null);
        var tmp = JSON.parse(thing.responseText);
        var pfp = tmp['pfp'];
        document.getElementById("pfp").src = pfp + ' ';
        document.getElementById("nameuser").innerHTML = (user);
    }
    document.getElementById("resetau").onclick = function (evt) {
        var resetaur = confirm("Are you sure you want to reset Aurora and clear the localStorage? You will be signed out and your personal Aurora settings will be erased.")
        if (resetaur == true) {
            resetAurora();
        }
    }
}