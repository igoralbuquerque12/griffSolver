class DeepSolver2 {
    constructor(tableau, variableCount) {
        this.tableau = tableau;
        this.rows = tableau.length;
        this.cols = tableau[0].length;
        this.iterations = 0;
        this.isMinimization = true;
        // Índiices de variaveis
        let i = this.cols - this.rows;
        this.variables = (new Array(this.rows - 1)).fill(0).map(() => i++);
    }

    solve() {
        while (true) {
            this.printTableau();
            const pivotRow = this.findPivotRow();
            
            if (pivotRow === -1) {
                if (this.checkOptimality()) {
                    console.log("\nSolução ótima encontrada!");
                    this.printSolution();
                    return;
                } else {
                    console.log("\nSolução viável - Mudando para Simplex Primal...");
                    this.primalSimplex();
                    return;
                }
            }

            const pivotCol = this.findPivotCol(pivotRow);
            if (pivotCol === -1) {
                console.log("\nProblema ilimitado.");
                return;
            }
            this.variables[pivotRow] = pivotCol;            

            console.log(`\nIteração ${++this.iterations}: Pivô [${pivotRow},${pivotCol}] = ${this.tableau[pivotRow][pivotCol].toFixed(4)}`);
            this.pivot(pivotRow, pivotCol);
        }
    }

    findPivotRow() {
        let minVal = 0;
        let pivotRow = -1;
        for (let i = 0; i < this.rows - 1; i++) {
            const rhs = this.tableau[i][this.cols - 1];
            if (rhs < minVal) {
                minVal = rhs;
                pivotRow = i;
            }
        }
        return pivotRow;
    }

    findPivotCol(pivotRow) {
        let minRatio = Infinity;
        let pivotCol = -1;
        for (let j = 0; j < this.cols - 1; j++) {
            const a = this.tableau[pivotRow][j];
            if (a >= 0) continue;
            
            const cost = this.tableau[this.rows - 1][j];
            const ratio = Math.abs(cost / a);
            if (ratio < minRatio) {
                minRatio = ratio;
                pivotCol = j;
            }
        }
        return pivotCol;
    }

    pivot(pivotRow, pivotCol) {
        const pivotValue = this.tableau[pivotRow][pivotCol];
        for (let j = 0; j < this.cols; j++) {
            this.tableau[pivotRow][j] /= pivotValue;
        }
        
        for (let i = 0; i < this.rows; i++) {
            if (i === pivotRow) continue;
            const factor = this.tableau[i][pivotCol];
            for (let j = 0; j < this.cols; j++) {
                this.tableau[i][j] -= factor * this.tableau[pivotRow][j];
            }
        }
    }

    checkOptimality() {
        const lastRow = this.rows - 1;
        for (let j = 0; j < this.cols - 1; j++) {
            if (this.tableau[lastRow][j] < 0) return false;
        }
        return true;
    }

    primalSimplex() {
        while (true) {
            this.printTableau();
            if (this.checkOptimality()) {
                console.log("\nSolução ótima encontrada!");
                this.printSolution();
                return;
            }

            const pivotCol = this.findEnteringCol();
            if (pivotCol === -1) {
                console.log("\nProblema ilimitado.");
                return;
            }

            const pivotRow = this.findMinRatioRow(pivotCol);
            if (pivotRow === -1) {
                console.log("\nSem razão válida.");
                return;
            }

            console.log(`\nIteração Primal ${++this.iterations}: Pivô [${pivotRow},${pivotCol}] = ${this.tableau[pivotRow][pivotCol].toFixed(4)}`);
            this.pivot(pivotRow, pivotCol);
        }
    }

    findEnteringCol() {
        const lastRow = this.rows - 1;
        let minVal = 0;
        let pivotCol = -1;
        for (let j = 0; j < this.cols - 1; j++) {
            if (this.tableau[lastRow][j] < minVal) {
                minVal = this.tableau[lastRow][j];
                pivotCol = j;
            }
        }
        return pivotCol;
    }

    findMinRatioRow(pivotCol) {
        let minRatio = Infinity;
        let pivotRow = -1;
        for (let i = 0; i < this.rows - 1; i++) {
            const a = this.tableau[i][pivotCol];
            if (a <= 0) continue;
            
            const b = this.tableau[i][this.cols - 1];
            const ratio = b / a;
            if (ratio < minRatio) {
                minRatio = ratio;
                pivotRow = i;
            }
        }
        return pivotRow;
    }

    printTableau() {
        console.log("\nTableau:");
        for (let i = 0; i < this.rows; i++) {
            let row = "";
            for (let j = 0; j < this.cols; j++) {
                row += this.tableau[i][j].toFixed(4).padStart(8) + " ";
            }
            console.log(row);
        }
    }

    printSolution() {
        const w = -this.tableau[this.rows - 1][this.cols - 1];
        console.log(`\nValor ótimo: ${w.toFixed(4)}`);
        console.log("Solução dual:");
        for(let i = 0; i < this.cols - 1; i++) {
            let value = '0.00';
            const varIndex = this.variables.indexOf(i);
            if(varIndex !== -1) {
                value = Number.parseFloat(this.tableau[varIndex][this.cols - 1]).toFixed(2);
            }
            console.log(`y:${i+1} = ${value}`);
        }
    }
}

