import "./News.css"
import { useEffect, useState } from "react";
import { useFetching } from "../hooks/UseFetching";
import APIService from "../../API/APIService";
import Loader from "../Loader/Loader"
import NewsItem from "../NewsItem/NewsItem";
import Button from "../UI/Button/Button";
import NewsModal from "../NewsModal/NewsModal";
import EnrichProfileModal from "../EnrichProfileModal/EnrichProfileModal";
const News = () => {
    const [isEnrichModalOpen, setIsEnrichModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [news, setNews] = useState([])
    const [fetchNews, isLoading, error] = useFetching(async () => {
        const response = await APIService.getAllNews();
        setNews(response.data)
    })
    useEffect(() => {
        fetchNews()
    }, [])
    const handleDeleteNews = async (id) => {
        if (!window.confirm('Вы уверены, что хотите удалить новость?')) return;

        try {
            await APIService.deleteNews(id);
            setNews((prev) => prev.filter(n => n.id !== id));
        } catch (error) {
            if (error.status === 403) {
                alert("Заполните персональные данные")
                setIsEnrichModalOpen(true);
            } else {
                alert('Не удалось удалить новость');
            }
            console.error('Ошибка при удалении новости:', error);
        }
    };
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        fetchNews();
    };
    const handleProfileFilled = () => {
        setIsEnrichModalOpen(false);
    };
    return (
        <>
            <section className="news">
                <div className="container news__inner">
                    <h1 className="news__title">Новости</h1>
                    <Button onClick={openModal}>Добавить</Button>
                    {isLoading
                        ?
                        <Loader />
                        :
                        <div className="news-list">
                            {news && news.map((item) => (
                                <NewsItem key={item.id} item={item} onDelete={handleDeleteNews} />
                            ))}
                            {!news && <h2>Новости не найдены!</h2>}
                        </div>
                    }
                </div>
            </section>
            <NewsModal isOpen={isModalOpen} onClose={closeModal} />
            <EnrichProfileModal
                isOpen={isEnrichModalOpen}
                onClose={() => setIsEnrichModalOpen(false)}
                onProfileFilled={handleProfileFilled}
            />
        </>
    );
  }
  
export default News;