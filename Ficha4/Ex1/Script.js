
function altimgOpt(id) {

    switch (id) {
        case 1:
            document.getElementById('Imag').src = "./Screenshot_1.png";
            break;
        case 2:  
            document.getElementById('Imag').src = "./Screenshot_2.png";
            break;
        case 3:
            document.getElementById('Imag').src = "./Screenshot_3.png";
            break;
        case 4:
            document.getElementById('Imag').src = "./Screenshot_3.png";
            break;
        default:
            break;
    }
}

function mousePos(event) {
    alert("X:"+event.clientX+"Y:"+event.clientY); 
}

document.getElementById('1').addEventListener("click", function() {
    altimgOpt(1);
});
document.getElementById('2').addEventListener("click", function () {
    altimgOpt(2);
});
document.getElementById('3').addEventListener("click", function () {
    altimgOpt(3); 
});
document.getElementById('4').addEventListener("click", function () {
    altimgOpt(4);
});

document.getElementById('1').addEventListener("click", mousePos);
document.getElementById('2').addEventListener("click", mousePos);
document.getElementById('3').addEventListener("click", mousePos);
document.getElementById('4').addEventListener("click", mousePos);