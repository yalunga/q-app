import React, { useState } from 'react';

import logo from '../../static/logo.png';
import { twitchApi } from '../../api';

export default ({ title, children }) => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const handleChange = async (e) => {
    setSearch(e.target.value);
    if (e.target.value.length > 0) {
      const users = await twitchApi.users.search(e.target.value);
      setData(users);
    }
  }

  return (
    <div className='w-full'>
      <div className='flex w-full h-16 px-4 bg-white z-10 absolute top-0 left-0 flex text-center border-solid border-b-2 justify-between'>
        <div className='flex text-center'>
          <a href='/'>
            <img src={logo}
              alt='alt placeholder'
              className='w-8 h-8 mt-4'
            />
          </a>
          <span className='hidden md:block my-auto ml-4 text-xl font-bold'>TrueMetric</span>
        </div>
        <div className='shadow bg-white rounded my-2 border'>
          <div className='h-full flex items-center flex-col'>
            <input
              className='h-full appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none'
              id='username'
              value={search}
              onChange={handleChange}
              type='text'
              placeholder='Search'
              autoComplete='off'
            />
          </div>
          <div className='w-full rounded-b border shadow border-t-0'>
            {data && data.map((twitchUser) => (
              <div
                className='w-full bg-white block px-2 py-1 rounded-b'
                key={twitchUser.twitchId}
              >
                <div className='h-12 flex items-center hover:bg-blue-100 rounded-b'>
                  <img className='w-8 ml-2 rounded-full' src={twitchUser.twitchProfileImage} />
                  <a className='w-full font-medium' href={`/twitch/${twitchUser.twitchId}`}>
                    {twitchUser.twitchName}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='flex bg-gray-100'>
        <div className='flex-1 bg-gray-100 mt-16 mx-auto container'>
          {children}
        </div>
      </div>
    </div>
  )
}