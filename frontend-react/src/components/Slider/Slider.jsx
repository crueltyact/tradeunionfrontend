import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import './Slider.css';
import { useEffect, useState } from 'react';
import APIService from '../../API/APIService';
import { useFetching } from '../hooks/UseFetching';
import Loader from "../Loader/Loader.jsx";
import NewsItem from '../NewsItem/NewsItem.jsx';

const Slider = () => {
    const [slides, setSlides] = useState([]);
    const [fetchSlides, isLoading, error] = useFetching(async () => {
        const response = await APIService.getAllNews();
        setSlides(response.data)
    })
    useEffect(() => {
        fetchSlides();
    }, [])
  return (
    <>
        {isLoading
            ? <Loader/>
            : 
            <Swiper 
                modules={[Autoplay]}
                breakpoints={{
                    0: {
                    slidesPerView: 1,
                    },
                    576: {
                    slidesPerView: 1.2,
                    },
                    768: {
                    slidesPerView: 2,
                    },
                    992: {
                    slidesPerView: 2,
                    },
                    1200: {
                    slidesPerView: 2,
                    },
                }}
                spaceBetween={0} 
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false, 
                    pauseOnMouseEnter: true,
                }}                
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id} className={`slide`}>
                        <NewsItem item={slide} />
                    </SwiperSlide>
                ))}
            </Swiper>
        }
    </>

    
  );
};

export default Slider;
