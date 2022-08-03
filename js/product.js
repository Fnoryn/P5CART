//on récupère l'id du produit via l'url pour correctement afficher les détail du produit
let produitId = new URL(window.location.href).searchParams.get("id");
console.log(produitId);

//récupération des produits de l'api
async function appelDesProduits(){
    await fetch("http://localhost:3000/api/products/" + produitId)
    .then((response) => response.json())
    .then((data) => {{
        afficherProduit(data);
    }})
}

// appel de la fonction pour récuper les produits
appelDesProduits();


// fonction pour l'affichage des produit
function afficherProduit(articleKanap){
    console.table(articleKanap);
    //affichage de l'image du produit
    const imgProduit = document.createElement("img");
    imgProduit.src = `${articleKanap.imageUrl}`;
    imgProduit.alt = `${articleKanap.altTxt}`;
    document.querySelector('article div.item__img')
            .appendChild(imgProduit);// fait en sorte que la balise img soit dans la div .item__img

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
    for (let couleurs of articleKanap.colors){
        console.table(couleurs);

        //crée l'élément html option
        let couleursProduit = document.createElement("option");
        document.querySelector('#colors')// on séléctionne le bonne parti du code
                .appendChild(couleursProduit);// on fait en sorte que couleurProduit soit dans #colors
        couleursProduit.value = couleurs;
        couleursProduit.text = couleurs;
    }
}

function ajoutProduitPannier(produitKanap){
    
}

function controleQuantiter(test){
    if(test.value< 1 || test.value > 100){
        alert("vous devez entré une valeurs entre 1 et 100");
        return false;
    }
    return true;
}

function controleCouleurs(test){
    if(test.value === ""){
        alert("vous devez choisir une couleur");
        return false;
    }
    return true;
}



function btnAjoutProduit(){
    let btnAddToCart = document.querySelector('#addToCart');
    btnAddToCart.addEventListener("click", (event) => {
        let quantiterProduit = document.querySelector('#quantity');
        let couleur = document.querySelector('#colors');
        if (controleQuantiter(quantiterProduit) && (controleCouleurs(couleur))){
            alert("tout es bon");
        }
    });
}

function btnQuantiter(){
    let btnQuantiter = document.querySelector('#quantity');
    btnQuantiter.addEventListener("change", (event) => {
        controleQuantiter(event.target);
    })
}

btnQuantiter();
btnAjoutProduit();