import { PlayerDetails } from '$/types/index';
import axios, {
  AxiosResponse,
  AxiosRequestConfig,
  RawAxiosRequestHeaders,
} from 'axios';
import * as cheerio from 'cheerio';

function getSearchResults(query: string): Promise<string | never[]> {
  const client = axios.create({
    baseURL: 'https://tournamentsoftware.com/find/player',
    timeout: 5000,
  });

  return client
    .get(
      `/DoSearch?Page=1&SportID=2&Query=${encodeURIComponent(
        query,
      )}&X-Requested-With=XMLHttpRequest&_=0`,
    )
    .then((response: AxiosResponse) => {
      const data: string = response.data;
      return data;
    })
    .catch((error) => {
      console.error('Error fetching search results:', error);
      return [];
    });
}

async function getPlayerDetails(name: string): Promise<PlayerDetails> {
  const client = axios.create({
    baseURL: 'https://tournamentsoftware.com/find/player',
    timeout: 5000,
  });

  let result: PlayerDetails;

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
  } catch (error) {
    console.error('Error in getByName:', error);
    result = { name: '', club: '', id: '' };
  }

  return result;
}

export default getPlayerDetails;
