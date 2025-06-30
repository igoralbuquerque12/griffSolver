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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/dual-simplex.js":
/*!********************************!*\
  !*** ./src/js/dual-simplex.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_Problema__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/Problema */ "./src/js/modules/Problema.js");
/* harmony import */ var _support_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./support/helpers */ "./src/js/support/helpers.js");
/* harmony import */ var _support_helpers__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_support_helpers__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _support_tabelas_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./support/tabelas-html */ "./src/js/support/tabelas-html.js");
/* harmony import */ var _support_tabelas_html__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_support_tabelas_html__WEBPACK_IMPORTED_MODULE_2__);
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



var enable_logging = false;
function consoleLog() {
  if (enable_logging) {
    var _console;
    (_console = console).log.apply(_console, arguments);
  }
}
function consoleTable() {
  var tableData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  if (enable_logging) {
    console.table(tableData, properties);
  }
}
var ProblemaDual = /*#__PURE__*/function () {
  function ProblemaDual(problemaDual, problemaPrimal) {
    _classCallCheck(this, ProblemaDual);
    var objetivo = problemaDual.objetivo,
      restricoes = problemaDual.restricoes,
      rhsRestricoes = problemaDual.rhsRestricoes,
      variaveis = problemaDual.variaveis,
      metodo = problemaDual.metodo;
    this.primal = problemaPrimal;
    this.objetivo = objetivo;
    this.restricoes = restricoes;
    this.rhsRestricoes = rhsRestricoes;
    this.variaveis = variaveis;
    this.metodo = metodo;
  }

  /**
   * Transpõe e inverte o problema explicitamete
   * para o dual simplex
   * @param {Problema} problema 
   */
  return _createClass(ProblemaDual, [{
    key: "tabela",
    value: function tabela() {
      var tabela = this.restricoes.map(function (linha) {
        return _toConsumableArray(linha);
      });
      for (var i in tabela) {
        tabela[i].push(this.rhsRestricoes[i]);
      }
      tabela.push(_toConsumableArray(this.objetivo));
      return tabela;
    }
  }, {
    key: "getVars",
    value: function getVars() {
      var cols = [];
      for (var i in this.variaveis) {
        cols.push(this.variaveis[i].variavel);
      }
      cols.push('RHS');
      var rows = [];
      for (var _i in this.rhsRestricoes) {
        rows.push('s' + subscript(Number.parseInt(_i) + 1));
      }
      rows.push('Z');
      return {
        cols: cols,
        rows: rows
      };
    }
  }], [{
    key: "preparar",
    value: function preparar(problema) {
      var inverterCoefs = problema.tipo != 'Minimizar';
      var metodo = problema.tipo == 'Minimizar' ? 'Maximizar' : 'Minimizar';
      var indiceArtificial = problema.restricoes.reduce(function (acc, restricao) {
        var _restricao$coef;
        return Math.max(acc, ((_restricao$coef = restricao.coef) !== null && _restricao$coef !== void 0 ? _restricao$coef : []).length);
      }, 0);

      // Montar forma dual
      var coeficientesDuais = [];
      var restricoesDuais = Array.from({
        length: indiceArtificial
      }, function () {
        return [];
      });
      var variaveisDuais = [];
      var rhsDual = _toConsumableArray(problema.coeficientes).map(function (val) {
        return val * -1;
      });
      var indexDiff = 0;
      for (var i in problema.restricoes) {
        var restricao = problema.restricoes[i];
        var multiplicador = restricao.operator == '>=' ? -1 : 1;
        i = Number.parseInt(i);
        coeficientesDuais.push((inverterCoefs ? -1 : 1) * multiplicador * restricao.rhs);
        var novaVariavel = {
          variavel: "y".concat(subscript(i + 1)),
          indice: i + indexDiff,
          indiceRestricao: i,
          tipo: 'restrita'
        };
        if (restricao.operator == '=') {
          novaVariavel.tipo = 'irrestrita';
          novaVariavel.variavel += '⁺';
        }
        variaveisDuais.push(novaVariavel);
        for (var j in restricao.coef) {
          restricoesDuais[j][i + indexDiff] = (0 - multiplicador) * restricao.coef[j];
        }
        if (restricao.operator == '=') {
          indexDiff++;
          variaveisDuais.push({
            variavel: "y".concat(subscript(i + 1), "\u207B"),
            indice: i + indexDiff,
            indiceRestricao: i,
            tipo: 'espelho'
          });
          coeficientesDuais.push((0 - multiplicador) * restricao.rhs);
        }
      }
      // Preparando para algoritmo
      // Preenchendo variáveis com igualdade
      for (var _i2 in variaveisDuais) {
        var variavel = variaveisDuais[_i2];
        if (variavel.tipo == 'espelho') {
          for (var _j in restricoesDuais) {
            restricoesDuais[_j][variavel.indice] = 0 - restricoesDuais[_j][variavel.indice - 1];
          }
        }
      }
      // Adicionando variáveis de folga
      var colLength = restricoesDuais[0].length;
      var contVariaveisFolga = restricoesDuais.length;
      for (var _i3 = 0; _i3 <= contVariaveisFolga - 1; _i3++) {
        restricoesDuais[_i3] = restricoesDuais[_i3] = fillArrayEnd(restricoesDuais[_i3], contVariaveisFolga);
        restricoesDuais[_i3][colLength + _i3] = 1;
        coeficientesDuais.push(0);
        variaveisDuais.push({
          variavel: "s".concat(subscript(_i3 + 1)),
          indice: _i3,
          indiceRestricao: _i3,
          tipo: 'folga'
        });
      }
      // 0 do RHS
      coeficientesDuais.push(0);
      return {
        objetivo: coeficientesDuais,
        restricoes: restricoesDuais,
        rhsRestricoes: rhsDual,
        variaveis: variaveisDuais,
        metodo: metodo
      };
    }
  }, {
    key: "current",
    value: function current() {
      var problema = _modules_Problema__WEBPACK_IMPORTED_MODULE_0__["default"].current();
      return new ProblemaDual(this.preparar(problema), problema);
    }
  }]);
}();
var DualSimplexSolver = /*#__PURE__*/function () {
  function DualSimplexSolver(problemaDual) {
    _classCallCheck(this, DualSimplexSolver);
    this.problem = problemaDual;
    this.tableau = problemaDual.tabela();
    this.iter = 0;
    var _this$problem$getVars = this.problem.getVars(),
      cols = _this$problem$getVars.cols,
      rows = _this$problem$getVars.rows;
    this.initialCols = _toConsumableArray(cols);
    this.cols = cols.slice();
    this.rows = rows.slice();
    this.numberVariables = this.problem.restricoes.length;
    this.tableauRows = _toConsumableArray(rows).slice(0, rows.length - 1);
  }
  return _createClass(DualSimplexSolver, [{
    key: "printCurrent",
    value:
    // Imprime a tabela atual
    function printCurrent() {
      var _this = this;
      var header = ["BV"].concat(this.cols);
      var title = this.iter > 0 ? "Itera\xE7\xE3o ".concat(this.iter) : 'Forma dual';
      mostrarTabelaSimplex(this.tableau, title, this.initialCols, this.tableauRows);
      var table = this.tableau.map(function (row, i) {
        var obj = {
          BV: _this.rows[i]
        };
        _this.cols.forEach(function (c, j) {
          return obj[c] = row[j];
        });
        return obj;
      });
      consoleTable(table, header);
    }
  }, {
    key: "printSolution",
    value: function printSolution() {
      var primal = this.recuperarSolucaoPrimal();
      mostrarResultadoFinal(primal.solucaoPrimal, primal.z, 'Solução ótima primal');
    }

    // Executa uma iteração; retorna false se ótimo ou inviável
  }, {
    key: "step",
    value: function step() {
      var m = this.tableau.length - 1;
      var n = this.cols.length - 1;
      // Linha pivô: menor RHS (<0)
      var pivotRow = -1,
        minRhs = 0;
      for (var i = 0; i < m; i++) {
        var rhs = this.tableau[i][n];
        if (rhs < minRhs) {
          minRhs = rhs;
          pivotRow = i;
        }
      }
      if (pivotRow < 0) {
        consoleLog('Ótimo encontrado.');
        this.printSolution();
        return false;
      }
      // Coluna pivô: coef<0 na linha
      var pivotCol = -1,
        bestRatio = Infinity;
      for (var j = 0; j < n; j++) {
        var aij = this.tableau[pivotRow][j];
        if (aij < 0) {
          var zj = this.tableau[m][j];
          var ratio = Math.abs(zj / aij);
          if (ratio < bestRatio) {
            bestRatio = ratio;
            pivotCol = j;
          }
        }
      }
      if (pivotCol < 0) {
        console.error('Dual inviável.');
        return false;
      }
      // Pivotamento
      this.pivot(pivotRow, pivotCol);
      // Atualiza labels básicos
      var _ref = [this.cols[pivotCol], this.rows[pivotRow]];
      this.rows[pivotRow] = _ref[0];
      this.cols[pivotCol] = _ref[1];
      this.iter++;
      this.printCurrent();
      return true;
    }
  }, {
    key: "pivot",
    value: function pivot(row, col) {
      var m = this.tableau.length;
      var n = this.cols.length;
      var piv = this.tableau[row][col];
      // normaliza linha
      for (var j = 0; j < n; j++) this.tableau[row][j] /= piv;
      // zera colunas
      for (var i = 0; i < m; i++) {
        if (i !== row) {
          var factor = this.tableau[i][col];
          for (var _j2 = 0; _j2 < n; _j2++) {
            this.tableau[i][_j2] -= factor * this.tableau[row][_j2];
          }
        }
      }
      // Salva a variável que entrou na base
      this.tableauRows[row] = this.problem.variaveis[col].variavel;
    }
  }, {
    key: "solve",
    value: function solve() {
      this.printCurrent();
      while (this.step());
    }
  }, {
    key: "recuperarSolucaoPrimal",
    value: function recuperarSolucaoPrimal() {
      var _this2 = this;
      var primalProblem = this.problem.primal;
      var primalObjective = _toConsumableArray(primalProblem.coeficientes);
      var primalCols = primalObjective.map(function (coef, i) {
        return "x".concat(i + 1);
      });
      var restrictions = primalProblem.restricoes.map(function (restricao) {
        return _toConsumableArray(restricao.coef).concat([restricao.rhs, restricao.operator]);
      });
      var dualProblem = this.problem;
      var dualTableauRows = _toConsumableArray(this.rows);
      var dualTableauCols = [];
      var loadedCols = false;
      var dualTableau = _toConsumableArray(this.tableau).map(function (row) {
        var resultingRow = [];
        row.forEach(function (item, index) {
          var variable = dualProblem.variaveis[index];
          if ((variable === null || variable === void 0 ? void 0 : variable.tipo) != 'espelho') {
            if (!loadedCols && variable) {
              dualTableauCols.push(variable.variavel);
            }
            resultingRow.push(Number.parseFloat(item.toFixed(2)));
          }
        });
        loadedCols = true;
        return resultingRow;
      });
      dualTableauCols.push('RHS');

      // Construir sistema Ax = b
      // Função auxiliar (eliminação de Gauss)
      function resolverSistemaLinear(A, b) {
        var n = b.length;
        var M = A.map(function (row, i) {
          return row.concat(b[i]);
        });
        for (var i = 0; i < n; i++) {
          var maxRow = i;
          for (var k = i + 1; k < n; k++) {
            if (Math.abs(M[k][i]) > Math.abs(M[maxRow][i])) maxRow = k;
          }
          var _ref2 = [M[maxRow], M[i]];
          M[i] = _ref2[0];
          M[maxRow] = _ref2[1];
          var piv = M[i][i];
          if (Math.abs(piv) < 1e-10) throw new Error("Sistema singular");
          for (var j = i; j <= n; j++) M[i][j] /= piv;
          for (var _k = 0; _k < n; _k++) {
            if (_k !== i) {
              var factor = M[_k][i];
              for (var _j3 = i; _j3 <= n; _j3++) {
                M[_k][_j3] -= factor * M[i][_j3];
              }
            }
          }
        }
        return M.map(function (row) {
          return row[n];
        });
      }
      var somatorios = new Array(primalProblem.restricoes.length).fill(0);
      var colCount = dualTableau[0].length;
      dualTableauRows.map(function (col, rowIndex) {
        var variavel = _this2.problem.variaveis.find(function (v) {
          return v.variavel == col;
        });
        if (variavel) {
          var valor = variavel.tipo == 'espelho' ? -1 : 1;
          somatorios[variavel.indiceRestricao] += valor * dualTableau[rowIndex][colCount - 1];
        }
      });
      var restricoesAtivas = somatorios.filter(function (v, i) {
        return Number.parseFloat(v.toFixed(2)) != 0;
      }).keys().toArray();
      var A = [];
      var b = [];
      var _iterator = _createForOfIteratorHelper(restricoesAtivas),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _i5 = _step.value;
          var _restrictions$_i = _slicedToArray(restrictions[_i5], 3),
            a1 = _restrictions$_i[0],
            a2 = _restrictions$_i[1],
            bi = _restrictions$_i[2];
          A.push([a1, a2]);
          b.push(bi);
        }

        // Resolver sistema Ax = b 
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var x = resolverSistemaLinear(A, b);

      // Calcular Z
      var z = 0;
      for (var i = 0; i < x.length; i++) z += primalObjective[i] * x[i];
      consoleLog("\n=== Solução Primal ===");
      var solucaoPrimal = {};
      for (var _i4 = 0; _i4 < x.length; _i4++) {
        solucaoPrimal[primalCols[_i4]] = x[_i4];
      }
      consoleTable(solucaoPrimal);
      consoleLog(solucaoPrimal);
      return {
        solucaoPrimal: solucaoPrimal,
        z: z.toFixed(2)
      };
    }
  }], [{
    key: "current",
    value: function current() {
      return new DualSimplexSolver(ProblemaDual.current());
    }
  }]);
}();
$(function () {
  var solver = DualSimplexSolver.current();
  solver.solve();
  console.warn(solver);
});

