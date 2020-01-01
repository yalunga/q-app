import React, { Component } from 'react';
import Nav from '../nav/Nav';

import { Box, Chart, RangeSelector, Stack, Text } from 'grommet'

export default class Followers extends Component {
  constructor() {
    super();
    this.state = {
      range: [0, 5],
      val: []
    }
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const val = [];
    for(let i = 0; i < 200; i++) {
      val.push({ value: [i, Math.floor(Math.random() * Math.floor(100))]});
    }
    this.setState({ range: [0, this.state.val.length-1], val});
  }

  onChange(range) {
    this.setState({ range });
  }

  render() {
    const { range, val } = this.state;
    console.log(range, val.length, val.slice(range[0], range[1]+1));
    return (
      <Nav title="Followers">
        <div>Followers Page</div>
        <Box elevation="small" pad="medium" background="white" round="xsmall" width="full">
            <Chart
              type="bar"
              color="accent-2"
              values={val.slice(range[0], range[1]+1)}
              size={{ width: "full", height: "medium" }}
              bounds={[[range[0], range[1]], [0,100]]}
              thickness="xsmall"
            />
            <Box height="xxsmall" width="full">
              <Stack fill>
                <Chart
                  type="line"
                  values={val}
                  size={{ width: "full", height: "xxsmall" }}
                  thickness="xxsmall"
                />
                <RangeSelector
                  direction="horizontal"
                  min={0}
                  max={val.length-1}
                  size="full"
                  values={range}
                  onChange={this.onChange}
                  color="accent-2"
                />
              </Stack>   
            </Box>
        </Box>
      </Nav>
    );
  }
}