function checkNotifs() {
    var perms = window.localStorage.getItem("notifs");
    var notiflisten = window.localStorage.notifli;
    if (notiflisten == undefined) {
        notiflisten = false; localStorage.notifli = "false"
        perms == "denied"
    } else if (notiflisten == true) {
        perms == "granted"
    }
	if (perms == "granted") {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open("get", "https://api.stibarc.gq/getnotifs.sjs", false);
		xmlHttp.send();
		var tmp = xmlHttp.responseText.split("\n");
		var lastID = window.localStorage.getItem("lastNotifID");
		if (lastID == "" || lastID == undefined || lastID == null) {lastID = -1;}
		if (tmp[0] != lastID) {
			var text = "";
			for (var i = 1; i < tmp.length-3; i++) {
				text = text.concat(tmp[i]+"\n");
			}
			text = text.concat(tmp[tmp.length-3]);
			if (text !== undefined && tmp[1] !== undefined) {
				window.localStorage.setItem("lastNotifID", tmp[0]);
                var notification = new Notification("Aurora", { body: text, requireInteraction: true, icon:'assets/newnotif.png'});
				notification.onclick = function(evt) {
					notification.close();
					window.parent.parent.focus();
					var postID = tmp[tmp.length-2];
					window.location.assign("post.html?id="+postID);
				}
			}
		}
	}
}

function checkNotifsUser(user) {
	var perms = window.localStorage.getItem("notifs");
	if (perms == "granted") {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open("post", "https://api.stibarc.gq/getusernotifs.sjs", true);
		xmlHttp.send("id="+user);
		if (xmlHttp.responseText.split("\n")[0] != "None") {
			var tmp = xmlHttp.responseText.split("\n");
			var lastID = window.localStorage.getItem("lastUserNotifID");
			if (lastID == "" || lastID == undefined || lastID == null) {lastID = -1;}
			if (tmp[0].concat(tmp[tmp.length-2]) != lastID) {
				var text = "";
				for (var i = 2; i < tmp.length-3; i++) {
					text = text.concat(tmp[i]+"\n");
				}
				text = text.concat(tmp[tmp.length-3]);
				window.localStorage.setItem("lastUserNotifID", tmp[0].concat(tmp[tmp.length-2]));
				if (text !== undefined && tmp[1] !== undefined) {
                    var notification = new Notification(tmp[1], { body: text, requireInteraction: true, icon:'assets/newnotif.png'});
					notification.onclick = function(evt) {
						notification.close();
						window.parent.parent.focus();
						var postID = tmp[tmp.length-2];
						window.location.assign("post.html?id="+postID);
					}
				}
			}
		}
	}
}


function setupNotifs() {
	if (Notification.permission == "default") {
		var perms = window.localStorage.getItem("notifs");
		if (perms == "" || perms == undefined || perms == null) {
			Notification.requestPermission(function (permission) {
				if (permission == "granted") {
					window.localStorage.setItem("notifs", "granted");
                    var notification = new Notification("Notifications enabled! - Aurora", { body: "Notifications for Aurora have been enabled. To disable notifications, check your browser settings.", requireInteraction: true, icon:'assets/notifenabled.png'});
					notification.onclick = function(evt) {
						window.parent.parent.focus();
					}
				} else {
					window.localStorage.setItem("notifs", "denied");
				}
			});
		}
	}
}

function doCheck() {
	checkNotifs();
	if (window.localStorage.getItem("username") != null && window.localStorage.getItem("username") != undefined && window.localStorage.getItem("username") != "") {
		checkNotifsUser(window.localStorage.getItem("username"));
	}
}

function startNotifs() {
	setupNotifs();
	setInterval(doCheck, 500);
}
