export class Parameters {
    groupeToutesDecheteries = new L.LayerGroup();
    groupeDecheteriesAffichees = new L.LayerGroup();
    groupeComposteurs =new  L.LayerGroup();
    map = L.map("map", {
        zoom: 13,
        center: [47.218371, -1.553621]
    });
}