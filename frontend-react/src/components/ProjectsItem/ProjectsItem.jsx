import "./ProjectsItem.css"
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react"
const ProjectsItem = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div onClick={() => setIsOpen(!isOpen)} key={props.item.id} className="project-card">
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
                        <h3 className="project-card__content-title">{props.item.title}</h3>
                        <p className="project-card__content-description">{props.item.description}</p>
                    </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
  }
  
export default ProjectsItem;