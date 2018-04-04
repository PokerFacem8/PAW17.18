'use strict';

function changeColor(box) {
    var rndCol = 'rgb(' + Math.floor(1 + Math.random() * 255) + ',' + Math.floor(1 + Math.random() * 255) + ',' + Math.floor(1 + Math.random() * 255) + ')';
    document.getElementById(box).style.backgroundColor = rndCol;
}

function begin() {
    for(let i = 1;i<=16;i++ ){
        changeColor(i);
    } 
}



document.getElementById('1').addEventListener("click",function() {
    changeColor('1');
});

document.getElementById('2').addEventListener("click", function () {
    changeColor('2');
});

document.getElementById('3').addEventListener("click", function () {
    changeColor('3');
});

document.getElementById('4').addEventListener("click", function () {
    changeColor('4');
});

document.getElementById('5').addEventListener("click", function () {
    changeColor('5');
});

document.getElementById('6').addEventListener("click", function () {
    changeColor('6');67
});

document.getElementById('7').addEventListener("click", function () {
    changeColor('7');
});

document.getElementById('8').addEventListener("click", function () {
    changeColor('8');
});

document.getElementById('9').addEventListener("click", function () {
    changeColor('9');
});

document.getElementById('10').addEventListener("click", function () {
    changeColor('10');
});

document.getElementById('11').addEventListener("click", function () {
    changeColor('11');
});

document.getElementById('12').addEventListener("click", function () {
    changeColor('12');
});

document.getElementById('13').addEventListener("click", function () {
    changeColor('13');
});

document.getElementById('14').addEventListener("click", function () {
    changeColor('14');
});

document.getElementById('15').addEventListener("click", function () {
    changeColor('15');
});

document.getElementById('16').addEventListener("click", function () {
    changeColor('16');
});
