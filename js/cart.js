//inisialisation du local storage
let localStorageProduit = JSON.parse(localStorage.getItem("produit"));
table(localStorageProduit);


//fonction pour verifier si le panier est vide et le signaler
function verifPanierVide() {

    if (localStorageProduit === null || localStorage == 0 || localStorageProduit == 0) { //si le local storage es vide alors on affiche la fenêtre suivante
        const balisePvide = document.querySelector("h1")
        balisePvide.textContent = "votre panier est vide";
        return true;
    }
}

//fonction pour afficher les produit du panier
function affichageDuPanier() {
    verifPanierVide();

    for (let produit in localStorageProduit) {
        let baliseGeneral = document.querySelector("#cart__items");

        const idProd = localStorageProduit[produit].idDuProduit;


        const couleurProd = localStorageProduit[produit].couleurDuProduit;


        const quantiterProd = localStorageProduit[produit].quantiterDuProduit;

        //création de l'article
        const baliseArticle = document.createElement("article")
        baliseGeneral.appendChild(baliseArticle);
        baliseArticle.className = "cart__item";
        baliseArticle.setAttribute('data-id', idProd);
        baliseArticle.setAttribute('data-color', couleurProd);

        // fetch de l'api pour afficher les img etc.
        fetch(`http://localhost:3000/api/products/` + idProd)
            .then((response) => response.json())
            .then((produit) => {
                //creation de la div img
                const baliseDivImg = document.createElement("div")
                baliseArticle.appendChild(baliseDivImg);
                baliseDivImg.className = "cart__item__img";

                //creation de l'img
                const baliseImg = document.createElement("img");
                baliseDivImg.appendChild(baliseImg);
                baliseImg.setAttribute('src', `${produit.imageUrl}`);
                baliseImg.setAttribute('alt', `${produit.altTxt}`);

                //creation de la div du contenu
                const baliseDivContenu = document.createElement("div");
                baliseArticle.appendChild(baliseDivContenu);
                baliseDivContenu.className = "cart__item__content";

                //creation de la div description dans la div contenu
                const baliseDivDescription = document.createElement("div");
                baliseDivContenu.appendChild(baliseDivDescription);
                baliseDivDescription.className = "cart__item__content__description";

                //creation du titre avec le nom du produit
                const baliseH2Nom = document.createElement("h2");
                baliseDivDescription.appendChild(baliseH2Nom)
                baliseH2Nom.textContent = `${produit.name}`;

                //creation du p pour afficher la couleur du produit
                const balisePCouleur = document.createElement("p");
                baliseDivDescription.appendChild(balisePCouleur)
                balisePCouleur.textContent = `${couleurProd}`;

                //creation du p pour afficher le prix du produit
                const balisePPrix = document.createElement("p");
                baliseDivDescription.appendChild(balisePPrix);
                balisePPrix.textContent = `${produit.price} €`;

                //creation de la div parametre pour la quantiter etc.
                const baliseDivContenuParametre = document.createElement("div");
                baliseArticle.appendChild(baliseDivContenuParametre);
                baliseDivContenuParametre.className = "cart__item__content__settings";

                //creation de la div quantiter
                const baliseDivQuantiter = document.createElement("div");
                baliseDivContenuParametre.appendChild(baliseDivQuantiter);
                baliseDivQuantiter.className = "cart__item__content__settings__quantity";

                //creation du p pour afficher la quantiter
                const balisePQuantiter = document.createElement("p");
                baliseDivQuantiter.appendChild(balisePQuantiter)
                balisePQuantiter.textContent = "Qté : ";

                //creation du input pour afficher et géré de façon dynamique la quantiter des produits 
                const baliseInput = document.createElement("input");
                baliseDivQuantiter.appendChild(baliseInput);
                baliseInput.type = 'number';
                baliseInput.className = 'itemQuantity';
                baliseInput.name = 'itemQuantity';
                baliseInput.min = '1';
                baliseInput.max = '100';
                baliseInput.value = `${quantiterProd}`;
                baliseInput.addEventListener("change", (event) => {
                    changeQuantiter(event.target);
                })


                //creation de la div pour supprimer les produits 
                const baliseDivSupprimer = document.createElement("div");
                baliseArticle.appendChild(baliseDivSupprimer);
                baliseDivSupprimer.className = "cart__item__content__settings__delete";
                baliseDivSupprimer.addEventListener("click", (event) => {
                    suppItem(event.target);
                })

                //creation du p pour supprimer les produit
                const balisePSupprimer = document.createElement("p");
                baliseDivSupprimer.appendChild(balisePSupprimer);
                balisePSupprimer.className = "deleteItem";
                balisePSupprimer.textContent = "Supprimer";

                prixTotal();
                quantiterTotal()
            })

    }
}
affichageDuPanier();

