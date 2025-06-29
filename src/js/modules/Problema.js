class Problema
{
    constructor(tipo, coeficientes, restricoes) {
        this.tipo = tipo;
        this.coeficientes = coeficientes;
        this.restricoes = restricoes;
    }

    /**
     * Retorna o problema armazenado no storage
     * @returns {Problema}
     */
    static current() {
        const tipoObjetivo = localStorage.getItem('tipoObjetivo');
        const coefObjetivo = JSON.parse(localStorage.getItem('coefObjetivo'));
        const restricoes = JSON.parse(localStorage.getItem('restricoes'));  

        if (!tipoObjetivo || !coefObjetivo || !restricoes) {
            alert("Dados incompletos no localStorage. Certifique-se de definir o problema de programação linear antes de acessar esta página.");
            return;
        }

        return new Problema(tipoObjetivo, coefObjetivo, restricoes);
    }
}

export default Problema;