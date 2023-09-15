import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useSelector } from 'react-redux';
import CountryCard from './CountryCard';

const Countries = () => {
  const countriesList = useSelector((state) => state.countries.countriesList);
  const loading = useSelector((state) => state.countries.isLoading);

  const [search, setSearch] = useState('')

  console.log("Search: ", search)

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
      <CountryCard country={country} />
    </Container>
  );
};

export default Countries;
