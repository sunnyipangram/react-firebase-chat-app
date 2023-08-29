// Chat.js
import React, { useEffect, useState } from 'react';
import { auth, db, messaging } from '../FirebaseConfig';
import { addDoc, collection, serverTimestamp, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import '../Style/Chat.css';

const Chat = (props) => {
  const { Room } = props;
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const requestNotificationPermission = async () => {
      const permission = await Notification.requestPermission();
      console.log('Notification permission:', permission);
    };
  
    requestNotificationPermission();
  }, []);
  

  useEffect(() => {
    const messagesRef = collection(db, 'messages');
    const queryMessages = query(messagesRef, where('room', '==', Room), orderBy('createdAt'));

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
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
    });
    setNewMessage('');
  };
  console.log(auth.currentUser.photoURL)

  return (
    <div className="chat-app">
      <div className="header">
        <h1>Welcome To {Room.toUpperCase()}</h1>
      </div>
      <div className="message-box">
        {messages.map((message) => (
          <div className={`message ${message.user === auth.currentUser.displayName ? 'left' : 'right'}`} key={message.id}>
           <span className="user">{message.user}</span>
            {message.text}
          </div>
        ))}
      </div>
      <form className="new-message-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="new-message-input"
          placeholder="Type your message here"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit" className="send-button">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Chat;

























// import React, { useEffect, useState } from 'react';
// import { auth, db, messaging } from '../FirebaseConfig'; // Make sure to import the messaging instance
// import { addDoc, collection, serverTimestamp, query, where, orderBy, onSnapshot } from 'firebase/firestore';
// import '../Style/Chat.css';

// const Chat = (props) => {
//   const { Room } = props;
//   const [newMessage, setNewMessage] = useState('');
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const messagesRef = collection(db, 'messages');
//     const queryMessages = query(messagesRef, where('room', '==', Room), orderBy('createdAt'));

//     const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
//       let messages = [];
//       snapshot.forEach((doc) => {
//         messages.push({ ...doc.data(), id: doc.id });
//       });
//       setMessages(messages);
//     });

//     return () => unsubscribe();
//   }, [Room]);

//   useEffect(() => {
//     // Request permission and get registration token for notifications
//     const requestNotificationPermission = async () => {
//       try {
//         await Notification.requestPermission();
//         const token = await messaging.getToken();
//         console.log('FCM Token:', token);

//         // Save the token in your database (Firestore) for sending targeted notifications
//         // For example, you can save it in the user's document
//         // const userDocRef = doc(db, 'users', auth.currentUser.uid);
//         // await updateDoc(userDocRef, { fcmToken: token });
//       } catch (error) {
//         console.error('Notification permission error:', error);
//       }
//     };

//     requestNotificationPermission();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (newMessage === '') return;

//     await addDoc(collection(db, 'messages'), {
//       text: newMessage,
//       createdAt: serverTimestamp(),
//       user: auth.currentUser.displayName,
//       room: Room,
//     });
//     setNewMessage('');
//   };

//   return (
//     <div className="chat-app">
//       <div className="header">
//         <h1>Welcome To {Room.toUpperCase()}</h1>
//       </div>
//       <div className="message-box">
//         {messages.map((message) => (
//           <div className={`message ${message.user === auth.currentUser.displayName ? 'left' : 'right'}`} key={message.id}>
//             <span className="user">{message.user}</span>
//             {message.text}
//           </div>
//         ))}
//       </div>
//       <form className="new-message-form" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           className="new-message-input"
//           placeholder="Type your message here"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//         />
//         <button type="submit" className="send-button">
//           Send Message
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Chat;
