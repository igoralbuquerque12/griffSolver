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
/* harmony import */ var _modules_DeepSolver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/DeepSolver */ "./src/js/modules/DeepSolver.js");
/* harmony import */ var _modules_GSolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/GSolver */ "./src/js/modules/GSolver.js");
/* harmony import */ var _modules_Problema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/Problema */ "./src/js/modules/Problema.js");
/* harmony import */ var _support_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./support/helpers */ "./src/js/support/helpers.js");
/* harmony import */ var _support_helpers__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_support_helpers__WEBPACK_IMPORTED_MODULE_3__);
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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




var ProblemaDual = /*#__PURE__*/function () {
  function ProblemaDual(problemaDual) {
    _classCallCheck(this, ProblemaDual);
    var objetivo = problemaDual.objetivo,
      restricoes = problemaDual.restricoes,
      rhsRestricoes = problemaDual.rhsRestricoes,
      variaveis = problemaDual.variaveis,
      metodo = problemaDual.metodo;
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
        variaveisDuais.push({
          variavel: "y".concat(i + 1),
          indice: i + indexDiff,
          tipo: 'variavel'
        });
        for (var j in restricao.coef) {
          restricoesDuais[j][i + indexDiff] = (0 - multiplicador) * restricao.coef[j];
        }
        if (restricao.operator == '=') {
          indexDiff++;
          variaveisDuais.push({
            variavel: "y".concat(i + 1, "\""),
            indice: i + indexDiff,
            tipo: 'espelho'
          });
          coeficientesDuais.push((0 - multiplicador) * restricao.rhs);
        }
      }
      // Preparando para algoritmo
      // Preenchendo variáveis com igualdade
      for (var _i in variaveisDuais) {
        var variavel = variaveisDuais[_i];
        if (variavel.tipo == 'espelho') {
          for (var _j in restricoesDuais) {
            restricoesDuais[_j][variavel.indice] = 0 - restricoesDuais[_j][variavel.indice - 1];
          }
        }
      }
      // Adicionando variáveis de folga
      var colLength = restricoesDuais[0].length;
      var contVariaveisFolga = restricoesDuais.length;
      for (var _i2 = 0; _i2 <= contVariaveisFolga - 1; _i2++) {
        restricoesDuais[_i2] = restricoesDuais[_i2] = fillArrayEnd(restricoesDuais[_i2], contVariaveisFolga);
        restricoesDuais[_i2][colLength + _i2] = 1;
        coeficientesDuais.push(0);
        variaveisDuais.push({
          variavel: "s".concat(_i2 + 1, "\""),
          indice: _i2,
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
      var problema = _modules_Problema__WEBPACK_IMPORTED_MODULE_2__["default"].current();
      return new ProblemaDual(this.preparar(problema));
    }
  }]);
}();
var DualSimplexSolver = /*#__PURE__*/function () {
  function DualSimplexSolver(problemaDual) {
    _classCallCheck(this, DualSimplexSolver);
    this.problema = problemaDual;
    this.tabela = problemaDual.tabela();
  }
  return _createClass(DualSimplexSolver, null, [{
    key: "current",
    value: function current() {
      return new DualSimplexSolver(ProblemaDual.current());
    }
  }]);
}();
function recuperarSolucaoPrimal() {
  // =================== INPUT ======================
  var primalMethod = 'min';
  var primalCols = ['x1', 'x2'];
  var primalObjective = [0.4, 0.5];
  var restrictions = [[0.3, 0.1, 2.7, '<='], [0.5, 0.5, 6, '='], [0.6, 0.4, 6, '>=']];
  var dualTableauRows = ['s1', 'y2', 'Z'];
  var dualTableauCols = ['y1', 'y2', 'y3', 's1', 's2', 'RHS'];
  var dualTableau = [[-0.2, 0, 0.2, 1, -1, 0.1], [0.2, 1, -0.8, 0, -2, 1], [1.5, 0, -1.2, 0, 12, -6]];

  // =================== PASSO 1: Solução Dual ======================
  var n = dualTableauCols.length - 1; // exclui RHS
  var m = dualTableauRows.length - 1; // exclui Z
  var solucaoDual = {};
  dualTableauCols.slice(0, n).forEach(function (v) {
    return solucaoDual[v] = 0;
  });
  for (var i = 0; i < m; i++) {
    var nome = dualTableauRows[i];
    var rhs = dualTableau[i][n];
    if (dualTableauCols.includes(nome)) {
      solucaoDual[nome] = rhs;
    }
  }
  console.log("\n=== Solução Dual ===");
  console.table(solucaoDual);

  // =================== PASSO 2: Identificar restrições ativas do primal ======================
  //   const restricoesAtivas = Object.entries(solucaoDual)
  //     .filter(([v, val]) => v.startsWith('y') && val > 1e-8)
  //     .map(([v]) => parseInt(v.slice(1)) - 1); // pega índice 0-based
  var restricoesAtivas = [0, 1];
  console.log("Restrições ativas do primal:", restricoesAtivas.map(function (i) {
    return "R".concat(i + 1);
  }).join(', '));

  // =================== PASSO 3: Construir sistema Ax = b ======================
  var A = [];
  var b = [];
  for (var _i3 = 0, _restricoesAtivas = restricoesAtivas; _i3 < _restricoesAtivas.length; _i3++) {
    var _i4 = _restricoesAtivas[_i3];
    var _restrictions$_i = _slicedToArray(restrictions[_i4], 3),
      a1 = _restrictions$_i[0],
      a2 = _restrictions$_i[1],
      bi = _restrictions$_i[2];
    A.push([a1, a2]);
    b.push(bi);
  }

  // Resolver sistema Ax = b (eliminação de Gauss)
  var x = resolverSistemaLinear(A, b);

  // =================== PASSO 4: Calcular Z ======================
  var z = 0;
  for (var _i5 = 0; _i5 < x.length; _i5++) z += primalObjective[_i5] * x[_i5];
  console.log("\n=== Solução Primal ===");
  var solucaoPrimal = {};
  for (var _i6 = 0; _i6 < x.length; _i6++) {
    solucaoPrimal[primalCols[_i6]] = x[_i6];
  }
  console.table(solucaoPrimal);
  console.log("Valor ótimo Z =", z.toFixed(4));

  // =================== Função auxiliar ======================
  function resolverSistemaLinear(A, b) {
    var n = b.length;
    var M = A.map(function (row, i) {
      return row.concat(b[i]);
    });
    for (var _i7 = 0; _i7 < n; _i7++) {
      var maxRow = _i7;
      for (var k = _i7 + 1; k < n; k++) {
        if (Math.abs(M[k][_i7]) > Math.abs(M[maxRow][_i7])) maxRow = k;
      }
      var _ref = [M[maxRow], M[_i7]];
      M[_i7] = _ref[0];
      M[maxRow] = _ref[1];
      var piv = M[_i7][_i7];
      if (Math.abs(piv) < 1e-10) throw new Error("Sistema singular");
      for (var j = _i7; j <= n; j++) M[_i7][j] /= piv;
      for (var _k = 0; _k < n; _k++) {
        if (_k !== _i7) {
          var factor = M[_k][_i7];
          for (var _j2 = _i7; _j2 <= n; _j2++) {
            M[_k][_j2] -= factor * M[_i7][_j2];
          }
        }
      }
    }
    return M.map(function (row) {
      return row[n];
    });
  }
}
$(function () {
  // const solver = DualSimplexSolver.current();
  // console.log(solver);

  var initialTableau = ProblemaDual.current().tabela();
  console.log(initialTableau);

  // const deepSolver = new DeepSolver(initialTableau);
  // deepSolver.solve();

  var restrictions = [[0.4, 0.5, 0, 'z'],
  // Objetivo
  [0.3, 0.1, 2.7, '<='],
  // restricao
  [0.5, 0.5, 6, '='], [0.6, 0.4, 6, '>=']];
  var dualRows = ['s1', "y2+", 'Z'];
  var dualCols = ['y1', "y2+", "y2-", "y3'", 's1', 's2', 'RHS'];
  var gSolver = new _modules_GSolver__WEBPACK_IMPORTED_MODULE_1__["default"](initialTableau, dualCols, dualRows);
  gSolver.solve();
  console.log(_modules_Problema__WEBPACK_IMPORTED_MODULE_2__["default"].current());
  var resultingDualRows = ['s1', "y2", 'Z'];
  var resultingDualCols = ['y1', "y2", "y3'", 's1', 's2', 'RHS'];
  var resultingDualTableau = [[-0.2, 0, -0.2, 1, -1, 0.1], [0.2, 1, 0.8, 0, -2, 1.0], [-1.5, 0, -1.2, 0, -12, 6.0]];

  // recuperarSolucaoPrimal(resultingDualTableau, resultingDualRows, resultingDualCols);
  recuperarSolucaoPrimal();
});

