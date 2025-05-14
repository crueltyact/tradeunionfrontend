import "./ProjectsItem.css"
import Button from "../UI/Button/Button";
const ProjectsItem = (props) => {
    const handleDelete = () => {
        if (window.confirm('Вы уверены, что хотите удалить этот проект?')) {
            props.onDelete(props.item.id);
        }
    };
    return (
        <>
            <div key={props.item.id} className="items__card">
                <h3 className="item__title">{props.item.title}</h3>
                <Button onClick={handleDelete} style={{ marginLeft: '15px', padding: "8px 10px", backgroundColor: "red" }}>Удалить</Button>
            </div>
        </>
    );
  }
  
export default ProjectsItem;