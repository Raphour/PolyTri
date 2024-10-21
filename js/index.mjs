//Quand tout les elements sont chargés : 
document.addEventListener("DOMContentLoaded", () => {
// On déclare les coordonnées de Nantes
let lat = 47.218371;
let lon = -1.553621;
// On initialise la carte (en lui passant 'map' qui est l'ID de la DIV contenant la carte)
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
});



