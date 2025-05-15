import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './ProductDetailsPage.scss';
import { client } from '../../client/httpClient';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader/Loader';
import { ProductPageHeader } from '../../components/ProductPageHeader/ProductPageHeader';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { usePhones } from '../../hooks/usePhones';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams();

  const {
    products,
    setProducts,
  } = usePhones();

  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getSuggestedProducts = (productsList: Product[]): Product[] => {
    if (!currentProduct) return [];

    return productsList.filter(
      item =>
        item.category === 'plants' &&
        item.id !== currentProduct.id &&
        item.color === currentProduct.color
    ).slice(0, 4);
  };

  useEffect(() => {
    setIsLoading(true);

    client.get<Product[]>('products.json')
      .then(data => {
        setProducts(data);

        const product = data.find(p => p.itemId === productId);
        setCurrentProduct(product || null);
      })
      .finally(() => setIsLoading(false));
  }, [productId, setProducts]);

  if (isLoading || !currentProduct) {
    return <Loader />;
  }

  const {
    name,
    price: priceDiscount,
    fullPrice: priceRegular,
    color,
    image,
    size,
  } = currentProduct;
  

  return (
    <section className="product">
      <ProductPageHeader productName={name} />

      <div className="product__content">
        <div className="product__photo">
          <img src={image} alt={name} className="product__image" />
        </div>

        <div className="product__info">
          <div className="product__prices">
            <span className="product__price-discount">${priceDiscount}</span>
            {priceDiscount !== priceRegular && (
              <span className="product__price-regular">${priceRegular}</span>
            )}
          </div>

          <p className="product__short-info">
            <strong>Колір:</strong> {color}<br />
            <strong>Розмір</strong> {size}
          </p>
        </div>

        <ProductsList
          products={getSuggestedProducts(products)}
          title="Схожі вазони"
        />
      </div>
    </section>
  );
};
