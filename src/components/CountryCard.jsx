import React from 'react';
import { Card, Col, ListGroup} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { addFavourite, removeFavourite } from '../features/countries/favouritesSlice';
import '../App.css'

function CountryCard({ country }) {
  const favouritesList = useSelector((state) => state.favourites.favourites);
  const dispatchEvent = useDispatch();
  const { population, flags, area } = country;

  const formattedPopulation = population.toLocaleString();
  const formattedArea = area.toLocaleString();

  const handleFavClick = (e) => {
    e.preventDefault();
    
    if (favouritesList.includes(country.name.common)) {
      dispatchEvent(removeFavourite(country.name.common));
    } else {
      dispatchEvent(addFavourite(country.name.common));
    }
  };

  return (
      <Col className="mt-5 country-card">
        <LinkContainer
          to={`/countries/${country.name.common}`}
          state={{ country: country }}
        >
          <Card className="h-100 hover-shadow">
            {favouritesList.includes(country.name.common) ? (
              <i
              className='bi bi-star-fill text-warning m-1 p-1 star'
              onClick={handleFavClick} />
            ) : (
              <i
              className='bi bi-star text-warning m-1 p-1 star'
              onClick={handleFavClick} />
            )}
            <Card.Body className="d-flex flex-column">
            <div className="text-center">
              <Card.Title >{country.name.common}</Card.Title>
              <div className='scroll'>
              <Card.Subtitle className="mb-1 text-muted p-2" style={{ borderBottom: '1px solid lightgray'}}>
                {country.name.official}
              </Card.Subtitle>
              </div>
          <img
            src={flags?.svg}
            alt={country.flags.alt}
            style={{ width: '6rem', border: '1px solid lightgray'}}
          />
            </div>
              <ListGroup
                variant="flush"
                className="flex-grow-1 justify-content-end"
              >
                <ListGroup.Item title="Region">
                  <i className="bi bi-compass me-2"></i>
                  {country.subregion || country.region}
                </ListGroup.Item>
                <ListGroup.Item title="Population">
                  <i className="bi bi-people me-2"></i>
                  {formattedPopulation}
                </ListGroup.Item>
                <ListGroup.Item title="Land area">
                  <i className="bi bi-map me-2"></i>
                  {formattedArea} km²
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </LinkContainer>
      </Col>
  );
}

export default CountryCard;