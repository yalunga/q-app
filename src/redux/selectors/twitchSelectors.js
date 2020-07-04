import { createSelector } from 'reselect';
import * as R from 'ramda';
import moment from 'moment';
import { followerViews, viewCountViews } from '../constants/twitchConstants';

const twitchFollowSelect = (state) => state.follows;
const twitchViewSelect = (state) => state.views;
const twitchStreamSelect = (state) => state.streams;

export const followerViewSelect = (state) => state.followerView;
export const viewCountViewSelect = (state) => state.viewCountView;

const groupFollowsByMonth = (follows) => {
  const formattedFollowsGroupedByMonth = [];
  const followsGroupedByMonth = R.groupBy((follow) => moment(follow.timestamp).startOf('month').unix(), follows);
  R.forEachObjIndexed((value) => {
    formattedFollowsGroupedByMonth.push(R.head(value));
  }, followsGroupedByMonth);
  return formattedFollowsGroupedByMonth;
};

const groupFollowsByDay = (follows) => {
  const formattedFollowsGroupedByDay = [];
  const followsGroupedByDay = R.groupBy((follow) => moment(follow.timestamp).startOf('day').unix(), follows);
  R.forEachObjIndexed((value) => {
    formattedFollowsGroupedByDay.push(R.last(value));
  }, followsGroupedByDay);
  return formattedFollowsGroupedByDay;
};

const groupViewCountsByMonth = (views) => {
  const formattedViewCountsGroupedByMonth = [];
  const viewCountsGroupedByMonth = R.groupBy((view) => moment(view.timestamp).startOf('month').unix(), views);
  R.forEachObjIndexed((viewCounts, key) => {
    formattedViewCountsGroupedByMonth.push({
      timestamp: key,
      avg: R.mean(R.map((viewCount) => viewCount.count, viewCounts))
    });
  }, viewCountsGroupedByMonth);
  return formattedViewCountsGroupedByMonth;
};

const groupViewCountsByDay = (views) => {
  const formattedViewCountsGroupedByDay = [];
  const viewCountsGroupedByDay = R.groupBy((view) => moment(view.timestamp).startOf('day').unix(), views);
  R.forEachObjIndexed((viewCounts, key) => {
    formattedViewCountsGroupedByDay.push({
      timestamp: key,
      avg: R.mean(R.map((viewCount) => viewCount.count, viewCounts))
    });
  }, viewCountsGroupedByDay);
  return formattedViewCountsGroupedByDay;
};

export const followsChartDataSelector = createSelector(
  [twitchFollowSelect, followerViewSelect],
  (follows, followerView) => {
    if (R.any(R.equals(followerView), [followerViews.ALL_TIME, followerViews.YEAR])) {
      if (R.equals(followerView, followerViews.YEAR)) {
        follows = R.filter((follow) => moment(follow.timestamp).isAfter(moment().subtract(1, 'years')), follows);
      }
      follows = groupFollowsByMonth(follows);
    } else {
      if (R.equals(followerView, followerViews.MONTH)) {
        follows = R.filter((follow) => moment(follow.timestamp).isAfter(moment().subtract(1, 'months')), follows);
      } else if (R.equals(followerView, followerViews.WEEK)) {
        follows = R.filter((follow) => moment(follow.timestamp).isAfter(moment().subtract(1, 'weeks')), follows);
      }
      follows = groupFollowsByDay(follows);
    }
    return R.addIndex(R.map)((follow, index) => ({
      ...follow,
      gained: (index === 0) ? 0 : follow.count - follows[index - 1].count
    }), follows)
  }
);

export const followsGainedInThePast30DaysSelector = createSelector(
  [twitchFollowSelect],
  ({ follows }) => {
    return R.filter((follow) => moment(follow.timestamp).isAfter(moment().subtract(30, 'days')), follows)
  },
  (recentFollows) => {
    return (recentFollows.length > 0 && R.is(Array, recentFollows))
      ? recentFollows[recentFollows.length - 1].count - recentFollows[0].count
      : 0
  }
)

