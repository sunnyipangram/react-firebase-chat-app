// Chat.js
import React, { useEffect, useState } from 'react';
import { auth, db, messaging } from '../FirebaseConfig';
import { addDoc, collection, serverTimestamp, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import '../Style/Chat.css';
import { getMessaging, getToken } from 'firebase/messaging';
import Sidebar from './Sidebar';
import {BiSolidSend} from 'react-icons/bi'
const Chat = (props) => {
  const { Room } = props;
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messaging = getMessaging(); // Initialize the messaging instance
  const [lastNotificationTime, setLastNotificationTime] = useState(null);


  useEffect(() => {
    // Request notification permission
    const requestNotificationPermission = async () => {
      try {
        await messaging.requestPermission();
        const token = await getToken(messaging);
        console.log('FCM Token:', token);
      } catch (error) {
        console.error('Notification permission error:', error);
      }
    };

    requestNotificationPermission();
  }, []);
  

  useEffect(() => {
  

    const handleNewMessage = async (message) => {
      const isCurrentUserMessage = message.user === auth.currentUser.displayName;

      if (!isCurrentUserMessage && message.createdAt) {
        const messageTimestamp = message.createdAt.toMillis();
        const currentTime = Date.now();

        const timeDifference = currentTime - messageTimestamp;
        const withinLast10Seconds = timeDifference <= 10000;

        if (withinLast10Seconds && lastNotificationTime !== messageTimestamp) {
          // Check if a notification hasn't already been sent for this message
          setLastNotificationTime(messageTimestamp);

          const notificationOptions = {
            body: message.text,
          };

          new Notification(message.user, notificationOptions);
        }
      }
    };

    const messagesRef = collection(db, 'messages');
    const queryMessages = query(messagesRef, where('room', '==', Room), orderBy('createdAt'));

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);

      if (messages.length > 0) {
        const latestMessage = messages[messages.length - 1];
        handleNewMessage(latestMessage);
      }
    });

    return () => unsubscribe();
  }, [Room]);

  useEffect(() => {
    console.log(messaging,' nerherhhrhe')
    const requestNotificationPermission = async () => {
      try {
        await Notification.requestPermission();
        const token = await messaging.getToken();
        console.log('FCM Token:', token);
      } catch (error) {
        console.error('Notification permission error:', error);
      }
    };

    requestNotificationPermission();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === '') return;

    await addDoc(collection(db, 'messages'), {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room: Room,
      profileUrl: auth.currentUser.photoURL
    });
    setNewMessage('');

    // Send a notification after sending a message
    // const notification = new Notification(auth.currentUser.displayName, {
    //   body: newMessage,
    // });
  };
  console.log(auth.currentUser.photoURL)

  return (
    <div className="chat-app">
      <Sidebar/>
      <div className="header">
        <h1>Welcome To {Room.toUpperCase()}</h1>
      </div>
      <div className="message-box">
    {messages.map((message) => {
      const isCurrentUserMessage = message.user === auth.currentUser.displayName;

    
      return (
        <div className={`message ${isCurrentUserMessage ? 'left' : 'right'}`} key={message.id} style={{display:'flex',alignItems:'center',gap:'10px'}}>
       <img src={!message.profileUrl? "https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png":  message.profileUrl} style={{height:'25px',width:'25px',borderRadius:'50%'}} alt="" />   <span className="user">{message.user}</span>
          {message.text}
        </div>
      );
    })}
  </div>

      <form className="new-message-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="new-message-input"
          placeholder="Type your message here"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit" className="send-button" style={{display:'flex',alignItems:'center',gap:'5px'}}>
          Send<BiSolidSend/>
        </button>
      </form>
    </div>
  );
};

export default Chat;























