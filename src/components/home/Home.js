import React, { useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Eye, Users, Star, Monitor, UserPlus, Video } from 'react-feather';
import * as R from 'ramda';

import Nav from '../nav/Nav.js';
import StatCard from './StatCard';
import Followers from '../followers/Followers';
import Viewers from '../viewers/Viewers';
import Streams from '../streams/Streams';
import { fetchTwitchUser, fetchTwitchUserFollows, fetchTwitchUserStreams, fetchTwitchUserViews } from '../../redux/actions/twitchActions.js';
import {
  followsGainedInThePast30DaysSelector,
  averageViewCountInThePast30DaysSelector,
  totalViewsInThePast30DaysSelector
} from '../../redux/selectors/twitchSelectors';

const abbreviate = require('number-abbreviate')

const mapStateToProps = (state) => ({
  user: state.user,
  streams: state.streams,
  follows: state.follows,
  views: state.views,
  recentFollowsGained: followsGainedInThePast30DaysSelector(state),
  recentAverageViews: averageViewCountInThePast30DaysSelector(state),
  recentTotalViews: totalViewsInThePast30DaysSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  getTwitchUser: (twitchId) => dispatch(fetchTwitchUser(twitchId)),
  getTwitchStreams: (twitchId) => dispatch(fetchTwitchUserStreams(twitchId)),
  getTwitchFollows: (twitchId) => dispatch(fetchTwitchUserFollows(twitchId)),
  getTwitchViews: (twitchId) => dispatch(fetchTwitchUserViews(twitchId)),
});

const Home = (props) => {
  const twitchId = props.match.params.id;
  const {
    user,
    streams,
    follows,
    views,
    getTwitchFollows,
    getTwitchUser,
    getTwitchStreams,
    getTwitchViews,
    recentFollowsGained,
    recentAverageViews,
    recentTotalViews
  } = props;
  useEffect(() => {
    getTwitchFollows(twitchId);
    getTwitchStreams(twitchId);
    getTwitchUser(twitchId);
    getTwitchViews(twitchId);
  }, []);
  const loading = (!user || !streams || !follows || !views);
  if (loading) {
    return <div></div>;
  }
  return (
    <Nav title='Home'>
      <h1 className='text-3xl font-medium ml-4 mt-4'>Overview (past 30 days)</h1>
      <div className='flex flex-col'>
        <div className='w-full p-4 flex flex-col lg:flex-row'>
          <div className='bg-white lg:w-1/3 shadow-md rounded-md p-4' align='center' style={{ maxHeight: '400px' }}>
            <div className='w-20 h-20 rounded-full border-gray-500 border-2'
            >
              <img src={user.profile_image_url} className='rounded-full w-full h-full' />
            </div>
            <div className='w-full mt-2'>
              <div>
                <p className='font-bold m-0' weight='bold'>{user.display_name}</p>
                <p className='text-xs text-gray-600 m-0'>@{user.display_name}</p>
              </div>
              <div className='w-full border-b-2 border-gray-200 flex'>
                <div className='align items-center flex content-center flex-col justify-center p-2 w-1/3'>
                  <p style={{ color: '#1483FE' }}>{follows.length > 0 ? follows[follows.length - 1].count : 'N/A'}</p>
                  <p className='text-sm text-gray-600'>Followers</p>
                </div>
                <div className='align items-center flex content-center flex-col justify-center p-2 border-l-2 border-r-2 border-gray-200 w-1/3'>
                  <p style={{ color: '#1483FE' }}>12</p>
                  <p className='text-sm text-gray-600'>Following</p>
                </div>
                <div className='align items-center flex content-center flex-col justify-center p-2 w-1/3'>
                  <p style={{ color: '#1483FE' }}>22.5K</p>
                  <p className='text-sm text-gray-600'>Subscribers</p>
                </div>
              </div>
              <p className='text-center text-sm mt-2'>
                {user.description.length > 150 ? `${user.description.slice(0, 150)}...` : user.description}
              </p>
              {user.broadcaster_type === 'partner' && (
                <div className='p-1 mt-2 w-20 rounded-md bg-purple-200'>
                  <span className='text-purple-600 text-sm font-semibold'>Partner</span>
                </div>
              )}
            </div>
          </div>
          <div className='w-full mt-2 grid grid-cols-1 grid-rows-6 gap-4 md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3 lg:grid-rows-2 lg:mt-0 lg:ml-4'>
            <StatCard
              value={streams
                ? R.filter((stream) => moment(stream.startedAt).isAfter(moment().subtract(1, 'months')), streams).length
                : 0
              }
              color='#836CE8'
              icon={<Video size={24} color='#836CE8' />}
              title='Streams'
              growth={1.2}
            />
            <StatCard
              value={follows ? abbreviate(recentFollowsGained, 2) : 0}
              color='#0585FE'
              icon={<Users size={24} color='#0585FE' />}
              title='Followers'
              growth={2.4}
            />
            <StatCard
              value={12}
              color='#FDBC03'
              icon={<UserPlus size={24} color='#FDBC03' />}
              title='Following'
              growth={0.1}
            />
            <StatCard
              value={abbreviate(recentAverageViews, 2)}
              color='#F02A2B'
              icon={<Monitor size={24} color='#F02A2B' />}
              title='Average Viewers'
              growth={-0.2}
            />
            <StatCard
              value={abbreviate(recentTotalViews, 2)}
              color='#3ED599'
              icon={<Eye size={24} color='#3ED599' />}
              title='Total Views'
              growth={10.1}
            />
            <StatCard
              value='22.5K'
              color='#FDBC03'
              icon={<Star size={24} color='#FDBC03' />}
              title='Subscribers'
              growth={0.3}
            />
          </div>
        </div>
        <Streams streams={streams} />
        <Followers twitchId={twitchId} follows={follows} />
        <Viewers twitchId={twitchId} views={views} />
        <div className='p-4'>
          <h1 className='text-3xl font-medium'>Subscribers</h1>
          <div className='flex flex-col'>
            <span>Please login to begin tracking Subscribers</span>
          </div>
        </div>
      </div>
    </Nav>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
