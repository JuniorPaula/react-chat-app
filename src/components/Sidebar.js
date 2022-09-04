import React, { useContext, useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { appContext } from '../context/appContext';

export default function Sidebar() {
    const user = useSelector((state) => state.user);
    const { socket, members, setMembers, rooms, setRooms, currentRooms, setCurrentRooms, privateMembersMsg, setPrivateMembersMsg } = useContext(appContext);

    function joinRoom(room, isPublic = true) {
        if (!user) {
            return alert('Por favor faça o login')
        }

        socket.emit('join-room', room);
        setCurrentRooms(room);

        if (isPublic) {
            setPrivateMembersMsg(null)
        }
    }

    useEffect(() => {
        if (user) {
            setCurrentRooms('geral');
            getrooms();
            socket.emit('join-room', 'geral');
            socket.emit('new-user');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    socket.off('new-user').on('new-user', (payload) => {
        setMembers(payload)
    });

    function getrooms() {
        fetch(`${process.env.REACT_APP_SERVER_API_URL}/rooms`)
            .then((res) => res.json())
            .then((data) => setRooms(data))
    }

    function orderIds(id1, id2) {
        if (id1 > id2) {
            return id1 + '-' + id2;
        } else {
            return id2 + '-' + id1;
        }
    }

    function handlePrivateMemberMsg(member) {
        setPrivateMembersMsg(member);
        const roomId = orderIds(user._id, member._id);
        joinRoom(roomId, false);
    }
  
    return (
        <>
            <h2>Salas disponiveis</h2>
            <ListGroup>
                {rooms.map((room, idx) => (
                    <ListGroup.Item 
                        key={idx} 
                        onClick={() => joinRoom(room)}
                        active={room === currentRooms}
                        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between'}}
                        >
                        {room} {currentRooms !== room && <span></span>}
                    </ListGroup.Item>
                ))}      
            </ListGroup>
            <h2>Usuários</h2>
            <ListGroup>
                {members.map((member) => (
                    <ListGroup.Item 
                        key={member.id} 
                        style={{ cursor: 'pointer'}}
                        active={privateMembersMsg?._id === member?._id}
                        onClick={() => handlePrivateMemberMsg(member)}
                        disabled={member._id === user._id}>
                        {member.name}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    )
}
