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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.UATU = void 0;
var apiService_1 = require("./services/apiService");
var constant_1 = require("./constants/constant");
var UATU = /** @class */ (function () {
    function UATU(apiKey, address, wallet) {
        this.wallet = wallet;
        this.address = '';
        // private version:string="1.0.1";
        this.apiKey = "";
        if (wallet || address) {
            this.verify(apiKey, address, wallet);
        }
    }
    UATU.prototype.getSignature = function (query) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var message;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        message = {
                            key: this.apiKey,
                            query: query
                        };
                        return [4 /*yield*/, ((_a = this.wallet) === null || _a === void 0 ? void 0 : _a.signMessage(JSON.stringify(message)))];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    UATU.prototype.getHeaders = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var signature;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSignature(query)];
                    case 1:
                        signature = _a.sent();
                        return [2 /*return*/, {
                                headers: {
                                    address: this.address,
                                    "x-api-key": this.apiKey,
                                    "signature": signature
                                }
                            }];
                }
            });
        });
    };
    UATU.prototype.verify = function (apiKey, address, wallet) {
        var _a;
        this.wallet = wallet !== null && wallet !== void 0 ? wallet : null;
        this.address = (_a = address.toLowerCase()) !== null && _a !== void 0 ? _a : wallet.address.toLowerCase();
        this.apiKey = apiKey;
        return this;
    };
    UATU.prototype.watch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var headers, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (this.address.length <= 0 || this.apiKey.length <= 0)
                            throw new Error("Call Uatu verify first By passing wallet and apiKey");
                        return [4 /*yield*/, this.getHeaders("watch")];
                    case 1:
                        headers = _a.sent();
                        return [4 /*yield*/, (0, apiService_1.getWallet)(headers)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [2 /*return*/, error_1["response"]];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UATU.prototype.watchPrice = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var headers, queryParam, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (this.address.length <= 0 || this.apiKey.length <= 0)
                            throw new Error("Call Uatu verify first By passing wallet and apiKey");
                        return [4 /*yield*/, this.getHeaders("watchPrice")];
                    case 1:
                        headers = _a.sent();
                        queryParam = this.makeQueryString(query);
                        return [4 /*yield*/, (0, apiService_1.watchPrice)(headers, queryParam)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [2 /*return*/, error_2["response"]];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UATU.prototype.askPrice = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var headers, queryParam, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (this.address.length <= 0 || this.apiKey.length <= 0)
                            throw new Error("Call Uatu verify first By passing wallet and apiKey");
                        return [4 /*yield*/, this.getHeaders("askPrice")];
                    case 1:
                        headers = _a.sent();
                        queryParam = this.makeQueryString(query);
                        return [4 /*yield*/, (0, apiService_1.askPriceApi)(headers, queryParam)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [2 /*return*/, error_3["response"]];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UATU.prototype.ask = function (que, coinsPayload) {
        return __awaiter(this, void 0, void 0, function () {
            var query, headers, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (this.address.length <= 0 || this.apiKey.length <= 0)
                            throw new Error("Call Uatu verify first  By passing wallet and apiKey");
                        query = que;
                        if (query == "price") {
                            return [2 /*return*/, this.askPrice(coinsPayload.split(","))];
                        }
                        if (que !== "wallet" && que !== "transactions" && que !== " " && que !== "nfts") {
                            query = this.filterQuery(que);
                        }
                        return [4 /*yield*/, this.getHeaders(query)];
                    case 1:
                        headers = _a.sent();
                        return [4 /*yield*/, (0, apiService_1.getQueryResult)(query, headers, que)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_4 = _a.sent();
                        return [2 /*return*/, error_4["response"]];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UATU.prototype.makeQueryString = function (query) {
        if (!query || query.length == 0)
            return "ALL";
        var res = "";
        for (var _i = 0, query_1 = query; _i < query_1.length; _i++) {
            var coin = query_1[_i];
            if (coin.toUpperCase() == "ALL") {
                return "ALL";
            }
            res += coin.toUpperCase();
        }
        return res;
    };
    UATU.prototype.filterQuery = function (input) {
        var _a;
        var match = [];
        var j = 0;
        input = input.toLowerCase();
        for (var i = 0; i < constant_1.queryArray.length; i++) {
            if (input.includes(constant_1.queryArray[i])) {
                if (match[0] == constant_1.routeArray[j])
                    continue;
                if (match[0] != constant_1.routeArray[j] && match.length < 1)
                    match.push(constant_1.routeArray[j]);
                else
                    return "query";
            }
            if (constant_1.indexOfQueryArray[j] == i)
                j++;
        }
        return (_a = match[0]) !== null && _a !== void 0 ? _a : "query";
    };
    return UATU;
}());
exports.UATU = UATU;
//# sourceMappingURL=main.js.map