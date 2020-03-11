import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import moment from 'moment';

import { GET_VIEW_COUNT_CHART_DATA } from '../../../utils/ApiUtils';

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
        <span className='text-sm font-semibold' style={{ color: '#0C81EB' }}>{Math.floor(payload[0].value)} Average Viewers</span>
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

export default () => {
  const [allTimeYearMonthOrWeek, setAllTimeYearMonthOrWeek] = useState('month');
  const [viewCountByDate, setViewCountByDate] = useState([]);
  const { data, loading, error } = useQuery(GET_VIEW_COUNT_CHART_DATA, {
    variables: {
      measureOfTime: (allTimeYearMonthOrWeek === 'month' || allTimeYearMonthOrWeek === 'week') ? 'day' : 'week',
      since: getDateForSince(allTimeYearMonthOrWeek)
    }
  });
  useEffect(() => {
    if (data) {
      const { viewCountByDate } = data;
      setViewCountByDate(viewCountByDate);
    }
  });
  return (
    <div className='w-full bg-white shadow-lg px-4 rounded mt-2'>
      <div className='w-full pt-2'>
        <div className='flex flex-col md:flex-row justify-between w-full'>
          <div className='flex'>
            <span className='text-xs text-black' style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
              Average Viewers
            </span>
          </div>
          <div className='flex justify-center'>
            <div className='flex justify-center h-full'>
              <div className='w-3 mr-2 h-3 rounded-full my-auto' style={{ backgroundColor: '#0C81EB' }} />
              <span className='text-sm'>Average Viewers</span>
            </div>
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
              <LineChart data={viewCountByDate} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type='monotone' dataKey='avg' stroke='#0C81EB' strokeWidth={2} fillOpacity={1} />
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