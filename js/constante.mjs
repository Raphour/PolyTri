export let typeDechetsDecheterie = ["bois", "carton", "deee", "pneus", "verre", "mobilier", "extincteur", "batterie", "gravat", "encombrant", "ferraille", "huile_moteur", "papier", "placoplatre", "textile", "dechet_vert", "pile", "cartouche", "neon", "dechet_dangereux", "bouteille_gaz", "polystyrene"];
export let typeLieuTriage = ["composteur", "decheterie"];
export let jours = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
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