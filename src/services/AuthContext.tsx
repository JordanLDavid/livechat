import React from 'react';
import { addUser, loginWithGoogle } from './Firebase';
import { AuthProviderProps, tUser } from '../types/types';
import { Timestamp, serverTimestamp } from 'firebase/firestore';

type IUserContext = [tUser | null | undefined, React.Dispatch<React.SetStateAction<tUser | null | undefined>>];

const AuthContext = React.createContext<IUserContext>([null, () => null]);

const AuthProvider:React.FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = React.useState<tUser | null>(null);

    const loginAccount = async () => {
        const user = await loginWithGoogle();

        if (!user) {
            // TODO: Handle failed login
        }
        const newUser:tUser = {
            uid: user?.uid as string,
            displayName: user?.displayName as string,
            dateJoined: serverTimestamp() as Timestamp
        }
        addUser(newUser);
        setUser(newUser);
    };

    const inputValue:IUserContext = [user, loginAccount];

    return <AuthContext.Provider value={inputValue}>{children}</AuthContext.Provider>;
};

function useAuth() {
    const auth = React.useContext(AuthContext);

    if (!auth) {
        throw new Error("AuthContext's value is undefined.");
    }

    return auth;
}

export { AuthContext, AuthProvider, useAuth };