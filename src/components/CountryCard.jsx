import React from 'react';
import { Card, Col, ListGroup} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function CountryCard({ country }) {
  const { languages, currencies, population, flags } = country;

  const formattedPopulation = population.toLocaleString();

  return (
      <Col className="mt-5 country-card">
        <LinkContainer
          to={`/countries/${country.name.common}`}
          state={{ country: country }}
        >
          <Card className="h-100">
            <Card.Body className="d-flex flex-column">
            <div class="text-center">
              <Card.Title >{country.name.common}</Card.Title>
              <div className='scroll'>
              <Card.Subtitle className="mb-1 text-muted p-2" style={{ borderBottom: '1px solid lightgray'}}>
                {country.name.official}
              </Card.Subtitle>
              </div>
          <img
            src={flags && flags.svg}
            alt={`${country.name.common} Flag`}
            
            style={{ width: '5rem', border: '1px solid lightgray'}}
          />
            </div>
              <ListGroup
                variant="flush"
                className="flex-grow-1 justify-content-end"
              >
                <ListGroup.Item>
                  <i className="bi bi-people me-2"></i>
                  {formattedPopulation}
                </ListGroup.Item>
                <ListGroup.Item className='scroll'>
                  <i className="bi bi-translate me-2"></i>
                  {languages && Object.values(languages).join(', ')}
                </ListGroup.Item>
                <ListGroup.Item>
                  <i className="bi bi-star-fill me-2"></i>
                  {country.capital && Object.values(country.capital).join(', ')}
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