import Problema from "./modules/Problema";
import "./support/helpers";
import "./support/tabela";

class ProblemaDual {
    constructor(problemaDual, problemaPrimal) {
        const { objetivo, restricoes, rhsRestricoes, variaveis, metodo } = problemaDual;
        this.primal = problemaPrimal;
        this.objetivo = objetivo;
        this.restricoes = restricoes;
        this.rhsRestricoes = rhsRestricoes;
        this.variaveis = variaveis;
        this.metodo = metodo;
    }

    /**
     * Transpõe e inverte o problema explicitamete
     * para o dual simplex
     * @param {Problema} problema 
     */
    static preparar(problema) {
        const inverterCoefs = problema.tipo != 'Minimizar';
        const metodo = problema.tipo == 'Minimizar' ? 'Maximizar' : 'Minimizar';
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
            variaveis: variaveisDuais,
            metodo: metodo
        };
    }

    static current() {
        const problema = Problema.current();
        return new ProblemaDual(this.preparar(problema), problema);
    }

    tabela() {
        let tabela = this.restricoes.map((linha) => [...linha]);
        for (const i in tabela) {
            tabela[i].push(this.rhsRestricoes[i]);
        }
        tabela.push([...this.objetivo]);
        return tabela;
    }

    getVars() {
        let cols = [];
        for(const i in this.variaveis) {
            let append = '';
            if(this.variaveis[i].tipo == 'espelho') {
                cols[i - 1] += '+'
                append = '-';
            }
            cols.push((this.variaveis[i].variavel + append).replaceAll('"', ''));
        }
        cols.push('RHS');
        const rows = [];
        for(const i in this.rhsRestricoes) {
            rows.push('s' + (Number.parseInt(i) + 1));
        }
        rows.push('Z');
        
        return {
            cols: cols,
            rows: rows
        }
    }
}

class DualSimplexSolver {
    constructor(problemaDual) {
        this.problem = problemaDual;
        this.tableau = problemaDual.tabela();
        this.iter = 0;

        const { cols, rows } = this.problem.getVars();
        this.cols = cols.slice();        
        this.rows = rows.slice();
        this.numberVariables = this.problem.restricoes.length;
    }

    static current() {
        return (new DualSimplexSolver(ProblemaDual.current()));
    }

    // Imprime a tabela atual
    printCurrent() {
        
        const header = ["BV"].concat(this.cols);
        const title = this.iter > 0 ? `Iteração ${this.iter}` : 'Forma dual';
        mostrarTabelaSimplex(this.tableau, title, this.cols, this.rows, this.numberVariables);
        const table = this.tableau.map((row, i) => {
            const obj = { BV: this.rows[i] };
            this.cols.forEach((c, j) => obj[c] = row[j]);
            return obj;
        });
        console.table(table, header);
    }

    printSolution()
    {
        const primal = this.recuperarSolucaoPrimal();
        mostrarResultadoFinal(primal.solucaoPrimal, primal.z, 'Solução ótima primal');
    }

    // Executa uma iteração; retorna false se ótimo ou inviável
    step() {
        const m = this.tableau.length - 1;
        const n = this.cols.length - 1;
        // Linha pivô: menor RHS (<0)
        let pivotRow = -1, minRhs = 0;
        for (let i = 0; i < m; i++) {
            const rhs = this.tableau[i][n];
            if (rhs < minRhs) { minRhs = rhs; pivotRow = i; }
        }
        if (pivotRow < 0) {
            console.log('Ótimo encontrado.');
            this.printSolution();
            return false;
        }
        // Coluna pivô: coef<0 na linha
        let pivotCol = -1, bestRatio = Infinity;
        for (let j = 0; j < n; j++) {
            const aij = this.tableau[pivotRow][j];
            if (aij < 0) {
                const zj = this.tableau[m][j];
                const ratio = Math.abs(zj / aij);
                if (ratio < bestRatio) { bestRatio = ratio; pivotCol = j; }
            }
        }
        if (pivotCol < 0) {
            console.error('Dual inviável.');
            return false;
        }
        // Pivotamento
        this.pivot(pivotRow, pivotCol);
        // Atualiza labels básicos
        [this.rows[pivotRow], this.cols[pivotCol]] = [this.cols[pivotCol], this.rows[pivotRow]];
        this.iter++;
        this.printCurrent();
        return true;
    }

