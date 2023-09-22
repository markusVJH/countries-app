import React, { useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CountriesSingle = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [weather, setWeather] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const country = location.state.country;

  useEffect(()=>{
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`)
    .catch((err) => {
      setError(true);
    })
    .then((res) => {
      setWeather(res.data);
      setLoading(false);
    })

  }, [country.capital])

  console.log('weather xd ->', weather)

if (loading) {
  return (
    <Container>
      <Spinner
        animation="grow"
        role="status"
        className="center"
        variant="info"
        >
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    </Container>
  );
}


  return (
    <Container>
      <div>Single Country will be here</div>
    </Container>
  );
};

export default CountriesSingle;
