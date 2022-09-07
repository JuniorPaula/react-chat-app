import React from 'react';
import Logo from '../assets/logochat.png';
import { useLogoutUserMutation } from '../services/appApi';
import {  Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';

export default function Navigation() {
  const user = useSelector((state) => state.user);
  const [ logoutUser ] = useLogoutUserMutation();

  async function handleLogout(e) {
    e.preventDefault();
    await logoutUser(user);
    window.location.replace('/');
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
            <Navbar.Brand>
                <img src={Logo} style={{ width: 50, height: 50 }} alt="Logo Chat" />
            </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">  
            {user && (
              <NavDropdown title={
                <>
                  <img src={user.picture} style={{ width: 30, height: 30, marginRight: 10, objectFit: 'cover', borderRadius: '50%'}} alt="" />
                  {user.name}
                </>
              } id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Nav.Link 
                    variant="danger"
                    onClick={handleLogout}>Sair</Nav.Link>
                </NavDropdown.Item>
              </NavDropdown>

            )} 
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
