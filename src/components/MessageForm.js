import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import './messageForm.css';

export default function MessageForm() {
    function handleSubmit(e) {
        e.preventDefault();
    }

  return (
    <>
        <div className="message-output"></div>
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col md={11}>
                    <Form.Group>
                        <Form.Control 
                            type="text"
                            placeholder="Digite sua mensagem">                             
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col md={1}>
                    <Button 
                        variant="primary" 
                        type="submit" 
                        style={{ width: "100%", backgoundColor: 'orange'}}>
                            <i className="fas fa-paper-plane"></i>
                    </Button>
                </Col>
            </Row>
        </Form>
    </>
    
  )
}
