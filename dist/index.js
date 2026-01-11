"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var index_exports = {};
__export(index_exports, {
  getPlayerDetails: () => api_default
});
module.exports = __toCommonJS(index_exports);

// src/lib/api.ts
var import_axios = __toESM(require("axios"));
var cheerio = __toESM(require("cheerio"));
function getSearchResults(query) {
  const client = import_axios.default.create({
    baseURL: "https://tournamentsoftware.com/find/player",
    timeout: 5e3
  });
  return client.get(
    `/DoSearch?Page=1&SportID=2&Query=${encodeURIComponent(
      query
    )}&X-Requested-With=XMLHttpRequest&_=0`
  ).then((response) => {
    const data = response.data;
    return data;
  }).catch((error) => {
    console.error("Error fetching search results:", error);
    return [];
  });
}
function getPlayerDetails(name) {
  return __async(this, null, function* () {
    const client = import_axios.default.create({
      baseURL: "https://tournamentsoftware.com/find/player",
      timeout: 5e3
    });
    let result;
    try {
      const $ = cheerio.load(yield getSearchResults(name));
      const club = $("small.media__subheading span.nav-link__value").first().text().trim();
      console.log("Extracted Club:", club);
      const playerName = $("h5.media__title a.media__link span.nav-link__value").first().text().trim();
      console.log("Player Name:", playerName);
      const playerId = $("h5.media__title span.media__title-aside").first().text().replace(/[()]/g, "").trim();
      console.log("Player ID:", playerId);
      result = { name: playerName, club, id: playerId };
      return result;
    } catch (error) {
      console.error("Error in getByName:", error);
      result = { name: "", club: "", id: "" };
    }
    return result;
  });
}
var api_default = getPlayerDetails;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getPlayerDetails
});
//# sourceMappingURL=index.js.map