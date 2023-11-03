import React from 'react';
import { useAuth } from '../services/AuthContext';
import { GetRoomMessages } from '../services/GetRoomMessages';
import { Message } from './Message';
import { stringProp } from '../types/types';

function MessageBox({ id } : stringProp) {
    const containerRef = React.useRef(null);
    const [ user ] = useAuth();
    const messages = GetRoomMessages(id);

    React.useLayoutEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    });

    return (
        <div className="message-list-container" ref={containerRef}>
            <ul className="message-list">
                {messages.length <= 0 ? <p> No messages available. Be the first to send a message </p> :
                 messages?.map((x) => (
                    <Message
                        key={x.id}
                        message={x}
                        isOwnMessage={x.userId === user.uid}
                    />
                ))}
            </ul>
        </div>
    );
}

export { MessageBox };