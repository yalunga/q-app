import axios from 'axios';
import config from './config';
const callTwitchApi = async (endpoint) => {
  const { data } = await axios.get(`${config.apiTwitchUrl}/${endpoint}`);
  return data;
};

export const twitchApi = {
  follows: {
    get: (twitchId) => {
      return callTwitchApi(`follow/${twitchId}`);
    }
  },
  users: {
    get: (twitchId) => {
      return callTwitchApi(`users/${twitchId}`);
    },
    search: (searchText) => {
      return callTwitchApi(`users?search=${searchText}`);
    }
  },
  streams: {
    get: (twitchId) => {
      return callTwitchApi(`streams/${twitchId}/get`);
    }
  },
  views: {
    get: (twitchId) => {
      return callTwitchApi(`views/${twitchId}`);
    }
  },
  games: {
    get: (streamId) => callTwitchApi(`streams/${streamId}/games`)
  }
}