//fonction pour supprimer un article du panier
function suppItem() {
    let btnSupp = document.querySelectorAll('.deleteItem');

    for (let i = 0; i < btnSupp.length; i++) {
        btnSupp[i].addEventListener("click", (event) => {
            event.preventDefault();
            let idSelectioner = btnSupp[i].closest("article").dataset.id;
            (idSelectioner);
            let couleurSelectioner = btnSupp[i].closest("article").dataset.color;
            (couleurSelectioner);
            localStorageProduit = localStorageProduit.filter(el => el.idDuProduit !== idSelectioner || el.couleurDuProduit !== couleurSelectioner);
            (localStorageProduit);
            localStorage.setItem("produit", JSON.stringify(localStorageProduit));
            location.reload();

        })
    }
}
//fonction pour changer la quantiter d'un article du panier
function changeQuantiter() {
    let produitQuantiter = document.querySelectorAll(".itemQuantity");

    produitQuantiter.forEach((produitQt) => {
        let idProduitQt = produitQt.closest("article").dataset.id;
        (idProduitQt);
        let couleurProduitQT = produitQt.closest("article").dataset.color;
        (couleurProduitQT);
        produitQt.addEventListener("click", (event) => {
            event.preventDefault();
            let nouvelQuantiter = Number(produitQt.value);
            localStorageProduit.forEach((element) => {
                if (element.idDuProduit == idProduitQt && element.couleurDuProduit == couleurProduitQT) {
                    element.quantiterDuProduit = nouvelQuantiter;
                    location.reload();
                }
            });
            localStorage.setItem("produit", JSON.stringify(localStorageProduit));

        })
    })


}

//fonction qui calcule le prix total des articles du panier
function prixTotal() {
    let quantiter = document.querySelectorAll(".itemQuantity");
    let prix = document.querySelectorAll(".cart__item__content__description");
    let prixPanier = 0;

    for (let i = 0; i < prix.length; i++) {
        prixPanier += parseInt(prix[i].lastElementChild.textContent) * quantiter[i].value;
    }
    document.querySelector('#totalPrice').textContent = prixPanier;
    localStorage.setItem("produit", JSON.stringify(localStorageProduit));

}
// fonction qui calcule la quantiter total d'articles du panier
function quantiterTotal() {
    let produitTotal = JSON.parse(localStorage.getItem("produit"));
    let totalProduit = 0;
    for (const item of produitTotal) {
        totalProduit += parseInt(item.quantiterDuProduit);
    }
    const quantiterTotalProduit = document.querySelector('#totalQuantity');
    quantiterTotalProduit.textContent = totalProduit;
    localStorage.setItem("produit", JSON.stringify(localStorageProduit));
}
// fonction de vérification des champ dans le formulaire
function formulaire() {
    let nameRegex = /^[a-zA-Z\-çñàéèêëïîôüù ]{2,}$/;
    let adressRegex = /^[0-9a-zA-Z\s,.'-çñàéèêëïîôüù]{3,}$/;
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // Variables pour récupérer les id des champs de formulaire
    const prenom = document.getElementById("firstName");
    const nom = document.getElementById("lastName");
    const address = document.getElementById("address");
    const ville = document.getElementById("city");
    const email = document.getElementById("email");
    //pour le prénom
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
    //pour le nom
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
    //pour l'addresse
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
    //pour la ville
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
    //pour l'email
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


}

formulaire();

//fonction pour le post fetch
function postFetch() {
    const commande = document.querySelector('#order');

    commande.addEventListener("click", (event) => {
        event.preventDefault();

        let inputPrenom = document.querySelector('#firstName');
        let inputNom = document.querySelector('#lastName');
        let inputAdress = document.querySelector('#address');
        let inputVille = document.querySelector('#city');
        let inputEmail = document.querySelector('#email')

        let produitAcheter = [];
        for (let y = 0; y < localStorageProduit.length; y++) {
            produitAcheter.push(localStorageProduit[y].idDuProduit);
        }
        (produitAcheter);
        const order = {
                contact: {
                    firstName: inputPrenom.value,
                    lastName: inputNom.value,
                    address: inputAdress.value,
                    city: inputVille.value,
                    email: inputEmail.value
                },
                products: produitAcheter,
            }
            (order);
        const options = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
        };
        (options);

        fetch("http://localhost:3000/api/products/order", options)
            .then((response) => response.json())
            .then((data) => {
                (data);
                document.location.href = 'confirmation.html?id=' + data.orderId;
            })

    })
}
postFetch();