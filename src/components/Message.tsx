import { iMessageProps } from "../types/types";

export function Message( props:iMessageProps) {
    const { displayName, text } = props.message;
    return (
        <li className={['message', props.isOwnMessage && 'own-message'].join(' ')}>
            <h4 className="sender">{props.isOwnMessage ? 'You' : displayName}</h4>
            <div>{text}</div>
        </li>
    );
}