import { getComposteurs, getDecheteries, getDecheteriesEtEcopoints, getDecheteriesEtEcopointsParDechetsPossibles } from "./api.mjs";
import { getComposteurPopUp, getDecheteriePopUp } from "./popup.mjs";
import { typeDechetsDecheterie } from "./constante.mjs";
import { formatDechet } from "./utils.mjs";
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
    // setupButtonFiltreTypeDechetsDecheterie(categorieDecheteries, map);

    manageFilterButton(map, categorieDecheteries, categorieComposteurs);
    manageSwitchCheckboxLieu();
    // On rempli le type-dechets-filter-container avec les types de déchets
    let type_dechets_filter_container = document.getElementById("type-dechets-filter-container");
    typeDechetsDecheterie.forEach(dechet => {
        let type_container = document.createElement("div");
        type_container.setAttribute("class", "type-dechet-container");
        let checkbox = document.createElement("input");
        checkbox.setAttribute("class", "type-dechet-checkbox");
        checkbox.type = "checkbox";
        checkbox.id = dechet;
        checkbox.checked = false;
        let label = document.createElement("label");
        label.htmlFor = dechet;
        label.innerText = formatDechet(dechet);
        type_container.appendChild(checkbox);
        type_container.appendChild(label);
        type_dechets_filter_container.appendChild(type_container);
    });

});


async function displayComposteurs(map, firstDisplay, categorieComposteurs) {
    // Supprimer les composteurs déjà affichés
    categorieComposteurs.clearLayers();
    if (firstDisplay) {
        let composteurs = await getComposteurs();
        composteurs.forEach(composteur => {
            let marker = L.marker([composteur.location.lat, composteur.location.lon]);
            marker.bindPopup(getComposteurPopUp(composteur));
            marker.addTo(categorieComposteurs);
        })
    }
    categorieComposteurs.addTo(map);
}


async function displayDecheterie(map, firstDisplay, categorieDecheteries) {
    if (firstDisplay) {
        let decheteries = await getDecheteriesEtEcopoints();
        decheteries.forEach(decheterie => {
            let marker = L.marker([decheterie.geo_point_2d.lat, decheterie.geo_point_2d.lon]);
            marker.bindPopup(getDecheteriePopUp(decheterie),
                {
                    maxWidth: "400px"
                });
            marker.addTo(categorieDecheteries);
        })
    }
    categorieDecheteries.addTo(map);
}



function hideGroup(map, categorie) {
    map.removeLayer(categorie);
}

function showGroup(map, categorie) {
    map.addLayer(categorie);
}

async function manageFilterButton(map, categorieDecheteries, categorieComposteurs) {
    let button = document.getElementById("submit-filter");

    button.addEventListener("click", async () => {
        let decheterie = document.getElementById("checkbox-filtre-decheterie").checked;
        let ecopoints = document.getElementById("checkbox-filtre-ecopoint").checked;
        let composteurs = document.getElementById("checkbox-filtre-composteur").checked;
        if (composteurs) {
            displayComposteurs(map, true, categorieComposteurs);
        } else {
            hideGroup(map, categorieComposteurs);
        }
        let dechets = typeDechetsDecheterie.filter(dechet => document.getElementById(dechet).checked);
        let lieux = await getDecheteriesEtEcopointsParDechetsPossibles(dechets, decheterie, ecopoints);
        categorieDecheteries.clearLayers();
        lieux.forEach(lieu => {
            let marker = L.marker([lieu.geo_point_2d.lat, lieu.geo_point_2d.lon]);
            marker.bindPopup(getDecheteriePopUp(lieu));
            marker.addTo(categorieDecheteries);
        });
        displayDecheterie(map, false, categorieDecheteries);
    });
}


function manageSwitchCheckboxLieu() {
    let checkbox_decheterie = document.getElementById("checkbox-filtre-decheterie");
    let checkbox_ecopoint = document.getElementById("checkbox-filtre-ecopoint");
    checkbox_decheterie.addEventListener("change", (event) => {
        if (!event.target.checked && !checkbox_ecopoint.checked) {
            disableFiltreTypeDechet();
        } else {
            enableFiltreTypeDechet();
        }
    });
    checkbox_ecopoint.addEventListener("change", (event) => {
        if (!event.target.checked && !checkbox_decheterie.checked) {
            disableFiltreTypeDechet();
        } else {
            enableFiltreTypeDechet();
        }
    });
}

function disableFiltreTypeDechet() {
    let type_dechets = document.getElementsByClassName("type-dechet-checkbox");
    for (let type_dechet of type_dechets) {
        type_dechet.disabled = true;
    }
    let typeDechetsContainer = document.getElementById("type-dechets-filter-container");
    typeDechetsContainer.style.opacity = "0.5";
}

function enableFiltreTypeDechet() {
    let type_dechets = document.getElementsByClassName("type-dechet-checkbox");
    for (let type_dechet of type_dechets) {
        type_dechet.disabled = false;
    }
    let typeDechetsContainer = document.getElementById("type-dechets-filter-container");
    typeDechetsContainer.style.opacity = "1";
}

