import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { appContext } from '../context/appContext';
import './messageForm.css';

export default function MessageForm() {
    const user = useSelector((state) => state.user);
    const messageEndRef = useRef(null);
    const { socket, currentRooms, messages, setMessages, privateMembersMsg} = useContext(appContext)
    const [message, setMessage] = useState('');

    useEffect(() => {
        scrollToBottom();
    }, [messages])

    function getFormatedDate() {
        const date = new Date();
        const year = date.getFullYear();
        let month = (1 + date.getMonth()).toString();

        month = month.length > 1 ? month : '0' + month;

        let day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;

        return `${day}/${month}/${year}`;
    }


    function scrollToBottom() {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth"})
    }

    const todaydate = getFormatedDate();

    socket.off('room-message').on('room-message', (roomMessages) => {
        
        setMessages(roomMessages);
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
        {user && !privateMembersMsg?._id && <div className="alert alert-info">Você está na sala {currentRooms}</div>}
                {user && privateMembersMsg?._id && (
                    <>
                        <div className="alert alert-info conversation-info">
                            <div>
                                Você está convensando com {privateMembersMsg.name} <img src={privateMembersMsg.picture} alt="" className="conversation-profile-pic" />
                            </div>
                        </div>
                    </>
            )}
            {user && messages.map(({ _id: date, messagesBydate }, idx) => (
                <div key={idx}>
                    <p className="text-center message-date-indicator">{date}</p>
                    {messagesBydate?.map(({ content, time, from: sender}, msgIdx) => (
                        <div className={sender?.email === user?.email ? 'message' : 'incoming-message'} key={msgIdx}>
                            <div className="message-inner">
                                <div className="d-flex align-items-center mb-3">
                                    <img src={sender.picture} style={{ width: 35, height: 35, objectFit: 'cover', borderRadius: '50%', marginRight: 10}} alt="" />
                                    <p className="message-sender">{sender._id === user._id ? 'você' : sender.name}</p>
                                </div>
                                <p className="message-content">{content}</p>
                                <p className="message-timestamp-left">{time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ))}

            <div ref={messageEndRef} />
        </div>
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col md={11}>
                    <Form.Group>
                        <Form.Control 
                            type="text"
                            disabled={!user}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
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
