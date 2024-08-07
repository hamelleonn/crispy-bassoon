import React, { } from 'react';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import cn from 'classnames';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { PhoneMenu } from './components/PhoneMenu';
import { usePhones } from './hooks/usePhones';

import './App.scss';

const App: React.FC = () => {
  const { isMenuActive, setIsMenuActive } = usePhones();

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 640px)' });

  if (isMenuActive && !isTabletOrMobile) {
    setIsMenuActive(false);
  }

  return (
    <div
      className={cn('App', {
        'App__with-menu': isMenuActive,
      })}
    >
      <div
        className={cn('App__phone-menu', {
          'App__phone-menu--active': isMenuActive,
        })}
      >
        <PhoneMenu />
      </div>

      <Header />

      <main className="content container">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default App;
