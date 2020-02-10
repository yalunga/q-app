import ApolloClient, { gql } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';

const link = createHttpLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include'
});

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
}
`