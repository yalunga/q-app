import React, { useState } from 'react';
import * as R from 'ramda';
import moment from 'moment';
import FollowerChart from './charts/FollowerChart';
import FollowersGainedByGame from './charts/FollowersGainedByGame';
import FollowersGainedByHourOfTheDay from './charts/FollowersGainedByHourOfTheDay';
import FollowersGainedByWeekdayChart from './charts/FollowersGainedByWeekdayChart';

export default ({ twitchId, follows }) => {
  const [followerWeekdayOrHour, setFollowerWeekdayOrHour] = useState('weekday');
  return (
    <div className='w-full p-4'>
      <h1 className='text-3xl font-medium'>Followers</h1>
      <FollowerChart twitchId={twitchId} />
      <div className='w-full grid grid-cols-1 grid-rows-2 gap-4 mt-2 md:grid-cols-2 md:grid-rows-1'>
        <div className='w-full shadow-lg p-4 rounded-md bg-white'>
          <div className='flex'>
            <span
              className={`text-xs ${followerWeekdayOrHour === 'weekday' ? 'text-black' : 'text-gray-500'}`}
              style={{ textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}
              onClick={() => setFollowerWeekdayOrHour('weekday')}>
              Followers Gained By Weekday
              </span>
            <span
              className={`text-xs ml-2 ${followerWeekdayOrHour === 'hour' ? 'text-black' : 'text-gray-500'}`}
              style={{ textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}
              onClick={() => setFollowerWeekdayOrHour('hour')}>
              Followers Gained By Hour
                </span>
          </div>
          {followerWeekdayOrHour === 'weekday'
            ? <FollowersGainedByWeekdayChart />
            : <FollowersGainedByHourOfTheDay />
          }
        </div>
        <div className='w-full shadow-lg p-4 rounded-md bg-white'>
          <span className='text-xs' style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>Followers Gained By Game</span>
          <FollowersGainedByGame />
        </div>
      </div>
    </div>
  )
};