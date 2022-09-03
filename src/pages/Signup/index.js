import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useSignupUserMutation } from '../../services/appApi';
import { Link } from 'react-router-dom';
import BotImage from '../../assets/bot.png';
import './signup.css';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [signupUser, { isLoading, error }] = useSignupUserMutation()
    
    function validateImage(e) {
        const file = e.target.files[0];
        if(file >= 1048576) {
            return alert('Tamanho máximo de 1MB.');
        } else {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    }

    async function uploadImage() {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', `${process.env.REACT_APP_API_KEY_IMAGE_UPLOAD}`);

        try {
            setUploadingImage(true);
            const response = 
                await fetch(`${process.env.REACT_APP_CLOUDYNARY_HOST}/${process.env.REACT_APP_CLOUDYNARY_USERNAME}/image/upload`, {
                    method: 'post',
                    body: data
                });
            const urlData = await response.json();
            setUploadingImage(false);
            return urlData.url;
        } catch (error) {
            setUploadingImage(false);
            console.log(error)
        }
    }

    async function handleSignup(e) {
        e.preventDefault();
        if(!image) return alert('Por favor selecione uma foto');
        const url = await uploadImage(image);
        signupUser({name, email, password, picture: url }).then(({data}) => {
            if(data) {
                console.log(data)
            }
        })
    }

  return (
    <Container className="signup__container">
        <Row>
            <Col>
                <div className="py-3">
                    <h2>Faça seu cadastro</h2>
                </div>
                <Form style={{ width: "100%", maxWidth: 500}} onSubmit={handleSignup}>
                    <div className="signup-profile-pic__container">
                        <img src={imagePreview || BotImage} className="signup-profile-pic" alt="imagem bot" />
                        <label htmlFor="image-upload" className="image-upload-label">
                            <i className="fas fa-plus-circle add-picture-icon"></i>
                        </label>
                        <input type="file" id="image-upload" hidden accept="image/png, image/jpeg" onChange={validateImage} />
                    </div>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Digite seu nome"
                            onChange={e => setName(e.target.value)}
                            value={name} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Digite seu email"
                            onChange={e => setEmail(e.target.value)}
                            value={email} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Digite sua senha"
                            onChange={e => setPassword(e.target.value)}
                            value={password} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Lembrar-me" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {uploadingImage ? "Cadastando..." : "Cadastrar-se"} 
                    </Button>
                    <div className="py-4">
                        <p>
                            Já tem conta ? <Link to="/login">Login</Link>
                        </p>
                    </div>
                </Form>
            </Col>
        </Row>
    </Container>
  )
}
