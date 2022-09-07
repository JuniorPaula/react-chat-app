import React, { useContext, useState } from 'react';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../../services/appApi';
import { appContext } from '../../context/appContext';
import './login.css';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginUser, {isLoading, error}] = useLoginUserMutation()
    const { socket } = useContext(appContext)

    function handleLogin(e) {
        e.preventDefault();
        loginUser({email, password}).then(({data}) => {
            if(data) {
                socket.emit('new-user');
                navigate('/chats');
            }
        });
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
                        {error && <p className="alert alert-danger">{error.data}</p>}
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
                    <Button variant="primary" type="submit">
                        {isLoading ? <Spinner animation="grow" /> : 'Entrar'}
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
