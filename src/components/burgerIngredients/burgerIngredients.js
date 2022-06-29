import React from "react";
import data from '../../utils/data';
import styles from './burgerIngredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import TypeIngredient from '../typeIngredient/typeIngredient';

export default function BurgerIngredients () {
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
        <TypeIngredient data={data} type='bun'>Булки</TypeIngredient>
        <TypeIngredient data={data} type='sauce'>Соусы</TypeIngredient>
        <TypeIngredient data={data} type='main'>Начинки</TypeIngredient>
      </div>
    </div>
  )
}