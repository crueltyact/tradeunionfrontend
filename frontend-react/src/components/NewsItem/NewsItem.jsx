import { useNavigate } from "react-router-dom";
import "./NewsItem.css"
const NewsItem = (props) => {
    const router = useNavigate()
    return (
        <>
            <div onClick={() => router(`/news/${props.item.id}`)} key={props.item.id} className="items__card" style={{ "--bg-img": `url("${props.item.image_url}")` }}>
                <div className="item__overlay">
                    <div className="item__meta">
                        <span className="item__title">{props.item.title}</span>
                        <span className="item__desc">{props.item.content}</span>
                    </div>
                    <span className="item__date">{new Date(props.item.created_at).toLocaleDateString("ru-RU")}</span>
                </div>
            </div>
        </>
    );
  }
  
export default NewsItem;