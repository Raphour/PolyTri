
export function formatDechet(dechet) {
    let correspondances = {
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
        "dechet_dangereux": "Déchet dangereux",
        "bouteille_gaz": "Bouteille de gaz",
        "polystyrene": "Polystyrène"
    }
    return correspondances[dechet];
}