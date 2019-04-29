window.onload = function () {
    var offline = false;
    var sess = window.localStorage.getItem("sess");
    if (sess != undefined && sess != null && sess != "") {
        var versionnum = "1.5.1_STUDIO-VERSO-201904291613";
        document.getElementById("version").innerHTML = 'Web Version: '.concat(versionnum);
    }
}