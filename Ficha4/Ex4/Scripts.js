'use strict';
//Check if emails are Compatible
function checkEmail() {
    let email = document.getElementById('femail');
    let conemail = document.getElementById('cemail');
    if(email.value != conemail.value){
        conemail.value = '';
        return false;
    }else{
        return true;
    }   
}

//Compare PSW
function comparePsw(){
    let psw = document.getElementById('psw');
    let cpsw = document.getElementById('cpsw');
    if(psw.value != cpsw.value){
        cpsw.value = '';
        alert("PassWords Are Not Compatible!");
        return false;
    }else{
        return true;
    }
}

//Check PSW Rqeuirements
function checkedPsw(){
    let psw = document.getElementById('psw');
    let cpsw = document.getElementById('cpsw');
    let letters = /[a-z]/g;
    let numbers = /[0-9]/g;
    if(psw.value.length >= 6 && psw.value.match(letters) && psw.value.match(numbers)){  
        comparePsw(); 
    }else{
        psw.value = '';
        alert("Requirements Are Not Completed!");
        return false;
    }
}

//Check if CheckBox is Checked
document.getElementById('termos').onchange = function(){
    let submitbtn = document.getElementById('submitbtn');
    if(this.checked){
        submitbtn.disabled = false;
    } else {
        submitbtn.disabled = true;
    }
}

//Validate Form
document.getElementById('submitbtn').onclick = function(){
    checkEmail();
    checkedPsw();
    
}







