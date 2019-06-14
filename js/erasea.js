function returnFeed() {
    window.location.href = "index.html";
}

window.onload = function () {
    var resetv = localStorage.reseter;
    if (resetv == "true") {
        localStorage.clear;
        setTimeout(returnFeed, 5000)
    } else {
        window.history.back();
    }  
}