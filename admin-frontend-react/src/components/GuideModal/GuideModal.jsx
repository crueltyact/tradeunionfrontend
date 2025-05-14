import React, { useState } from "react";
import "./GuideModal.css"; 
import Button from "../UI/Button/Button"
import APIService from "../../API/APIService";

const GuideModal = ({ isOpen, onClose, guideId, mode = 'add-section' }) => {
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
              console.error('Ошибка при создании справочника:', error);
              alert('Не удалось добавить справочник');
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
                console.error("Ошибка при добавлении темы:", error);
                alert("Не удалось добавить тему");
            }
        } 

        setType('student');
        setLabel('');
        setTitle('');
        setContent('');
    };
  const handleClose = () => {
    setType('student');
    setLabel('');
    setTitle('');
    setContent('');
    onClose();
  };

  return (
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
                  <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} required />
                </div>
              </>
            }

            <div className="form-group">
              <label htmlFor="title">Тема:</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="content">Содержание:</label>
              <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
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
  );
};

export default GuideModal;