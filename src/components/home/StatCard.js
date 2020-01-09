import React, { Component } from 'react';
import { Box, Heading } from 'grommet';

export default class StatCard extends Component {
  render() {
    return (
      <Box
        elevation="medium"
        round="xsmall"
        pad="medium"
        align="center"
        fill="horizontal"
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        background="white"
      >
        <Box pad="small" background="light-3" round="full">
          {this.props.icon}
        </Box>
        <Heading size="small" level={2} margin={{ bottom: "xsmall", top: "xsmall" }}>{this.props.value}</Heading>
        <Heading size="small" level={6} margin={{ top: "xsmall" }}>{this.props.title}</Heading>
      </Box>
    );
  }
}