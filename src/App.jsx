import React from 'react';
import './App.css';
import Routes from './routes';

import Navbar from './components/navbar';

function App() {
  return (
    <>
      <Navbar position='static' variant='dense' color='inherit' text='Google Books' letterSize='h6' />

      <div className='container'>
        <Routes />
      </div>
    </>
  );
}

export default App;