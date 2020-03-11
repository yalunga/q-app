import React from 'react';
import { Box } from 'grommet';
import { useQuery } from '@apollo/react-hooks';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { GET_VIEW_COUNT_BY_GAME } from '../../../utils/ApiUtils';

export default () => {
  const { loading, data } = useQuery(GET_VIEW_COUNT_BY_GAME);
  if (loading) {
    return null;
  }
  const { viewCountByGame } = data;
  viewCountByGame.forEach((element, index) => {
    index % 4 === 0 ? element.color = '#0C81EB' :
      index % 3 === 0 ? element.color = '#FDBC03' :
        index % 2 === 0 ? element.color = '#836CE8' :
          element.color = '#3ED599';

  });
  return (
    <Box width='full' height='medium' gap='xsmall'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={viewCountByGame} barCategoryGap='40%'>
          <XAxis
            dataKey='game'
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
            tick={{
              fill: '#BCBCBC',
              fontSize: '12px',
              fontFamily: 'Rubik',
            }}
            width={20}
          />
          <Bar dataKey='count' barSize={8}>
            {viewCountByGame.map((entry, index) => (
              <Cell key={`cell-${index}`} background={{ fill: '#eee' }} radius={[10, 10, 10, 10]} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}