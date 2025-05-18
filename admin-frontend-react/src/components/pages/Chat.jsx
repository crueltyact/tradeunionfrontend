import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import APIService from "../../API/APIService";
import { useFetching } from "../hooks/UseFetching";
import Loader from "../Loader/Loader";
import EnrichProfileModal from "../EnrichProfileModal/EnrichProfileModal";
const Chat = () => {
  const [isEnrichModalOpen, setIsEnrichModalOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null); 
  const [fetchChats, isLoading, error] = useFetching(async () => {
    try {
        const response = await APIService.getUserChats();
        setChats(response.data.chats);
    } catch (error) {
        if (error.status === 403) {
            alert("Заполните персональные данные");
            setIsEnrichModalOpen(true);
        }
        console.error("Ошибка получения чатов:", error);
    }

  });

  useEffect(() => {
    fetchChats();
    if (socket) {
      socket.onmessage = (event) => {
          try {
          const msg = JSON.parse(event.data);
          setMessages((prev) => [...prev, msg]);
          } catch (e) {
          console.error("Ошибка при разборе сообщения:", e);
          }
      };
      socket.onclose = (event) => {
          console.warn("🔒 WebSocket закрыт", event.code, event.reason);
      };

      socket.onerror = (err) => {
          console.error("WebSocket ошибка", err);
      };
    }
    if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [socket, messages]);

  const handleProfileFilled = () => {
    setIsEnrichModalOpen(false);
  };

  const connectToChat = (chat) => {
    if (socket) socket.close();

    const token = localStorage.getItem("token");
    const ws = new WebSocket(
      `ws://82.202.156.164:8080/admin/v1/chat/ws/${chat.chat_id}?jwtToken=${encodeURIComponent(token)}`
    );

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

  const closeChat = async (chat_id) => {
    if (socket) {
      const payload = { content: "Системное сообщение: чат завершён" };
      socket.send(JSON.stringify(payload));
      socket.close();
    }
    await APIService.deleteUserChat(chat_id);
    setActiveChat(null);
    fetchChats();
  }

  return (
    <>
    <div className="container admin-chat-page_inner">
        <div className="admin-chat-page">
            <aside className="chat-sidebar">
                <h3 style={{marginBottom: "18px"}}>Список чатов</h3>
                <ul>
                    {isLoading 
                        ? 
                        <Loader /> 
                        :
                        chats && chats.map((chat) => (
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
                    <div ref={messagesEndRef} />
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
                    <div className="chat-buttons">
                      <button className="end-chat" onClick={() => closeChat(activeChat.chat_id)}>Завершить</button>
                      <button className="send-message" onClick={sendMessage}>Отправить</button>
                    </div>
                    </div>
                </>
                ) : (
                <div className="chat-placeholder">Выберите чат</div>
                )}
            </main>
        </div>
    </div>
    <EnrichProfileModal
        isOpen={isEnrichModalOpen}
        onClose={() => setIsEnrichModalOpen(false)}
        onProfileFilled={handleProfileFilled}
    />
    </>
  );
};

export default Chat;