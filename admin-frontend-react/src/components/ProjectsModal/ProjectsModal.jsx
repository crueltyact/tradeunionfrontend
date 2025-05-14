import React, { useState, useRef } from "react";
import "./ProjectsModal.css"; 
import Button from "../UI/Button/Button"
import APIService from "../../API/APIService";

const ProjectsModal = ({ isOpen, onClose }) => {
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
        console.error('Ошибка при создании проекта:', error);
        alert('Не удалось добавить проект');
    }
  };
  const handleClose = () => {
    setTitle('');
    setDescription('');
    setType('student');
    setImage(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
    onClose();
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
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div className="form-group">
              <label htmlFor="description">Описание:</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
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
  );
};

export default ProjectsModal;