import React from 'react';
import { connect } from 'react-redux';
import { Box } from 'grommet';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { CustomizedYAxisTick } from '../../../utils/ChartUtils';
import { numberToHour } from '../../../utils/TimeUtils';
import { followsGainedByHourSelector } from '../../../redux/selectors/twitchSelectors';

const CustomizedAxisTick = props => {
  const { x, y, payload } = props

  return (
    <g transform={`translate(${x},${y})`}>
      <text dy={16} textAnchor='middle' fill='#BCBCBC' fontSize='12px' fontFamily='Inter'>
        {numberToHour(payload.value)}
      </text>
    </g>
  )
}

const mapStateToProps = (state) => ({
  data: followsGainedByHourSelector(state)
})

const FollowersGainedByHourOfTheDay = ({ data }) => {
  return (
    <Box width='full' height='medium' gap='xsmall'>
      <ResponsiveContainer width='100%' height='100%'>
        <AreaChart data={data} barCategoryGap='40%'>
          <XAxis
            dataKey='hour'
            tickLine={false}
            axisLine={false}
            tick={<CustomizedAxisTick />}
            interval={2}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={<CustomizedYAxisTick />}
            width={40}
          />
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0C81EB" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#0C81EB" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            dataKey='avg'
            stroke='#0C81EB'
            type='monotone'
            dot={false}
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#color)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default connect(mapStateToProps, null)(FollowersGainedByHourOfTheDay);
