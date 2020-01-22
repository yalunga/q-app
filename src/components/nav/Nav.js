import React, { Component } from 'react';
import { Grommet, Box, Button, Grid, Image, Heading, Text } from 'grommet';
import { Home, Heart, Star, Eye } from 'react-feather';

const theme = {
  global: {
    elevation: {
      dark: {
        medium: "0px 6px 8px rgb(38,38,49)",
        none: "none",
        xsmall: "0px 2px 2px rgb(38,38,49)",
        small: "0px 4px 4px rgb(38,38,49)",
        large: "0px 8px 16px rgb(38,38,49)",
        xlarge: "0px 10px 24px rgb(38,38,49)"
      }
    },
    font: {
      family: "'Montserrat', sans-serif"
    }
  }
}

export default class Nav extends Component {
  render() {
    const { title, children } = this.props;
    return (
      <Grommet full theme={theme}>
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
            pad={{ horizontal: "medium", vertical: "xsmall" }}
            border={{ color: 'light-2', size: 'xsmall', style: 'solid', side: 'bottom' }}
            background="white"
          >
            <Button>
              <Heading size="small" level={2} margin="xsmall" pad="xsmall">{title}</Heading>
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
              <Box pad='medium' align="center" direction='row' gap='medium' border={title === 'Home' ? { color: '#0585FE', side: 'right', size: '2px' } : { size: '0px' }}>
                <Home color={title === 'Home' ? '#0585FE' : '#444444'} />
                <Text size='small' weight='bold'>Home</Text>
              </Box>
            </Button>
            <Button href="/followers" hoverIndicator focusIndicator={false} >
              <Box pad='medium' align="center" direction='row' gap='medium' border={title === 'Followers' ? { color: '#0585FE', side: 'right', size: '2px' } : { size: '0px' }}>
                <Heart color={title === 'Followers' ? '#0585FE' : '#444444'} />
                <Text size='small' weight='bold'>Followers</Text>
              </Box>
            </Button>
            <Button href="#" hoverIndicator focusIndicator={false}>
              <Box pad='medium' align="center" direction='row' gap='medium' border={title === 'Subscribers' ? { color: '#0585FE', side: 'right', size: '2px' } : { size: '0px' }}>
                <Star color={title === 'Subscribers' ? '#0585FE' : '#444444'} />
                <Text size='small' weight='bold'>Subscribers</Text>
              </Box>
            </Button>
            <Button href="#" hoverIndicator focusIndicator={false}>
              <Box pad='medium' align="center" direction='row' gap='medium' border={title === 'Viewers' ? { color: '#0585FE', side: 'right', size: '2px' } : { size: '0px' }}>
                <Eye color={title === 'Viewers' ? '#0585FE' : '#444444'} />
                <Text size='small' weight='bold'>Viewers</Text>
              </Box>
            </Button>
          </Box>
          <Box gridArea="main" justify="start" align="start" background="#F8FAFB">
            {children}
          </Box>
        </Grid>
      </Grommet >
    )
  }
}