import { getComposteurs, getDecheteries } from "./api.mjs";
import { getComposteurPopUp, getDecheteriePopUp } from "./popup.mjs";
document.addEventListener("DOMContentLoaded", async () => {
    let lat = 47.218371;
    let lon = -1.553621;

    let map = L.map("map", {
        zoom: 13,
        center: [lat, lon]
    });

    let categorieComposteurs = L.layerGroup();  
    let categorieDecheteries = L.layerGroup();
    // On ajoute le calque permettant d'afficher les images de la carte
    L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", {
        minZoom: 1,
        maxZoom: 20,
        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>'
    }).addTo(map);
    //await displayComposteurs(map,true, categorieComposteurs);
    await displayDecheterie(map, true, categorieDecheteries);


});


async function displayComposteurs(map, firstDisplay, categorieComposteurs) {
    // On récupère les composteurs
    if (firstDisplay) {
        let composteurs = await getComposteurs();

        // On affiche les composteurs sur la carte
        composteurs.forEach(composteur => {
            let marker = L.marker([composteur.location.lat, composteur.location.lon]);
            marker.bindPopup(getComposteurPopUp(composteur));
            marker.addTo(categorieComposteurs);
        })
    }
    categorieComposteurs.addTo(map);
}

function hideComposteurs(map, categorieComposteurs) {
    map.removeLayer(categorieComposteurs);
}


async function displayDecheterie(map, firstDisplay, categorieDecheteries) {
    if (firstDisplay) {
        let decheteries = await getDecheteries();
        decheteries.forEach(decheterie => {
            let marker = L.marker([decheterie.geo_point_2d.lat, decheterie.geo_point_2d.lon]);
            marker.bindPopup(getDecheteriePopUp(decheterie));
            marker.addTo(categorieDecheteries);
        })
    }
    categorieDecheteries.addTo(map);
}



function hideDecheteries(map, categorieDecheteries) {
    map.removeLayer(categorieDecheteries);
}

