import React, { Component } from 'react';
import { Box, Heading, Text } from 'grommet';
import { ArrowDownRight, ArrowUpRight } from 'react-feather';

export default class StatCard extends Component {
  render() {
    return (
      <Box
        elevation="small"
        round="xsmall"
        pad="small"
        fill="horizontal"
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        background="white"
      >
        <Box direction='row' gap='small' align='center' justify='between'>
          <Heading size="small" level={6} margin='none' color='dark-4'>{this.props.title}</Heading>
          <Box pad="xsmall" background={this.props.iconBackground} round="full">
            {this.props.icon}
          </Box>
        </Box>
        <Heading size="small" level={1} margin='none'>{this.props.value}</Heading>
        <Box direction='row' align='center' gap='xsmall' margin={{ top: 'small' }}>
          {this.props.growth < 0 ?
            <ArrowDownRight size={18} color='#E03332' />
            :
            <ArrowUpRight size={18} color='#36C634' />
          }
          <Text size='small' weight='bold' color={(this.props.growth > 0) ? '#36C634' : '#E03332'}>
            {this.props.growth}% since last month
          </Text>
        </Box>
      </Box>
    );
  }
}