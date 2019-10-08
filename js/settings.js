window.onload = function () {
    document.getElementById("load").style.display = "none";
    document.getElementById("thepage").style.display = "";
    var offline = false;
    var sess = window.localStorage.getItem("sess");
    var user = window.localStorage.getItem("username");
    if (sess != undefined && sess != null && sess != "") {
        document.getElementById("loggedout").style.display = "none";
        document.getElementById("loggedin").style.display = "";
        document.getElementById("accountsec").style.display = "";
        document.getElementById("notifs").style.display = "";
        if (user == "Anon") {
            document.getElementById("managedact").style.display = "";
        } else {
            document.getElementById("msg").style.display = "";
        }
        var thing = new XMLHttpRequest();
        var id = window.localStorage.getItem("username");
        thing.open("GET", "https://api.stibarc.com/v2/getuser.sjs?id=" + id, false);
        thing.send(null);
        var tmp = JSON.parse(thing.responseText);
        var pfp = tmp['pfp'];
        document.getElementById("pfp").src = pfp + ' ';
        document.getElementById("theusername").innerHTML = (user);
    }
}