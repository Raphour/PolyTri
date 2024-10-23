import { getComposteurs, getDecheteries, getDecheteriesEtEcopoints, getDecheteriesEtEcopointsParDechetsPossibles } from "./api.mjs";
import { getComposteurPopUp, getDecheteriePopUp } from "./popup.mjs";
import { markerDecheterie, typeDechetsDecheterie } from "./constante.mjs";
import { formatDechet } from "./utils.mjs";
import { Parameters } from "./Parameters.mjs";
document.addEventListener("DOMContentLoaded", async () => {
    let params = new Parameters();


    // On ajoute le calque permettant d'afficher les images de la carte
    L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", {
        minZoom: 1,
        maxZoom: 20,
        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>'
    }).addTo(params.map);
    //await displayComposteurs(map,true, categorieComposteurs);
    await displayDecheterie(params, true);
    // setupButtonFiltreTypeDechetsDecheterie(categorieDecheteries, map);

    manageFilterButton(params);
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


async function displayComposteurs(params, firstDisplay) {
    // Supprimer les composteurs déjà affichés
    params.groupeComposteurs.clearLayers();
    if (firstDisplay) {
        let composteurs = await getComposteurs();
        composteurs.forEach(composteur => {
            let marker = L.marker([composteur.location.lat, composteur.location.lon]);
            marker.bindPopup(getComposteurPopUp(composteur));
            marker.addTo(params.groupeComposteurs);
        })
    }
    params.groupeComposteurs.addTo(params.map);
}


async function displayDecheterie(params, firstDisplay) {
    params.map.removeLayer(params.groupeToutesDecheteries)
    if (firstDisplay) {

        let decheteries = await getDecheteriesEtEcopoints();
        decheteries.forEach(async (decheterie) => {
            let marker = new markerDecheterie([decheterie.geo_point_2d.lat, decheterie.geo_point_2d.lon],
                {
                    identifiant: decheterie.identifiant,
                    type_dechets_acceptes: typeDechetsDecheterie.filter(dechet => decheterie[dechet] === "oui"),
                    type: decheterie.type
                });
            marker.bindPopup(await getDecheteriePopUp(decheterie),
                {
                    maxWidth: "400px"
                });
            marker.addTo(params.groupeDecheteriesAffichees);
            marker.addTo(params.groupeToutesDecheteries);
        })
    }
    params.groupeDecheteriesAffichees.eachLayer(
        (layer) => {
            console.log(layer.options.identifiant)
        }
    )
    params.groupeDecheteriesAffichees.addTo(params.map);
}



function hideGroup(map, categorie) {
    map.removeLayer(categorie);
}

function showGroup(map, categorie) {
    map.addLayer(categorie);
}

async function manageFilterButton(params) {
    let button = document.getElementById("submit-filter");

    button.addEventListener("click", async () => {
        let decheterie = document.getElementById("checkbox-filtre-decheterie").checked;
        let ecopoints = document.getElementById("checkbox-filtre-ecopoint").checked;
        let composteurs = document.getElementById("checkbox-filtre-composteur").checked;
        if (composteurs) {
            displayComposteurs(params, true);
        } else {
            hideGroup(params.map, params.groupeComposteurs);
        }
        let dechets = typeDechetsDecheterie.filter(dechet => document.getElementById(dechet).checked);
        filterLieux(params, decheterie, ecopoints, dechets);

        displayDecheterie(params, false);
    });
}
function filterLieux(params, decheterie, ecopoints, dechets) {
    // vider le groupdecheteriesaffichees
    params.groupeDecheteriesAffichees.clearLayers()
    params.groupeToutesDecheteries.eachLayer(layer => {
        if (layer.options.type === "Déchèterie" && decheterie || layer.options.type === "Ecopoint" && ecopoints) {
            let dechets_acceptes = layer.options.type_dechets_acceptes;
            let dechet_present = dechets.every(dechet => dechets_acceptes.includes(dechet));
            if (dechet_present) {
                console.log("présent")
                layer.addTo(params.groupeDecheteriesAffichees);
            }
        }
        
    })
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

function setupFilterTypeDechet() {
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
}

