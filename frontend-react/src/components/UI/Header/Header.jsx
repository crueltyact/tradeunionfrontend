import './Header.css';
import { Link } from 'react-router-dom'
import Button from '../Button/Button.jsx'
import { useState } from "react"

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
      <header className="header">
        <div className="container header__inner">
          <Link style={{textDecoration: 'none'}} to="/">
          <div className="header__logo">
            <img src="/logo.svg" alt="Профком Политеха" />
          </div>
          </Link>
          <nav className={`header__nav ${menuOpen ? "open" : ""}`}>
            <Link to="/documents">Документы</Link>
            <Link to="/guide">Справочник</Link>
            <Link to="/projects">Проекты</Link>
            <Link to="/news">Новости</Link>
          </nav>
          <div className="header__buttons">
            <Button target="_blank" href="https://lk.eseur.ru/signup">
              Вступить в Профсоюз
            </Button>

            {/* Гамбургер */}
            <div
              className={`burger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span />
              <span />
              <span />
            </div>
          </div>


        </div>
      </header>

  );
};

export default Header;
