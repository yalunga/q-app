import React, { useState } from 'react';
import ViewerChart from './charts/ViewerChart';
import ViewCountByWeekdayChart from './charts/ViewCountByWeekdayChart';
import ViewCountByHourOfTheDay from './charts/ViewCountByHourOfTheDay';
import ViewCountByGame from './charts/ViewCountByGame';

export default () => {
  const [viewWeekdayOrHour, setViewWeekdayOrHour] = useState('weekday');

  return (
    <div className='w-full p-4'>
      <h1 className='text-3xl font-medium'>Viewers</h1>
      <ViewerChart />
      <div className='w-full grid grid-cols-1 grid-rows-2 gap-4 mt-2 md:grid-cols-2 md:grid-rows-1'>
        <div className='w-full shadow-lg p-4 rounded bg-white'>
          <div className='flex'>
            <span
              className={`text-xs ${viewWeekdayOrHour === 'weekday' ? 'text-black' : 'text-gray-500'}`}
              style={{ textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}
              onClick={() => setViewWeekdayOrHour('weekday')}>
              Average Viewers By Weekday
                </span>
            <span
              className={`text-xs ml-2 ${viewWeekdayOrHour === 'hour' ? 'text-black' : 'text-gray-500'}`}
              style={{ textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}
              onClick={() => setViewWeekdayOrHour('hour')}>
              Average Viewers By Hour
                </span>
          </div>
          {viewWeekdayOrHour === 'weekday'
            ? <ViewCountByWeekdayChart />
            : <ViewCountByHourOfTheDay />
          }
        </div>
        <div className='w-full shadow-lg p-4 rounded bg-white'>
          <span className='text-xs' style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>Average Viewers By Game</span>
          <ViewCountByGame />
        </div>
      </div>
    </div>
  );
}