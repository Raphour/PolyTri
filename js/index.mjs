import { getComposteurs } from "./api.mjs";

document.addEventListener("DOMContentLoaded", async () => {
let lat = 47.218371;
let lon = -1.553621;

let map = L.map("map", {
    zoom: 13,
    center: [lat, lon]
});

// On ajoute le calque permettant d'afficher les images de la carte
L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", {
    minZoom: 1,
    maxZoom: 20,
    attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>'
}).addTo(map);

// On récupère les composteurs
let composteurs = await getComposteurs();
// On affiche les composteurs sur la carte
composteurs.forEach(composteur => {
    let marker = L.marker([composteur.location.lat, composteur.location.lon]);
    marker.bindPopup(`<h2>${composteur.nom}</h2><p>${composteur.adresse}</p>`);
    marker.addTo(map);
}) 
});

