import DeepSolver from "./modules/DeepSolver";
import GSolver from "./modules/GSolver";
import Problema from "./modules/Problema";
import "./support/helpers";



class ProblemaDual {
    constructor(problemaDual) {
        const { objetivo, restricoes, rhsRestricoes, variaveis } = problemaDual;
        this.objetivo = objetivo;
        this.restricoes = restricoes;
        this.rhsRestricoes = rhsRestricoes;
        this.variaveis = variaveis;
    }

    /**
     * Transpõe e inverte o problema explicitamete
     * para o dual simplex
     * @param {Problema} problema 
     */
    static preparar(problema) {
        const inverterCoefs = problema.tipo != 'Minimizar';
        let indiceArtificial = problema.restricoes
            .reduce((acc, restricao) => Math.max(acc, (restricao.coef ?? []).length), 0);

        // Montar forma dual
        let coeficientesDuais = [];
        let restricoesDuais = Array.from({ length: indiceArtificial }, () => []);
        let variaveisDuais = [];
        let rhsDual = [...problema.coeficientes].map((val) => val * -1);
        let indexDiff = 0;

        for (let i in problema.restricoes) {
            const restricao = problema.restricoes[i];
            const multiplicador = restricao.operator == '>=' ? (-1) : 1;
            i = Number.parseInt(i);
            coeficientesDuais.push((inverterCoefs ? (-1) : 1) * multiplicador * restricao.rhs);
            variaveisDuais.push({
                variavel: `y${i + 1}`,
                indice: i + indexDiff,
                tipo: 'variavel'
            });
            for (const j in restricao.coef) {
                restricoesDuais[j][i + indexDiff] = (0 - multiplicador) * restricao.coef[j];
            }
            if (restricao.operator == '=') {
                indexDiff++;
                variaveisDuais.push({
                    variavel: `y${i + 1}"`,
                    indice: i + indexDiff,
                    tipo: 'espelho'
                });
                coeficientesDuais.push((0 - multiplicador) * restricao.rhs)
            }
        }
        // Preparando para algoritmo
        // Preenchendo variáveis com igualdade
        for (const i in variaveisDuais) {
            const variavel = variaveisDuais[i];
            if (variavel.tipo == 'espelho') {
                for (const j in restricoesDuais) {
                    restricoesDuais[j][variavel.indice] = 0 - restricoesDuais[j][variavel.indice - 1];
                }
            }
        }
        // Adicionando variáveis de folga
        const colLength = restricoesDuais[0].length;
        const contVariaveisFolga = restricoesDuais.length;
        for (let i = 0; i <= contVariaveisFolga - 1; i++) {
            restricoesDuais[i] = restricoesDuais[i] = fillArrayEnd(restricoesDuais[i], contVariaveisFolga);
            restricoesDuais[i][colLength + i] = 1;
            coeficientesDuais.push(0);
            variaveisDuais.push({
                variavel: `s${i + 1}"`,
                indice: i,
                tipo: 'folga'
            });
        }
        // 0 do RHS
        coeficientesDuais.push(0);

        return {
            objetivo: coeficientesDuais,
            restricoes: restricoesDuais,
            rhsRestricoes: rhsDual,
            variaveis: variaveisDuais
        };
    }

    static current() {
        const problema = Problema.current();
        return new ProblemaDual(this.preparar(problema));
    }

    tabela()
    {
        let tabela = this.restricoes.map((linha) => [...linha]);
        for(const i in tabela) {
            tabela[i].push(this.rhsRestricoes[i]);
        }
        tabela.push([...this.objetivo]);
        return tabela;
    }
}


class DualSimplexSolver {
    constructor(problemaDual)
    {
        this.problema = problemaDual;
        this.tabela = problemaDual.tabela();
    }

    static current()
    {
        return (new DualSimplexSolver(ProblemaDual.current()));
    }
}

$(() => {
    // const solver = DualSimplexSolver.current();
    // console.log(solver);
    
    const initialTableau = ProblemaDual.current().tabela();
    console.log(initialTableau);
    
    const deepSolver = new DeepSolver(initialTableau);
    deepSolver.solve();

    // const gSolver = new GSolver(initialTableau, ["y1", "y2+", "y2-", "y3'", "s1", "s2", "RHS"], ["s1", "s2", "Z"])
    // gSolver.solve();
    
});

// $(() => {
//     (new DeepSolver()).solve()
// })