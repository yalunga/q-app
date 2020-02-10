import React, { Component } from 'react';
import { Box, Stack, Text } from 'grommet'
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import moment from 'moment';

const CustomizedAxisTick = props => {
  const { x, y, payload } = props
  return (
    <g transform={`translate(${x},${y})`}>
      <text dy={16} textAnchor='middle' fill='#BCBCBC' fontSize='12px' fontFamily='Rubik' lineHeight='18px'>
        {moment.unix(payload.value).format("ll")}
      </text>
    </g>
  )
}


const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <Box background="white" elevation="medium" pad="small" round="xxsmall">
        <Text size="small" weight="bold">{payload[0].value} Total Followers</Text>
        {payload[1] &&
          <Text size="xsmall" weight="bold" color="#8C54FF">{payload[1].value} Followers Gained</Text>
        }
        <Text size="xsmall" weight="bold" color="dark-4">{moment.unix(label).format("ll")}</Text>
      </Box>
    )
  }
  return null;
}

export default class FollowerChart extends Component {
  constructor() {
    super();
    this.state = {
      showFollowersGained: false
    }
    this.toggleFollowersGained = this.toggleFollowersGained.bind(this);
  }

  toggleFollowersGained() {
    this.setState({ showFollowersGained: !this.state.showFollowersGained });
  }

  render() {
    const { range, data, width, background } = this.props;
    const { showFollowersGained } = this.state;
    return (
      <Box elevation="small" pad="small" background={background} round="xxsmall" basis={width}>
        <Box width="full" height="medium" gap="small">
          <Stack interactiveChild="first">
            <Box direction="row" justify="between">
              <Box direction="row" gap="medium">
                <Text
                  size="13px"
                  color="dark-1"
                  style={{ textTransform: 'uppercase', letterSpacing: '1px' }}
                >
                  Total Followers
                   </Text>
                <Text
                  size="13px"
                  color={showFollowersGained ? "dark-1" : "dark-4"}
                  style={{ textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}
                  onClick={this.toggleFollowersGained}
                >
                  Followers Gained
                 </Text>

              </Box>
              <Box direction="row" gap="medium">
                <Text size="small" weight="bold" color="dark-1" style={{ cursor: "pointer" }}>All Time</Text>
                <Text size="small" weight="bold" color="dark-4" style={{ cursor: "pointer" }}>Year</Text>
                <Text size="small" weight="bold" color="dark-4" style={{ cursor: "pointer" }}>Month</Text>
                <Text size="small" weight="bold" color="dark-4" style={{ cursor: "pointer" }}>Week</Text>
              </Box>
            </Box>
            <Box direction="row" width="full" justify="center" gap="small">
              <Box direction="row" justify="center" gap="xsmall" height="full">
                <Box round="full" width="10px" height="10px" background="#0C81EB" margin={{ vertical: "auto" }} />
                <Text alignSelf="center" size="small">Total Followers</Text>
              </Box>
              {showFollowersGained && (
                <Box direction="row" justify="center" gap="xsmall" height="full">
                  <Box round="full" width="10px" height="10px" background="#8C54FF" margin={{ vertical: "auto" }} />
                  <Text alignSelf="center" size="small">Followers Gained</Text>
                </Box>
              )}
            </Box>

          </Stack>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <Line type="monotone" dataKey="totalFollowers" stroke="#0C81EB" strokeWidth={2} fillOpacity={1} fill="url(#colorUv)" />
              {showFollowersGained && <Line type="monotone" dataKey="followersGained" stroke="#8C54FF" strokeWidth={2} fillOpacity={0} />}
              <Tooltip content={<CustomTooltip />} />
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis
                dataKey="date"
                scale="time"
                tickLine={false}
                axisLine={false}
                tick={<CustomizedAxisTick />}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{
                  fill: "#BCBCBC",
                  fontSize: "12px",
                  fontFamily: "Rubik",
                  lineHeight: "18px"
                }}
                width={40}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    )
  }
}