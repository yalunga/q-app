import React, { Component } from 'react';
import { Box, Chart, RangeSelector, Stack, Text } from 'grommet'
import { Group } from 'grommet-icons';

export default class FollowerChart extends Component {
  constructor() {
    super();
  }
  render() {
    const { range, data, hover, thickness, onHover, onSelectorChange, width, background } = this.props;
    return (
      <Box elevation="small" pad="medium" background={background} round="xxsmall" basis={width}>
        <Box width="full" pad={{ horizontal: "small", vertical: "small" }} round="small" align="start">
          <Box direction="row" gap="small" fill>
            <Box pad="small" round="full" elevation="medium" height="xxsmall">
              <Group size="medium" color="#0C81EB" />
            </Box>
            <Box pad={{ vertical: "small" }}>
              <Text size="large" weight="bold">{data[data.length - 1].value[1]} Current Followers</Text>
            </Box>
          </Box>
        </Box>
        <Stack guidingChild="first" interactiveChild="first">
          <Box size="full">
            <Chart
              type="bar"
              values={data.slice(range[0], range[1] + 1).map(v => ({
                ...v,
                onHover: onHover(v)
              }))}
              size={{ width: "full", height: "small" }}
              bounds={[[range[0], range[1]], [0, 100]]}
              thickness={thickness}
              color={{ color: "#0C81EB", opacity: "strong" }}
              round
            />
          </Box>
          {hover && (
            <Box elevation="medium" width="small" pad={{ horizontal: "small", vertical: "small" }} background="white" round="small" align="start">
              <Box direction="row" gap="xsmall" fill>
                <Group size="18px" color="#0C81EB" />
                <Text size="small" weight="bold" textAlign="center">{hover.value[1]} Followers</Text>
              </Box>
              <Box direction="row" gap="xsmall" fill>
                <Group size="18px" color={{ color: "#0C81EB", opacity: "weak" }} />
                <Text size="xsmall" color="dark-3" textAlign="center">{hover.label}</Text>
              </Box>
            </Box>
          )}
        </Stack>
        <Box height="xxxsmall" width="full" direction="row" justify="between">
          <Text size="xsmall" weight="bold">{data[range[0]].label}</Text>
          <Text size="xsmall" weight="bold">{data[range[1]].label}</Text>
        </Box>
        <Box height="xxsmall" width="full">
          <Stack fill>
            <Chart
              type="line"
              values={data}
              size={{ width: "full", height: "xxsmall" }}
              thickness="xxsmall"
              round
              color="dark-1"
            />
            <RangeSelector
              direction="horizontal"
              min={data[0].value[0]}
              max={data[data.length - 1].value[0]}
              size="full"
              values={range}
              onChange={onSelectorChange}
              color="#0C81EB"
              opacity="weak"
            />
          </Stack>
        </Box>
      </Box>
    )
  }
}