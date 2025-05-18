import "./DocumentItem.css"
import Button from '../UI/Button/Button';
import APIService from '../../API/APIService';
import { useState } from 'react';
import EnrichProfileModal from "../EnrichProfileModal/EnrichProfileModal";
const DocumentItem = (props) => {
    const [isEnrichModalOpen, setIsEnrichModalOpen] = useState(false);
    const handleDelete = async (e) => {
      e.preventDefault()
      if (window.confirm('Вы уверены, что хотите удалить этот документ?')) {
          try {
              await APIService.deleteDocument(props.document.ID);
              props.onDelete(props.document.ID);
          } catch (error) {
              if (error.status === 403) {
                  alert("Заполните персональные данные")
                  setIsEnrichModalOpen(true);
              } else {
                  alert('Не удалось удалить документ');
              }
              console.error('Ошибка при удалении документа:', error);
          }
      }
    };
    const handleProfileFilled = () => {
        setIsEnrichModalOpen(false);
    };
    return (
      <>
      <a className="document-item" href={props.document.URL} target="_blank" rel="noopener noreferrer">
        <h3 className="document-item__title">{props.document.Title}</h3>
        <Button onClick={handleDelete} style={{ padding: "8px 10px", backgroundColor: "red" }}>Удалить</Button>
      </a>
      <EnrichProfileModal
        isOpen={isEnrichModalOpen}
        onClose={() => setIsEnrichModalOpen(false)}
        onProfileFilled={handleProfileFilled}
      />
      </>
    );
  };
  
  export default DocumentItem;