import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { Header } from '../Header/Header';

import './PhoneMenu.scss';
import { usePhones } from '../../hooks/usePhones';

const getNavClass = ({ isActive }: { isActive: boolean }) => (cn('nav__link',
  'phone-menu__nav-link',
  {
    'nav__link--active': isActive,
  }));

const getIconClass = ({ isActive }: { isActive: boolean }) => (cn(
  'icon',
  'phone-menu__icon',
  {
    'icon--active': isActive,
  },
));

export const PhoneMenu = () => {
  const {
    favoritesIds,
    cartProducts,
    cartTotalCount,
    setIsMenuActive,
  } = usePhones();

  const handleMenuClose = () => {
    setIsMenuActive(false);
  };

  return (
    <div className="phone-menu">
      <Header />

      <nav className="phone-menu__nav-wrapper">
        <div className="nav phone-menu__nav">
          <NavLink
            onClick={handleMenuClose}
            to="/"
            className={getNavClass}
          >
            home
          </NavLink>

          <NavLink
            onClick={handleMenuClose}
            to="/phones"
            className={getNavClass}
          >
            phones
          </NavLink>

          <NavLink
            onClick={handleMenuClose}
            to="/tablets"
            className={getNavClass}
          >
            tablets
          </NavLink>

          <NavLink
            onClick={handleMenuClose}
            to="/accessories"
            className={getNavClass}
          >
            accessories
          </NavLink>
        </div>
      </nav>

      <div className="phone-menu__buttons">
        <NavLink
          onClick={handleMenuClose}
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
          onClick={handleMenuClose}
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
      </div>
    </div>
  );
};
