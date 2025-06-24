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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/grafico.js":
/*!***************************!*\
  !*** ./src/js/grafico.js ***!
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
  var _localStorage$getItem;
  var tipoObjetivo = ((_localStorage$getItem = localStorage.getItem('tipoObjetivo')) === null || _localStorage$getItem === void 0 ? void 0 : _localStorage$getItem.toLowerCase()) === 'maximizar' ? 'maximize' : 'minimize';
  var coefObjetivo = JSON.parse(localStorage.getItem('coefObjetivo') || '[]');
  var restricoes = JSON.parse(localStorage.getItem('restricoes') || '[]');

  // Adding x >= 0 and y >= 0 constraints (non-negativity)
  restricoes.unshift({
    coefX1: 1,
    coefX2: 0,
    rhs: 0,
    operator: '>='
  },
  // x >= 0
  {
    coefX1: 0,
    coefX2: 1,
    rhs: 0,
    operator: '>='
  } // y >= 0
  );
  var allIntersections = []; // To store all intersections
  var feasibleIntersections = []; // To store feasible intersections only

  // Generate intersections between constraints
  for (var i = 0; i < restricoes.length - 1; i++) {
    for (var j = i + 1; j < restricoes.length; j++) {
      var intersecao = encontrarIntersecao(restricoes[i], restricoes[j]);
      if (intersecao) {
        allIntersections.push(intersecao); // Add all intersections
        if (verificarRestricoes(intersecao, restricoes)) {
          feasibleIntersections.push(intersecao); // Only feasible intersections
        }
      }
    }
  }

  // Add intersections with the x-axis (y = 0) and y-axis (x = 0) for each constraint
  restricoes.forEach(function (restricao) {
    var eixoX = intersecaoComEixoX(restricao); // Intersection with y = 0
    var eixoY = intersecaoComEixoY(restricao); // Intersection with x = 0
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
  var uniqueAllIntersections = Array.from(new Set(allIntersections.map(function (p) {
    return JSON.stringify(p);
  }))).map(function (str) {
    return JSON.parse(str);
  });
  var uniqueFeasibleIntersections = Array.from(new Set(feasibleIntersections.map(function (p) {
    return JSON.stringify(p);
  }))).map(function (str) {
    return JSON.parse(str);
  });
  var xValues = uniqueAllIntersections.map(function (p) {
    return p.x;
  });
  var yValues = uniqueAllIntersections.map(function (p) {
    return p.y;
  });
  var xMax = Math.max.apply(Math, _toConsumableArray(xValues)) + 1; // Adiciona um buffer de 1 para visualizar melhor
  var yMax = Math.max.apply(Math, _toConsumableArray(yValues)) + 1; // Adiciona um buffer de 1 para visualizar melhor
  var xMin = Math.max(Math.min.apply(Math, _toConsumableArray(xValues)) - 1, 0);
  var yMin = Math.max(Math.min.apply(Math, _toConsumableArray(yValues)) - 1, 0);
  var traces = [];

  // Plot all intersections as grey markers
  traces.push({
    type: 'scatter',
    mode: 'markers',
    x: uniqueAllIntersections.map(function (p) {
      return p.x;
    }),
    y: uniqueAllIntersections.map(function (p) {
      return p.y;
    }),
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
    var feasiblePolygon = ordenarPontos(uniqueFeasibleIntersections);
    traces.push({
      type: 'scatter',
      x: feasiblePolygon.map(function (p) {
        return p.x;
      }),
      y: feasiblePolygon.map(function (p) {
        return p.y;
      }),
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
    x: uniqueFeasibleIntersections.map(function (p) {
      return p.x;
    }),
    y: uniqueFeasibleIntersections.map(function (p) {
      return p.y;
    }),
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
  restricoes.forEach(function (restricao) {
    var trace = gerarLinhaRestricao(restricao, xMax, yMax);
    traces.push(trace);
  });

  // Find and plot the optimal point
  var pontoOtimo = encontrarPontoOtimo(uniqueFeasibleIntersections, coefObjetivo, tipoObjetivo);
  if (pontoOtimo && pontoOtimo.x !== undefined && pontoOtimo.y !== undefined) {
    var valorOtimo = coefObjetivo[0] * pontoOtimo.x + coefObjetivo[1] * pontoOtimo.y;
    // Verifica se existe solução múltipla
    var solucaoMultipla = verificarSolucaoMultipla(coefObjetivo, restricoes);
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
      text: "Solu\xE7\xE3o \xD3tima = (".concat(pontoOtimo.x.toFixed(2), ", ").concat(pontoOtimo.y.toFixed(2), "), Z = ").concat(valorOtimo.toFixed(2)),
      name: "Solu\xE7\xE3o \xD3tima = ".concat(valorOtimo.toFixed(2))
    });
    exibirSolucoesOtimas(pontoOtimo);
  } else {
    console.log("Nenhum ponto ótimo encontrado.");
  }
  function exibirSolucoesOtimas(pontoOtimo) {
    // Obter limites da região viável para buscar pontos inteiros
    var xMin = Math.floor(Math.min.apply(Math, _toConsumableArray(uniqueFeasibleIntersections.map(function (p) {
      return p.x;
    }))));
    var xMax = Math.ceil(Math.max.apply(Math, _toConsumableArray(uniqueFeasibleIntersections.map(function (p) {
      return p.x;
    }))));
    var yMin = Math.floor(Math.min.apply(Math, _toConsumableArray(uniqueFeasibleIntersections.map(function (p) {
      return p.y;
    }))));
    var yMax = Math.ceil(Math.max.apply(Math, _toConsumableArray(uniqueFeasibleIntersections.map(function (p) {
      return p.y;
    }))));
    var melhorPontoInteiro = null;
    var melhorValor = tipoObjetivo === 'maximize' ? -Infinity : Infinity;

    // Iterar sobre todos os pontos inteiros possíveis dentro dos limites
    for (var x = xMin; x <= xMax; x++) {
      for (var y = yMin; y <= yMax; y++) {
        var ponto = {
          x: x,
          y: y
        };

        // Verificar se o ponto está dentro da região viável
        if (verificarRestricoes(ponto, restricoes)) {
          var valorObjetivo = coefObjetivo[0] * ponto.x + coefObjetivo[1] * ponto.y;

          // Atualizar o melhor ponto baseado no objetivo
          if (tipoObjetivo === 'maximize' && valorObjetivo > melhorValor || tipoObjetivo === 'minimize' && valorObjetivo < melhorValor) {
            melhorPontoInteiro = ponto;
            melhorValor = valorObjetivo;
          }
        }
      }
    }
  }

  // Calcular valores de Z para cada ponto de interseção viável
  var niveisZ = uniqueFeasibleIntersections.map(function (ponto) {
    return coefObjetivo[0] * ponto.x + coefObjetivo[1] * ponto.y;
  });

  // Gerar uma isocurva para cada valor Z correspondente aos pontos de interseção
  niveisZ.forEach(function (z, index) {
    var traceNivel = gerarIsocurva(coefObjetivo, z, xMax, yMax);
    traces.push(traceNivel);
  });
  var layout = {
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
  return restricoes.some(function (_ref) {
    var coefX1 = _ref.coefX1,
      coefX2 = _ref.coefX2;
    var proporcaoX = coefObjetivo[0] / coefX1;
    var proporcaoY = coefObjetivo[1] / coefX2;
    return Math.abs(proporcaoX - proporcaoY) < 0.0001; // Comparando as proporções
  });
}
function gerarIsocurva(coefObjetivo, z, xMax, yMax) {
  var trace = {
    type: 'scatter',
    mode: 'lines',
    name: "Z = ".concat(z.toFixed(2)),
    line: {
      color: 'rgba(255, 159, 64, 0.4)',
      dash: 'dot',
      width: 1
    },
    x: [],
    y: []
  };
  if (coefObjetivo[1] !== 0) {
    for (var x = 0; x <= xMax; x += 0.1) {
      var y = (z - coefObjetivo[0] * x) / coefObjetivo[1];
      if (y >= 0 && y <= yMax) {
        trace.x.push(x);
        trace.y.push(y);
      }
    }
  }
  if (coefObjetivo[0] !== 0) {
    for (var _y = 0; _y <= yMax; _y += 0.1) {
      var _x = (z - coefObjetivo[1] * _y) / coefObjetivo[0];
      if (_x >= 0 && _x <= xMax) {
        trace.x.push(_x);
        trace.y.push(_y);
      }
    }
  }
  return trace;
}

// Check if a point satisfies all constraints
function verificarRestricoes(ponto, restricoes) {
  var tolerance = 0.001;
  return restricoes.every(function (_ref2, index) {
    var coefX1 = _ref2.coefX1,
      coefX2 = _ref2.coefX2,
      rhs = _ref2.rhs,
      operator = _ref2.operator;
    var resultado = coefX1 * ponto.x + coefX2 * ponto.y;
    var restricaoValida;
    if (operator === '>=') {
      restricaoValida = resultado >= rhs - tolerance;
    } else if (operator === '<=') {
      restricaoValida = resultado <= rhs + tolerance;
    } else if (operator === '=') {
      restricaoValida = Math.abs(resultado - rhs) < tolerance;
    }
    console.log("Ponto (".concat(ponto.x, ", ").concat(ponto.y, "), Restri\xE7\xE3o ").concat(index + 1, ":"), "Resultado = ".concat(resultado, ", Operador = ").concat(operator, ", RHS = ").concat(rhs), "- Valido: ".concat(restricaoValida));
    return restricaoValida;
  });
}

// Order points to form a closed polygon
function ordenarPontos(pontos) {
  var centroide = pontos.reduce(function (acc, p) {
    return {
      x: acc.x + p.x,
      y: acc.y + p.y
    };
  }, {
    x: 0,
    y: 0
  });
  centroide.x /= pontos.length;
  centroide.y /= pontos.length;
  return pontos.sort(function (a, b) {
    var angA = Math.atan2(a.y - centroide.y, a.x - centroide.x);
    var angB = Math.atan2(b.y - centroide.y, b.x - centroide.x);
    return angA - angB;
  });
}

// Generate line trace for a constraint
function gerarLinhaRestricao(restricao, xMax, yMax) {
  var coefX1 = restricao.coefX1,
    coefX2 = restricao.coefX2,
    rhs = restricao.rhs,
    operator = restricao.operator;
  var trace = {
    type: 'scatter',
    mode: 'lines',
    name: "".concat(coefX1, "X1 + ").concat(coefX2, "X2 ").concat(operator, " ").concat(rhs),
    line: {
      color: 'rgba(153, 102, 255, 0.7)',
      width: 2,
      dash: 'dot'
    },
    x: [],
    y: []
  };
  if (Math.abs(coefX2) < 0.0001) {
    var x = rhs / coefX1;
    for (var y = 0; y <= yMax; y += 0.1) {
      trace.x.push(x);
      trace.y.push(y);
    }
  } else if (Math.abs(coefX1) < 0.0001) {
    var _y2 = rhs / coefX2;
    for (var _x2 = 0; _x2 <= xMax; _x2 += 0.1) {
      trace.x.push(_x2);
      trace.y.push(_y2);
    }
  } else {
    for (var _x3 = 0; _x3 <= xMax; _x3 += 0.1) {
      var _y3 = (rhs - coefX1 * _x3) / coefX2;
      trace.x.push(_x3);
      trace.y.push(_y3);
    }
  }
  return trace;
}

// Function to calculate intersection with x-axis (y = 0)
function intersecaoComEixoX(restricao) {
  var coefX1 = restricao.coefX1,
    coefX2 = restricao.coefX2,
    rhs = restricao.rhs;
  if (coefX2 === 0) return null;
  var x = rhs / coefX1;
  return x >= 0 ? {
    x: x,
    y: 0
  } : null;
}

// Function to calculate intersection with y-axis (x = 0)
function intersecaoComEixoY(restricao) {
  var coefX1 = restricao.coefX1,
    coefX2 = restricao.coefX2,
    rhs = restricao.rhs;
  if (coefX1 === 0) return null;
  var y = rhs / coefX2;
  return y >= 0 ? {
    x: 0,
    y: y
  } : null;
}

// Find the optimal point based on the objective function
function encontrarPontoOtimo(intersecoes, coefObjetivo, tipoObjetivo) {
  // Filtra pontos para descartar infinitos
  var intersecoesValidas = intersecoes.filter(function (ponto) {
    return isFinite(ponto.x) && isFinite(ponto.y);
  });
  if (!intersecoesValidas.length) {
    console.log("Nenhum ponto de interseção viável encontrado.");
    return null;
  }
  var pontoOtimo = null;
  var valorOtimo = tipoObjetivo === 'maximize' ? -Infinity : Infinity;
  intersecoesValidas.forEach(function (ponto) {
    var valorAtual = coefObjetivo[0] * ponto.x + coefObjetivo[1] * ponto.y;
    console.log("Analisando Ponto (".concat(ponto.x, ", ").concat(ponto.y, "): Valor da Fun\xE7\xE3o Objetivo = ").concat(valorAtual));
    if (tipoObjetivo === 'maximize' && valorAtual >= valorOtimo || tipoObjetivo === 'minimize' && valorAtual <= valorOtimo) {
      pontoOtimo = ponto;
      valorOtimo = valorAtual;
      console.log("Novo ponto \xF3timo encontrado: (".concat(ponto.x, ", ").concat(ponto.y, ") com valor ").concat(valorOtimo));
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
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to find intersection between two constraints
function encontrarIntersecao(restricao1, restricao2) {
  var a1 = restricao1.coefX1;
  var b1 = restricao1.coefX2;
  var c1 = restricao1.rhs;
  var a2 = restricao2.coefX1;
  var b2 = restricao2.coefX2;
  var c2 = restricao2.rhs;
  var det = a1 * b2 - a2 * b1;
  if (Math.abs(det) < 0.0001) {
    return null;
  }
  var x = (c1 * b2 - c2 * b1) / det;
  var y = (a1 * c2 - a2 * c1) / det;
  return {
    x: x,
    y: y
  };
}

/***/ }),

/***/ "./src/scss/app.scss":
/*!***************************!*\
  !*** ./src/scss/app.scss ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*****************************************************!*\
  !*** multi ./src/js/grafico.js ./src/scss/app.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /home/lucas/Documents/Projetos/Academicos/griffSolver/src/js/grafico.js */"./src/js/grafico.js");
module.exports = __webpack_require__(/*! /home/lucas/Documents/Projetos/Academicos/griffSolver/src/scss/app.scss */"./src/scss/app.scss");


/***/ })

/******/ });