import { jours } from "./constante.mjs";

let base_url = 'https://data.nantesmetropole.fr'
/**
 * Renvoie tout les composteurs de quartier de Nantes Métropole
 * @returns {Promise<Array<Object>>} Les composteurs
 */
export async function getComposteurs() {
    const composteurs = [];

    const requests = [
        fetch(`${base_url}/api/explore/v2.1/catalog/datasets/512042839_composteurs-quartier-nantes-metropole/records?limit=100&offset=0`),
        fetch(`${base_url}/api/explore/v2.1/catalog/datasets/512042839_composteurs-quartier-nantes-metropole/records?limit=100&offset=100`),
        fetch(`${base_url}/api/explore/v2.1/catalog/datasets/512042839_composteurs-quartier-nantes-metropole/records?limit=100&offset=200`),
        fetch(`${base_url}/api/explore/v2.1/catalog/datasets/512042839_composteurs-quartier-nantes-metropole/records?limit=100&offset=300`)
    ];

    const responses = await Promise.all(requests);

    for (const response of responses) {
        const data = await response.json();
        if (Array.isArray(data.results)) {
            data.results.forEach(composteur => composteurs.push(composteur));
        } else {
            console.error('Les résultats ne sont pas un tableau:', data.results);
        }
    }
    return composteurs; 
}



/**
 * Renvoie les lieux (décheteries ou/et écopoints) de triage demandés par l'utilisateur
 * @param {Array<string>} lieux Les lieux de triage demandés par l'utilisateur
 * @returns La liste des lieux demandés par l'utilisateur
 */
export async function getLieuxTriage(lieux) {
    let result = [];
    for (let lieu of lieux) {

        let lien = `/api/explore/v2.1/catalog/datasets/244400404_decheteries-ecopoints-nantes-metropole/records?where=type%3D%22${lieu}%22&limit=20`

        let response = await fetch(`${base_url}${lien}`);
        let data = await response.json();
        if (Array.isArray(data.results)) {
            data.results.forEach(lieu => result.push(lieu));
        } else {
            console.error('Les résultats ne sont pas un tableau:', data.results);
        }
    }
    return result;

}
/**
 * Renvoie les déchèteries
 * @returns {Promise<Array<Object>>} Les déchèteries
 */
export async function getDecheteries() {
    return await getLieuxTriage(["Déchèterie"]);
}
/**
 * Renvoie les ecopoints
 * @returns {Promise<Array<Object>>} Les ecopoints
 */
export async function getEcopoints() {
    return await getLieuxTriage(["Ecopoint"]);
}
/**
 * Renvoie les déchèteries et les ecopoints
 * @returns {Promise<Array<Object>>} Les déchèteries et les ecopoints
 */
export async function getDecheteriesEtEcopoints() {
    return await getLieuxTriage(["Déchèterie", "Ecopoint"]);
}
/**
 * 
 * @param {Array<string>} dechets Liste des déchets demandés par l'utilisateur 
 * @param {boolean} decheterie Vaut true si l'utilisateur veut des déchèteries
 * @param {boolean} ecopoints Valeur true si l'utilisateur veut des ecopoints
 * @returns 
 */
export async function getDecheteriesEtEcopointsParDechetsPossibles(dechets, decheterie, ecopoints) {
    let lieux = [];
    if (decheterie) {
        lieux.push("Déchèterie");
    }
    if (ecopoints) {
        lieux.push("Ecopoint");
    }

    let decheteriesEtEcopoints = await getLieuxTriage(lieux);

    let lieuxFiltres = decheteriesEtEcopoints.filter(lieu => {
        return dechets.every(dechet => lieu[dechet] === "oui");
    });

    return lieuxFiltres;
}
/**
 * Renvoie les horaires de la déchèterie pour le jour actuel.
 * @param {int} id identifiant de la déchèterie
 * @returns {Promise<Object>} Les horaires de la déchèterie
 */
export async function getHoraireDecheterie(id) {
    let jour = new Date().getDay();
    let date = new Date().toISOString().split('T')[0];

    let link = `/api/explore/v2.1/catalog/datasets/244400404_decheteries-ecopoints-nantes-metropole-horaires/records?where=idobj%3D${id}%20and%20%22${date}%22%3Edate_debut%20and%20%22${date}%22%3Cdate_fin%20and%20jour%3D%22${jours[jour]}%22&limit=20`
    let horaire_actuel = fetch(`${base_url}${link}`)
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data.results)) {
                return data.results[0];
            } else {
                return undefined;
            }
        });
    return horaire_actuel;

}