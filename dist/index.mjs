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

// src/lib/api.ts
import axios from "axios";
import * as cheerio from "cheerio";
function getSearchResults(query) {
  const client = axios.create({
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
    const client = axios.create({
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
export {
  api_default as getPlayerDetails
};
//# sourceMappingURL=index.mjs.map