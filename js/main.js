function toLink(id, item) {
    try {
        if (item['title'].length > 60) { item['title'] = item['title'].substring(0, 60).concat("..."); }
        if (item['deleted']) { item['title'] = "Post Removed By Admin" }
        document.getElementById("list").innerHTML = document.getElementById("list").innerHTML.concat('<div class="container-fluid text-center text-md-left"><div class="card"><br><div class="container"><a href="post.html?id=').concat(id).concat('"><b>').concat(item['title'].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")).concat('</b></a><br/>Posted by <a href="user.html?id=').concat(item['poster']).concat('">').concat(item['poster']).concat('</a><br/><img src="assets/up.png" height="18" alt="Up Votes"> ' + item['upvotes'] + ' <img src="assets/down.png" height="18" alt="Down Votes"> ' + item['downvotes'] + "</div><br></div></div><br>");
        lastid = id;
    } catch (err) {
        console.log(err);
    }
}

function toFollowLink(id, item) {
    try {
        if (item['title'].length > 60) { item['title'] = item['title'].substring(0, 60).concat("..."); }
        if (item['deleted']) { item['title'] = "Post Removed By Admin" }
        document.getElementById("followlist").innerHTML = document.getElementById("followlist").innerHTML.concat('<div class="container-fluid text-center text-md-left"><div class="card"><br><div class="container"><a href="post.html?id=').concat(id).concat('"><b>').concat(item['title'].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")).concat('</b></a><br/>Posted by <a href="user.html?id=').concat(item['poster']).concat('">').concat(item['poster']).concat('</a><br/><img src="assets/up.png" height="18" alt="Up Votes"> ' + item['upvotes'] + ' <img src="assets/down.png" height="18" alt="Down Votes"> ' + item['downvotes'] + "</div><br></div></div><br>");
        lastfollowid = id;
    } catch (err) {
        console.log(err);
    }
}

function checkSess() {
    var sess = window.localStorage.getItem("sess");
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("get", "https://api.stibarc.gq/checksess.sjs?sess=" + sess, false);
    xmlHttp.send(null);
    if (xmlHttp.responseText.split("\n")[0] == "bad") {
        window.localStorage.removeItem("sess");
        window.localStorage.removeItem("username");
        location.reload();
    }
}

function getUsername() {
    var sess = window.localStorage.getItem("sess");
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "https://api.stibarc.gq/getusername.sjs", false);
    xmlHttp.send("sess=" + sess);
    window.localStorage.setItem("username", xmlHttp.responseText.split("\n")[0]);
}

var lastid = 1;
var lastfollowid = 1;

function loadMore() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "https://api.stibarc.gq/v2/getposts.sjs?id=" + lastid, false);
    xmlHttp.send(null);
    if (xmlHttp.responseText.trim() != "") {
        var tmp = JSON.parse(xmlHttp.responseText);
        var tmp2 = lastid - 1;
        for (var i = tmp2; i > tmp2 - 20; i--) {
            toLink(i, tmp[i]);
        }
    } else {
        document.getElementById("loadmorecontainer").style.display = "none";
    }
}

function loadMoreFollow() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "https://api.stibarc.gq/v3/getfollowposts.sjs?sess=" + localStorage.sess + "&id=" + lastfollowid, false);
    xmlHttp.send(null);
    if (xmlHttp.responseText.trim() != "No posts") {
        var tmp = JSON.parse(xmlHttp.responseText);
        var tmp2 = [];
        for (var i in tmp) {
            tmp2.push(i);
        }
        for (var i = tmp2.length - 1; i >= 0; i--) {
            toFollowLink(tmp2[i], tmp[tmp2[i]]);
        }
    } else {
        document.getElementById("followloadmorecontainer").style.display = "none";
    }
}

