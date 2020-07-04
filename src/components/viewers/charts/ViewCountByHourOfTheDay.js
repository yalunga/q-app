import React from 'react';
import { connect } from 'react-redux';
import { Box } from 'grommet';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { averageViewCountByHourSelector } from '../../../redux/selectors/twitchSelectors';
import { CustomizedYAxisTick } from '../../../utils/ChartUtils';
import { numberToHour } from '../../../utils/TimeUtils';

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
  data: averageViewCountByHourSelector(state)
});

const ViewCountByHourOfTheDay = ({ data }) => {
  return (
    <Box width='full' height='medium' gap='xsmall'>
      <ResponsiveContainer width='100%' height='100%'>
        <AreaChart data={data}>
          <XAxis
            dataKey='hour'
            tickLine={false}
            axisLine={false}
            domain={['auto', 'auto']}
            interval={2}
            tick={<CustomizedAxisTick />}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            width={40}
            tick={<CustomizedYAxisTick />}
          />
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0C81EB" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#0C81EB" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type='monotone'
            dataKey='avg'
            fill='#0C81EB'
            strokeWidth={2}
            stroke='#0C81EB'
            dot={false}
            fill='url(#color)'
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default connect(mapStateToProps, null)(ViewCountByHourOfTheDay);
