const URL_FOOD_FACT = 'https://www.trucs-en-vrac.ch/api/article.php';

let html = "";
let option;

getFood();
isLogged();

async function getFood() {
    const response = await fetch(URL_FOOD_FACT);
    const jsonData = await response.json();

    document.querySelector("section").innerHTML = putInHTML(jsonData);
    addEventOnArticle();
}

function putInHTML(data){
    let html = "";

    data.forEach(element => {
        html += `
        <div class='card article text-center row' data-food-index=${element.id}>
        <img src='img/empty.png'>
        <h2>${element.name}</h2>
        ${option}
        <p id="prix">Prix: ${element.price} CHF</p>
        <p class="" id="description">${element.description.substr(0, 30)}...</p>
        </div>`;
    });

    return html;
}

function addEventOnArticle(){
    const articles = document.querySelectorAll(".article");

    for (const article of articles) {

        article.addEventListener("click", event => {
            const parent = event.target.closest("div");
            const id = parseInt(parent.dataset.foodIndex);

            window.location.href = `detail.html?id=${id}`;
        })
    }
}

function switchToUpdate(){
    const articles = document.querySelectorAll(".article");

    for (const article of articles) {
        article.addEventListener("click", event => {
            const parent = event.target.closest("div");
            const id = parseInt(parent.dataset.foodIndex);

            window.location.href = `modifier.html?id=${id}`;
        })
    }
}

function isLogged() {
    if (localStorage.getItem("id")!="null") {

        document.querySelector("#status").innerHTML = "Connecté";
        option = `<span><img src="img/option.png" id="option" width="30" height="30" onclick='switchToUpdate()'></span>`;
        document.querySelector("#ajouter").className = "visible";
    }
    else{
        
        document.querySelector("#status").innerHTML = "Déconnecté";
        document.querySelector("#ajouter").className = "invisible";
        option = "";
    }
}