const URL_FOOD_FACT = 'https://www.trucs-en-vrac.ch/api/article.php';
const URL_COMMENT = 'https://www.trucs-en-vrac.ch/api/article-comment.php';
const id = new URLSearchParams(window.location.search);

getHref();
addEventOnUpdate();
isLogged();
getCommentaire();

let selectEtoile = document.querySelector("select");

selectEtoile.addEventListener("change", event => {
    changeStar(selectEtoile.value);
});

document.querySelector("form").addEventListener("submit", event => {
    event.preventDefault();
    postComment();
});

function getHref() {
    getOneArticle(id);
}

async function getOneArticle(id) {
    const response = await fetch(`${URL_FOOD_FACT}?${id}`);
    const jsonData = await response.json();
    organiseHTML(jsonData);
}

function organiseHTML(data) {
    document.querySelector("h2").innerHTML = data.name;
    document.querySelector("#description").innerHTML = data.description;
    document.querySelector("#prix").innerHTML = data.price;
}

function addEventOnUpdate() {

    document.querySelector("#option").addEventListener("click", event => {

        const parent = event.target.closest("div");

        window.location.href = `modifier.html?${id}`;
    });
}

function isLogged() {
    if (localStorage.getItem("id") != "null") {
        document.querySelector("#status").innerHTML = "Connecté";
        document.querySelector("#ajouter").className = "visible";
        document.querySelector("#option").className = "visible";
    }
    else {
        document.querySelector("#status").innerHTML = "Déconnecté";
        document.querySelector("#ajouter").className = "invisible";
        document.querySelector("#option").className = "invisible";
    }
}


async function getCommentaire() {
    const response = await fetch(`${URL_COMMENT}?${id}`);
    const jsonData = await response.json();

    putCommentaireToHTML(jsonData);
}

function putCommentaireToHTML(commentaires) {

    let table = "";

    commentaires.forEach(commentaire => {
        let note = "";
        for (let index = 0; index < parseInt(commentaire["score"]); index++) {
            note += "<img src='./img/etoile.png' class='etoile'>";
        }
        for (let index = 4; index > parseInt(commentaire["score"]); index--) {
            note += "<img src='./img/etoile-grise.png' class='etoile'>";
        }

        table += `<tr><td>${commentaire["userName"]}</td><td>${commentaire["postedOn"]}</td><td>${commentaire["content"]}</td><td>${note}</td></tr>`;
    });
    document.querySelector("#commentaire").innerHTML = table;
}

function changeStar() {

    const imgEtoile = document.querySelectorAll(".noteEtoile");

    imgEtoile.forEach(element => {
        element.src = "./img/etoile-grise.png";

    });

    for (let index = 0; index < selectEtoile.value; index++) {
        imgEtoile[index].src = "./img/etoile.png";

    }
}

async function postComment() {

    let bodyData = {
        'articleId' : id.get("id"),
        'content': document.querySelector("#commentaireUser").value,
        'score': selectEtoile.value,
    };

    const options = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
        redirect: 'follow',
        mode: 'cors',
        cache: 'no-cache',
    };
    options.headers["Authorization"] = "Bearer " + localStorage.getItem("appToken");

    const resp = await fetch(`${URL_COMMENT}?${id}`, options);

    if (!resp.ok) {
        throw new Error("Échec " + await resp.text());
    
    }
    else{
        getCommentaire();
    }
}