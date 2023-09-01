

import React, { useState,useRef,useEffect } from 'react';
import './App.css';
import Auth from './Components/Auth';
import Cookies from 'universal-cookie';
import Chat from './Components/Chat';
import { signOut } from 'firebase/auth';
import { auth, messaging } from './FirebaseConfig';
import { getToken } from 'firebase/messaging';

const cookies = new Cookies

function App() {

  const [IsAuth, setIsAuth] = useState(cookies.get('auth-token'))
  const [Room, setRoom] = useState('')
  const roomInputref=useRef(null)

  useEffect(() => {
    // console.log(messaging,' nerherhhrhe')
    const requestNotificationPermission = async () => {
      try {
      const permission=  await Notification.requestPermission();
      console.log(permission);
      const token = await getToken(messaging);
          console.log("Token Gen", token);
      
      // if (permission === "granted") {
      //   // Generate Token
      //   const token = await getToken(messaging, {
      //     vapidKey:
      //       "BGkbYM1UNhe-lHqCit7noK-gynQh0_4ZAaiISI3y-r4Dv3kgRpW1gOTAn1iPbpA61mMsSmO-T9K1pCKtfpqGMQU",
      //   });
      //   console.log("Token Gen", token);
       
      //   // Send this token  to server ( db)
      // } else if (permission === "denied") {
      //   alert("You denied for the notification");
      // }
        // const token = await getToken(messaging,{vapidKey:'BGkbYM1UNhe-lHqCit7noK-gynQh0_4ZAaiISI3y-r4Dv3kgRpW1gOTAn1iPbpA61mMsSmO-T9K1pCKtfpqGMQU'});
        
      } catch (error) {
        console.error('Notification permission error:', error);
      }
    };

    requestNotificationPermission();
  }, []);

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
      <label>Enter Room Code</label>
      <input type="text" ref={roomInputref} className="" />
      <button onClick={()=>setRoom(roomInputref.current.value)}>enter chat</button>
    </div>}
    <div className="signout"><button onClick={SignUserOut}> Sign Out</button></div>
    </>
}


export default App;
