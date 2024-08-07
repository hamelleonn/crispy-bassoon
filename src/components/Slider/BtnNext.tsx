import { useSwiper } from 'swiper/react';
import { Button } from '../Button/Button';

export const BtnNext = () => {
  const swiper = useSwiper();

  const handleButtonClick = () => {
    swiper.slideNext();
  };

  return (
    <Button
      className="slider-btn slider-btn-next"
      onClick={handleButtonClick}
    >
      <img
        className="slider-btn__arrow"
        src="img/icons/arrow-right.svg"
        alt="Arrow left"
      />
    </Button>
  );
};
