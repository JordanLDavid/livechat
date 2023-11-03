import { Link, useParams } from 'react-router-dom';
import { InputMessageBox } from './InputMessageBox';
import { MessageBox } from './MessageBox';
import { useNavigate } from 'react-router-dom';
import { GetRoomInfo } from '../services/GetRoomInfo';

function ChatRoom() {
    const params = useParams();
    const navigate = useNavigate();
    if (params.id === undefined)
    {
        navigate('*');
        return;
    }
    const room = GetRoomInfo(params.id);
    if (room == undefined) {
        navigate('*');
        return;
    }

    return (
        <>
            <h2>{room.title}</h2>
            <div>
                <Link to="/">⬅️ Back to all rooms</Link>
            </div>
            <div>
                <MessageBox id={room.id} />
                <InputMessageBox id={room.id} />
            </div>
        </>
    );
}

export {ChatRoom};