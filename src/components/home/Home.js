import React from 'react';
import { Box, Text, Image } from 'grommet';
import { Eye, Users, Star, Monitor, UserPlus, Video } from 'react-feather';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';
import * as R from 'ramda';

import Nav from '../nav/Nav.js';
import StatCard from './StatCard';
import ResponsiveGrid from './ResponsiveGrid.js';
import { GET_30_DAY_OVERVIEW } from '../../utils/ApiUtils.js';

const abbreviate = require('number-abbreviate')
const since = moment().subtract(30, 'days').toDate();

const getTotalViews = (streams) => {
  const viewCounts = R.pluck('totalViews')(streams);
  return R.sum(viewCounts);
}

export default () => {
  const { loading, error, data } = useQuery(GET_30_DAY_OVERVIEW, {
    variables: {
      since
    }
  });
  console.log(loading, error, data);
  if (loading) {
    return <div />;
  }

  const {
    averageViewCount,
    followerCount,
    follows,
    streams,
    followingCount,
    following
  } = data;
  return (
    <Nav title="Home">
      <Text margin={{ top: 'medium', left: 'medium' }} size='xlarge'>Overview (past 30 days)</Text>
      <Box width='full' direction='row-responsive' pad='medium' responsive gap='medium'>
        <Box
          width='medium'
          gap='xsmall'
          elevation='small'
          background='white'
          round='xxsmall'
          align='center'
          height='fit-content'
          pad={{ vertical: 'medium' }}
        >
          <Box
            width='xsmall'
            height='xsmall'
            round='full'
            border={{ color: 'light-3', side: 'all', size: 'medium' }}
          >
            <Image fit="cover" fill src="//v2.grommet.io/assets/IMG_4245.jpg" style={{ borderRadius: "100%" }} />
          </Box>
          <Box gap='medium' justify='center' width='full' align='center'>
            <Box>
              <Text weight='bold'>UserName</Text>
              <Text size='xsmall' color='dark-4' textAlign='center'>@UserName</Text>
            </Box>
            <Box width='full' border={{ side: 'bottom', color: 'light-3', size: 'small' }} direction='row-responsive'>
              <Box basis='1/3' pad='small' align='center'>
                <Text color='brand'>{followerCount}</Text>
                <Text color='dark-4' size='xsmall'>Followers</Text>
              </Box>
              <Box basis='1/3' pad='small' align='center' border={{ side: 'vertical', color: 'light-3', size: 'small' }}>
                <Text color='brand'>{followingCount}</Text>
                <Text color='dark-4' size='xsmall'>Following</Text>
              </Box>
              <Box basis='1/3' pad='small' align='center'>
                <Text color='brand'>22.5K</Text>
                <Text color='dark-4' size='xsmall'>Subscribers</Text>
              </Box>
            </Box>
            <Text size='small' textAlign='center'>A description of the stream goes here. :)</Text>
            <Box pad='xsmall' background='#EEEAFF' round='xxsmall' width='xsmall' align='center'>
              <Text size='small' weight='bold' color='#836CE8'>Partner</Text>
            </Box>
          </Box>
        </Box>
        <Box width='full'>
          <Box width='full'>
            <ResponsiveGrid>
              <StatCard
                value={streams ? abbreviate(streams.length, 2) : 0}
                color='#836CE8'
                icon={<Video size={24} color='#836CE8' />}
                title="Streams"
                growth={1.2}
              />
              <StatCard
                value={follows ? abbreviate(follows.length, 2) : 0}
                color='#0585FE'
                icon={<Users size={24} color='#0585FE' />}
                title="Followers"
                growth={2.4}
              />
              <StatCard
                value={following ? abbreviate(following.length, 2) : 0}
                color='#FDBC03'
                icon={<UserPlus size={24} color='#FDBC03' />}
                title="Following"
                growth={0.1}
              />

              <StatCard
                value={averageViewCount ? abbreviate(Math.round(averageViewCount), 2) : 0}
                color='#F02A2B'
                icon={<Monitor size={24} color='#F02A2B' />}
                title="Average Viewers"
                growth={-0.2}
              />
              <StatCard
                value={streams ? abbreviate(getTotalViews(streams), 2) : 0}
                color='#3ED599'
                icon={<Eye size={24} color='#3ED599' />}
                title="Total Views"
                growth={10.1}
              />
              <StatCard
                value="22.5K"
                color='#FDBC03'
                icon={<Star size={24} color='#FDBC03' />}
                title="Subscribers"
                growth={0.3}
              />
            </ResponsiveGrid>
          </Box>
        </Box>
      </Box>
    </Nav >
  );
}
