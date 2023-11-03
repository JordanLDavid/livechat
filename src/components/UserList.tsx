import { tUser } from "../types/types.tsx"

export function UserList(users:tUser[]) {

    return (
        <div className="message-list-container">
            <ul className="message-list">
                {users.length <= 0 ? <p> No users </p> :
                 users?.map((x) => (
                    (<><p>User: {x.displayName}</p>
                    <p>Date Joined: {x.dateJoined.toString()}</p></>)
                    
                ))}
            </ul>
        </div>
    );
}