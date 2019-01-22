window.onload = function () {
    document.getElementById("load").style.display = "none";
    document.getElementById("thepage").style.display = "";
    var id = window.localStorage.getItem("username");
    var offline = false;
    var sess = window.localStorage.getItem("sess");
    var user = window.localStorage.getItem("username");
    if (sess != undefined && sess != null && sess != "") {
        document.getElementById("loggedout").style.display = "none";
        document.getElementById("loggedin").style.display = "";
    }
    var thing = new XMLHttpRequest();
    thing.open("GET", "https://api.stibarc.gq/v2/getuser.sjs?id=" + id, false);
    thing.send(null);
    var tmp = JSON.parse(thing.responseText);
    var rank = tmp['rank'];
    var name = tmp['name'];
    var email = tmp['email'];
    //var posts = tmp['posts'];
    var birthday = tmp['birthday'];
    document.getElementById("preusername").innerHTML = id.concat('<span id="verified" title="Verified user" style="display:none"> <img src="assets/verify.png" alt="Verified user"></span>');
    document.getElementById("prerank").innerHTML = "Rank: ".concat(rank);
    document.getElementById("prename").innerHTML = "Real name: ".concat(name.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"));
    if (email != "Not shown" && email != "Not set") {
        document.getElementById("preemail").innerHTML = "Email: ".concat("<a href=\"mailto:" + email + "\">" + email.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</a>");
    } else {
        document.getElementById("preemail").innerHTML = "Email: ".concat(email.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"));
    }
    document.getElementById("prebday").innerHTML = "Birthday: ".concat(birthday.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"));
    //posts = posts.split(",");
    document.getElementById("prepfp").src = tmp['pfp'];
    var pfp = tmp['pfp'];
    var showbio = false;
    var bio = "";
    document.getElementById("prebiobio").innerHTML = "";
    if (tmp['bio'] != undefined && tmp['bio'] != "") {
        bio = tmp['bio'].replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>");
        showbio = true;
    }
    if (showbio) {
        document.getElementById("prebio").style.display = "";
        document.getElementById("prebiobio").innerHTML = bio;
    } else {
        document.getElementById("prebio").style.display = "none";
    }
}