import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper";

function CarouselComponent(props: any) {
    const slides = [
        {
            id: 1,
            user: "User",
            model: "XYZ"
        },
        {
            id: 2,
            user: "User",
            model: "XYZ"
        },
        {
            id: 3,
            user: "User",
            model: "XYZ"
        },
        {
            id: 4,
            user: "User",
            model: "XYZ"
        },
        {
            id: 5,
            user: "User",
            model: "XYZ"
        },
        {
            id: 6,
            user: "User",
            model: "XYZ"
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
                    <SwiperSlide key={slide.id}>
                        <span>
                            <strong>ID:</strong>
                            {slide.id}
                        </span>
                        <span>
                            <strong>Usuário:</strong>
                            {slide.user}
                        </span>
                        <span>
                            <strong>Modelo:</strong>
                            {slide.model}
                        </span>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}

export default CarouselComponent;