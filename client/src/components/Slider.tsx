import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Link } from "react-router-dom";

const Slider: React.FC = () => {
  return (
    <Swiper
      className="w-auto rounded-lg sm:rounded-xl m-2 sm:m-3.5 md:m-6"
      modules={[Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
    >
      <SwiperSlide>
        <Link to={"/offer/1"}>
          <img src="/assets/slide1.webp" alt="Slide 1" className="w-full" />
        </Link>
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
