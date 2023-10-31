import './App.css'
import SignIn from './component/SignIn';
import ChatRoom from './component/ChatRoom';
import SignOut from './component/SignOut';
import { UserContext } from './component/UserContext';
import { useContext } from 'react';


function App() {

  const { user } = useContext(UserContext);

  return (
    <>  
      <div className="App">
        <header>
        </header>
        <section>
          {user ? (
                  <>
                    <ChatRoom/>
                    <SignOut/>
                  </>
                  ) : 
          <SignIn/> }
        </section>
      </div>
    </>
  )
}

export default App
