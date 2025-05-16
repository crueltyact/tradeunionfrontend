import React, { useState, useEffect } from "react";
import "./Chat.css";
import APIService from "../../API/APIService";
import { useFetching } from "../hooks/UseFetching";
import Loader from "../Loader/Loader";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [fetchChats, isLoading, error] = useFetching(async () => {
    try {
        const response = await APIService.getUserChats();
        setChats(response.data.chats);
    } catch (error) {
        console.error("Ошибка получения чатов:", error);
    }

  });

  useEffect(() => {

    fetchChats();
  }, []);

  const connectToChat = (chat) => {
    if (socket) socket.close();

    const token = localStorage.getItem("token");
    const ws = new WebSocket(
      `ws://82.202.156.164:8080/admin/v1/chat/ws/${chat.chat_id}?jwtToken=${encodeURIComponent(token)}`
    );

    ws.onopen = () => console.log("✅ Подключено к чату:", chat.title);
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setMessages((prev) => [...prev, msg]);
    };
    ws.onerror = (e) => console.error("WS ошибка", e);
    ws.onclose = () => console.warn("Сокет закрыт");

    setSocket(ws);
    setMessages(chat.messages || []);
    setActiveChat(chat);
  };

  const sendMessage = () => {
    if (!input.trim() || !socket || socket.readyState !== WebSocket.OPEN) return;

    const payload = { content: input };
    socket.send(JSON.stringify(payload));
    setInput("");
  };

  return (
    <div className="container admin-chat-page_inner">
        <div className="admin-chat-page">
            <aside className="chat-sidebar">
                <h3 style={{marginBottom: "18px"}}>Список чатов</h3>
                <ul>
                    {isLoading 
                        ? 
                        <Loader /> 
                        :
                        chats.map((chat) => (
                            <li
                            key={chat.chat_id}
                            className={activeChat?.chat_id === chat.chat_id ? "active" : ""}
                            onClick={() => connectToChat(chat)}
                            >
                            {chat.title}
                            </li>
                        ))}
                    
                </ul>
            </aside>

            <main className="chat-window">
                {activeChat ? (
                <>
                    <div className="chat-header">{activeChat.title}</div>

                    <div className="chat-messages">
                    {messages.map((msg, idx) => (
                        <div
                        key={idx}
                        className={`message ${msg.role === "admin" ? "own" : "client"}`}
                        >
                        {msg.content}
                        </div>
                    ))}
                    </div>

                    <div className="chat-input">
                    <textarea
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value)
                            e.target.style.height = "auto";
                            e.target.style.height = e.target.scrollHeight + "px";
                        } }
                        placeholder="Сообщение..."
                        onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                        }
                        }}
                    />
                    <button onClick={sendMessage}>Отправить</button>
                    </div>
                </>
                ) : (
                <div className="chat-placeholder">Выберите чат</div>
                )}
            </main>
        </div>
    </div>
    
  );
};

export default Chat;