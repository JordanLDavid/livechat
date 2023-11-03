import React, { ChangeEvent, FormEvent } from 'react';
import { createRoom } from '../services/Firebase';
import { Link } from 'react-router-dom';

function CreateRoom() {
    const [value, setValue] = React.useState('');
    const [descValue, setDescriptionValue] = React.useState('');

    const handleRoomChange = (event:ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleDescriptionChange = (event:ChangeEvent<HTMLInputElement>) => {
        setDescriptionValue(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) =>  {
        event.preventDefault();
        createRoom(value, descValue);
        setValue('');
        setDescriptionValue('');
    };

    return (<>
        <h2>Create a new room</h2>
        <Link to="/">⬅️ Back to all rooms</Link>
        <form onSubmit={handleSubmit} className="message-input-container">
            <input
                type="text"
                placeholder="Enter room name"
                value={value}
                onChange={handleRoomChange}
                className="message-input"
                required
                minLength={1}
            />
            <input
                type="text"
                placeholder="Enter description"
                value={descValue}
                onChange={handleDescriptionChange}
                className="message-input"
                required
                minLength={1}
            />
            <button type="submit" disabled={(value.length < 1 && descValue.length < 1)} className="send-message">
                Send
            </button>
        </form>
        </>
    );
}
export { CreateRoom };