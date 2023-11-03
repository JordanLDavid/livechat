
export function Message( message:tMessage, isOwnMessage:boolean) {
    const { displayName, text } = message;
    return (
        <li className={['message', isOwnMessage && 'own-message'].join(' ')}>
            <h4 className="sender">{isOwnMessage ? 'You' : displayName}</h4>
            <div>{text}</div>
        </li>
    );
}