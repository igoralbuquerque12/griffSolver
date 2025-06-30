window.subscript = function (value) {
    let resultingString = '';
    const replaceArray = [
        '₀',
        '₁',
        '₂',
        '₃',
        '₄',
        '₅',
        '₆',
        '₇',
        '₈',
        '₉',
    ];
    const str = value.toString();
    for(const i in str) {
        resultingString += replaceArray[str[i]] ?? 0;
    }
    return resultingString;
}


window.mostrarTabelaSimplex = function (tabela, titulo, variaveis, base) {
    const linhaPivo = -1;
    const colunaPivo = -1;
    const isFinalIteration = -1;
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
    for (let i in variaveis) {
        if (i < variaveis.length - 1) {
            tabelaHTML += `<th>${variaveis[i]}</th>`;
        } else {
            tabelaHTML += `<th>RHS</th></tr></thead><tbody>`;
        }
    }


    // Linhas da tabela com rótulos das variáveis básicas
    const lastLine = tabela.length - 1;
    tabela.forEach((linha, index) => {
        tabelaHTML += `<tr>`;

        // Rótulo da linha para variáveis básicas
        if (index === lastLine) {
            tabelaHTML += `<th>Z</th>`; // Linha do objetivo
        } else {
            tabelaHTML += `<th>${base[index]}</th>`; // Variável básica atual
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


window.mostrarResultadoFinal = function (solucao, resultadoZ, titulo = 'Solução ótima') {
    const resultadoContainer = document.getElementById('tabela-container');
    // console.log(solucao, resultadoZ);

    // Exibe o valor de Z e os valores das variáveis de decisão
    let resultadoHTML = `
            <div class="resultado-container">
                <h2 class="resultado-titulo">${titulo}</h2>
                <p class="resultado-valor">Valor de Z: <strong>${Number.parseFloat(resultadoZ).toFixed(2)}</strong></p>
                <ul class="variaveis-lista">
        `;

    for (const variavel in solucao) {
        resultadoHTML += `<li class="variavel-item">${variavel} = <strong>${Number.parseFloat(solucao[variavel]).toFixed(2)}</strong></li>`;
    }
    resultadoHTML += `
                </ul>
            </div>
        `;

    resultadoContainer.insertAdjacentHTML('beforeend', resultadoHTML);
}
