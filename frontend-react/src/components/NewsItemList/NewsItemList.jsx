import NewsItem from "../NewsItem/NewsItem";

const NewsItemList = ({news}) => {
    if (!news || news.length === 0) return <h2>Новости не найдены</h2>
    return (
        <>
            {news.map((item) => (
                <NewsItem key={item.id} item={item} />
            ))}  
        </>
    );
  }
  
export default NewsItemList;