"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
function getSearchResults(query) {
    const client = axios_1.default.create({
        baseURL: 'https://tournamentsoftware.com/find/player',
        timeout: 5000,
    });
    return client
        .get(`/DoSearch?Page=1&SportID=2&Query=${encodeURIComponent(query)}&X-Requested-With=XMLHttpRequest&_=0`)
        .then((response) => {
        const data = response.data;
        return data;
    })
        .catch((error) => {
        console.error('Error fetching search results:', error);
        return [];
    });
}
async function getPlayerDetails(name) {
    const client = axios_1.default.create({
        baseURL: 'https://tournamentsoftware.com/find/player',
        timeout: 5000,
    });
    let result;
    try {
        const $ = cheerio.load(await getSearchResults(name));
        const club = $('small.media__subheading span.nav-link__value')
            .first()
            .text()
            .trim();
        console.log('Extracted Club:', club);
        const playerName = $('h5.media__title a.media__link span.nav-link__value')
            .first()
            .text()
            .trim();
        console.log('Player Name:', playerName);
        const playerId = $('h5.media__title span.media__title-aside')
            .first()
            .text()
            .replace(/[()]/g, '')
            .trim();
        console.log('Player ID:', playerId);
        result = { name: playerName, club: club, id: playerId };
        return result;
    }
    catch (error) {
        console.error('Error in getByName:', error);
        result = { name: '', club: '', id: '' };
    }
    return result;
}
exports.default = getPlayerDetails;
//# sourceMappingURL=api.js.map