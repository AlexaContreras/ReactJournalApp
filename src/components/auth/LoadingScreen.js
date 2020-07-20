import React from 'react';

export const LoadingScreen = () => {
  return (
    <div className='auth__main-loading'>
      <p className='auth_title-loading'> Loading</p>
      <div className='auth_container_spinner'>
        <div className='yellow'></div>
        <div className='red'></div>
        <div className='blue'></div>
        <div className='violet'></div>
      </div>
    </div>
  );
};
