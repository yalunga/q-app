import ApolloClient, { gql } from 'apollo-boost';

export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
});

export const GET_30_DAY_OVERVIEW = gql`
query Overview($since: String) {
    averageViewCount(since: $since)
    followerCount
    followingCount
    follows(since: $since){
        followedAt
    }
    following(since: $since){
        followedAt
    }
    streams(since: $since){
        streamId,
        startedAt,
        totalViews
    }
    followCountsByDayOfTheWeek {
        su,
        m,
        tu,
        w,
        th,
        f,
        sa
    }
    followCountsByHourOfTheDay {
        houroftheday,
        count
    }
    followCountsByGame{
        game,
        count
    }
    mostRecentFollows{
        fromName,
        fromId,
        followedAt        
    }
}
`

export const GET_FOLLOWER_DATA = gql`
query getFollowerChartData {
    followerCount
    followCountsByDayOfTheWeek {
        su,
        m,
        tu,
        w,
        th,
        f,
        sa
    }
    followCountsByHourOfTheDay {
        houroftheday,
        count
    }
    followCountsByGame{
        game,
        count
    }
}
`;

export const GET_FOLLOWER_CHART_DATA = gql`
query getFollowerChartData($measureOfTime: String!, $since: String) {
    followCountByDate(measureOfTime: $measureOfTime, since: $since) {
        date,
        count
    }
}
`;

export const GET_FOLLOWER_COUNTS_BY_TIME = gql`
query getFollowerChartData {
    followCountsByHourOfTheDay {
        houroftheday,
        count
    }
    followCountsByGame{
        game,
        count
    }
}
`;

export const GET_VIEW_COUNT_CHART_DATA = gql`
query getViewCountChartData($measureOfTime: String!, $since: String) {
    viewCountByDate(measureOfTime: $measureOfTime, since: $since){
        date,
        avg
    }
}
`;

export const GET_VIEW_COUNT_BY_WEEKDAY = gql`
query getViewCountByWeekdayData {
    viewCountByDayOfTheWeek {
        day,
        count
    }
}
`

export const GET_VIEW_COUNT_BY_HOUR = gql`
query getViewCountByHour {
    viewCountByHourOfTheDay {
        houroftheday,
        count
    }
}
`;

export const GET_VIEW_COUNT_BY_GAME = gql`
query getViewCountByGame {
    viewCountByGame {
        game,
        count
    }
}
`;
