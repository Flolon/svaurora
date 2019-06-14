window.onload = function () {
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
    if (id == "Anon") {
        window.location.href = "settings.html";
    }
}