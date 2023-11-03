import React from 'react';
import { getMessages } from './Firebase';
import { tChatRoom } from '../types/types';

function GetRoomMessages(roomId:string) : tChatRoom[] {
    const [messages, setMessages] = React.useState([]);

    React.useEffect(() => {
        return getMessages(roomId, setMessages);
    }, [roomId]);

    return messages;
}

export { GetRoomMessages };