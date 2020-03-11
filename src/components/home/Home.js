import React from 'react';
import { Eye, Users, Star, Monitor, UserPlus, Video } from 'react-feather';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';
import * as R from 'ramda';

import Nav from '../nav/Nav.js';
import StatCard from './StatCard';
import { GET_30_DAY_OVERVIEW } from '../../utils/ApiUtils';
import Followers from '../followers/Followers';
import Viewers from '../viewers/Viewers';

const abbreviate = require('number-abbreviate')
const since = moment().subtract(30, 'days').toDate();

const getTotalViews = (streams) => {
  const viewCounts = R.pluck('totalViews')(streams);
  return R.sum(viewCounts);
}

export default () => {
  const { loading, error, data } = useQuery(GET_30_DAY_OVERVIEW, {
    variables: {
      since
    }
  });


  console.log(loading, error, data);
  if (loading) {
    return <div />;
  }

  const {
    averageViewCount,
    follows,
    streams,
    followingCount,
    followerCount,
    following
  } = data;

  return (
    <Nav title='Home'>
      <h1 className='text-3xl font-medium ml-4 mt-4'>Overview (past 30 days)</h1>
      <div className='flex flex-col'>
        <div className='w-full p-4 flex flex-col lg:flex-row'>
          <div className='bg-white w-auto shadow-md rounded p-4' align='center' style={{ maxHeight: '400px' }}>
            <div className='w-20 h-20 rounded-full border-gray-500 border-2'
            >
              <img src='//v2.grommet.io/assets/IMG_4245.jpg' className='rounded-full w-full h-full' />
            </div>
            <div className='w-full mt-2'>
              <div>
                <p className='font-bold m-0' weight='bold'>UserName</p>
                <p className='text-xs text-gray-600 m-0'>@UserName</p>
              </div>
              <div className='w-full border-b-2 border-gray-200 flex'>
                <div className='align items-center flex content-center flex-col justify-center p-2 w-1/3'>
                  <p style={{ color: '#1483FE' }}>{followerCount}</p>
                  <p className='text-sm text-gray-600'>Followers</p>
                </div>
                <div className='align items-center flex content-center flex-col justify-center p-2 border-l-2 border-r-2 border-gray-200 w-1/3'>
                  <p style={{ color: '#1483FE' }}>{followingCount}</p>
                  <p className='text-sm text-gray-600'>Following</p>
                </div>
                <div className='align items-center flex content-center flex-col justify-center p-2 w-1/3'>
                  <p style={{ color: '#1483FE' }}>22.5K</p>
                  <p className='text-sm text-gray-600'>Subscribers</p>
                </div>
              </div>
              <p className='text-center text-sm mt-2'>A description of the stream goes here. :)</p>
              <div className='p-1 mt-2 w-20 rounded bg-purple-200'>
                <span className='text-purple-600 text-sm font-semibold'>Partner</span>
              </div>
            </div>
          </div>
          <div className='w-full mt-2 grid grid-cols-1 grid-rows-6 gap-4 md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3 lg:grid-rows-2 lg:mt-0 lg:ml-4'>
            <StatCard
              value={streams ? abbreviate(streams.length, 2) : 0}
              color='#836CE8'
              icon={<Video size={24} color='#836CE8' />}
              title='Streams'
              growth={1.2}
            />
            <StatCard
              value={follows ? abbreviate(follows.length, 2) : 0}
              color='#0585FE'
              icon={<Users size={24} color='#0585FE' />}
              title='Followers'
              growth={2.4}
            />
            <StatCard
              value={following ? abbreviate(following.length, 2) : 0}
              color='#FDBC03'
              icon={<UserPlus size={24} color='#FDBC03' />}
              title='Following'
              growth={0.1}
            />

            <StatCard
              value={averageViewCount ? abbreviate(Math.round(averageViewCount), 2) : 0}
              color='#F02A2B'
              icon={<Monitor size={24} color='#F02A2B' />}
              title='Average Viewers'
              growth={-0.2}
            />
            <StatCard
              value={streams ? abbreviate(getTotalViews(streams), 2) : 0}
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
        <Followers />
        <Viewers />
        <div className='p-4'>
          <h1 className='text-3xl font-medium'>Subscribers</h1>
          <div className='flex flex-col'>
            <span>Please login to begin tracking Subscribers</span>
          </div>
        </div>
      </div>
    </Nav >
  );
}
