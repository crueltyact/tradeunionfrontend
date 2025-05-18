import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import APIService from "../../API/APIService";
import Button from "../UI/Button/Button";
import EnrichProfileModal from "../EnrichProfileModal/EnrichProfileModal";
import "./Auth.css"

const Auth = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [inviteToken, setInviteToken] = useState('')
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempToken, setTempToken] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (isLoginMode) {
            try {
                const response = await APIService.login(login, password);
                const token = response.data.token;

                if (!token) {
                    throw new Error('Токен не получен');
                }

                signIn(token);

                navigate('/documents');
            } catch (err) {
                console.error(err);
                setError('Ошибка входа. Проверьте логин и пароль.');
            }
        } else {
            try {
                const response = await APIService.register(login, password, inviteToken);
                setLogin('');
                setPassword('');
                setInviteToken('');
                if (response.status === 201 || response.status === 200) {
                    const loginResponse = await APIService.login(login, password);
                    const token = loginResponse.data.token;

                    if (!token) {
                        throw new Error('Токен не получен после регистрации');
                    }

                    if (response.data.next_step === true) {
                        localStorage.setItem("token", token);
                        setTempToken(token);
                        setIsModalOpen(true);
                        return;
                    }

                    signIn(token);
                    navigate('/documents');
                }
            } catch (err) {
                console.error(err);
                setError('Ошибка регистрации. Проверьте данные или токен.');
            }
        }
        
    };
    const handleProfileFilled = () => {
        signIn(tempToken);
        setIsModalOpen(false);
        navigate('/documents');
    };

    return (
        <>
        <section className="auth">
            <div className="container auth__inner">
                <h2 className="auth__title">Админ-панель</h2>
                    <div className="auth-toggle">
                        <button
                            type="button"
                            onClick={() => setIsLoginMode(true)}
                            className={isLoginMode ? 'active' : ''}
                        >
                            Войти
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsLoginMode(false)}
                            className={!isLoginMode ? 'active' : ''}
                            disabled={false}
                        >
                            Регистрация
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="auth-content__wrapper">

                            <div className="form-group">
                                <input
                                    type="text"
                                    name="login"
                                    placeholder="Логин"
                                    value={login}
                                    onChange={(e) => setLogin(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Пароль"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {!isLoginMode && 
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="token"
                                        placeholder="Инвайт-токен"
                                        value={inviteToken}
                                        onChange={(e) => setInviteToken(e.target.value)}
                                        required
                                    />
                                </div>
                            }
                            <div className="form-group errors">
                                {error && <p className="auth-error">{error}</p>}
                            </div>
                        </div>
                        <Button style={{width: "100%"}} type="submit">{isLoginMode ? 'Войти' : 'Зарегистрироваться'}</Button>
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

export default Auth;