class DeepSolver {
    constructor(tableau) {
        this.tableau = tableau.map(row => [...row]); // Deep copy
        this.rows = tableau.length;
        this.cols = tableau[0].length;
        this.iterations = 0;
    }

    solve() {
        while (true) {
            this.printTableau();
            
            // Verificar se solução é ótima (todos RHS >= 0)
            if (this.isOptimal()) {
                console.log("\nSolução ótima encontrada!");
                this.printSolution();
                return;
            }
            
            // Encontrar linha pivô (mais negativo no RHS)
            const pivotRow = this.findPivotRow();
            if (pivotRow === -1) {
                console.log("\nNão há valores negativos no RHS - solução ótima.");
                return;
            }
            
            // Encontrar coluna pivô
            const pivotCol = this.findPivotCol(pivotRow);
            if (pivotCol === -1) {
                console.log("\nProblema ilimitado - não há elementos negativos na linha pivô.");
                return;
            }
            
            console.log(`\nIteração ${++this.iterations}: Pivô [${pivotRow},${pivotCol}] = ${this.tableau[pivotRow][pivotCol].toFixed(4)}`);
            this.pivot(pivotRow, pivotCol);
        }
    }

    findPivotRow() {
        let minVal = 0;
        let pivotRow = -1;
        
        // Percorrer todas as linhas, exceto a última (linha Z)
        for (let i = 0; i < this.rows - 1; i++) {
            const rhs = this.tableau[i][this.cols - 1]; // Última coluna = RHS
            if (rhs < minVal) {
                minVal = rhs;
                pivotRow = i;
            }
        }
        return pivotRow;
    }

    findPivotCol(pivotRow) {
        let minRatio = Infinity;
        let pivotCol = -1;
        
        for (let j = 0; j < this.cols - 1; j++) {
            const element = this.tableau[pivotRow][j];
            
            // Ignorar elementos não-negativos
            if (element >= 0) continue;
            
            // Calcular razão (coef linha Z / elemento)
            const cost = this.tableau[this.rows - 1][j];
            const ratio = Math.abs(cost / element);
            
            if (ratio < minRatio) {
                minRatio = ratio;
                pivotCol = j;
            }
        }
        return pivotCol;
    }

    pivot(pivotRow, pivotCol) {
        const pivotValue = this.tableau[pivotRow][pivotCol];
        
        // Normalizar a linha pivô
        for (let j = 0; j < this.cols; j++) {
            this.tableau[pivotRow][j] /= pivotValue;
        }
        
        // Atualizar outras linhas
        for (let i = 0; i < this.rows; i++) {
            if (i === pivotRow) continue;
            
            const factor = this.tableau[i][pivotCol];
            for (let j = 0; j < this.cols; j++) {
                this.tableau[i][j] -= factor * this.tableau[pivotRow][j];
            }
        }
    }

    isOptimal() {
        // Verificar se todos os RHS são não-negativos (exceto linha Z)
        for (let i = 0; i < this.rows - 1; i++) {
            if (this.tableau[i][this.cols - 1] < 0) {
                return false;
            }
        }
        return true;
    }

    printTableau() {
        console.log("\nTableau Atual:");
        for (let i = 0; i < this.rows; i++) {
            let row = "";
            for (let j = 0; j < this.cols; j++) {
                row += this.formatNumber(this.tableau[i][j]) + "\t";
            }
            console.log(row);
        }
    }

    formatNumber(value) {
        // Formata números para melhor visualização
        if (Math.abs(value) < 0.0001) value = 0; // Evitar -0.00
        return value.toFixed(4).padStart(8);
    }

    printSolution() {
        console.log(`Valor ótimo de Z: ${this.tableau[this.rows-1][this.cols-1].toFixed(4)}`);
        console.log("Solução:");
        
        for (let j = 0; j < this.cols - 1; j++) {
            let isBasic = false;
            let value = 0;
            let rowIndex = -1;
            
            // Verificar se a variável é básica
            for (let i = 0; i < this.rows - 1; i++) {
                if (Math.abs(this.tableau[i][j]) > 0.0001) {
                    let hasOtherNonZero = false;
                    
                    // Verificar se é coluna canônica
                    for (let k = 0; k < this.cols - 1; k++) {
                        if (k !== j && Math.abs(this.tableau[i][k]) > 0.0001) {
                            hasOtherNonZero = true;
                            break;
                        }
                    }
                    
                    if (!hasOtherNonZero && Math.abs(this.tableau[i][j] - 1) < 0.0001) {
                        isBasic = true;
                        value = this.tableau[i][this.cols - 1];
                        rowIndex = i;
                        break;
                    }
                }
            }
            
            if (isBasic) {
                console.log(`Variável ${j+1} = ${value.toFixed(4)} (básica, linha ${rowIndex})`);
            } else {
                console.log(`Variável ${j+1} = 0.0000 (não-básica)`);
            }
        }
    }
}

export default DeepSolver;