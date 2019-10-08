window.onload = function () {
    var id = window.localStorage.getItem("username");
    var offline = false;
    var sess = window.localStorage.getItem("sess");
    var user = window.localStorage.getItem("username");
    if (sess != undefined && sess != null && sess != "") {
        document.getElementById("loggedout").style.display = "none";
        document.getElementById("loggedin").style.display = "";
    } else {
        window.localStorage.removeItem("sess");
        window.location.href = "settings.html";
    }
    if (id != "Anon") {
        document.getElementById("submit").onclick = function (evt) {
            document.getElementById("badopass").style.display = "none";
            document.getElementById("badmatch").style.display = "none";
            var opass = document.getElementById("opass").value;
            var npass = document.getElementById("npass").value;
            var npass2 = document.getElementById("npass2").value;
            if (npass == npass2 && npass != "" && npass != undefined) {
                var xhr = new XMLHttpRequest();
                xhr.open("post", "https://api.stibarc.com/updatepasswd.sjs", true);
                xhr.send("sess=" + sess + "&old=" + encodeURIComponent(opass) + "&new=" + encodeURIComponent(npass) + "&new2=" + encodeURIComponent(npass));
                xhr.onload = function (e) {
                    if (xhr.responseText.split("\n")[0] == "Updated") {
                        location.href = "/";
                    } else {
                        document.getElementById("badopass").style.display = "";
                    }
                }
            } else {
                document.getElementById("badmatch").style.display = "";
            }
        }
        document.getElementById("load").style.display = "none";
        document.getElementById("thepage").style.display = "";
    } else {
        window.location.href = "settings.html";
    }
}