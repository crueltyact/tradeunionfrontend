import React, { useState } from "react";
import "./GuideModal.css"; 
import Button from "../UI/Button/Button"
import APIService from "../../API/APIService";
import MarkdownEditor from "../MarkdownEditor/MarkdownEditor";
import EnrichProfileModal from "../EnrichProfileModal/EnrichProfileModal";

const GuideModal = ({ isOpen, onClose, guideId, mode = 'add-section' }) => {
  const [isEnrichModalOpen, setIsEnrichModalOpen] = useState(false);
  const [type, setType] = useState('student');
  const [label, setLabel] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
        e.preventDefault();

        if (mode === 'add-section') {
          if (!label || !title || !content) {
            alert('Заполните все поля');
            return;
          }
          try {
              const newGuide = {
                  label,
                  themes: [{
                      title,
                      content
                  }],
                  type
              };

              await APIService.createGuide(newGuide);

              onClose();
          } catch (error) {
              if (error.status === 403) {
                alert("Заполните персональные данные")
                setIsEnrichModalOpen(true);
              } else {
                alert('Не удалось добавить справочник');
              }
              console.error('Ошибка при создании справочника:', error);
          }
        } else if (mode === "add-theme" && guideId) {
            if (!title || !content) {
                alert("Заполните тему и содержание");
                return;
            }

            try {
                await APIService.addThemeToGuide(guideId, title, content);
                onClose();
            } catch (error) {
                if (error.status === 403) {
                  alert("Заполните персональные данные")
                  setIsEnrichModalOpen(true);
                } else {
                  alert('Не удалось добавить тему');
                }
                console.error("Ошибка при добавлении темы:", error);
            }
        } 

        setType('student');
        setLabel('');
        setTitle('');
        setContent('');
    };
  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  const handleProfileFilled = () => {
    setIsEnrichModalOpen(true);
  };

  return (
    <>
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2 style={{textAlign: "center", marginBottom: "10px"}}>
          {mode === "add-section" ? "Добавление справочника" : "Добавление темы"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="modal-content__wrapper">
            {mode === "add-section" &&
              <>
                <div className="form-group">
                  <label htmlFor="role">Тип:</label>
                    <select
                        value={type} 
                        onChange={(e) => setType(e.target.value)}
                        className="select-input"
                        required
                    >
                      <option value="student">Обучающемуся</option>
                      <option value="worker">Сотруднику</option>
                    </select>
                 </div>

                <div className="form-group">
                  <label htmlFor="label">Заголовок:</label>
                  <MarkdownEditor value={label} onChange={setLabel} />
                </div>
              </>
            }

            <div className="form-group">
              <label htmlFor="title">Тема:</label>
              <MarkdownEditor value={title} onChange={setTitle} />
            </div>
            <div className="form-group">
              <label htmlFor="content">Содержание:</label>
              <MarkdownEditor value={content} onChange={setContent} />
            </div>

          </div>
          <Button type="submit">
            {mode === "add-section" ? "Создать раздел" : "Добавить тему"}
          </Button>
        </form>

        <button className="close-button" onClick={handleClose}>
          ✕
        </button>
      </div>
    </div>
    <EnrichProfileModal 
      isOpen={isEnrichModalOpen} 
      onClose={() => setIsEnrichModalOpen(false)} 
      onProfileFilled={handleProfileFilled} 
    />
    </>
  );
};

export default GuideModal;