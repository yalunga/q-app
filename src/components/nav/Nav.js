import React, { Component } from 'react';
import { Box, Button, Grid, Image, Heading, Text } from 'grommet';
import { Home, Heart, Star, Eye } from 'react-feather';

const brand = '#1483FE';

export default class Nav extends Component {
  render() {
    const { title, children } = this.props;
    return (
      <Box>
        <Grid
          fill
          rows={["auto", "flex"]}
          columns={["auto", "flex"]}
          areas={[
            { name: "header", start: [0, 0], end: [1, 0] },
            { name: "sidebar", start: [0, 0], end: [0, 1] },
            { name: "main", start: [1, 1], end: [1, 1] }
          ]}
          style={{ minHeight: '100vh' }}
        >
          <Box
            gridArea="header"
            direction="row"
            align="center"
            justify="between"
            pad={{ horizontal: "medium", vertical: "xsmall" }}
            border={{ color: 'light-3', size: '2px', style: 'solid', side: 'bottom' }}
            background="white"
          >
            <Button>
              <Heading size="small" level={2} margin="xsmall" pad="xsmall" style={{ fontWeight: 500 }}>{title}</Heading>
            </Button>
            <Box round="full" height="xxsmall" width="xxsmall">
              <Image fit="cover" fill src="//v2.grommet.io/assets/IMG_4245.jpg" style={{ borderRadius: "100%" }} />
            </Box>
          </Box>
          <Box
            gridArea="sidebar"
            animation={[
              { type: "fadeIn", duration: 300 },
              { type: "slideRight", size: "xlarge", duration: 150 }
            ]}
            elevation="medium"
            background="white"
          >
            <Button href="/" hoverIndicator focusIndicator={false}>
              <Box
                pad={{ vertical: 'medium', horizontal: 'small' }}
                align="center"
                direction='column'
                gap='xsmall'
                border={title === 'Home' ? { color: brand, side: 'right', size: '2px' } : { size: '0px' }}
              >
                <Home color={title === 'Home' ? brand : '#CCD4DC'} />
                <Text size='xsmall' color={title === 'Home' ? brand : '#CCD4DC'}>Home</Text>
              </Box>
            </Button>
            <Button href="/followers" hoverIndicator focusIndicator={false} >
              <Box
                pad={{ vertical: 'medium', horizontal: 'small' }}
                align="center"
                direction='column'
                gap='xsmall'
                border={title === 'Followers' ? { color: brand, side: 'right', size: '2px' } : { size: '0px' }}
              >
                <Heart color={title === 'Followers' ? brand : '#CCD4DC'} />
                <Text size='xsmall' color={title === 'Followers' ? brand : '#CCD4DC'}>Followers</Text>
              </Box>
            </Button>
            <Button href="#" hoverIndicator focusIndicator={false}>
              <Box
                pad={{ vertical: 'medium', horizontal: 'small' }}
                align="center"
                direction='column'
                gap='xsmall'
                border={title === 'Subscribers' ? { color: brand, side: 'right', size: '2px' } : { size: '0px' }}
              >
                <Star color={title === 'Subscribers' ? brand : '#CCD4DC'} />
                <Text size='xsmall' color={title === 'Subscribers' ? brand : '#CCD4DC'}>Subscribers</Text>
              </Box>
            </Button>
            <Button href="#" hoverIndicator focusIndicator={false}>
              <Box
                pad={{ vertical: 'medium', horizontal: 'small' }}
                align="center"
                direction='column'
                gap='xsmall'
                border={title === 'Viewers' ? { color: brand, side: 'right', size: '2px' } : { size: '0px' }}
              >
                <Eye color={title === 'Viewers' ? brand : '#CCD4DC'} />
                <Text size='xsmall' color={title === 'Viewers' ? brand : '#CCD4DC'}>Viewers</Text>
              </Box>
            </Button>
          </Box>
          <Box gridArea="main" justify="start" align="start" background="#F4F6FC">
            {children}
          </Box>
        </Grid>
      </Box>
    )
  }
}