window.onload = function () {
    var offline = false;
    var sess = window.localStorage.getItem("sess");
    if (sess != undefined && sess != null && sess != "") {
        var versionnum = "1.7_STUDIO-VERSO-201905310007";
        document.getElementById("version").innerHTML = 'Web Version: '.concat(versionnum);
    }
}