import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { carouselModel } from "./carousel.model";

function CarouselComponent(props: any): any {
    const [slides, setSlides] = useState([]);
    const user_id = window.localStorage.getItem("user_id");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://rucumate.herokuapp.com/esp/data/id/user/${user_id}`);
                const data = await response.json();
                setSlides(data);
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        fetchData();
    }, [user_id]);

    const getModelInfo = (slide: carouselModel) => {
        if (props.title === "Informações de temperatura dos sensores:") {
            return slide.temperature;
        } else if (props.title === "Informações de umidade dos sensores:") {
            return slide.humidity;
        } else {
            return "Modelo não especificado";
        }
    };

    return (
        <>
            <h1 className="title-carousel">{props.title}</h1>
            <Swiper
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
                breakpoints={{
                    768: {
                        spaceBetween: 10,
                        slidesPerView: 1
                    },
                    1024: {
                        spaceBetween: 10,
                        slidesPerView: 3
                    }
                }}
            >
                {slides.map((slide: carouselModel) => (
                    <SwiperSlide key={slide.id}>
                        <span>
                            <strong>ID:</strong>
                            {slide.id}
                        </span>
                        <span>
                            <strong>Usuário:</strong>
                            {slide.user_id}
                        </span>
                        <span>
                            <strong>Modelo:</strong>
                            {getModelInfo(slide)}
                        </span>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}

export default CarouselComponent;
