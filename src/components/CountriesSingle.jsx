import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner, Image, Button, Modal } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { addFavourite, removeFavourite } from '../features/countries/favouritesSlice';
import { useDispatch, useSelector } from 'react-redux';
import '../App.css'

const CountriesSingle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const favouritesList = useSelector((state) => state.favourites.favourites);
  const dispatchEvent = useDispatch();

  const [weather, setWeather] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [showCoatModal, setShowCoatModal] = useState(false);

  const country = location.state.country;
  const formattedPopulation = country.population.toLocaleString();
  const formattedArea = country.area.toLocaleString();

  const handleHeartClick = (e) => {
    e.preventDefault();
    
    if (favouritesList.includes(country.name.common)) {
      dispatchEvent(removeFavourite(country.name.common));
    } else {
      dispatchEvent(addFavourite(country.name.common));
    }
  };

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
  const toggleCoatModal = () => {
    setShowCoatModal(!showCoatModal);
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
        <div className="d-flex align-items-center mb-3 flagNameCoat">
            <Image
              src={country.flags && country.flags.svg}
              alt={`${country.name.common} Flag`}
              style={{ width: '7rem', marginRight: '1rem', cursor: 'pointer', border: '1px solid lightgray' }}
              onClick={toggleFlagModal}
              />
        <h2>{country.name.common}</h2>
        <Image
              src={country.flags && country.coatOfArms.svg}
              alt={`${country.name.common} Coat of arms`}
              style={{ width: '7rem', marginLeft: '1rem', cursor: 'pointer'}}
              onClick={toggleCoatModal}
              />
        </div>
              {favouritesList.includes(country.name.common) ? (
                <i
                style={{cursor: 'pointer'}}
                className='bi bi-star-fill text-warning m-1 p-1 star-single'
                onClick={handleHeartClick} />
              ) : (
                <i
                className='bi bi-star text-warning m-1 p-1 star-single'
                onClick={handleHeartClick} />
              )}
      </div>
      <Row xs={1} md={3} lg={3} className="g-4">
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
            <p>
              Official name: <strong>{country.name.official}</strong>
            </p>
            <p>
              Region: <strong>{country.subregion || country.region}</strong>
            </p>
            <p>
              Population: <strong>{formattedPopulation}</strong>
            </p>
            <p>
              Total land area: <strong>{formattedArea} km²</strong>
            </p>
            <p>Capital city: <strong>{(country.capital && Object.values(country.capital).join(', ')) || 'None '}</strong></p>
                {error ? (
                  <p style={{marginLeft: '1rem'}}>Weather: Cannot find weather data. Hopefully it's nice!</p>
                  ) : (
                    weather && (
                      <div>
                      <p><small style={{marginLeft: '1rem', paddingBottom:'2rem'}}>
                        It is <strong>{parseInt(weather.main.temp)} °C</strong> in {country.capital} and {weather.weather[0].description}
                      </small></p>  
                    </div>
                  )
                  )}
            <p>
              Official languages: <strong>{(country.languages && Object.values(country.languages).join(', ')) || 'None'}</strong>
            </p>
            <p>
              Currency: <strong>{(country.currencies && Object.values(country.currencies)[0].name) || 'No currency'} {country.currencies && Object.values(country.currencies)[0].symbol}</strong>
            </p>
        </Col>
        <Col>
        <Image thumbnail src={`https://source.unsplash.com/1600x900/?${country.name.common} nature`} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
        </Col>
      </Row>
      <Modal show={showFlagModal} onHide={toggleFlagModal}>
        <Modal.Header closeButton>
          <Modal.Title>Flag of {country.name.common}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image
            src={country.flags && country.flags.svg}
            alt={country.flags.alt}
            style={{ width: '100%' }}
          />
        </Modal.Body>
      </Modal>
      <Modal show={showCoatModal} onHide={toggleCoatModal}>
        <Modal.Header closeButton>
          <Modal.Title>{country.name.common} coat of arms</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image
            src={country.flags && country.coatOfArms.svg}
            alt={country.flags.alt}
            style={{ width: '100%' }}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default CountriesSingle;