function getSVAnnounce() {
    var announce = false;
    if (announce == true) {
        var sess = window.localStorage.getItem("sess");
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://raw.githubusercontent.com/VersoCre/svaurora/master/announce.json", true);
        xhr.send(null);
        xhr.onload = function (e) {
            if (xhr.responseText != "\n") {
                var tmp = JSON.parse(xhr.responseText);
                document.getElementsByTagName("body")[0].innerHTML = '<br><br><br><div id="announce" style="text-align:center;background-color:#0083ff;word-wrap:break-word;padding:15px;color:white"><h2>' + tmp['title'] + '</h2>' + tmp['content'] + '</div>' + document.getElementsByTagName("body")[0].innerHTML;
            }
        }
    }
    document.getElementById("loadmore").onclick = function (evt) {
        loadMore();
    }
    document.getElementById("followloadmore").onclick = function (evt) {
        loadMoreFollow();
    }
}

window.onload = function () {
    document.getElementById("load").style.display = "none";
    document.getElementById("thepage").style.display = "";
    var offline = false;
    var user = window.localStorage.getItem("username");
    var pfp = ("GET", "https://api.stibarc.gq/v2/getuserpfp.sjs?id=" + user, false);
    var sess = window.localStorage.getItem("sess");
    if (sess != undefined && sess != null && sess != "") {
        checkSess();
        document.getElementById("loggedout").style.display = "none";
        document.getElementById("loggedin").style.display = "";
        document.getElementById("loggedout-").style.display = "none";
        document.getElementById("loggedin-").style.display = "";
    }
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "https://api.stibarc.gq/v2/getposts.sjs", false);
    try {
        xmlHttp.send(null);
    } catch (err) {
        offline = true;
    }
    document.getElementById("user").innerHTML = ' Welcome back to Aurora,  '.concat(user) + '.';
    document.getElementById("loadmorecontainer").style.display = "";
    if (sess != undefined && sess != null && sess != "") {
        var xhr = new XMLHttpRequest();
        xhr.open("get", "https://api.stibarc.gq/v3/getfollowposts.sjs?sess=" + sess, false);
        xhr.send(null);
        if (xhr.responseText != "No posts\n") {
            var followtmp = JSON.parse(xhr.responseText);
            document.getElementById("followlist").innerHTML = "";
            var tmpposts = [];
            for (var key in followtmp) {
                tmpposts.push(key);
            }
            for (var i = tmpposts.length - 1; i >= 0; i--) {
                toFollowLink(tmpposts[i], followtmp[tmpposts[i]]);
            }
            document.getElementById("followloadmorecontainer").style.display = "";
        } else {
            document.getElementById("followlist").innerHTML = '<div class="container-fluid text-center text-md-left"><div class="card"><br><div class="container">' + "It looks like you aren't following anyone, or no one has posted anything yet.</div><br></div></div>";
            document.getElementById("followloadmorecontainer").style.display = "none";
        }
    }
    if (!offline) {
        getSVAnnounce();
        if (window.localStorage.getItem("username") == "" || window.localStorage.getItem("username") == undefined) {
            if (sess != undefined && sess != null && sess != "") {
                getUsername();
            }
        }
        var tmp = JSON.parse(xmlHttp.responseText);
        document.getElementById("list").innerHTML = "";
        for (var i = tmp['totalposts']; i > tmp['totalposts'] - 20; i--) {
            toLink(i, tmp[i]);
        }
        document.getElementById("loadmorecontainer").style.display = "";
        var thing = new XMLHttpRequest();
        var id = window.localStorage.getItem("username");
        thing.open("GET", "https://api.stibarc.gq/v3/getuser.sjs?id=" + id, false);
        thing.send(null);
        var tmp = JSON.parse(thing.responseText);
        var pfp = tmp['pfp'];
        var navpfp = tmp['pfp'];
        document.getElementById("pfp").src = pfp + ' ';
        document.getElementById("navpfp").src = navpfp + ' ';
    } else {
        document.getElementById("list").innerHTML = "Aurora could not connect to the STiBaRC services. Check to see if you're connected and also check the server status.";
    }
    startNotifs();
}