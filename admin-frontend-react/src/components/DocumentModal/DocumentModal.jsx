import React, { useState, useRef } from "react";
import "./DocumentModal.css"; // Стили для модалки
import Button from "../UI/Button/Button"
import APIService from "../../API/APIService";

const DocumentModal = ({ isOpen, onClose }) => {
    const [documentType, setDocumentType] = useState("student"); // Выбранная роль
    const [selectedFiles, setSelectedFiles] = useState([]); // Выбранный файл
    const fileInputRef = useRef(null);
    const handleFileChange = (e) => {
      const files = Array.from(e.target.files);
      const allowedTypes = ['application/pdf'];
      const allowedExtensions = ['.pdf'];
      const validFiles = [];
      const invalidFiles = [];

      files.forEach(file => {
          const fileName = file.name.toLowerCase();
          const fileExtension = fileName.slice(fileName.lastIndexOf('.'));

          const isValidType = allowedTypes.includes(file.type);
          const isValidExt = allowedExtensions.includes(fileExtension);

          if (isValidType || isValidExt) {
              validFiles.push(file);
          } else {
              invalidFiles.push(file.name);
          }
      });

      setSelectedFiles(validFiles);

      if (invalidFiles.length > 0) {
          alert(`Следующие файлы не являются PDF и будут проигнорированы: ${invalidFiles.join(', ')}`);
      }   
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFiles.length) {
            alert('Выберите хотя бы один файл');
            return;
        }

        try {
            await APIService.uploadDocuments(selectedFiles, documentType);

            setSelectedFiles([]);
            onClose();
        } catch (error) {
            alert('Не удалось загрузить документы');
            console.error('Ошибка загрузки:', error);
        } finally {
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

  const handleClose = () => {
    // setSelectedFiles([])
    // if (fileInputRef.current) {
    //     fileInputRef.current.value = '';
    // }
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2 style={{textAlign: "center", marginBottom: "10px"}}>Добавление документа</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="role">Тип:</label>
            <select
                value={documentType} 
                onChange={(e) => setDocumentType(e.target.value)}
                className="select-input"
            >
              <option value="student">Обучающемуся</option>
              <option value="worker">Сотруднику</option>
            </select>
          </div>

          {/* Выбор файла */}
          <div className="form-group file-upload">
            <label htmlFor="fileInput">Выбрать документы</label>
            <div className="file-input__wrapper">
                <input
                type="file"
                accept=".pdf"
                ref={fileInputRef}
                multiple
                onChange={handleFileChange}
                className="file-input"
                required
                />
                <span className="file-status">
                    {selectedFiles.length > 0 ? `Выбрано файлов: ${selectedFiles.length}` : 'Файл не выбран'}
                </span>
            </div>
          </div>
            <Button type="submit">Загрузить</Button>

        </form>

        {/* Кнопка закрытия */}
        <button className="close-button" onClick={handleClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default DocumentModal;