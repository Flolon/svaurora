/*var toLink = function (item) {
	var thing = new XMLHttpRequest();
	thing.open("GET", "https://api.stibarc.com/gettitle.sjs?id=" + item, false);
	thing.send(null);
	var title = thing.responseText;
	try {
		document.getElementById("posts").innerHTML = document.getElementById("posts").innerHTML.concat('<li><a href="post.html?id=').concat(item).concat('">').concat(title).concat("</a></li>");
	} catch (err) {
		console.log("Whoops");
	}
}*/

function getStuff(id) {
    var thing = new XMLHttpRequest();
    thing.open("GET", "https://api.stibarc.com/v2/getuser.sjs?id=" + id, false);
    thing.send(null);
    var tmp = JSON.parse(thing.responseText);
    var rank = tmp['rank'];
    var name = tmp['name'];
    var email = tmp['email'];
    //var posts = tmp['posts'];
    var birthday = tmp['birthday'];
    document.getElementById("username").innerHTML = id.concat('<span id="verified" title="Verified user" style="display:none"> <img src="assets/verify.png" alt="Verified user"></span>');
    document.getElementById("rank").innerHTML = "Rank: ".concat(rank);
    document.getElementById("name").innerHTML = "Real name: ".concat(name.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"));
    if (email != "Not shown" && email != "Not set") {
        document.getElementById("email").innerHTML = "Email: ".concat("<a class=\"settingurl\" href=\"mailto:" + email + "\">" + email.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</a>");
    } else {
        document.getElementById("email").innerHTML = "Email: ".concat(email.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"));
    }
    document.getElementById("bday").innerHTML = "Birthday: ".concat(birthday.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"));
    //posts = posts.split(",");
    document.getElementById("pfp").src = tmp['pfp'];
    document.getElementById("userlink").href = "user.html?id="+id;
    var showbio = false;
    var bio = "";
    document.getElementById("biobio").innerHTML = "";
    if (tmp['bio'] != undefined && tmp['bio'] != "") {
        bio = tmp['bio'].replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>");
        showbio = true;
    }
    if (showbio) {
        document.getElementById("bio").style.display = "";
        document.getElementById("biobio").innerHTML = bio;
    } else {
        document.getElementById("bio").style.display = "none";
    }
    document.getElementById("load").style.display = "none";
    document.getElementById("thepage").style.display = "";
}

window.onload = function () {
    var id = getAllUrlParams().id;
    //var cookie = toJSON(document.cookie);
    var sess = window.localStorage.getItem("sess");
    document.title = id + " - QuickView | Aurora Messenger";
    setTimeout(function () { getStuff(id); checkVerified(id); }, 10);
    var nameofuser = window.localStorage.getItem("username");
    if (id == nameofuser) {
        document.getElementById("report").style.display = "none";
        document.getElementById("edituser").style.display = "";
    }
}