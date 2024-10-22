
export function getComposteurPopUp(composteur) {
    console.log(composteur.location.lat);
    return `<h2>${composteur.nom}</h2>
        <p>${composteur.categorie}</p>
        <a href="https://www.google.com/maps/search/?api=1&query=${composteur.location.lat}%2C${composteur.location.lon}" target ="_blank">Adresse : ${composteur.adresse}</p>
        <a href="${composteur.lien}" target="_blank">Plus d'informations</a>`
}



export function getDecheteriePopUp(decheterie) {
    // "identifiant":3144,
    // "nom":"Déchèterie de Saint Aignan Grand Lieu",
    // "type":"Déchèterie",
    // "code_postal":"44860",
    // "commune":"Saint-Aignan-Grandlieu",
    // "adresse":"Route de la Forêt",
    // "bois":"oui",
    // "carton":"oui",
    // "deee":"oui",
    // "pneus":"non",
    // "verre":"oui",
    // "mobilier":"non",
    // "extincteur":"non",
    // "batterie":"oui",
    // "gravat":"oui",
    // "encombrant":"oui",
    // "ferraille":"oui",
    // "huile_moteur":"oui",
    // "papier":"oui",
    // "placoplatre":"oui",
    // "textile":"non",
    // "dechet_vert":"oui",
    // "pile":"non",
    // "cartouche":"oui",
    // "neon":"non",
    // "dechet_dangereux":"oui",
    // "bouteille_gaz":"non",
    // "polystyrene":"non",
    // "huile_alimentaire":null,
    // "ressourcerie":"oui",
    // "horaire_ressourcerie":"Lu ma me ve sa 10h à 17h45",
    // "geo_point_2d":{
    // "lon":-1.6236670419276427,
    // "lat":47.14954639795539
    // On affiche les icones en fonction des déchets acceptés, pour chaque icone lorsquon la survole on a un petit texte qui apparait
    let type_dechets = ["bois", "carton", "deee", "pneus", "verre", "mobilier", "extincteur", "batterie", "gravat", "encombrant", "ferraille", "huile_moteur", "papier", "placoplatre", "textile", "dechet_vert", "pile", "cartouche", "neon", "dechet_dangereux", "bouteille_gaz", "polystyrene"];

    let dechets = type_dechets.map(dechet => {
        if (decheterie[dechet] === "oui") {
            return `<div><img class="dechet-popup-icon" src="assets/type_dechet_oui.png" alt="tick" title="Accepté"> ${dechet.replace("_"," ")}</div>`
        } else {
            return `<div><img class="dechet-popup-icon" src="assets/type_dechet_non.png" alt="cross" title="Non accepté"> ${dechet.replace("_"," ") }</div>`
        }
    })

    return `
        <h3>${decheterie.type}</h3>  
        <h2>${decheterie.nom}</h2>
        <a href="https://www.google.com/maps/search/?api=1&query=${decheterie.geo_point_2d.lat}%2C${decheterie.geo_point_2d.lon}" target ="_blank">Adresse : ${decheterie.adresse}</a>

        <h3>Déchets acceptés :</h3>
        <div>${dechets.join('')}</div>

        `



}