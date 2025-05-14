import "./NewsIdPage.css"
import { useEffect, useState } from "react";
import { useFetching } from "../hooks/UseFetching";
import APIService from "../../API/APIService";
import Loader from "../Loader/Loader"
import { useParams } from "react-router-dom";
import HeroSection from "../HeroSection/HeroSection";
import FadeInSection from "../../FadeInSection";

const NewsIdPage = () => {
    const params = useParams()
    const [newsItem, setNewsItem] = useState({})
    const [fetchNewsItem, isLoading, error] = useFetching(async (id) => {
        const response = await APIService.getNewsById(id);
        setNewsItem(response.data)
    })
    useEffect(() => {
        fetchNewsItem(params.id)
    }, [])
    return (
        <>
            {isLoading
                ? <Loader />
                : 
                <>  
                    <FadeInSection>
                        <HeroSection title={newsItem.title} style={{ backgroundImage: `url("${newsItem.image_url}")`}} titleStyle={{maxWidth: "100%", textAlign: "center", fontSize: "48px"}} />
                    </FadeInSection>
                    
                    <FadeInSection>
                        <section className="news__content">
                            <div className="container news__content-inner">
                                <p className="news__content-text">{newsItem.content}</p>
                            </div>
                        </section>
                    </FadeInSection>
                </>
            }
        </>
    );
  }
  
export default NewsIdPage;