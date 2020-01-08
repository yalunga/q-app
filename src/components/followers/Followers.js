import React, { Component } from 'react';
import Nav from '../nav/Nav';
import FollowerChart from './FollowerChart';
import RecentFollowCard from './RecentFollowCard';

import { Box, Text, Grid } from 'grommet'
import moment from 'moment';

export default class Followers extends Component {
  constructor() {
    super();
    this.state = {
      range: [0, 5],
      val: [],
      hover: undefined,
      thickness: '',
      loaded: false
    }
    this.onChange = this.onChange.bind(this);
    this.onHover = this.onHover.bind(this);
  }

  componentDidMount() {
    const val = [];
    for (let i = 0; i < 151; i++) {
      const today = moment();
      val.push({ value: [i, Math.floor(Math.random() * Math.floor(100))], label: moment(today).add(i, 'days').format("L") });
    }
    this.setState({ range: [val[0].value[0], val[val.length - 1].value[0]], val, loaded: true });
  }

  onChange(range) {
    let thickness = "small"
    const diff = range[1] - range[0];
    if (diff > 150) {
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
        <Grid
          fill
          rows={["auto", "flex"]}
          columns={["3/4", "auto"]}
          areas={[
            { name: 'main', start: [0, 0], end: [1,0] },
            { name: 'recent-follows', start:[1, 0], end: [1, 1] },

          ]}
          gap="medium"
        >
          <Box direction="column" gridArea="main" gap="medium">
            <FollowerChart 
              range={range} 
              data={val} 
              hover={hover} 
              onHover={this.onHover}
              onSelectorChange={this.onChange}
              thickness={thickness}
              width="full"
              background="#383E48"
            />
            <Box elevation="small" pad="small" round="xsmall" background="#383E48">
              <Text>Hello World</Text>
            </Box>
          </Box>
          <Box gap="small" gridArea="recent-follows">
            <Text alignSelf="center" weight="bold">Recent Follows</Text>
            <RecentFollowCard />
            <RecentFollowCard />
            <RecentFollowCard />
            <RecentFollowCard />
            <RecentFollowCard />
            <RecentFollowCard />
          </Box>
          </Grid>
        </Nav>
      );
    }
    return <div></div>
  }
}