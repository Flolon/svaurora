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

var getUsername = function() {
	var sess = window.localStorage.getItem("sess");
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", "https://api.stibarc.gq/getusername.sjs", false);
	xmlHttp.send("sess="+sess);
	window.localStorage.setItem("username", xmlHttp.responseText.split("\n")[0]);
}

var getChats = function() {
	document.getElementById("recentcon").innerHTML = "<br/>";
	var sess = window.localStorage.getItem("sess");
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", "https://messenger.stibarc.gq/api/v2/getuserchats.sjs", true);
    xmlHttp.send("sess=" + sess);
	xmlHttp.onload = function(e) {
		var tmp = JSON.parse(xmlHttp.responseText);
		for (key in tmp) {
			var div = document.createElement('div');
            div.className = 'conversations';
            div.innerHTML = '<a href="chat.html?id=' + key + '" id="messages">' + tmp[key]['user'] + "</a>:";
            if (tmp[key]['lastmessage'] == undefined) { tmp[key]['lastmessage'] = { sender: tmp[key]['user'], message: " You haven't sent a message to this user yet!" } }
            if (tmp[key]['lastmessage']['message'].length > 50) { tmp[key]['lastmessage']['message'] = tmp[key]['lastmessage']['message'].substring(0, 50).concat("..."); }
            if (tmp[key]['lastmessage']['message'].startsWith("[Encrypted] ")) { tmp[key]['lastmessage'] = { sender: tmp[key]['user'], message: " <b style=\"color:green;\"><i>[Encrypted Message.]</i></b>" } }
            div.innerHTML = div.innerHTML.concat("<br/><i>" + tmp[key]['lastmessage']['sender'] + ": " + tmp[key]['lastmessage']['message'] + "</i>");
            document.getElementById("recentcon").appendChild(div);
            document.getElementById("recentcon").innerHTML = document.getElementById("recentcon").innerHTML.concat("<hr>");
		}
    }
    document.getElementById("load").style.display = "none";
    document.getElementById("thepage").style.display = "";
}

function getUsername() {
	var sess = window.localStorage.getItem("sess");
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", "https://api.stibarc.gq/getusername.sjs", false);
	xmlHttp.send("sess="+sess);
	window.localStorage.setItem("username", xmlHttp.responseText.split("\n")[0]);
}

window.onload = function () {
    var user = window.localStorage.getItem("username");
    document.getElementById("load").style.display = "none";
    document.getElementById("thepage").style.display = "";
    var sess = window.localStorage.getItem("sess");
    if (sess != undefined && sess != null && sess != "") {
        checkSess();
        getChats();
        document.getElementById("loggedout").style.display = "none";
        document.getElementById("loggedin").style.display = "";
        document.getElementById("loggedout-").style.display = "none";
        document.getElementById("loggedin-").style.display = "";
    }
    var thing = new XMLHttpRequest();
    var id = window.localStorage.getItem("username");
    if (id != undefined) {
        thing.open("GET", "https://api.stibarc.gq/v3/getuser.sjs?id=" + id, false);
        thing.send(null);
        var tmp = JSON.parse(thing.responseText);
        var pfp = tmp['pfp'];
        var navpfp = tmp['pfp'];
        document.getElementById("navpfp").src = navpfp + ' ';
    }
}