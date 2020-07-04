import {
  GET_TWITCH_USER,
  GET_TWITCH_USER_FOLLOWS,
  GET_TWITCH_USER_STREAMS,
  GET_TWITCH_USER_VIEWS,
  SET_LOADING,
  SET_FOLLOWER_VIEW,
  SET_VIEW_COUNT_VIEW
} from '../actions/twitchActions';
import { followerViews, viewCountViews } from '../constants/twitchConstants';
const init = () => ({
  user: null,
  follows: [],
  streams: [],
  views: [],
  followerView: followerViews.MONTH,
  viewCountView: viewCountViews.MONTH
});

export const twitchReducer = (state = init(), action) => {
  switch (action.type) {
    case GET_TWITCH_USER:
      return { ...state, user: action.user };
    case GET_TWITCH_USER_FOLLOWS:
      return { ...state, follows: action.follows };
    case GET_TWITCH_USER_STREAMS:
      return { ...state, streams: action.streams };
    case GET_TWITCH_USER_VIEWS:
      return { ...state, views: action.views };
    case SET_LOADING:
      return { ...state, loading: action.loading };
    case SET_FOLLOWER_VIEW:
      return { ...state, followerView: action.view }
    case SET_VIEW_COUNT_VIEW:
      return { ...state, viewCountView: action.view }
    default:
      return state;
  }
}