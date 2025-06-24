/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/tabular.js":
/*!***************************!*\
  !*** ./src/js/tabular.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
document.addEventListener('DOMContentLoaded', function () {
  console.log("tabular.js carregado");
  var tipoObjetivo = localStorage.getItem('tipoObjetivo');
  var coefObjetivo = JSON.parse(localStorage.getItem('coefObjetivo'));
  var restricoes = JSON.parse(localStorage.getItem('restricoes'));
  if (!tipoObjetivo || !coefObjetivo || !restricoes) {
    alert("Dados incompletos no localStorage. Certifique-se de definir o problema de programação linear antes de acessar esta página.");
    return;
  }
  console.log("tipo:", tipoObjetivo);
  console.log("coeficientes:", coefObjetivo);
  console.log("restrições:", restricoes);
  var numVariaveis = coefObjetivo.length;
  var numRestricoes = restricoes.length;
  console.log("numero de variáveis:", numVariaveis);
  var tabelaSimplex = criarTabelaInicialSimplex();
  var iteracao = 0;
  variaveisBasicas = Array.from({
    length: numRestricoes
  }, function (_, i) {
    return "f".concat(i + 1);
  });
  verificarRestricoes(restricoes);
  function criarTabelaInicialSimplex() {
    var tabela = [];

    // Linha do objetivo (Z)
    var linhaObjetivo = coefObjetivo.map(function (c) {
      return -c;
    }); // Inverte os sinais para maximizar sempre

    for (var i = 0; i < numRestricoes; i++) {
      linhaObjetivo.push(0); // Zeros para variáveis de folga
    }
    linhaObjetivo.push(0); // RHS da linha Z
    tabela.push(linhaObjetivo);

    // Linhas das restrições
    restricoes.forEach(function (restricao, i) {
      if (!Array.isArray(restricao.coef)) {
        console.error("Erro: coeficientes n\xE3o \xE9 um array para a restri\xE7\xE3o ".concat(i, "."), restricao);
        return; // Pula essa restrição se o coeficiente não for um array
      }
      var linha = _toConsumableArray(restricao.coef);
      for (var j = 0; j < numRestricoes; j++) {
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
    var tabela = [];
    var penalidadeM = tipoObjetivo === "Maximizar" ? -1000 : 1000; // Penalidade M depende do objetivo
    var linhaObjetivo = Array(numVariaveis + numRestricoes + restricoes.length + 1).fill(0); // Linha Z inicial
    var variaveisArtificiais = []; // Índices das variáveis artificiais
    variaveisBasicas = []; // Variáveis básicas iniciais

    // Preenchendo as linhas de restrições
    restricoes.forEach(function (restricao, i) {
      var linha = Array(numVariaveis + numRestricoes + restricoes.length + 1).fill(0); // Linha inicial para a tabela

      // Coeficientes das variáveis de decisão
      restricao.coef.forEach(function (coef, j) {
        linha[j] = tipoObjetivo === "Maximizar" ? coef : -coef;
        linha[j] = Math.abs(linha[j]) < 1e-6 ? 0 : linha[j]; // Definir valores pequenos como zero
      });

      // Variáveis de folga, excesso ou artificiais
      if (restricao.operator === "<=") {
        linha[numVariaveis + i] = 1; // Variável de folga
        variaveisBasicas.push("f".concat(i + 1)); // Variável de folga entra como básica
      } else if (restricao.operator === ">=") {
        linha[numVariaveis + i] = -1; // Variável de folga
        linha[numVariaveis + numRestricoes + variaveisArtificiais.length] = 1; // Variável artificial
        variaveisArtificiais.push(numVariaveis + numRestricoes + variaveisArtificiais.length); // Adiciona o índice da variável artificial
        variaveisBasicas.push("a".concat(variaveisArtificiais.length)); // Variável artificial entra como básica
      } else if (restricao.operator === "=") {
        linha[numVariaveis + numRestricoes + variaveisArtificiais.length] = 1; // Variável artificial
        variaveisArtificiais.push(numVariaveis + numRestricoes + variaveisArtificiais.length); // Adiciona o índice da variável artificial
        variaveisBasicas.push("a".concat(variaveisArtificiais.length)); // Variável artificial entra como básica
      }

      // RHS (lado direito da restrição)
      linha[linha.length - 1] = restricao.rhs;
      tabela.push(linha);
    });

    // Linha Z (função objetivo)
    coefObjetivo.forEach(function (coef, j) {
      linhaObjetivo[j] = tipoObjetivo === "Maximizar" ? -coef : coef; // Para maximizar, -c; para minimizar, +c
    });

    // Ajuste da linha Z com base nas variáveis artificiais
    variaveisArtificiais.forEach(function (indiceArtificial) {
      tabela.forEach(function (linha) {
        if (linha[indiceArtificial] === 1) {
          for (var j = 0; j < linhaObjetivo.length - (numRestricoes + 1); j++) {
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
    tabela.forEach(function (linha, index) {
      // Verifica se a coluna inteira é composta apenas por zeros
      linha.forEach(function (valor, colunaIndex) {
        var isColunaZerada = tabela.every(function (l) {
          return l[colunaIndex] === 0;
        }); // Verifica se todas as linhas dessa coluna são zero
        if (isColunaZerada) {
          // Remover a coluna zerada de todas as linhas
          tabela.forEach(function (linha) {
            linha.splice(colunaIndex, 1);
          });
          // Remover o índice da variável básica correspondente
          if (index === 0) {
            variaveisBasicas.splice(colunaIndex, 1);
          }
        }
      });
    });
    return {
      tabela: tabela,
      variaveisBasicas: variaveisBasicas
    }; // Retorna a tabela e as variáveis básicas
  }
  function criarTabelaInicialBigMin() {
    var tabela = [];
    var penalidadeM = tipoObjetivo === "Maximizar" ? -1000 : 1000; // Penalidade M depende do objetivo
    var linhaObjetivo = Array(numVariaveis + numRestricoes + restricoes.length + 1).fill(0); // Linha Z inicial
    var variaveisArtificiais = []; // Índices das variáveis artificiais
    variaveisBasicas = []; // Variáveis básicas iniciais

    // Preenchendo as linhas de restrições
    restricoes.forEach(function (restricao, i) {
      var linha = Array(numVariaveis + numRestricoes + restricoes.length + 1).fill(0); // Linha inicial para a tabela

      // Coeficientes das variáveis de decisão
      restricao.coef.forEach(function (coef, j) {
        linha[j] = tipoObjetivo === "Maximizar" ? -coef : coef;
        linha[j] = Math.abs(linha[j]) < 1e-6 ? 0 : linha[j]; // Definir valores pequenos como zero
      });

      // Variáveis de folga, excesso ou artificiais
      if (restricao.operator === "<=") {
        linha[numVariaveis + i] = 1; // Variável de folga
        variaveisBasicas.push("f".concat(i + 1)); // Variável de folga entra como básica
      } else if (restricao.operator === ">=") {
        linha[numVariaveis + i] = -1; // Variável de folga
        linha[numVariaveis + numRestricoes + variaveisArtificiais.length] = 1; // Variável artificial
        variaveisArtificiais.push(numVariaveis + numRestricoes + variaveisArtificiais.length); // Adiciona o índice da variável artificial
        variaveisBasicas.push("a".concat(variaveisArtificiais.length)); // Variável artificial entra como básica
      } else if (restricao.operator === "=") {
        linha[numVariaveis + numRestricoes + variaveisArtificiais.length] = 1; // Variável artificial
        variaveisArtificiais.push(numVariaveis + numRestricoes + variaveisArtificiais.length); // Adiciona o índice da variável artificial
        variaveisBasicas.push("a".concat(variaveisArtificiais.length)); // Variável artificial entra como básica
      }

      // RHS (lado direito da restrição)
      linha[linha.length - 1] = restricao.rhs;
      tabela.push(linha);
    });

    // Linha Z (função objetivo)
    coefObjetivo.forEach(function (coef, j) {
      linhaObjetivo[j] = tipoObjetivo === "Maximizar" ? coef : -coef; // Para maximizar, -c; para minimizar, +c
    });

    // Ajuste da linha Z com base nas variáveis artificiais
    variaveisArtificiais.forEach(function (indiceArtificial) {
      tabela.forEach(function (linha) {
        if (linha[indiceArtificial] === 1) {
          for (var j = 0; j < linhaObjetivo.length - (numRestricoes + 1); j++) {
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
    tabela.forEach(function (linha, index) {
      // Verifica se a coluna inteira é composta apenas por zeros
      linha.forEach(function (valor, colunaIndex) {
        var isColunaZerada = tabela.every(function (l) {
          return l[colunaIndex] === 0;
        }); // Verifica se todas as linhas dessa coluna são zero
        if (isColunaZerada) {
          // Remover a coluna zerada de todas as linhas
          tabela.forEach(function (linha) {
            linha.splice(colunaIndex, 1);
          });
          // Remover o índice da variável básica correspondente
          if (index === 0) {
            variaveisBasicas.splice(colunaIndex, 1);
          }
        }
      });
    });
    return {
      tabela: tabela,
      variaveisBasicas: variaveisBasicas
    }; // Retorna a tabela e as variáveis básicas
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
    var _criarTabelaInicialBi = criarTabelaInicialBigMax(),
      tabela = _criarTabelaInicialBi.tabela,
      variaveisBasicas = _criarTabelaInicialBi.variaveisBasicas; // Obtém a tabela e as variáveis básicas
    var iteracao = 0;
    while (true) {
      var colunaPivo = escolherColunaPivoBigM(tabela);
      var isFinalIteration = colunaPivo < 0;
      var linhaPivo = !isFinalIteration ? escolherLinhaPivoBigM(tabela, colunaPivo) : -1;
      if (!isFinalIteration && linhaPivo < 0) {
        alert('Problema não possui solução viável!');
        return;
      }

      // Exibe a tabela antes de realizar a iteração
      mostrarTabelaBigM(tabela, "Itera\xE7\xE3o ".concat(iteracao), linhaPivo, colunaPivo);
      if (isFinalIteration) {
        mostrarResultadoFinalBigM(tabela, variaveisBasicas);
        break;
      }

      // Realiza a iteração do método Simplex
      realizarIteracaoBigM(tabela, colunaPivo, linhaPivo);

      // Atualiza as variáveis básicas
      variaveisBasicas[linhaPivo - 1] = tipoObjetivo === "Maximizar" ? "x".concat(colunaPivo + 1) : "x".concat(colunaPivo + 1);
      iteracao++; // Incrementa o contador de iterações
    }
  }
  function executarBigMin() {
    var _criarTabelaInicialBi2 = criarTabelaInicialBigMin(),
      tabela = _criarTabelaInicialBi2.tabela,
      variaveisBasicas = _criarTabelaInicialBi2.variaveisBasicas; // Obtém a tabela e as variáveis básicas
    var iteracao = 0;
    while (true) {
      var colunaPivo = escolherColunaPivoBigM(tabela);
      var isFinalIteration = colunaPivo < 0;
      var linhaPivo = !isFinalIteration ? escolherLinhaPivoBigM(tabela, colunaPivo) : -1;
      if (!isFinalIteration && linhaPivo < 0) {
        alert('Problema não possui solução viável!');
        return;
      }

      // Exibe a tabela antes de realizar a iteração
      mostrarTabelaBigM(tabela, "Itera\xE7\xE3o ".concat(iteracao), linhaPivo, colunaPivo);
      if (isFinalIteration) {
        mostrarResultadoFinalBigM(tabela, variaveisBasicas);
        break;
      }
      // Realiza a iteração do método Simplex
      realizarIteracaoBigM(tabela, colunaPivo, linhaPivo);

      // Atualiza as variáveis básicas
      variaveisBasicas[linhaPivo - 1] = tipoObjetivo === "Maximizar" ? "x".concat(colunaPivo + 1) : "x".concat(colunaPivo + 1);
      iteracao++;
    }
  }
  function mostrarTabelaBigM(tabela, titulo) {
    var linhaPivo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
    var colunaPivo = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : -1;
    var isFinalIteration = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    var tabelaContainer = document.getElementById('tabela-container');
    if (!tabelaContainer) {
      console.error("Contêiner para a tabela não encontrado.");
      return;
    }

    // Cabeçalho da tabela
    var tabelaHTML = "<h2 class=\"tabela-titulo\">".concat(titulo, "</h2><table class=\"table\"><thead><tr><th></th>");

    // Adiciona cabeçalhos para variáveis de decisão
    for (var i = 0; i < numVariaveis; i++) {
      tabelaHTML += "<th>x".concat(i + 1, "</th>");
    }

    // Adiciona cabeçalhos para variáveis de folga e artificiais
    var artificialCount = 1;
    for (var _i = numVariaveis; _i < tabela[0].length - 1; _i++) {
      if (_i < numVariaveis + numRestricoes) {
        // Variáveis de folga
        tabelaHTML += "<th>f".concat(_i - numVariaveis + 1, "</th>");
      } else {
        // Variáveis artificiais
        tabelaHTML += "<th>a".concat(artificialCount, "</th>");
        artificialCount++;
      }
    }

    // Adiciona a coluna RHS
    tabelaHTML += "<th>RHS</th></tr></thead><tbody>";

    // Corpo da tabela
    tabela.forEach(function (linha, index) {
      tabelaHTML += "<tr>";

      // Define a célula inicial (linha Z ou variáveis básicas)
      if (index === 0) {
        tabelaHTML += "<th>Z</th>";
      } else {
        tabelaHTML += "<th>".concat(variaveisBasicas[index - 1], "</th>");
      }

      // Preenche as células da tabela, excluindo as colunas indesejadas
      linha.forEach(function (celula, colIndex) {
        var classeCelula = "";
        if (!isFinalIteration) {
          if (index === linhaPivo && index !== isFinalIteration) classeCelula = 'linha-highlight';
          if (colIndex === colunaPivo) classeCelula = 'coluna-highlight';
        }
        tabelaHTML += "<td class=\"".concat(classeCelula, "\">").concat(celula.toFixed(2), "</td>");
      });
      tabelaHTML += "</tr>";
    });
    tabelaHTML += "</tbody></table>";
    tabelaContainer.insertAdjacentHTML('beforeend', tabelaHTML);
  }
  function escolherColunaPivoBigM(tabela) {
    var linhaObjetivo = tabela[0];
    var colunaPivo = -1;
    var valorMaisNegativo = 0;
    var valorMaisPositivo = 0;
    if (tipoObjetivo === "Maximizar") {
      for (var j = 0; j < linhaObjetivo.length - 1; j++) {
        linhaObjetivo[j] = Math.abs(linhaObjetivo[j]) < 1e-6 ? 0 : linhaObjetivo[j];
        if (linhaObjetivo[j] < valorMaisNegativo) {
          valorMaisNegativo = linhaObjetivo[j];
          colunaPivo = j;
        }
      }
      // A coluna pivô só deve ser escolhida se o valor for estritamente negativo
      if (valorMaisNegativo >= 0) {
        colunaPivo = -1; // Se não houver valores negativos, não há mais colunas válidas para pivô
      }
    } else {
      for (var _j = 0; _j < linhaObjetivo.length - 1; _j++) {
        linhaObjetivo[_j] = Math.abs(linhaObjetivo[_j]) < 1e-6 ? 0 : linhaObjetivo[_j];
        if (linhaObjetivo[_j] > valorMaisPositivo) {
          valorMaisPositivo = linhaObjetivo[_j];
          colunaPivo = _j;
        }
      }
      // A coluna pivô só deve ser escolhida se o valor for estritamente positivo
      if (valorMaisPositivo <= 0) {
        colunaPivo = -1; // Se não houver valores positivos, não há mais colunas válidas para pivô
      }
    }
    console.log("Coluna piv\xF4 escolhida: ".concat(colunaPivo));
    return colunaPivo;
  }
  function escolherLinhaPivoBigM(tabela, colunaPivo) {
    var linhaPivo = -1;
    var menorRazao = Infinity;
    for (var i = 1; i < tabela.length; i++) {
      var valorLinha = tabela[i][colunaPivo];
      if (valorLinha > 0) {
        var razao = tabela[i][tabela[i].length - 1] / valorLinha; // RHS / valor na coluna pivô.
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
    var numLinhas = tabela.length;
    var numColunas = tabela[0].length; // Garante que estamos usando o número correto de colunas
    var valorPivo = tabela[linhaPivo][colunaPivo];
    if (!valorPivo || isNaN(valorPivo)) {
      console.error("Erro: Valor do piv\xF4 inv\xE1lido na posi\xE7\xE3o (".concat(linhaPivo, ", ").concat(colunaPivo, ")"));
      return;
    }

    // Normaliza a linha pivô
    for (var j = 0; j < numColunas; j++) {
      tabela[linhaPivo][j] /= valorPivo;
    }

    // Atualiza as outras linhas
    for (var i = 0; i < numLinhas; i++) {
      if (i !== linhaPivo) {
        var fator = tabela[i][colunaPivo];
        for (var _j2 = 0; _j2 < numColunas; _j2++) {
          tabela[i][_j2] -= fator * tabela[linhaPivo][_j2];
        }
      }
    }
    console.log("Itera\xE7\xE3o realizada com sucesso: Coluna Piv\xF4 (".concat(colunaPivo, "), Linha Piv\xF4 (").concat(linhaPivo, ")"));
    console.table(tabela);
  }
  function mostrarResultadoFinalBigM(tabela, variaveisBasicas) {
    var resultadoContainer = document.getElementById('tabela-container');
    var linhaObjetivo = tabela[0]; // A primeira linha contém os valores da função objetivo

    // Inicializa um array para armazenar os valores das variáveis de decisão
    var valoresVariaveis = Array(numVariaveis).fill(0);

    // Identifica quais variáveis são básicas e armazena o valor da RHS correspondente
    for (var i = 1; i < tabela.length; i++) {
      var linha = tabela[i];
      var variavelBasica = variaveisBasicas[i - 1];

      // Verifica se a variável básica é uma variável de decisão (x1, x2, ...) e armazena o valor
      var indiceVariavel = parseInt(variavelBasica.slice(1)) - 1;
      if (variavelBasica.startsWith("x") && indiceVariavel < numVariaveis) {
        valoresVariaveis[indiceVariavel] = linha[linha.length - 1]; // RHS (última coluna)
      }
    }

    // Exibe o valor de Z e os valores das variáveis de decisão
    var resultadoHTML = "\n            <div class=\"resultado-container\">\n                <h2 class=\"resultado-titulo\">Solu\xE7\xE3o \xD3tima</h2>\n                <p class=\"resultado-valor\">Valor de Z: <strong>".concat(linhaObjetivo[linhaObjetivo.length - 1].toFixed(2), "</strong></p>\n                <ul class=\"variaveis-lista\">\n        ");
    for (var _i2 = 0; _i2 < numVariaveis; _i2++) {
      resultadoHTML += "<li class=\"variavel-item\">x".concat(_i2 + 1, " = <strong>").concat(valoresVariaveis[_i2].toFixed(2), "</strong></li>");
    }
    resultadoHTML += "\n                </ul>\n            </div>\n        ";
    resultadoContainer.insertAdjacentHTML('beforeend', resultadoHTML);
  }
  function verificarRestricoes(restricoes) {
    var operadores = restricoes.map(function (r) {
      return r.operator;
    });
    var todosMenorOuIgual = operadores.every(function (op) {
      return op === "<=";
    });
    if (todosMenorOuIgual) {
      var _tabelaSimplex = criarTabelaInicialSimplex();
      executarSimplex(_tabelaSimplex); // Nenhuma variável artificial é necessária
    } else {
      var tabelaInicial = criarTabelaInicialBigM(); // Criação da tabela inicial para Big M
      executarBigM(tabelaInicial); // Passa a tabela inicial para o método Big M
    }
  }
  function mostrarTabelaSimplex(tabela, titulo) {
    var linhaPivo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
    var colunaPivo = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : -1;
    var isFinalIteration = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    var tabelaContainer = document.getElementById('tabela-container');
    if (!tabelaContainer) {
      console.error("Contêiner para a tabela não encontrado.");
      return;
    }

    // Adiciona nova tabela sem limpar o contêiner para manter todas as iterações
    var tabelaHTML = "<div class=\"tabela-iteracao\">\n            <h3 class=\"tabela-titulo\">".concat(titulo, "</h3>\n            <div class=\"tabela-wrapper\">\n                <table class=\"table\">");
    // Cabeçalho da tabela
    tabelaHTML += '<tr><th></th>';
    for (var i = 0; i < numVariaveis; i++) {
      tabelaHTML += "<th>x".concat(i + 1, "</th>");
    }
    for (var _i3 = 0; _i3 < numRestricoes; _i3++) {
      tabelaHTML += "<th>f".concat(_i3 + 1, "</th>");
    }
    tabelaHTML += "<th>RHS</th></tr></thead><tbody>";

    // Linhas da tabela com rótulos das variáveis básicas
    tabela.forEach(function (linha, index) {
      tabelaHTML += "<tr>";

      // Rótulo da linha para variáveis básicas
      if (index === 0) {
        tabelaHTML += "<th>Z</th>"; // Linha do objetivo
      } else {
        tabelaHTML += "<th>".concat(variaveisBasicas[index - 1], "</th>"); // Variável básica atual
      }

      // Itera sobre cada coluna da linha, incluindo o RHS
      linha.forEach(function (celula, colIndex) {
        // Aplica a classe de destaque apenas se não for a última iteração
        var classeCelula = '';
        if (!isFinalIteration) {
          if (index === linhaPivo) classeCelula = 'linha-highlight';
          if (colIndex === colunaPivo) classeCelula = 'coluna-highlight';
        }
        tabelaHTML += "<td class=\"".concat(classeCelula, "\">").concat(celula.toFixed(2), "</td>");
      });
      tabelaHTML += "</tr>";
    });
    tabelaHTML += "</tbody></table></div></div>";
    tabelaContainer.insertAdjacentHTML('beforeend', tabelaHTML);
  }
  function executarSimplex() {
    iteracao = 0;
    while (true) {
      var colunaPivo = escolherColunaPivo();
      var isFinalIteration = colunaPivo < 0; // Verifica se é a última iteração

      var linhaPivo = !isFinalIteration ? escolherLinhaPivo(colunaPivo) : -1;
      if (!isFinalIteration && linhaPivo < 0) {
        alert('Problema não possui solução viável!');
        return;
      }

      // Exibe a tabela a partir da iteração 0, com destaque na linha e coluna pivô
      mostrarTabelaSimplex(tabelaSimplex, "Itera\xE7\xE3o ".concat(iteracao), linhaPivo, colunaPivo, isFinalIteration);
      if (isFinalIteration) break; // Otimalidade alcançada, sai do loop

      // Troca a variável que entra na base
      variaveisBasicas[linhaPivo - 1] = "x".concat(colunaPivo + 1); // Atualiza a variável básica da linha pivô

      realizarIteracao(colunaPivo, linhaPivo);
      iteracao++;
    }
    mostrarResultadoFinal();
  }
  function escolherColunaPivo() {
    var linhaObjetivo = tabelaSimplex[0];
    var colunaPivo = -1;
    if (tipoObjetivo === "Maximizar") {
      // Seleciona o valor mais negativo para maximização
      var valorMaisNegativo = 0;
      for (var j = 0; j < linhaObjetivo.length - 1; j++) {
        if (linhaObjetivo[j] < valorMaisNegativo) {
          valorMaisNegativo = linhaObjetivo[j];
          colunaPivo = j;
        }
      }
    } else {
      // Minimização
      // Seleciona o valor mais positivo para minimização
      var valorMaisPositivo = 0;
      for (var _j3 = 0; _j3 < linhaObjetivo.length - 1; _j3++) {
        if (linhaObjetivo[_j3] > valorMaisPositivo) {
          valorMaisPositivo = linhaObjetivo[_j3];
          colunaPivo = _j3;
        }
      }
    }
    return colunaPivo;
  }
  function escolherLinhaPivo(colunaPivo) {
    var linhaPivo = -1;
    var menorRazao = Infinity;

    // Seleciona a linha com a menor razão positiva entre RHS e valor na coluna pivô
    for (var i = 1; i < tabelaSimplex.length; i++) {
      var valorLinha = tabelaSimplex[i][colunaPivo];
      if (valorLinha > 0) {
        var razao = tabelaSimplex[i][tabelaSimplex[i].length - 1] / valorLinha; // RHS / valor na coluna pivô
        if (razao < menorRazao) {
          menorRazao = razao;
          linhaPivo = i;
        }
      }
    }
    return linhaPivo;
  }
  function realizarIteracao(colunaPivo, linhaPivo) {
    var pivo = tabelaSimplex[linhaPivo][colunaPivo];

    // Normaliza a linha pivô
    for (var j = 0; j < tabelaSimplex[linhaPivo].length; j++) {
      tabelaSimplex[linhaPivo][j] /= pivo;
    }

    // Atualiza as outras linhas
    for (var i = 0; i < tabelaSimplex.length; i++) {
      if (i !== linhaPivo) {
        var fator = tabelaSimplex[i][colunaPivo];
        for (var _j4 = 0; _j4 < tabelaSimplex[i].length; _j4++) {
          tabelaSimplex[i][_j4] -= fator * tabelaSimplex[linhaPivo][_j4];
        }
      }
    }
  }
  function mostrarResultadoFinal() {
    var resultadoContainer = document.getElementById('tabela-container');
    var linhaObjetivo = tabelaSimplex[0];

    // Inicializa um array para armazenar os valores das variáveis de decisão
    var valoresVariaveis = Array(numVariaveis).fill(0);

    // Identifica quais variáveis são básicas e armazena o valor da RHS correspondente
    for (var i = 1; i < tabelaSimplex.length; i++) {
      var linha = tabelaSimplex[i];
      var variavelBasica = variaveisBasicas[i - 1];

      // Se a variável básica atual é uma variável de decisão (x1, x2, ...), armazena seu valor
      var indiceVariavel = parseInt(variavelBasica.slice(1)) - 1;
      if (variavelBasica.startsWith("x") && indiceVariavel < numVariaveis) {
        valoresVariaveis[indiceVariavel] = linha[linha.length - 1]; // Armazena o valor da RHS
      }
    }

    // Exibe o valor de Z e os valores das variáveis de decisão
    var resultadoHTML = "\n            <div class=\"resultado-container\">\n                <h2 class=\"resultado-titulo\">Solu\xE7\xE3o \xD3tima</h2>\n                <p class=\"resultado-valor\">Valor de Z: <strong>".concat(linhaObjetivo[linhaObjetivo.length - 1].toFixed(2), "</strong></p>\n                <ul class=\"variaveis-lista\">\n        ");
    for (var _i4 = 0; _i4 < numVariaveis; _i4++) {
      resultadoHTML += "<li class=\"variavel-item\">x".concat(_i4 + 1, " = <strong>").concat(valoresVariaveis[_i4].toFixed(2), "</strong></li>");
    }
    resultadoHTML += "\n                </ul>\n            </div>\n        ";
    resultadoContainer.insertAdjacentHTML('beforeend', resultadoHTML);
  }
});

/***/ }),

/***/ 2:
/*!*********************************!*\
  !*** multi ./src/js/tabular.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/lucas/Documents/Projetos/Academicos/griffSolver/src/js/tabular.js */"./src/js/tabular.js");


/***/ })

/******/ });