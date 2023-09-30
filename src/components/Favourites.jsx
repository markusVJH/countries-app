import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../features/countries/countriesSlice";
import { clearFavourites } from "../features/countries/favouritesSlice";
import CountryCard from "./CountryCard";
import '../App.css'


const Favourites = () => {
    const dispatch = useDispatch()
    let countriesList = useSelector((state) => state.countries.countries)
    const loading = useSelector((state) => state.countries.loading)
    const [search, setSearch] = useState("")
    const favouritesList = useSelector((state) => state.favourites.favourites)  

    const emptyFavoritesMessage = favouritesList.length === 0 ? (
      <p>You have no favorites yet! Add some by clicking the  <i
      className='bi bi-heart text-danger m-1 p-1'/> icon on a country :)</p>
    ) : null;
  

    if (favouritesList !== null) {
        countriesList = countriesList.filter(c => favouritesList.includes(c.name.common))
    }
    else {
        countriesList = []
    }

    useEffect(() => {
        dispatch(initializeCountries())
    }, [dispatch])


    if (loading) {
        return (
            <Col className="text-center m-5">
        <Spinner
          animation="border"
          role="status"
          className="center"
          variant="info"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
        )
    }
    return (<Container fluid className="full-height">
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
            <Button variant="danger" onClick={() => {
              const confirmed = window.confirm("Are you sure you want to clear favorites?");
              if (confirmed) {
                dispatch(clearFavourites());
              }
            }}>Clear Favourites</Button>
          </Col>
        </Row>
        <div className="empty-favorites">{emptyFavoritesMessage}</div>
        <Row xs={2} md={3} lg={3} className=" g-3">
          {countriesList
            .filter((c) => {
              return c.name.official.toLowerCase().includes(search.toLowerCase());
            })
            .map((country) => (
              <CountryCard key={country.name.common} country={country} />
              ))}
        </Row>
      </Container>)
}
export default Favourites;