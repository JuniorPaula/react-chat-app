import React, { useContext, useEffect } from 'react'
import { Col, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { appContext } from '../context/appContext';
import { addNotifications, resetNotifications} from '../features/userSlice';
import './sidebar.css';

export default function Sidebar() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const { socket, members, setMembers, rooms, setRooms, currentRooms, setCurrentRooms, privateMembersMsg, setPrivateMembersMsg } = useContext(appContext);

    function joinRoom(room, isPublic = true) {
        if (!user) {
            return alert('Por favor faça o login')
        }

        socket.emit('join-room', room, currentRooms);
        setCurrentRooms(room);

        if (isPublic) {
            setPrivateMembersMsg(null)
        }

        dispatch(resetNotifications(room));

        socket.off('notifications').on('notifications', (room) => {
            dispatch(addNotifications(room))
        })
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
                        {room} {currentRooms !== room &&  <span className="badge rounded-pill bg-primary">{user.newMessage[room]}</span>}
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
                        
                    <Row>
                        <Col xs={2} className="member-status">
                            <img src={member.picture} className="member-status-img" alt=""/>
                            {member.status === "online" ? <i className="fas fa-circle sidebar-online-status"></i> : <i className="fas fa-circle sidebar-offline-status"></i>}
                        </Col>
                        <Col xs={9}>
                            {member.name}
                            {member._id === user?._id && ' (você)'}
                            {member.status === 'offline' && ' (offline)'}
                        </Col>
                        <Col xs={1}>
                        <span className="badge rounded-pill bg-primary">{user.newMessage[orderIds(member._id, user._id)]}</span>
                        </Col>
                    </Row>

                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    )
}
