import React, { useState } from "react";
import "./ChatButton.css";
import ChatModal from "../../ChatModal/ChatModal";

const ChatButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="chat-button-wrapper">
      {!isModalOpen ? (
        <button className="chat-floating-button" onClick={() => setIsModalOpen(true)}>
          💬 Чат
        </button>
      ) : (
        <ChatModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default ChatButton;