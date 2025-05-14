import "./News.css"
import { useEffect, useState } from "react";
import { useFetching } from "../hooks/UseFetching";
import APIService from "../../API/APIService";
import Loader from "../Loader/Loader"
import NewsItem from "../NewsItem/NewsItem";
import Button from "../UI/Button/Button";
import NewsModal from "../NewsModal/NewsModal";

const News = () => {
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
            console.error('Ошибка при удалении новости:', error);
            alert('Не удалось удалить новость');
        }
    };
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        fetchNews();
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
                            {news.map((item) => (
                                <NewsItem key={item.id} item={item} onDelete={handleDeleteNews} />
                            ))}
                        </div>
                    }
                </div>
            </section>
            <NewsModal isOpen={isModalOpen} onClose={closeModal} />
        </>
    );
  }
  
export default News;