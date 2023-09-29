import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import { auth, logout } from '../auth/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Layout = () => {
  const [user, loading] = useAuthState(auth);
  return (
    <Container fluid>
      <Row>
        <Navbar variant="light" style={{ height: '4rem', borderBottom: '1px solid lightgray' } }>
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
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
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
            </Nav>
              {user ? (
                <Button variant="dark" onClick={logout}>Logout</Button>
              ) : (<LinkContainer to ="/login"><Button variant="dark">Login</Button></LinkContainer>)}
          </Container>
        </Navbar>
      </Row>
      <Row>
        <Outlet />
      </Row>
    </Container>
  );
};

export default Layout;
