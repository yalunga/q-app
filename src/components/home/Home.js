import React, { Component } from 'react';
import { Box, Text, Heading, Image } from 'grommet';
import { Eye, Users, Star, Monitor, UserPlus, Clipboard } from 'react-feather';

import Nav from '../nav/Nav.js';
import StatCard from './StatCard';

const columns = [
  {
    property: 'date',
    header: <Text size="xsmall" textAlign="center" weight="bold">Date</Text>,
    render: (datum) => (
      <Text size="small" weight="bold">{datum.date}</Text>
    )
  }, {
    property: 'category',
    header: <Text size="xsmall" weight="bold" color="dark-3">Category</Text>,
    render: (datum) => (
      <Text size="small">{datum.category}</Text>
    )
  }, {
    property: 'title',
    header: <Text size="xsmall" weight="bold" color="dark-3">Title</Text>,
    render: (datum) => (
      <Text size="small">{datum.title}</Text>
    )
  }, {
    property: 'duration',
    header: <Text size="xsmall" weight="bold" color="dark-3">Duration</Text>,
    render: (datum) => (
      <Text size="small">{datum.duration}</Text>
    )
  }, {
    property: 'viewcount',
    header: <Text size="xsmall" weight="bold" color="dark-3">Avg Viewers</Text>,
    render: (datum) => (
      <Text size="small">{datum.viewcount}</Text>
    )
  }, {
    property: 'followers',
    header: <Text size="xsmall" weight="bold" color="dark-3">Followers</Text>,
    render: (datum) => (
      <Text size="small" color="status-ok">{datum.followers}</Text>
    )
  }, {
    property: 'subscribers',
    header: <Text size="xsmall" weight="bold" color="dark-3">Subscribers</Text>,
    render: (datum) => (
      <Text size="small" color="status-critical">{datum.subscribers}</Text>
    )
  }
];

const data = [
  {
    date: '11/2/2019',
    category: 'Fortnite',
    title: 'Duo Arenas',
    duration: '8 hrs',
    viewcount: '11.1k',
    followers: '+1100',
    subscribers: '-320'
  },
  {
    date: '11/2/2019',
    category: 'Fortnite',
    title: 'Duo Arenas',
    duration: '8 hrs',
    viewcount: '11.1k',
    followers: '+1100',
    subscribers: '-320'
  }
]

export default class Home extends Component {
  render() {
    return (
      <Nav title="Home">
        <Box width='full' background='white' pad='medium' direction='row' gap='medium'>
          <Box width='small' height='small'>
            <Image fit="cover" fill src="//v2.grommet.io/assets/IMG_4245.jpg" style={{ borderRadius: "100%" }} />
          </Box>
          <Box pad='small' gap='small'>
            <Text weight='bold'>UserName</Text>
            <Box direction='row' gap='xsmall'>
              <Box direction='row' gap='xsmall' align='center'>
                <Text weight='bold'>4.24M</Text>
                <Text size='small' weight='bold' color='dark-4'>Followers</Text>
              </Box>
              <Box direction='row' gap='xsmall' align='center'>
                <Text weight='bold'>30.1K</Text>
                <Text size='small' weight='bold' color='dark-4'>Subscribers</Text>
              </Box>
              <Box direction='row' gap='xsmall' align='center'>
                <Text weight='bold'>167.7M</Text>
                <Text size='small' weight='bold' color='dark-4'>Total Views</Text>
              </Box>
            </Box>
            <Text color='dark-4' size='small' weight={100} weight='bold'>A description of the stream goes here. :)</Text>
            <Box pad='xsmall' background='#EEEAFF' round='xsmall' width='xsmall' align='center'>
              <Text size='small' weight='bold' color='#836CE8'>Partner</Text>
            </Box>
          </Box>
        </Box>
        <Box pad='small' width='full'>
          <Heading size="small" level={3} margin="small">Overview (last 30 days)</Heading>
          <Box width='full' gap='large'>
            <Box direction="row-responsive" pad="small" gap="xlarge" fill="horizontal">
              <StatCard
                value="12"
                iconBackground='#EEEAFF'
                icon={<Monitor size={24} color='#836CE8' />}
                title="Streams"
                growth={1.2}
              />
              <StatCard
                value="22.5K"
                iconBackground='#DBECFD'
                icon={<Users size={24} color='#0585FE' />}
                title="Followers"
                growth={2.4}
              />
              <StatCard
                value="22.5k"
                iconBackground='#FFF6D9'
                icon={<UserPlus size={24} color='#FDBC03' />}
                title="Following"
                growth={0.1}
              />
            </Box>
            <Box direction="row-responsive" pad="small" gap="xlarge" fill="horizontal">
              <StatCard
                value="22.5K"
                iconBackground='#FCDFE0'
                icon={<Eye size={24} color='#F02A2B' />}
                title="Average Viewers"
                growth={-0.2}
              />
              <StatCard
                value="22.5K"
                iconBackground='#FFF6D9'
                icon={<Star size={24} color='#FDBC03' />}
                title="Subscribers"
                growth={0.3}
              />
              <StatCard
                value="22"
                iconBackground='#E0F3E7'
                icon={<Clipboard size={24} color='#3ED599' />}
                title="Clips"
                growth={10.1}
              />
            </Box>
          </Box>
        </Box>
      </Nav>
    );
  }
}