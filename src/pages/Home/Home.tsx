import React, { useEffect, useState } from 'react';

import { Slider } from '../../components/Slider/Slider';
import './Home.scss';
import { banners } from '../../data/banners-data';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { Categories } from '../../components/Categories/Categories';
import { usePhones } from '../../hooks/usePhones';
import { Product } from '../../types/Product';
import { client } from '../../client/httpClient';
import { Loader } from '../../components/Loader/Loader';

export const Home: React.FC = () => {
  const {
    setProducts,
    preparedHotPriceProducts,
    products,
  } = usePhones();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    client.get<Product[]>('products.json')
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, [setProducts]);

  if (isLoading) {
    return <Loader />;
  }

  // Вазончики найменшого розміру — як "новенькі моделі", але не айфони
  const miniPlants = products.filter(
    (product: Product) => product.category === 'plants' && product.size === 'mini'
  );

  return (
    <div className="home">
      <h1 className="home__title">Ласкаво просимо у "Квіти для тебе"!</h1>

      <section className="slider home__slider">
        <Slider banners={banners} />
      </section>

      <section className="section hot-prices home__hot-prices">
        <ProductsList
          products={preparedHotPriceProducts}
          title="Гарячі знижки"
        />
      </section>

      <section className="section categories">
        <Categories
          category="plants"
          title="Вазони"
        />
      </section>

      <section className="section brand-new home__brand-new">
        <ProductsList
          products={miniPlants}
          title="Маленькі новенькі 🌱"
        />
      </section>
    </div>
  );
};
