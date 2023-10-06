import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import CountryCard from './CountryCard';
import { initializeCountries } from '../features/countries/countriesSlice';
import BackToTopButton from './BackToTopButton';
import filterAndSortCountries from '../features/countryFilter';
import { Button } from 'react-bootstrap';

const Countries = () => {
  const dispatch = useDispatch();
  const countriesList = useSelector((state) => state.countries.countries);
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('alphabetical');
  const [reverseOrder, setReverseOrder] = useState('asc');

  useEffect(() => {
    dispatch(initializeCountries())
  },
  [dispatch])

  const filteredAndSortedCountries = filterAndSortCountries(
    countriesList,
    search,
    sortBy,
    reverseOrder
  );

  const toggleReverseOrder = () => {
    setReverseOrder(reverseOrder === 'asc' ? 'desc' : 'asc');
  };

  

  return (
    <Container fluid className='full-height'>
      <Row>
        <Col className="mt-5 d-flex justify-content-center">
          <Form>
            <Form.Control
              style={{ width: '13rem' }}
              type="search"
              className="me-2 "
              placeholder="Search for countries"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
          <Form>
            <Form.Select
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="alphabetical">Alphabetical</option>
              <option value="population">Population</option>
              <option value="area">Area</option>
            </Form.Select>
          </Form>
          <Button style={{ marginLeft:'0.5rem' }} variant='dark' onClick={toggleReverseOrder}><i className="bi bi-arrow-down-up" /></Button>
        </Col>
      </Row>
      <BackToTopButton />
      <Row xs={1} sm={2} md={2} lg={3} className="g-4 pb-4">
        {filteredAndSortedCountries.map((country) => (
              <CountryCard 
              country={country}
              key={country.name.common}
              />
        ))}
      </Row>
    </Container>
  );
};

export default Countries;
