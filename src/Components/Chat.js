import React, { useEffect, useState } from 'react'
import { auth, db } from '../FirebaseConfig'
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore'
import '../Style/Chat.css'


const Chat = (props) => {

    const { Room } = props
    const [NewMessage, setNewMessage] = useState('')
    const messagesRef = collection(db, 'messages')
    const [Messages, setMessages] = useState([])
    useEffect(() => {
        const queryMessages = query(messagesRef,where("room", "==" ,Room),orderBy("createdAt"));
      const unsubscribe=  onSnapshot(queryMessages,(snapshot)=>{

            console.log(snapshot,'messssssss')
            let messages=[]
            snapshot.forEach((doc) => {
                messages.push({...doc.data(),id:doc.id})

            });
            setMessages(messages)


        })

        return ()=>unsubscribe()


    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (NewMessage === "") return;
        console.log(NewMessage, 'new message')

        await addDoc(messagesRef, {
            text: NewMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room: Room
        })
        setNewMessage('')
    }
    console.log(NewMessage, 'new message')
    return (
        <div className='chat-app'>
            <div className="header"><h1>Welcom To { Room.toUpperCase()}</h1></div>
            <div className="">{Messages.map((message)=> <div className='message'>
                <span className='user'>{message.user}</span>
               {message.text}
               
            </div>)}</div>
            <form action="" className="new-message-form" onSubmit={handleSubmit}>
                <input type="text" className='new-message-input' placeholder='type your message here' value={NewMessage} onChange={(e) => setNewMessage(e.target.value)} />
                <button type='submit' className='send-button'>Send Message</button>
            </form>
        </div>
    )
}

export default Chat