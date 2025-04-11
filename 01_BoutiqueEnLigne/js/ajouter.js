const URL_FOOD_FACT = 'https://www.trucs-en-vrac.ch/api/article.php';

let formulaire = document.querySelector("form");

isLogged();

formulaire.addEventListener("submit", event => {
    submit(event)
});

function submit(event) {
    event.preventDefault();
    let form = event.target;
    const data = new FormData(form);
    const food = Object.fromEntries(data);
    postFood(food);
}


async function postFood(bodyData) {

    const options = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
        redirect: 'follow',
        mode: 'cors',
        cache: 'no-cache',
    };

    options.headers["Authorization"] = "Bearer " + localStorage.getItem("appToken");
    const resp = await fetch(URL_FOOD_FACT, options);
    
    if (!resp.ok) {
        throw new Error("Échec " + await resp.text());
    }
    else {
        window.location.href = "index.html";
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