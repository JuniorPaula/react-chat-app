import React, { useContext, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { appContext } from '../context/appContext';
import './messageForm.css';

export default function MessageForm() {
    const user = useSelector((state) => state.user);
    const { socket, currentRooms, messages, setMessages, privateMembersMsg} = useContext(appContext)
    const [message, setMessage] = useState('');

    function getFormatedDate() {
        const date = new Date();
        const year = date.getFullYear();
        let month = (1 + date.getMonth()).toString();

        month = month.length > 1 ? month : '0' + month;

        let day = date.getDay().toString();

        day = day.length > 1 ? day : '0' + day;

        return `${day}/${month}/${year}`;
    }

    const todaydate = getFormatedDate();

    socket.off('room-messages').on('room-messages', (roomMessages) => {
        console.log('room messages', roomMessages);
        setMessage(roomMessages);
    });

    function handleSubmit(e) {
        e.preventDefault();
        const today = new Date();
        const minutes = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
        const time = today.getHours() + ':' + minutes;
        const roomId = currentRooms;
        socket.emit('message-room', roomId, message, user, time, todaydate);
        setMessage('');
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
                            value={message}
                            onChange={e => setMessage(e.target.value)}
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
