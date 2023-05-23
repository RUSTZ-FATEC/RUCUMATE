import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper";

function CarouselNotificationComponent(props: any) {
    const slides = [
        {
            data: "00/00/0000",
            time: "00:00:00",
            description: "Lorem Ipsum"
        },
        {
            data: "00/00/0000",
            time: "00:00:00",
            description: "Lorem Ipsum"
        },
        {
            data: "00/00/00",
            time: "00:00:00",
            description: "Lorem Ipsum"
        },
        {
            data: "00/00/0000",
            time: "00:00:00",
            description: "Lorem Ipsum"
        },
        {
            data: "00/00/0000",
            time: "00:00:00",
            description: "Lorem Ipsum"
        },
        {
            data: "00/00/0000",
            time: "00:00:00",
            description: "Lorem Ipsum"
        }
    ];

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
                {slides.map((slide) => (
                    <SwiperSlide>
                        <span>
                            <strong>Data:</strong>
                            {slide.data}
                        </span>
                        <span>
                            <strong>Horário:</strong>
                            {slide.time}
                        </span>
                        <span>
                            <strong>Descrição:</strong>
                            {slide.description}
                        </span>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}

export default CarouselNotificationComponent;