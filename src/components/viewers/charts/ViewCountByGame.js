import React from 'react';
import { Box } from 'grommet';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { CustomizedYAxisTick } from '../../../utils/ChartUtils';

export default ({ data }) => {
  data.forEach((element, index) => {
    index % 4 === 0 ? element.color = '#0C81EB' :
      index % 3 === 0 ? element.color = '#FDBC03' :
        index % 2 === 0 ? element.color = '#836CE8' :
          element.color = '#3ED599';

  });
  return (
    <Box width='full' height='medium' gap='sxmall'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={data} barCategoryGap='40%'>
          <XAxis
            dataKey='game'
            tickLine={false}
            axisLine={false}
            tick={{
              fill: '#BCBCBC',
              fontSize: '12px',
              fontFamily: 'Inter',
            }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={<CustomizedYAxisTick />}
            width={40}
          />
          <Bar dataKey='avg' barSize={8}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} background={{ fill: '#eee' }} radius={[10, 10, 10, 10]} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}