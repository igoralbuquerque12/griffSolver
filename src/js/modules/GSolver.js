// Dual Simplex Tabular Solver - JavaScript Puro
// Agora com geração automática da tabela dual e definição de variáveis básicas e não básicas

class GSolver {
    /**
     * @param {number[][]} tableau - matriz (m+1)x(n+1) pronta para Dual Simplex
     * @param {string[]} cols - nomes das colunas (variáveis não básicas + RHS)
     * @param {string[]} rows - nomes das linhas (variáveis básicas + Z)
     */
    constructor(tableau, cols, rows) {
        this.tableau = tableau.map(r => r.slice());
        this.cols = cols.slice();
        this.rows = rows.slice();
        this.iter = 0;
    }

    // Imprime a tabela atual
    printCurrent() {
        console.log(`\n--- Iteração ${this.iter} ---`);
        const header = ["BV"].concat(this.cols);
        const table = this.tableau.map((row, i) => {
            const obj = { BV: this.rows[i] };
            this.cols.forEach((c, j) => obj[c] = row[j]);
            return obj;
        });
        console.table(table, header);
    }

    // Executa uma iteração; retorna false se ótimo ou inviável
    step() {
        const m = this.tableau.length - 1;
        const n = this.cols.length - 1;
        // 1) Linha pivô: menor RHS (<0)
        let pivotRow = -1, minRhs = 0;
        for (let i = 0; i < m; i++) {
            const rhs = this.tableau[i][n];
            if (rhs < minRhs) { minRhs = rhs; pivotRow = i; }
        }
        if (pivotRow < 0) {
            console.log('Ótimo encontrado.');
            this.printCurrent();
            return false;
        }
        // 2) Coluna pivô: coef<0 na linha, ratio mínimo |Z_j / a_ij|
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
        // 3) Pivotamento
        this.pivot(pivotRow, pivotCol);
        // 4) Atualiza labels básicos
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
}

export default GSolver;