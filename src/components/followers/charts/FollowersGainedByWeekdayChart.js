import React from 'react';
import * as R from 'ramda';
import { Box } from 'grommet';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

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

export default ({ data }) => {

  const formattedData = R.map((d) => ({
    dayOfTheWeek: d[0],
    count: d[1]
  }), R.toPairs(data))
  formattedData.pop();
  return (
    <Box width='full' height='medium' gap='xsmall'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={formattedData} barCategoryGap='40%'>
          <XAxis
            dataKey='dayOfTheWeek'
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
    </Box>
  );
}