// $(() => {
//     (new DeepSolver()).solve()
// })

/***/ }),

/***/ "./src/js/modules/DeepSolver.js":
/*!**************************************!*\
  !*** ./src/js/modules/DeepSolver.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var DeepSolver2 = /*#__PURE__*/function () {
  function DeepSolver2(tableau, variableCount) {
    _classCallCheck(this, DeepSolver2);
    this.tableau = tableau;
    this.rows = tableau.length;
    this.cols = tableau[0].length;
    this.iterations = 0;
    this.isMinimization = true;
    // Índiices de variaveis
    var i = this.cols - this.rows;
    this.variables = new Array(this.rows - 1).fill(0).map(function () {
      return i++;
    });
  }
  return _createClass(DeepSolver2, [{
    key: "solve",
    value: function solve() {
      while (true) {
        this.printTableau();
        var pivotRow = this.findPivotRow();
        if (pivotRow === -1) {
          if (this.checkOptimality()) {
            console.log("\nSolução ótima encontrada!");
            this.printSolution();
            return;
          } else {
            console.log("\nSolução viável - Mudando para Simplex Primal...");
            this.primalSimplex();
            return;
          }
        }
        var pivotCol = this.findPivotCol(pivotRow);
        if (pivotCol === -1) {
          console.log("\nProblema ilimitado.");
          return;
        }
        this.variables[pivotRow] = pivotCol;
        console.log("\nItera\xE7\xE3o ".concat(++this.iterations, ": Piv\xF4 [").concat(pivotRow, ",").concat(pivotCol, "] = ").concat(this.tableau[pivotRow][pivotCol].toFixed(4)));
        this.pivot(pivotRow, pivotCol);
      }
    }
  }, {
    key: "findPivotRow",
    value: function findPivotRow() {
      var minVal = 0;
      var pivotRow = -1;
      for (var i = 0; i < this.rows - 1; i++) {
        var rhs = this.tableau[i][this.cols - 1];
        if (rhs < minVal) {
          minVal = rhs;
          pivotRow = i;
        }
      }
      return pivotRow;
    }
  }, {
    key: "findPivotCol",
    value: function findPivotCol(pivotRow) {
      var minRatio = Infinity;
      var pivotCol = -1;
      for (var j = 0; j < this.cols - 1; j++) {
        var a = this.tableau[pivotRow][j];
        if (a >= 0) continue;
        var cost = this.tableau[this.rows - 1][j];
        var ratio = Math.abs(cost / a);
        if (ratio < minRatio) {
          minRatio = ratio;
          pivotCol = j;
        }
      }
      return pivotCol;
    }
  }, {
    key: "pivot",
    value: function pivot(pivotRow, pivotCol) {
      var pivotValue = this.tableau[pivotRow][pivotCol];
      for (var j = 0; j < this.cols; j++) {
        this.tableau[pivotRow][j] /= pivotValue;
      }
      for (var i = 0; i < this.rows; i++) {
        if (i === pivotRow) continue;
        var factor = this.tableau[i][pivotCol];
        for (var _j = 0; _j < this.cols; _j++) {
          this.tableau[i][_j] -= factor * this.tableau[pivotRow][_j];
        }
      }
    }
  }, {
    key: "checkOptimality",
    value: function checkOptimality() {
      var lastRow = this.rows - 1;
      for (var j = 0; j < this.cols - 1; j++) {
        if (this.tableau[lastRow][j] < 0) return false;
      }
      return true;
    }
  }, {
    key: "primalSimplex",
    value: function primalSimplex() {
      while (true) {
        this.printTableau();
        if (this.checkOptimality()) {
          console.log("\nSolução ótima encontrada!");
          this.printSolution();
          return;
        }
        var pivotCol = this.findEnteringCol();
        if (pivotCol === -1) {
          console.log("\nProblema ilimitado.");
          return;
        }
        var pivotRow = this.findMinRatioRow(pivotCol);
        if (pivotRow === -1) {
          console.log("\nSem razão válida.");
          return;
        }
        console.log("\nItera\xE7\xE3o Primal ".concat(++this.iterations, ": Piv\xF4 [").concat(pivotRow, ",").concat(pivotCol, "] = ").concat(this.tableau[pivotRow][pivotCol].toFixed(4)));
        this.pivot(pivotRow, pivotCol);
      }
    }
  }, {
    key: "findEnteringCol",
    value: function findEnteringCol() {
      var lastRow = this.rows - 1;
      var minVal = 0;
      var pivotCol = -1;
      for (var j = 0; j < this.cols - 1; j++) {
        if (this.tableau[lastRow][j] < minVal) {
          minVal = this.tableau[lastRow][j];
          pivotCol = j;
        }
      }
      return pivotCol;
    }
  }, {
    key: "findMinRatioRow",
    value: function findMinRatioRow(pivotCol) {
      var minRatio = Infinity;
      var pivotRow = -1;
      for (var i = 0; i < this.rows - 1; i++) {
        var a = this.tableau[i][pivotCol];
        if (a <= 0) continue;
        var b = this.tableau[i][this.cols - 1];
        var ratio = b / a;
        if (ratio < minRatio) {
          minRatio = ratio;
          pivotRow = i;
        }
      }
      return pivotRow;
    }
  }, {
    key: "printTableau",
    value: function printTableau() {
      console.log("\nTableau:");
      for (var i = 0; i < this.rows; i++) {
        var row = "";
        for (var j = 0; j < this.cols; j++) {
          row += this.tableau[i][j].toFixed(4).padStart(8) + " ";
        }
        console.log(row);
      }
    }
  }, {
    key: "printSolution",
    value: function printSolution() {
      var w = -this.tableau[this.rows - 1][this.cols - 1];
      console.log("\nValor \xF3timo: ".concat(w.toFixed(4)));
      console.log("Solução dual:");
      for (var i = 0; i < this.cols - 1; i++) {
        var value = '0.00';
        var varIndex = this.variables.indexOf(i);
        if (varIndex !== -1) {
          value = Number.parseFloat(this.tableau[varIndex][this.cols - 1]).toFixed(2);
        }
        console.log("y:".concat(i + 1, " = ").concat(value));
      }
    }
  }]);
}();
var DeepSolver = /*#__PURE__*/function () {
  function DeepSolver(tableau) {
    _classCallCheck(this, DeepSolver);
    this.tableau = tableau.map(function (row) {
      return _toConsumableArray(row);
    }); // Deep copy
    this.rows = tableau.length;
    this.cols = tableau[0].length;
    this.iterations = 0;
  }
  return _createClass(DeepSolver, [{
    key: "solve",
    value: function solve() {
      while (true) {
        this.printTableau();

        // Verificar se solução é ótima (todos RHS >= 0)
        if (this.isOptimal()) {
          console.log("\nSolução ótima encontrada!");
          this.printSolution();
          return;
        }

        // Encontrar linha pivô (mais negativo no RHS)
        var pivotRow = this.findPivotRow();
        if (pivotRow === -1) {
          console.log("\nNão há valores negativos no RHS - solução ótima.");
          return;
        }

        // Encontrar coluna pivô
        var pivotCol = this.findPivotCol(pivotRow);
        if (pivotCol === -1) {
          console.log("\nProblema ilimitado - não há elementos negativos na linha pivô.");
          return;
        }
        console.log("\nItera\xE7\xE3o ".concat(++this.iterations, ": Piv\xF4 [").concat(pivotRow, ",").concat(pivotCol, "] = ").concat(this.tableau[pivotRow][pivotCol].toFixed(4)));
        this.pivot(pivotRow, pivotCol);
      }
    }
  }, {
    key: "findPivotRow",
    value: function findPivotRow() {
      var minVal = 0;
      var pivotRow = -1;

      // Percorrer todas as linhas, exceto a última (linha Z)
      for (var i = 0; i < this.rows - 1; i++) {
        var rhs = this.tableau[i][this.cols - 1]; // Última coluna = RHS
        if (rhs < minVal) {
          minVal = rhs;
          pivotRow = i;
        }
      }
      return pivotRow;
    }
  }, {
    key: "findPivotCol",
    value: function findPivotCol(pivotRow) {
      var minRatio = Infinity;
      var pivotCol = -1;
      for (var j = 0; j < this.cols - 1; j++) {
        var element = this.tableau[pivotRow][j];

        // Ignorar elementos não-negativos
        if (element >= 0) continue;

        // Calcular razão (coef linha Z / elemento)
        var cost = this.tableau[this.rows - 1][j];
        var ratio = Math.abs(cost / element);
        if (ratio < minRatio) {
          minRatio = ratio;
          pivotCol = j;
        }
      }
      return pivotCol;
    }
  }, {
    key: "pivot",
    value: function pivot(pivotRow, pivotCol) {
      var pivotValue = this.tableau[pivotRow][pivotCol];

      // Normalizar a linha pivô
      for (var j = 0; j < this.cols; j++) {
        this.tableau[pivotRow][j] /= pivotValue;
      }

      // Atualizar outras linhas
      for (var i = 0; i < this.rows; i++) {
        if (i === pivotRow) continue;
        var factor = this.tableau[i][pivotCol];
        for (var _j2 = 0; _j2 < this.cols; _j2++) {
          this.tableau[i][_j2] -= factor * this.tableau[pivotRow][_j2];
        }
      }
    }
  }, {
    key: "isOptimal",
    value: function isOptimal() {
      // Verificar se todos os RHS são não-negativos (exceto linha Z)
      for (var i = 0; i < this.rows - 1; i++) {
        if (this.tableau[i][this.cols - 1] < 0) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: "printTableau",
    value: function printTableau() {
      console.log("\nTableau Atual:");
      for (var i = 0; i < this.rows; i++) {
        var row = "";
        for (var j = 0; j < this.cols; j++) {
          row += this.formatNumber(this.tableau[i][j]) + "\t";
        }
        console.log(row);
      }
    }
  }, {
    key: "formatNumber",
    value: function formatNumber(value) {
      // Formata números para melhor visualização
      if (Math.abs(value) < 0.0001) value = 0; // Evitar -0.00
      return value.toFixed(4).padStart(8);
    }
  }, {
    key: "printSolution",
    value: function printSolution() {
      console.log("Valor \xF3timo de Z: ".concat(this.tableau[this.rows - 1][this.cols - 1].toFixed(4)));
      console.log("Solução:");
      for (var j = 0; j < this.cols - 1; j++) {
        var isBasic = false;
        var value = 0;
        var rowIndex = -1;

        // Verificar se a variável é básica
        for (var i = 0; i < this.rows - 1; i++) {
          if (Math.abs(this.tableau[i][j]) > 0.0001) {
            var hasOtherNonZero = false;

            // Verificar se é coluna canônica
            for (var k = 0; k < this.cols - 1; k++) {
              if (k !== j && Math.abs(this.tableau[i][k]) > 0.0001) {
                hasOtherNonZero = true;
                break;
              }
            }
            if (!hasOtherNonZero && Math.abs(this.tableau[i][j] - 1) < 0.0001) {
              isBasic = true;
              value = this.tableau[i][this.cols - 1];
              rowIndex = i;
              break;
            }
          }
        }
        if (isBasic) {
          console.log("Vari\xE1vel ".concat(j + 1, " = ").concat(value.toFixed(4), " (b\xE1sica, linha ").concat(rowIndex, ")"));
        } else {
          console.log("Vari\xE1vel ".concat(j + 1, " = 0.0000 (n\xE3o-b\xE1sica)"));
        }
      }
    }
  }]);
}();
/* harmony default export */ __webpack_exports__["default"] = (DeepSolver);

/***/ }),

