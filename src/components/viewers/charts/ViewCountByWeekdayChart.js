import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useQuery } from '@apollo/react-hooks';
import { GET_VIEW_COUNT_BY_WEEKDAY } from '../../../utils/ApiUtils';


const CustomizedAxisTick = props => {
  const { x, y, payload } = props

  return (
    <g transform={`translate(${x},${y})`}>
      <text dy={16} textAnchor='middle' fill='#BCBCBC' fontSize='12px' fontFamily='Rubik'>
        {String(payload.value).charAt(0).toUpperCase() + String(payload.value).slice(1)}
      </text>
    </g>
  )
}

export default () => {
  const { data, loading, error } = useQuery(GET_VIEW_COUNT_BY_WEEKDAY);
  if (loading) {
    return null;
  }
  const { viewCountByDayOfTheWeek } = data;
  return (
    <div className='w-full h-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={viewCountByDayOfTheWeek} barCategoryGap='40%'>
          <XAxis
            dataKey='day'
            tickLine={false}
            axisLine={false}
            tick={<CustomizedAxisTick />}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={<CustomizedAxisTick />}
            width={20}
          />
          <Bar dataKey='count' fill='#0C81EB' background={{ fill: '#eee' }} radius={[10, 10, 10, 10]} barSize={8} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}