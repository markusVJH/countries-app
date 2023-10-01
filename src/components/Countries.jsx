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

const Countries = () => {
  const dispatch = useDispatch();
  const countriesList = useSelector((state) => state.countries.countries);
  const loading = useSelector((state) => state.countries.isLoading);
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('alphabetical');

  useEffect(() => {
    dispatch(initializeCountries())
  },
  [dispatch])

  const filteredAndSortedCountries = filterAndSortCountries(
    countriesList,
    search,
    sortBy
  );

  

  return (
    <Container fluid className='full-height'>
      <Row>
        <Col className="mt-5 d-flex justify-content-center">
          <Form>
            <Form.Control
              style={{ width: '20rem' }}
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
        </Col>
      </Row>
      <BackToTopButton />
      <Row xs={1} md={3} lg={3} className=" g-4">
        {filteredAndSortedCountries.map((country) => (
          <CountryCard country={country} key={country.name.common} />
        ))}
      </Row>
    </Container>
  );
};

export default Countries;
