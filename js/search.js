function toLink(item) {
    try {
        var i = item.indexOf(':');
        var splits = [item.slice(0, i), item.slice(i + 1)];
        document.getElementById("list").innerHTML = document.getElementById("list").innerHTML.concat('<a href="post.html?id=').concat(splits[0]) + '"><div class="card"><br><div class="container">'.concat(splits[1].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")).concat("</div><br></div></a><br>");
    } catch (err) {
        console.log("Whoops");
    }
}

function toJSON(cookie) {
    var output = {};
    cookie.split(/\s*;\s*/).forEach(function (pair) {
        pair = pair.split(/\s*=\s*/);
        output[pair[0]] = pair.splice(1).join('=');
    });
    return output;
}

function search() {
    //var q = document.getElementById("q").value;
    if (q != "") {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("post", "https://api.stibarc.gq/postsearch.sjs", false);
        xmlHttp.send("q=" + encodeURIComponent(q));
        if (xmlHttp.responseText.split("\n")[0] != "No results" && xmlHttp.responseText != "") {
            var tmp = xmlHttp.responseText.split("\n");
            document.getElementById("list").innerHTML = "";
            for (i = tmp.length - 2; i >= 0; i--) {
                toLink(tmp[i]);
            }
        } else {
            document.getElementById("list").innerHTML = '<div class="card"><br><div class="container">Sad Jim🅱o emoji. We could not find a post containing "<b>' + q + '</b>".</div><br></div>';
            document.getElementById("searcher").style.display = "none";
        }
        document.getElementById("main").style.display = "";
    } else {
        document.getElementById("main").style.display = "";
        document.getElementById("list").innerHTML = '<div class="card"><br><div class="container">Sad Jim🅱o emoji. If you want to search a post, the search field cannot be blank!</div><br></div>';
        document.getElementById("searcher").style.display = "none";
    }
}
var q;
window.onload = function () {
    document.getElementById("load").style.display = "none";
    document.getElementById("thepage").style.display = "";
    var sess = window.localStorage.getItem("sess");
    if (sess != undefined && sess != null && sess != "") {
        document.getElementById("loggedout").style.display = "none";
        document.getElementById("loggedin").style.display = "";
    }
    q = getAllUrlParams().q;
    search();
    document.getElementById("searchterm").innerHTML = 'Search results for <b>"' + q + '</b>".'
    document.title = q + " | Search - Aurora";
    var thing = new XMLHttpRequest();
    var name = window.localStorage.getItem("username");
    thing.open("GET", "https://api.stibarc.gq/v2/getuser.sjs?id=" + name, false);
    thing.send(null);
    var tmp = JSON.parse(thing.responseText);
    var navpfp = tmp['pfp'];
    document.getElementById("navpfp").src = navpfp + ' ';
}