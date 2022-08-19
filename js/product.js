//on récupère l'id du produit via l'url pour correctement afficher les détail du produit
let produitId = new URL(window.location.href).searchParams.get("id");
console.log(produitId);

//récupération des produits de l'api
async function appelDesProduits() {
    await fetch("http://localhost:3000/api/products/" + produitId)
        .then((response) => response.json())
        .then((data) => {
            {
                afficherProduit(data);
            }
        })
}

// appel de la fonction pour récuper les produits
appelDesProduits();


// fonction pour l'affichage des produit
function afficherProduit(articleKanap) {
    console.table(articleKanap);
    //affichage de l'image du produit
    const imgProduit = document.createElement("img");
    imgProduit.src = `${articleKanap.imageUrl}`;
    imgProduit.alt = `${articleKanap.altTxt}`;
    document.querySelector('article div.item__img')
        .appendChild(imgProduit); // fait en sorte que la balise img soit dans la div .item__img

    //affichage du titre du produit
    const h1Produit = document.querySelector('#title');
    h1Produit.textContent = `${articleKanap.name}`;

    //affichage du prix du produit
    const prixProduit = document.querySelector('#price');
    prixProduit.textContent = `${articleKanap.price}`;

    //affichage de la description du produit
    const descriptionProduit = document.querySelector('#description');
    descriptionProduit.textContent = `${articleKanap.description}`;


    //boucle for of pour afficher toutes les couleurs dispo du produit
    for (let couleurs of articleKanap.colors) {
        console.table(couleurs);

        //crée l'élément html option
        let couleursProduit = document.createElement("option");
        document.querySelector('#colors') // on séléctionne le bonne parti du code
            .appendChild(couleursProduit); // on fait en sorte que couleurProduit soit dans #colors
        couleursProduit.value = couleurs;
        couleursProduit.text = couleurs;
    }
    btnAjoutProduit(articleKanap);
}

//controle que la quantiter du produit soit entre 1 et 100
function controleQuantiter(test) {
    if (test.value < 1 || test.value > 100) {
        alert("vous devez entré une valeurs entre 1 et 100");
        return false;
    }
    return true;
}

// controle que la couleur du produit es bien séléctionner
function controleCouleurs(test) {
    if (test.value === "") {
        alert("vous devez choisir une couleur");
        return false;
    }
    return true;
}


// on vérifie si le champ quantité es modifier
function btnQuantiter() {
    let btnQuantiter = document.querySelector('#quantity');
    btnQuantiter.addEventListener("change", (event) => {
        controleQuantiter(event.target);
    })
}

btnQuantiter();


const quantiterProduit = document.querySelector('#quantity'); //on récupère la quantité
const couleur = document.querySelector('#colors'); //on récupère la couleur
// fonction pour ajouter au panier
function btnAjoutProduit() {
    let btnAddToCart = document.querySelector('#addToCart');
    // on écoute le btn addToCart
    btnAddToCart.addEventListener("click", (event) => {
        if (controleQuantiter(quantiterProduit) && (controleCouleurs(couleur))) { // on vérifie que la quantité et la couleur soit juste
            ajoutAuPanier();
        }
    });
}


function popupDeConfirmation() {
    if (window.confirm(`vous avez choisie la couleur ${couleur.value} en ${quantiterProduit.value} exemplère(s) 
    votre commande es ajouter au panier
    pour consulter votre panier, cliquez sur OK`)) {
        window.location.href = "cart.html";
    }
}


function ajoutAuPanier() {

    let choixCouleur = couleur.value;
    let choixQuantiter = quantiterProduit.value;
    //on récupère les options de l'article a ajouté au panier
    let produitOption = {
        idDuProduit: produitId,
        couleurDuProduit: choixCouleur,
        quantiterDuProduit: Number(choixQuantiter),
    };
    //on créé le local storage
    let localStorageProduit = JSON.parse(localStorage.getItem("produit"));

    //importation dans le local storage
    //si le panier a déjà 1 article
    if (localStorageProduit) {
        const resultatFind = localStorageProduit.find((el) => el.idDuProduit === produitId && el.couleurDuProduit == choixCouleur);
        //si le produit commandé est déjà dans le panier
        if (resultatFind) {
            let nouvelQuantiter = parseInt(produitOption.quantiterDuProduit) + parseInt(resultatFind.quantiterDuProduit);
            resultatFind.quantiterDuProduit = nouvelQuantiter;
            localStorage.setItem("produit", JSON.stringify(localStorageProduit));
            console.table(localStorageProduit);
            popupDeConfirmation();
            //si le produit commandé n'est pas dans le panier
        } else {
            localStorageProduit.push(produitOption);
            localStorage.setItem("produit", JSON.stringify(localStorageProduit));
            console.table(localStorageProduit);
            popupDeConfirmation();
        }
        //si le panier est vide
    } else {
        localStorageProduit = [];
        localStorageProduit.push(produitOption);
        localStorage.setItem("produit", JSON.stringify(localStorageProduit));
        console.table(localStorageProduit);
        popupDeConfirmation();
    }

}