import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper";

function CarouselUpdateComponent(props: any) {
    const slides = [
        {
            title: "0",
            data: "00/00/0000",
            time: "00:00:00"
        },
        {
            title: "0",
            data: "00/00/0000",
            time: "00:00:00"
        },
        {
            title: "0",
            data: "00/00/0000",
            time: "00:00:00"
        },
        {
            title: "0",
            data: "00/00/0000",
            time: "00:00:00"
        },
        {
            title: "0",
            user: "00/00/0000",
            time: "00:00:00"
        },
        {
            title: "0",
            data: "00/00/0000",
            time: "00:00:00"
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
                            <strong>{props.sensor_title}</strong>
                            {slide.title}
                        </span>
                        <span>
                            <strong>Data:</strong>
                            {slide.data}
                        </span>
                        <span>
                            <strong>Horário:</strong>
                            {slide.time}
                        </span>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}

export default CarouselUpdateComponent;