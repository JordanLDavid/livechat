import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { Lobby } from './components/Lobby';
import { ChatRoom } from './components/ChatRoom';
import { NotFound } from './components/NotFound';
import { CreateRoom } from './components/CreateRoom';

function App() {
  return (
    <>
      <div className="container">
        <h1>💬 Chat Room</h1>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Lobby />} />
            <Route path="/room" element={<CreateRoom />} />
            <Route path="/room/:id" element={<ChatRoom />} />
            <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
      </div>
    </>
  )
}

export default App
