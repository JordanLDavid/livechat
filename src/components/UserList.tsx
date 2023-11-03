import { tUser } from "../types/types.tsx"

export function UserList(users:tUser[]) {

    return (
        <div >
            <ul >
                {users.length <= 0 ? <p> No users </p> :
                 users?.map((x) => (
                    (<><p>User: {x.displayName}</p>
                    <p>Date Joined: {x.dateJoined.toString()}</p></>)
                    
                ))}
            </ul>
        </div>
    );
}