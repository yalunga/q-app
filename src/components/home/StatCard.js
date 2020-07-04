import React, { Component } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'react-feather';

export default class StatCard extends Component {
  render() {
    return (
      <div className='flex flex-col justify-between w-full shadow-md rounded-md p-2 bg-white border-l-4' style={{ borderLeftColor: this.props.color }} >
        <div className='flex flex-row justify-between'>
          <span className='text-sm text-gray-600' style={{ textTransform: 'uppercase', letterSpacing: '2px' }}>
            {this.props.title}
          </span>
          <div className='p-2 rounded-full bg-gray-200'>
            {this.props.icon}
          </div>
        </div>
        <span className='text-3xl'>{this.props.value}</span>
        <div className='flex flex-row content-center mt-8'>
          {this.props.growth < 0 ?
            <ArrowDownRight size={18} color='#E03332' />
            :
            <ArrowUpRight size={18} color='#36C634' />
          }
          <span className='text-sm ml-2' style={{ color: (this.props.growth > 0) ? '#36C634' : '#E03332' }}>
            {this.props.growth}% since last month
          </span>
        </div>
      </div>
    );
  }
}