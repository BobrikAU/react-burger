import React, { useState } from "react";
import styles from './appHeader.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import LinkHeader from '../linkHeader/linkHeader';
import PropTypes from 'prop-types';

function AppHeader({activePage}) {

  const [isLinkHover, setIsLinkHover] = useState({
                                                   'Конструктор': false,
                                                   'Лента заказов': false,
                                                   'Личный кабинет': false
                                                 });

  const toggleIsHover = (newState) => {
    setIsLinkHover({
      ...newState
    });
  }

  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <LinkHeader 
          textColor={activePage === 'constructor' ? 'active' : 'inactive'}
          icon={<BurgerIcon type={activePage === 'constructor' || isLinkHover['Конструктор'] ? "primary" : "secondary"}/>}
          state={isLinkHover}
          changeIsHover={toggleIsHover}
          >
          Конструктор
        </LinkHeader>
        <LinkHeader 
          textColor={activePage === 'orders' ? 'active' : 'inactive'}
          icon={<ListIcon type={activePage === 'orders' || isLinkHover['Лента заказов'] ? "primary" : "secondary"}/>} 
          state={isLinkHover}
          changeIsHover={toggleIsHover}
          >
          Лента заказов
        </LinkHeader>
      </nav>
      <Logo />
      <nav className={styles.accountLink}>
        <LinkHeader 
          textColor={activePage === 'account' ? 'active' : 'inactive'}
          icon={<ProfileIcon type={activePage === 'account' || isLinkHover['Личный кабинет'] ? "primary" : "secondary"}/>}
          state={isLinkHover}
          changeIsHover={toggleIsHover}
          >
          Личный кабинет
        </LinkHeader>
      </nav>
    </header>
  );
}

AppHeader.propTypes = {
  active: PropTypes.string,
}

export default AppHeader;


/*class AppHeader extends React.Component {

  constructor (props) {
    super (props);
  }

  state = {
    isHover: {
      'Конструктор': false,
      'Лента заказов': false,
      'Личный кабинет': false
    }
  }

  toggleIsHover = (newState) => {
    this.setState(() => ({
      isHover: {...newState}
    }))
  }

  render() {
    return (
      <header className={styles.header}>
        <nav className={styles.navigation}>
          <LinkHeader 
            textColor={this.props.active === 'constructor' ? 'active' : 'inactive'}
            icon={<BurgerIcon type={this.props.active === 'constructor' || this.state.isHover['Конструктор'] ? "primary" : "secondary"}/>}
            state={this.state.isHover}
            changeIsHover={this.toggleIsHover}
            >
            Конструктор
          </LinkHeader>
          <LinkHeader 
            textColor={this.props.active === 'orders' ? 'active' : 'inactive'}
            icon={<ListIcon type={this.props.active === 'orders' || this.state.isHover['Лента заказов'] ? "primary" : "secondary"}/>} 
            state={this.state.isHover}
            changeIsHover={this.toggleIsHover}
            >
            Лента заказов
          </LinkHeader>
        </nav>
        <Logo />
        <nav className={styles.accountLink}>
          <LinkHeader 
            textColor={this.props.active === 'account' ? 'active' : 'inactive'}
            icon={<ProfileIcon type={this.props.active === 'account' || this.state.isHover['Личный кабинет'] ? "primary" : "secondary"}/>}
            state={this.state.isHover}
            changeIsHover={this.toggleIsHover}
            >
            Личный кабинет
          </LinkHeader>
        </nav>
      </header>
    );
  }
}*/
