function updatePhoto(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#thepfp')
                .attr('src', e.target.result)
                .width(100)
                .height(100);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

window.onload = function () {
    var sess = window.localStorage.getItem("sess");
    var id = window.localStorage.getItem("username");
    if (id != "Anon") {
        if (sess != undefined && sess != "") {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "https://api.stibarc.com/userinfo.sjs", true);
            xhr.send("sess=" + sess);
            xhr.onload = function (e) {
                var thing = new XMLHttpRequest();
                thing.open("GET", "https://api.stibarc.com/v2/getuser.sjs?id=" + id, false);
                thing.send(null);
                var tmp2 = JSON.parse(thing.responseText);
                var tmp = JSON.parse(xhr.responseText);
                document.getElementById("name").value = tmp['name'];
                document.getElementById("showname").checked = tmp['displayname'];
                document.getElementById("email").value = tmp['email'];
                document.getElementById("showemail").checked = tmp['displayemail'];
                document.getElementById("birthday").value = tmp['birthday'];
                document.getElementById("showbday").checked = tmp['displaybirthday'];
                document.getElementById("bio").value = tmp['bio'];
                document.getElementById("showbio").checked = tmp['displaybio'];
                document.getElementById("thepfp").src = tmp2['pfp'];
                document.getElementById("load").style.display = "none";
                document.getElementById("thepage").style.display = "";
            }
        } else {
            window.localStorage.removeItem("sess");
            window.location.href = "settings.html";
        }
        document.getElementById("submit").onclick = function (evt) {
            document.getElementById("load").style.display = "";
            document.getElementById("thepage").style.display = "none";
            var sess = window.localStorage.getItem("sess");
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "https://api.stibarc.com/updateprofile.sjs", true);
            var showemail = document.getElementById("showemail").checked;
            if (showemail == false) { showemail = ""; }
            var showname = document.getElementById("showname").checked;
            if (showname == false) { showname = ""; }
            var showbday = document.getElementById("showbday").checked;
            if (showbday == false) { showbday = ""; }
            var showbio = document.getElementById("showbio").checked;
            if (showbio == false) { showbio = ""; }
            xhr.send("sess=" + sess + "&email=" + encodeURIComponent(document.getElementById("email").value) + "&name=" + encodeURIComponent(document.getElementById("name").value) + "&birthday=" + encodeURIComponent(document.getElementById("birthday").value) + "&bio=" + encodeURIComponent(document.getElementById("bio").value) + "&showemail=" + showemail + "&showname=" + showname + "&showbday=" + showbday + "&showbio=" + showbio);
            xhr.onload = function (e) {
                window.location.href = "editprofile.html";
            }
        }
    } else {
        window.location.href = "account.html";
    }
}