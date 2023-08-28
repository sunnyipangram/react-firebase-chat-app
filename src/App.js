import React, { useState,useRef } from 'react';
import './App.css';
import Auth from './Components/Auth';
import Cookies from 'universal-cookie';
import Chat from './Components/Chat';
import { signOut } from 'firebase/auth';
import { auth } from './FirebaseConfig';
const cookies = new Cookies

function App() {

  const [IsAuth, setIsAuth] = useState(cookies.get('auth-token'))
  const [Room, setRoom] = useState('')
  const roomInputref=useRef(null)

  const SignUserOut=async()=>{
    await signOut(auth)
    cookies.remove('auth-token')
    setIsAuth(
      setRoom(null)
    )
  }

  if (!IsAuth) {
    return (
      <div className="App">

        <Auth setIsAuth={setIsAuth} />
        hello
      </div>
    )
  }
  return <>{Room ? <Chat Room={Room}/> :
    <div className='room'>
      <label>enter room name</label>
      <input type="text" ref={roomInputref} className="" />
      <button onClick={()=>setRoom(roomInputref.current.value)}>enter chat</button>
    </div>}
    <div className="signout"><button onClick={SignUserOut}> Sign Out</button></div>
    </>
}


export default App;
