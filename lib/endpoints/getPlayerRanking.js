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
exports.getPlayerRanking = void 0;
var querystring_1 = require("querystring");
var mappers_1 = require("../utils/mappers");
var getPlayerRanking = function (config) { return function (_a) {
    var startDate = _a.startDate, endDate = _a.endDate, matchType = _a.matchType, rankingFilter = _a.rankingFilter, maps = _a.maps, minMapCount = _a.minMapCount, country = _a.country, bestOfX = _a.bestOfX;
    return __awaiter(void 0, void 0, void 0, function () {
        var query, $;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    query = querystring_1.stringify({
                        startDate: startDate,
                        endDate: endDate,
                        matchType: matchType,
                        rankingFilter: rankingFilter,
                        maps: maps,
                        minMapCount: minMapCount,
                        country: country,
                        bestOfX: bestOfX
                    });
                    return [4, mappers_1.fetchPage(config.hltvUrl + "/stats/players?" + query, config.loadPage)];
                case 1:
                    $ = _b.sent();
                    return [2, mappers_1.toArray($('.player-ratings-table tbody tr')).map(function (playerRow) {
                            var id = Number(playerRow.find('.playerCol a').first().attr('href').split('/')[3]);
                            var country = playerRow.find('.playerCol img.flag').eq(0).attr('alt');
                            var name = playerRow.find('.playerCol').text();
                            var rating = Number(playerRow.find('.ratingCol').text());
                            var teams = mappers_1.toArray(playerRow.find('.teamCol a')).map(function (teamEl) {
                                var id;
                                var hrefAttr = $(teamEl).attr('href');
                                if (hrefAttr) {
                                    var idRegex = hrefAttr.match(/\/stats\/teams\/(\d+)\/.*/);
                                    if (idRegex && idRegex[1]) {
                                        id = Number(idRegex[1]);
                                    }
                                }
                                var name = $(teamEl).find('img.logo').eq(0).attr('alt') || '';
                                return {
                                    id: id,
                                    name: name
                                };
                            });
                            var maps = Number(playerRow.find('td.statsDetail').eq(0).text());
                            var kdDiff = Number(playerRow.find('td.kdDiffCol').text());
                            var kd = Number(playerRow.find('td.statsDetail').eq(1).text());
                            return {
                                id: id,
                                name: name,
                                country: country,
                                teams: teams,
                                maps: maps,
                                kdDiff: kdDiff,
                                kd: kd,
                                rating: rating
                            };
                        })];
            }
        });
    });
}; };
exports.getPlayerRanking = getPlayerRanking;
