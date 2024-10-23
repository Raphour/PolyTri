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