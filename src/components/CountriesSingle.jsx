import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner, Image, Button, Modal } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css'

const CountriesSingle = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [weather, setWeather] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showFlagModal, setShowFlagModal] = useState(false);

  const country = location.state.country;
  const formattedPopulation = country.population.toLocaleString();
  const formattedArea = country.area.toLocaleString();

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

  const toggleFlagModal = () => {
    setShowFlagModal(!showFlagModal);
  };

if (loading) {
  return (
    <Container>
      <Spinner
        animation="grow"
        role="status"
        className="center"
        variant="warning"
        >
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    </Container>
  );
}


  return (
    <Container className='full-height'>
      <div className='title'>
      <Button variant="dark" onClick={() => navigate('/countries')}><i className="bi bi-arrow-left"></i></Button>
        <div className="d-flex align-items-center mb-3">
            <Image
              src={country.flags && country.flags.svg}
              alt={`${country.name.common} Flag`}
              style={{ width: '7rem', marginRight: '1rem', cursor: 'pointer', border: '1px solid lightgray' }}
              onClick={toggleFlagModal}
            />
        <h1 className='display-4'>{country.name.common}</h1>
        </div>
      </div>
      <Row className="mt-5">
        <Col>
          <iframe
            title="Google Maps"
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(country.name.common)}`}
            width="100%"
            height="100%"
            allowFullScreen
            ></iframe>
        </Col>
        <Col>
            <p>Capital city: <strong>{country.capital && Object.values(country.capital).join(', ')}</strong></p>
                {error ? (
                  <p style={{marginLeft: '1rem'}}>Weather data not found for this country. Hopefully its nice!</p>
                  ) : (
                    weather && (
                    <div>
                      <p><small style={{marginLeft: '1rem', paddingBottom:'2rem'}}>
                        It is <strong>{parseInt(weather.main.temp)} °C</strong> in {country.capital} and {weather.weather[0].description}
{/*                         <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} style={{position: 'absolute'}} /> */}
                      </small></p>  
                    </div>
                  )
                )}
            <p>
              Official languages: <strong>{country.languages && Object.values(country.languages).join(', ')}</strong>
            </p>
            <p>
              Population: <strong>{formattedPopulation}</strong>
            </p>
            <p>
              Total land area: <strong>{formattedArea} km²</strong>
            </p>
            <p>
              Currency: <strong>{country.currencies && Object.values(country.currencies)[0].name} | {country.currencies && Object.values(country.currencies)[0].symbol}</strong>
            </p>
        </Col>
        <Col>
        <Image thumbnail src={`https://source.unsplash.com/1600x900/?${country.capital}`} />
        </Col>
      </Row>
      <Modal show={showFlagModal} onHide={toggleFlagModal}>
        <Modal.Header closeButton>
          <Modal.Title>The flag of {country.name.common}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image
            src={country.flags && country.flags.svg}
            alt={`${country.name.common} Flag`}
            style={{ width: '100%' }}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default CountriesSingle;
