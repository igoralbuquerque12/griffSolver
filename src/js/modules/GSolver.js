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
            // this.printCurrent();
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


class GSolver2 {
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
        while (true) {
            const m = this.tableau.length - 1;
            const n = this.cols.length - 1;

            // 1) busca linha pivô de restrição
            let pivotRow = -1, minRhs = 0;
            for (let i = 0; i < m; i++) {
                if (this.tableau[i][n] < minRhs) {
                    minRhs = this.tableau[i][n];
                    pivotRow = i;
                }
            }

            if (pivotRow >= 0) {
                // processo normal de dual-simplex
                if (!this.stepOnRow(pivotRow)) break;
                continue;
            }

            // 2) nenhuma RHS de restrição <0 → verificar Z′
            const zRhs = this.tableau[m][n];
            if (zRhs >= 0) {
                console.log("Convergência completa: ótimo primal e dual factível.");
                this.printCurrent();
                break;
            }

            // 3) RHS de Z′ está negativo → dual ainda não convergiu ao ótimo primal
            //    tentamos pivotar na linha Z′
            const pivotCol = this.findPivotCol(m);
            if (pivotCol < 0) {
                console.warn("Situação degenerada: Z' RHS negativo mas sem colunas negativas para pivot.");
                console.table({
                    Z_RHS: zRhs,
                    message: "Requer ação especial ou revisão de degenerescência."
                });
                break;
            }

            // 4) faz o pivot na linha Z′
            this.pivot(m, pivotCol);
            [this.rows[m], this.cols[pivotCol]] = [this.cols[pivotCol], this.rows[m]];
            this.iter++;
            this.printCurrent();
        }
    }

    // Extrai lógica de uma iteração normal na linha i
    stepOnRow(pivotRow) {
        const m = this.tableau.length - 1;
        const n = this.cols.length - 1;
        // encontra coluna pivô e faz pivot, igual ao step original...
        let pivotCol = -1, bestRatio = Infinity;
        for (let j = 0; j < n; j++) {
            const aij = this.tableau[pivotRow][j];
            if (aij < 0) {
                const ratio = Math.abs(this.tableau[m][j] / aij);
                if (ratio < bestRatio) {
                    bestRatio = ratio;
                    pivotCol = j;
                }
            }
        }
        if (pivotCol < 0) {
            console.error("Dual inviável na linha", this.rows[pivotRow]);
            return false;
        }
        this.pivot(pivotRow, pivotCol);
        [this.rows[pivotRow], this.cols[pivotCol]] =
            [this.cols[pivotCol], this.rows[pivotRow]];
        this.iter++;
        this.printCurrent();
        return true;
    }

    // Encontra coluna pivô na linha Z′ (índice m)
    findPivotCol(zRow) {
        const m = this.tableau.length - 1;
        let pivotCol = -1, bestRatio = Infinity;
        for (let j = 0; j < this.cols.length - 1; j++) {
            const a = this.tableau[zRow][j];
            if (a < 0) {
                const ratio = Math.abs(this.tableau[zRow][this.cols.length - 1] / a);
                if (ratio < bestRatio) {
                    bestRatio = ratio;
                    pivotCol = j;
                }
            }
        }
        return pivotCol;
    }
}



export default GSolver;