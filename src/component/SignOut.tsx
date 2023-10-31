import { useContext } from 'react';
import { UserContext } from './UserContext'; // Import the UserContext where user state is stored
import { getAuth, signOut } from 'firebase/auth';
import { fireApp } from './SignIn';

const SignOut = () => {
  const { setUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      const auth = getAuth(fireApp);
      await signOut(auth);
      setUser(null); // Update the user state to indicate the user is logged out
    } catch (error) {
      // Handle error if sign-out fails
      console.error('Error while signing out:', error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default SignOut;
