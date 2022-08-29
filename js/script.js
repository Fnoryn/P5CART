//récupération des produits de l'api
async function appelDesProduits() {
    await fetch("http://localhost:3000/api/products")
        .then((response) => response.json())
        .then((data) => {
            {
                afficherProduit(data);
            }
        })
}

// appel de la fonction pour récuper les produits
appelDesProduits();

// fonction pour afficher les produits
function afficherProduit(produits) {
    table(produits);
    let itemKanap = document.querySelector('#items');
    for (let produit of produits) {
        (produit.name)
        creationProduit(produit, itemKanap);
    }
}

//fonction pour créé le html
function creationProduit(articleKanap, item) {
    //création du lien du produit
    const lienarticle = document.createElement("a");
    lienarticle.href = `./product.html?id=${articleKanap._id}`;

    //création de la balise article
    const article = document.createElement("article");
    lienarticle.appendChild(article); //fait en sorte que article soit compris dans les liens
    item.appendChild(lienarticle);

    // création de la balise img
    const img = document.createElement("img");
    img.src = `${articleKanap.imageUrl}`;
    img.alt = `${articleKanap.altTxt}`;
    article.appendChild(img); // fait en sorte qu'img soit dans la balise article

    //création de la balise h3
    const nom = document.createElement("h3");
    nom.textContent = `${articleKanap.name}`;
    article.appendChild(nom); // fait en sorte que h3 soit dans la balise article

    //crétation de la balise p
    const description = document.createElement("p");
    description.textContent = `${articleKanap.description}`;
    article.appendChild(description); // fait en sorte que p soit dans la balise article
}