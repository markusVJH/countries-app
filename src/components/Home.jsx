import React from 'react';

const Home = () => {
  return (
    <div className='full-height'>
      <div style={{textAlign:'center', paddingTop:'1rem'}}>
        <h1>Countries app </h1>
        <p>A simple React application made in
        Business College Helsinki lessons. App uses{' '}
        <a href="https://restcountries.com/">https://restcountries.com/ </a> and{' '}
        <a href="https://openweathermap.org/">https://openweathermap.org/</a></p>
      </div>
    </div>
  );
};

export default Home;
