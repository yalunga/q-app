import React, { Component } from 'react';
import { Box, Text, Heading, DataTable } from 'grommet';
import { View, Group, Trophy } from 'grommet-icons';

import Nav from '../nav/Nav.js';
import StatCard from './StatCard';

const columns= [
  {
    property: 'date',
    header: <Text size="small" weight="bold" style={{ letterSpacing: '3px'}}>DATE</Text>,
    render: (datum) => (
      <Text size="small" weight="bold">{datum.date}</Text>
    )
  }, {
    property: 'category',
    header: <Text size="small" weight="bold" style={{ letterSpacing: '3px' }} color="dark-3">CATEGORY</Text>,
    render: (datum) => (
      <Text size="small">{datum.category}</Text>
    )
  }, {
    property: 'title',
    header: <Text size="small" weight="bold" style={{ letterSpacing: '3px' }} color="dark-3">TITLE</Text>,
    render: (datum) => (
      <Text size="small">{datum.title}</Text>
    )
  }, {
    property: 'duration',
    header: <Text size="small" weight="bold" style={{ letterSpacing: '3px' }} color="dark-3">DURATION</Text>,
    render: (datum) => (
      <Text size="small">{datum.duration}</Text>
    )
  }, {
    property: 'viewcount',
    header: <Text size="small" weight="bold" style={{ letterSpacing: '3px' }} color="dark-3">AVG VIEWERS</Text>,
    render: (datum) => (
      <Text size="small">{datum.viewcount}</Text>
    )
  }, {
    property: 'followers',
    header: <Text size="small" weight="bold" style={{ letterSpacing: '3px' }} color="dark-3">FOLLOWERS</Text>,
    render: (datum) => (
      <Text size="small" color="status-ok">{datum.followers}</Text>
    )
  }, {
    property: 'subscribers',
    header: <Text size="small" weight="bold" style={{ letterSpacing: '3px' }} color="dark-3">SUBSCRIBERS</Text>,
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
  constructor() {
    super();
    this.state = {
      viewersElevation: 'xsmall',
      followersElevation: 'xsmall',
      subscribersElevation: 'xsmall'
    }
    this.onHoverBegin = this.onHoverBegin.bind(this);
    this.onHoverEnd = this.onHoverEnd.bind(this)
  }

  onHoverBegin(e) {
    this.setState({ [e]: 'large' });
  }

  onHoverEnd(e) {
    this.setState({ [e]: 'xsmall' });
  }

  render() {
    const { viewersElevation, followersElevation, subscribersElevation } = this.state;
    return (
      <Nav title="Dashboard">
        <Heading size="small" level={2} margin="xsmall">Overview</Heading>
        <Box direction="row-responsive" pad="small" gap="xlarge" fill="horizontal">
          <StatCard 
            elevation={viewersElevation}
            onMouseEnter={() => this.onHoverBegin('viewersElevation')}
            onMouseLeave={() => this.onHoverEnd('viewersElevation')}
            value="22.5K"
            icon={<View size="medium" color="#0C81EB" />}
            title="Average Viewers"
          />
          <StatCard 
            elevation={followersElevation}
            onMouseEnter={() => this.onHoverBegin('followersElevation')}
            onMouseLeave={() => this.onHoverEnd('followersElevation')}
            value="22.5K"
            icon={<Group size="medium" color="#3BBE3C" />}
            title="Followers"
          />
          <StatCard
            elevation={subscribersElevation}
            onMouseEnter={() => this.onHoverBegin('subscribersElevation')}
            onMouseLeave={() => this.onHoverEnd('subscribersElevation')}
            value="22.5k"
            icon={<Trophy size="medium" color="brand" />}
            title="Subscribers"
          />
        </Box>
        <Heading size="small" level={2} margin="small">Recent Streams</Heading>
        <Box round="xsmall" pad="small" fill="horizontal">
          <DataTable
            columns={columns}
            data={data}
            background={{
              header: "#F4F7FD",
              body: "white"
            }}
            pad={{ body: "medium" }}
            border={{ body: "bottom" }}
          />
        </Box>
    </Nav>   
    );
  }
}