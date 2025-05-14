import './Header.css';
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext';
import { useContext } from 'react';
import Button from '../Button/Button';

const Header = () => {
  const { isAuth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
      logout();
      navigate('/login');
  };
  return (
      <header className="header">
        <div className="container header__inner">
          <Link style={{textDecoration: 'none'}} to="/">
          <div className="header__logo">
            <img src="/logo.svg" alt="Профком Политеха" />
          </div>
          </Link>
          <nav className="header__nav">
            <Link to="/invite">Пользователи</Link>
            <Link to="/documents">Документы</Link>
            <Link to="/guide">Справочник</Link>
            <Link to="/projects">Проекты</Link>
            <Link to="/news">Новости</Link>
          </nav>
            {isAuth && <Button onClick={handleLogout}>Выйти</Button>}
        </div>
      </header>
  );
};

export default Header;
