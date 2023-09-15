import React, { useState } from 'react';


import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

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
    </Container>
  );
};

export default Countries;
