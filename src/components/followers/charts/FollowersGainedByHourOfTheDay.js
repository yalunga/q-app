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
  const formattedData = [
    { hour: '12AM', count: 0 },
    { hour: '3AM', count: 0 },
    { hour: '6AM', count: 0 },
    { hour: '9AM', count: 0 },
    { hour: '12PM', count: 0 },
    { hour: '3PM', count: 0 },
    { hour: '6PM', count: 0 },
    { hour: '9PM', count: 0 },
  ];
  R.forEach((d) => {
    d.houroftheday < 3 ? formattedData[0].count += d.count :
      d.houroftheday < 6 ? formattedData[1].count += d.count :
        d.houroftheday < 9 ? formattedData[2].count += d.count :
          d.houroftheday < 12 ? formattedData[3].count += d.count :
            d.houroftheday < 15 ? formattedData[4].count += d.count :
              d.houroftheday < 18 ? formattedData[5].count += d.count :
                d.houroftheday < 21 ? formattedData[6].count += d.count :
                  formattedData[7].count += d.count
  }, data);
  return (
    <Box width='full' height='medium' gap='xsmall'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={formattedData} barCategoryGap='40%'>
          <XAxis
            dataKey='hour'
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