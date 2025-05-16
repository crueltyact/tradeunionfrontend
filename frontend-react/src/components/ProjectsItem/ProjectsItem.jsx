import "./ProjectsItem.css"
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react"
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
const ProjectsItem = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div onClick={() => setIsOpen(!isOpen)} className="project-card">
                <img style={{width: "100%", cursor: "pointer", height: "300px"}} src={props.item.image_url} alt={props.item.title} />
                <AnimatePresence initial={false}>
                    {isOpen && (
                    <motion.div
                        className="project-card__content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3 className="project-card__content-title">
                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                {props.item.title}
                            </ReactMarkdown>
                        </h3>
                        <p className="project-card__content-description">
                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                {props.item.description}
                            </ReactMarkdown>
                        </p>
                    </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
  }
  
export default ProjectsItem;