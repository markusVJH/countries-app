import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Footer from '../components/Footer';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import { auth, logout } from '../auth/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Layout = () => {
  const [user] = useAuthState(auth);


  return (
    <Container fluid>
      <Row>
        <Navbar
        collapseOnSelect
        variant="light" 
        className='fixed-top' 
        style={{ borderBottom: '1px solid lightgray', 
        background:'white'} }
        expand="lg"
        >
          <Container>
            <Navbar.Brand eventkey="1" href="/">Countries App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" style={{justifyContent:'space-between' }}>
            <Nav>
                <LinkContainer to="/countries">
                  <Nav.Link eventkey="2">Countries</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/favourites">
                  <Nav.Link eventkey="3">Favourites</Nav.Link>
                </LinkContainer>
            </Nav>
            <Nav className="ml-auto">
              {user ? (
                <>
                  <Navbar.Text style={{marginRight:'1rem'}}>{user.email}</Navbar.Text>
                  <Button variant="dark" onClick={logout}>Logout</Button>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link eventkey="4">Login</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link eventkey="5">Register</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Row>
      <Row>
      <div className='container'>
      <div style={{ paddingTop: '3.5rem' }}>
        <Outlet />
      </div>
      </div>
        <Footer />
      </Row>
    </Container>
  );
};

export default Layout;
