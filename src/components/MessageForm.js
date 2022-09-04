import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import './messageForm.css';

export default function MessageForm() {
    const user = useSelector((state) => state.user);
    function handleSubmit(e) {
        e.preventDefault();
    }

  return (
    <>
        <div className="message-output">
            {!user && <div className="alert alert-danger">Por favor faça seu login</div>}
        </div>
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col md={11}>
                    <Form.Group>
                        <Form.Control 
                            type="text"
                            disabled={!user}
                            placeholder="Digite sua mensagem">                             
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col md={1}>
                    <Button 
                        variant="primary" 
                        type="submit" 
                        style={{ width: "100%", backgoundColor: 'orange'}} disabled={!user}>
                            <i className="fas fa-paper-plane"></i>
                    </Button>
                </Col>
            </Row>
        </Form>
    </>
    
  )
}
