import { useState } from "react";
import "./TabSwitcher.css"
import TabButton from "../UI/TabButton/TabButton";
import { motion, AnimatePresence } from "framer-motion";

const TabSwitcher = ({ onChange, children, description, title = "О разделе"}) => {
  const [activeTab, setActiveTab] = useState("");

  const handleClick = (tabId) => {
    setActiveTab((prev) => (prev === tabId ? "" : tabId));
    onChange?.(tabId);
  };

  return (
    <>
      <div className="tab-buttons">
        <TabButton
          color="#F34252"
          isActive={activeTab === "worker"}
          onClick={() => handleClick("worker")}
        >
          Работнику
        </TabButton>
        <TabButton
          color="#207EEB"
          isActive={activeTab === "student"}
          onClick={() => handleClick("student")}
        >
          Студенту
        </TabButton>
      </div>
      <section className="tab-content">
        <div className="container tab-content__inner">
        {activeTab === "" && description
          ?
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="tab-content__title">{title}</h2>
                <p className="tab-content__description">
                  {description}
                </p>
              </motion.div>
            </AnimatePresence>
          : 
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {children?.(activeTab)}
              </motion.div>
            </AnimatePresence>
        }
        </div>
      </section>
    </>
  );
};

export default TabSwitcher;
