import React, { Component } from 'react';
import { Box, Text } from 'grommet';
import { ArrowDownRight, ArrowUpRight } from 'react-feather';

export default class StatCard extends Component {
  render() {
    return (
      <Box
        elevation="small"
        round="xxsmall"
        pad="small"
        background="white"
        gap='small'
        responsive
        border={{ side: 'left', size: '3px', color: this.props.color }}
      >
        <Box direction='row' gap='small' align='center' justify='between' responsive>
          <Text
            size="small"
            level={6}
            margin='none'
            color='dark-4'
            style={{ textTransform: 'uppercase', letterSpacing: '2px' }}
          >
            {this.props.title}
          </Text>
          <Box pad="xsmall" round="full" background='light-1'>
            {this.props.icon}
          </Box>
        </Box>
        <Text size="xxlarge">{this.props.value}</Text>
        <Box direction='row' align='center' gap='xsmall' margin={{ top: 'small' }} responsive>
          {this.props.growth < 0 ?
            <ArrowDownRight size={18} color='#E03332' />
            :
            <ArrowUpRight size={18} color='#36C634' />
          }
          <Text size='small' color={(this.props.growth > 0) ? '#36C634' : '#E03332'}>
            {this.props.growth}% since last month
          </Text>
        </Box>
      </Box>
    );
  }
}