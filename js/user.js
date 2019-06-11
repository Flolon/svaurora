/*var toLink = function (item) {
	var thing = new XMLHttpRequest();
	thing.open("GET", "https://api.stibarc.gq/gettitle.sjs?id=" + item, false);
	thing.send(null);
	var title = thing.responseText;
	try {
		document.getElementById("posts").innerHTML = document.getElementById("posts").innerHTML.concat('<li><a href="post.html?id=').concat(item).concat('">').concat(title).concat("</a></li>");
	} catch (err) {
		console.log("Whoops");
	}
}*/

function toLink(item) {
    try {
        var i = item.indexOf(':');
        var splits = [item.slice(0, i), item.slice(i + 1)];
        if (splits[1].length > 60) { splits[1] = splits[1].substring(0, 60).concat("..."); }
        document.getElementById("posts").innerHTML = document.getElementById("posts").innerHTML.concat('<div class="card"><br><div class="container"><a href="post.html?id=').concat(splits[0]).concat('">').concat(splits[1].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")).concat("</a></div><br></div><br>");
    } catch (err) {
        console.log("Whoops");
    }
}

function getPosts(id) {
    var tmp = new XMLHttpRequest();
    tmp.open("GET", "https://api.stibarc.gq/getuserposts.sjs?id=" + id, false);
    tmp.send(null);
    tmp = tmp.responseText.split("\n");
    for (i = tmp.length - 2; i >= 0; i--) {
        toLink(tmp[i]);
    }
}

function getStuff(id) {
    var thing = new XMLHttpRequest();
    thing.open("GET", "https://api.stibarc.gq/v3/getuser.sjs?id=" + id, false);
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
        document.getElementById("email").innerHTML = "Email: ".concat("<a href=\"mailto:" + email + "\">" + email.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</a>");
    } else {
        document.getElementById("email").innerHTML = "Email: ".concat(email.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"));
    }
    document.getElementById("bday").innerHTML = "Birthday: ".concat(birthday.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"));
    if (tmp.followers.length == 1) {
        document.getElementById("followers").innerText = tmp.followers.length + " Follower";
    } else {
        document.getElementById("followers").innerText = tmp.followers.length + " Followers";
    }
	document.getElementById("follower").innerHTML = "";
	for (var i in tmp.followers) {
		document.getElementById("follower").innerHTML = document.getElementById("follower").innerHTML + '<div class=" card animated slideInUp"><br/><div class="container"><a href="user.html?id='+tmp.followers[i]+'">'+tmp.followers[i]+'</a></div><br/></div><br/>';
	}
    if (tmp.following.length == 1) {
        document.getElementById("following").innerText = tmp.following.length + " Following";
    } else {
        document.getElementById("following").innerText = tmp.following.length + " Followings";
    }
	document.getElementById("fo").innerHTML = "";
	for (var i in tmp.following) {
		document.getElementById("fo").innerHTML = document.getElementById("fo").innerHTML + '<div class=" card animated slideInUp"><br/><div class="container"><a href="user.html?id='+tmp.following[i]+'">'+tmp.following[i]+'</a></div><br/></div><br/>';
	}
    if (localStorage.username != undefined && localStorage.sess != undefined) {
        if (tmp.followers.indexOf(localStorage.username) != -1) {
            document.getElementById("follow").innerText = "Following";
            document.getElementById("follow").onclick = function (e) {
                var confirmUn = confirm("Are you sure you want to unfollow " + id + "? You will no longer be able to see their posts on your following feed.");
                if (confirumUn == true) {
                    var xhrf = new XMLHttpRequest();
                    xhrf.open("POST", "https://api.stibarc.gq/v3/unfollow.sjs", false);
                    xhrf.send("sess=" + localStorage.sess + "&id=" + encodeURIComponent(id));
                    location.reload();
                }
            }
        } else {
            var usern = window.localStorage.getItem("username");
            document.getElementById("follow").onclick = function (e) {
                if (usern != id) {
                    var xhrf = new XMLHttpRequest();
                    xhrf.open("POST", "https://api.stibarc.gq/v3/follow.sjs", false);
                    xhrf.send("sess=" + localStorage.sess + "&id=" + encodeURIComponent(id));
                    location.reload();
                } else {
                    alert("You cannot follow yourself.");
                }         
            }
        }
    } else {
        document.getElementById("follow").onclick = function (e) {
            alert("To follow " + id + ", you must be logged in.");
        }
    }
    if (usern == id) {
        document.getElementById("follow").style.display = "none";
    }
    //posts = posts.split(",");
    document.getElementById("pfp").src = tmp['pfp'];
    var pfp = tmp['pfp'];
    document.getElementById("posts").innerHTML = "";
    getPosts(id);
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
    var user = window.localStorage.getItem("username");
    document.title = id + " - Aurora";
    if (sess != undefined && sess != "" && sess != null) {
        var thing = new XMLHttpRequest();
        var name = window.localStorage.getItem("username");
        thing.open("GET", "https://api.stibarc.gq/v3/getuser.sjs?id=" + name, false);
        thing.send(null);
        var tmp = JSON.parse(thing.responseText);
        var navpfp = tmp['pfp'];
        document.getElementById("navpfp").src = navpfp + ' ';
        document.getElementById("loggedout").style.display = "none";
        document.getElementById("loggedin").style.display = "";
    }
    setTimeout(function () { getStuff(id); checkVerified(id); }, 10);
}
