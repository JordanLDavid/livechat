import React from 'react';
import { getRoomInfo } from './Firebase';
import { tChatRoom } from '../types/types';

function GetRoomInfo(roomId:string):tChatRoom | undefined {
    const [roomInfo, setRoomInfo] = React.useState();

    React.useEffect(() => {
        return getRoomInfo(roomId, setRoomInfo);
    }, [roomId]);

    return roomInfo;
}

export { GetRoomInfo };