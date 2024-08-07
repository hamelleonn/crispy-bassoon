import React, {
} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { BtnNext } from './BtnNext';
import { BtnPrev } from './BtnPrev';
import { Banner } from '../../types/Banner';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Slider.scss';

type Props = {
  banners: Banner[]
};

export const Slider: React.FC<Props> = ({
  banners,
}) => {
  return (
    <div className="slider-wrapper">
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={50}
        slidesPerView={1}
        loop
        autoplay
        className="slider"
        pagination={{
          clickable: true,
          el: '.slider-dots',
          bulletClass: 'slider-dot',
          bulletActiveClass: 'slider-dot--active',
        }}
      >
        <BtnPrev />

        {banners.map(({ id, img }) => (
          <SwiperSlide className="slider-slide" key={id}>
            <img src={img} alt="Banner" />
          </SwiperSlide>
        ))}

        <BtnNext />
      </Swiper>

      <div className="slider-dots" />
    </div>
  );
};
