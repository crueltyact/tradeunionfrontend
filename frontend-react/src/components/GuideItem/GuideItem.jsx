import "./GuideItem.css"
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
const GuideItem = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <li className={`guide-theme ${isOpen ? "open" : ""}`}>
        <div className="guide-theme__icon-container">
            <span
            onClick={() => setIsOpen(!isOpen)}
            className={`icon ${isOpen ? "open" : ""}`}
            >
            <span />
            <span />
            </span>
        </div>
        <div onClick={() => setIsOpen(!isOpen)} className="guide-theme__block">
            <h4 style={{cursor: "pointer"}}>
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {props.theme.title}
                </ReactMarkdown>
            </h4>
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
                        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                            {props.theme.content}
                        </ReactMarkdown>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </li>
    );
};

export default GuideItem;