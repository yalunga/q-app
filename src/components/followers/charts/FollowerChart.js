import React, { useState } from 'react';
import { connect } from 'react-redux';

import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import moment from 'moment';

import { CustomizedYAxisTick } from '../../../utils/ChartUtils';
import { followsChartDataSelector, followerViewSelect } from '../../../redux/selectors/twitchSelectors';
import { setFollowerView } from '../../../redux/actions/twitchActions';
import { followerViews } from '../../../redux/constants/twitchConstants';

const CustomizedAxisTick = props => {
  const { x, y, payload } = props
  return (
    <g transform={`translate(${x},${y})`}>
      <text dy={16} textAnchor='middle' fill='#BCBCBC' fontSize='12px' fontFamily='Inter'>
        {moment(payload.value).format('ll')}
      </text>
    </g>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length > 0) {
    return (
      <div className='flex flex-col shadow bg-white rounded-md p-4'>
        <span className='text-sm font-semibold' style={{ color: '#0C81EB' }}>{payload[0].value} Total Followers</span>
        {payload[1] &&
          <span className='text-xs font-semibold' style={{ color: '#8C54FF' }}>{payload[1].value} Followers Gained</span>
        }
        <span className='text-sm font-semibold text-gray-500'>{moment(label).format('ll')}</span>
      </div>
    )
  }
  return null;
}

const getDateForSince = (allTimeYearMonthOrWeek) => {
  if (allTimeYearMonthOrWeek === 'allTime') return null;
  if (allTimeYearMonthOrWeek === 'year') return moment().subtract(1, 'year').format();
  if (allTimeYearMonthOrWeek === 'month') return moment().subtract(1, 'month').format();
  if (allTimeYearMonthOrWeek === 'week') return moment().subtract(1, 'week').format();
}

const mapStateToProps = (state) => {
  return {
    data: state.follows.length > 0 ? followsChartDataSelector(state) : [],
    followerView: followerViewSelect(state)
  }
}

const mapDispatchToProps = (dispatch) => ({
  setFollowerView: (followerView) => dispatch(setFollowerView(followerView))
});

const FollowerChart = ({ data, followerView, setFollowerView }) => {
  const [showFollowersGained, setShowFollowersGained] = useState(false);
  return (
    <div className='w-full bg-white shadow-lg px-4 rounded-md mt-2'>
      <div className='w-full pt-2'>
        <div className='flex flex-col md:flex-row justify-between w-full'>
          <div className='flex'>
            <span className='text-xs text-black' style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
              Total Followers
            </span>
            <span
              className={`text-xs ml-2 ${showFollowersGained ? 'text-black' : 'text-gray-500'}`}
              style={{ textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}
              onClick={() => setShowFollowersGained(!showFollowersGained)}
            >
              Followers Gained
            </span>
          </div>
          <div className='flex justify-center'>
            <div className='flex justify-center h-full'>
              <div className='w-3 mr-2 h-3 rounded-full my-auto' style={{ backgroundColor: '#0C81EB' }} />
              <span className='text-sm'>Total Followers</span>
            </div>
            {showFollowersGained && (
              <div className='flex justify-center h-full'>
                <div className='w-3 mx-2 h-3 rounded-full my-auto' style={{ backgroundColor: '#8C54FF' }} />
                <span className='text-sm'>Followers Gained</span>
              </div>
            )}
          </div>
          <div className='flex'>
            <span
              className={`text-xs mr-2 ${followerView === followerViews.ALL_TIME ? 'text-black' : 'text-gray-500'}`}
              style={{ textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}
              onClick={() => setFollowerView(followerViews.ALL_TIME)}
            >
              All Time
            </span>
            <span
              className={`text-xs mr-2 ${followerView === followerViews.YEAR ? 'text-black' : 'text-gray-500'}`}
              style={{ textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}
              onClick={() => setFollowerView(followerViews.YEAR)}
            >
              Year
            </span>
            <span
              className={`text-xs mr-2 ${followerView === followerViews.MONTH ? 'text-black' : 'text-gray-500'}`}
              style={{ textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}
              onClick={() => setFollowerView(followerViews.MONTH)}
            >
              Month
            </span>
            <span
              className={`text-xs mr-2 ${followerView === followerViews.WEEK ? 'text-black' : 'text-gray-500'}`}
              style={{ textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}
              onClick={() => setFollowerView(followerViews.WEEK)}
            >
              Week
            </span>
          </div>
        </div>
        <div style={{ height: 400 }}>
          {(
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line yAxisId='left' type='monotone' dataKey='count' stroke='#0C81EB' strokeWidth={2} fillOpacity={1} fill='url(#colorUv)' />
                {showFollowersGained && <Line yAxisId='right' type='monotone' dataKey='gained' stroke='#8C54FF' strokeWidth={2} fillOpacity={0} />}
                <Tooltip content={<CustomTooltip />} />
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis
                  dataKey='timestamp'
                  tickLine={false}
                  axisLine={false}
                  tick={<CustomizedAxisTick />}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={<CustomizedYAxisTick />}
                  width={40}
                  yAxisId='left'
                  domain={['auto', 'auto']}
                />
                {showFollowersGained &&
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{
                      fill: '#BCBCBC',
                      fontSize: '12px',
                      fontFamily: 'Inter',
                    }}
                    width={40}
                    yAxisId='right'
                    orientation='right'
                    domain={['auto', 'auto']}
                  />
                }
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowerChart);
