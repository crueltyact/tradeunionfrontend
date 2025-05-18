import "./InviteUser.css"
import React, { useState } from "react";
import APIService from "../../API/APIService";
import Button from "../UI/Button/Button";
import EnrichProfileModal from "../EnrichProfileModal/EnrichProfileModal";

const InviteUser = () => {
    const [role, setRole] = useState('admin');
    const [inviteToken, setInviteToken] = useState('');
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setInviteToken('')
        try {
            const response = await APIService.generateToken(role);
            setInviteToken(response.data.invite_token)
            if (!response.data.invite_token) {
                throw new Error('Токен не получен');
            }


        } catch (err) {
            console.error(err);
            if (err.status === 403) {
                setError('Заполните ваши персональные данные');
                setIsModalOpen(true);
            } else {
                setError('Ошибка получения токена');
            }
        }
    };

    const handleProfileFilled = () => {
        setIsModalOpen(false);
        setError('');
    };

    return (
        <>
        <section className="invite">
            <div className="container invite__inner">
                <h2 className="invite__title">Генерация токена</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="invite-content__wrapper">

                            <div className="form-group">
                                <label htmlFor="role">Роль:</label>
                                <select value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="admin">Администратор</option>
                                    <option value="worker">Сотрудник</option>
                                </select>
                            </div>
                            <div className="form-group result">
                                {inviteToken && (
                                    <div className="invite-result">
                                        <span>Сгенерированный токен:</span>
                                        <code>{inviteToken}</code>
                                    </div>
                                )}
                                {error && <span className="error-message">{error}</span>}
                            </div>

                        </div>
                        <Button style={{width: "100%"}} type="submit">Получить токен</Button>
                    </form>
            </div>
        </section>
        <EnrichProfileModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onProfileFilled={handleProfileFilled}
        />
        </>
    );
};

export default InviteUser;