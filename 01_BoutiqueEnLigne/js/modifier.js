const URL_FOOD_FACT = 'https://www.trucs-en-vrac.ch/api/article.php';
const id = new URLSearchParams(window.location.search);

getHref();
isLogged();

document.querySelector("#delete").addEventListener("click",event=>{
    deleteArticle(event);
});

document.querySelector("#update").addEventListener("click",event=>{
    updateArticle(event);
});

function getHref() {
    console.log(id.get("id"))
    getOneArticle(id);
}

//Pour voir les articles
async function getOneArticle(id) {

    const response = await fetch(`${URL_FOOD_FACT}?${id}`);
    const jsonData = await response.json();

    organiseHTML(jsonData);
}
function organiseHTML(data){
    document.querySelector("h2").innerHTML = data.name;
    document.querySelector("#description").innerHTML = data.description;
    document.querySelector("#prix").innerHTML = data.price;
    document.querySelector("#name").value = data.name;
    document.querySelector("#descriptionTextarea").innerHTML = data.description;
    document.querySelector("#price").value = data.price;
    document.querySelector("#imageArticle").value = data.image;
}
//Pour supprimer les articles
function deleteArticle(event){
    event.preventDefault();
    let form = document.querySelector("form");
    const data = new FormData(form);
    const food = Object.fromEntries(data);
    deleteFood(food);
}
async function deleteFood(bodyData){
    const options = {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
        redirect: 'follow',
        mode: 'cors',
        cache: 'no-cache',
    };
    options.headers["Authorization"] = "Bearer " + localStorage.getItem("appToken");
    const resp = await fetch(URL_FOOD_FACT + `?${id}`, options);
    console.log(resp);

    if (!resp.ok) {
        throw new Error("Échec " + await resp.text());
    }
    else {
        window.location.replace('index.html');
    }
}

//Pour modifier les articles
function updateArticle(event) {

    event.preventDefault();
    let form = document.querySelector("form");
    const data = new FormData(form);
    const food = Object.fromEntries(data);
    updateFood(food);
}

async function updateFood(bodyData) {

    const options = {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
        redirect: 'follow',
        mode: 'cors',
        cache: 'no-cache',
    };
    options.headers["Authorization"] = "Bearer " + localStorage.getItem("appToken");
    const resp = await fetch(URL_FOOD_FACT + `?${id}`, options);
    console.log(resp);

    if (!resp.ok) {
        throw new Error("Échec " + await resp.text());
    }
    else {
        window.location.replace('index.html');
    }

}
function isLogged() {
    if (localStorage.getItem("id")!="null") {
        document.querySelector("#status").innerHTML = "Connecté";
    }
    else{
        document.querySelector("#status").innerHTML = "Déconnecté";
    }
}