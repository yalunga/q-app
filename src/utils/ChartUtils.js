import React from 'react';

const abbreviate = require('number-abbreviate');


export const CustomizedYAxisTick = props => {
  const { x, y, payload } = props
  return (
    <g transform={`translate(${x},${y})`}>
      <text dx={-16} textAnchor='middle' fill='#BCBCBC' fontSize='12px' fontFamily='Inter'>
        {String(abbreviate(payload.value, 2)).toUpperCase()}
      </text>
    </g>
  )
}