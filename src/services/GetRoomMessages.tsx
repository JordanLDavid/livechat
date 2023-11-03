import React from 'react';
import { getMessages } from './Firebase';
import { tMessage } from '../types/types';

function GetRoomMessages(roomId:string) : tMessage[] {
    const [messages, setMessages] = React.useState([]);

    React.useEffect(() => {
        return getMessages(roomId, setMessages);
    }, [roomId]);

    return messages;
}

export { GetRoomMessages };