/***/ }),

/***/ "./src/js/modules/Problema.js":
/*!************************************!*\
  !*** ./src/js/modules/Problema.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Problema = /*#__PURE__*/function () {
  function Problema(tipo, coeficientes, restricoes) {
    _classCallCheck(this, Problema);
    this.tipo = tipo;
    this.coeficientes = coeficientes;
    this.restricoes = restricoes;
  }

  /**
   * Retorna o problema armazenado no storage
   * @returns {Problema}
   */
  return _createClass(Problema, null, [{
    key: "current",
    value: function current() {
      var tipoObjetivo = localStorage.getItem('tipoObjetivo');
      var coefObjetivo = JSON.parse(localStorage.getItem('coefObjetivo'));
      var restricoes = JSON.parse(localStorage.getItem('restricoes'));
      if (!tipoObjetivo || !coefObjetivo || !restricoes) {
        alert("Dados incompletos no localStorage. Certifique-se de definir o problema de programação linear antes de acessar esta página.");
        return;
      }
      return new Problema(tipoObjetivo, coefObjetivo, restricoes);
    }
  }]);
}();
/* harmony default export */ __webpack_exports__["default"] = (Problema);

/***/ }),

/***/ "./src/js/support/helpers.js":
/*!***********************************!*\
  !*** ./src/js/support/helpers.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Definições das constantes

// Variável grande de inviabilidade
window.M = 10000;
window.padArrayEnd = function (arr, targetLength) {
  var padValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return arr.concat(Array(Math.max(0, targetLength - arr.length)).fill(padValue));
};
window.fillArrayEnd = function (arr, count) {
  var padValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return arr.concat(Array(Math.max(0, count)).fill(padValue));
};

/***/ }),

