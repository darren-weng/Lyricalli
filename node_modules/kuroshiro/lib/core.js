"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Kuroshiro Class
 */
var Kuroshiro = function () {
    /**
     * Constructor
     * @constructs Kuroshiro
     */
    function Kuroshiro() {
        _classCallCheck(this, Kuroshiro);

        this._analyzer = null;
    }

    /**
     * Initialize Kuroshiro
     * @memberOf Kuroshiro
     * @instance
     * @returns {Promise} Promise object represents the result of initialization
     */


    _createClass(Kuroshiro, [{
        key: "init",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(analyzer) {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!(!analyzer || (typeof analyzer === "undefined" ? "undefined" : _typeof(analyzer)) !== "object" || typeof analyzer.init !== "function" || typeof analyzer.parse !== "function")) {
                                    _context.next = 4;
                                    break;
                                }

                                throw new Error("Invalid initialization parameter.");

                            case 4:
                                if (!(this._analyzer == null)) {
                                    _context.next = 16;
                                    break;
                                }

                                _context.prev = 5;
                                _context.next = 8;
                                return analyzer.init();

                            case 8:
                                this._analyzer = analyzer;
                                _context.next = 14;
                                break;

                            case 11:
                                _context.prev = 11;
                                _context.t0 = _context["catch"](5);
                                throw _context.t0;

                            case 14:
                                _context.next = 17;
                                break;

                            case 16:
                                throw new Error("Kuroshiro has already been initialized.");

                            case 17:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[5, 11]]);
            }));

            function init(_x) {
                return _ref.apply(this, arguments);
            }

            return init;
        }()

        /**
         * Convert given string to target syllabary with options available
         * @memberOf Kuroshiro
         * @instance
         * @param {string} str Given String
         * @param {Object} [options] Settings Object
         * @param {string} [options.to="hiragana"] Target syllabary ["hiragana"|"katakana"|"romaji"]
         * @param {string} [options.mode="normal"] Convert mode ["normal"|"spaced"|"okurigana"|"furigana"]
         * @param {string} [options.romajiSystem="hepburn"] Romanization System ["nippon"|"passport"|"hepburn"]
         * @param {string} [options.delimiter_start="("] Delimiter(Start)
         * @param {string} [options.delimiter_end=")"] Delimiter(End)
         * @returns {Promise} Promise object represents the result of conversion
         */

    }, {
        key: "convert",
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(str, options) {
                var ROMAJI_SYSTEMS, rawTokens, tokens, romajiConv, hi, tmp, hpattern, hc, hreg, hmatches, pickKJ, hc1, notations, i, strType, pattern, isLastTokenKanji, subs, c, reg, matches, pickKanji, c1, c2, c3, result, n0, n1, n2, n3, n4, n5;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                options = options || {};
                                options.to = options.to || "hiragana";
                                options.mode = options.mode || "normal";
                                options.romajiSystem = options.romajiSystem || _util.ROMANIZATION_SYSTEM.HEPBURN;
                                options.delimiter_start = options.delimiter_start || "(";
                                options.delimiter_end = options.delimiter_end || ")";
                                str = str || "";

                                if (!(["hiragana", "katakana", "romaji"].indexOf(options.to) === -1)) {
                                    _context2.next = 9;
                                    break;
                                }

                                throw new Error("Invalid Target Syllabary.");

                            case 9:
                                if (!(["normal", "spaced", "okurigana", "furigana"].indexOf(options.mode) === -1)) {
                                    _context2.next = 11;
                                    break;
                                }

                                throw new Error("Invalid Conversion Mode.");

                            case 11:
                                ROMAJI_SYSTEMS = Object.keys(_util.ROMANIZATION_SYSTEM).map(function (e) {
                                    return _util.ROMANIZATION_SYSTEM[e];
                                });

                                if (!(ROMAJI_SYSTEMS.indexOf(options.romajiSystem) === -1)) {
                                    _context2.next = 14;
                                    break;
                                }

                                throw new Error("Invalid Romanization System.");

                            case 14:
                                _context2.next = 16;
                                return this._analyzer.parse(str);

                            case 16:
                                rawTokens = _context2.sent;
                                tokens = (0, _util.patchTokens)(rawTokens);

                                if (!(options.mode === "normal" || options.mode === "spaced")) {
                                    _context2.next = 36;
                                    break;
                                }

                                _context2.t0 = options.to;
                                _context2.next = _context2.t0 === "katakana" ? 22 : _context2.t0 === "romaji" ? 25 : _context2.t0 === "hiragana" ? 29 : 33;
                                break;

                            case 22:
                                if (!(options.mode === "normal")) {
                                    _context2.next = 24;
                                    break;
                                }

                                return _context2.abrupt("return", tokens.map(function (token) {
                                    return token.reading;
                                }).join(""));

                            case 24:
                                return _context2.abrupt("return", tokens.map(function (token) {
                                    return token.reading;
                                }).join(" "));

                            case 25:
                                romajiConv = function romajiConv(token) {
                                    var preToken = void 0;
                                    if ((0, _util.hasJapanese)(token.surface_form)) {
                                        preToken = token.pronunciation || token.reading;
                                    } else {
                                        preToken = token.surface_form;
                                    }
                                    return (0, _util.toRawRomaji)(preToken, options.romajiSystem);
                                };

                                if (!(options.mode === "normal")) {
                                    _context2.next = 28;
                                    break;
                                }

                                return _context2.abrupt("return", tokens.map(romajiConv).join(""));

                            case 28:
                                return _context2.abrupt("return", tokens.map(romajiConv).join(" "));

                            case 29:
                                for (hi = 0; hi < tokens.length; hi++) {
                                    if ((0, _util.hasKanji)(tokens[hi].surface_form)) {
                                        if (!(0, _util.hasKatakana)(tokens[hi].surface_form)) {
                                            tokens[hi].reading = (0, _util.toRawHiragana)(tokens[hi].reading);
                                        } else {
                                            // handle katakana-kanji-mixed tokens
                                            tokens[hi].reading = (0, _util.toRawHiragana)(tokens[hi].reading);
                                            tmp = "";
                                            hpattern = "";

                                            for (hc = 0; hc < tokens[hi].surface_form.length; hc++) {
                                                if ((0, _util.isKanji)(tokens[hi].surface_form[hc])) {
                                                    hpattern += "(.*)";
                                                } else {
                                                    hpattern += (0, _util.isKatakana)(tokens[hi].surface_form[hc]) ? (0, _util.toRawHiragana)(tokens[hi].surface_form[hc]) : tokens[hi].surface_form[hc];
                                                }
                                            }
                                            hreg = new RegExp(hpattern);
                                            hmatches = hreg.exec(tokens[hi].reading);

                                            if (hmatches) {
                                                pickKJ = 0;

                                                for (hc1 = 0; hc1 < tokens[hi].surface_form.length; hc1++) {
                                                    if ((0, _util.isKanji)(tokens[hi].surface_form[hc1])) {
                                                        tmp += hmatches[pickKJ + 1];
                                                        pickKJ++;
                                                    } else {
                                                        tmp += tokens[hi].surface_form[hc1];
                                                    }
                                                }
                                                tokens[hi].reading = tmp;
                                            }
                                        }
                                    } else {
                                        tokens[hi].reading = tokens[hi].surface_form;
                                    }
                                }

                                if (!(options.mode === "normal")) {
                                    _context2.next = 32;
                                    break;
                                }

                                return _context2.abrupt("return", tokens.map(function (token) {
                                    return token.reading;
                                }).join(""));

                            case 32:
                                return _context2.abrupt("return", tokens.map(function (token) {
                                    return token.reading;
                                }).join(" "));

                            case 33:
                                throw new Error("Unknown option.to param");

                            case 34:
                                _context2.next = 73;
                                break;

                            case 36:
                                if (!(options.mode === "okurigana" || options.mode === "furigana")) {
                                    _context2.next = 73;
                                    break;
                                }

                                notations = []; // [basic, basic_type[1=kanji,2=kana,3=others], notation, pronunciation]

                                i = 0;

                            case 39:
                                if (!(i < tokens.length)) {
                                    _context2.next = 62;
                                    break;
                                }

                                strType = (0, _util.getStrType)(tokens[i].surface_form);
                                _context2.t1 = strType;
                                _context2.next = _context2.t1 === 0 ? 44 : _context2.t1 === 1 ? 46 : _context2.t1 === 2 ? 54 : _context2.t1 === 3 ? 56 : 58;
                                break;

                            case 44:
                                notations.push([tokens[i].surface_form, 1, (0, _util.toRawHiragana)(tokens[i].reading), tokens[i].pronunciation || tokens[i].reading]);
                                return _context2.abrupt("break", 59);

                            case 46:
                                pattern = "";
                                isLastTokenKanji = false;
                                subs = []; // recognize kanjis and group them

                                for (c = 0; c < tokens[i].surface_form.length; c++) {
                                    if ((0, _util.isKanji)(tokens[i].surface_form[c])) {
                                        if (!isLastTokenKanji) {
                                            // ignore successive kanji tokens (#10)
                                            isLastTokenKanji = true;
                                            pattern += "(.*)";
                                            subs.push(tokens[i].surface_form[c]);
                                        } else {
                                            subs[subs.length - 1] += tokens[i].surface_form[c];
                                        }
                                    } else {
                                        isLastTokenKanji = false;
                                        subs.push(tokens[i].surface_form[c]);
                                        pattern += (0, _util.isKatakana)(tokens[i].surface_form[c]) ? (0, _util.toRawHiragana)(tokens[i].surface_form[c]) : tokens[i].surface_form[c];
                                    }
                                }
                                reg = new RegExp("^" + pattern + "$");
                                matches = reg.exec((0, _util.toRawHiragana)(tokens[i].reading));

                                if (matches) {
                                    pickKanji = 1;

                                    for (c1 = 0; c1 < subs.length; c1++) {
                                        if ((0, _util.isKanji)(subs[c1][0])) {
                                            notations.push([subs[c1], 1, matches[pickKanji], (0, _util.toRawKatakana)(matches[pickKanji])]);
                                            pickKanji += 1;
                                        } else {
                                            notations.push([subs[c1], 2, (0, _util.toRawHiragana)(subs[c1]), (0, _util.toRawKatakana)(subs[c1])]);
                                        }
                                    }
                                } else {
                                    notations.push([tokens[i].surface_form, 1, (0, _util.toRawHiragana)(tokens[i].reading), tokens[i].pronunciation || tokens[i].reading]);
                                }
                                return _context2.abrupt("break", 59);

                            case 54:
                                for (c2 = 0; c2 < tokens[i].surface_form.length; c2++) {
                                    notations.push([tokens[i].surface_form[c2], 2, (0, _util.toRawHiragana)(tokens[i].reading[c2]), tokens[i].pronunciation && tokens[i].pronunciation[c2] || tokens[i].reading[c2]]);
                                }
                                return _context2.abrupt("break", 59);

                            case 56:
                                for (c3 = 0; c3 < tokens[i].surface_form.length; c3++) {
                                    notations.push([tokens[i].surface_form[c3], 3, tokens[i].surface_form[c3], tokens[i].surface_form[c3]]);
                                }
                                return _context2.abrupt("break", 59);

                            case 58:
                                throw new Error("Unknown strType");

                            case 59:
                                i++;
                                _context2.next = 39;
                                break;

                            case 62:
                                result = "";
                                _context2.t2 = options.to;
                                _context2.next = _context2.t2 === "katakana" ? 66 : _context2.t2 === "romaji" ? 68 : _context2.t2 === "hiragana" ? 70 : 72;
                                break;

                            case 66:
                                if (options.mode === "okurigana") {
                                    for (n0 = 0; n0 < notations.length; n0++) {
                                        if (notations[n0][1] !== 1) {
                                            result += notations[n0][0];
                                        } else {
                                            result += notations[n0][0] + options.delimiter_start + (0, _util.toRawKatakana)(notations[n0][2]) + options.delimiter_end;
                                        }
                                    }
                                } else {
                                    // furigana
                                    for (n1 = 0; n1 < notations.length; n1++) {
                                        if (notations[n1][1] !== 1) {
                                            result += notations[n1][0];
                                        } else {
                                            result += "<ruby>" + notations[n1][0] + "<rp>" + options.delimiter_start + "</rp><rt>" + (0, _util.toRawKatakana)(notations[n1][2]) + "</rt><rp>" + options.delimiter_end + "</rp></ruby>";
                                        }
                                    }
                                }
                                return _context2.abrupt("return", result);

                            case 68:
                                if (options.mode === "okurigana") {
                                    for (n2 = 0; n2 < notations.length; n2++) {
                                        if (notations[n2][1] !== 1) {
                                            result += notations[n2][0];
                                        } else {
                                            result += notations[n2][0] + options.delimiter_start + (0, _util.toRawRomaji)(notations[n2][3], options.romajiSystem) + options.delimiter_end;
                                        }
                                    }
                                } else {
                                    // furigana
                                    result += "<ruby>";
                                    for (n3 = 0; n3 < notations.length; n3++) {
                                        result += notations[n3][0] + "<rp>" + options.delimiter_start + "</rp><rt>" + (0, _util.toRawRomaji)(notations[n3][3], options.romajiSystem) + "</rt><rp>" + options.delimiter_end + "</rp>";
                                    }
                                    result += "</ruby>";
                                }
                                return _context2.abrupt("return", result);

                            case 70:
                                if (options.mode === "okurigana") {
                                    for (n4 = 0; n4 < notations.length; n4++) {
                                        if (notations[n4][1] !== 1) {
                                            result += notations[n4][0];
                                        } else {
                                            result += notations[n4][0] + options.delimiter_start + notations[n4][2] + options.delimiter_end;
                                        }
                                    }
                                } else {
                                    // furigana
                                    for (n5 = 0; n5 < notations.length; n5++) {
                                        if (notations[n5][1] !== 1) {
                                            result += notations[n5][0];
                                        } else {
                                            result += "<ruby>" + notations[n5][0] + "<rp>" + options.delimiter_start + "</rp><rt>" + notations[n5][2] + "</rt><rp>" + options.delimiter_end + "</rp></ruby>";
                                        }
                                    }
                                }
                                return _context2.abrupt("return", result);

                            case 72:
                                throw new Error("Invalid Target Syllabary.");

                            case 73:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function convert(_x2, _x3) {
                return _ref2.apply(this, arguments);
            }

            return convert;
        }()
    }]);

    return Kuroshiro;
}();

var Util = {
    isHiragana: _util.isHiragana,
    isKatakana: _util.isKatakana,
    isKana: _util.isKana,
    isKanji: _util.isKanji,
    isJapanese: _util.isJapanese,
    hasHiragana: _util.hasHiragana,
    hasKatakana: _util.hasKatakana,
    hasKana: _util.hasKana,
    hasKanji: _util.hasKanji,
    hasJapanese: _util.hasJapanese,
    kanaToHiragna: _util.kanaToHiragna,
    kanaToKatakana: _util.kanaToKatakana,
    kanaToRomaji: _util.kanaToRomaji
};

Kuroshiro.Util = Util;

exports.default = Kuroshiro;
module.exports = exports["default"];