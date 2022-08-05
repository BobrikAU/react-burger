import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from './ingridient.module.css';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import {ingredientType} from '../../utils/types';
import { OPEN_MODAL } from '../../services/actions/app';
import { ADD_INGREDIENT_DETAILS } from '../../services/actions/ingredientDetails';

function Ingredient({ingredient}) {

  const dispatch = useDispatch();

  const ingredientsConstructor = useSelector( state => state.burgerConstructor)

  const number = ingredient._id === ingredientsConstructor.bun ? 1 : 
    ingredientsConstructor.others.reduce(
      function(previousValue, item) {
        return ingredient._id === item ? previousValue += 1 : previousValue;
      }, 0
    );

  const openModalIngredientDetails = () => {
    dispatch ({
      type: ADD_INGREDIENT_DETAILS,
      ingredient
    })
    dispatch({
      type: OPEN_MODAL,
      isModalActive: 'ingredientDetails',
    });
  }

  return (
    <li 
      className={styles.ingreient} 
      id={ingredient.id} 
      onClick={openModalIngredientDetails}
    >
      <img 
        src={ingredient.image} 
        alt={`Иконка ${ingredient.name}`} 
        className={`mb-2 ${styles.image}`}
      />
      {number !== 0 && (<Counter count={number} size="default"/>)}
      <div className={`mb-2 ${styles.prise}`}>
        <p className={`text text_type_digits-default mr-2 ${styles.priseText}`}>
          {ingredient.price}
        </p>
        <CurrencyIcon type="primary"/>
      </div>
      <p className={`text text_type_main-default ${styles.description}`}>
        {ingredient.name}
      </p>
    </li>
  )
}

Ingredient.propTypes = {
  ingreient: ingredientType
}

export default Ingredient;