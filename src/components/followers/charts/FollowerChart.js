import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import moment from 'moment';

import { GET_FOLLOWER_CHART_DATA } from '../../../utils/ApiUtils';

const CustomizedAxisTick = props => {
  const { x, y, payload } = props
  return (
    <g transform={`translate(${x},${y})`}>
      <text dy={16} textAnchor='middle' fill='#BCBCBC' fontSize='12px' fontFamily='Rubik'>
        {moment(Number(payload.value)).format('ll')}
      </text>
    </g>
  )
}


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length > 0) {
    return (
      <div className='flex flex-col shadow bg-white rounded p-4'>
        <span className='text-sm font-semibold' style={{ color: '#0C81EB' }}>{payload[0].value} Total Followers</span>
        {payload[1] &&
          <span className='text-xs font-semibold' style={{ color: '#8C54FF' }}>{payload[1].value} Followers Gained</span>
        }
        <span className='text-sm font-semibold text-gray-500'>{moment(Number(label)).format('ll')}</span>
      </div>
    )
  }
  return null;
}

const getDateForSince = (allTimeYearMonthOrWeek) => {
  if (allTimeYearMonthOrWeek === 'allTime') return null;
  if (allTimeYearMonthOrWeek === 'year') return moment().subtract(1, 'year').format();
  if (allTimeYearMonthOrWeek === 'month') return moment().subtract(1, 'month').format();
  if (allTimeYearMonthOrWeek === 'week') return moment().subtract(1, 'week').format();
}

export default ({ followerCount = 0 }) => {
  const [showFollowersGained, setShowFollowersGained] = useState(false);
  const [allTimeYearMonthOrWeek, setAllTimeYearMonthOrWeek] = useState('month');
  const [followCountByDate, setFollowCountByDate] = useState([]);
  const { data, loading, error } = useQuery(GET_FOLLOWER_CHART_DATA, {
    variables: {
      measureOfTime: allTimeYearMonthOrWeek === 'month' || allTimeYearMonthOrWeek === 'week' ? 'day' : 'week',
      since: getDateForSince(allTimeYearMonthOrWeek)
    }
  });
  useEffect(() => {
    if (data) {
      const { followCountByDate } = data;
      if (followCountByDate && followCountByDate.length > 0) {
        const length = followCountByDate.length;
        followCountByDate[length - 1].totalFollowers = followerCount;
        for (let i = length - 2; i >= 0; i--) {
          followCountByDate[i].totalFollowers = followCountByDate[i + 1].totalFollowers - followCountByDate[i].count;
        }
        setFollowCountByDate(followCountByDate);
      }
    }
  });
  return (
    <div className='w-full bg-white shadow-lg px-4 rounded mt-2'>
      <div className='w-full pt-2'>
        <div className='flex flex-col md:flex-row justify-between w-full'>
          <div className='flex'>
            <span className='text-xs text-black' style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
              Total Followers
            </span>
            <span
              className={`text-xs ml-2 ${showFollowersGained ? 'text-black' : 'text-gray-500'}`}
              style={{ textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}
              onClick={() => setShowFollowersGained(!showFollowersGained)}
            >
              Followers Gained
            </span>
          </div>
          <div className='flex justify-center'>
            <div className='flex justify-center h-full'>
              <div className='w-3 mr-2 h-3 rounded-full my-auto' style={{ backgroundColor: '#0C81EB' }} />
              <span className='text-sm'>Total Followers</span>
            </div>
            {showFollowersGained && (
              <div className='flex justify-center h-full'>
                <div className='w-3 mx-2 h-3 rounded-full my-auto' style={{ backgroundColor: '#8C54FF' }} />
                <span className='text-sm'>Followers Gained</span>
              </div>
            )}
          </div>
          <div className='flex'>
            <span
              className={`text-xs mr-2 ${allTimeYearMonthOrWeek === 'allTime' ? 'text-black' : 'text-gray-500'}`}
              style={{ textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}
              onClick={() => setAllTimeYearMonthOrWeek('allTime')}
            >
              All Time
            </span>
            <span
              className={`text-xs mr-2 ${allTimeYearMonthOrWeek === 'year' ? 'text-black' : 'text-gray-500'}`}
              style={{ textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}
              onClick={() => setAllTimeYearMonthOrWeek('year')}
            >
              Year
            </span>
            <span
              className={`text-xs mr-2 ${allTimeYearMonthOrWeek === 'month' ? 'text-black' : 'text-gray-500'}`}
              style={{ textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}
              onClick={() => setAllTimeYearMonthOrWeek('month')}
            >
              Month
            </span>
            <span
              className={`text-xs mr-2 ${allTimeYearMonthOrWeek === 'week' ? 'text-black' : 'text-gray-500'}`}
              style={{ textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}
              onClick={() => setAllTimeYearMonthOrWeek('week')}
            >
              Week
            </span>
          </div>
        </div>
        <div style={{ height: 400 }}>
          {!loading && (
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={followCountByDate} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type='monotone' dataKey='totalFollowers' stroke='#0C81EB' strokeWidth={2} fillOpacity={1} fill='url(#colorUv)' />
                {showFollowersGained && <Line type='monotone' dataKey='count' stroke='#8C54FF' strokeWidth={2} fillOpacity={0} />}
                <Tooltip content={<CustomTooltip />} />
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis
                  dataKey='date'
                  tickLine={false}
                  axisLine={false}
                  tick={<CustomizedAxisTick />}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{
                    fill: '#BCBCBC',
                    fontSize: '12px',
                    fontFamily: 'Rubik',
                  }}
                  width={40}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  )
}