import NewsItem from "../NewsItem/NewsItem";

const NewsItemList = ({news}) => {
    if (!news.length) {
        <h2 style={{textAlign: 'center'}}>
            Новости не найдены!
        </h2>
    }
    return (
        <>
            {news.map((item) => (
                <NewsItem item={item} />
            ))}  
        </>
    );
  }
  
export default NewsItemList;