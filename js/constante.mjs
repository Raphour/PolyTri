export let typeDechetsDecheterie = ["bois", "carton", "deee", "pneus", "verre", "mobilier", "extincteur", "batterie", "gravat", "encombrant", "ferraille", "huile_moteur", "papier", "placoplatre", "textile", "dechet_vert", "pile", "cartouche", "neon", "dechet_dangereux", "bouteille_gaz", "polystyrene"];
export let typeLieuTriage = ["composteur", "decheterie"];
export let jours = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
export let formatageTypeDechet = {
    "bois": "Bois",
    "carton": "Carton",
    "deee": "DEEE",
    "pneus": "Pneus",
    "verre": "Verre",
    "mobilier": "Mobilier",
    "extincteur": "Extincteur",
    "batterie": "Batterie",
    "gravat": "Gravat",
    "encombrant": "Encombrant",
    "ferraille": "Ferraille",
    "huile_moteur": "Huile moteur",
    "papier": "Papier",
    "placoplatre": "Placoplatre",
    "textile": "Textile",
    "dechet_vert": "Déchet vert",
    "pile": "Pile",
    "cartouche": "Cartouche",
    "neon": "Néon",
    "dechet_dangereux": "Déchets dangereux",
    "bouteille_gaz": "Bouteille de gaz",
    "polystyrene": "Polystyrène"
}
export let markerDecheterie = L.Marker.extend({
    options:{
        identifiant:0,
        type_dechets_acceptes:[],
        type:""
    }
});


export var greenIcon = new L.Icon({
    iconUrl: 'assets/green_marker.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  export var brownIcon = new L.Icon({
    iconUrl: 'assets/brown_marker.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  export var blueIcon = new L.Icon({
    iconUrl: 'assets/blue_marker.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });