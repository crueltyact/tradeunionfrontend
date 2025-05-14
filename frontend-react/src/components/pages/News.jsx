import "./News.css"
import FadeInSection from "../../FadeInSection"
import HeroSection from "../HeroSection/HeroSection";
import { useEffect, useState } from "react";
import { useFetching } from "../hooks/UseFetching";
import APIService from "../../API/APIService";
import Loader from "../Loader/Loader"
import NewsItemList from "../NewsItemList/NewsItemList";

const News = () => {
    const [news, setNews] = useState([])
    const [fetchNews, isLoading, error] = useFetching(async () => {
        const response = await APIService.getAllNews();
        setNews(response.data)
    })
    useEffect(() => {
        fetchNews()
    }, [])
    return (
        <>
            <FadeInSection delay={0.2}>
                <HeroSection title="То, что нельзя пропустить" style={{ backgroundImage: 'url("/news_bg.jpg")' }} />
            </FadeInSection>

            <FadeInSection>
                <section className="news__content">
                    <div className="container news__content-inner">
                        {isLoading
                            ? <Loader />
                            :
                            <NewsItemList news={news} />                      
                        }
                    </div>
                </section>
            </FadeInSection>

        </>
    );
  }
  
export default News;