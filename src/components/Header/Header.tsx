import { FC } from 'react';
import { useMediaQuery } from 'react-responsive';
import { NavLink, Link } from 'react-router-dom';
import cn from 'classnames';
import { Button } from '../Button/Button';
import { usePhones } from '../../hooks/usePhones';

import './Header.scss';

const getNavClass = ({ isActive }: { isActive: boolean }) => (cn('nav__link', {
  'nav__link--active': isActive,
}));

const getIconClass = ({ isActive }: { isActive: boolean }) => (cn(
  'header__icon',
  'icon',
  {
    'icon--active': isActive,
  },
));

export const Header: FC = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 640px)' });

  const {
    favoritesIds,
    cartProducts,
    cartTotalCount,
    isMenuActive,
    setIsMenuActive,
  } = usePhones();

  return (
    <header className="header">
      <div className="header__nav-wrapper">
        <Link to="/" className="header__logo logo">
          <img src="img/logo.svg" alt="logo" />
        </Link>

        {!isTabletOrMobile && (
          <>
            <nav className="nav header__nav">
              <NavLink to="/" className={getNavClass}>
                home
              </NavLink>

              <NavLink to="/phones" className={getNavClass}>
                phones
              </NavLink>

              <NavLink to="/tablets" className={getNavClass}>
                tablets
              </NavLink>

              <NavLink to="/accessories" className={getNavClass}>
                accessories
              </NavLink>
            </nav>
          </>
        )}
      </div>

      <div className="header__wrapper">
        {!isTabletOrMobile && (
          <>
            <NavLink
              to="/favorites"
              className={getIconClass}
            >
              <img
                className="icon__img"
                src="img/icons/heart.svg"
                alt="Icon Like"
              />

              {!!favoritesIds.length && (
                <div className="icon__count">
                  {favoritesIds.length}
                </div>
              )}
            </NavLink>

            <NavLink
              to="/cart"
              className={getIconClass}
            >
              <img
                className="icon__img"
                src="img/icons/cart.svg"
                alt="Icon Card"
              />

              {!!cartProducts.length && (
                <div className="icon__count">
                  {cartTotalCount}
                </div>
              )}
            </NavLink>
          </>
        )}

        {(isTabletOrMobile && !isMenuActive) && (
          <Button
            className="header__icon icon icon__menu"
            onClick={() => setIsMenuActive(true)}
          >
            <img
              className="icon__img"
              src="img/icons/menu.svg"
              alt="Icon Card"
            />
          </Button>
        )}

        {isMenuActive && (
          <Button
            className="header__icon icon icon__menu"
            onClick={() => setIsMenuActive(false)}
          >
            <img
              className="icon__img"
              src="img/icons/close.svg"
              alt="Icon Card"
            />
          </Button>
        )}
      </div>
    </header>
  );
};
