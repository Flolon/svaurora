window.onload = function () {
	var offline = false;
	var sess = window.localStorage.getItem("sess");
	if (sess != undefined && sess != null && sess != "") {
		document.getElementById("loggedout").style.display = "none";
		document.getElementById("loggedin").style.display = "";
	}
