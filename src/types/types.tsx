import { Timestamp } from "firebase/firestore";

export type tUser = {
    uid: string;
    displayName: string | null;
    dateJoined: Timestamp
};

export type tChatRoom = {
    id: string;
    title: string;
    description: string;
    timestamp: Timestamp
};

export type tMessage = {
    chatroomId : string;
    displayName : string;
    id : string;
    text : string;
    timestamp : Timestamp;
    userId : string
}

export type stringProp = {
    id: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CallbackProp = (...args: any[]) => void