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
        <Navbar variant="light" className='fixed-top' style={{ borderBottom: '1px solid lightgray', background:'white'} }>
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" style={{ background: 'white' }}>
            <Nav>
                <LinkContainer to="/">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/countries">
                  <Nav.Link>Countries</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/favourites">
                  <Nav.Link>Favourites</Nav.Link>
                </LinkContainer>
            </Nav>
            </Navbar.Collapse>
            <Nav className="ml-auto">
              {user ? (
                <>
                  <Navbar.Text style={{marginRight:'1rem'}}>{user.email}</Navbar.Text>
                  <Button variant="dark" onClick={logout}>Logout</Button>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>Register</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Container>
        </Navbar>
      </Row>
      <Row>
      <div className='container'>
      <div style={{ paddingTop: '4rem' }}>
        <Outlet />
      </div>
      </div>
        <Footer />
      </Row>
    </Container>
  );
};

export default Layout;
