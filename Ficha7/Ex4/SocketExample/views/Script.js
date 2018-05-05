
function timedRefresh() {
    setTimeout("location.reload(true);",2000);
    document.getElementById('demo').innerHTML="server is calling you";
}

