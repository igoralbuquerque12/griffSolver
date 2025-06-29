import DeepSolver from "./modules/DeepSolver";
import GSolver from "./modules/GSolver";
import Problema from "./modules/Problema";
import "./support/helpers";



class ProblemaDual {
    constructor(problemaDual) {
        const { objetivo, restricoes, rhsRestricoes, variaveis, metodo } = problemaDual;
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
        return new ProblemaDual(this.preparar(problema));
    }

    tabela() {
        let tabela = this.restricoes.map((linha) => [...linha]);
        for (const i in tabela) {
            tabela[i].push(this.rhsRestricoes[i]);
        }
        tabela.push([...this.objetivo]);
        return tabela;
    }
}


class DualSimplexSolver {
    constructor(problemaDual) {
        this.problema = problemaDual;
        this.tabela = problemaDual.tabela();
    }

    static current() {
        return (new DualSimplexSolver(ProblemaDual.current()));
    }
}


function recuperarSolucaoPrimal() {
  // =================== INPUT ======================
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

  // =================== PASSO 1: Solução Dual ======================
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

  console.log("\n=== Solução Dual ===");
  console.table(solucaoDual);

  // =================== PASSO 2: Identificar restrições ativas do primal ======================
//   const restricoesAtivas = Object.entries(solucaoDual)
//     .filter(([v, val]) => v.startsWith('y') && val > 1e-8)
//     .map(([v]) => parseInt(v.slice(1)) - 1); // pega índice 0-based
const restricoesAtivas = [0, 1];

  console.log("Restrições ativas do primal:", restricoesAtivas.map(i => `R${i+1}`).join(', '));

  // =================== PASSO 3: Construir sistema Ax = b ======================
  const A = [];
  const b = [];

  for (const i of restricoesAtivas) {
    const [a1, a2, bi] = restrictions[i];
    A.push([a1, a2]);
    b.push(bi);
  }

  // Resolver sistema Ax = b (eliminação de Gauss)
  const x = resolverSistemaLinear(A, b);

  // =================== PASSO 4: Calcular Z ======================
  let z = 0;
  for (let i = 0; i < x.length; i++) z += primalObjective[i] * x[i];

  console.log("\n=== Solução Primal ===");
  const solucaoPrimal = {};
  for (let i = 0; i < x.length; i++) {
    solucaoPrimal[primalCols[i]] = x[i];
  }
  console.table(solucaoPrimal);
  console.log("Valor ótimo Z =", z.toFixed(4));


  // =================== Função auxiliar ======================
  function resolverSistemaLinear(A, b) {
    const n = b.length;
    const M = A.map((row, i) => row.concat(b[i]));

    for (let i = 0; i < n; i++) {
      let maxRow = i;
      for (let k = i+1; k < n; k++) {
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
}

$(() => {
    // const solver = DualSimplexSolver.current();
    // console.log(solver);

    const initialTableau = ProblemaDual.current().tabela();
    console.log(initialTableau);

    // const deepSolver = new DeepSolver(initialTableau);
    // deepSolver.solve();

    const restrictions = [
        [0.4, 0.5, 0, 'z'], // Objetivo
        [0.3, 0.1, 2.7, '<='],// restricao
        [0.5, 0.5, 6, '='],
        [0.6, 0.4, 6, '>=']
    ];


    const dualRows = ['s1', "y2+", 'Z'];
    const dualCols = ['y1', "y2+", "y2-", "y3'", 's1', 's2', 'RHS'];
    const gSolver = new GSolver(initialTableau, dualCols, dualRows)
    gSolver.solve();
    
    console.log(Problema.current());
    

    const resultingDualRows = ['s1', "y2", 'Z'];
    const resultingDualCols = ['y1', "y2", "y3'", 's1', 's2', 'RHS'];
    const resultingDualTableau = [
        [-0.2, 0, -0.2, 1, -1, 0.1],
        [0.2, 1, 0.8, 0, -2, 1.0],  
        [-1.5, 0, -1.2, 0, -12, 6.0] 
    ];

    // recuperarSolucaoPrimal(resultingDualTableau, resultingDualRows, resultingDualCols);
    recuperarSolucaoPrimal();
});

// $(() => {
//     (new DeepSolver()).solve()
// })