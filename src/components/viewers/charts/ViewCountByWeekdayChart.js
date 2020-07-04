import React from 'react';
import { connect } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { averageViewCountByWeekdaySelector } from '../../../redux/selectors/twitchSelectors';
import { CustomizedYAxisTick } from '../../../utils/ChartUtils';
import { numberToDay } from '../../../utils/TimeUtils';


const CustomizedAxisTick = props => {
  const { x, y, payload } = props

  return (
    <g transform={`translate(${x},${y})`}>
      <text dy={16} textAnchor='middle' fill='#BCBCBC' fontSize='12px' fontFamily='Inter'>
        {numberToDay(payload.value)}
      </text>
    </g>
  )
}

const mapStateToProps = (state) => ({
  data: averageViewCountByWeekdaySelector(state)
});

const ViewCountByWeekdayChart = ({ data }) => {
  return (
    <div className='w-full h-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={data} barCategoryGap='40%'>
          <XAxis
            dataKey='day'
            tickLine={false}
            axisLine={false}
            tick={<CustomizedAxisTick />}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={<CustomizedYAxisTick />}
            width={40}
          />
          <Bar dataKey='avg' fill='#0C81EB' background={{ fill: '#eee' }} radius={[10, 10, 10, 10]} barSize={8} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default connect(mapStateToProps, null)(ViewCountByWeekdayChart);
