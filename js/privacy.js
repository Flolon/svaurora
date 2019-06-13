window.onload = function () {
    var id = window.localStorage.getItem("username");
    var offline = false;
    var sess = window.localStorage.getItem("sess");
    var user = window.localStorage.getItem("username");
    if (sess != undefined && sess != null && sess != "") {
        document.getElementById("loggedout").style.display = "none";
        document.getElementById("loggedin").style.display = "";
    }
}