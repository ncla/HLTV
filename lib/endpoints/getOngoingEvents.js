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
exports.getOngoingEvents = void 0;
var mappers_1 = require("../utils/mappers");
var getOngoingEvents = function (config) { return function () { return __awaiter(void 0, void 0, void 0, function () {
    var $, ongoingEventsToday, featuredEvents, ongoingEvents;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, mappers_1.fetchPage(config.hltvUrl + "/events", config.loadPage)];
            case 1:
                $ = _a.sent();
                ongoingEventsToday = mappers_1.toArray($('.tab-content').first().next().find('a')).map(function (eventEl) {
                    return eventEl.find('.event-name-small .text-ellipsis').text();
                });
                featuredEvents = mappers_1.toArray($('.tab-content#FEATURED a')).map(function (eventEl) {
                    return eventEl.find('.event-name-small .text-ellipsis').text();
                });
                ongoingEvents = mappers_1.toArray($('.tab-content').last().find('a')).map(function (eventEl) {
                    var dateSelector = '.eventDetails .col-desc span[data-unix]';
                    var name = eventEl.find('.event-name-small .text-ellipsis').text();
                    var id = Number(eventEl.attr('href').split('/')[2]);
                    var dateStart = eventEl.find(dateSelector).eq(0).data('unix');
                    var dateEnd = eventEl.find(dateSelector).eq(1).data('unix');
                    var today = ongoingEventsToday.includes(name);
                    var featured = featuredEvents.includes(name);
                    return {
                        name: name,
                        id: id,
                        dateStart: dateStart,
                        dateEnd: dateEnd || dateStart,
                        today: today,
                        featured: featured
                    };
                });
                return [2, ongoingEvents];
        }
    });
}); }; };
exports.getOngoingEvents = getOngoingEvents;
