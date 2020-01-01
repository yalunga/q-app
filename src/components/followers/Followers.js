import React, { Component } from 'react';
import Nav from '../nav/Nav';

import { Box, Chart, RangeSelector, Stack, Text } from 'grommet'
import { Group } from 'grommet-icons';
import moment from 'moment';

export default class Followers extends Component {
  constructor() {
    super();
    this.state = {
      range: [0, 5],
      val: [],
      hover: undefined,
      thickness: 'xsmall',
      loaded: false
    }
    this.onChange = this.onChange.bind(this);
    this.onHover = this.onHover.bind(this);
  }

  componentDidMount() {
    const val = [];
    for (let i = 0; i < 100; i++) {
      const today = moment();
      val.push({ value: [i, Math.floor(Math.random() * Math.floor(100))], label: moment(today).add(i, 'days').format("L") });
    }
    this.setState({ range: [val[0].value[0], val[val.length - 1].value[0]], val, loaded: true });
  }

  onChange(range) {
    let thickness = "small"
    const diff = range[1] - range[0];
    if (diff > 100) {
      thickness = "hair";
    } else if (diff > 75) {
      thickness = "xxsmall";
    } else if (diff > 50) {
      thickness = "xsmall";
    }
    this.setState({ range, thickness });
  }

  onHover = (value) => (over) => {
    this.setState({ hover: over ? value : undefined });
  }

  render() {
    const { range, val, hover, thickness, loaded } = this.state;
    if (loaded) {
      return (
        <Nav title="Followers">
          <Box elevation="small" pad="medium" background="white" round="xsmall" width="full">
            <Box width="full" pad={{ horizontal: "small", vertical: "small" }} background="white" round="small" align="start">
              <Box direction="row" gap="small" fill>
                <Box elevation="medium" pad="small" round="full">
                  <Group size="medium" color="#0C81EB" />
                </Box>
                <Box pad={{ vertical: "small" }}>
                  <Text size="large" weight="bold">{val[val.length - 1].value[1]} Current Followers</Text>
                </Box>
              </Box>
            </Box>
            <Stack guidingChild="first" interactiveChild="first">
              <Box size="full">
                <Chart
                  type="bar"
                  values={val.slice(range[0], range[1] + 1).map(v => ({
                    ...v,
                    onHover: this.onHover(v)
                  }))}
                  size={{ width: "full", height: "medium" }}
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
              <Text size="xsmall" weight="bold">{val[range[0]].label}</Text>
              <Text size="xsmall" weight="bold">{val[range[1]].label}</Text>
            </Box>
            <Box height="xxsmall" width="full">
              <Stack fill>
                <Chart
                  type="line"
                  values={val}
                  size={{ width: "full", height: "xxsmall" }}
                  thickness="xxsmall"
                  round
                  color="light-3"
                />
                <RangeSelector
                  direction="horizontal"
                  min={val[0].value[0]}
                  max={val[val.length - 1].value[0]}
                  size="full"
                  values={range}
                  onChange={this.onChange}
                  color="#0C81EB"
                />
              </Stack>
            </Box>
          </Box>
        </Nav>
      );
    }
    return <div></div>
  }
}