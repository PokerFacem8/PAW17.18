"use strict";


document.getElementById('button').addEventListener('click', function () {
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
            if(this.readyState == 4 && this.status== 200) {
                let obj = JSON.parse(this.responseText);
                for(let i = 0 ; i< obj.countries.length; i++){
                    //Print Code
                    let code = document.createElement('p');
                    document.getElementById('conteudo').appendChild(code);
                    code.innerHTML = "Code: " + obj.countries[i].code;
                    //Print Name
                    let name = document.createElement('p');
                    document.getElementById('conteudo').appendChild(name);
                    name.innerHTML = "Name: " + obj.countries[i].name;
                }
            }
        };
    xhttp.open("GET", "countries.json",true);
    xhttp.send();
    


});