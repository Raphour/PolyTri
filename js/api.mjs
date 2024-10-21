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