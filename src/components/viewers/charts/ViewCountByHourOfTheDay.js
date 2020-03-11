import React from 'react';
import * as R from 'ramda';
import { Box } from 'grommet';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useQuery } from '@apollo/react-hooks';
import { GET_VIEW_COUNT_BY_HOUR } from '../../../utils/ApiUtils';
import { numberToHour } from '../../../utils/TimeUtils';


export default () => {
  const { data, loading, error } = useQuery(GET_VIEW_COUNT_BY_HOUR);
  if (loading) return null;
  const { viewCountByHourOfTheDay } = data;
  const formattedData = [...Array(24)].map((o, index) => ({
    hour: numberToHour(index),
    count: R.prop('count', R.find(R.propEq('houroftheday', index))(viewCountByHourOfTheDay)) || 0
  }));
  return (
    <Box width='full' height='medium' gap='xsmall'>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart data={formattedData}>
          <XAxis
            dataKey='hour'
            tickLine={false}
            axisLine={false}
            tick={{
              fill: '#BCBCBC',
              fontSize: '12px',
              fontFamily: 'Rubik',
            }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            width={20}
            tick={{
              fill: '#BCBCBC',
              fontSize: '12px',
              fontFamily: 'Rubik',
            }}
          />
          <Line type='monotone' dataKey='count' fill='#0C81EB' strokeWidth={2} stroke='#0C81EB' dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}