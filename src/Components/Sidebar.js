import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../FirebaseConfig';

const Sidebar = ({ onSelectRoom }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const roomsSnapshot = await getDocs(collection(db, 'rooms'));
      const roomList = roomsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRooms(roomList);
      console.log(rooms)
    };

    fetchRooms();
  }, []);

  return (
    <div className="sidebar">
      <h2>Rooms</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            <button onClick={() => onSelectRoom(room.id)}>{room.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
