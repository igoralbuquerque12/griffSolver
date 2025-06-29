import Problema from "./modules/Problema";
import "./support/helpers";

class ProblemaDual
{
    constructor(problemaDual)
    {

    }

    /**
     * Transpõe e inverte o problema explicitamete
     * para o dual simplex
     * @param {Problema} problema 
     */
    static preparar(problema)
    {
        // const tipo = 'min';
        // let coeficientesIniciais = [...problema.coeficientes];
        // if(problema.tipo != 'Minimizar') {
        //     coeficientesIniciais = coeficientesIniciais.map((val) => (0 - val));
        // }
        console.log(problema);
        
        const inverterCoefs = problema.tipo != 'Minimizar';
        let indiceArtificial = problema.restricoes
            .reduce((acc, restricao) => Math.max(acc, (restricao.coef ?? []).length), 0);

        // Montar forma dual
        let coeficientesDuais = [];
        let restricoesDuais = Array.from({ length: indiceArtificial }, () => []);
        let variaveisDuais = [];
        let rhsDual = [...problema.coeficientes];
        
        for(const i in problema.restricoes) {
            const restricao = problema.restricoes[i];
            coeficientesDuais.push(inverterCoefs ? (0 - restricao.rhs) : restricao.rhs);
            variaveisDuais.push(restricao.operator);
            for(const j in restricao.coef) {
                restricoesDuais[j][i] = 0 - restricao.coef[j];
            }
        }
        
        // Preparar para algoritmo dual
        
    }

    static current()
    {
        const problema = Problema.current();
        return new ProblemaDual(this.preparar(problema));
    }
}


class DualSimplex
{

}

$(() => {
    ProblemaDual.current();
});