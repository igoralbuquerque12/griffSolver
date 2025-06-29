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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/tabela.js":
/*!**************************!*\
  !*** ./src/js/tabela.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

document.getElementById('confirmarBtn').addEventListener('click', function () {
  var qtdVariaveis = parseInt(document.getElementById('qtdVariaveis').value);
  var qtdRestricoes = parseInt(document.getElementById('qtdRestricoes').value);

  // Verificação de entradas válidas
  if (!qtdVariaveis || !qtdRestricoes || qtdVariaveis <= 0 || qtdRestricoes <= 0) {
    alert('Os campos "Quantidade de Variáveis" e "Quantidade de Restrições" não podem ser vazios ou iguais a zero.');
    return;
  }
  var tabelaHTML = "<table class=\"table-inicial\">\n        <thead>\n            <tr>\n                <th>Objetivo (Z)</th>";

  // Cabeçalhos para cada variável de decisão
  for (var i = 1; i <= qtdVariaveis; i++) {
    tabelaHTML += "<th>x".concat(i, "</th>");
  }
  tabelaHTML += "<th>&lt;, &gt; ou =</th><th>R.H.S</th></tr>\n        </thead>\n        <tbody>";

  // Linha para o objetivo
  tabelaHTML += "<tr>\n        <td>\n            <select id=\"tipoObjetivo\" class=\"custom-select form-control w-max-content\">\n                <option value=\"Maximizar\">Maximizar</option>\n                <option value=\"Minimizar\">Minimizar</option>\n            </select>\n        </td>";
  for (var _i = 1; _i <= qtdVariaveis; _i++) {
    tabelaHTML += "<td><input type=\"number\" class=\"custom-input form-control\" id=\"coefObjetivo".concat(_i, "\" /></td>");
  }
  tabelaHTML += "<td></td><td></td></tr>";

  // Linhas para cada restrição
  for (var _i2 = 1; _i2 <= qtdRestricoes; _i2++) {
    tabelaHTML += "<tr>\n            <td>Restri\xE7\xE3o ".concat(_i2, "</td>");
    for (var j = 1; j <= qtdVariaveis; j++) {
      tabelaHTML += "<td><input type=\"number\" class=\"custom-input form-control\" id=\"coefRestricao".concat(_i2, "_").concat(j, "\" /></td>");
    }
    tabelaHTML += " \n            <td>\n                <select class=\"custom-select\" id=\"operadorRestricao".concat(_i2, "\">\n                    <option value=\"<=\"><=</option>\n                    <option value=\">=\">>=</option>\n                    <option value=\"=\">=</option>\n                </select>\n            </td>\n            <td><input type=\"number\" class=\"custom-input form-control\" id=\"rhsRestricao").concat(_i2, "\" /></td>\n        </tr>");
  }
  tabelaHTML += "</tbody></table>";

  // Adiciona a tabela ao container
  var tabelaContainer = document.getElementById('tabela-container');
  tabelaContainer.innerHTML = tabelaHTML; // Limpa o contêiner anterior e adiciona nova tabela

  // Adiciona os botões "Tabular" e "Gráfico"
  var botoesHTML = "\n    <div class=\"botoes-container\">\n        <button id=\"tabularBtn\" class=\"btn btn-secondary\">Tabular</button>\n        <button id=\"graficoBtn\" class=\"btn btn-secondary ".concat(qtdVariaveis > 2 ? 'disabled' : '', "\">Gr\xE1fico</button>\n        <button id=\"dualSimplexBtn\" class=\"btn btn-secondary\">Dual Simplex</button>\n    </div>\n    ");
  tabelaContainer.insertAdjacentHTML('beforeend', botoesHTML);

  // Desabilita o botão "Gráfico" se houver mais de 2 variáveis
  var graficoBtn = document.getElementById('graficoBtn');
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
    for (var _i3 = 1; _i3 <= qtdVariaveis; _i3++) {
      var coefObjetivo = document.getElementById("coefObjetivo".concat(_i3)).value;
      if (coefObjetivo === "") {
        return false;
      }
    }

    // Verificar os coeficientes e o RHS de cada restrição
    for (var _i4 = 1; _i4 <= qtdRestricoes; _i4++) {
      for (var _j = 1; _j <= qtdVariaveis; _j++) {
        var coefRestricao = document.getElementById("coefRestricao".concat(_i4, "_").concat(_j)).value;
        if (coefRestricao === "") {
          return false;
        }
      }
      var rhs = document.getElementById("rhsRestricao".concat(_i4)).value;
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
    var tipoObjetivo = document.getElementById('tipoObjetivo').value;
    var coefObjetivo = [];
    for (var _i5 = 1; _i5 <= qtdVariaveis; _i5++) {
      coefObjetivo.push(parseFloat(document.getElementById("coefObjetivo".concat(_i5)).value) || 0);
    }

    // Captura as restrições, com estrutura diferente para gráfico e tabular
    var restricoes = [];
    for (var _i6 = 1; _i6 <= qtdRestricoes; _i6++) {
      var coefRestricao = [];
      for (var _j2 = 1; _j2 <= qtdVariaveis; _j2++) {
        coefRestricao.push(parseFloat(document.getElementById("coefRestricao".concat(_i6, "_").concat(_j2)).value) || 0);
      }
      var operador = document.getElementById("operadorRestricao".concat(_i6)).value;
      var rhs = parseFloat(document.getElementById("rhsRestricao".concat(_i6)).value) || 0;
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

/***/ }),

/***/ 1:
/*!********************************!*\
  !*** multi ./src/js/tabela.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/lucas/Documents/Projetos/Academicos/griffSolver/src/js/tabela.js */"./src/js/tabela.js");


/***/ })

/******/ });