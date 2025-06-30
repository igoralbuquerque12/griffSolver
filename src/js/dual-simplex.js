import Problema from "./modules/Problema";
import "./support/helpers";
import "./support/tabelas-html";

var enable_logging = false;

function consoleLog(...variables)
{
    if(enable_logging) {
        console.log(...variables);
    }
}

function consoleTable(tableData = null, properties = null)
{
    if(enable_logging) {
        console.table(tableData, properties);
    }
}

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
            let novaVariavel = {
                variavel: `y${subscript(i + 1)}`,
                indice: i + indexDiff,
                indiceRestricao: i,
                tipo:  'restrita'
            };
            if(restricao.operator == '=') {
                novaVariavel.tipo = 'irrestrita';
                novaVariavel.variavel += '⁺';
            }
            variaveisDuais.push(novaVariavel);
            for (const j in restricao.coef) {
                restricoesDuais[j][i + indexDiff] = (0 - multiplicador) * restricao.coef[j];
            }
            if (restricao.operator == '=') {
                indexDiff++;
                variaveisDuais.push({
                    variavel: `y${subscript(i + 1)}⁻`,
                    indice: i + indexDiff,
                    indiceRestricao: i,
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
                variavel: `s${subscript(i + 1)}`,
                indice: i,
                indiceRestricao: i,
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
            cols.push(this.variaveis[i].variavel);
        }
        cols.push('RHS');
        const rows = [];
        for(const i in this.rhsRestricoes) {
            rows.push('s' + subscript(Number.parseInt(i) + 1));
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
        this.initialCols = [...cols];
        this.cols = cols.slice();        
        this.rows = rows.slice();
        this.numberVariables = this.problem.restricoes.length;
        this.tableauRows = [...rows].slice(0, rows.length - 1);
    }

    static current() {
        return (new DualSimplexSolver(ProblemaDual.current()));
    }

    // Imprime a tabela atual
    printCurrent() {
        
        const header = ["BV"].concat(this.cols);
        const title = this.iter > 0 ? `Iteração ${this.iter}` : 'Forma dual';
        mostrarTabelaSimplex(this.tableau, title, this.initialCols, this.tableauRows);
        const table = this.tableau.map((row, i) => {
            const obj = { BV: this.rows[i] };
            this.cols.forEach((c, j) => obj[c] = row[j]);
            return obj;
        });
        consoleTable(table, header);
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
            consoleLog('Ótimo encontrado.');
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
        const m = this.tableau.length;
        const n = this.cols.length;
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
        // Salva a variável que entrou na base
        this.tableauRows[row] = this.problem.variaveis[col].variavel;
    }

    solve() {
        this.printCurrent();
        while (this.step());
    }

    recuperarSolucaoPrimal() {
        const primalProblem = this.problem.primal;
        const primalObjective = [...primalProblem.coeficientes];
        const primalCols = primalObjective.map((coef, i) => `x${i + 1}`);
        const restrictions = primalProblem.restricoes.map((restricao) => {
            return [...restricao.coef].concat([
                restricao.rhs,
                restricao.operator
            ]);
        });

        const dualProblem = this.problem;
        const dualTableauRows = [...this.rows];
        const dualTableauCols = [];
        
        let loadedCols = false;
        const dualTableau = [...this.tableau].map((row) => {
            const resultingRow = [];
            row.forEach((item, index)  => {
                const variable = dualProblem.variaveis[index];                
                if(variable?.tipo != 'espelho') {
                    if(!loadedCols && variable) {
                        dualTableauCols.push(variable.variavel);
                    }
                    resultingRow.push(Number.parseFloat(item.toFixed(2)));
                }
            });
            loadedCols = true;
            return resultingRow;
        });
        dualTableauCols.push('RHS');
        

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
        
        let somatorios = (new Array(primalProblem.restricoes.length)).fill(0);
        const colCount = dualTableau[0].length;
        dualTableauRows
            .map((col, rowIndex) => {
                const variavel = this.problem.variaveis.find((v) => v.variavel == col);
                if(variavel) {
                    const valor = variavel.tipo == 'espelho' ? -1 : 1;
                    somatorios[variavel.indiceRestricao] += valor * dualTableau[rowIndex][colCount - 1];
                }
            });
        
            
            
        const restricoesAtivas = somatorios.filter((v, i) => Number.parseFloat(v.toFixed(2)) != 0).keys().toArray();
        const restrictionLength = restrictions[0].length;
        const A = [];
        const b = [];
        for (const i of restricoesAtivas) {
            A.push(restrictions[i].slice(0, restrictionLength - 2));
            b.push(restrictions[i][restrictionLength - 2]);
        }

        // Resolver sistema Ax = b 
        const x = resolverSistemaLinear(A, b);

        // Calcular Z
        let z = 0;
        for (let i = 0; i < x.length; i++) z += primalObjective[i] * x[i];

        consoleLog("\n=== Solução Primal ===");
        const solucaoPrimal = {};
        for (let i = 0; i < x.length; i++) {
            solucaoPrimal[primalCols[i]] = x[i];
        }
        consoleTable(solucaoPrimal);
        consoleLog(solucaoPrimal);

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