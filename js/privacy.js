window.onload = function () {
    document.getElementById("load").style.display = "none";
    document.getElementById("thepage").style.display = "";
    var id = window.localStorage.getItem("username");
    var offline = false;
    var sess = window.localStorage.getItem("sess");
    var user = window.localStorage.getItem("username");
    if (user == "Anon") {
        document.getElementById("managedact").style.display = "";
    } else {
        document.getElementById("managedset").style.display = "";
    }
    if (sess != undefined && sess != null && sess != "") {
        document.getElementById("loggedout").style.display = "none";
        document.getElementById("loggedin").style.display = "";
        document.getElementById("loggedintip").style.display = "";
    }
}