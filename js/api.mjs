import { jours } from "./constante.mjs";

let base_url = 'https://data.nantesmetropole.fr'

export async function getComposteurs() {
    const composteurs = [];

    // Liste des requêtes avec les différents offsets
    const requests = [
        fetch(`${base_url}/api/explore/v2.1/catalog/datasets/512042839_composteurs-quartier-nantes-metropole/records?limit=100&offset=0`),
        fetch(`${base_url}/api/explore/v2.1/catalog/datasets/512042839_composteurs-quartier-nantes-metropole/records?limit=100&offset=100`),
        fetch(`${base_url}/api/explore/v2.1/catalog/datasets/512042839_composteurs-quartier-nantes-metropole/records?limit=100&offset=200`),
        fetch(`${base_url}/api/explore/v2.1/catalog/datasets/512042839_composteurs-quartier-nantes-metropole/records?limit=100&offset=300`)
    ];

    // Attendre que toutes les requêtes soient terminées
    const responses = await Promise.all(requests);

    // Traiter chaque réponse
    for (const response of responses) {
        const data = await response.json();
        if (Array.isArray(data.results)) {
            data.results.forEach(composteur => composteurs.push(composteur));
        } else {
            console.error('Les résultats ne sont pas un tableau:', data.results);
        }
    }


    return composteurs; // Retourner les composteurs une fois que tout est terminé
}




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

export async function getDecheteries() {
    return await getLieuxTriage(["Déchèterie"]);
}

export async function getEcopoints() {
    return await getLieuxTriage(["Ecopoint"]);
}

export async function getDecheteriesEtEcopoints() {
    return await getLieuxTriage(["Déchèterie", "Ecopoint"]);
}
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

export async function getHoraireDecheterie(id) {
    // Jour de la semaine
    let jour = new Date().getDay();
    let heure_minute = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    // date sous le format YYYY-MM-DD
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