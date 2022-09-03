import React from 'react'
import { Row, Col, Button, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import './home.css'

export default function Home() {
  return (
    <Container>
      <Row>
        <Col md={6} className="d-flex flex-direction-column align-items-center justify-content-center">
          <div>
            <h1>Compartilhe o mundo com seus amigos.</h1>
            <p>Rooms chat vai conectar você com o mundo.</p>
            <LinkContainer to="/chats">
              <Button variant="primary">
                Vamos la <i className="fas fa-comments home-message-icon"></i>
              </Button>
            </LinkContainer>
          </div>
        </Col>
        <Col md={6}>
          <Col className="home__bg"></Col>
        </Col>
      </Row>
    </Container>
  )
}
