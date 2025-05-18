import React, { useState, useEffect, useRef } from "react";
import "./ChatModal.css";
import APIService from "../../API/APIService";
import { motion, AnimatePresence } from "framer-motion";

const ChatModal = ({ onClose }) => {
    const [ticketNumber, setTicketNumber] = useState("");
    const [chatStarted, setChatStarted] = useState(false);
    const [chatId, setChatId] = useState(null);
    const [isSocketOpen, setIsSocketOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [socket, setSocket] = useState(null);
    const [worker, setWorker] = useState(null);
    const [prevMessages, setPrevMessages] = useState([]);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (socket) {
            socket.onopen = () => {
                console.log("✅ WebSocket открыт");
                setIsSocketOpen(true);
            };

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
    }, [socket, messages, prevMessages]); 

  const handleStartChat = async () => {
    try {
        const response = await APIService.startChat(ticketNumber);
        if (!response) throw new Error("Не удалось создать чат");
        const data = response.data;
        console.log(response.data)
        setChatId(data.chat_id);
        setWorker(data.worker);
        setPrevMessages(data.messages);
        setChatStarted(true);
        const newChatId = data.chat_id;
        const ws = new WebSocket(`ws://82.202.156.164:8080/client/v1/chat/ws/${newChatId}?tradeUnionID=${ticketNumber}`);
        localStorage.setItem("chatId", data.chat_id);
        localStorage.setItem("ticketNumber", ticketNumber);
        localStorage.setItem("worker", JSON.stringify(data.worker));
        setSocket(ws);
    } catch (err) {
      alert("Не удалось подключиться к чату");
      console.error(err);
    }
  };

    const sendMessage = () => {
        if (!inputMessage.trim()) return;

        if (!socket || socket.readyState !== WebSocket.OPEN) {
            console.warn("Сокет не готов для отправки");
            return;
        }

        const payload = {
            content: inputMessage,
        };

        try {
            socket.send(JSON.stringify(payload));
            setInputMessage("");
        } catch (err) {
            console.error("Ошибка отправки сообщения:", err);
        }
    };

  return (
    <AnimatePresence mode="wait">
        <motion.div 
            className="chat-modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
        >
            <div className="chat-modal__header">
                <h2 className="chat-modal__title">Чат с сотрудником профсоюза</h2>
                <button onClick={onClose} className="close-button">
                    ✕
                </button>
            </div>
            <motion.div 
                className="chat-modal__content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <div className="chat-modal__inner">
                    {!chatStarted ? (
                    <motion.div
                        style={{ display: "flex", flexDirection: "column" }}
                        key="start"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <label htmlFor="ticketNumber">Номер профбилета:</label>
                        <input
                            type="text"
                            value={ticketNumber}
                            onChange={(e) => setTicketNumber(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleStartChat()}
                            placeholder="Номер профбилета"
                        />
                        <button className="chat-modal__start-button" onClick={handleStartChat}>Начать чат</button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="chat"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                        className="chat-modal__content-wrapper" 
                    >
                        {worker && (
                            <div className="chat-worker-info">
                                <img className="worker-avatar" src="/user.svg" alt="worker" />
                                {worker.second_name} {worker.first_name}
                            </div>
                        )}

                        <div className="chat-messages">
                            {prevMessages && prevMessages.map((msg, idx) => (
                                <div key={idx} className={`message-bubble ${msg.role === "client" ? "user-message" : "worker-message"}`}>
                                    {msg.content}
                                </div>
                            ))}
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`message-bubble ${msg.role === "client" ? "user-message" : "worker-message"}`}>
                                    {msg.content}
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="chat-input">
                            <textarea
                                value={inputMessage}
                                onChange={(e) => {
                                    setInputMessage(e.target.value)
                                    e.target.style.height = "auto";
                                    e.target.style.height = e.target.scrollHeight + "px";
                                } }
                                placeholder="Сообщение..."
                                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                className="message-input"
                            />
                            <button onClick={sendMessage}>Отправить</button>
                        </div>
                    </motion.div>
                        
                    )}
                </div>

            </motion.div>
        </motion.div>
    </AnimatePresence>
  );
};

export default ChatModal;