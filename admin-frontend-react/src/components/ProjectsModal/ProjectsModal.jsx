import React, { useState, useRef } from "react";
import "./ProjectsModal.css"; 
import Button from "../UI/Button/Button"
import APIService from "../../API/APIService";
import MarkdownEditor from "../MarkdownEditor/MarkdownEditor";
import EnrichProfileModal from "../EnrichProfileModal/EnrichProfileModal";

const ProjectsModal = ({ isOpen, onClose }) => {
  const [isEnrichModalOpen, setIsEnrichModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('student');
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
        alert('Заполните все поля');
        return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('type', type);
    formData.append('intro', '');
    if (image) {
        formData.append('image', image);
    }

    try {
        await APIService.createProject(formData);

        setTitle('');
        setDescription('');
        setType('student');
        setImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        onClose();
    } catch (error) {
        if (error.status === 403) {
          alert("Заполните персональные данные")
          setIsEnrichModalOpen(true);
        } else {
          alert('Не удалось добавить проект');
        }
        console.error('Ошибка при создании проекта:', error);
    }
  };
  const handleClose = () => {
    onClose();
  };
  const handleProfileFilled = () => {
    setIsEnrichModalOpen(false);
  };

  const handleImageChange = (e) => {
      const file = e.target.files[0];

      if (!file) return;

      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
          alert('Можно загружать только изображения (JPG, PNG, GIF или WEBP)');
          if (fileInputRef.current) {
              fileInputRef.current.value = '';
          }
          return;
      }

      setImage(file);
  };

  return (
  <>
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2 style={{textAlign: "center", marginBottom: "10px"}}>Добавление проекта</h2>
        <form onSubmit={handleSubmit}>
          <div className="modal-content__wrapper">

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
              <label htmlFor="title">Заголовок:</label>
              <MarkdownEditor value={title} onChange={setTitle} />
            </div>

            <div className="form-group">
              <label htmlFor="description">Описание:</label>
              <MarkdownEditor value={description} onChange={setDescription} />
            </div>
            
            <div className="form-group">
              <label htmlFor="fileInput">Изображение:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                required
              />
            </div>

          </div>
          <Button type="submit">Загрузить</Button>
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

export default ProjectsModal;