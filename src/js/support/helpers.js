// Definições das constantes

// Variável grande de inviabilidade
window.M = 10000;

window.padArrayEnd = function (arr, targetLength, padValue = 0) {
    return arr.concat(Array(Math.max(0, targetLength - arr.length)).fill(padValue));
}

window.fillArrayEnd = function (arr, count, padValue = 0) {
    return arr.concat(Array(Math.max(0, count)).fill(padValue));
}