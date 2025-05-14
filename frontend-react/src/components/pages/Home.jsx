import "./Home.css"
import Hero from "../Hero/Hero.jsx"
import Slider from "../Slider/Slider.jsx"
import FadeInSection from "../../FadeInSection.jsx";

const Home = () => {
    return (
      <>
        <FadeInSection>
          <Hero />
        </FadeInSection>

        <FadeInSection>
          <section className="about-grid">
            <div className="container about-grid__inner">
              <div className="about-grid__row">
                <div className="item about-grid__about">О нас</div>
                <div className="item about-grid__help">Помогаем</div>
                <div className="item about-grid__projects">
                  <span className="flip front">50+</span>
                  <span className="flip back">Проектов<br />каждый год</span>
                </div>
                <div className="item about-grid__fun">Развлекаем</div>
              </div>
              <div className="about-grid__row">
                <div className="item about-grid__choice">
                <span className="flip front">9216</span>
                <span className="flip back">Студентов и работников университета уже выбрали нас</span>
                </div>
                <div className="item about-grid__opportunities">Создаем<br/>возможности</div>
                <div className="item about-grid__payments">
                  <span className="flip front">300+</span>
                  <span className="flip back">Выплат<br />по заявлениям</span>
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection>
          <section className="news">
            <h2 className="news__title">Новости</h2>
            <Slider />
          </section>
        </FadeInSection>
        <FadeInSection>
          <section className="partners">
              <div className="container partners__inner">
                <h2 className="partners__title">Наши партнеры</h2>
                <div className="partners__content">
                  <div className="partners__content partner">
                    <a href="http://mospolytech.ru" target="_blank" rel="noopener noreferrer">
                      <img src="/polytech.png" alt="Московский Политех" className="partner__img polytech" />
                    </a>
                  </div>
                  <div className="partners__content partner">
                    <a href="http://sksrf.ru/" target="_blank" rel="noopener noreferrer">
                      <img src="/sks.png" alt="СКС Профсоюза" className="partner__img" />
                    </a>

                  </div>
                  <div className="partners__content partner">
                    <a href="http://mgoprof.ru" target="_blank" rel="noopener noreferrer">
                      <img src="/prof.png" alt="Профсоюз Москвы" className="partner__img" />
                    </a>
                  </div>
                </div>
              </div>
            </section>
        </FadeInSection>

      </>
    );
  }
  
export default Home;