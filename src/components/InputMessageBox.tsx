import React, { ChangeEvent, FormEvent } from 'react';
import { useAuth } from '../services/AuthContext'
import { sendMessage } from '../services/Firebase';
import { stringProp } from '../types/types';

function InputMessageBox({id}:stringProp)  {
    const [ user ] = useAuth();
    const [value, setValue] = React.useState('');

    const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        sendMessage(id, user, value);
        setValue('');
    };

    return (
        <form onSubmit={handleSubmit} className="message-input-container">
            <input
                type="text"
                placeholder="Enter a message"
                value={value}
                onChange={handleChange}
                className="message-input"
                required
                minLength={1}
            />
            <button type="submit" disabled={value == ""} className="send-message">
                Send
            </button>
        </form>
    );
}
export { InputMessageBox };