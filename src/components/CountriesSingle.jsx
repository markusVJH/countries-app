import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner, Image, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css'

const CountriesSingle = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [weather, setWeather] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const country = location.state.country;

  useEffect(()=>{
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`)
      .then((res) => {
        setWeather(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [country.capital]);

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
      <div className='title'>
      <Button variant="dark" onClick={() => navigate('/countries')}><i className="bi bi-arrow-left"></i></Button>
        <div className="d-flex align-items-center mb-3">
            <Image
              src={country.flags && country.flags.svg}
              alt={`${country.name.common} Flag`}
              style={{ width: '7rem', marginRight: '1rem' }}
            />
        <h1 className='display-4'>{country.name.common}</h1>
        </div>
      </div>
      <Row className="mt-5">
        <Col>
        <Image thumbnail src={`https://source.unsplash.com/1600x900/?${country.capital + ' nature'}`} />
        </Col>
        <Col>
          <h3>{country.capital && Object.values(country.capital).join(', ')}</h3>
          {error ? (
            <p>Weather data not found for this country. Hopefully its nice!</p>
          ) : (
            weather && (
              <div>
                <p>
                  It is <strong>{parseInt(weather.main.temp)}</strong> degrees in {country.capital} and {weather.weather[0].description} :)
                  <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                </p>
              </div>
            )
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CountriesSingle;
