import { useSwiper } from 'swiper/react';
import { Button } from '../Button/Button';

export const BtnPrev = () => {
  const swiper = useSwiper();

  const handleButtonClick = () => {
    swiper.slidePrev();
  };

  return (
    <Button
      className="slider-btn slider-btn-prev"
      onClick={handleButtonClick}
    >
      <img
        className="slider-btn__arrow"
        src="img/icons/arrow-left.svg"
        alt="Arrow left"
      />
    </Button>
  );
};
