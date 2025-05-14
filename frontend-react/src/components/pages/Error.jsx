import "./Error.css"
import { Link } from "react-router-dom"
import FadeInSection from "../../FadeInSection";
import { useEffect } from "react";
const Error = () => {
    useEffect(() => (
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
    ),[])
    return (
        <FadeInSection>
            <section className="notfound">
                <div className="container notfound__inner">
                    <img src="/404.svg" alt="Ошибка 404" />
                    <h1 className="notfound__title">Страница не найдена</h1>
                    <p className="notfound__info">
                        К сожалению, такой страницы не существует.<br/>Вероятно, она была удалена, либо её здесь никогда не было.
                    </p>
                    <Link style={{textDecoration: 'none'}} to="/">
                        <button className="notfound__button">Вернуться на главную</button>
                    </Link>
                </div>
            </section>
        </FadeInSection>
    );
  }
  
export default Error;