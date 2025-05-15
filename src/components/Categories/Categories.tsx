import React from 'react';
import { usePhones } from '../../hooks/usePhones';
import { Product } from '../../types/Product';
import { Loader } from '../Loader/Loader';
import { PhonesList } from '../PhonesList/PhonesList';

type Props = {
  category: string;
  title: string;
};

export const Categories: React.FC<Props> = ({ category, title }) => {
  const { products } = usePhones();

  const filteredProducts = products.filter(
    (product: Product) => product.category === category
  );

  return (
    <div className="category-page">
      <h1 className="content__title">{title}</h1>

      {!products.length && <Loader />}

      {!!filteredProducts.length && (
        <PhonesList products={filteredProducts} />
      )}

      {!filteredProducts.length && !!products.length && (
        <p className="content__not-found">
          Немає товарів у категорії "{title}"
        </p>
      )}
    </div>
  );
};
