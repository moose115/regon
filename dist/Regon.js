"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var soap = require("soap");
var xml2js_1 = require("xml2js");
var Regon = /** @class */ (function () {
    function Regon(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.key, key = _c === void 0 ? '' : _c, _d = _b.dev, dev = _d === void 0 ? false : _d;
        this._key = dev ? 'abcde12345abcde12345' : key;
        this._service = dev ? constants_1.SERVICE_TEST : constants_1.SERVICE;
        this._wsdl = dev ? constants_1.WSDL_TEST : constants_1.WSDL;
        this._soapRegonPromise = this.createRegon();
    }
    Regon.prototype.createRegon = function () {
        return soap
            .createClientAsync(this._wsdl, { forceSoap12Headers: true })
            .then(function (regon) {
            regon.addHttpHeader('Content-Type', 'application/soap+xml; charset=utf-8');
            return regon;
        });
    };
    Regon.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var regon, sid, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._soapRegonPromise];
                    case 1:
                        regon = _a.sent();
                        this.addAction(regon, constants_1.ACTION_ZALOGUJ);
                        sid = regon
                            .ZalogujAsync({ pKluczUzytkownika: this._key })
                            .then(function (res) { return res[0].ZalogujResult; });
                        return [2 /*return*/, sid];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Regon.prototype.logout = function (sid) {
        return __awaiter(this, void 0, void 0, function () {
            var regon, hasLoggedOut, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this._soapRegonPromise];
                    case 1:
                        regon = _a.sent();
                        this.addAction(regon, constants_1.ACTION_WYLOGUJ);
                        return [4 /*yield*/, regon
                                .WylogujAsync({ pIdentyfikatorSesji: sid })
                                .then(function (res) { return res[0].WylogujResult; })];
                    case 2:
                        hasLoggedOut = _a.sent();
                        return [2 /*return*/, hasLoggedOut];
                    case 3:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Regon.prototype.getCompanyData = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var regon, sid, data, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this._soapRegonPromise];
                    case 1:
                        regon = _a.sent();
                        return [4 /*yield*/, this.login()];
                    case 2:
                        sid = _a.sent();
                        regon.addHttpHeader('sid', sid);
                        this.addAction(regon, constants_1.ACTION_SZUKAJ_PODMIOTY);
                        data = regon
                            .DaneSzukajPodmiotyAsync({ pParametryWyszukiwania: params })
                            .then(function (res) { return xml2js_1.parseStringPromise(res[0].DaneSzukajPodmiotyResult); })
                            .then(function (res) { return res.root && res.root.dane[0] && res.root.dane[0]; })
                            .catch(function (error) { return console.log(error); });
                        return [4 /*yield*/, this.logout(sid)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, data];
                    case 4:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Regon.prototype.addAction = function (regon, action) {
        regon.clearSoapHeaders();
        regon.addSoapHeader({
            To: this._service,
            Action: constants_1.ACTION + action
        }, '', 'wsa', 'http://www.w3.org/2005/08/addressing');
    };
    return Regon;
}());
exports.Regon = Regon;
