import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import CountryCard from './CountryCard';
import { initializeCountries } from '../features/countries/countriesSlice';

const Countries = () => {
  const dispatch = useDispatch();
  const countriesList = useSelector((state) => state.countries.countries);
  const loading = useSelector((state) => state.countries.isLoading);

  console.log("CountriesList = ", countriesList);

  const [search, setSearch] = useState('')

  console.log("Search: ", search)

  useEffect(() => {
    dispatch(initializeCountries())
  },
  [dispatch])

  const country = {
    name: {
      common: 'Example Country'
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col className="mt-5 d-flex justify-content-center">
          <Form>
            <Form.Control
              style={{ width: '18rem' }}
              type="search"
              className="me-2 "
              placeholder="Search for countries"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </Col>
      </Row>
      {countriesList.map((country) => {
        return (
        <CountryCard country={country} key={country.name.common}/>
      )
      })}
    </Container>
  );
};

export default Countries;
