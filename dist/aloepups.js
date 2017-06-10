exports["AloePups"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * AloePups
 * autore:          Gennaro Bosone < gennaro.bs@gmail.com >
 * data creazione:  31-01-2017
 *
 * Interfaccia al Framework SASS AloePups
 */
var AloePups = function () {

    /**
     * Caricamento delle configurazioni dall'elemento #__aloepups
     */
    function AloePups() {
        _classCallCheck(this, AloePups);

        var div = this.getAloePupsElement();

        try {
            var content = window.getComputedStyle(div).content;
            Object.assign(this, this.parse(content));
            this.sanitize();
        } catch (e) {
            console.error('[AloePups]\tImpossibile caricare i settaggi.');
        }

        div.remove();

        window.addEventListener('resize', function (e) {}, { passive: true });

        this.onResize();
    }

    /**
     * Parse JSON from #__aloepups content
     *
     * @param {String} content
     */


    _createClass(AloePups, [{
        key: 'parse',
        value: function parse(content) {
            content = content.replace(/[\\]/g, '');

            content = content.substr(1).substr(0, content.length - 2).replace(/[\']/g, '"');

            return JSON.parse(content);
        }

        /**
         * Crea l'elemento con i settaggi in fromato JSON nell'attrivuto content
         */

    }, {
        key: 'getAloePupsElement',
        value: function getAloePupsElement() {
            var div = document.createElement('div');
            div.id = '__aloepups';
            document.body.appendChild(div);

            return div;
        }

        /**
         * 
         */

    }, {
        key: 'onResize',
        value: function onResize() {
            this.HTMLFontSize = parseFloat(window.getComputedStyle(document.body).getPropertyValue('font-size'));
            this.windowHeight = window.innerHeight;
            this.windowWidth = window.innerWidth;
        }

        /**
         * Return window heigth
         */

    }, {
        key: 'getWindowHeight',
        value: function getWindowHeight() {
            return this.windowWidth;
        }

        /**
         * Return window width
         */

    }, {
        key: 'getWindowHeight',
        value: function getWindowHeight() {
            return this.windowWidth;
        }

        /**
         * Ritorna l'unità di misura del argomento
         */

    }, {
        key: 'getUnit',
        value: function getUnit(value) {
            return typeof value !== 'number' ? value.replace(parseFloat(value), '') : '';
        }

        /**
         * Get modular scale ratio
         * 
         * @return float
         */

    }, {
        key: 'ratio',
        value: function ratio() {
            return this.scales.ratios[this.scales.ratio];
        }

        /**
         * Modular scale
         * @param { Number } Il numero di incrementi del valore di base
         * @param { Number, Optional } valore di base
         * @param { Number, Optional } incremento del valore di base
         */

    }, {
        key: 'scale',
        value: function scale(increment, value, ratio) {
            value = parseFloat(value || this.scales.base);
            ratio = parseFloat(ratio || this.ratio());

            for (var i = Math.abs(increment); i > 0; i--) {
                value = increment > 0 ? value * ratio : value / ratio;
            }return value + this.getUnit(value);
        }

        /**
         * Ritorna una velocità settata in pupsConfig
         *
         * @param {String} s
         * @returns int
         */

    }, {
        key: 'speed',
        value: function speed(s) {
            return this.animation.speeds[s ? s : this.animation.base_speed];
        }

        /**
         * Ritorna un valore
         *
         * @param {String} s
         * @returns int
         */

    }, {
        key: 'spacing',
        value: function spacing(s) {
            return this.spacings.sizes[s];
        }

        /**
         * @param {String} value
         * @return float
         */

    }, {
        key: 'remToPX',
        value: function remToPX(value) {
            var unit = this.getUnit(value);

            switch (unit) {
                case 'em':
                case 'rem':
                    return parseFloat(value) * this.HTMLFontSize;
                case 'px':
                    return parseFloat(value);
            }
        }

        /**
         * @param {String} value
         * @return float
         */

    }, {
        key: 'pxToREM',
        value: function pxToREM(value) {
            var unit = this.getUnit(value);

            switch (unit) {
                case 'em':
                case 'rem':
                    return parseFloat(value);
                case 'px':
                    return parseFloat(value) / this.HTMLFontSize;
            }
        }

        /**
         * Cancella un timeout
         */

    }, {
        key: 'clearDelay',
        value: function clearDelay(d) {
            d && window.clearTimeout(d);
        }

        /**
         * Timeout function
         */

    }, {
        key: 'delay',
        value: function delay(callback, speed, context) {
            return window.setTimeout(function (e) {
                callback.call(context);
            }, typeof speed == 'string' ? this.speed(speed) : speed);
        }

        /**
         * Sanitizza l'oggetto configs
         */

    }, {
        key: 'sanitize',
        value: function sanitize() {
            var _this = this;

            if (this.animation && this.animation.speeds) Object.keys(this.animation.speeds).forEach(function (k) {
                _this.animation.speeds[k] = _this.stringToMilliseconds(_this.animation.speeds[k]);
            });
        }

        /**
         * Converte un valore di tipo string (s, ms)
         *
         * @param {String} str
         * @return {Float} tempo
         */

    }, {
        key: 'stringToMilliseconds',
        value: function stringToMilliseconds(str) {
            if (str.indexOf('ms') >= 0) return parseFloat(str);else if (str.indexOf('s') >= 0) return parseFloat(str) * 1000;

            return parseFloat(str);
        }
    }]);

    return AloePups;
}();

exports.default = new AloePups();

/***/ })
/******/ ]);