import React, { useState } from "react";
import "./EnrichProfileModal.css"; 
import Button from "../UI/Button/Button"
import APIService from "../../API/APIService";
import AuthContext from "../context/AuthContext";

const EnrichProfileModal = ({ isOpen, onClose, onProfileFilled }) => {
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [patronymic, setPatronymic] = useState("");
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("")

      if (!firstName || !secondName || !patronymic) {
          alert('Заполните все поля');
          return;
      }

      try {
          const formData = new FormData();
          formData.append("first_name", firstName);
          formData.append("second_name", secondName);
          formData.append("patronymic", patronymic);
          await APIService.enrichProfile(formData);
          onProfileFilled();
      } catch (err) {
          console.error("Ошибка обогащения профиля:", err);
          setError("Не удалось сохранить данные. Попробуйте ещё раз.");
        }
    };
    const handleClose = () => {
      setFirstName("");
      setSecondName("");
      setPatronymic("");
      setError("");
      onClose();
    };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2 style={{textAlign: "center", marginBottom: "10px"}}>Заполните ваши данные</h2>
        <form onSubmit={handleSubmit}>
          <div className="modal-content__wrapper">

            <div className="form-group">
              <input placeholder="Имя" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </div>

            <div className="form-group">
              <input placeholder="Фамилия" type="text" value={secondName} onChange={(e) => setSecondName(e.target.value)} required />
            </div>

            <div className="form-group">
              <input placeholder="Отчество" type="text" value={patronymic} onChange={(e) => setPatronymic(e.target.value)} required />
            </div>

            {error && <p className="error">{error}</p>}
          </div>
          <Button type="submit">Заполнить данные</Button>
        </form>

        <button className="close-button" onClick={handleClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default EnrichProfileModal;