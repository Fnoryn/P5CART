let commandeId = new URL(window.location.href).searchParams.get("id");
console.log(commandeId)

function confirmation(){
    const numDeCommande = document.querySelector('#orderId');
    numDeCommande.textContent = commandeId;
    localStorage.clear();
}

confirmation();

