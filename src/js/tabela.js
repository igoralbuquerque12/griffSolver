document.getElementById('confirmarBtn').addEventListener('click', function () {
    const qtdVariaveis = parseInt(document.getElementById('qtdVariaveis').value);
    const qtdRestricoes = parseInt(document.getElementById('qtdRestricoes').value);

    // Verificação de entradas válidas
    if (!qtdVariaveis || !qtdRestricoes || qtdVariaveis <= 0 || qtdRestricoes <= 0) {
        alert('Os campos "Quantidade de Variáveis" e "Quantidade de Restrições" não podem ser vazios ou iguais a zero.');
        return;
    }

    let tabelaHTML = `<table class="table-inicial">
        <thead>
            <tr>
                <th>Objetivo (Z)</th>`;

    // Cabeçalhos para cada variável de decisão
    for (let i = 1; i <= qtdVariaveis; i++) {
        tabelaHTML += `<th>x${i}</th>`;
    }

    tabelaHTML += `<th>&lt;, &gt; ou =</th><th>R.H.S</th></tr>
        </thead>
        <tbody>`;

    // Linha para o objetivo
    tabelaHTML += `<tr>
        <td>
            <select id="tipoObjetivo" class="custom-select form-control w-max-content">
                <option value="Maximizar">Maximizar</option>
                <option value="Minimizar">Minimizar</option>
            </select>
        </td>`;

    for (let i = 1; i <= qtdVariaveis; i++) {
        tabelaHTML += `<td><input type="number" class="custom-input form-control" id="coefObjetivo${i}" /></td>`;
    }
    tabelaHTML += `<td></td><td></td></tr>`;

    // Linhas para cada restrição
    for (let i = 1; i <= qtdRestricoes; i++) {
        tabelaHTML += `<tr>
            <td>Restrição ${i}</td>`;
        for (let j = 1; j <= qtdVariaveis; j++) {
            tabelaHTML += `<td><input type="number" class="custom-input form-control" id="coefRestricao${i}_${j}" /></td>`;
        }
        tabelaHTML += ` 
            <td>
                <select class="custom-select" id="operadorRestricao${i}">
                    <option value="<="><=</option>
                    <option value=">=">>=</option>
                    <option value="=">=</option>
                </select>
            </td>
            <td><input type="number" class="custom-input form-control" id="rhsRestricao${i}" /></td>
        </tr>`;
    }

    tabelaHTML += `</tbody></table>`;

    // Adiciona a tabela ao container
    const tabelaContainer = document.getElementById('tabela-container');
    tabelaContainer.innerHTML = tabelaHTML; // Limpa o contêiner anterior e adiciona nova tabela

    // Adiciona os botões "Tabular" e "Gráfico"
    let botoesHTML = `
    <div class="botoes-container">
        <button id="tabularBtn" class="btn btn-secondary">Tabular</button>
        <button id="graficoBtn" class="btn btn-secondary ${qtdVariaveis > 2 ? 'disabled' : ''}">Gráfico</button>
        <button id="dualSimplexBtn" class="btn btn-secondary">Dual Simplex</button>
    </div>
    `;
    tabelaContainer.insertAdjacentHTML('beforeend', botoesHTML);

    // Desabilita o botão "Gráfico" se houver mais de 2 variáveis
    const graficoBtn = document.getElementById('graficoBtn');
    if (qtdVariaveis > 2) {
        graficoBtn.disabled = true; // Desabilita o botão
        graficoBtn.title = "O gráfico só pode ser exibido para até 2 variáveis.";
    } else {
        graficoBtn.disabled = false;
        graficoBtn.title = "";
    }
    // Função para verificar se todos os campos obrigatórios estão preenchidos
    function camposPreenchidos() {
        // Verificar os coeficientes da função objetivo
        for (let i = 1; i <= qtdVariaveis; i++) {
            const coefObjetivo = document.getElementById(`coefObjetivo${i}`).value;
            if (coefObjetivo === "") {
                return false;
            }
        }

        // Verificar os coeficientes e o RHS de cada restrição
        for (let i = 1; i <= qtdRestricoes; i++) {
            for (let j = 1; j <= qtdVariaveis; j++) {
                const coefRestricao = document.getElementById(`coefRestricao${i}_${j}`).value;
                if (coefRestricao === "") {
                    return false;
                }
            }
            const rhs = document.getElementById(`rhsRestricao${i}`).value;
            if (rhs === "") {
                return false;
            }
        }
        
        return true; // Retorna verdadeiro se todos os campos estão preenchidos
    }

    // Função genérica para manipular o clique nos botões "Tabular" e "Gráfico"
function handleButtonClick(targetPage) {
    if (!camposPreenchidos()) {
        alert("Por favor, preencha todos os campos da tabela antes de continuar.");
        return;
    }

    // Captura os dados da função objetivo
    const tipoObjetivo = document.getElementById('tipoObjetivo').value;
    const coefObjetivo = [];
    
    for (let i = 1; i <= qtdVariaveis; i++) {
        coefObjetivo.push(parseFloat(document.getElementById(`coefObjetivo${i}`).value) || 0);
    }

    // Captura as restrições, com estrutura diferente para gráfico e tabular
    const restricoes = [];
    for (let i = 1; i <= qtdRestricoes; i++) {
        const coefRestricao = [];
        for (let j = 1; j <= qtdVariaveis; j++) {
            coefRestricao.push(parseFloat(document.getElementById(`coefRestricao${i}_${j}`).value) || 0);
        }
        const operador = document.getElementById(`operadorRestricao${i}`).value;
        const rhs = parseFloat(document.getElementById(`rhsRestricao${i}`).value) || 0;

        if (targetPage === 'grafico.html') {
            // Estrutura para o gráfico, considera apenas x1 e x2
            restricoes.push({
                coefX1: coefRestricao[0] || 0,
                coefX2: coefRestricao[1] || 0,
                coef: coefRestricao,
                operator: operador,
                rhs: rhs
            });
        } else {
            // Estrutura para tabular, considera todas as variáveis
            restricoes.push({
                coef: coefRestricao,
                operator: operador,
                rhs: rhs
            });
        }
    }

    // Salva os dados no localStorage
    localStorage.setItem('tipoObjetivo', tipoObjetivo);
    localStorage.setItem('coefObjetivo', JSON.stringify(coefObjetivo));
    localStorage.setItem('restricoes', JSON.stringify(restricoes));

    // Salva qtdVariaveis e qtdRestricoes no localStorage
    localStorage.setItem('qtdVariaveis', qtdVariaveis);
    localStorage.setItem('qtdRestricoes', qtdRestricoes);

    // Marca a intenção de modificar o problema
    localStorage.setItem('modificarProblema', 'true');

    // Navega para a página especificada
    window.location.href = targetPage;
}

    // Evento de clique para o botão "Gráfico"
    document.getElementById('graficoBtn').addEventListener('click', function () {
        handleButtonClick('grafico.html');
    });

    // Evento de clique para o botão "Tabular"
    document.getElementById('tabularBtn').addEventListener('click', function () {
        handleButtonClick('tabular.html');
    });

    // Evento de clique para o botão "Tabular"
    document.getElementById('dualSimplexBtn').addEventListener('click', function () {
        handleButtonClick('dual-simplex.html');
    });
});
