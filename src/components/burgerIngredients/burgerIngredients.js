import React from "react";
import { useSelector } from "react-redux";
import styles from './burgerIngredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import TypeIngredient from '../typeIngredient/typeIngredient';

function BurgerIngredients () {

  const ingredients = useSelector(state => state.burgerIngredients);

  const [current, setCurrent] = React.useState('bun');
  
  return(
    <section className={`pt-10 ${styles.ingredients}`}>
      {ingredients ? 
        (<>
          <h1 className={`text text_type_main-large mb-5 ${styles.title}`}>
            Соберите бургер
          </h1>
          <nav className={`mb-10 ${styles.tabs}`}>
            <a href="#buns" className={styles.links}>
              <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                Булки
              </Tab>
            </a>
            <a href="#sauces" className={styles.links}>
              <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                Соусы
              </Tab>
            </a>
            <a href="#mains" className={styles.links}>
              <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                Начинки
              </Tab>
            </a>
          </nav>
          <ul className={styles.listsIngredients}>
            <TypeIngredient type='bun' id='buns'>
              Булки
            </TypeIngredient>
            <TypeIngredient type='sauce' id='sauces'>
              Соусы
            </TypeIngredient>
            <TypeIngredient type='main' id='mains'>
              Начинки
            </TypeIngredient>
          </ul>
        </>) :
        (<h1 className={`text text_type_main-large mb-5 ${styles.title}`}>
           Загружаем ингредиенты...
        </h1>)
      }
    </section>
  )
}

export default BurgerIngredients;