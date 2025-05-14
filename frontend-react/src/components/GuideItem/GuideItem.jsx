import "./GuideItem.css"
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
const GuideItem = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <li key={props.theme.id} className={`guide-theme ${isOpen ? "open" : ""}`}>
        <span onClick={() => setIsOpen(!isOpen)} className={`icon ${isOpen ? "open" : ""}`}>
            <span />
            <span />
        </span>
        <div onClick={() => setIsOpen(!isOpen)} className="guide-theme__block">
            <h4 style={{cursor: "pointer"}}>{props.theme.title}</h4>
            {/* <div className={`guide-theme__content ${isOpen ? "open" : ""}`}>
                {props.theme.content}
            </div> */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        className="guide-theme__content"
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {props.theme.content}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </li>
    );
};

export default GuideItem;