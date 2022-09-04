import React, { useContext, useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { appContext } from '../context/appContext';

export default function Sidebar() {
    const user = useSelector((state) => state.user);
    const { socket, members, setMembers, rooms, setRooms, setCurrentRooms } = useContext(appContext);

    useEffect(() => {
        if (user) {
            setCurrentRooms('geral');
            getrooms();
            socket.emit('join-room', 'geral');
            socket.emit('new-user');
        }
    }, []);

    socket.off('new-user').on('new-user', (payload) => {
        setMembers(payload)
    });

    function getrooms() {
        fetch(`${process.env.REACT_APP_SERVER_API_URL}/rooms`)
            .then((res) => res.json())
            .then((data) => setRooms(data))
    }
  
    return (
        <>
            <h2>Salas disponiveis</h2>
            <ListGroup>
                {rooms.map((room, idx) => (
                    <ListGroup.Item key={idx}>{room}</ListGroup.Item>
                ))}      
            </ListGroup>
            <h2>Usuários</h2>
            {members.map((member) => (
                <ListGroup.Item key={member.id} style={{ cursor: 'pointer'}}>
                    {member.name}
                </ListGroup.Item>
            ))}
        </>
    )
}
