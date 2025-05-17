import React, { useState } from "react";
import "./ChatButton.css";
import ChatModal from "../../ChatModal/ChatModal";
import { motion, AnimatePresence } from "framer-motion";

const ChatButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="chat-button-wrapper">
      <AnimatePresence>
        {!isModalOpen ? (
          <motion.button 
            className="chat-floating-button" 
            onClick={() => setIsModalOpen(true)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            💬 Чат
          </motion.button>
        ) : (
          <ChatModal onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatButton;