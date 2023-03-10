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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueryResult = exports.askPriceApi = exports.watchPrice = exports.getWallet = void 0;
var events_1 = __importDefault(require("events"));
var axios_1 = __importDefault(require("axios"));
var ws_1 = __importDefault(require("ws"));
var urlVar_1 = require("../constants/urlVar");
var getWallet = function (headers) { return __awaiter(void 0, void 0, void 0, function () {
    var ws_2, ee, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.get("".concat(urlVar_1.EVMURL, "/watch-me"), headers)];
            case 1:
                _a.sent();
                ws_2 = new ws_1.default("".concat(urlVar_1.wsEVMURL, "/watch-me/").concat(headers["headers"]["address"]));
                ee = new events_1.default();
                ws_2.on("open", function () {
                    ws_2.on("message", function (data) {
                        var res = JSON.parse(data);
                        switch (res.query) {
                            case "asset":
                                ee.emit('asset', res.data);
                                break;
                            case "transaction":
                                ee.emit("transaction", res.data);
                                break;
                            case "nft":
                                ee.emit("nft", res.data);
                                break;
                            case "wallet":
                                ee.emit("wallet", res.data);
                                break;
                            default:
                                ee.emit("message", res);
                        }
                    });
                });
                return [2 /*return*/, ee];
            case 2:
                error_1 = _a.sent();
                throw new Error(error_1);
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getWallet = getWallet;
var watchPrice = function (headers, query) { return __awaiter(void 0, void 0, void 0, function () {
    var ws_3, ee;
    return __generator(this, function (_a) {
        try {
            ws_3 = new ws_1.default("ws://localhost:8006/price?symbol=".concat(query));
            ee = new events_1.default();
            ws_3.on("open", function () {
                ws_3.on("message", function (data) {
                    var res = JSON.parse(data);
                    ee.emit("ticker", res);
                });
            });
            return [2 /*return*/, ee];
        }
        catch (error) {
            throw new Error(error);
        }
        return [2 /*return*/];
    });
}); };
exports.watchPrice = watchPrice;
var askPriceApi = function (headers, query) { return __awaiter(void 0, void 0, void 0, function () {
    var error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.get("".concat(urlVar_1.priceTickerUrl, "/price?symbol=").concat(query), headers)];
            case 1: return [2 /*return*/, _a.sent()];
            case 2:
                error_2 = _a.sent();
                throw new Error(error_2);
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.askPriceApi = askPriceApi;
var getQueryResult = function (query, headers, payload) { return __awaiter(void 0, void 0, void 0, function () {
    var res, _a, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 12, , 13]);
                _a = query;
                switch (_a) {
                    case "transactions": return [3 /*break*/, 1];
                    case "wallet": return [3 /*break*/, 3];
                    case "assets": return [3 /*break*/, 5];
                    case "nfts": return [3 /*break*/, 7];
                }
                return [3 /*break*/, 9];
            case 1: return [4 /*yield*/, axios_1.default.get("".concat(urlVar_1.EVMURL, "/getTransactions"), headers)];
            case 2:
                res = _b.sent();
                return [2 /*return*/, transactionResponse(res.data.data)];
            case 3: return [4 /*yield*/, axios_1.default.get("".concat(urlVar_1.EVMURL, "/getWAllet"), headers)];
            case 4:
                res = _b.sent();
                return [2 /*return*/, walletResponse(res.data.data)];
            case 5: return [4 /*yield*/, axios_1.default.get("".concat(urlVar_1.EVMURL, "/getAssets"), headers)];
            case 6:
                res = _b.sent();
                return [2 /*return*/, assetResponse(res.data.data)];
            case 7: return [4 /*yield*/, axios_1.default.get("".concat(urlVar_1.EVMURL, "/getNftAssets"), headers)];
            case 8:
                res = _b.sent();
                return [2 /*return*/, nftResponse(res.data.data)];
            case 9: return [4 /*yield*/, axios_1.default.get("".concat(urlVar_1.EVMURL, "/query/").concat(payload), headers)];
            case 10:
                res = _b.sent();
                return [2 /*return*/, res];
            case 11: return [3 /*break*/, 13];
            case 12:
                error_3 = _b.sent();
                console.log(error_3);
                throw new Error(error_3);
            case 13: return [2 /*return*/];
        }
    });
}); };
exports.getQueryResult = getQueryResult;
var transactionResponse = function (data) {
    var response = [];
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var d = data_1[_i];
        var obj = {
            hash: d["hash"] || null,
            fromAddress: d["fromAddress"] || null,
            toAddress: d["toAddress"] || null,
            value: d["value"] || null,
            gas: d["gas"] || null,
            gasPrice: d["gasPrice"] || null,
            txnType: d["txnType"] || null,
            chainId: d["chainId"] || null,
            coin: d["coin"] || null,
            blockNumber: d["blockNumber"] || null,
            txnStatus: d["txnStatus"] || null,
            txnTime: d["txnTime"] || null
        };
        response.push(obj);
    }
    return response;
};
var nftResponse = function (data) {
    var response = [];
    for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
        var d = data_2[_i];
        var obj = {
            token_address: d.token_address || null,
            token_id: d.token_id || null,
            owner_of: d.owner_of || null,
            block_number: d.block_number || null,
            block_number_minted: d.block_number_minted || null,
            token_hash: d.token_hash || null,
            amount: d.amount || null,
            contract_type: d.contract_type || null,
            name: d.name || null,
            symbol: d.symbol || null,
            token_uri: d.token_uri || null,
            minter_address: d.minter_address || null,
            chainId: d.chainId || null,
            timestamp: d.timestamp || null
        };
        response.push(obj);
    }
    return response;
};
var assetResponse = function (data) {
    var response = [];
    for (var _i = 0, data_3 = data; _i < data_3.length; _i++) {
        var d = data_3[_i];
        var obj = {
            value: d.value || null,
            symbol: d.symbol || null,
            chain: d.chain || null
        };
        response.push(obj);
    }
    return response;
};
var walletResponse = function (data) {
    return {
        walletAddress: data.walletAddress,
        assets: assetResponse(data["balances"]),
        transactions: transactionResponse(data["transactions"]),
        nftAssets: nftResponse(data["nftAssets"])
    };
};
//# sourceMappingURL=apiService.js.map