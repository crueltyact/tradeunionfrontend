import React, { useState, useEffect } from "react";
import "./ChatModal.css";
import APIService from "../../API/APIService";

const ChatModal = ({ onClose }) => {
    const [ticketNumber, setTicketNumber] = useState("");
    const [chatStarted, setChatStarted] = useState(false);
    const [chatId, setChatId] = useState(null);
    const [isSocketOpen, setIsSocketOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [socket, setSocket] = useState(null);
    const [worker, setWorker] = useState(null);

    useEffect(() => {
        // const storedChatId = localStorage.getItem("chatId");
        // const storedTicket = localStorage.getItem("ticketNumber");
        // const storedWorker = localStorage.getItem("worker");

        // if (storedChatId && storedTicket && storedWorker) {
        //     setChatId(storedChatId);
        //     setTicketNumber(storedTicket);
        //     setWorker(JSON.parse(storedWorker));
        //     setChatStarted(true);

        //     const ws = new WebSocket(
        //         `ws://82.202.156.164:8080/client/v1/chat/ws/${storedChatId}?tradeUnionID=${storedTicket}`
        //     );

        //     setSocket(ws);
        // }
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
    }, [socket]); 

  const handleStartChat = async () => {
    try {
        const response = await APIService.startChat(ticketNumber);
        if (!response) throw new Error("Не удалось создать чат");
        const data = response.data;
        setChatId(data.chat_id);
        setWorker(data.worker);
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
    <div className="chat-modal">
        <div className="chat-modal__content">
            <h2 className="chat-modal__title">Чат с сотрудником профсоюза</h2>
            {!chatStarted ? (
            <>
                <label htmlFor="ticketNumber">Номер профбилета:</label>
                <input
                    type="text"
                    value={ticketNumber}
                    onChange={(e) => setTicketNumber(e.target.value)}
                    placeholder="Номер профбилета"
                />
                <button className="chat-modal__start-button" onClick={handleStartChat}>Начать чат</button>
            </>
        ) : (
            <div className="chat-modal__content-wrapper">
                {worker && (
                    <div className="chat-worker-info">
                        <img className="worker-avatar" src="/user.svg" alt="worker" />
                        {worker.second_name} {worker.first_name} {worker.patronymic}
                    </div>
                )}

                <div className="chat-messages">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`message-bubble ${msg.role === "client" ? "user-message" : "worker-message"}`}>
                            {msg.content}
                        </div>
                    ))}
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
            </div>
                
            )}
            <button onClick={onClose} className="close-button">
                ✕
            </button>
        </div>
    </div>
  );
};

export default ChatModal;