import React from "react";
import styles from './ingridient.module.css';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function Ingredient(props) {

  const number = props.id === props.order.bun ? 1 : props.order.others.reduce(
    function(previousValue, item) {
      return props.id === item ? previousValue += 1 : previousValue;
    }, 0
  )

  const openModalIngredientDetails = () => {
    props.openModal('ingredientDetails', props.ingredient);
  }

  return (
    <li className={styles.ingreient} id={props.id} onClick={openModalIngredientDetails}>
      <img src={props.url} alt={`Иконка ${props.name}`} className={`mb-2 ${styles.image}`}/>
      {number !== 0 && (<Counter count={number} size="default"/>)}
      <div className={`mb-2 ${styles.prise}`}>
        <p className={`text text_type_digits-default mr-2 ${styles.priseText}`}>{props.price}</p>
        <CurrencyIcon type="primary"/>
      </div>
      <p className={`text text_type_main-default ${styles.description}`}>{props.name}</p>
    </li>
  )
}

Ingredient.propTypes = {
  url: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
  id: PropTypes.string,
  order: PropTypes.shape({
    bun: PropTypes.string,
    others: PropTypes.arrayOf(PropTypes.string)
  }),
  openModal: PropTypes.func,
  ingreient: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
  })
}

export default Ingredient;