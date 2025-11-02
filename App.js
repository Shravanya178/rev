'''in socket-client react app src/App.js'''

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

export default function App() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("message", (data) => {
      setChat((prev) => [...prev, data]);
    });
    return () => socket.off("message");
  }, []);

  const send = () => {
    if (msg.trim()) {
      socket.emit("message", msg);
      setMsg("");
    }
  };

  return (
    <div className="App" style={{ padding: 20 }}>
      <h2>☕ Coffee Chat</h2>
      <div style={{ marginBottom: 10 }}>
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Type message..."
        />
        <button onClick={send}>Send</button>
      </div>
      {chat.map((m, i) => (
        <p key={i}>{m}</p>
      ))}
    </div>
  );
}
