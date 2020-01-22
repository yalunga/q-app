import React, { Component } from 'react';
import Nav from '../nav/Nav';
import FollowerChart from './charts/FollowerChart';
import RecentFollowCard from './RecentFollowCard';
import FollowersGainedByWeekdayChart from './charts/FollowersGainedByWeekdayChart';

import { Box, Text, Grid } from 'grommet';
import { Group } from 'grommet-icons';
import moment from 'moment';

export default class Followers extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loaded: false
    }
  }

  componentDidMount() {
    const val = [];
    for (let i = 0; i < 50; i++) {
      val.push({
        date: moment().add(i, 'days').unix(),
        totalFollowers: Math.floor(Math.random() * Math.floor(100)),
        followersGained: Math.floor(Math.random() * Math.floor(50))
      });
    }
    this.setState({ data: val, loaded: true });
  }


  render() {
    console.log(moment().add(1, 'days').unix());
    const { range, data, loaded } = this.state;
    if (loaded) {
      return (
        <Nav title="Followers">
          <Grid
            fill
            rows={["auto", "flex"]}
            columns={["3/4", "auto"]}
            areas={[
              { name: 'main', start: [0, 0], end: [1, 0] },
              { name: 'recent-follows', start: [1, 0], end: [1, 1] },

            ]}
            gap="medium"
          >
            <Box direction="column" gridArea="main" gap="medium" pad='medium'>
              <Box gap="small">
                <Box width="full" round="small" align="start">
                  <Box direction="row" gap="small" fill>
                    <Box round="full">
                      <Group size="medium" color="#0C81EB" />
                    </Box>
                    <Box>
                      <Text size="large" weight="bold">{data[data.length - 1].totalFollowers} Current Followers</Text>
                    </Box>
                  </Box>
                </Box>
                <FollowerChart
                  range={range}
                  data={data}
                  width="full"
                  background="white"
                />
              </Box>
              <Box direction='row' gap='medium'>
                <Box elevation="small" pad="small" round="xxsmall" background="white" basis='1/2'>
                  <FollowersGainedByWeekdayChart />
                </Box>
                <Box elevation="small" pad="small" round="xxsmall" background="white" basis='1/2'>
                  <FollowersGainedByWeekdayChart />
                </Box>
              </Box>
            </Box>
            <Box gap="small" gridArea="recent-follows" height="full" overflow={{ vertical: 'auto' }} pad='medium'>
              <Text alignSelf="center" weight="bold" size="large">Recent Follows</Text>
              {Array.from({ length: 10 }).map((newFollower) => <RecentFollowCard />)}
            </Box>
          </Grid>
        </Nav>
      );
    }
    return <div></div>
  }
}