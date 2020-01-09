import React, { Component } from 'react';
import { Grommet, Box, Button, Grid, Image, Heading } from 'grommet';
import { View, Group, Trophy, Menu } from 'grommet-icons';

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
      family: "Muli, sans-serif"
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
              <Image fit="cover" fill src="//v2.grommet.io/assets/IMG_4245.jpg" style={{ borderRadius: "100%" }}/>
            </Box>
          </Box>
          <Box
            gridArea="sidebar"
            width="xsmall"
            animation={[
              { type: "fadeIn", duration: 300 },
              { type: "slideRight", size: "xlarge", duration: 150 }
            ]}
            elevation="medium"
            background="white"
          >
            <Button href="/" hoverIndicator>
              <Box pad={{ horizontal: "medium", vertical: "medium" }} align="center">
                <Menu size="medium" color="dark-4" />
              </Box>
            </Button>
            <Button href="/followers" hoverIndicator>
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
          <Box gridArea="main" justify="start" align="start" pad={{ horizontal: "large", vertical: "medium" }} background="#F8FAFB">
            {children}
          </Box>
        </Grid>
      </Grommet>
    )
  }
}