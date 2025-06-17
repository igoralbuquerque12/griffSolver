document.addEventListener('DOMContentLoaded', function () {
    const tipoObjetivo = localStorage.getItem('tipoObjetivo')?.toLowerCase() === 'maximizar' ? 'maximize' : 'minimize';
    const coefObjetivo = JSON.parse(localStorage.getItem('coefObjetivo') || '[]');
    const restricoes = JSON.parse(localStorage.getItem('restricoes') || '[]');

    // Adding x >= 0 and y >= 0 constraints (non-negativity)
    restricoes.unshift(
        { coefX1: 1, coefX2: 0, rhs: 0, operator: '>=' }, // x >= 0
        { coefX1: 0, coefX2: 1, rhs: 0, operator: '>=' }  // y >= 0
    );

    const allIntersections = []; // To store all intersections
    const feasibleIntersections = []; // To store feasible intersections only

    // Generate intersections between constraints
    for (let i = 0; i < restricoes.length - 1; i++) {
        for (let j = i + 1; j < restricoes.length; j++) {
            const intersecao = encontrarIntersecao(restricoes[i], restricoes[j]);
            if (intersecao) {
                allIntersections.push(intersecao); // Add all intersections
                if (verificarRestricoes(intersecao, restricoes)) {
                    feasibleIntersections.push(intersecao); // Only feasible intersections
                }
            }
        }
    }

    // Add intersections with the x-axis (y = 0) and y-axis (x = 0) for each constraint
    restricoes.forEach(restricao => {
        const eixoX = intersecaoComEixoX(restricao); // Intersection with y = 0
        const eixoY = intersecaoComEixoY(restricao); // Intersection with x = 0
        if (eixoX) {
            allIntersections.push(eixoX);
            if (verificarRestricoes(eixoX, restricoes)) feasibleIntersections.push(eixoX);
        }
        if (eixoY) {
            allIntersections.push(eixoY);
            if (verificarRestricoes(eixoY, restricoes)) feasibleIntersections.push(eixoY);
        }
    });

    // Remove duplicates from allIntersections and feasibleIntersections
    const uniqueAllIntersections = Array.from(new Set(allIntersections.map(p => JSON.stringify(p))))
        .map(str => JSON.parse(str));
    const uniqueFeasibleIntersections = Array.from(new Set(feasibleIntersections.map(p => JSON.stringify(p))))
        .map(str => JSON.parse(str));

    const xValues = uniqueAllIntersections.map(p => p.x);
    const yValues = uniqueAllIntersections.map(p => p.y);

    const xMax = Math.max(...xValues) + 1; // Adiciona um buffer de 1 para visualizar melhor
    const yMax = Math.max(...yValues) + 1; // Adiciona um buffer de 1 para visualizar melhor
    const xMin = Math.max(Math.min(...xValues) - 1, 0);
    const yMin = Math.max(Math.min(...yValues) - 1, 0);

    
    const traces = [];

    // Plot all intersections as grey markers
    traces.push({
        type: 'scatter',
        mode: 'markers',
        x: uniqueAllIntersections.map(p => p.x),
        y: uniqueAllIntersections.map(p => p.y),
        marker: { 
            color: 'rgba(128, 128, 128, 0.6)', 
            size: 6,
            line: {
                color: 'rgba(0, 0, 0, 0.3)',
                width: 1
            }
        },
        name: 'Todas as interseções'
    });

    // Determine the feasible region as a closed polygon
    if (uniqueFeasibleIntersections.length > 2) {
        const feasiblePolygon = ordenarPontos(uniqueFeasibleIntersections);

        traces.push({
            type: 'scatter',
            x: feasiblePolygon.map(p => p.x),
            y: feasiblePolygon.map(p => p.y),
            fill: 'toself',
            fillcolor: 'rgba(75, 192, 192, 0.2)',
            line: { 
                color: 'rgba(75, 192, 192, 0.8)',
                width: 2
            },
            name: 'Região viável'
        });
    }

    traces.push({
        type: 'scatter',
        mode: 'markers',
        x: uniqueFeasibleIntersections.map(p => p.x),
        y: uniqueFeasibleIntersections.map(p => p.y),
        marker: { 
            color: 'rgba(54, 162, 235, 0.8)', 
            size: 10,
            line: {
                color: 'rgba(54, 162, 235, 1)',
                width: 2
            }
        },
        name: 'Interseções viáveis'
    });

    // Generate line traces for each constraint
    restricoes.forEach((restricao) => {
        const trace = gerarLinhaRestricao(restricao, xMax, yMax);
        traces.push(trace);
    });

    // Find and plot the optimal point
    const pontoOtimo = encontrarPontoOtimo(uniqueFeasibleIntersections, coefObjetivo, tipoObjetivo);
    if (pontoOtimo && pontoOtimo.x !== undefined && pontoOtimo.y !== undefined) {
        const valorOtimo = coefObjetivo[0] * pontoOtimo.x + coefObjetivo[1] * pontoOtimo.y;
        // Verifica se existe solução múltipla
        const solucaoMultipla = verificarSolucaoMultipla(coefObjetivo, restricoes);
        
        if (solucaoMultipla) {
            document.getElementById("alerta-multipla").innerText = "Soluções múltiplas encontradas para este problema.";
        }
        traces.push({
            type: 'scatter',
            mode: 'markers',
            x: [pontoOtimo.x],
            y: [pontoOtimo.y],
            marker: { 
                color: 'rgba(255, 99, 132, 0.9)', 
                size: 14, 
                symbol: 'star',
                line: {
                    color: 'rgba(255, 99, 132, 1)',
                    width: 2
                }
            },
            text: `Solução Ótima = (${pontoOtimo.x.toFixed(2)}, ${pontoOtimo.y.toFixed(2)}), Z = ${valorOtimo.toFixed(2)}`,
            name: `Solução Ótima = ${valorOtimo.toFixed(2)}`
        });
        exibirSolucoesOtimas(pontoOtimo);
    } else {
        console.log("Nenhum ponto ótimo encontrado.");
    }

    
    function exibirSolucoesOtimas(pontoOtimo) {
    // Obter limites da região viável para buscar pontos inteiros
    const xMin = Math.floor(Math.min(...uniqueFeasibleIntersections.map(p => p.x)));
    const xMax = Math.ceil(Math.max(...uniqueFeasibleIntersections.map(p => p.x)));
    const yMin = Math.floor(Math.min(...uniqueFeasibleIntersections.map(p => p.y)));
    const yMax = Math.ceil(Math.max(...uniqueFeasibleIntersections.map(p => p.y)));

    let melhorPontoInteiro = null;
    let melhorValor = tipoObjetivo === 'maximize' ? -Infinity : Infinity;

    // Iterar sobre todos os pontos inteiros possíveis dentro dos limites
    for (let x = xMin; x <= xMax; x++) {
        for (let y = yMin; y <= yMax; y++) {
            const ponto = { x, y };

            // Verificar se o ponto está dentro da região viável
            if (verificarRestricoes(ponto, restricoes)) {
                const valorObjetivo = coefObjetivo[0] * ponto.x + coefObjetivo[1] * ponto.y;

                // Atualizar o melhor ponto baseado no objetivo
                if ((tipoObjetivo === 'maximize' && valorObjetivo > melhorValor) ||
                    (tipoObjetivo === 'minimize' && valorObjetivo < melhorValor)) {
                    melhorPontoInteiro = ponto;
                    melhorValor = valorObjetivo;
                }
            }
        }
    }
}


     // Calcular valores de Z para cada ponto de interseção viável
     const niveisZ = uniqueFeasibleIntersections.map(ponto => 
        coefObjetivo[0] * ponto.x + coefObjetivo[1] * ponto.y
    );

    // Gerar uma isocurva para cada valor Z correspondente aos pontos de interseção
    niveisZ.forEach((z, index ) => {
        const traceNivel = gerarIsocurva(coefObjetivo, z, xMax,yMax );
        traces.push(traceNivel);
    });

    const layout = {
        title: {
            text: 'Análise Gráfica de Programação Linear',
            font: { 
                size: 28, 
                color: '#2c3e50', 
                family: 'Roboto, sans-serif' 
            },
            xref: 'paper',
            x: 0.5,
            y: 0.95
        },
        xaxis: {
            title: {
                text: 'Eixo X (X1)',
                font: { 
                    size: 16, 
                    color: '#2c3e50',
                    family: 'Roboto, sans-serif'
                }
            },
            range: [xMin, xMax],
            showgrid: true,
            gridcolor: 'rgba(200, 200, 200, 0.2)',
            zeroline: true,
            zerolinecolor: 'rgba(0, 0, 0, 0.3)',
            zerolinewidth: 1,
            linecolor: '#2c3e50',
            linewidth: 2,
            tickfont: {
                family: 'Roboto, sans-serif',
                size: 12,
                color: '#2c3e50'
            }
        },
        yaxis: {
            title: {
                text: 'Eixo Y (X2)',
                font: { 
                    size: 16, 
                    color: '#2c3e50',
                    family: 'Roboto, sans-serif'
                }
            },
            range: [yMin, yMax],
            showgrid: true,
            gridcolor: 'rgba(200, 200, 200, 0.2)',
            zeroline: true,
            zerolinecolor: 'rgba(0, 0, 0, 0.3)',
            zerolinewidth: 1,
            linecolor: '#2c3e50',
            linewidth: 2,
            tickfont: {
                family: 'Roboto, sans-serif',
                size: 12,
                color: '#2c3e50'
            }
        },
        showlegend: true,
        legend: {
            font: { 
                size: 12, 
                color: '#2c3e50',
                family: 'Roboto, sans-serif'
            },
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            bordercolor: '#2c3e50',
            borderwidth: 1,
            x: 1.1,
            y: 1
        },
        width: 1000,
        height: 700,
        paper_bgcolor: 'rgba(255, 255, 255, 1)',
        plot_bgcolor: 'rgba(255, 255, 255, 1)',
        margin: {
            l: 80,
            r: 200,
            t: 100,
            b: 80
        }
    };
    Plotly.newPlot('grafico', traces, layout);
});


    // Função para verificar se há solução múltipla
    function verificarSolucaoMultipla(coefObjetivo, restricoes) {
        return restricoes.some(({ coefX1, coefX2 }) => {
            const proporcaoX = coefObjetivo[0] / coefX1;
            const proporcaoY = coefObjetivo[1] / coefX2;
            return Math.abs(proporcaoX - proporcaoY) < 0.0001; // Comparando as proporções
        });
    }

    function gerarIsocurva(coefObjetivo, z, xMax, yMax) {
        const trace = {
            type: 'scatter',
            mode: 'lines',
            name: `Z = ${z.toFixed(2)}`,
            line: { 
                color: 'rgba(255, 159, 64, 0.4)', 
                dash: 'dot',
                width: 1
            },
            x: [],
            y: []
        };

        if (coefObjetivo[1] !== 0) {
            for (let x = 0; x <= xMax; x += 0.1) {
                const y = (z - coefObjetivo[0] * x) / coefObjetivo[1];
                if (y >= 0 && y <= yMax) {
                    trace.x.push(x);
                    trace.y.push(y);
                }
            }
        }
        
        if (coefObjetivo[0] !== 0) {
            for (let y = 0; y <= yMax; y += 0.1) {
                const x = (z - coefObjetivo[1] * y) / coefObjetivo[0];
                if (x >= 0 && x <= xMax) {
                    trace.x.push(x);
                    trace.y.push(y);
                }
            }
        }

        return trace;
    }

    // Check if a point satisfies all constraints
    function verificarRestricoes(ponto, restricoes) {
        const tolerance = 0.001;
        return restricoes.every(({ coefX1, coefX2, rhs, operator }, index) => {
            const resultado = coefX1 * ponto.x + coefX2 * ponto.y;
            let restricaoValida;

            if (operator === '>=') {
                restricaoValida = resultado >= rhs - tolerance;
            } else if (operator === '<=') {
                restricaoValida = resultado <= rhs + tolerance;
            } else if (operator === '=') {
                restricaoValida = Math.abs(resultado - rhs) < tolerance;
            }

            console.log(`Ponto (${ponto.x}, ${ponto.y}), Restrição ${index + 1}:`,
                        `Resultado = ${resultado}, Operador = ${operator}, RHS = ${rhs}`,
                        `- Valido: ${restricaoValida}`);
            return restricaoValida;
        });
    }


    // Order points to form a closed polygon
    function ordenarPontos(pontos) {
        const centroide = pontos.reduce((acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y }), { x: 0, y: 0 });
        centroide.x /= pontos.length;
        centroide.y /= pontos.length;

        return pontos.sort((a, b) => {
            const angA = Math.atan2(a.y - centroide.y, a.x - centroide.x);
            const angB = Math.atan2(b.y - centroide.y, b.x - centroide.x);
            return angA - angB;
        });
    }

    // Generate line trace for a constraint
    function gerarLinhaRestricao(restricao, xMax, yMax) {
        const { coefX1, coefX2, rhs, operator } = restricao;
        const trace = {
            type: 'scatter',
            mode: 'lines',
            name: `${coefX1}X1 + ${coefX2}X2 ${operator} ${rhs}`,
            line: { 
                color: 'rgba(153, 102, 255, 0.7)', 
                width: 2,
                dash: 'dot'
            },
            x: [],
            y: []
        };

        

        if (Math.abs(coefX2) < 0.0001) {
            const x = rhs / coefX1;
            for (let y = 0; y <= yMax; y += 0.1) {
                trace.x.push(x);
                trace.y.push(y);
            }
        } else if (Math.abs(coefX1) < 0.0001) {
            const y = rhs / coefX2;
            for (let x = 0; x <= xMax; x += 0.1) {
                trace.x.push(x);
                trace.y.push(y);
            }
        } else {
            for (let x = 0; x <= xMax; x += 0.1) {
                const y = (rhs - coefX1 * x) / coefX2;
                trace.x.push(x);
                trace.y.push(y);
            }
        }
        return trace;
    }

    // Function to calculate intersection with x-axis (y = 0)
    function intersecaoComEixoX(restricao) {
        const { coefX1, coefX2, rhs } = restricao;
        if (coefX2 === 0) return null;
        const x = rhs / coefX1;
        return x >= 0 ? { x, y: 0 } : null;
    }

    // Function to calculate intersection with y-axis (x = 0)
    function intersecaoComEixoY(restricao) {
        const { coefX1, coefX2, rhs } = restricao;
        if (coefX1 === 0) return null;
        const y = rhs / coefX2;
        return y >= 0 ? { x: 0, y } : null;
    }

    // Find the optimal point based on the objective function
    function encontrarPontoOtimo(intersecoes, coefObjetivo, tipoObjetivo) {
        // Filtra pontos para descartar infinitos
        const intersecoesValidas = intersecoes.filter(ponto => 
            isFinite(ponto.x) && isFinite(ponto.y)
        );

        if (!intersecoesValidas.length) {
            console.log("Nenhum ponto de interseção viável encontrado.");
            return null;
        }

        let pontoOtimo = null;
        let valorOtimo = tipoObjetivo === 'maximize' ? -Infinity : Infinity;

        intersecoesValidas.forEach(ponto => {
            const valorAtual = coefObjetivo[0] * ponto.x + coefObjetivo[1] * ponto.y;
            console.log(`Analisando Ponto (${ponto.x}, ${ponto.y}): Valor da Função Objetivo = ${valorAtual}`);

            if ((tipoObjetivo === 'maximize' && valorAtual >= valorOtimo) ||
                (tipoObjetivo === 'minimize' && valorAtual <= valorOtimo)) {
                pontoOtimo = ponto;
                valorOtimo = valorAtual;
                console.log(`Novo ponto ótimo encontrado: (${ponto.x}, ${ponto.y}) com valor ${valorOtimo}`);
            }
        });

        if (!pontoOtimo) {
            console.log("Nenhum ponto ótimo encontrado. Verifique as restrições e os parâmetros.");
        } else {
            console.log("Ponto ótimo encontrado:", pontoOtimo);
        }

        return pontoOtimo;
    }


    // Generate a random color
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Function to find intersection between two constraints
    function encontrarIntersecao(restricao1, restricao2) {
        const a1 = restricao1.coefX1;
        const b1 = restricao1.coefX2;
        const c1 = restricao1.rhs;

        const a2 = restricao2.coefX1;
        const b2 = restricao2.coefX2;
        const c2 = restricao2.rhs;

        const det = a1 * b2 - a2 * b1;

        if (Math.abs(det) < 0.0001) {
            return null;
        }

        const x = (c1 * b2 - c2 * b1) / det;
        const y = (a1 * c2 - a2 * c1) / det;

        return { x, y };
}
