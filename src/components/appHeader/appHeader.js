import React from "react";
import styles from './appHeader.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import LinkHeader from '../linkHeader/linkHeader';
import PropTypes from 'prop-types';

function AppHeader(props) {
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <LinkHeader 
          textColor={props.active === 'constructor' ? 'active' : 'inactive'}
          icon={<BurgerIcon type={props.active === 'constructor' ? "primary" : "secondary"}/>}
          >
          Конструктор
        </LinkHeader>
        <LinkHeader 
          textColor={props.active === 'orders' ? 'active' : 'inactive'}
          icon={<ListIcon type={props.active === 'orders' ? "primary" : "secondary"}/>}
          >
          Лента заказов
        </LinkHeader>
      </nav>
      <Logo />
      <nav className={styles.accountLink}>
        <LinkHeader 
          textColor={props.active === 'account' ? 'active' : 'inactive'}
          icon={<ProfileIcon type={props.active === 'account' ? "primary" : "secondary"}/>}
          >
          Личный кабинет
        </LinkHeader>
      </nav>
    </header>
  );
}

export default AppHeader;

AppHeader.propTypes = {
  active: PropTypes.string,
}