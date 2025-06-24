document.addEventListener('DOMContentLoaded', function () {
    console.log("tabular.js carregado");

    const tipoObjetivo = localStorage.getItem('tipoObjetivo');
    const coefObjetivo = JSON.parse(localStorage.getItem('coefObjetivo'));
    const restricoes = JSON.parse(localStorage.getItem('restricoes'));

    if (!tipoObjetivo || !coefObjetivo || !restricoes) {
        alert("Dados incompletos no localStorage. Certifique-se de definir o problema de programação linear antes de acessar esta página.");
        return;
    }
    console.log("tipo:", tipoObjetivo);
    console.log("coeficientes:", coefObjetivo);
    console.log("restrições:", restricoes);

    const numVariaveis = coefObjetivo.length;
    const numRestricoes = restricoes.length;


    console.log("numero de variáveis:", numVariaveis );
    let tabelaSimplex = criarTabelaInicialSimplex();
    let iteracao = 0;

    variaveisBasicas = Array.from({ length: numRestricoes }, (_, i) => `f${i + 1}`);

    verificarRestricoes(restricoes);

    function criarTabelaInicialSimplex() {
        const tabela = [];
    
        // Linha do objetivo (Z)
        const linhaObjetivo = coefObjetivo.map(c => -c); // Inverte os sinais para maximizar sempre


        for (let i = 0; i < numRestricoes; i++) {
            linhaObjetivo.push(0); // Zeros para variáveis de folga
        }
        linhaObjetivo.push(0); // RHS da linha Z
        tabela.push(linhaObjetivo);
    
        // Linhas das restrições
        restricoes.forEach((restricao, i) => {
            if (!Array.isArray(restricao.coef)) {
                console.error(`Erro: coeficientes não é um array para a restrição ${i}.`, restricao);
                return; // Pula essa restrição se o coeficiente não for um array
            }
    
            const linha = [...restricao.coef];
            
            for (let j = 0; j < numRestricoes; j++) {
                linha.push(i === j ? 1 : 0); // Variáveis de folga
            }
            linha.push(restricao.rhs); // RHS da restrição
            tabela.push(linha);
        });
    
        console.log("Tabela Inicial Criada:", tabela); // Apenas log no console
        return tabela;
    }

    function criarTabelaInicialBigM() {
        if (tipoObjetivo === "Maximizar") {
            criarTabelaInicialBigMax(); // Chama a função para maximização
        } else if (tipoObjetivo === "Minimizar") {
            criarTabelaInicialBigMin(); // Chama a função para minimização
        } else {
            console.error("Objetivo inválido. Certifique-se de que o tipo de objetivo é 'Maximizar' ou 'Minimizar'.");
        }
    }

    function criarTabelaInicialBigMax() {
        const tabela = [];
        const penalidadeM = tipoObjetivo === "Maximizar" ? -1000 : 1000; // Penalidade M depende do objetivo
        const linhaObjetivo = Array(numVariaveis + numRestricoes + restricoes.length + 1).fill(0); // Linha Z inicial
        const variaveisArtificiais = []; // Índices das variáveis artificiais
        variaveisBasicas = []; // Variáveis básicas iniciais
    
        // Preenchendo as linhas de restrições
        restricoes.forEach((restricao, i) => {
            const linha = Array(numVariaveis + numRestricoes + restricoes.length + 1).fill(0); // Linha inicial para a tabela
    
            // Coeficientes das variáveis de decisão
            restricao.coef.forEach((coef, j) => {
                linha[j] = tipoObjetivo === "Maximizar" ? coef : -coef;
                linha[j] = Math.abs(linha[j]) < 1e-6 ? 0 : linha[j]; // Definir valores pequenos como zero
            });
    
            // Variáveis de folga, excesso ou artificiais
            if (restricao.operator === "<=") {
                linha[numVariaveis + i] = 1; // Variável de folga
                variaveisBasicas.push(`f${i + 1}`); // Variável de folga entra como básica
    
            } else if (restricao.operator === ">=") {
                linha[numVariaveis + i] = -1; // Variável de folga
                linha[numVariaveis + numRestricoes + variaveisArtificiais.length] = 1; // Variável artificial
                variaveisArtificiais.push(numVariaveis + numRestricoes + variaveisArtificiais.length); // Adiciona o índice da variável artificial
                variaveisBasicas.push(`a${variaveisArtificiais.length}`); // Variável artificial entra como básica
    
            } else if (restricao.operator === "=") {
                linha[numVariaveis + numRestricoes + variaveisArtificiais.length] = 1; // Variável artificial
                variaveisArtificiais.push(numVariaveis + numRestricoes + variaveisArtificiais.length); // Adiciona o índice da variável artificial
                variaveisBasicas.push(`a${variaveisArtificiais.length}`); // Variável artificial entra como básica
            }
    
            // RHS (lado direito da restrição)
            linha[linha.length - 1] = restricao.rhs;
    
            tabela.push(linha);
        });
    
        // Linha Z (função objetivo)
        coefObjetivo.forEach((coef, j) => {
            linhaObjetivo[j] = tipoObjetivo === "Maximizar" ? -coef : coef; // Para maximizar, -c; para minimizar, +c
        });
    
        // Ajuste da linha Z com base nas variáveis artificiais
        variaveisArtificiais.forEach((indiceArtificial) => {
            tabela.forEach((linha) => {
                if (linha[indiceArtificial] === 1) {
                    for (let j = 0; j < linhaObjetivo.length - (numRestricoes + 1); j++) {
                        linhaObjetivo[j] += penalidadeM * linha[j]; // Ajusta os coeficientes
                    }
                    linhaObjetivo[linhaObjetivo.length - 1] += penalidadeM * linha[linha.length - 1]; // Ajusta RHS
                }
            });
        });
    
        tabela.unshift(linhaObjetivo); // Insere a linha Z no topo da tabela
        console.log("Tabela Inicial Big M:", tabela);
        console.log("Variáveis Básicas Iniciais:", variaveisBasicas);
    
        // Função para remover colunas com todos os valores zero
        tabela.forEach((linha, index) => {
            // Verifica se a coluna inteira é composta apenas por zeros
            linha.forEach((valor, colunaIndex) => {
                const isColunaZerada = tabela.every(l => l[colunaIndex] === 0); // Verifica se todas as linhas dessa coluna são zero
                if (isColunaZerada) {
                    // Remover a coluna zerada de todas as linhas
                    tabela.forEach((linha) => {
                        linha.splice(colunaIndex, 1);
                    });
                    // Remover o índice da variável básica correspondente
                    if (index === 0) {
                        variaveisBasicas.splice(colunaIndex, 1);
                    }
                }
            });
        });
    
        return { tabela, variaveisBasicas }; // Retorna a tabela e as variáveis básicas
    }

    
    function criarTabelaInicialBigMin() {
        const tabela = [];
        const penalidadeM = tipoObjetivo === "Maximizar" ? -1000 : 1000; // Penalidade M depende do objetivo
        const linhaObjetivo = Array(numVariaveis + numRestricoes + restricoes.length + 1).fill(0); // Linha Z inicial
        const variaveisArtificiais = []; // Índices das variáveis artificiais
        variaveisBasicas = []; // Variáveis básicas iniciais
    
        // Preenchendo as linhas de restrições
        restricoes.forEach((restricao, i) => {
            const linha = Array(numVariaveis + numRestricoes + restricoes.length + 1).fill(0); // Linha inicial para a tabela
    
            // Coeficientes das variáveis de decisão
            restricao.coef.forEach((coef, j) => {
                linha[j] = tipoObjetivo === "Maximizar" ? -coef : coef;
                linha[j] = Math.abs(linha[j]) < 1e-6 ? 0 : linha[j]; // Definir valores pequenos como zero
            });
    
            // Variáveis de folga, excesso ou artificiais
            if (restricao.operator === "<=") {
                linha[numVariaveis + i] = 1; // Variável de folga
                variaveisBasicas.push(`f${i + 1}`); // Variável de folga entra como básica
    
            } else if (restricao.operator === ">=") {
                linha[numVariaveis + i] = -1; // Variável de folga
                linha[numVariaveis + numRestricoes + variaveisArtificiais.length] = 1; // Variável artificial
                variaveisArtificiais.push(numVariaveis + numRestricoes + variaveisArtificiais.length); // Adiciona o índice da variável artificial
                variaveisBasicas.push(`a${variaveisArtificiais.length}`); // Variável artificial entra como básica
    
            } else if (restricao.operator === "=") {
                linha[numVariaveis + numRestricoes + variaveisArtificiais.length] = 1; // Variável artificial
                variaveisArtificiais.push(numVariaveis + numRestricoes + variaveisArtificiais.length); // Adiciona o índice da variável artificial
                variaveisBasicas.push(`a${variaveisArtificiais.length}`); // Variável artificial entra como básica
            }
    
            // RHS (lado direito da restrição)
            linha[linha.length - 1] = restricao.rhs;
    
            tabela.push(linha);
        });
    
        // Linha Z (função objetivo)
        coefObjetivo.forEach((coef, j) => {
            linhaObjetivo[j] = tipoObjetivo === "Maximizar" ? coef : -coef; // Para maximizar, -c; para minimizar, +c
        });
    
        // Ajuste da linha Z com base nas variáveis artificiais
        variaveisArtificiais.forEach((indiceArtificial) => {
            tabela.forEach((linha) => {
                if (linha[indiceArtificial] === 1) {
                    for (let j = 0; j < linhaObjetivo.length - (numRestricoes + 1); j++) {
                        linhaObjetivo[j] += penalidadeM * linha[j]; // Ajusta os coeficientes
                    }
                    linhaObjetivo[linhaObjetivo.length - 1] += penalidadeM * linha[linha.length - 1]; // Ajusta RHS
                }
            });
        });
    
        tabela.unshift(linhaObjetivo); // Insere a linha Z no topo da tabela
        console.log("Tabela Inicial Big M:", tabela);
        console.log("Variáveis Básicas Iniciais:", variaveisBasicas);
    
        // Função para remover colunas com todos os valores zero
        tabela.forEach((linha, index) => {
            // Verifica se a coluna inteira é composta apenas por zeros
            linha.forEach((valor, colunaIndex) => {
                const isColunaZerada = tabela.every(l => l[colunaIndex] === 0); // Verifica se todas as linhas dessa coluna são zero
                if (isColunaZerada) {
                    // Remover a coluna zerada de todas as linhas
                    tabela.forEach((linha) => {
                        linha.splice(colunaIndex, 1);
                    });
                    // Remover o índice da variável básica correspondente
                    if (index === 0) {
                        variaveisBasicas.splice(colunaIndex, 1);
                    }
                }
            });
        });
    
        return { tabela, variaveisBasicas }; // Retorna a tabela e as variáveis básicas
    }    

    function executarBigM() {
        if (tipoObjetivo === "Maximizar") {
            executarBigMax(); // Chama a função para maximização
        } else if (tipoObjetivo === "Minimizar") {
            executarBigMin(); // Chama a função para minimização
        } else {
            console.error("Objetivo inválido. Certifique-se de que o tipo de objetivo é 'Maximizar' ou 'Minimizar'.");
        }
    }
        
    function executarBigMax() {
        let { tabela, variaveisBasicas } = criarTabelaInicialBigMax(); // Obtém a tabela e as variáveis básicas
        let iteracao = 0;
    
        while (true) {
            const colunaPivo = escolherColunaPivoBigM(tabela);
            const isFinalIteration = colunaPivo < 0;
            const linhaPivo = !isFinalIteration ? escolherLinhaPivoBigM(tabela, colunaPivo) : -1;
            if (!isFinalIteration && linhaPivo < 0) {
                alert('Problema não possui solução viável!');
                return;
            }
    
            // Exibe a tabela antes de realizar a iteração
            mostrarTabelaBigM(tabela, `Iteração ${iteracao}`, linhaPivo, colunaPivo);
            
            if (isFinalIteration){
                mostrarResultadoFinalBigM(tabela, variaveisBasicas);
                break;
            } 
    
            // Realiza a iteração do método Simplex
            realizarIteracaoBigM(tabela, colunaPivo, linhaPivo);
    
            // Atualiza as variáveis básicas
            variaveisBasicas[linhaPivo - 1] = tipoObjetivo === "Maximizar" ? `x${colunaPivo + 1}` : `x${colunaPivo + 1}`;
    
            iteracao++; // Incrementa o contador de iterações
           
        }
        
    }

    function executarBigMin() {
        let { tabela, variaveisBasicas } = criarTabelaInicialBigMin(); // Obtém a tabela e as variáveis básicas
        let iteracao = 0;
    
        while (true) {
            const colunaPivo = escolherColunaPivoBigM(tabela);
            const isFinalIteration = colunaPivo < 0;
            const linhaPivo = !isFinalIteration ? escolherLinhaPivoBigM(tabela, colunaPivo) : -1;
            if (!isFinalIteration && linhaPivo < 0) {
                alert('Problema não possui solução viável!');
                return;
            }
    
            // Exibe a tabela antes de realizar a iteração
            mostrarTabelaBigM(tabela, `Iteração ${iteracao}`, linhaPivo, colunaPivo);
            
            if (isFinalIteration){
                mostrarResultadoFinalBigM(tabela, variaveisBasicas); 
                break;
            } 
            // Realiza a iteração do método Simplex
            realizarIteracaoBigM(tabela, colunaPivo, linhaPivo);

            // Atualiza as variáveis básicas
            variaveisBasicas[linhaPivo - 1] = tipoObjetivo === "Maximizar" ? `x${colunaPivo + 1}` : `x${colunaPivo + 1}`;
    
            iteracao++; 
        }     
    }
    
    
    function mostrarTabelaBigM(tabela, titulo, linhaPivo = -1, colunaPivo = -1, isFinalIteration = false) {
        const tabelaContainer = document.getElementById('tabela-container');
        if (!tabelaContainer) {
            console.error("Contêiner para a tabela não encontrado.");
            return;
        }
    
        // Cabeçalho da tabela
        let tabelaHTML = `<h2 class="tabela-titulo">${titulo}</h2><table class="table"><thead><tr><th></th>`;
    
        // Adiciona cabeçalhos para variáveis de decisão
        for (let i = 0; i < numVariaveis; i++) {
            tabelaHTML += `<th>x${i + 1}</th>`;
        }
    
        // Adiciona cabeçalhos para variáveis de folga e artificiais
        let artificialCount = 1;
        for (let i = numVariaveis; i < tabela[0].length - 1; i++) {
            if (i < numVariaveis + numRestricoes) {
                // Variáveis de folga
                tabelaHTML += `<th>f${i - numVariaveis + 1}</th>`;
            } else {
                // Variáveis artificiais
                tabelaHTML += `<th>a${artificialCount}</th>`;
                artificialCount++;
            }
        }
    
        // Adiciona a coluna RHS
        tabelaHTML += `<th>RHS</th></tr></thead><tbody>`;
    
        // Corpo da tabela
        tabela.forEach((linha, index) => {
            tabelaHTML += `<tr>`;
    
            // Define a célula inicial (linha Z ou variáveis básicas)
            if (index === 0) {
                tabelaHTML += `<th>Z</th>`;
            } else {
                tabelaHTML += `<th>${variaveisBasicas[index - 1]}</th>`;
            }
    
            // Preenche as células da tabela, excluindo as colunas indesejadas
            linha.forEach((celula, colIndex) => {
                let classeCelula = "";
    
                if (!isFinalIteration) {
                    if (index === linhaPivo && index !== isFinalIteration) classeCelula = 'linha-highlight';
                    if (colIndex === colunaPivo) classeCelula = 'coluna-highlight';
                }
    
                tabelaHTML += `<td class="${classeCelula}">${celula.toFixed(2)}</td>`;
            });
    
            tabelaHTML += `</tr>`;
        });
    
        tabelaHTML += `</tbody></table>`;
        tabelaContainer.insertAdjacentHTML('beforeend', tabelaHTML);
    }
    
    
    function escolherColunaPivoBigM(tabela) {
        const linhaObjetivo = tabela[0];
        let colunaPivo = -1;
        let valorMaisNegativo = 0;
        let valorMaisPositivo = 0;
    
        if (tipoObjetivo === "Maximizar") {
            for (let j = 0; j < linhaObjetivo.length - 1; j++) {
                linhaObjetivo[j] = Math.abs(linhaObjetivo[j]) < 1e-6 ? 0 : linhaObjetivo[j];
                if (linhaObjetivo[j] < valorMaisNegativo) { 
                    valorMaisNegativo = linhaObjetivo[j];
                    colunaPivo = j;
                }
            }
            // A coluna pivô só deve ser escolhida se o valor for estritamente negativo
            if (valorMaisNegativo >= 0) {
                colunaPivo = -1;  // Se não houver valores negativos, não há mais colunas válidas para pivô
            }
        } else { 
            for (let j = 0; j < linhaObjetivo.length - 1; j++) {
                linhaObjetivo[j] = Math.abs(linhaObjetivo[j]) < 1e-6 ? 0 : linhaObjetivo[j];
                if (linhaObjetivo[j] > valorMaisPositivo) { 
                    valorMaisPositivo = linhaObjetivo[j];
                    colunaPivo = j;
                }
            }
            // A coluna pivô só deve ser escolhida se o valor for estritamente positivo
            if (valorMaisPositivo <= 0) {
                colunaPivo = -1;  // Se não houver valores positivos, não há mais colunas válidas para pivô
            }
        }
    
        console.log(`Coluna pivô escolhida: ${colunaPivo}`);
        return colunaPivo;
    }
    
    
    function escolherLinhaPivoBigM(tabela, colunaPivo) {
        let linhaPivo = -1;
        let menorRazao = Infinity;
    
        for (let i = 1; i < tabela.length; i++) {
            const valorLinha = tabela[i][colunaPivo];
            if (valorLinha > 0) {
                const razao = tabela[i][tabela[i].length - 1] / valorLinha; // RHS / valor na coluna pivô.
                if (razao < menorRazao) {
                    menorRazao = razao;
                    linhaPivo = i;
                }
            }
        }
    
        // Se não houver linha pivô válida (nenhum valor positivo na coluna pivô), o processo deve parar
        if (linhaPivo === -1) {
            console.log("Não há linha pivô válida, o processo foi finalizado.");
        }
    
        return linhaPivo;
    }
    
    
    function realizarIteracaoBigM(tabela, colunaPivo, linhaPivo) {
        const numLinhas = tabela.length;
        const numColunas = tabela[0].length; // Garante que estamos usando o número correto de colunas
        const valorPivo = tabela[linhaPivo][colunaPivo];
    
        if (!valorPivo || isNaN(valorPivo)) {
            console.error(`Erro: Valor do pivô inválido na posição (${linhaPivo}, ${colunaPivo})`);
            return;
        }
        
        // Normaliza a linha pivô
        for (let j = 0; j < numColunas; j++) {
            tabela[linhaPivo][j] /= valorPivo;
        }
        
        // Atualiza as outras linhas
        for (let i = 0; i < numLinhas; i++) {
            if (i !== linhaPivo) {
                const fator = tabela[i][colunaPivo];
                for (let j = 0; j < numColunas; j++) {
                    tabela[i][j] -= fator * tabela[linhaPivo][j];
                }
            }
        }
    
        console.log(`Iteração realizada com sucesso: Coluna Pivô (${colunaPivo}), Linha Pivô (${linhaPivo})`);
        console.table(tabela);
    }
    
    function mostrarResultadoFinalBigM(tabela, variaveisBasicas) {
        const resultadoContainer = document.getElementById('tabela-container');
        const linhaObjetivo = tabela[0]; // A primeira linha contém os valores da função objetivo
    
        // Inicializa um array para armazenar os valores das variáveis de decisão
        const valoresVariaveis = Array(numVariaveis).fill(0);
    
        // Identifica quais variáveis são básicas e armazena o valor da RHS correspondente
        for (let i = 1; i < tabela.length; i++) {
            const linha = tabela[i];
            const variavelBasica = variaveisBasicas[i - 1];
    
            // Verifica se a variável básica é uma variável de decisão (x1, x2, ...) e armazena o valor
            const indiceVariavel = parseInt(variavelBasica.slice(1)) - 1;
            if (variavelBasica.startsWith("x") && indiceVariavel < numVariaveis) {
                valoresVariaveis[indiceVariavel] = linha[linha.length - 1]; // RHS (última coluna)
            }
        }
    
        // Exibe o valor de Z e os valores das variáveis de decisão
        let resultadoHTML = `
            <div class="resultado-container">
                <h2 class="resultado-titulo">Solução Ótima</h2>
                <p class="resultado-valor">Valor de Z: <strong>${linhaObjetivo[linhaObjetivo.length - 1].toFixed(2)}</strong></p>
                <ul class="variaveis-lista">
        `;
        for (let i = 0; i < numVariaveis; i++) {
            resultadoHTML += `<li class="variavel-item">x${i + 1} = <strong>${valoresVariaveis[i].toFixed(2)}</strong></li>`;
        }
        resultadoHTML += `
                </ul>
            </div>
        `;
    
        resultadoContainer.insertAdjacentHTML('beforeend', resultadoHTML);
    }    
    

    function verificarRestricoes(restricoes) {
        const operadores = restricoes.map(r => r.operator);
        const todosMenorOuIgual = operadores.every(op => op === "<=");
    
        if (todosMenorOuIgual) {
            const tabelaSimplex = criarTabelaInicialSimplex();
            executarSimplex(tabelaSimplex); // Nenhuma variável artificial é necessária
        } else {
            const tabelaInicial = criarTabelaInicialBigM(); // Criação da tabela inicial para Big M
            executarBigM(tabelaInicial); // Passa a tabela inicial para o método Big M
        }
    }

    function mostrarTabelaSimplex(tabela, titulo, linhaPivo = -1, colunaPivo = -1, isFinalIteration = false) {
        const tabelaContainer = document.getElementById('tabela-container');
        if (!tabelaContainer) {
            console.error("Contêiner para a tabela não encontrado.");
            return;
        }

        // Adiciona nova tabela sem limpar o contêiner para manter todas as iterações
        let tabelaHTML = `<div class="tabela-iteracao">
            <h3 class="tabela-titulo">${titulo}</h3>
            <div class="tabela-wrapper">
                <table class="table">`;
        // Cabeçalho da tabela
        tabelaHTML += '<tr><th></th>';
        for (let i = 0; i < numVariaveis; i++) {
            tabelaHTML += `<th>x${i + 1}</th>`;
        }
        for (let i = 0; i < numRestricoes; i++) {
            tabelaHTML += `<th>f${i + 1}</th>`;
        }
        tabelaHTML += `<th>RHS</th></tr></thead><tbody>`;

        // Linhas da tabela com rótulos das variáveis básicas
        tabela.forEach((linha, index) => {
            tabelaHTML += `<tr>`;
            
            // Rótulo da linha para variáveis básicas
            if (index === 0) {
                tabelaHTML += `<th>Z</th>`; // Linha do objetivo
            } else {
                tabelaHTML += `<th>${variaveisBasicas[index - 1]}</th>`; // Variável básica atual
            }

            // Itera sobre cada coluna da linha, incluindo o RHS
            linha.forEach((celula, colIndex) => {
                // Aplica a classe de destaque apenas se não for a última iteração
                let classeCelula = '';
                if (!isFinalIteration) {
                    if (index === linhaPivo) classeCelula = 'linha-highlight';
                    if (colIndex === colunaPivo) classeCelula = 'coluna-highlight';
                }
                tabelaHTML += `<td class="${classeCelula}">${celula.toFixed(2)}</td>`;
            });

            tabelaHTML += `</tr>`;
        });

        tabelaHTML += `</tbody></table></div></div>`;
        tabelaContainer.insertAdjacentHTML('beforeend', tabelaHTML);
    }
    
    function executarSimplex() {
        iteracao = 0;
        while (true) {
            const colunaPivo = escolherColunaPivo();
            const isFinalIteration = colunaPivo < 0; // Verifica se é a última iteração

            const linhaPivo = !isFinalIteration ? escolherLinhaPivo(colunaPivo) : -1;
            if (!isFinalIteration && linhaPivo < 0) {
                alert('Problema não possui solução viável!');
                return;
            }

            // Exibe a tabela a partir da iteração 0, com destaque na linha e coluna pivô
            mostrarTabelaSimplex(tabelaSimplex, `Iteração ${iteracao}`, linhaPivo, colunaPivo, isFinalIteration);

            if (isFinalIteration) break; // Otimalidade alcançada, sai do loop

            // Troca a variável que entra na base
            variaveisBasicas[linhaPivo - 1] = `x${colunaPivo + 1}`; // Atualiza a variável básica da linha pivô

            realizarIteracao(colunaPivo, linhaPivo);
            iteracao++;
        }

        mostrarResultadoFinal();
    }

    function escolherColunaPivo() {
        const linhaObjetivo = tabelaSimplex[0];
        let colunaPivo = -1;
        
        if (tipoObjetivo === "Maximizar") {
            // Seleciona o valor mais negativo para maximização
            let valorMaisNegativo = 0;
            for (let j = 0; j < linhaObjetivo.length - 1; j++) {
                if (linhaObjetivo[j] < valorMaisNegativo) {
                    valorMaisNegativo = linhaObjetivo[j];
                    colunaPivo = j;
                }
            }
        } else { // Minimização
            // Seleciona o valor mais positivo para minimização
            let valorMaisPositivo = 0;
            for (let j = 0; j < linhaObjetivo.length - 1; j++) {
                if (linhaObjetivo[j] > valorMaisPositivo) {
                    valorMaisPositivo = linhaObjetivo[j];
                    colunaPivo = j;
                }
            }
        }

        return colunaPivo;
    }

    function escolherLinhaPivo(colunaPivo) {
        let linhaPivo = -1;
        let menorRazao = Infinity;

        // Seleciona a linha com a menor razão positiva entre RHS e valor na coluna pivô
        for (let i = 1; i < tabelaSimplex.length; i++) {
            const valorLinha = tabelaSimplex[i][colunaPivo];
            if (valorLinha > 0) {
                const razao = tabelaSimplex[i][tabelaSimplex[i].length - 1] / valorLinha; // RHS / valor na coluna pivô
                if (razao < menorRazao) {
                    menorRazao = razao;
                    linhaPivo = i;
                }
            }
        }

        return linhaPivo;
    }

    function realizarIteracao(colunaPivo, linhaPivo) {
        const pivo = tabelaSimplex[linhaPivo][colunaPivo];

        // Normaliza a linha pivô
        for (let j = 0; j < tabelaSimplex[linhaPivo].length; j++) {
            tabelaSimplex[linhaPivo][j] /= pivo;
        }

        // Atualiza as outras linhas
        for (let i = 0; i < tabelaSimplex.length; i++) {
            if (i !== linhaPivo) {
                const fator = tabelaSimplex[i][colunaPivo];
                for (let j = 0; j < tabelaSimplex[i].length; j++) {
                    tabelaSimplex[i][j] -= fator * tabelaSimplex[linhaPivo][j];
                }
            }
        }
    }

    function mostrarResultadoFinal() {
        const resultadoContainer = document.getElementById('tabela-container');
        const linhaObjetivo = tabelaSimplex[0];
    
        // Inicializa um array para armazenar os valores das variáveis de decisão
        const valoresVariaveis = Array(numVariaveis).fill(0);
    
        // Identifica quais variáveis são básicas e armazena o valor da RHS correspondente
        for (let i = 1; i < tabelaSimplex.length; i++) {
            const linha = tabelaSimplex[i];
            const variavelBasica = variaveisBasicas[i - 1];
    
            // Se a variável básica atual é uma variável de decisão (x1, x2, ...), armazena seu valor
            const indiceVariavel = parseInt(variavelBasica.slice(1)) - 1;
            if (variavelBasica.startsWith("x") && indiceVariavel < numVariaveis) {
                valoresVariaveis[indiceVariavel] = linha[linha.length - 1]; // Armazena o valor da RHS
            }
        }
    
        // Exibe o valor de Z e os valores das variáveis de decisão
        let resultadoHTML = `
            <div class="resultado-container">
                <h2 class="resultado-titulo">Solução Ótima</h2>
                <p class="resultado-valor">Valor de Z: <strong>${linhaObjetivo[linhaObjetivo.length - 1].toFixed(2)}</strong></p>
                <ul class="variaveis-lista">
        `;
        for (let i = 0; i < numVariaveis; i++) {
            resultadoHTML += `<li class="variavel-item">x${i + 1} = <strong>${valoresVariaveis[i].toFixed(2)}</strong></li>`;
        }
        resultadoHTML += `
                </ul>
            </div>
        `;
    
        resultadoContainer.insertAdjacentHTML('beforeend', resultadoHTML);
    }

});
