import React, { Component } from 'react';
import { Box, Text } from 'grommet';
import { BarChart, Bar, XAxis, YAxis, Text as TickText, ResponsiveContainer } from 'recharts';

const data = [
  { dayOfTheWeek: 'Mon', avgFollowersGained: 200 },
  { dayOfTheWeek: 'Tu', avgFollowersGained: 250 },
  { dayOfTheWeek: 'Wed', avgFollowersGained: 100 },
  { dayOfTheWeek: 'Th', avgFollowersGained: 234 },
  { dayOfTheWeek: 'Fri', avgFollowersGained: 184 },
  { dayOfTheWeek: 'Sat', avgFollowersGained: 350 },
  { dayOfTheWeek: 'Sun', avgFollowersGained: 76 }
]

const CustomizedAxisTick = props => {
  const { x, y, payload } = props

  return (
    <g transform={`translate(${x},${y})`}>
      <text dy={16} textAnchor='middle' fill='#BCBCBC' fontSize='12px' fontFamily='Montserrat' fontWeight='600' lineHeight='18px'>
        {payload.value}
      </text>
    </g>
  )
}

export default class FollowersGainedByWeekdayChart extends Component {
  render() {
    return (
      <Box width='full' height='medium'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={data} barCategoryGap='40%'>
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
            <Bar dataKey='avgFollowersGained' fill='#0C81EB' background={{ fill: '#eee' }} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    );
  }
}