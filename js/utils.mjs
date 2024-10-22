
function upperCaseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatDechet(dechet) {
    return upperCaseFirstLetter(dechet.replace("_", " "));
}