/***/ "./src/js/support/tabelas-html.js":
/*!****************************************!*\
  !*** ./src/js/support/tabelas-html.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.subscript = function (value) {
  var resultingString = '';
  var replaceArray = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'];
  var str = value.toString();
  for (var i in str) {
    var _replaceArray$str$i;
    resultingString += (_replaceArray$str$i = replaceArray[str[i]]) !== null && _replaceArray$str$i !== void 0 ? _replaceArray$str$i : 0;
  }
  return resultingString;
};
window.mostrarTabelaSimplex = function (tabela, titulo, variaveis, base) {
  var linhaPivo = -1;
  var colunaPivo = -1;
  var isFinalIteration = -1;
  var tabelaContainer = document.getElementById('tabela-container');
  if (!tabelaContainer) {
    console.error("Contêiner para a tabela não encontrado.");
    return;
  }

  // Adiciona nova tabela sem limpar o contêiner para manter todas as iterações
  var tabelaHTML = "<div class=\"tabela-iteracao\">\n            <h3 class=\"tabela-titulo\">".concat(titulo, "</h3>\n            <div class=\"tabela-wrapper\">\n                <table class=\"table\">");
  // Cabeçalho da tabela
  tabelaHTML += '<tr><th></th>';
  for (var i in variaveis) {
    if (i < variaveis.length - 1) {
      tabelaHTML += "<th>".concat(variaveis[i], "</th>");
    } else {
      tabelaHTML += "<th>RHS</th></tr></thead><tbody>";
    }
  }

  // Linhas da tabela com rótulos das variáveis básicas
  var lastLine = tabela.length - 1;
  tabela.forEach(function (linha, index) {
    tabelaHTML += "<tr>";

    // Rótulo da linha para variáveis básicas
    if (index === lastLine) {
      tabelaHTML += "<th>Z</th>"; // Linha do objetivo
    } else {
      tabelaHTML += "<th>".concat(base[index], "</th>"); // Variável básica atual
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
};
window.mostrarResultadoFinal = function (solucao, resultadoZ) {
  var titulo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Solução ótima';
  var resultadoContainer = document.getElementById('tabela-container');
  // console.log(solucao, resultadoZ);

  // Exibe o valor de Z e os valores das variáveis de decisão
  var resultadoHTML = "\n            <div class=\"resultado-container\">\n                <h2 class=\"resultado-titulo\">".concat(titulo, "</h2>\n                <p class=\"resultado-valor\">Valor de Z: <strong>").concat(Number.parseFloat(resultadoZ).toFixed(2), "</strong></p>\n                <ul class=\"variaveis-lista\">\n        ");
  for (var variavel in solucao) {
    resultadoHTML += "<li class=\"variavel-item\">".concat(variavel, " = <strong>").concat(Number.parseFloat(solucao[variavel]).toFixed(2), "</strong></li>");
  }
  resultadoHTML += "\n                </ul>\n            </div>\n        ";
  resultadoContainer.insertAdjacentHTML('beforeend', resultadoHTML);
};

/***/ }),

/***/ 3:
/*!**************************************!*\
  !*** multi ./src/js/dual-simplex.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/lucas/Documents/Projetos/Academicos/griffSolver/src/js/dual-simplex.js */"./src/js/dual-simplex.js");


/***/ })

/******/ });