import React, { useState } from 'react';
import Particles from 'react-particles-js';
import { Search } from 'react-feather';
import _ from 'lodash';

import logo from '../../static/logo.png';
import { twitchApi } from '../../api';

export default () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const startSearch = _.debounce(async () => {
    if (search.length > 0) {
      const users = await twitchApi.users.search(search);
      setData(users);
    } else {
      setData([]);
    }
  }, 100)
  const handleChange = (e) => {
    setSearch(e.target.value);
    startSearch();
  }
  console.log(data);
  return (
    <div className='p-4' style={{ width: '100vw', height: '100vh' }}>
      <img src={logo}
        alt='alt placeholder' className='w-8 h-8 absolute top-2 left-2' />
      <div className='flex items-center flex-col h-full w-full'>
        <span className='mt-64 text-4xl'>Track and analyze statistics on your favorite Twitch streamers</span>
        <div className='shadow-lg bg-white rounded-md w-2/3 border mt-4'>
          <div className='h-16 w-full rounded-md flex items-center text-gray-700 px-2 bg-white'>
            <Search />
            <input
              className='h-full w-full rounded-md appearance-none py-2 px-3 text-gray-700 leading-tight focus:outline-none relative z-10'
              id='username'
              value={search}
              onChange={handleChange}
              type='text'
              placeholder='Search'
              autoComplete='off'
            />
          </div>
          <ul className='w-full relative z-10 rounded-md'>
            {data && data.map((twitchUser) => (
              <li
                className='w-full bg-white block px-2 py-1 rounded-md'
                key={twitchUser.twitchId}
              >
                <div className='h-12 flex items-center hover:bg-blue-100 rounded-md'>
                  <img className='w-8 ml-2 rounded-full' src={twitchUser.twitchProfileImage} />
                  <a className='w-full ml-2 font-medium' href={`/twitch/${twitchUser.twitchId}`}>
                    {twitchUser.twitchName}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='absolute inset-0 z-0'>
        <Particles
          params={{
            particles: {
              number: {
                value: 50
              },
              size: {
                value: 2
              },
              color: '#708090',
              line_linked: {
                shadow: {
                  enable: true,
                  color: "#3CA9D1",
                  blur: 1
                }
              }
            }
          }}
        />
      </div>
    </div>
  );
}