export const followsGainedByWeekdaySelector = createSelector(
  [twitchFollowSelect, followerViewSelect],
  (follows, followerView) => {
    switch (followerView) {
      case followerViews.YEAR:
        follows = R.filter((follow) => moment(follow.timestamp).isAfter(moment().subtract(1, 'years')), follows);
        break;
      case followerViews.MONTH:
        follows = R.filter((follow) => moment(follow.timestamp).isAfter(moment().subtract(1, 'months')), follows);
        break;
      case followerViews.WEEK:
        follows = R.filter((follow) => moment(follow.timestamp).isAfter(moment().subtract(1, 'weeks')), follows);
        break;
      default:
        break;
    }
    follows = R.addIndex(R.map)((follow, index) => ({
      ...follow,
      gained: (index === 0) ? 0 : follow.count - follows[index - 1].count
    }), follows)
    const followsGroupedByDay = R.groupBy((follow) => moment(follow.timestamp).weekday(), follows);
    const data = [];
    R.forEachObjIndexed((value, key) => {
      data.push({ day: key, 'avg': R.reduce((acc, next) => acc + next.gained, 0, value) });
    }, followsGroupedByDay);
    return data;
  }
)

export const followsGainedByHourSelector = createSelector(
  [twitchFollowSelect, followerViewSelect],
  (follows, followerView) => {
    switch (followerView) {
      case followerViews.YEAR:
        follows = R.filter((follow) => moment(follow.timestamp).isAfter(moment().subtract(1, 'years')), follows);
        break;
      case followerViews.MONTH:
        follows = R.filter((follow) => moment(follow.timestamp).isAfter(moment().subtract(1, 'months')), follows);
        break;
      case followerViews.WEEK:
        follows = R.filter((follow) => moment(follow.timestamp).isAfter(moment().subtract(1, 'weeks')), follows);
        break;
      default:
        break;
    }
    follows = R.addIndex(R.map)((follow, index) => ({
      ...follow,
      gained: (index === 0) ? 0 : follow.count - follows[index - 1].count
    }), follows)
    const followsGroupedByHour = R.groupBy((follow) => moment(follow.timestamp).hour(), follows);
    const data = [];
    R.forEachObjIndexed((value, key) => {
      data.push({ hour: key, 'avg': R.reduce((acc, next) => acc + next.gained, 0, value) });
    }, followsGroupedByHour);
    return data;
  }
);

export const followsGainedByGameSelector = createSelector(
  [twitchFollowSelect, followerViewSelect],
  (follows, followerView) => {
    switch (followerView) {
      case followerViews.YEAR:
        follows = R.filter((follow) => moment(follow.timestamp).isAfter(moment().subtract(1, 'years')), follows);
        break;
      case followerViews.MONTH:
        follows = R.filter((follow) => moment(follow.timestamp).isAfter(moment().subtract(1, 'months')), follows);
        break;
      case followerViews.WEEK:
        follows = R.filter((follow) => moment(follow.timestamp).isAfter(moment().subtract(1, 'weeks')), follows);
        break;
      default:
        break;
    }
    follows = R.addIndex(R.map)((follow, index) => ({
      ...follow,
      gained: (index === 0) ? 0 : follow.count - follows[index - 1].count
    }), follows)
    const followsGroupedByGame = R.groupBy((follow) => follow.game, follows);
    const data = [];
    R.forEachObjIndexed((value, key) => {
      data.push({ game: key, gained: R.reduce((acc, next) => acc + next.gained, 0, value) });
    }, followsGroupedByGame);
    return data;
  }
);

export const averageViewCountInThePast30DaysSelector = createSelector(
  twitchViewSelect,
  (views) => {
    const viewsInThePast30Days = R.filter((view) => moment(view.timestamp).isAfter(moment().subtract(30, 'days')), views);
    return Math.round(R.mean(R.map((view) => view.count, viewsInThePast30Days)));
  }
);

export const totalViewsInThePast30DaysSelector = createSelector(
  twitchStreamSelect,
  (streams) => {
    const streamsInThePast30Days = R.filter((stream) => moment(stream.startedAt).isAfter(moment().subtract(30, 'days')), streams);
    if (R.isEmpty(streamsInThePast30Days)) {
      return 0;
    } else if (streamsInThePast30Days.length === 1) {
      const [stream] = streamsInThePast30Days;
      return stream.viewsAtEnd ? (stream.viewsAtEnd - stream.viewsAtBeginning) : 0;
    } else {
      const firstStream = R.head(streamsInThePast30Days);
      const lastStream = R.last(streamsInThePast30Days);
      return lastStream.viewsAtEnd
        ? (lastStream.viewsAtEnd - firstStream.viewsAtBeginning)
        : (lastStream.viewsAtBeginning - firstStream.viewsAtBeginning);
    }
  }
);

