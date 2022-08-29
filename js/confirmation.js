// on récupère l'id pour le numéro de commande pour l'afficher dans la page
let commandeId = new URL(window.location.href).searchParams.get("id");
(commandeId)
//fonction qui affiche la confimation de commande avec le numéro de commande
function confirmation() {
    const numDeCommande = document.querySelector('#orderId');
    numDeCommande.textContent = commandeId;
    localStorage.clear();
}

confirmation();