import React from 'react'
import { ListGroup } from 'react-bootstrap'

export default function Sidebar() {
    const rooms = ['sala 1', 'sala 2', 'sala 3'];
  
    return (
        <>
            <h2>Salas disponiveis</h2>
            <ListGroup>
                {rooms.map((room, idx) => (
                    <ListGroup.Item key={idx}>{room}</ListGroup.Item>
                ))}      
            </ListGroup>
            <h2>Usuários</h2>
        </>
    )
}
