/********************************
Filename:   main.js
Author:     Paramaporn (Moe) Prabphala
Description:main JavaScript file for AJAX Lotto
Date:       November 6, 2018    
*********************************/

document.addEventListener("DOMContentLoaded", init);

let pages = [];

function init() {

    pages = document.querySelectorAll(".page");
    console.log(pages);

    document.querySelector("#btnBack").addEventListener("click", function () {
        // navigate(0);
        document.getElementById("list").style.display = "none";

        document.getElementById("home").style.display = "block";

        let listOfNumbers = document.getElementById("listOfNumber");

        // console.log(listOfNumbers);
        
        while(listOfNumbers.firstChild){
            listOfNumbers.removeChild(listOfNumbers.firstChild);
        }
        // console.log(pages);
    });
    let btnSend = document.querySelectorAll("#btnSend");
    btnSend.forEach(function (item) {
        item.addEventListener("click", function () {
            // navigate(0);
            // console.log(pages);
        });
    });
    document.getElementById("btnSend").addEventListener("click", serverData.init);

}

let serverData = {
    url: "https://davidst.edumedia.ca/mad9014/nums.php",
    httpRequest: "POST",
    init: function () {
        let formData = new FormData();

        let digits = document.getElementById("digits");
        let max = document.getElementById("max");

        let url = "https://davidst.edumedia.ca/mad9014/nums.php" +"?digits="+digits.value + "&max=" + max.value;
        console.log(url);

        if (digits.value.length == 0) {
            digits.value = 0;
        }

        if (max.value.length == 0) {
            max.value = 0;
        }

        formData.append("digits", digits.value);
        formData.append("max", max.value);

        console.log(formData);
        
        formData.forEach((item, index) => console.log(index + ": " + item));

        let customOptions = {
            mode: "cors",
            method: serverData.httpRequest,
            body: formData
        };

        let request = new Request(serverData.url, customOptions);

        fetch(request)
            .then(function (response) {
                console.log(response);
                return response.json();
            })
            .then((data) => {
                console.log(data);
                

                data.numbers.forEach(function(num){
                    let listElement = document.createElement("li");
                    listElement.append(num);
                    
                    document.querySelector(".num_list").appendChild(listElement);
                })

                let pageBlock = document.querySelector(".page");
                if (pageBlock != null) {
                    pageBlock.style.display = "block";
                }
                document.getElementById("list").style.display = "block";

                document.getElementById("home").style.display = "none";

                



            })
            .catch((error) => console.log(error));
    }

};