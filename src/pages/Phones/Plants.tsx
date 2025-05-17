import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import './Plants.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { usePhones } from '../../hooks/usePhones';
import { Pagination } from '../../components/Pagination/Pagination';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { client } from '../../client/httpClient';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader/Loader';
import { SortType } from '../../types/SortType';
import { PhonesList } from '../../components/PhonesList/PhonesList';

export const Plants: React.FC = () => {
  const {
    sortParams,
    perPageParams,
    products,
    setProducts,
  } = usePhones();

  const [searchParams] = useSearchParams();

  const searchValue = searchParams.get('phoneSearchValue') || '';
  const itemsPerPage = +(searchParams.get('perPage') || 32);
  const sortType = searchParams.get('sortType') || '';

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const sizeOrder = {
    mini: 0,
    small: 1,
    medium: 2,
    large: 3,
  };

  const getSortedProducts = () => {
    const copy = [...products].filter(p => p.category === 'plants');

    switch (sortType as SortType) {
      case SortType.Alphabetically:
        return copy.sort((a, b) => a.name.localeCompare(b.name));
      case SortType.Cheapest:
        return copy.sort((a, b) => a.fullPrice - b.fullPrice);
      default:
        return copy.sort((a, b) =>
          (sizeOrder[a.size as keyof typeof sizeOrder] ?? 99) -
          (sizeOrder[b.size as keyof typeof sizeOrder] ?? 99)
        );
    }
  };

  const filteredProducts = getSortedProducts()
    .filter(product =>
      product.name.toLowerCase().includes(searchValue.toLowerCase())
    );

  const productsLength = filteredProducts.length;
  const lastProductIndex = currentPage * itemsPerPage;
  const firstProductIndex = lastProductIndex - itemsPerPage;
  const slicedProducts = filteredProducts.slice(firstProductIndex, lastProductIndex);

  useEffect(() => {
    if (!products.length) {
      setIsLoading(true);

      client.get<Product[]>('products.json')
        .then(setProducts)
        .finally(() => setIsLoading(false));
    }
  }, [products, setProducts]);

  return (
    <div className="plants">
      {isLoading && <Loader />}

      {!isLoading && (
        <>
          <div className="plants__breadcrumbs">
            <Breadcrumbs />
          </div>

          <h1 className="content__title">Вазони</h1>

          <p className="plants__count">
            {`${productsLength} рослин знайдено`}
          </p>

          <section className="section section__plants-pagination">
            {!filteredProducts.length && (
              <p className="content__not-fount">
                Нічого не знайдено 🌱
              </p>
            )}

            {!!filteredProducts.length && (
              <>
                <div className="pagination__sort-params">
                  <Dropdown
                    title="Сортування"
                    sortParams={sortParams}
                  />
                  <Dropdown
                    title="Кількість на сторінці"
                    perPageParams={perPageParams}
                    setCurrentPage={setCurrentPage}
                    isItemsPerPage
                    isSmall
                  />
                </div>

                <PhonesList products={slicedProducts} />

                <Pagination
                  productsLength={productsLength}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </>
            )}
          </section>
        </>
      )}
    </div>
  );
};
