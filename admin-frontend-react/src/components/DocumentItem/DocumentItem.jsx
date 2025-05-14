import "./DocumentItem.css"
import Button from '../UI/Button/Button';
import APIService from '../../API/APIService';
const DocumentItem = (props) => {
    const handleDelete = async (e) => {
      e.preventDefault()
      if (window.confirm('Вы уверены, что хотите удалить этот документ?')) {
          try {
              await APIService.deleteDocument(props.document.ID);
              props.onDelete(props.document.ID);
          } catch (error) {
              console.error('Ошибка при удалении документа:', error);
              alert('Не удалось удалить документ');
          }
      }
    };
    return (
      <a className="document-item" href={props.document.URL} target="_blank" rel="noopener noreferrer">
        <h3 className="document-item__title">{props.document.Title}</h3>
        <Button onClick={handleDelete} style={{ padding: "8px 10px", backgroundColor: "red" }}>Удалить</Button>
      </a>
    );
  };
  
  export default DocumentItem;