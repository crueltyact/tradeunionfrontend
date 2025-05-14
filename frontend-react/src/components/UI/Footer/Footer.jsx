import "./Footer.css"

const Footer = () => {
    return (
            <footer className="footer">
                <div className="container footer__inner">
                    <div className="footer__content">
                        <h3 className="footer__content-title">Контакты</h3>
                        <div className="footer__block">
                                <div className="footer__section">
                                <span className="footer__section-title">Секция по работе с обучающимися</span>
                                    <a href="mailto:profkom@mospolytech.ru">profkom@mospolytech.ru</a>
                                    <a href="tel:+74952230531">+7 495 223 05 31</a>
                                    <span className="footer__section-address">г. Москва, ул. Б. Семеновская, д. 38, ауд. В-202</span>
                            </div>
                            <div className="footer__section">
                                <span className="footer__section-title">Секция по работе с работниками</span>
                                <a href="mailto:profkom@mospolytech.ru">profkom@mospolytech.ru</a>
                                <a href="tel:+74952230523">+7 495 223 05 23 (доб. 12–10)</a>
                                <span className="footer__section-address">г. Москва, ул. Б. Семеновская, д. 38, ауд. В-203</span>
                            </div>
                            <div className="footer__social">
                                <a href="https://t.me/profkommospolytech" target="_blank" rel="noopener noreferrer"><img src="/icons/telegram.svg" alt="Telegram" /></a>
                                <a href="https://vk.com/profkommospolytech" target="_blank" rel="noopener noreferrer"><img src="/icons/vk.svg" alt="VK" /></a>
                            </div>
                        </div>
                    </div>
                    <div className="footer__bottom">
                    © 2017 — 2025 Профсоюзная организация Московского Политеха
                    </div>
                </div>
            </footer>
        
    );
  };
  
  export default Footer;