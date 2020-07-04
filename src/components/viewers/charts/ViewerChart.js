import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import moment from 'moment';

import { CustomizedYAxisTick } from '../../../utils/ChartUtils';
import { viewCountViewSelect, viewerChartDataSelector } from '../../../redux/selectors/twitchSelectors';
import { setViewCountView } from '../../../redux/actions/twitchActions';
import { viewCountViews } from '../../../redux/constants/twitchConstants';

const CustomizedAxisTick = props => {
  const { x, y, payload } = props
  return (
    <g transform={`translate(${x},${y})`}>
      <text dy={16} textAnchor='middle' fill='#BCBCBC' fontSize='12px' fontFamily='Inter'>
        {moment.unix(payload.value).format('ll')}
      </text>
    </g>
  )
}


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length > 0) {
    return (
      <div className='flex flex-col shadow bg-white rounded-md p-4'>
        <span className='text-sm font-semibold' style={{ color: '#0C81EB' }}>{Math.floor(payload[0].value)} Average Viewers</span>
        <span className='text-sm font-semibold text-gray-500'>{moment.unix(label).format('ll')}</span>
      </div>
    )
  }
  return null;
}

const mapStateToProps = (state) => ({
  viewCountView: viewCountViewSelect(state),
  data: viewerChartDataSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  setViewCountView: (viewCountView) => dispatch(setViewCountView(viewCountView))
});

const ViewerChart = ({ data, viewCountView, setViewCountView }) => {
  return (
    <div className='w-full bg-white shadow-lg px-4 rounded-md mt-2'>
      <div className='w-full pt-2'>
        <div className='flex flex-col md:flex-row justify-between w-full'>
          <div className='flex'>
            <span className='text-xs text-black' style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
              Average Viewers
            </span>
          </div>
          <div className='flex justify-center'>
            <div className='flex justify-center h-full'>
              <div className='w-3 mr-2 h-3 rounded-full my-auto' style={{ backgroundColor: '#0C81EB' }} />
              <span className='text-sm'>Average Viewers</span>
            </div>
          </div>
          <div className='flex'>
            <span
              className={`text-xs mr-2 ${viewCountView === viewCountViews.ALL_TIME ? 'text-black' : 'text-gray-500'}`}
              style={{ textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}
              onClick={() => setViewCountView(viewCountViews.ALL_TIME)}
            >
              All Time
            </span>
            <span
              className={`text-xs mr-2 ${viewCountView === viewCountViews.YEAR ? 'text-black' : 'text-gray-500'}`}
              style={{ textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}
              onClick={() => setViewCountView(viewCountViews.YEAR)}
            >
              Year
            </span>
            <span
              className={`text-xs mr-2 ${viewCountView === viewCountViews.MONTH ? 'text-black' : 'text-gray-500'}`}
              style={{ textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}
              onClick={() => setViewCountView(viewCountViews.MONTH)}
            >
              Month
            </span>
            <span
              className={`text-xs mr-2 ${viewCountView === viewCountViews.WEEK ? 'text-black' : 'text-gray-500'}`}
              style={{ textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}
              onClick={() => setViewCountView(viewCountViews.WEEK)}
            >
              Week
            </span>
          </div>
        </div>
        <div style={{ height: 400 }}>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <Line type='monotone' dataKey='avg' stroke='#0C81EB' strokeWidth={2} fillOpacity={1} />
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
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewerChart);
