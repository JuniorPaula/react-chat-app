import React from 'react';
import Logo from '../assets/logochat.png';
import { useLogoutUserMutation } from '../services/appApi';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
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
            <LinkContainer to="/chats">
                <Nav.Link>Chats</Nav.Link>
            </LinkContainer>
            {!user && (
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}   
            {user && (
              <NavDropdown title={
                <>
                  <img src={user.picture} style={{ width: 30, height: 30, marginRight: 10, objectFit: 'cover', borderRadius: '50%'}} alt="" />
                  {user.name}
                </>
              } id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Button 
                    variant="danger"
                    onClick={handleLogout}>Sair</Button>
                </NavDropdown.Item>
              </NavDropdown>

            )} 
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
