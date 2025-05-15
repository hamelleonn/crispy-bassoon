import React, { Dispatch, SetStateAction, useState } from 'react';

import { Product } from '../types/Product';
import { SortType } from '../types/SortType';
import { SortParamsType } from '../types/SortParamsType';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { CartProduct } from '../types/CartProduct';

type PhonesContextType = {
  products: Product[],
  setProducts: Dispatch<SetStateAction<Product[]>>,
  preparedHotPriceProducts: Product[],
  itemsPerPage: number,
  setItemsPerPage: Dispatch<SetStateAction<number>>,
  sortParams: SortParamsType[],
  perPageParams: number[],
  suggestedProducts: Product[],
  setSuggestedProducts: Dispatch<SetStateAction<Product[]>>,
  favoritesIds: string[],
  setFavoritesIds: (v: string[]) => void,
  cartProducts: CartProduct[],
  setCartProducts: (v: CartProduct[]) => void,
  handleOnLikeClick: (v: string) => void,
  handleOnCartAdd: (v: string) => void,
  removeCartItem: (v: string) => void,
  plusCartItem: (v: string) => void,
  minusCartItem: (v: string) => void,
  getProductCount: (v: string) => number,
  cartTotalCount: number,
  isMenuActive: boolean,
  setIsMenuActive: (v: boolean) => void;
};

export const PhonesContext = React.createContext<PhonesContextType>({
  products: [],
  setProducts: () => {},
  preparedHotPriceProducts: [],
  itemsPerPage: 0,
  setItemsPerPage: () => {},
  sortParams: [],
  perPageParams: [],
  suggestedProducts: [],
  setSuggestedProducts: () => {},
  favoritesIds: [],
  setFavoritesIds: () => {},
  cartProducts: [],
  setCartProducts: () => {},
  handleOnLikeClick: () => {},
  handleOnCartAdd: () => {},
  removeCartItem: () => {},
  plusCartItem: () => {},
  minusCartItem: () => {},
  getProductCount: () => 0,
  cartTotalCount: 0,
  isMenuActive: false,
  setIsMenuActive: () => {},
});

type Props = {
  children: React.ReactNode,
};

export const PhonesProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [favoritesIds, setFavoritesIds] = useLocalStorage<string[]>('favorites', []);
  const [cartProducts, setCartProducts] = useLocalStorage<CartProduct[]>('cart', []);
  const [isMenuActive, setIsMenuActive] = useState(false);

  const sortParams = [
    {
      type: SortType.Newest,
      value: 'size',
    },
    {
      type: SortType.Alphabetically,
      value: 'name',
    },
    {
      type: SortType.Cheapest,
      value: 'price',
    },
  ];

  const perPageParams = [4, 8, 16, 32];

  const preparedHotPriceProducts = products?.filter((product: Product) => (
    product.fullPrice - product.price >= 90
  )) || [];

  const handleOnLikeClick = (id: string) => {
    if (favoritesIds.includes(id)) {
      setFavoritesIds(favoritesIds.filter(favId => favId !== id));
    } else {
      setFavoritesIds([...favoritesIds, id]);
    }
  };

  const handleOnCartAdd = (itemId: string) => {
    const itemIndex = cartProducts.findIndex(({ id }) => id === itemId);

    setCartProducts(
      itemIndex === -1
        ? [...cartProducts, { id: itemId, count: 1 }]
        : cartProducts.filter(({ id }) => id !== itemId),
    );
  };

  const removeCartItem = (itemId: string) => {
    setCartProducts(cartProducts.filter(({ id }) => id !== itemId));
  };

  const plusCartItem = (itemId: string) => {
    setCartProducts(
      cartProducts.map(product => (
        product.id === itemId
          ? { id: product.id, count: product.count + 1 }
          : product
      )),
    );
  };

  const minusCartItem = (itemId: string) => {
    setCartProducts(
      cartProducts.map(product => (
        product.id === itemId
          ? { id: product.id, count: Math.max(1, product.count - 1) }
          : product
      )),
    );
  };

  const getProductCount = (itemId: string) => {
    return cartProducts.find(({ id }) => id === itemId)?.count || 0;
  };

  const cartTotalCount = cartProducts.reduce((acc, product) => acc + product.count, 0);

  return (
    <PhonesContext.Provider
      value={{
        products,
        setProducts,
        preparedHotPriceProducts,
        itemsPerPage,
        setItemsPerPage,
        sortParams,
        perPageParams,
        suggestedProducts,
        setSuggestedProducts,
        favoritesIds,
        setFavoritesIds,
        cartProducts,
        setCartProducts,
        handleOnCartAdd,
        handleOnLikeClick,
        removeCartItem,
        plusCartItem,
        minusCartItem,
        getProductCount,
        cartTotalCount,
        isMenuActive,
        setIsMenuActive,
      }}
    >
      {children}
    </PhonesContext.Provider>
  );
};
