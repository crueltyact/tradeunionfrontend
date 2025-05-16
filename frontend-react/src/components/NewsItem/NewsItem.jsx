import { useNavigate } from "react-router-dom";
import "./NewsItem.css"
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
const NewsItem = (props) => {
    const router = useNavigate()
    return (
        <>
            <div onClick={() => router(`/news/${props.item.id}`)} key={props.item.id} className="items__card" style={{ "--bg-img": `url("${props.item.image_url}")` }}>
                <div className="item__overlay">
                    <div className="item__meta">
                        <span className="item__title">
                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                {props.item.title}
                            </ReactMarkdown>
                        </span>
                        <span className="item__desc">
                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                {props.item.content}
                            </ReactMarkdown>
                        </span>
                    </div>
                    <span className="item__date">{new Date(props.item.created_at).toLocaleDateString("ru-RU")}</span>
                </div>
            </div>
        </>
    );
  }
  
export default NewsItem;