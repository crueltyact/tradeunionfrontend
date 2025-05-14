import './Header.css';
import { Link } from 'react-router-dom'
import Button from '../Button/Button.jsx'

const Header = () => {
  return (
      <header className="header">
        <div className="container header__inner">
          <Link style={{textDecoration: 'none'}} to="/">
          <div className="header__logo">
            <img src="/logo.svg" alt="Профком Политеха" />
          </div>
          </Link>
          <nav className="header__nav">
            <Link to="/documents">Документы</Link>
            <Link to="/guide">Справочник</Link>
            <Link to="/projects">Проекты</Link>
            <Link to="/news">Новости</Link>
          </nav>
          <Button target="_blank" href="https://lk.eseur.ru/signup">
            Вступить в Профсоюз
          </Button>
        </div>
      </header>

  );
};

export default Header;
