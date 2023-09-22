import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner, Image, Button } from 'react-bootstrap';
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
      <Row className="mt-5">
        <Col>
        <Image thumbnail src={`https://source.unsplash.com/1600x900/?${country.capital}`} />
        </Col>
        <Col>
        <h2 className='display-4'>{country.name.common}</h2>
        <h3>{country.capital}</h3>
        {!error && weather && (
          <div>
          <p>
            It is <strong>{parseInt(weather.main.temp)}</strong> degrees in {country.capital} and {weather.weather[0].description}
          </p>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
          </div>
        )}
        </Col>
      </Row>
      <Col>
      <Button variant="dark" onClick={() => navigate('/countries')}>Back</Button>
      </Col>
    </Container>
  );
};

export default CountriesSingle;
