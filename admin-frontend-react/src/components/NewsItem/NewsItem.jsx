import "./NewsItem.css"
import Button from "../UI/Button/Button";
const NewsItem = (props) => {
    const handleDelete = () => {
        if (window.confirm('Вы уверены, что хотите удалить новость?')) {
            props.onDelete(props.item.id);
        }
    };
    return (
        <>
            <div key={props.item.id} className="items__card">
                <h3 className="item__title">{props.item.title}</h3>
                <Button onClick={handleDelete} style={{ padding: "8px 10px", backgroundColor: "red" }}>Удалить</Button>
            </div>
        </>
    );
  }
  
export default NewsItem;