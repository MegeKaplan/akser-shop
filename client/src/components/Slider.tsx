import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const Slider: React.FC = () => {
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
    >
      <SwiperSlide>
        <img src="/assets/slide1.webp" alt="Slide 1" className="w-full" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/assets/slide2.webp" alt="Slide 2" className="w-full" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/assets/slide3.webp" alt="Slide 3" className="w-full" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/assets/slide4.webp" alt="Slide 4" className="w-full" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/assets/slide5.webp" alt="Slide 5" className="w-full" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/assets/slide6.webp" alt="Slide 6" className="w-full" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/assets/slide7.webp" alt="Slide 7" className="w-full" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/assets/slide8.webp" alt="Slide 8" className="w-full" />
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
