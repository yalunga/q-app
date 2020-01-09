import React, { Component } from 'react';
import { Box, Stack, Text } from 'grommet'
import { AreaChart, Area, ResponsiveContainer, Text as TickText, XAxis, YAxis, Tooltip } from 'recharts';
import moment from 'moment';


class Tick extends Component {
  render() {
    const { x, y, stroke, payload } = this.props;
    console.log(this.props);
    return (<TickText {...this.props}>{moment.unix(payload.value).format("ll")}</TickText>);
  }
}

export default class FollowerChart extends Component {
  constructor() {
    super();
  }
  render() {
    const { range, data, width, background } = this.props;
    return (
      <Box elevation="small" pad="xsmall" background={background} round="xxsmall" basis={width}>
        <Box width="full" height="medium">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Area type="monotone" dataKey="y" stroke="#0C81EB" fillOpacity={1} fill="url(#colorUv)" />
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0C81EB" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#0C81EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip />
              <XAxis 
                dataKey="x" 
                scale="time" 
                tickLine={false}
                axisLine={false}
                tick={
                  <Tick style={{
                    fill: "#BCBCBC",
                    fontSize: "12px",
                    fontFamily: "Muli",
                    fontWeight: 600,
                    lineHeight: "18px"
                  }}
                  />
                } 
              />
            <YAxis tickLine={false} axisLine={false} tick={{
              fill: "#BCBCBC",
              fontSize: "12px",
              fontFamily: "Muli",
              fontWeight: 600,
              lineHeight: "18px"
            }}/>
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    )
  }
}