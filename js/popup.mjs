import { formatDechet } from "./utils.mjs";
import { typeDechetsDecheterie } from "./constante.mjs";

export function getComposteurPopUp(composteur) {
    console.log(composteur.location.lat);
    return `<h2>${composteur.nom}</h2>
        <p>${composteur.categorie}</p>
        <a href="https://www.google.com/maps/search/?api=1&query=${composteur.location.lat}%2C${composteur.location.lon}" target ="_blank">Adresse : ${composteur.adresse}</p>
        <a href="${composteur.lien}" target="_blank">Plus d'informations</a>`
}



export function getDecheteriePopUp(decheterie) {
    let type_dechets = typeDechetsDecheterie;
    let dechets = type_dechets.map(dechet => {
        if (decheterie[dechet] === "oui") {
            return `<div class="type-dechet-icone-popup-container"><img class="dechet-popup-icon" src="assets/type_dechet_oui.png" alt="tick" title="Accepté"> ${formatDechet(dechet)}</div>`
        } else {
            return `<div class="type-dechet-icone-popup-container"><img class="dechet-popup-icon" src="assets/type_dechet_non.png" alt="cross" title="Non accepté"> ${formatDechet(dechet)}</div>`
        }
    })

    return `
    <div class="popup-container">
        <h3>${decheterie.type}</h3>  
        <h2>${decheterie.nom}</h2>
        <a href="https://www.google.com/maps/search/?api=1&query=${decheterie.geo_point_2d.lat}%2C${decheterie.geo_point_2d.lon}" target ="_blank">Adresse : ${decheterie.adresse}</a>
        <h3>Déchets acceptés :</h3>
        <div class="type-dechets-grid-container">${dechets.join('')}</div>
    </div>
        `
}