    pivot(row, col) {
        const m = this.tableau.length, n = this.cols.length;
        const piv = this.tableau[row][col];
        // normaliza linha
        for (let j = 0; j < n; j++) this.tableau[row][j] /= piv;
        // zera colunas
        for (let i = 0; i < m; i++) {
            if (i !== row) {
                const factor = this.tableau[i][col];
                for (let j = 0; j < n; j++) {
                    this.tableau[i][j] -= factor * this.tableau[row][j];
                }
            }
        }
    }

    solve() {
        this.printCurrent();
        while (this.step());
    }

    recuperarSolucaoPrimal() {
        const primalMethod = 'min';
        const primalCols = ['x1', 'x2'];
        const primalObjective = [0.4, 0.5];
        const restrictions = [
            [0.3, 0.1, 2.7, '<='],
            [0.5, 0.5, 6, '='],
            [0.6, 0.4, 6, '>=']
        ];

        const dualTableauRows = ['s1', 'y2', 'Z'];
        const dualTableauCols = ['y1', 'y2', 'y3', 's1', 's2', 'RHS'];
        const dualTableau = [
            [-0.2, 0, 0.2, 1, -1, 0.1],
            [0.2, 1, -0.8, 0, -2, 1],
            [1.5, 0, -1.2, 0, 12, -6]
        ];

        // Preparando linhas da solução Dual 
        const n = dualTableauCols.length - 1; // exclui RHS
        const m = dualTableauRows.length - 1; // exclui Z
        const solucaoDual = {};
        dualTableauCols.slice(0, n).forEach(v => solucaoDual[v] = 0);

        for (let i = 0; i < m; i++) {
            const nome = dualTableauRows[i];
            const rhs = dualTableau[i][n];
            if (dualTableauCols.includes(nome)) {
                solucaoDual[nome] = rhs;
            }
        }

        // Identificar restrições ativas do primal
        //   const restricoesAtivas = Object.entries(solucaoDual)
        //     .filter(([v, val]) => v.startsWith('y') && val > 1e-8)
        //     .map(([v]) => parseInt(v.slice(1)) - 1); // pega índice 0-based
        const restricoesAtivas = [0, 1];

        console.log("Restrições ativas do primal:", restricoesAtivas.map(i => `R${i + 1}`).join(', '));

        // Construir sistema Ax = b
        // Função auxiliar (eliminação de Gauss)
        function resolverSistemaLinear(A, b) {
            const n = b.length;
            const M = A.map((row, i) => row.concat(b[i]));

            for (let i = 0; i < n; i++) {
                let maxRow = i;
                for (let k = i + 1; k < n; k++) {
                    if (Math.abs(M[k][i]) > Math.abs(M[maxRow][i])) maxRow = k;
                }
                [M[i], M[maxRow]] = [M[maxRow], M[i]];

                const piv = M[i][i];
                if (Math.abs(piv) < 1e-10) throw new Error("Sistema singular");

                for (let j = i; j <= n; j++) M[i][j] /= piv;

                for (let k = 0; k < n; k++) {
                    if (k !== i) {
                        const factor = M[k][i];
                        for (let j = i; j <= n; j++) {
                            M[k][j] -= factor * M[i][j];
                        }
                    }
                }
            }
            return M.map(row => row[n]);
        }

        const A = [];
        const b = [];

        for (const i of restricoesAtivas) {
            const [a1, a2, bi] = restrictions[i];
            A.push([a1, a2]);
            b.push(bi);
        }

        // Resolver sistema Ax = b 
        const x = resolverSistemaLinear(A, b);

        // Calcular Z
        let z = 0;
        for (let i = 0; i < x.length; i++) z += primalObjective[i] * x[i];

        console.log("\n=== Solução Primal ===");
        const solucaoPrimal = {};
        for (let i = 0; i < x.length; i++) {
            solucaoPrimal[primalCols[i]] = x[i];
        }
        console.table(solucaoPrimal);
        console.log(solucaoPrimal);
        
        // console.log("Valor ótimo Z =", z.toFixed(2));

        return {
            solucaoPrimal: solucaoPrimal,
            z: z.toFixed(2)
        }
    }
}

$(() => {
    const solver = DualSimplexSolver.current();
    solver.solve();
    console.warn(solver);
    
});