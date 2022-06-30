import React from "react";
import data from '../../utils/data';
import styles from './burgerIngredients.module.css';
import PropTypes from 'prop-types';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import TypeIngredient from '../typeIngredient/typeIngredient';

export default function BurgerIngredients (props) {
  const [current, setCurrent] = React.useState('bun');
  return(
    <div className={`pt-10 ${styles.ingredients}`}>
      <h1 className={`text text_type_main-large mb-5 ${styles.title}`}>Соберите бургер</h1>
      <div className={`mb-10 ${styles.tabs}`}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>Булки</Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>Соусы</Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>Начинки</Tab>
      </div>
      <div className={styles.listsIngredients}>
        <TypeIngredient data={data} type='bun' order={props.order}>Булки</TypeIngredient>
        <TypeIngredient data={data} type='sauce' order={props.order}>Соусы</TypeIngredient>
        <TypeIngredient data={data} type='main' order={props.order}>Начинки</TypeIngredient>
      </div>
    </div>
  )
}

BurgerIngredients.propTypes = {
  order: PropTypes.shape({
    bun: PropTypes.string,
    others: PropTypes.arrayOf(PropTypes.string)
  })
}