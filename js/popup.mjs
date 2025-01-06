import { typeDechetsDecheterie,formatageTypeDechet } from "./constante.mjs";
import { getHoraireDecheterie } from "./api.mjs";

/**
 * Renvoie le contenu du popup pour un composteur donné.
 * @param {Object} composteur 
 * @returns {Promise<string>} Le contenu de la popup au format HTML.
 */
export function getComposteurPopUp(composteur) {
    return `<h2>${composteur.nom}</h2>
        <p>${composteur.categorie}</p>
        <a href="https://www.google.com/maps/search/?api=1&query=${composteur.location.lat}%2C${composteur.location.lon}" target ="_blank">Adresse : ${composteur.adresse}</p>
        <a href="${composteur.lien}" target="_blank">Plus d'informations</a>`
}

/**
 * Renvoi le contenu du popup pour une déchèterie donnée.
 * @param {Object} decheterie - L'objet déchèterie.
 * @returns {Promise<string>} Le contenu de la popup au format HTML.
 */
export async function getDecheteriePopUp(decheterie) {
    let type_dechets = typeDechetsDecheterie;
    let dechets = type_dechets.map(dechet => {
        if (decheterie[dechet] === "oui") {
            return `<div class="type-dechet-icone-popup-container"><img class="dechet-popup-icon" src="assets/type_dechet_oui.png" alt="tick" title="Accepté"> ${formatageTypeDechet[dechet]}</div>`
        } else {
            return `<div class="type-dechet-icone-popup-container"><img class="dechet-popup-icon" src="assets/type_dechet_non.png" alt="cross" title="Non accepté"> ${formatageTypeDechet[dechet]}</div>`
        }
    })
    return `    
    <div class="popup-container">
        <h3>${decheterie.type}</h3>  
        <h2>${decheterie.nom}</h2>
        ${await getHoraireContent(decheterie.identifiant)}
        <a href="https://www.google.com/maps/search/?api=1&query=${decheterie.geo_point_2d.lat}%2C${decheterie.geo_point_2d.lon}" target ="_blank">Adresse : ${decheterie.adresse}</a>
        <h3>Déchets acceptés :</h3>
        <div class="type-dechets-grid-container">${dechets.join('')}</div>
    </div>
        `
}


/**
 * Récupère le contenu horaire pour une déchèterie donnée.
 * 
 * @param {string} id - L'identifiant de la déchèterie.
 * @returns {Promise<string>} Le contenu horaire au format HTML.
 */
export async function getHoraireContent(id) {
    let horaire_actuel = await getHoraireDecheterie(id);
    if (horaire_actuel === undefined) {
        return `<div class="horaire_popup_container"> <img class="icon_horaire" src="assets/horaire_inconnu.png" alt="red_clock"> Horaire non disponible</div>`;
    }
    if (horaire_actuel.date_exception != null && horaire_actuel.type_horaire === "Fermeture") {
        return `<div class="horaire_popup_container"> <img class="icon_horaire" src="assets/red_clock.png" alt="red_clock"> Fermé(e) exceptionnellement</div>`;
    }

    let heure_fermeture = horaire_actuel.heure_fin;
    let horaire_ouverture = horaire_actuel.heure_debut;
    console.log(horaire_ouverture);
    console.log(heure_fermeture);
    let heure_actuelle = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

    if (horaire_actuel.date_exception != null && horaire_actuel.type_horaire === "Ouverture" && heure_actuelle > horaire_ouverture && heure_actuelle < heure_fermeture) {
        return `<div class="horaire_popup_container"> <img class="icon_horaire" src="assets/green_clock.png" alt="green_clock"> Ouvert(e) exceptionnellement de ${horaire_ouverture} à ${heure_fermeture}</div>`;
    }
    if (heure_actuelle > heure_fermeture) {
        return `<div class="horaire_popup_container"> <img class="icon_horaire" src="assets/red_clock.png" alt="red_clock"> Fermé(e)</div>`;
    }
    if (heure_actuelle < horaire_ouverture) {
        return `<div class="horaire_popup_container"> <img class="icon_horaire" src="assets/orange_clock.png" alt="green_clock"> Ouvre aujourd'hui de ${horaire_ouverture} à ${heure_fermeture}</div>`;
    }
    return `<div class="horaire_popup_container"> <img class="icon_horaire" src="assets/green_clock.png" alt="green_clock"> Ouvert aujourd'hui de ${horaire_ouverture} à ${heure_fermeture}</div>`;

}