# GeoZebra - Solver de Programação Linear

![Logo do GeoZebra](logo.png)

## 📋 Descrição

GeoZebra é uma ferramenta web para resolução de problemas de Programação Linear, oferecendo tanto soluções numéricas quanto visualizações gráficas. O sistema implementa o algoritmo Simplex e o método Big-M, além de fornecer representações gráficas interativas das soluções.

## ✨ Funcionalidades

- **Solução Numérica**
  - Implementação do algoritmo Simplex
  - Método Big-M para problemas com restrições de igualdade
  - Suporte para maximização e minimização
  - Tratamento de diferentes tipos de restrições (≤, ≥, =)
  - Identificação de soluções múltiplas
  - Gerenciamento de variáveis de folga e artificiais

- **Visualização Gráfica**
  - Gráficos interativos usando Plotly.js
  - Cálculo automático de interseções entre restrições
  - Identificação da região viável
  - Visualização do ponto ótimo
  - Geração de isocurvas
  - Suporte para soluções inteiras

- **Interface Amigável**
  - Entrada de dados intuitiva
  - Validação de dados em tempo real
  - Visualização clara dos resultados
  - Suporte para múltiplas variáveis e restrições

## 🛠️ Tecnologias Utilizadas

- JavaScript
- HTML5
- CSS3
- Plotly.js

## 📁 Estrutura do Projeto

```
GeoZebra/
├── tabular.js      # Implementação do algoritmo Simplex
├── grafico.js      # Visualização gráfica com Plotly.js
├── tabela.js       # Interface de entrada de dados
├── styles.css      # Estilização da interface
└── logo.png        # Logo do sistema
```

## 🚀 Como Usar

1. Clone o repositório
2. Abra o arquivo `index.html` em seu navegador
3. Defina o número de variáveis e restrições
4. Insira os coeficientes da função objetivo e das restrições
5. Escolha entre maximização ou minimização
6. Visualize os resultados numéricos e gráficos

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- Igor Albuquerque
- Joaquim Atallah
- Rebeca Mendes
- Lucas Rocha
- Lucas Diniz
