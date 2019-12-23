import React, { Component } from 'react';

import { Grommet, Box, Button, Grid, Text, Heading, DataTable } from 'grommet';
import { View, Group, Trophy, Menu } from 'grommet-icons';

const columns= [
  {
    property: 'date',
    header: 'Date',
    primary: true
  }, {
    property: 'category',
    header: 'Category',
  }, {
    property: 'title',
    header: 'Title',
  }, {
    property: 'duration',
    header: 'Duration',
  }, {
    property: 'viewcount',
    header: 'Average Viewers',
  }, {
    property: 'followers',
    header: 'Follower Gained',
  }, {
    property: 'subscribers',
    header: 'Subscribers Gained',
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
    subscribers: '320'
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
      <Grommet full>
        <Grid
          fill
          rows={["auto", "flex"]}
          columns={["auto", "flex"]}
          areas={[
            { name: "header", start: [0, 0], end: [1, 0] },
            { name: "sidebar", start: [0, 0], end: [0, 1] },
            { name: "main", start: [1, 1], end: [1, 1] }
          ]}
        >
          <Box
            gridArea="header"
            direction="row"
            align="center"
            justify="between"
            pad={{ horizontal: "medium", vertical: "small" }}
            border={{color: 'light-4', size: 'xsmall', style:'solid', side: 'bottom'}}
          >
            <Button>
              <Text size="large">Dashboard</Text>
            </Button>
            <Text>my@email</Text>
          </Box>
          <Box
            gridArea="sidebar"
            width="xsmall"
            animation={[
              { type: "fadeIn", duration: 300 },
              { type: "slideRight", size: "xlarge", duration: 150 }
            ]}
            elevation="xsmall"
          >
            <Button href="#" hoverIndicator>
              <Box pad={{ horizontal: "medium", vertical: "medium" }} align="center">
                <Menu size="medium" color="dark-4" />
              </Box>
            </Button>
            <Button href="#" hoverIndicator>
              <Box pad={{ horizontal: "medium", vertical: "medium" }} align="center">
                <Group size="medium" color="dark-4" />
              </Box>
            </Button>
            <Button href="#" hoverIndicator>
              <Box pad={{ horizontal: "medium", vertical: "medium" }} align="center">
                <Trophy size="medium" color="dark-4" />
              </Box>
            </Button>
            <Button href="#" hoverIndicator>
              <Box pad={{ horizontal: "medium", vertical: "medium" }} align="center">
                <View size="medium" color="dark-4" />
              </Box>
            </Button>
          </Box>
          <Box gridArea="main" justify="start" align="start" pad="large" background="#F4F7FD">
            <Heading size="small" level={2} margin="xsmall">Overview</Heading>
            <Box direction="row-responsive" pad="small" gap="xlarge" fill="horizontal">
              <Box 
                elevation={viewersElevation} 
                round="xsmall"
                pad="medium" 
                align="center" 
                fill="horizontal" 
                onMouseEnter={() => this.onHoverBegin('viewersElevation')} 
                onMouseLeave={() => this.onHoverEnd('viewersElevation')}
                background="white"
                >
                <Box pad="small" background="#E5F3FE" round="full">
                  <View size="medium" color="#0C81EB" />
                </Box>
                <Heading size="small" level={2} margin={{ bottom: "xsmall", top: "xsmall" }}>22.5K</Heading>
                <Heading size="small" level={6} margin={{ top: "xsmall" }}>Average Viewers</Heading>
              </Box>
              <Box 
                elevation={followersElevation} 
                round="xsmall"
                pad="medium" 
                align="center" 
                fill="horizontal" 
                onMouseEnter={() => this.onHoverBegin('followersElevation')} 
                onMouseLeave={() => this.onHoverEnd('followersElevation')}
                background="white"
                >
                <Box pad="small" background="#EBF9EB" round="full">  
                  <Group size="medium" color="#3BBE3C" />
                </Box>
                <Heading size="small" level={2} margin={{ bottom: "xsmall", top: "xsmall" }}>22.5K</Heading>
                <Heading size="small" level={6} margin={{ top: "xsmall" }}>Followers</Heading>
              </Box>
              <Box 
                elevation={subscribersElevation} 
                round="xsmall" 
                pad="medium" 
                align="center" 
                fill="horizontal" 
                onMouseEnter={() => this.onHoverBegin('subscribersElevation')} 
                onMouseLeave={() => this.onHoverEnd('subscribersElevation')}
                background="white"
              >
                <Box pad="small" background="#F3F1FF" round="full">  
                  <Trophy size="medium" color="brand" />
                </Box>
                <Heading size="small" level={2} margin={{ bottom: "xsmall", top: "xsmall" }}>22.5K</Heading>
                <Heading size="small" level={6} margin={{ top: "xsmall" }}>Subscribers</Heading>
              </Box>
            </Box>
            <Heading size="small" level={2} margin="small">Recent Streams</Heading>
            <Box elevation="xsmall" round="xsmall" pad="small" fill="horizontal" background="white"> 
              <DataTable columns={columns} data={data} />
            </Box>
          </Box>
        </Grid>
      </Grommet>
    )
  }
}