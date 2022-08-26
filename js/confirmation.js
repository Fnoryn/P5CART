
// on récupère l'id pour le numéro de commande pour l'afficher dans la page
let commandeId = new URL(window.location.href).searchParams.get("id");
console.log(commandeId)

function confirmation(){
    const numDeCommande = document.querySelector('#orderId');
    numDeCommande.textContent = commandeId;
    localStorage.clear();
}

confirmation();

