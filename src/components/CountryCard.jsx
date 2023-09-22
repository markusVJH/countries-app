import React from 'react';
import { Card, Col, ListGroup} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function CountryCard({ country }) {
  const { languages, currencies, population, flags } = country;

  const formattedPopulation = population.toLocaleString();

  return (
      <Col className="mt-5">
        <LinkContainer
          to={`/countries/${country.name.common}`}
          state={{ country: country }}
        >
          <Card className="h-100">
          <img
            src={flags && flags.svg}
            alt={`${country.name.common} Flag`}
            className="position-absolute end-0 mt-1 me-1"
            style={{ width: '4rem', height: 'auto', border: '1px solid lightgray'}}
          />
            <Card.Body className="d-flex flex-column">
              <Card.Title>{country.name.common}</Card.Title>
              <Card.Subtitle className="mb-5 text-muted">
                {country.name.official}
              </Card.Subtitle>
              <ListGroup
                variant="flush"
                className="flex-grow-1 justify-content-end"
              >
                <ListGroup.Item>
                  <i className="bi bi-people me-2"></i>
                  {formattedPopulation}
                </ListGroup.Item>
                <ListGroup.Item>
                  <i className="bi bi-translate me-2"></i>
                  {languages && Object.values(languages).join(', ')}
                </ListGroup.Item>
                <ListGroup.Item>
                  <i className="bi bi-star-fill"></i>
                  {' ' + country.capital}
                </ListGroup.Item>
                <ListGroup.Item>
                  <i className="bi bi-cash-coin me-2"></i>
                  {currencies && Object.values(currencies)[0].name}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </LinkContainer>
      </Col>
  );
}

export default CountryCard;