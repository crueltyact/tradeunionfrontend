import "./GuideItem.css"
import APIService from "../../API/APIService";
import Button from "../UI/Button/Button";

const GuideItem = (props) => {
    const handleDelete = async (e) => {
          e.preventDefault()
          console.log('theme.id:', props.theme.id, typeof props.theme.id);
          if (window.confirm('Вы уверены, что хотите удалить эту тему?')) {
              try {
                  await APIService.deleteTheme(props.theme.id);
                  props.onDelete(props.theme.id);
              } catch (error) {
                  console.error('Ошибка при удалении темы:', error);
                  alert('Не удалось удалить тему');
              }
          }
    }; 
    return (
      <li className={"guide-theme"}>
        <div className="guide-theme__block">
            <div className="guide-theme__title-wrapper">
              {props.theme.title}
              <Button onClick={handleDelete} style={{ padding: "6px 8px", backgroundColor: "red" }}>Удалить</Button>
            </div>

            <div
                className="guide-theme__content"
            >
                {props.theme.content}
            </div>
        </div>
      </li>
    );
};

export default GuideItem;