export const viewerChartDataSelector = createSelector(
  [twitchViewSelect, viewCountViewSelect],
  (views, viewCountView) => {
    if (R.any(R.equals(viewCountView), [viewCountViews.ALL_TIME, viewCountViews.YEAR])) {
      if (R.equals(viewCountView, viewCountViews.YEAR)) {
        views = R.filter((view) => moment(view.timestamp).isAfter(moment().subtract(1, 'years')), views);
      }
      views = groupViewCountsByMonth(views);
    } else {
      if (R.equals(viewCountView, viewCountViews.MONTH)) {
        views = R.filter((view) => moment(view.timestamp).isAfter(moment().subtract(1, 'months')), views);
      } else if (R.equals(viewCountView, viewCountViews.WEEK)) {
        views = R.filter((view) => moment(view.timestamp).isAfter(moment().subtract(1, 'weeks')), views);
      }
      views = groupViewCountsByDay(views);
    }
    return views;
  }
);

export const averageViewCountByWeekdaySelector = createSelector(
  [twitchViewSelect, viewCountViewSelect],
  (views, viewCountView) => {
    const formattedViews = [];
    if (R.equals(viewCountView, viewCountViews.YEAR)) {
      views = R.filter((view) => moment(view.timestamp).isAfter(moment().subtract(1, 'years')), views);
    }
    if (R.equals(viewCountView, viewCountViews.MONTH)) {
      views = R.filter((view) => moment(view.timestamp).isAfter(moment().subtract(1, 'months')), views);
    }
    if (R.equals(viewCountView, viewCountViews.WEEK)) {
      views = R.filter((view) => moment(view.timestamp).isAfter(moment().subtract(1, 'weeks')), views);
    }
    const viewsGroupedByDayOfTheWeek = R.groupBy((view) => moment(view.timestamp).day(), views);
    R.forEachObjIndexed((viewCounts, key) => {
      formattedViews.push({
        day: key,
        avg: R.mean(R.map((viewCount) => viewCount.count, viewCounts))
      })
    }, viewsGroupedByDayOfTheWeek);
    return formattedViews;
  }
);

export const averageViewCountByHourSelector = createSelector(
  [twitchViewSelect, viewCountViewSelect],
  (views, viewCountView) => {
    const formattedViews = [];
    if (R.equals(viewCountView, viewCountViews.YEAR)) {
      views = R.filter((view) => moment(view.timestamp).isAfter(moment().subtract(1, 'years')), views);
    }
    if (R.equals(viewCountView, viewCountViews.MONTH)) {
      views = R.filter((view) => moment(view.timestamp).isAfter(moment().subtract(1, 'months')), views);
    }
    if (R.equals(viewCountView, viewCountViews.WEEK)) {
      views = R.filter((view) => moment(view.timestamp).isAfter(moment().subtract(1, 'weeks')), views);
    }
    const viewsGroupedByDayOfTheHour = R.groupBy((view) => moment(view.timestamp).hour(), views);

    for (let i = 0; i < 24; i++) {
      formattedViews.push({
        hour: i,
        avg: viewsGroupedByDayOfTheHour[i]
          ? R.mean(R.map((viewCount) => viewCount.count, viewsGroupedByDayOfTheHour[i]))
          : 0
      });
    }
    return formattedViews;
  }
);

export const averageViewCountDuringStreamSelector = (streamId) => createSelector(
  [twitchViewSelect],
  (views) => {
    const filteredViews = R.filter((view) => R.equals(streamId, view.streamId), views);
    return Math.round(R.mean(R.map((view) => view.count, filteredViews)));
  }
);

export const followersGainedDuringStreamSelector = (streamId) => createSelector(
  [twitchFollowSelect],
  (follows) => {
    const filteredFollows = R.filter((follow) => R.equals(streamId, follow.streamId), follows);
    return !R.isEmpty(filteredFollows)
      ? R.subtract(R.last(filteredFollows).count, R.head(filteredFollows).count)
      : 'N/A';
  }
);
