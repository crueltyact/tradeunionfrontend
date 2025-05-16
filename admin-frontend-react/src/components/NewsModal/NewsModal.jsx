import React, { useState, useRef } from "react";
import "./NewsModal.css"; 
import Button from "../UI/Button/Button"
import APIService from "../../API/APIService";
import MarkdownEditor from "../MarkdownEditor/MarkdownEditor";

const NewsModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
        alert('Заполните все поля');
        return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
        formData.append('image', image);
    }

    try {
        await APIService.createNews(formData);

        setTitle('');
        setContent('');
        setImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        onClose();
    } catch (error) {
        console.error('Ошибка при создании новости:', error);
        alert('Не удалось добавить новость');
    }
  };
  const handleClose = () => {
    onClose();
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
        alert('Пожалуйста, выберите изображение (JPG, PNG, GIF или WEBP)');
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
        <h2 style={{textAlign: "center", marginBottom: "10px"}}>Добавление новости</h2>
        <form onSubmit={handleSubmit}>
          <div className="modal-content__wrapper">

            <div className="form-group">
              <label htmlFor="title">Заголовок:</label>
              <MarkdownEditor value={title} onChange={setTitle} onSubmit={handleSubmit} />
              {/* <AutoResizingTextarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                minRows={2}
                maxRows={10}
              /> */}
            </div>

            <div className="form-group">
              <label htmlFor="content">Содержание:</label>
              <MarkdownEditor value={content} onChange={setContent} />
              {/* <AutoResizingTextarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                minRows={3}
                maxRows={10}
              /> */}
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

export default NewsModal;