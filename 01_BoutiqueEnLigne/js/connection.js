const URL_LOGIN = 'https://www.trucs-en-vrac.ch/api/login.php';

let userName = document.querySelector("#appLogin");
let password1 = document.querySelector("#appPassword");

isLogged()

document.querySelector("form").addEventListener("submit",(event)=>{
    seConecter(event);
});
document.querySelector("#seDeconnecter").addEventListener("click",(event)=>{
    event.preventDefault();

    logout();
    isLogged();
});
function seConecter(event){    
    event.preventDefault();

    let form = event.target;
    const data = new FormData(form);
    const userInfo = Object.fromEntries(data);

    getUser(userInfo);
}

async function getUser(bodyData) {

    const options = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
        redirect: 'follow',
        mode: 'cors',
        cache: 'no-cache',
    };

    const resp = await fetch(URL_LOGIN, options);
    const jsonData = await resp.json();

    if (!resp.ok) {
        document.querySelector("#erreur").innerHTML = "Cette utilisateur n'existe pas";

        logout();

        throw new Error("Échec " + await resp.text());
    
    }
    else{
        document.querySelector("#erreur").innerHTML = "";

        localStorage.setItem("id",jsonData.id);
        localStorage.setItem("admin",jsonData.admin);
        localStorage.setItem("userName",jsonData.userName);
        localStorage.setItem("appLogin",jsonData.appLogin);
        localStorage.setItem("appToken",jsonData.appToken);
    }
    isLogged();
}
function isLogged() {
    if (localStorage.getItem("id")!="null") {
        document.querySelector("#status").innerHTML = "Connecté";

        document.querySelector("form").className = "invisible";
        document.querySelector("#divDeconnection").className = "visible";

        document.querySelector("#erreurDiv").className = "alert alert-success";
        document.querySelector("#erreur").innerHTML = "Vous êtes connectez";
    }
    else{
        document.querySelector("#status").innerHTML = "Déconnecté";

        document.querySelector("form").className = "visible";
        document.querySelector("#ajouter").className = "invisible";
        document.querySelector("#divDeconnection").className = "invisible";

        document.querySelector("#erreurDiv").className = "alert alert-danger";
        document.querySelector("#erreur").innerHTML = "Vous n'êtes pas connecté";
    }
}
function logout() {
    localStorage.setItem("id",null);
    localStorage.setItem("admin",null);
    localStorage.setItem("userName",null);
    localStorage.setItem("appLogin",null);
    localStorage.setItem("appToken",null);
    
    isLogged();
}