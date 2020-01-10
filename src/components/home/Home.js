import React, { Component } from 'react';
import { Box, Text, Heading, DataTable } from 'grommet';
import { View, Group, Trophy } from 'grommet-icons';

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
      <Nav title="Dashboard">
        <Heading size="small" level={2} margin="xsmall">Overview</Heading>
        <Box direction="row-responsive" pad="small" gap="xlarge" fill="horizontal">
          <StatCard
            value="22.5K"
            icon={<View size="medium" color="#0C81EB" />}
            title="Average Viewers"
          />
          <StatCard
            value="22.5K"
            icon={<Group size="medium" color="#3BBE3C" />}
            title="Followers"
          />
          <StatCard
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
              body: "white"
            }}
            pad={{ body: "medium", header: { horizontal: "medium", vertical: "small" } }}
            border={{ body: "bottom" }}
          />
        </Box>
      </Nav>
    );
  }
}