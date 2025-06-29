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
      variaveis = problemaDual.variaveis;
    this.objetivo = objetivo;
    this.restricoes = restricoes;
    this.rhsRestricoes = rhsRestricoes;
    this.variaveis = variaveis;
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
        variaveis: variaveisDuais
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
$(function () {
  // const solver = DualSimplexSolver.current();
  // console.log(solver);

  var initialTableau = ProblemaDual.current().tabela();
  console.log(initialTableau);
  var deepSolver = new _modules_DeepSolver__WEBPACK_IMPORTED_MODULE_0__["default"](initialTableau);
  deepSolver.solve();

  // const gSolver = new GSolver(initialTableau, ["y1", "y2+", "y2-", "y3'", "s1", "s2", "RHS"], ["s1", "s2", "Z"])
  // gSolver.solve();
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
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nError: ENOENT: no such file or directory, open '/home/lucas/Documents/Projetos/Academicos/griffSolver/src/js/modules/DeepSolver.js'");

/***/ }),

/***/ "./src/js/modules/GSolver.js":
/*!***********************************!*\
  !*** ./src/js/modules/GSolver.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nError: ENOENT: no such file or directory, open '/home/lucas/Documents/Projetos/Academicos/griffSolver/src/js/modules/GSolver.js'");

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