/***/ "./src/js/modules/GSolver.js":
/*!***********************************!*\
  !*** ./src/js/modules/GSolver.js ***!
  \***********************************/
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
// Dual Simplex Tabular Solver - JavaScript Puro
// Agora com geração automática da tabela dual e definição de variáveis básicas e não básicas
var GSolver = /*#__PURE__*/function () {
  /**
   * @param {number[][]} tableau - matriz (m+1)x(n+1) pronta para Dual Simplex
   * @param {string[]} cols - nomes das colunas (variáveis não básicas + RHS)
   * @param {string[]} rows - nomes das linhas (variáveis básicas + Z)
   */
  function GSolver(tableau, cols, rows) {
    _classCallCheck(this, GSolver);
    this.tableau = tableau.map(function (r) {
      return r.slice();
    });
    this.cols = cols.slice();
    this.rows = rows.slice();
    this.iter = 0;
  }

  // Imprime a tabela atual
  return _createClass(GSolver, [{
    key: "printCurrent",
    value: function printCurrent() {
      var _this = this;
      console.log("\n--- Itera\xE7\xE3o ".concat(this.iter, " ---"));
      var header = ["BV"].concat(this.cols);
      var table = this.tableau.map(function (row, i) {
        var obj = {
          BV: _this.rows[i]
        };
        _this.cols.forEach(function (c, j) {
          return obj[c] = row[j];
        });
        return obj;
      });
      console.table(table, header);
    }

    // Executa uma iteração; retorna false se ótimo ou inviável
  }, {
    key: "step",
    value: function step() {
      var m = this.tableau.length - 1;
      var n = this.cols.length - 1;
      // 1) Linha pivô: menor RHS (<0)
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
        console.log('Ótimo encontrado.');
        // this.printCurrent();
        return false;
      }
      // 2) Coluna pivô: coef<0 na linha, ratio mínimo |Z_j / a_ij|
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
      // 3) Pivotamento
      this.pivot(pivotRow, pivotCol);
      // 4) Atualiza labels básicos
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
      var m = this.tableau.length,
        n = this.cols.length;
      var piv = this.tableau[row][col];
      // normaliza linha
      for (var j = 0; j < n; j++) this.tableau[row][j] /= piv;
      // zera colunas
      for (var i = 0; i < m; i++) {
        if (i !== row) {
          var factor = this.tableau[i][col];
          for (var _j = 0; _j < n; _j++) {
            this.tableau[i][_j] -= factor * this.tableau[row][_j];
          }
        }
      }
    }
  }, {
    key: "solve",
    value: function solve() {
      this.printCurrent();
      while (this.step());
    }
  }]);
}();
var GSolver2 = /*#__PURE__*/function () {
  /**
   * @param {number[][]} tableau - matriz (m+1)x(n+1) pronta para Dual Simplex
   * @param {string[]} cols - nomes das colunas (variáveis não básicas + RHS)
   * @param {string[]} rows - nomes das linhas (variáveis básicas + Z)
   */
  function GSolver2(tableau, cols, rows) {
    _classCallCheck(this, GSolver2);
    this.tableau = tableau.map(function (r) {
      return r.slice();
    });
    this.cols = cols.slice();
    this.rows = rows.slice();
    this.iter = 0;
  }

  // Imprime a tabela atual
  return _createClass(GSolver2, [{
    key: "printCurrent",
    value: function printCurrent() {
      var _this2 = this;
      console.log("\n--- Itera\xE7\xE3o ".concat(this.iter, " ---"));
      var header = ["BV"].concat(this.cols);
      var table = this.tableau.map(function (row, i) {
        var obj = {
          BV: _this2.rows[i]
        };
        _this2.cols.forEach(function (c, j) {
          return obj[c] = row[j];
        });
        return obj;
      });
      console.table(table, header);
    }

    // Executa uma iteração; retorna false se ótimo ou inviável
  }, {
    key: "step",
    value: function step() {
      var m = this.tableau.length - 1;
      var n = this.cols.length - 1;
      // 1) Linha pivô: menor RHS (<0)
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
        console.log('Ótimo encontrado.');
        this.printCurrent();
        return false;
      }
      // 2) Coluna pivô: coef<0 na linha, ratio mínimo |Z_j / a_ij|
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
      // 3) Pivotamento
      this.pivot(pivotRow, pivotCol);
      // 4) Atualiza labels básicos
      var _ref2 = [this.cols[pivotCol], this.rows[pivotRow]];
      this.rows[pivotRow] = _ref2[0];
      this.cols[pivotCol] = _ref2[1];
      this.iter++;
      this.printCurrent();
      return true;
    }
  }, {
    key: "pivot",
    value: function pivot(row, col) {
      var m = this.tableau.length,
        n = this.cols.length;
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
    }
  }, {
    key: "solve",
    value: function solve() {
      this.printCurrent();
      while (true) {
        var m = this.tableau.length - 1;
        var n = this.cols.length - 1;

        // 1) busca linha pivô de restrição
        var pivotRow = -1,
          minRhs = 0;
        for (var i = 0; i < m; i++) {
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
        var zRhs = this.tableau[m][n];
        if (zRhs >= 0) {
          console.log("Convergência completa: ótimo primal e dual factível.");
          this.printCurrent();
          break;
        }

        // 3) RHS de Z′ está negativo → dual ainda não convergiu ao ótimo primal
        //    tentamos pivotar na linha Z′
        var pivotCol = this.findPivotCol(m);
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
        var _ref3 = [this.cols[pivotCol], this.rows[m]];
        this.rows[m] = _ref3[0];
        this.cols[pivotCol] = _ref3[1];
        this.iter++;
        this.printCurrent();
      }
    }

    // Extrai lógica de uma iteração normal na linha i
  }, {
    key: "stepOnRow",
    value: function stepOnRow(pivotRow) {
      var m = this.tableau.length - 1;
      var n = this.cols.length - 1;
      // encontra coluna pivô e faz pivot, igual ao step original...
      var pivotCol = -1,
        bestRatio = Infinity;
      for (var j = 0; j < n; j++) {
        var aij = this.tableau[pivotRow][j];
        if (aij < 0) {
          var ratio = Math.abs(this.tableau[m][j] / aij);
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
      var _ref4 = [this.cols[pivotCol], this.rows[pivotRow]];
      this.rows[pivotRow] = _ref4[0];
      this.cols[pivotCol] = _ref4[1];
      this.iter++;
      this.printCurrent();
      return true;
    }

    // Encontra coluna pivô na linha Z′ (índice m)
  }, {
    key: "findPivotCol",
    value: function findPivotCol(zRow) {
      var m = this.tableau.length - 1;
      var pivotCol = -1,
        bestRatio = Infinity;
      for (var j = 0; j < this.cols.length - 1; j++) {
        var a = this.tableau[zRow][j];
        if (a < 0) {
          var ratio = Math.abs(this.tableau[zRow][this.cols.length - 1] / a);
          if (ratio < bestRatio) {
            bestRatio = ratio;
            pivotCol = j;
          }
        }
      }
      return pivotCol;
    }
  }]);
}();
/* harmony default export */ __webpack_exports__["default"] = (GSolver);

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

/***/ 3:
/*!**************************************!*\
  !*** multi ./src/js/dual-simplex.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/lucas/Documents/Projetos/Academicos/griffSolver/src/js/dual-simplex.js */"./src/js/dual-simplex.js");


/***/ })

/******/ });