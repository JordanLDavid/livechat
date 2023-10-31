import "firebase/auth";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import 'firebase/firestore';
import { useContext, useState } from 'react';
import { UserContext } from './UserContext';
import { initializeApp } from "firebase/app";

export const fireApp = initializeApp({
    apiKey: "AIzaSyA03oSljNJybjxndMpwX8rYme2zFjLWgKY",
    authDomain: "jld-livechat.firebaseapp.com",
    projectId: "jld-livechat",
    storageBucket: "jld-livechat.appspot.com",
    messagingSenderId: "1009927259966",
    appId: "1:1009927259966:web:387ac92e81bc92c63e8e6f",
    measurementId: "G-4KV9KJSSD9"
  })

 const SignIn = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [userToken, setUserToken] = useState<string | undefined>("");
    const { setUser } = useContext(UserContext);

    const auth = getAuth(fireApp);
    const handleSignIn = async () => {
      const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          setUserToken(credential.accessToken);
          // The signed-in user info.
          setUser(result.user);
        }).catch((error) => {
          setErrorMessage(error.message);
        });
    };
  
    return (
      <div>
        <button onClick={handleSignIn}>Sign in with Google</button>
        { errorMessage ? <p>errorMessage</p> : null }
      </div>
    );
  };

  export default SignIn;