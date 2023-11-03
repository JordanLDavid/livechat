import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { addDoc, collection, doc, getDocs, getFirestore, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";
import { tUser, CallbackProp } from "../types/types";

const FirebaseConfig = {
    apiKey: "AIzaSyA03oSljNJybjxndMpwX8rYme2zFjLWgKY",
    authDomain: "jld-livechat.firebaseapp.com",
    projectId: "jld-livechat",
    storageBucket: "jld-livechat.appspot.com",
    messagingSenderId: "1009927259966",
    appId: "1:1009927259966:web:387ac92e81bc92c63e8e6f",
    measurementId: "G-4KV9KJSSD9"
  };
  
const FirebaseApp = initializeApp(FirebaseConfig);
const db = getFirestore(FirebaseApp);

async function loginWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        const { user } = await signInWithPopup(auth, provider);
        return { uid: user.uid, displayName: user.displayName };
    } catch (error: Error) {
        if (error.code !== 'auth/cancelled-popup-request') {
            console.error(error);
        }

        return null;
    }
}

async function logout() {
    getAuth().signOut().then(() => {
        // Sign-out successful.
        useNavigate()("/");
      }).catch((error) => {
        // An error happened.
        console.error(error);
      });
}

async function sendMessage(roomId: string, user:tUser|null|undefined, text:string) {
    try {
        await addDoc(collection(db, 'messages'), {
            id: uuidv4(),
            userId: user?.uid,
            displayName: user?.displayName,
            text: text.trim(),
            timestamp: serverTimestamp(),
            chatroomId: roomId
        });
    } catch (error) {
        console.error(error);
    }
}

function getMessages(roomId:string, callback:CallbackProp) {
    return onSnapshot(
        query(
            collection(db, 'messages'),
            where('chatroomId', '==', roomId),
            orderBy('timestamp', 'asc')
        ),
        (querySnapshot) => {
            const messages = querySnapshot.docs.map((doc) => ({
                chatroomId: roomId,
                ...doc.data(),
            }));
            callback(messages);
        }
    );
}

async function addUser(user:tUser) {
    const usersCollection = collection(db, 'users');
    const q = query(usersCollection, where('uid', '==', user?.uid));
    try {
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            try { 
                await addDoc(collection(db, 'users'), {
                    uid: user?.uid,
                    displayName: user?.displayName,
                    dateJoined: user?.dateJoined,
                });
            } catch (error) {
                console.error(error);
            }
        } else {
        return ; // User with the specified UID not found
        }
    } catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
}

async function createRoom(roomName: string, text:string) {
    try { 
        await addDoc(collection(db, 'chatrooms'), {
            title: roomName,
            description: text.trim(),
            timestamp: serverTimestamp(),
        });
    } catch (error) {
        console.error(error);
    }
}

function getRooms(callback:CallbackProp) {
    return onSnapshot(
        query(
            collection(db, 'chatrooms'),
            orderBy('timestamp', 'asc')
        ),
        (querySnapshot) => {
            const rooms = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            callback(rooms);
        }
    );
}

function getRoomInfo(roomId:string, callback:CallbackProp) {
    const docRef = doc(db, 'chatrooms', roomId);
    return onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
          callback({ id: doc.id, ...doc.data() });
        } else {
          console.log('No such document!');
          callback(null); // Pass null or handle the absence of the document in a way that suits your use case
        }
      });
}

async function getUsers(callback:CallbackProp) {
    const usersCollection = collection(db, 'users');
    const q = query(usersCollection);
    try {
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const users = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            callback(users);
        } 
    } catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
}
export { loginWithGoogle, logout, addUser, sendMessage, getMessages, createRoom, getRooms, getRoomInfo, getUsers
 };