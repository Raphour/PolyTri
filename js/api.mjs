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


    console.log(composteurs); // Composteurs est maintenant rempli
    return composteurs; // Retourner les composteurs une fois que tout est terminé
}

export async function getDecheteries() {
    let lien = '/api/explore/v2.1/catalog/datasets/244400404_decheteries-ecopoints-nantes-metropole/records?limit=20'


    const decheteries = [];

    // Une seule requete est nécessaire ici

    const response = await fetch(`${base_url}${lien}`);
    const data = await response.json();
    if (Array.isArray(data.results)) {
        data.results.forEach(decheterie => decheteries.push(decheterie));
    } else {
        console.error('Les résultats ne sont pas un tableau:', data.results);
    }

    console.log(decheteries); // Decheteries est maintenant rempli

    return decheteries; // Retourner les decheteries une fois que tout est terminé

}


async function getDecheteriesParDechetsPossibles(dechets){
    // On récupère les décheteries
    let decheteries = await getDecheteries();

    // On filtre les décheteries en fonction des déchets possibles
    let decheteriesFiltrees = decheteries.filter(decheterie => {
        return dechets.every(dechet => decheterie[dechet] === "oui");
    });

    return decheteriesFiltrees;
}