window.onload = function () {
    document.getElementById("load").style.display = "none";
    document.getElementById("thepage").style.display = "";
    document.getElementById("themechng").onchange = function (evt) {
        var value = document.getElementById("themechng").value;
        localStorage.setItem("theme", value);
        if (value != "custom") {
            document.getElementById("themecust").style.display = "none";
            loadTheme();
        } else {
            document.getElementById("themecust").style.display = "";
        }
    }
}