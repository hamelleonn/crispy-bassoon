import React from 'react';
import { v4 as getId } from 'uuid';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Product } from '../../types/Product';
import './ProductsList.scss';
import { ProductItem } from '../ProductItem/ProductItem';
import { Button } from '../Button/Button';

type Props = {
  products: Product[];
  title: string;
};

export const ProductsList: React.FC<Props> = ({
  products,
  title,
}) => {
  return (
    <div
      className="products__list"
      data-cy="productList"
    >
      <div className="products__list-top">
        <h1 className="section__title">
          {title}
        </h1>

        <div className="products__list-nav">
          <Button
            className="
              products__list-nav-btn
              products__list-nav-btn-prev
              button
              button__nav button--small
            "
          >
            <img src="img/icons/arrow-left.svg" alt="Arrow left" />
          </Button>

          <Button
            className="
              products__list-nav-btn
              products__list-nav-btn-next
              button
              button__nav
              button--small
            "
          >
            <img src="img/icons/arrow-right.svg" alt="Arrow right" />
          </Button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        breakpoints={{
          319: {
            slidesPerView: 1.2,
          },
          400: {
            slidesPerView: 1.4,
          },
          500: {
            slidesPerView: 1.7,
          },
          600: {
            slidesPerView: 2.3,
          },
          650: {
            slidesPerView: 2.5,
          },
          700: {
            slidesPerView: 2.8,
          },
          830: {
            slidesPerView: 3.4,
          },
          930: {
            slidesPerView: 3.8,
          },
          1199: {
            slidesPerView: 4,
          },
        }}
        spaceBetween={13}
        navigation={{
          prevEl: '.products__list-nav-btn-prev',
          nextEl: '.products__list-nav-btn-next',
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductItem
              key={getId()}
              product={product}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
