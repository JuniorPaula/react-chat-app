import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../../services/appApi';
import './login.css';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginUser] = useLoginUserMutation()

    function handleLogin(e) {
        e.preventDefault();
        loginUser({email, password}).then(({data}) => {
            if(data) {
                navigate('/chats')
            }
        })
    }


  return (
    <Container className="login__container">
        <Row>
            <Col>
                <div className="py-3">
                    <h2>Faça seu login</h2>
                </div>
                <Form style={{ width: "100%", maxWidth: 500}} onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            required
                            type="email" 
                            placeholder="Digite seu email" 
                            onChange={e => setEmail(e.target.value)}
                            value={email} 
                            />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control
                            required 
                            type="password" 
                            placeholder="Digite sua senha"
                            onChange={e => setPassword(e.target.value)}
                            value={password} 
                            />
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
