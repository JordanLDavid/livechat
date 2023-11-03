import { Link } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import { getRooms, logout } from '../services/Firebase';
import React from 'react';
import { tChatRoom } from '../types/types';
{/* 
import { getUsers } from '../services/Firebase';
import { UserList } from './UserList'; 
import { tUser } from '../types/types';
*/}

function Lobby() {
    const [ user, loginAccount ] = useAuth();
    const [rooms, setRooms] = React.useState<tChatRoom[]>([]);
    {/*const [users, setUsers] = React.useState<tUser[]>([]);*/}

    const handleLoginClick: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
        event.preventDefault(); // Prevent default button behavior if needed
        await loginAccount(null); // Call the login logic
    };

    if(!user)
    {
        return ( <>
            <h2>Log in to join a chat room!</h2>
            <div>
                <button onClick={ handleLoginClick } className="login">
                    Login with Google
                </button>
            </div>
        </>)
    }
    getRooms(setRooms);
    {/*getUsers(setUsers);*/}
    
    return (
    <><h2>Choose a Chat Room</h2>
      <ul className="chat-room-list">
      <Link to="/room">Create new room</Link>
        {rooms == undefined || rooms.length <= 0 ?
            <h3>No Chat Rooms found </h3> :
            rooms.map((room) => (
                <li key={room.id}>
                    <Link to={`/room/${room.id}`}>{room.title}</Link>
                </li>
            ))
            }
        </ul>
        <br/><br/>
        {/*Currently broken <UserList users={users} />*/}
        <br/><br/>
        <button onClick={logout}>Signout</button></>);
}

export { Lobby };