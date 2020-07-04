import { twitchApi } from '../../api';

export const GET_TWITCH_USER = 'GET_TWITCH_USER';
export const GET_TWITCH_USER_STREAMS = 'GET_TWITCH_USER_STREAMS';
export const GET_TWITCH_USER_FOLLOWS = 'GET_TWITCH_USER_FOLLOWS';
export const GET_TWITCH_USER_VIEWS = 'GET_TWITCH_USER_VIEWS';
export const SET_LOADING = 'SET_LOADING';
export const SET_FOLLOWER_VIEW = 'SET_FOLLOW_VIEW'
export const SET_VIEW_COUNT_VIEW = 'SET_VIEW_COUNT_VIEW';

export const fetchTwitchUser = (twitchId) => (dispatch) => {
  twitchApi.users.get(twitchId)
    .then((user) => {
      dispatch({ type: GET_TWITCH_USER, user });
    });
}

export const fetchTwitchUserStreams = (twitchId) => (dispatch) => {
  twitchApi.streams.get(twitchId)
    .then((streams) => {
      dispatch({ type: GET_TWITCH_USER_STREAMS, streams });
    });

}

export const fetchTwitchUserFollows = (twitchId) => (dispatch) => {
  twitchApi.follows.get(twitchId)
    .then((follows) => {
      dispatch({ type: GET_TWITCH_USER_FOLLOWS, follows });
    });
}

export const fetchTwitchUserViews = (twitchId) => (dispatch) => {
  twitchApi.views.get(twitchId)
    .then((views) => {
      dispatch({ type: GET_TWITCH_USER_VIEWS, views });
    });
}

export const setFollowerView = (view) => ({
  type: SET_FOLLOWER_VIEW,
  view
});

export const setViewCountView = (view) => ({
  type: SET_VIEW_COUNT_VIEW,
  view
});