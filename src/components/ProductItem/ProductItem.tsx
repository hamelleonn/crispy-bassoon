import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import './ProductItem.scss';
import { Product } from '../../types/Product';
import { Button } from '../Button/Button';
import { usePhones } from '../../hooks/usePhones';

type Props = {
  product: Product;
};

export const ProductItem: React.FC<Props> = ({ product }) => {
  const {
    favoritesIds,
    cartProducts,
    handleOnCartAdd,
    handleOnLikeClick,
  } = usePhones();

  const {
    itemId,
    image,
    phoneId,
    name,
    price,
    fullPrice,
    size,
    color,
  } = product;

  const isCartItem = cartProducts.find(({ id }) => id === itemId);

  return (
    <div className="product-item">
      <Link to={`/phones/${phoneId}`}>
        <div className="product-item__img">
          <img src={image} alt={name} />
        </div>
      </Link>

      <Link
        to={`/phones/${phoneId}`}
        className="product-item__title body-text"
      >
        {name}
      </Link>

      <div className="product-item__price-section">
        <h2 className="price">
          {`$${price}`}
        </h2>

        <p className="price-discount">
          {`$${fullPrice}`}
        </p>
      </div>

      <hr className="product-item__line" />

      <div className="product-item__descr">
        {size && (
          <div className="product-item__descr-wrapper">
            <p className="product-item__descr-name">Висота</p>
            <p className="product-item__descr-value">
              {size === 'mini' ? 'до 15 см'
                : size === 'small' ? '15–30 см'
                : size === 'medium' ? '30–60 см'
                : size === 'large' ? '60+ см'
                : 'невідомо'}
            </p>
          </div>
        )}

        {color && (
          <div className="product-item__descr-wrapper">
            <p className="product-item__descr-name">Колір листя</p>
            <p className="product-item__descr-value">{color}</p>
          </div>
        )}

        {size && (
          <div className="product-item__descr-wrapper">
            <p className="product-item__descr-name">Догляд</p>
            <p className="product-item__descr-value">
              {(size === 'mini' || size === 'small')
                ? 'Легкий як життя до сесії'
                : 'Потрібен полив і любов'}
            </p>
          </div>
        )}
      </div>

      <div className="product-item__btns">
        <Button
          className={cn(
            'button',
            'button__primary',
            'button--large',
            {
              button__selected: isCartItem,
            },
          )}
          onClick={() => handleOnCartAdd(itemId)}
        >
          {isCartItem ? 'Added to cart' : 'Add to cart'}
        </Button>

        <Button
          className="button button__like button--medium"
          onClick={() => handleOnLikeClick(itemId)}
        >
          {favoritesIds?.includes(itemId) ? (
            <img src="img/icons/heart-active.svg" alt="Heart" />
          ) : (
            <img src="img/icons/heart.svg" alt="Heart" />
          )}
        </Button>
      </div>
    </div>
  );
};
