import React, { useState } from 'react';
import logo from '../../static/logo.png';

export default ({ title, children }) => {
  const [showNav, setShowNav] = useState(false);
  return (
    <div className='w-full'>
      <div className='flex w-full h-16 px-4 bg-white z-10 absolute top-0 left-0 flex text-center border-solid border-b-2'>
        <div className='flex text-center'>
          <img src={logo}
            alt='alt placeholder' className='w-8 h-8 mt-4' />
          <span className='hidden md:block my-auto ml-4 text-xl font-bold'>Metriik</span>
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