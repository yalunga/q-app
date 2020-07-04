import React from 'react';
import { connect } from 'react-redux';
import StreamTableRow from './StreamTableRow';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

const Streams = ({ streams }) => {
  return (
    <div className='p-4'>
      <h1 className='text-3xl font-medium'>Recent Streams</h1>
      <div className='flex flex-col'>
        <table className='table-auto'>
          <thead>
            <tr>
              <th className='px-4 py-2'>Stream</th>
              <th className='px-4 py-2'>Title</th>
              <th className='px-4 py-2'>Duration</th>
              <th className='px-4 py-2'>Average Viewers</th>
              <th className='px-4 py-2'>Total Views</th>
              <th className='px-4 py-2'>Followers Gained</th>
              <th className='px-4 py-2'>Games Played</th>
            </tr>
          </thead>
          <tbody className='bg-white shadow-lg rounded-md'>
            {streams.reverse().map((stream) => (
              <StreamTableRow stream={stream} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(Streams);
