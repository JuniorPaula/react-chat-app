import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './login.css';

export default function Login() {
  return (
    <Container className="login__container">
        <Row>
            <Col>
                <div className="py-3">
                    <h2>Faça seu login</h2>
                </div>
                <Form style={{ width: "100%", maxWidth: 500}}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Digite seu email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" placeholder="Digite sua senha" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Lembrar-me" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Entrar
                    </Button>
                    <div className="py-4">
                        <p>
                            Não tem conta ? <Link to="/signup">Cadastrar-se</Link>
                        </p>
                    </div>
                </Form>
            </Col>
        </Row>
    </Container>
  )
}
