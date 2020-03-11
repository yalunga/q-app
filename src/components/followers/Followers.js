import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import FollowerChart from './charts/FollowerChart';
import FollowersGainedByGame from './charts/FollowersGainedByGame';
import FollowersGainedByHourOfTheDay from './charts/FollowersGainedByHourOfTheDay';
import FollowersGainedByWeekdayChart from './charts/FollowersGainedByWeekdayChart';
import { GET_FOLLOWER_DATA } from '../../utils/ApiUtils';

export default () => {
  const { loading, error, data } = useQuery(GET_FOLLOWER_DATA);
  const [followerWeekdayOrHour, setFollowerWeekdayOrHour] = useState('weekday');
  const [followerCount, setFollowerCount] = useState(0);
  const [followCountsByDayOfTheWeek, setFollowCountsByDayOfTheWeek] = useState([]);
  const [followCountsByHourOfTheDay, setFollowCountsByHourOfTheDay] = useState([]);
  const [followCountsByGame, setFollowCountsByGame] = useState([]);

  useEffect(() => {
    if (data) {
      console.log(data);
      const {
        followerCount,
        followCountsByDayOfTheWeek,
        followCountsByHourOfTheDay,
        followCountsByGame,
      } = data;
      setFollowerCount(followerCount);
      setFollowCountsByDayOfTheWeek(followCountsByDayOfTheWeek);
      setFollowCountsByHourOfTheDay(followCountsByHourOfTheDay);
      setFollowCountsByGame(followCountsByGame);
    }
  });
  return (
    <div className='w-full p-4'>
      <h1 className='text-3xl font-medium'>Followers</h1>
      <FollowerChart followerCount={followerCount} />
      <div className='w-full grid grid-cols-1 grid-rows-2 gap-4 mt-2 md:grid-cols-2 md:grid-rows-1'>
        <div className='w-full shadow-lg p-4 rounded bg-white'>
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
            ? <FollowersGainedByWeekdayChart data={followCountsByDayOfTheWeek} />
            : <FollowersGainedByHourOfTheDay data={followCountsByHourOfTheDay} />
          }
        </div>
        <div className='w-full shadow-lg p-4 rounded bg-white'>
          <span className='text-xs' style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>Followers Gained By Game</span>
          <FollowersGainedByGame data={followCountsByGame} />
        </div>
      </div>
    </div>
  )
};