let localStorageProduit = JSON.parse(localStorage.getItem("produit"));
console.table(localStorageProduit);



function verifPanierVide() {

    if (localStorageProduit === null || localStorage == 0) {

        window.confirm("votre panier est vide aller d'abort le remplir, cliquez sur OK")
        window.location.href = "index.html";
        return true;
    }
}

function affichageDuPanier() {
    verifPanierVide();

    for (let produit in localStorageProduit) {
        let baliseGeneral = document.querySelector("#cart__items");

        const baliseArticle = document.createElement("article")
        baliseGeneral.appendChild(baliseArticle);
        baliseArticle.className = "cart__item";
        baliseArticle.setAttribute('data-id', localStorageProduit[produit].idDuProduit);
        baliseArticle.setAttribute('data-color', localStorageProduit[produit].couleurDuProduit);
        baliseArticle.setAttribute('data-quantiter', localStorageProduit[produit].quantiterDuProduit);
        const idProd = baliseArticle.getAttribute('data-id');
        console.log(idProd);

        const couleurProd = baliseArticle.getAttribute('data-color');
        console.log(couleurProd);

        const quantiterProd = baliseArticle.getAttribute('data-quantiter');
        console.log(quantiterProd);

        fetch(`http://localhost:3000/api/products/` + idProd)
            .then((response) => response.json())
            .then((produit) => {
                const baliseDivImg = document.createElement("div")
                baliseArticle.appendChild(baliseDivImg);
                baliseDivImg.className = "cart__item__img";
        
                const baliseImg = document.createElement("img");
                baliseDivImg.appendChild(baliseImg);
                baliseImg.setAttribute('src', `${produit.imageUrl}`);
                baliseImg.setAttribute('alt', `${produit.altTxt}`);

                const baliseDivContenu = document.createElement("div");
                baliseArticle.appendChild(baliseDivContenu);
                baliseDivContenu.className = "cart__item__content";
        
                const baliseDivDescription = document.createElement("div");
                baliseDivContenu.appendChild(baliseDivDescription);
                baliseDivDescription.className = "cart__item__content__description";
        
                const baliseH2Nom = document.createElement("h2");
                baliseDivDescription.appendChild(baliseH2Nom)
                baliseH2Nom.textContent = `${produit.name}`;
        
                const balisePCouleur = document.createElement("p");
                baliseDivDescription.appendChild(balisePCouleur)
                balisePCouleur.textContent = `${couleurProd}`;
        
                const balisePPrix = document.createElement("p");
                baliseDivDescription.appendChild(balisePPrix);
                balisePPrix.textContent = `${produit.price}`;
        
        
                const baliseDivContenuParametre = document.createElement("div");
                baliseArticle.appendChild(baliseDivContenuParametre);
                baliseDivContenuParametre.className = "cart__item__content__settings";
        
                const baliseDivQuantiter = document.createElement("div");
                baliseDivContenuParametre.appendChild(baliseDivQuantiter);
                baliseDivQuantiter.className = "cart__item__content__settings__quantity";

                const balisePQuantiter = document.createElement("p");
                baliseDivQuantiter.appendChild(balisePQuantiter)
                balisePQuantiter.textContent = "Qté : ";

                const baliseInput = document.createElement("input");
                baliseDivQuantiter.appendChild(baliseInput);
                baliseInput.type = 'number';
                baliseInput.className = 'itemQuantity'; 
                baliseInput.name = 'itemQuantity';
                baliseInput.min = '1';
                baliseInput.max = '100';
                baliseInput.value = `${quantiterProd}`;
                
                const baliseDivSupprimer = document.createElement("div");
                baliseArticle.appendChild(baliseDivSupprimer);
                baliseDivSupprimer.className = "cart__item__content__settings__delete";
                
                const balisePSupprimer = document.createElement("p");
                baliseDivSupprimer.appendChild(balisePSupprimer);
                balisePSupprimer.className = "deleteItem";
                balisePSupprimer.textContent = "Supprimer";

            })

    }
}
affichageDuPanier();





let nameRegex = /^[a-zA-Z\-çñàéèêëïîôüù ]{2,}$/;
let adressRegex = /^[0-9a-zA-Z\s,.'-çñàéèêëïîôüù]{3,}$/;
let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// Variables pour récupérer les id des champs de formulaire
const prenom = document.getElementById("firstName");
const nom = document.getElementById("lastName");
const address = document.getElementById("address");
const ville = document.getElementById("city");
const email = document.getElementById("email");

prenom.addEventListener("change", (event) => {
    event.preventDefault();
    if (nameRegex.test(prenom.value) == false || prenom.value == "") {
        document.getElementById("firstNameErrorMsg").textContent = "Prénom invalide, exemple de prénom : Emmanuel";
        return false;
    } else {
        document.getElementById("firstNameErrorMsg").textContent = "";
        return true;
    }
});

nom.addEventListener("change", (event) => {
    event.preventDefault();
    if (nameRegex.test(nom.value) == false || nom.value == "") {
        document.getElementById("lastNameErrorMsg").textContent = "nom invalide, exemple de nom : Macron";
        return false;
    } else {
        document.getElementById("lastNameErrorMsg").textContent = "";
        return true;
    }
});

address.addEventListener("change", (event) => {
    event.preventDefault();
    if (adressRegex.test(address.value) == false || address.value == "") {
        document.getElementById("addressErrorMsg").textContent = "addresse invalide, exemple addresse : 55 Rue du Faubourg Saint-Honoré ";
        return false;
    } else {
        document.getElementById("addressErrorMsg").textContent = "";
        return true;
    }
});

ville.addEventListener("change", (event) => {
    event.preventDefault();
    if (adressRegex.test(ville.value) == false || ville.value == "") {
        document.getElementById("cityErrorMsg").textContent = "ville invalide, exemple ville : Paris";
        return false;
    } else {
        document.getElementById("cityErrorMsg").textContent = "";
        return true;
    }
});

email.addEventListener("change", (event) => {
    event.preventDefault();
    if (emailRegex.test(email.value) == false || email.value == "") {
        document.getElementById("emailErrorMsg").textContent = "email invalide, exemple ville : EmmanuelMacron@gmail.com";
        return false;
    } else {
        document.getElementById("emailErrorMsg").textContent = "";
        return true;
    }
});